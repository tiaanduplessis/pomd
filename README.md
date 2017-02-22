<h1 align="center">🍅 pomd</h1>
<br>
<div align="center">
  <strong>Just a good old cli based pomodoro timer with native notifactions</strong>
</div>
<br>
<div align="center">
    <a href="https://npmjs.org/package/pomd">
      <img src="https://img.shields.io/npm/v/pomd.svg?style=flat-square" alt="NPM version" />
    </a>
    <a href="https://npmjs.org/package/pomd">
    <img src="https://img.shields.io/npm/dm/pomd.svg?style=flat-square" alt="Downloads" />
    </a>
    <a href="https://github.com/feross/standard">
      <img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square" alt="Standard" />
    </a>
    <a href="https://travis-ci.org/tiaanduplessis/pomd">
      <img src="https://img.shields.io/travis/tiaanduplessis/pomd/master.svg?style=flat-square" alt="Travis Build" />
    </a>
    <a href="https://github.com/RichardLitt/standard-readme)">
      <img src="https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square" alt="Standard Readme" />
    </a>
    <a href="https://badge.fury.io/gh/tiaanduplessis%2Fpomd">
      <img src="https://badge.fury.io/gh/tiaanduplessis%2Fpomd.svg?style=flat-square" alt="GitHub version" />
   </a>
   <a href="http://packagequality.com/#?package=pomd">
      <img src="http://packagequality.com/shield/yourpackage.svg?style=flat-square" alt="Package Quality" />
   </a>
</div>
<br>
<div align="center">
  Built with ❤︎ by <a href="tiaanduplessis.co.za">Tiaan</a> and <a href="https://github.com/tiaanduplessis/bolt-starter/graphs/contributors">contributors</a>
</div>

<h2>Table of Contents</h2>
<details>
  <summary>Table of Contents</summary>
  <li><a href="#install">Install</a></li>
  <li><a href="#usage">Usage</a></li>
  <li><a href="#contribute">Contribute</a></li>
  <li><a href="#license">License</a></li>
</details>

## Install

```sh
$ npm install -g pomd
```

Or

```sh
$ yarn add global pomd
```

You can then run `pomd` from the terminal! 🎉

## Usage

<div align="center">
  <img src="https://raw.githubusercontent.com/tiaanduplessis/pomd/master/media/demo.gif)" alt="demo" />
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
#   --help               output usage information
#   -t, --time <time>    Set the time of the Pomodoro. Default is 25:00 minutes.
#   -c, --chill <chill>  Set the time of chill. Default is 5:00 minutes.
#   -l, --loop           Run continues Pomodoros.
```

You can then start continues Pomodoros of 20 minutes with 3 minute breaks:

```sh
🍅 start --time 20:00 --chill 03:00
```

The time can also be specified in a shorthand format:

```sh
🍅 start -t 20m -c 3m
```

## Thanks to OSS

pomd is made possible through Open Source Software. A very special thanks to all the modules pomd [uses](package.json).

## Contribute

Contributions are welcome. Please open up an issue or create PR if you would like to help out.

Note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

Licensed under the MIT License.