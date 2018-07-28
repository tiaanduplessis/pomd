#! /usr/bin/env node
'use strict'

const path = require('path')
const Timr = require('timrjs')
const notifier = require('node-notifier')
const vorpal = require('vorpal')()

const getStorePath = () => path.join(require('os').homedir(), '.pomd.json')
const pkg = require('./package.json')
const stats = require('piggy-bank')(getStorePath())

const clearLineAndWrite = text => {
  process.stdout.clearLine()
  process.stdout.cursorTo(0)
  process.stdout.write(text)
}

require('update-notifier')({ pkg }).notify()

// Default args if none provided
const defaultTime = '25:00'
const chillTime = '05:00'
const defaultRepeat = 1

let timerRunning = false
let loop = false
let repeatTime = defaultRepeat

const renderTime = (time, timer, type) => {
  timer.ticker(({ formattedTime }) => {
    if (!timerRunning) {
      timer.stop()
      clearLineAndWrite('🍅 ')
    } else if (loop) {
      clearLineAndWrite(`🕐 ${formattedTime} - ${type} ∞`)
    } else {
      clearLineAndWrite(`🕐 ${formattedTime} - ${type}`)
    }
  })
}

const performPomodoro = (times, chills, index, cb) => {
  timerRunning = true

  const time = times[index] || times[repeatTime % index] || times[index % repeatTime]
  const chill = chills[index] || chills[repeatTime % index] || chills[index % repeatTime]
  const currentTick = `(${index + 1}/${repeatTime * times.length})`

  stats.set('total', Number.parseInt(stats.get('total') || 0) + 1, { overwrite: true })

  // Setup session timer
  const timer = Timr(time)
  const sessionCurrentTick = `Session ${currentTick}`

  if (loop) {
    clearLineAndWrite(`🕐 ${time} - ${sessionCurrentTick} ∞`)
  } else {
    clearLineAndWrite(`🕐 ${time} - ${sessionCurrentTick}`)
  } 

  timer.start()
  renderTime(time, timer, sessionCurrentTick)

  // Start break when session is done
  timer.finish(() => {
    stats.set('completed', Number.parseInt(stats.get('completed') || 0) + 1, { overwrite: true })

    notifier.notify({
      title: pkg.name,
      message: `Pomodoro done! ${currentTick}`,
      sound: true
    })

    // Setup chill timer
    const timer = Timr(chill)
    const chillCurrentTick = `Chill ${currentTick}`

    if (loop) {
      clearLineAndWrite(`🕐 ${chill} - ${chillCurrentTick} ∞`)
    } else {
      clearLineAndWrite(`🕐 ${chill} - ${chillCurrentTick}`)
    }
    timer.start()
    renderTime(chill, timer, chillCurrentTick)

    timer.finish(() => {
      clearLineAndWrite(`Done ✔︎ ${currentTick}`)
      notifier.notify({
        title: pkg.name,
        message: `Chill done! ${currentTick}`,
        sound: true
      })

      if (index < repeatTime - 1) {
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
  .autocomplete(['--time', '--chill', '--repeat'])
  .option('-t, --time <time>', 'Set the time of the Pomodoro. Default is 25:00 minutes.')
  .option('-c, --chill <chill>', 'Set the time of chill. Default is 5:00 minutes.')
  .option('-r, --repeat <repeat>', 'Repeat Pomodoro x times. Default is 1')
  .option('-l, --loop', 'Run Pomodoros forever.')
  .action((args = {}, cb) => {
    let times = args.options.time || [defaultTime]
    let chills = args.options.chill || [chillTime]

    if (!Array.isArray(times)) {
      times = [times]
    }
    if (!Array.isArray(chills)) {
      chills = [chills]
    }

    if (times.length !== chills.length) {
      console.error(
        `Number of time and chill parameters must be equal. You have entered ${times.length} -t, and ${chills.length} -c.`
      )
      cb()
    } else {
      repeatTime = args.options.repeat || defaultRepeat
      loop = args.options.loop || false
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
