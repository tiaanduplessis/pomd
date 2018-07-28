
# 🍅 pomd
[![package version](https://img.shields.io/npm/v/pomd.svg?style=flat-square)](https://npmjs.org/package/pomd)
[![package downloads](https://img.shields.io/npm/dm/pomd.svg?style=flat-square)](https://npmjs.org/package/pomd)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![package license](https://img.shields.io/npm/l/pomd.svg?style=flat-square)](https://npmjs.org/package/pomd)
[![make a pull request](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![Dependency CI](https://dependencyci.com/github/tiaanduplessis/pomd/badge?style=flat-square)](https://dependencyci.com/github/tiaanduplessis/pomd)
[![Package Quality](http://packagequality.com/shield/pomd.svg?style=flat-square)](http://packagequality.com/#?package=pomd)
[![Travis Build](https://img.shields.io/travis/tiaanduplessis/pomd/master.svg?style=flat-square)](https://travis-ci.org/tiaanduplessis/pomd)
[![Standard](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)
[![Greenkeeper badge](https://badges.greenkeeper.io/tiaanduplessis/pomd.svg)](https://greenkeeper.io/)

> Just a good old cli based Pomodoro timer with native notifactions

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#License)


## Install

```sh
$ npm install -g pomd
```

Or

```sh
$ yarn global add pomd
```

You can then run `pomd` from the terminal 🎉

## Usage

<div align="center">
  <img src="https://raw.githubusercontent.com/tiaanduplessis/pomd/master/media/demo.gif" alt="demo" />
</div>

To use, run `pomd`:

```sh
$ pomd
🍅
```

You can then type `help` to get all the options.

```sh
🍅 help
#  Commands:
#
#  help [command...]  Provides help for a given command.
#  exit               Exits application.
#  start [options]    Start a Pomodoro
#  stats              Show statistics from your Pomodoro sessions
```

```sh
🍅 help start
# Usage: start [options]

# Start a Pomodoro
#
# Options:
#
#   --help                 output usage information
#   -t, --time <time>      Set the time of the Pomodoro. Default is 25:00 minutes.
#   -c, --chill <chill>    Set the time of chill. Default is 5:00 minutes.
#   -r, --repeat <repeat>  Repeat Pomodero x times. Default is 1.
#   -l, --loop             Run Pomodoros forever.
```

You can then start Pomodoros of 20 minutes with a 3 minute break, repeated 6 times:

```sh
🍅 start --time 20:00 --chill 03:00 --repeat 6
```

The time can also be specified in a shorthand format:

```sh
🍅 start -t 20m -c 3m -r 6
```

You can also enter multiple time and chill parameters (e.g. Work 50 minutes, chill 10 minutes, work 50 minutes, chill 25 minutes, forever):

```sh
🍅 start -t 50m -c 10m -t 50m -c 25 --loop
```


## Contribute

1. Fork it and create your feature branch: git checkout -b my-new-feature
2. Commit your changes: git commit -am 'Add some feature'
3. Push to the branch: git push origin my-new-feature 
4. Submit a pull request

## License

MIT
    