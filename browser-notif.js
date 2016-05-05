/**
*  BrowserNotif.JS
*  (c) 2016 Ipan Ardian
*
*  Lets a web page or app send notifications that are displayed outside the page at the system level. 
*  This lets web apps send information to a user even if the application is idle or in the background.
*  For details, see the web site: https://github.com/ipanardian/browser-notif
*  The MIT License
*/

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['b'], b => {
            return (root.browserNotif = factory(b));
        });
    } 
    else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('b'));
    } 
    else {
        root.browserNotif = factory(root.b);
    }
}(this, b => {
    'use strict';

    if (!("Notification" in this)) {
        console.warn('This browser does not support system notifications');
    }

    let $ = {
        notification: {},
        title: null,
        options: {
            // the body string of the notification
            body: null,

            // structured clone of the notification's data
            data: null,

            // contains the URL of an icon to be displayed as part of the notification
            icon: null,
            
            // indicates the text direction of the notification
            // auto: adopts the browser's language setting behaviour (the default.)
            // ltr: left to right.
            // rtl : right to left.
            dir: 'auto',

            // indicates the text direction of the notification. i.e 'en-US'
            // See the Sitepoint ISO 2 letter language codes page for a simple reference.
            lang: '',

            // identifying tag for the notification
            tag: '',

            // Below are experiment
            // renotify: false,
            // silent: false, 
            // vibrate: [200, 100, 200]
        },
        _isEmpty (...args) {
            var count = 0;
            for (let i in args) {
                if (typeof args[i] === 'undefined' || '' == args[i]) {
                    count++;
                }
            }
            if (count > 0) {
                return true;
            }
            else {
                return false;
            }
        },
        _closeNotification () {
            let n = this.notification;
            setTimeout(n.close.bind(n), 5000);
        },
        _notify (callback) {
            this.notification = new Notification(this.title, this.options)
            this._closeNotification();
            
            if (this.notification.title) {
                this._callback(callback);
            }
            
        },
        _callback (callback) {
            if (typeof callback === 'function') {
              callback.call(this);
            }
        }
    }

    return {
        config (options) {
            if (typeof options === 'object') {
                Object.assign($.options, options);
            }
            return this;
        },
        requestPermission (callback) {
            Notification.requestPermission(permission => {
              if (typeof callback === 'function') {
                  callback.call(this, permission);
              }
            });
            return this;
        },
        notify (title, body, callback) {
            if (!$._isEmpty(title, body)) {
                $.title = title;
                $.options.body = body;

                if ("granted" === Notification.permission) {
                    $._notify(callback);
                }
                else if ('denied' !== Notification.permission) {
                    this.requestPermission(permission => {
                      if ("granted" === permission) {
                        $._notify(callback);
                      }
                    });
                }
                else {
                    console.warn('User denied the notification permission');
                }
            }
            return this;
        },
        onClick (callback) {
            if (typeof callback === 'function') {
                $.notification.onclick = () => {
                    callback.call(this);
                }
            }
            return this;
        },
        onError (callback) {
            if (typeof callback === 'function') {
                $.notification.onerror = () => {
                    callback.call(this);
                }
            }
            return this;
        }
    }
}));