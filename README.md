<p align="center">
  <img width="64" height="64" src="https://i.imgur.com/a6hmtwZ.png)](https://i.imgur.com/a6hmtwZ.png">
</p>
<h1 align="center">Telenotify</h1>

<div align="center">
  <strong>Telenotify is an open source software to send notifications to telegram users or groups.</strong>
</div>
<br />

<div align="center">
  <!-- Standard -->
  <a href="https://standardjs.com">
    <img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square"
      alt="Standard" />
  </a>
</div>

<div align="center">
  <sub>The little framework that could. Built with ❤︎ by
  <a href="https://twitter.com/themisir">Misir Jafarov</a> and
  <a href="https://github.com/TheMisir/telenotify/graphs/contributors">
    contributors
  </a>
</div>

## 🔮 Installation

Firstly you need to clone this repo to your server.

```sh
git clone https://github.com/TheMisir/telenotify.git
```

Copy `example.env` to `.env` and edit this file to set environment variables. Here's description of existing environment variables.

|Property|Required|Description|
|--|--|--|
|`BOT_TOKEN`|+|Bot token received from [botfather](https://t.me/botfather).|
|`BOT_PASSWORD`||Set password to lock the bot|
|`BAN_TIMEOUT`||If set user will be banned from re-entering password for `BAN_TIMEOUT` milliseconds|
|`JWT_ISSUER`|+|Json Web Token issuer|
|`JWT_KEY`||If set the given secret used instead of private key provided in `.key` folder|

## 🌟 Start server

You can simply start telenotify server by running `node .` command inside telenotify root folder. If you want to keep telenotify server online you can use process managers such as pm2, forever, systemd, ...

---

[Found an issue](https://github.com/TheMisir/telenotify/issues/new)  [⭐](https://github.com/TheMisir/telenotify)
