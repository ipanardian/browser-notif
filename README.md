# BrowserNotif.JS
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/ipanardian/browser-notif/issues) 
[![Join the chat at https://gitter.im/ipanardian/browser-notif](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/ipanardian/browser-notif)
[![Release](https://img.shields.io/badge/release-v1.0--beta-orange.svg)](https://github.com/ipanardian/browser-notif/releases)
[![Dependencies](https://img.shields.io/badge/dependencies-none-brightgreen.svg)](https://github.com/ipanardian/browser-notif)
[![GitHub license](https://img.shields.io/badge/license-MIT-red.svg)](https://raw.githubusercontent.com/ipanardian/browser-notif/master/LICENSE)
[![HitCount](https://hitt.herokuapp.com/ipanardian/browser-notif.svg)](https://github.com/ipanardian/browser-notif)

Lets a web page or app send notifications that are displayed outside the page at the system level. 
This lets web apps send information to a user even if the application is idle, in the background, switched tabs or moved to a different app.   

## Demo
[http://ipanardian.github.io/browser-notif](http://ipanardian.github.io/browser-notif)

## Usage
```js
// Request permission
// only need called once
browserNotif.requestPermission()

// Configuration
browserNotif.config({
	icon: 'image.png',
	dir: 'auto',
	lang: 'en-US',
	tag: 'myNotif',
})

// Notify
browserNotif.notify('First Notif', 'Today is your due date task!')

// with callback and onClick event
browserNotif.notify('First Notif', 'Today is your due date task!', function() {
	console.log('First Notif fired!')
})
.onClick(() => {window.open('https://www.indosystem.com')});

// Create another instance
myNotif = Object.create(browserNotif)
```

## Install
```
bower install browser-notif  

npm i browser-notif
```

## License
The MIT License (MIT)