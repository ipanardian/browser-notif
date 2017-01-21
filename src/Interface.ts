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
 * timeout?: number;
 * serviceWorkerPath?: string; Default : sw.js
 */
export interface BrowserNotifOptions extends NotificationOptions {
    [key: string]: any
    timeout?: number
    serviceWorkerPath?: string
}

/**
 * Interface for BrowserNotif
 */
export interface BrowserNotifInterface {
    notify(title: string, body: string, notifEvent?: BrowserNotifEvent): Promise<any>
    close(): void
    isMobile(): boolean
}

/**
 * Interface for BrowserNotifEvent
 */
export interface BrowserNotifEvent {
    click?(): void
    clickOnServiceWorker?(clients: Clients): void
    error?(): void
}

/**
 * Interface for Permission 
 */
export interface PermissionInterface {
    Default: string
    Granted: string
    Denied: string
}

/**
 * Interface for NotifData
 */
export interface BrowserNotifData {
    [key: string]: any
    clickOnServiceWorker?: string
}

/**
 * The Clients interface of the Service Workers API
 */
export interface Clients {
    get(id: string): Promise<Client>
    matchAll(options: Object): Promise<Clients>
    openWindow(url: string): void
    claim(): Promise<any>
}

/**
 * The Client interface of the Service Workers API
 */
export interface Client {
    readonly frameType: string
    readonly id: string
    readonly url: string
    postMessage(message: string, transfer?: Object): void
}