/**
*  BrowserNotif.JS
*  (c) 2016 Ipan Ardian
*
*  Lets a web page send notifications that are displayed outside the page at the system level. 
*  This lets web apps send information to a user even if the application is idle, in the background, switched tabs or moved to a different app.
*  For details, see the web site: https://github.com/ipanardian/browser-notif
*  The MIT License
*/

/// <reference path='Notification.d.ts' />
/// <reference path='ServiceWorkerApi.d.ts' />

/**
 * Interface for BrowserNotif configuration
 * 
 * dir?: NotificationDirection;
 * lang?: string;
 * body?: string;
 * tag?: string;
 * image?: string;
 * icon?: string;
 * badge?: string;
 * sound?: string;
 * vibrate?: number | number[],
 * timestamp?: number,
 * renotify?: boolean;
 * silent?: boolean;
 * requireInteraction?: boolean;
 * data?: any;
 * actions?: NotificationAction[]
 * timeout?: number
 */
interface BrowserNotifOptions extends NotificationOptions {
    [key: string]: any
    timeout?: number
}

/**
 * Interface for BrowserNotif
 */
interface BrowserNotifInterface {
    notify(title: string, body: string, callback: (notif: Notification) => void): BrowserNotif
    click(callback: () => void): BrowserNotif
    close(): void
    error(callback: () => void): BrowserNotif
}

/**
 * Interface for Permission 
 */
interface PermissionInterface {
    Default: string
    Granted: string,
    Denied: string
}

/**
 * Interface for Data
 */
interface Data {
    [key: string]: any
    clickOnServiceWorker?: string
}

export default class BrowserNotif implements BrowserNotifInterface  
{
    /**
     * Title notification
     * @type {string}
     */
    protected title: string
    
    /**
     * Notification instance
     * @type {Notification}
     */
    protected notification: Notification
    
    /**
     * BrowserNotif configuration
     * @type {BrowserNotifOptions}
     */
    protected options: BrowserNotifOptions = {}
    
    /**
     * Notification Options
     * @type {NotificationOptions}
     */
    protected notifOptions: NotificationOptions = {}

    /**
     * Arbitrary data
     * @type {Data}
     */
    protected data: Data = {}
    
    /**
     * How long notification will appear in second. Set to 0 to make always visible
     * @type {number}
     */
    protected timeout: number = 0
    
    /**
     * Service Worker Path. Default : sw.min.js
     * @type {string}
     */
    protected serviceWorkerPath: string = 'sw.min.js'
    
    /**
     * Permission Type
     * @type {PermissionInterface}
     */
    readonly Permission: PermissionInterface = {
        Default: 'default',
        Granted: 'granted',
        Denied: 'denied'
    }

    /**
     * Readonly Win property
     * @type {Window}
     */
    protected static readonly Win: Window = window
    
    /**
     * BrowserNotif constructor
     * @param  {BrowserNotifOptions} options Optional config in object literal form
     * e.g {icon: 'image.png', timeout: 10}
     */
    constructor (options?: BrowserNotifOptions) {
        if (options) {
            Object.assign(this.options, options)
        }
        
        this._setOptions(this.options)
        
        if (options.timeout) {
            this.timeout = options.timeout
        }
        
        if (!BrowserNotif.isSupported()) {
            console.warn('This browser does not support system notifications');
        }
    }
    
    /**
     * Check is browser support for system notification
     * @return {boolean} 
     */
    public static isSupported(): boolean {
        if (!("Notification" in BrowserNotif.Win)) {
            return false
        }
        return true
    }
    
    /**
     * Set notification options
     * @param {BrowserNotifOptions} options
     */
    protected _setOptions(options: BrowserNotifOptions): void {
        for (let option in options) {
            if (['timeout', 'serviceWorkerPath'].indexOf(option) == -1) {
                this.notifOptions[option] = options[option]
            }
        }
    }
    
    /**
     * Register serviceWorker and Get request permission
     * @param  {string} callback 
     */
    public static requestPermission(callback: (permission: NotificationPermission) => void): void {
        Notification.requestPermission((permission: NotificationPermission) => {
            if (typeof callback === 'function') {
                callback.call(this, permission)
            }
        });
    }
    
