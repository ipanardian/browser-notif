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

import {BrowserNotifOptions, BrowserNotifInterface, BrowserNotifEvent, BrowserNotifData, PermissionInterface} from './Interface'

export default class BrowserNotif implements BrowserNotifInterface  
{
    /**
     * Title of Notification
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
    protected data: BrowserNotifData = {}
    
    /**
     * How long notification will appear in second. Set to 0 to make always visible
     * @type {number}
     */
    protected timeout: number = 0
    
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
     * @param  {BrowserNotifOptions} options Optional options in object literal form
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
     * @param  Promise<NotificationPermission>
     */
    public static requestPermission(): Promise<NotificationPermission> {
        return new Promise((resolve, reject) => {
            Notification.requestPermission().then((permission: NotificationPermission) => {
                resolve(permission)
            })
            .catch(err => reject(err))
        })
    }
    
    /**
     * Register serviceWorker
     * This is an experimental technology!
     */
    protected _registerServiceWorker(): void {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register(this.options.serviceWorkerPath || 'sw.js').then(serviceWorkerRegistration => {
                console.log('Service Worker is ready :', serviceWorkerRegistration)
            })
            .catch(e => console.warn('BrowserNotif: ', e))
        }
    }
    
    /**
     * Show notification from serviceWorker
     * This is an experimental technology!
     * @param  Promise<NotificationEvent>
     */
    protected _showNotifServiceWorker(): Promise<NotificationEvent> {
        return new Promise((resolve, reject) => {
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.ready.then(registration => {
                    if (!this.notifOptions.tag) {
                        this.notifOptions.tag = 'browserNotif_'+ Math.random().toString().substr(3, 10)
                    }
                    if (Object.keys(this.data).length > 0) {
                        this.notifOptions.data = JSON.stringify(this.data)
                    }
                    registration.showNotification(this.title, this.notifOptions).then((notificationEvent) => {
                        resolve(notificationEvent)
                    })
                })
                .catch(e => {
                    throw new Error('BrowserNotif: '+ e)
                })
            }
            else {
                throw new Error('BrowserNotif: serviceWorker not available')
            }
        })
    }
    
    /**
     * Get notification object from serviceWorker
     * @param  Promise<Notification>
     */
    protected _getNotifServiceWorker(): Promise<Notification> {
        return new Promise((resolve, reject) => {
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.ready.then(registration => {
                    registration.getNotifications({tag: this.notifOptions.tag}).then(notifications => {
                        if (notifications.length > 0) {
                            resolve(notifications[0])
                        }
                        else {
                            reject('BrowserNotif: Notification not found')
                        }
                    }) 
                })
                .catch(e => {
                    reject('BrowserNotif: '+ e)
                })
            }
        })
    }
    
    /**
     * Create notify
     * @param  {string} title    
     * @param  {string} body     
     * @param  {Event}  callback 
     * @return {BrowserNotif}          
     */
    public notify(title: string, body: string, notifEvent?: BrowserNotifEvent): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!BrowserNotif.isSupported()) {
                alert(`${title}\n\n${body}`)
                resolve() 
            }
            this._validateTitle(title)
            
            this.title              = title;
            this.notifOptions.body  = body;
            if (this.Permission.Granted === Notification.permission) {
                this._notify(notifEvent).then(() => resolve())
            }
            else if (this.Permission.Denied !== Notification.permission) {
                BrowserNotif.requestPermission().then(permission => {
                    if (this.Permission.Granted === permission) {
                        this._notify(notifEvent).then(() => resolve())
                    }
                });
            }
            else {
                reject('User denied the notification permission')
            }
        })
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
     * @return {Promise<Notification>}
     */
    protected _notify(notifEvent?: BrowserNotifEvent): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.isMobile()) {
                Promise.resolve().then(() => {
                    this._registerServiceWorker()
                    this._prepareClickOnServiceWorker.apply(this, [notifEvent])
                    return this._showNotifServiceWorker()
                    
                })
                .then((notificationEvent) => {
                    this._getNotifServiceWorker().then(notification => {
                        this.notification = notification
                        resolve()
                    })
                })
                .catch(err => {
                    reject(err)
                })
            }
            else {
                Promise.resolve().then(() => {
                    if (this.notification instanceof Notification) {
                        this.notification.close()
                    }
                    this.notification = new Notification(this.title, this.notifOptions)
                    this._prepareNotifEvent.apply(this, [notifEvent])
                    this._closeNotification()
                    resolve()
                })
                .catch(err => {
                    reject(err)
                })
            }
        })
    }
    
    /**
     * Close an instance of Notification automatically by given timeout
     */
    protected _closeNotification(): void {
        if (this.timeout > 0 && this.notification instanceof Notification) {
            setTimeout(this.notification.close.bind(this.notification), this.timeout * 1e3);
        }
    }

    protected _prepareNotifEvent(notifEvent?: BrowserNotifEvent): void {
        if (typeof notifEvent != 'undefined' && this.notification instanceof Notification) {
            if (typeof notifEvent.click == 'function') {
                this.notification.onclick = () => {
                    this.notification.close()
                    notifEvent.click.call(this)
                }
            }
            if (typeof notifEvent.error == 'function') {
                this.notification.onerror = () => {
                    notifEvent.error.call(this)
                }
            }
        }
    }
    
    /**
     * Click event on Notification
     * @param  {}  callback
     * @return {BrowserNotif}
     */
    private _click(callback: () => void): void {
        if (typeof callback === 'function' && this.notification instanceof Notification) {
            this.notification.onclick = () => {
                this.notification.close()
                callback.call(this);
            }
        }
    }
    
    /**
     * Click event on serviceWorker Notification
     * @param  {}  callback
     * @return {BrowserNotif}
     */
    protected _prepareClickOnServiceWorker(notifEvent?: BrowserNotifEvent): void {
        if (typeof notifEvent != 'undefined' && typeof notifEvent.clickOnServiceWorker == 'function') {
            this.data.clickOnServiceWorker = notifEvent.clickOnServiceWorker.toString()
        }
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
    
    /**
     * Detect mobile device
     * @return {boolean}
     */
    public isMobile(): boolean {
        let mobileExp: RegExp = new RegExp(`
                                    Android|webOS|iPhone|iPad|
                                    BlackBerry|Windows Phone|
                                    Opera Mini|IEMobile|Mobile`, 
                                'i');
        
        return mobileExp.test(navigator.userAgent)
    }
}