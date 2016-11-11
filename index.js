#! /usr/bin/env node
'use strict';

const Timr = require('timrjs')
const notifier = require('node-notifier')
const vorpal = require('vorpal')()
const pkg = require('./package.json')
require('update-notifier')({pkg}).notify()

// Default args if none provided
const defaultTime = '25:00'
const chillTime = '05:00'

let timerRunning = false

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
  timer.ticker((formattedTime) => {
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

  // Setup session timer
  const timer = Timr(time)
  clearLineAndWrite(`🕐 ${time} - Session`)
  timer.start()
  performTick(time, timer, 'Session')

  // Start break when session is done
  timer.finish(() => {
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

      cb()
    })
  })
}

vorpal
  .command('start', 'Start a Pomodoro')
  .autocomplete(['--time', '--chill'])
  .option('-t, --time <time>', 'Set the time of the Pomodoro. Default is 25:00 minutes.')
  .option('-r, --chill <chill>', 'Set the time of chill. Default is 5:00 minutes.')
  .action((args, cb) => {
    peformPomodoro(args.options.time || defaultTime, args.options.chill || chillTime, cb)
  })
  .cancel(() => {
    timerRunning = false
  })

vorpal
  .delimiter('🍅')
  .show()
