/**
*  BrowserNotif.JS
*  (c) 2016 Ipan Ardian
*
*  Lets a web page send notifications that are displayed outside the page at the system level. 
*  This lets web apps send information to a user even if the application is idle, in the background, switched tabs or moved to a different app.
*  For details, see the web site: https://github.com/ipanardian/browser-notif
*  The MIT License
*
*  This is ServiceWorkerApi script
*/

console.log('Started');
self.addEventListener('install', function(event) {
  self.skipWaiting();
  console.log('Installed');
});
self.addEventListener('activate', function(event) {
  console.log('Activated');
});
self.onnotificationclick = function(event) {
    if (typeof event.notification.data != 'null') {
      try {
        var data = JSON.parse(event.notification.data)
      } catch (error) {
        throw new Error('BrowserNotif: Error parse '+ error)
      }
      try {
        if (data !== null && !data.clickOnServiceWorker) {
          Function("(" +data['clickOnServiceWorker']+ ")()")()   
        }
      } catch (error) {
        throw new Error('BrowserNotif: Error clickOnServiceWorker '+ error)
      }
    }
    event.notification.close()
};