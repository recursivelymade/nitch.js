nitch.js
========

Nitch is designed as a multi-device HTML5 games framework. It offers
* Simple DOM manipulation
* Simple events, such as on, off, fire and a custom cross-device "tap" event
* A state machine to track events through your app
* A progress loader system
* XHR requests
* Device and media query detection to deliver the right css and app cache manifest
* An abstracted stats system that captures stats even offline
* Better Math.Random based on the [Fisher–Yates shuffle](http://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)
* Oh yeah, and a simple modal
 
*Please note*, it's very early days so not everything is guaranteed  to work correctly bug reports and pull requests welcome.

Device and Browser support
==========================
Our aim is to reasonably support as many devices and browsers. At the moment we're concentrating on support for the following
* iOS 4.2.1+
* Firefox 5+
* Chrome (latest version)
* Safari 5+

In future we'll look at supporting
* Android 2.2.1 (based on http://developer.android.com/resources/dashboard/platform-versions.html)
* IE

Dependencies 
============
* [MediaMatch polyfill](https://github.com/paulirish/matchMedia.js)
* [ClassList polyfill](https://github.com/eligrey/classList.js)