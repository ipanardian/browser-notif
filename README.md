# BrowserNotif.JS
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/ipanardian/browser-notif/issues) 
[![Release](https://img.shields.io/badge/release-v2.0.0-orange.svg)](https://github.com/ipanardian/browser-notif/releases)
[![Typescript](https://img.shields.io/badge/Typescript-v2.1-blue.svg)](https://github.com/ipanardian/browser-notif/releases)
[![Dependencies](https://img.shields.io/badge/dependencies-none-brightgreen.svg)](https://github.com/ipanardian/browser-notif)
[![GitHub license](https://img.shields.io/badge/license-MIT-red.svg)](https://raw.githubusercontent.com/ipanardian/browser-notif/master/LICENSE)

Lets a web page send notifications that are displayed outside the page at the system level. 
This lets web apps send information to a user even if the application is idle, in the background, switched tabs or moved to a different app.   

## Demo
[http://ipanardian.github.io/browser-notif](http://ipanardian.github.io/browser-notif)

## Usage 
```js
// Create instance
let notif1 = new BrowserNotif({icon: 'icon.png'})

notif1
		.notify('First Notif', 'Hai there! Nice to meet you.', (n) => console.log('First Notif fired!'))
		.click(() => window.open('https://www.ipanardian.com'))

// With options
let notif2 = new BrowserNotif({
	icon: 'another-icon.png',
	dir: 'auto',
	lang: 'en-US',
	tag: 'myNotif', 
	timeout: 10 
})	

notif2 	
		.notify('Second Notif', 'Typescript has released new version, chek it out!', (n) => console.log('Second Notif fired!'))
		.click(() => window.open('https://www.typescriptlang.org'))
		
//close notif
notif1.close()			
```

## Install
```
npm i browser-notif

cd browser-notif
npm install --only=dev
```

## Build
```
gulp build

gulp uglify
```
Check 'dist' folder. 
- BrowserNotif.js 
- BrowserNotif.min.js 
- BrowserNotif.min.js.map

## License
The MIT License (MIT)

Copyright (c) 2016 Ipan Ardian

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
