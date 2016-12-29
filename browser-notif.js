'use strict';
class BrowserNotif {
    constructor(configs) {
        this.configs = {};
        this.options = {};
        this.timeout = 0;
        if (configs) {
            Object.assign(this.configs, configs);
        }
        this._setOptions(this.configs);
        if (configs.timeout) {
            this.timeout = configs.timeout;
        }
        if (!BrowserNotif.isSupported()) {
            console.warn('This browser does not support system notifications');
        }
    }
    static isSupported() {
        if (!("Notification" in window)) {
            return false;
        }
        return true;
    }
    _setOptions(configs) {
        for (let config in configs) {
            if (['timeout'].indexOf(config) == -1) {
                this.options[config] = configs[config];
            }
        }
    }
    requestPermission(callback) {
        Notification.requestPermission((permission) => {
            if (typeof callback === 'function') {
                callback.call(this, permission);
            }
        });
        return this;
    }
    notify(title, body, callback) {
        if (!BrowserNotif.isSupported()) {
            return this;
        }
        this.title = title;
        this.options.body = body;
        if ("granted" === Notification.permission) {
            this._notify(callback);
        }
        else if ('denied' !== Notification.permission) {
            this.requestPermission(permission => {
                if ("granted" === permission) {
                    this._notify(callback);
                }
            });
        }
        else {
            console.warn('User denied the notification permission');
        }
        return this;
    }
    _notify(callback) {
        this.notification = new Notification(this.title, this.options);
        this._closeNotification();
        if (typeof callback === 'function') {
            callback.call(this, this.notification);
        }
    }
    _closeNotification() {
        if (this.timeout > 0 && this.notification instanceof Notification) {
            setTimeout(this.notification.close.bind(this.notification), this.timeout * 1000);
        }
    }
    click(callback) {
        if (typeof callback === 'function' && this.notification instanceof Notification) {
            this.notification.onclick = () => {
                callback.call(this);
            };
        }
        return this;
    }
    close() {
        if (this.notification instanceof Notification) {
            this.notification.close();
        }
    }
    error(callback) {
        if (typeof callback === 'function' && this.notification instanceof Notification) {
            this.notification.onerror = () => {
                callback.call(this);
            };
        }
        return this;
    }
}