    /**
     * Register serviceWorker
     * This is an experimental technology!
     */
    protected _registerServiceWorker(): void {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register(this.serviceWorkerPath).then(serviceWorkerRegistration => {
                console.log('Service Worker is ready :', serviceWorkerRegistration)
            })
            .catch(e => console.warn('BrowserNotif: ', e))
        }
    }
    
    /**
     * Show notification from serviceWorker
     * This is an experimental technology!
     * @param  {()}      callback
     */
    protected _showNotifServiceWorker(callback?: () => void): void {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then(registration => {
                if (!this.notifOptions.tag) {
                    this.notifOptions.tag = 'browserNotif_'+ Math.random().toString().substr(3, 10)
                }
                if (typeof this.data != 'undefined') {
                    this.notifOptions.data = JSON.stringify(this.data)
                }
                registration.showNotification(this.title, this.notifOptions).then(() => {
                    callback.call(this)
                })
            })
            .catch(e => console.error('BrowserNotif: ', e))
        }
    }
    
    /**
     * Get notification object from serviceWorker
     * @param  {Notification} callback
     */
    protected _getNotifServiceWorker(callback: (notification: Notification) => void): void {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then(registration => {
                registration.getNotifications({tag: this.notifOptions.tag}).then(notifications => {
                    if (notifications.length > 0) {
                        callback.call(this, notifications[0])
                    }
                }) 
            })
            .catch(e => console.error('BrowserNotif: ', e))
        }
    }
    
    /**
     * Trigger notify
     * @param  {string} title    
     * @param  {string} body     
     * @param  {Event}  callback 
     * @return {BrowserNotif}          
     */
    public notify(title: string, body: string, callback?: (notif: Notification) => void): BrowserNotif {
        if (!BrowserNotif.isSupported()) {
            alert(`${title}\n\n${body}`)
            return this
        }
        this._validateTitle(title)
        
        this.title              = title;
        this.notifOptions.body  = body;
        if (this.Permission.Granted === Notification.permission) {
            this._notify(callback);
        }
        else if (this.Permission.Denied !== Notification.permission) {
            BrowserNotif.requestPermission(permission => {
                if (this.Permission.Granted === permission) {
                    this._notify(callback);
                }
            });
        }
        else {
            console.warn('User denied the notification permission')
        }
        
        return this
    }
    
    /**
     * Validate title of Notification
     * @param {string} title
     */
    protected _validateTitle(title: string): void {
        if (typeof title != 'string') {
            throw new Error('BrowserNotif: Title of notification must be a string');
        }
        else if (title.trim() == '') {
            throw new Error('BrowserNotif: Title of notification could not be empty');
        }
    }
    
    /**
     * Create an instance of Notification API
     * @param  {Notification} callback
     */
    protected _notify(callback?: (notif: Notification) => void): void {
        if (!('Notification' in BrowserNotif.Win)) {
            this._registerServiceWorker()
            this._showNotifServiceWorker(() => {
                this._getNotifServiceWorker(notification => {
                    this.notification = notification
                    if (typeof callback === 'function') {
                        callback.call(this, this.notification)
                    }

                })
            })
        }
        else {
            this.notification = new Notification(this.title, this.notifOptions)
            this._closeNotification()
            if (typeof callback === 'function') {
                callback.call(this, this.notification)
            }
        }
        
    }
    
    /**
     * Close an instance of Notification automatically by given timeout
     */
    protected _closeNotification(): void {
        if (this.timeout > 0 && this.notification instanceof Notification) {
            setTimeout(this.notification.close.bind(this.notification), this.timeout * 1e3);
        }
    }
    
    /**
     * Click event on Notification
     * @param  {}  callback
     * @return {BrowserNotif}
     */
    public click(callback: () => void): BrowserNotif {
        if (typeof callback === 'function' && this.notification instanceof Notification) {
            this.notification.onclick = () => {
                callback.call(this);
            }
        }
        this.notification.close()
        return this
    }
    
    /**
     * Click event on serviceWorker Notification
     * @param  {}  callback
     * @return {BrowserNotif}
     */
    public clickOnServiceWorker(callback: () => void): BrowserNotif {
        if (typeof callback === 'function') {
            this.data.clickOnServiceWorker = callback.toString()
        }
        return this
    }
    
    /**
     * Close an instance of Notification
     */
    public close(): void {
        if (this.notification instanceof Notification) {
            this.notification.close()
        }
    }
    
    /**
     * Error of Notification
     * @param  {}  callback
     * @return {BrowserNotif}
     */
    public error(callback: () => void): BrowserNotif {
        if (typeof callback === 'function' && this.notification instanceof Notification) {
            this.notification.onerror = () => {
                callback.call(this);
            }
        }
        return this
    }
}