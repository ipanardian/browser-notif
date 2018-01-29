# BrowserNotif.JS
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/ipanardian/browser-notif/issues) 
[![Release](https://img.shields.io/badge/release-v2.1.0-orange.svg)](https://github.com/ipanardian/browser-notif/releases)
[![Typescript](https://img.shields.io/badge/Typescript-v2.1-blue.svg)](https://github.com/ipanardian/browser-notif/releases)
[![Dependencies](https://img.shields.io/badge/dependencies-none-brightgreen.svg)](https://github.com/ipanardian/browser-notif)
[![GitHub license](https://img.shields.io/badge/license-MIT-red.svg)](https://raw.githubusercontent.com/ipanardian/browser-notif/master/LICENSE)
[![NPM Download](https://img.shields.io/npm/dt/browser-notif.svg)]()

Lets a web page send notifications that are displayed outside the page at the system level. 
This lets web apps send information to a user even if the application is idle, in the background, switched tabs or moved to a different app.  

## Install
```
npm install browser-notif --save
```

## Demo
[http://ipanardian.github.io/browser-notif](http://ipanardian.github.io/browser-notif)

## Usage 
### Typescript
```js
// Import
import BrowserNotif from './BrowserNotif'

// If you want to explicitly call request permission. Usually this is only called once.
BrowserNotif.requestPermission().then(p => console.log(p))

// Create instance
let notif1 = new BrowserNotif({
    icon: 'logo.png',
    lang: 'en-US',
    timeout: 10 // How long notif will be appear in seconds
})

notif1
    .notify('First Notif', 'Hi there! Nice to meet you.', {
        click() {
            window.open('//ipanardian.com')
        },
        error() {
            //On error
        }
    })
    .then(() => {
        //Do something
    })

//close notif pragmatically
notif1.close()			
```

### Javascript
In Javascript BrowserNotif use UMD module pattern and Polyfill for ```Object.assign```.
```js
BrowserNotif.default.requestPermission().then(p => console.log(p))

var notif = new BrowserNotif.default({ icon: 'icon.png' })

notif
    .notify('First Notif', 'Hi there! Nice to meet you.', {
        click: function () {
            window.open('//ipanardian.com')
        }
    })
    .then(function () {
        //Do something
    })
```

## Notification On Mobile Devices
Notification on mobile devices is using ```Service Worker```. A service worker is an event-driven worker registered against an origin and a path. Service worker runs in the background and only run over HTTPS.

> Put file 'sw.min.js' on root directory of application

```js
var notif = new BrowserNotif({ icon: 'icon.png', serviceWorkerPath: 'sw.min.js' })
notif
    .notify('First Notif', 'Hi there! Nice to meet you.', {
        clickOnServiceWorker(clients) {
            clients.openWindow('//ipanardian.com')
        }
    })
    .then(() => {
        //Do something
    })
```
![gif](http://i.giphy.com/l3vRfm7aebpZjQHf2.gif)

## Build
```
// Install Dev Dependencies
cd browser-notif
npm install --only=dev

// Compile Typescript only
gulp 

// Compile Typescript, Babelify and Uglify
gulp build
```
Check 'dist' folder. 
- BrowserNotif.js 
- BrowserNotif.min.js 
- BrowserNotif.min.js.map
- sw.min.js

## Browser compatibility
If browser not support Notification API then native alert will be triggered.

### Desktop
<div id="compat-desktop" style="display: block;">
<table class="compat-table">
 <tbody>
  <tr>
   <th>Feature</th>
   <th>Chrome</th>
   <th>Edge</th>
   <th>Firefox (Gecko)</th>
   <th>Internet Explorer</th>
   <th>Opera</th>
   <th>Safari</th>
  </tr>
  <tr>
   <td>Basic support</td>
   <td>5<span class="inlineIndicator prefixBox prefixBoxInline" title="prefix"><a href="/en-US/docs/Web/Guide/Prefixes" title="The name of this feature is prefixed with 'webkit' as this browser considers it experimental">webkit</a></span><sup>[1]</sup><br>
    22</td>
   <td><span title="Please update this with the earliest version of support." style="color: #888;">(Yes)</span></td>
   <td>4.0 <span class="inlineIndicator prefixBox prefixBoxInline" title="prefix"><a href="/en-US/docs/Web/Guide/Prefixes" title="The name of this feature is prefixed with 'moz' as this browser considers it experimental">moz</a></span><sup>[2]</sup><br>
    22</td>
   <td><span style="color: #f00;">No&nbsp;support</span></td>
   <td>25</td>
   <td>6<sup>[3]</sup></td>
  </tr>
  <tr>
   <td><code>icon</code></td>
   <td>5<span class="inlineIndicator prefixBox prefixBoxInline" title="prefix"><a href="/en-US/docs/Web/Guide/Prefixes" title="The name of this feature is prefixed with 'webkit' as this browser considers it experimental">webkit</a></span><sup>[1]</sup><br>
    22</td>
   <td><span title="Compatibility unknown; please update this." style="color: rgb(255, 153, 0);">?</span></td>
   <td>4.0 <span class="inlineIndicator prefixBox prefixBoxInline" title="prefix"><a href="/en-US/docs/Web/Guide/Prefixes" title="The name of this feature is prefixed with 'moz' as this browser considers it experimental">moz</a></span><sup>[2]</sup><br>
    22</td>
   <td><span style="color: #f00;">No&nbsp;support</span></td>
   <td>25</td>
   <td><span style="color: #f00;">No&nbsp;support</span></td>
  </tr>
  <tr>
   <td>Available in workers</td>
   <td><span title="Please update this with the earliest version of support." style="color: #888;">(Yes)</span></td>
   <td><span title="Compatibility unknown; please update this." style="color: rgb(255, 153, 0);">?</span></td>
   <td><a href="/en-US/Firefox/Releases/41" title="Released on 2015-09-22.">41.0</a> (41.0)</td>
   <td><span title="Compatibility unknown; please update this." style="color: rgb(255, 153, 0);">?</span></td>
   <td><span title="Compatibility unknown; please update this." style="color: rgb(255, 153, 0);">?</span></td>
   <td><span title="Compatibility unknown; please update this." style="color: rgb(255, 153, 0);">?</span></td>
  </tr>
  <tr>
   <td><code>silent</code></td>
   <td>43.0</td>
   <td><span title="Compatibility unknown; please update this." style="color: rgb(255, 153, 0);">?</span></td>
   <td><span style="color: #f00;">No&nbsp;support</span></td>
   <td><span style="color: #f00;">No&nbsp;support</span></td>
   <td><span style="color: #f00;">No&nbsp;support</span></td>
   <td><span style="color: #f00;">No&nbsp;support</span></td>
  </tr>
  <tr>
   <td><code>noscreen</code>, <code>sticky</code></td>
   <td><span style="color: #f00;">No&nbsp;support</span></td>
   <td><span title="Compatibility unknown; please update this." style="color: rgb(255, 153, 0);">?</span></td>
   <td><span style="color: #f00;">No&nbsp;support</span></td>
   <td><span style="color: #f00;">No&nbsp;support</span></td>
   <td><span style="color: #f00;">No&nbsp;support</span></td>
   <td><span style="color: #f00;">No&nbsp;support</span></td>
  </tr>
  <tr>
   <td><code>sound</code></td>
   <td><span style="color: #f00;">No&nbsp;support</span></td>
   <td><span title="Compatibility unknown; please update this." style="color: rgb(255, 153, 0);">?</span></td>
   <td><span style="color: #f00;">No&nbsp;support</span></td>
   <td><span style="color: #f00;">No&nbsp;support</span></td>
   <td><span style="color: #f00;">No&nbsp;support</span></td>
   <td><span style="color: #f00;">No&nbsp;support</span></td>
  </tr>
  <tr>
   <td><code>renotify</code></td>
   <td>50.0</td>
   <td><span title="Compatibility unknown; please update this." style="color: rgb(255, 153, 0);">?</span></td>
   <td><span style="color: #f00;">No&nbsp;support</span></td>
   <td><span style="color: #f00;">No&nbsp;support</span></td>
   <td><span style="color: #f00;">No&nbsp;support</span></td>
   <td><span style="color: #f00;">No&nbsp;support</span></td>
  </tr>
  <tr>
   <td>Promise-based <code>Notification.requestPermission()</code></td>
   <td>46.0</td>
   <td><span title="Compatibility unknown; please update this." style="color: rgb(255, 153, 0);">?</span></td>
   <td><a href="/en-US/Firefox/Releases/47" title="Released on 2016-06-07.">47.0</a> (47.0)</td>
   <td><span title="Compatibility unknown; please update this." style="color: rgb(255, 153, 0);">?</span></td>
   <td>40</td>
   <td><span style="color: #f00;">No&nbsp;support</span></td>
  </tr>
  <tr>
   <td><code>vibrate</code>, <code>actions</code></td>
   <td>53.0</td>
   <td><span title="Compatibility unknown; please update this." style="color: rgb(255, 153, 0);">?</span></td>
   <td>&nbsp;</td>
   <td>&nbsp;</td>
   <td>39</td>
   <td>&nbsp;</td>
  </tr>
  <tr>
   <td><code>badge</code></td>
   <td>53.0</td>
   <td><span title="Compatibility unknown; please update this." style="color: rgb(255, 153, 0);">?</span></td>
   <td>&nbsp;</td>
   <td>&nbsp;</td>
   <td>39</td>
   <td>&nbsp;</td>
  </tr>
  <tr>
   <td><code>image</code></td>
   <td>55.0</td>
   <td><span title="Compatibility unknown; please update this." style="color: rgb(255, 153, 0);">?</span></td>
   <td>&nbsp;</td>
   <td>&nbsp;</td>
   <td><span title="Compatibility unknown; please update this." style="color: rgb(255, 153, 0);">?</span></td>
   <td>&nbsp;</td>
  </tr>
 </tbody>
</table>
</div>

### Mobile
<div id="compat-mobile" style="display: block;">
<table class="compat-table"><tbody><tr><th>Feature</th>
   <th>Android</th>
   <th>Android Webview</th>
   <th>Edge</th>
   <th>Firefox Mobile (Gecko)</th>
   <th>Firefox OS</th>
   <th>IE Mobile</th>
   <th>Opera Mobile</th>
   <th>Safari Mobile</th>
   <th>Chrome for Android</th>
  </tr><tr><td>Basic support</td>
   <td><span title="Compatibility unknown; please update this." style="color: rgb(255, 153, 0);">?</span></td>
   <td>
    <p><span title="Please update this with the earliest version of support." style="color: #888;">(Yes)</span></p>
   </td>
   <td><span title="Please update this with the earliest version of support." style="color: #888;">(Yes)</span></td>
   <td>4.0<span class="inlineIndicator prefixBox prefixBoxInline" title="prefix"><a href="/en-US/docs/Web/Guide/Prefixes" title="The name of this feature is prefixed with 'moz' as this browser considers it experimental">moz</a></span><sup>[2]</sup><br>
    22</td>
   <td>1.0.1<span class="inlineIndicator prefixBox prefixBoxInline" title="prefix"><a href="/en-US/docs/Web/Guide/Prefixes" title="The name of this feature is prefixed with 'moz' as this browser considers it experimental">moz</a></span><sup>[2]</sup><br>
    1.2</td>
   <td><span style="color: #f00;">No&nbsp;support</span></td>
   <td><span title="Compatibility unknown; please update this." style="color: rgb(255, 153, 0);">?</span></td>
   <td><span style="color: #f00;">No&nbsp;support</span></td>
   <td>
    <p><span title="Please update this with the earliest version of support." style="color: #888;">(Yes)</span></p>
   </td>
  </tr><tr><td><code>icon</code></td>
   <td><span title="Compatibility unknown; please update this." style="color: rgb(255, 153, 0);">?</span></td>
   <td><span title="Please update this with the earliest version of support." style="color: #888;">(Yes)</span></td>
   <td><span title="Compatibility unknown; please update this." style="color: rgb(255, 153, 0);">?</span></td>
   <td>4.0<span class="inlineIndicator prefixBox prefixBoxInline" title="prefix"><a href="/en-US/docs/Web/Guide/Prefixes" title="The name of this feature is prefixed with 'moz' as this browser considers it experimental">moz</a></span><sup>[2]</sup><br>
    22</td>
   <td>1.0.1<span class="inlineIndicator prefixBox prefixBoxInline" title="prefix"><a href="/en-US/docs/Web/Guide/Prefixes" title="The name of this feature is prefixed with 'moz' as this browser considers it experimental">moz</a></span><sup>[2]</sup><br>
    1.2</td>
   <td><span style="color: #f00;">No&nbsp;support</span></td>
   <td><span title="Compatibility unknown; please update this." style="color: rgb(255, 153, 0);">?</span></td>
   <td><span style="color: #f00;">No&nbsp;support</span></td>
   <td><span title="Please update this with the earliest version of support." style="color: #888;">(Yes)</span></td>
  </tr><tr><td>Available in workers</td>
   <td><span title="Compatibility unknown; please update this." style="color: rgb(255, 153, 0);">?</span></td>
   <td><span title="Please update this with the earliest version of support." style="color: #888;">(Yes)</span></td>
   <td><span title="Compatibility unknown; please update this." style="color: rgb(255, 153, 0);">?</span></td>
   <td>41.0 (41.0)</td>
   <td><span title="Compatibility unknown; please update this." style="color: rgb(255, 153, 0);">?</span></td>
   <td><span title="Compatibility unknown; please update this." style="color: rgb(255, 153, 0);">?</span></td>
   <td><span title="Compatibility unknown; please update this." style="color: rgb(255, 153, 0);">?</span></td>
   <td><span title="Compatibility unknown; please update this." style="color: rgb(255, 153, 0);">?</span></td>
   <td><span title="Please update this with the earliest version of support." style="color: #888;">(Yes)</span></td>
  </tr><tr><td><code>silent</code></td>
   <td><span style="color: #f00;">No&nbsp;support</span></td>
   <td>43.0</td>
   <td><span title="Compatibility unknown; please update this." style="color: rgb(255, 153, 0);">?</span></td>
   <td><span style="color: #f00;">No&nbsp;support</span></td>
   <td><span style="color: #f00;">No&nbsp;support</span></td>
   <td><span style="color: #f00;">No&nbsp;support</span></td>
   <td><span style="color: #f00;">No&nbsp;support</span></td>
   <td><span style="color: #f00;">No&nbsp;support</span></td>
   <td>43.0</td>
  </tr><tr><td><code>noscreen</code>, <code>sticky</code></td>
   <td><span style="color: #f00;">No&nbsp;support</span></td>
   <td><span style="color: #f00;">No&nbsp;support</span></td>
   <td><span title="Compatibility unknown; please update this." style="color: rgb(255, 153, 0);">?</span></td>
   <td><span style="color: #f00;">No&nbsp;support</span></td>
   <td><span style="color: #f00;">No&nbsp;support</span></td>
   <td><span style="color: #f00;">No&nbsp;support</span></td>
   <td><span style="color: #f00;">No&nbsp;support</span></td>
   <td><span style="color: #f00;">No&nbsp;support</span></td>
   <td><span style="color: #f00;">No&nbsp;support</span></td>
  </tr><tr><td><code>sound</code></td>
   <td><span style="color: #f00;">No&nbsp;support</span></td>
   <td><span title="Please update this with the earliest version of support." style="color: #888;">(Yes)</span></td>
   <td><span title="Compatibility unknown; please update this." style="color: rgb(255, 153, 0);">?</span></td>
   <td><span style="color: #f00;">No&nbsp;support</span></td>
   <td><span style="color: #f00;">No&nbsp;support</span></td>
   <td><span style="color: #f00;">No&nbsp;support</span></td>
   <td><span style="color: #f00;">No&nbsp;support</span></td>
   <td><span style="color: #f00;">No&nbsp;support</span></td>
   <td><span title="Please update this with the earliest version of support." style="color: #888;">(Yes)</span></td>
  </tr><tr><td><code>renotify</code></td>
   <td><span style="color: #f00;">No&nbsp;support</span></td>
   <td>50.0</td>
   <td><span title="Compatibility unknown; please update this." style="color: rgb(255, 153, 0);">?</span></td>
   <td><span style="color: #f00;">No&nbsp;support</span></td>
   <td><span style="color: #f00;">No&nbsp;support</span></td>
   <td><span style="color: #f00;">No&nbsp;support</span></td>
   <td><span style="color: #f00;">No&nbsp;support</span></td>
   <td><span style="color: #f00;">No&nbsp;support</span></td>
   <td><span style="color: #f00;">No&nbsp;support</span></td>
  </tr><tr><td>Promise-based <code>Notification.requestPermission()</code></td>
   <td><span title="Compatibility unknown; please update this." style="color: rgb(255, 153, 0);">?</span></td>
   <td><span title="Compatibility unknown; please update this." style="color: rgb(255, 153, 0);">?</span></td>
   <td><span title="Compatibility unknown; please update this." style="color: rgb(255, 153, 0);">?</span></td>
   <td>47.0 (47.0)</td>
   <td><span title="Compatibility unknown; please update this." style="color: rgb(255, 153, 0);">?</span></td>
   <td><span title="Compatibility unknown; please update this." style="color: rgb(255, 153, 0);">?</span></td>
   <td><span title="Compatibility unknown; please update this." style="color: rgb(255, 153, 0);">?</span></td>
   <td><span title="Compatibility unknown; please update this." style="color: rgb(255, 153, 0);">?</span></td>
   <td><span title="Compatibility unknown; please update this." style="color: rgb(255, 153, 0);">?</span></td>
  </tr><tr><td><code>vibrate</code>, <code>actions</code></td>
   <td><span style="color: #f00;">No&nbsp;support</span></td>
   <td>53.0</td>
   <td><span title="Compatibility unknown; please update this." style="color: rgb(255, 153, 0);">?</span></td>
   <td>&nbsp;</td>
   <td>&nbsp;</td>
   <td>&nbsp;</td>
   <td>39</td>
   <td>&nbsp;</td>
   <td>53.0</td>
  </tr><tr><td><code>badge</code></td>
   <td><span style="color: #f00;">No&nbsp;support</span></td>
   <td>53.0</td>
   <td><span title="Compatibility unknown; please update this." style="color: rgb(255, 153, 0);">?</span></td>
   <td>&nbsp;</td>
   <td>&nbsp;</td>
   <td>&nbsp;</td>
   <td>39</td>
   <td>&nbsp;</td>
   <td>53.0</td>
  </tr><tr><td><code>image</code></td>
   <td><span style="color: #f00;">No&nbsp;support</span></td>
   <td><span style="color: #f00;">No&nbsp;support</span></td>
   <td><span title="Compatibility unknown; please update this." style="color: rgb(255, 153, 0);">?</span></td>
   <td>&nbsp;</td>
   <td>&nbsp;</td>
   <td>&nbsp;</td>
   <td><span title="Compatibility unknown; please update this." style="color: rgb(255, 153, 0);">?</span></td>
   <td>&nbsp;</td>
   <td>55.0</td>
  </tr></tbody></table></div>

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
