#! /usr/bin/env node
'use strict'

const Timr = require('timrjs')
const path = require('path')
const notifier = require('node-notifier')
const vorpal = require('vorpal')()
const pkg = require('./package.json')
const stats = require('piggy-bank')(path.join(require('os').homedir(), '.pomd.json'))
require('update-notifier')({pkg}).notify()

// Default args if none provided
const defaultTime = '25:00'
const chillTime = '05:00'

let timerRunning = false
let loop = false

/**
 * Clear current line and write text to it
 */
const clearLineAndWrite = (text) => {
  process.stdout.clearLine()
  process.stdout.cursorTo(0)
  process.stdout.write(text)
}

/**
 * Update terminal with current time
 */
const performTick = (time, timer, type) => {
  timer.ticker(({formattedTime}) => {
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
const peformPomodoro = (time, chill, cb) => {
  timerRunning = true

  stats.set('total', Number.parseInt(stats.get('total') || 0) + 1, {overwrite: true})

  // Setup session timer
  const timer = Timr(time)
  clearLineAndWrite(`🕐 ${time} - Session`)
  timer.start()
  performTick(time, timer, 'Session')

  // Start break when session is done
  timer.finish(() => {
    stats.set('completed', Number.parseInt(stats.get('completed') || 0) + 1, { overwrite: true })

    notifier.notify({
      title: pkg.name,
      message: 'Pomodoro done!',
      sound: true // Only Notification Center or Windows Toasters
    })

    // Setup chill timer
    const timer = Timr(chill)
    clearLineAndWrite(`🕐 ${chill} - chill`)
    timer.start()
    performTick(chill, timer, 'chill')

    timer.finish(() => {
      clearLineAndWrite('Done ✔︎\n')
      notifier.notify({
        title: pkg.name,
        message: 'Chill done!',
        sound: true
      })

      if (loop) {
        peformPomodoro(time, chill, cb)
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
  .option('-l, --loop', 'Run continues Pomodoros.')
  .action((args, cb) => {
    if (args.options.loop) { loop = true }
    peformPomodoro(args.options.time || defaultTime, args.options.chill || chillTime, cb)
  })
  .cancel(() => {
    timerRunning = false
  })

vorpal
  .command('stats', 'Show statistics from your Pomodoros.')
  .action((args, cb) => {
    const result = stats.get('total')
      ? `\nYou have completed ${stats.get('completed') || 0} out of ${stats.get('total')} Pomodoros 🎉\n\n`
      : `\nYou need to have done something to have stats!\n\n`
    process.stdout.write(result)
    cb()
  })

vorpal
  .delimiter('🍅 ')
  .show()
