#! /usr/bin/env node
'use strict'

const Timr = require('timrjs')
const path = require('path')
const notifier = require('node-notifier')
const vorpal = require('vorpal')()
const pkg = require('./package.json')
const stats = require('piggy-bank')(path.join(require('os').homedir(), '.pomd.json'))
require('update-notifier')({ pkg }).notify()

// Default args if none provided
const defaultTime = '25:00'
const chillTime = '05:00'

let timerRunning = false
let loop = false

/**
 * Clear current line and write text to it
 */
const clearLineAndWrite = text => {
  process.stdout.clearLine()
  process.stdout.cursorTo(0)
  process.stdout.write(text)
}

/**
 * Update terminal with current time
 */
const performTick = (time, timer, type) => {
  timer.ticker(({ formattedTime }) => {
    if (!timerRunning) {
      timer.stop()
      clearLineAndWrite('🍅 ')
    } else {
      clearLineAndWrite(`🕐 ${formattedTime} - ${type}`)
    }
  })
}

/**
 * Peform a Pomodoro session based on given args
 */
const performPomodoro = (times, chills, index, cb) => {
  timerRunning = true

  const time = times[index]
  const chill = chills[index]
  const currentTick = `(${index + 1}/${times.length})`

  stats.set('total', Number.parseInt(stats.get('total') || 0) + 1, { overwrite: true })
  // Setup session timer
  const timer = Timr(time)
  const sessionCurrentTick = `Session ${currentTick}`
  clearLineAndWrite(`🕐 ${time} - ${sessionCurrentTick}`)
  timer.start()
  performTick(time, timer, sessionCurrentTick)

  // Start break when session is done
  timer.finish(() => {
    stats.set('completed', Number.parseInt(stats.get('completed') || 0) + 1, { overwrite: true })

    notifier.notify({
      title: pkg.name,
      message: `Pomodoro done! ${currentTick}`,
      sound: true // Only Notification Center or Windows Toasters
    })

    // Setup chill timer
    const timer = Timr(chill)
    const chillCurrentTick = `Chill ${currentTick}`
    clearLineAndWrite(`🕐 ${chill} - ${chillCurrentTick}`)
    timer.start()
    performTick(chill, timer, chillCurrentTick)

    timer.finish(() => {
      clearLineAndWrite(`Done ✔︎ ${currentTick}`)
      notifier.notify({
        title: pkg.name,
        message: `Chill done! ${currentTick}`,
        sound: true
      })

      if (times.length - 1 > index) {
        performPomodoro(times, chills, index + 1, cb)
      } else if (loop) {
        performPomodoro(times, chills, 0, cb)
      } else {
        cb()
      }
    })
  })
}

vorpal
  .command('start', 'Start a Pomodoro')
  .autocomplete(['--time', '--chill'])
  .option('-t, --time <time>', 'Set the time of the Pomodoro. Default is 25:00 minutes.')
  .option('-c, --chill <chill>', 'Set the time of chill. Default is 5:00 minutes.')
  .option('-l, --loop', 'Run continuous Pomodoros.')
  .action((args, cb) => {
    let times = args.options.time || [defaultTime]
    let chills = args.options.chill || [chillTime]

    if (!(times instanceof Array)) {
      times = [times]
    }
    if (!(chills instanceof Array)) {
      chills = [chills]
    }

    if (times.length !== chills.length) {
      console.error(
        `Number of time and chill parameters must be equal. You have entered ${times.length} -t, and ${chills.length} -c.`
      )
      cb()
    } else {
      if (args.options.loop) {
        loop = true
      }
      performPomodoro(times, chills, 0, cb)
    }
  })
  .cancel(() => {
    timerRunning = false
  })

vorpal.command('stats', 'Show statistics from your Pomodoros.').action((args, cb) => {
  const result = stats.get('total')
    ? `\nYou have completed ${stats.get('completed') || 0} out of ${stats.get('total')} Pomodoros 🎉\n\n`
    : `\nYou need to have done something to have stats!\n\n`
  process.stdout.write(result)
  cb()
})

vorpal
  .on('client_command_executed', evt => process.exit(0))
  .parse(process.argv)

vorpal.delimiter('🍅 ').show()
