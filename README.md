## ANDROID-BASED EVENT TABULATION SYSTEM FOR NONESCOST


## Development Requirements

* `NODEJS` - you need to install the latest [NODEJS](https://nodejs.org/en/) as this the required tool for Ionic Framework and other pre-requisite tool on the project.
* `XAMPP / WAMP` - for web app deployment and serving (local development).
* `IONIC FRAMEWORK` - you need to install the latest [Ionic Framework](http://ionicframework.com/) as this is the required tool for mobile app deployment.
* `CORDOVA` - you need to install the latest [Cordova](https://cordova.apache.org/) as this is the required tool for building mobile app on multiple platforms.
* `HOSTING SITE` - this used to deploy our web app on the live site, where anyone can access through it.
* `ANDROID SDK` - this is required to build android app.


## Setting up Web App

* To configure the connection. go to (Project Folder)/theme/templates/server/connection.php

 	  public $host  ='localhost';
    public $user ='root';
    public $pass  = '';
    public $db  ='tabulation';

Change the values inside that php to set your correct configuration.

## Deploying Web App

 You can deploy to any hosting site or locally using `WAMP` or `XAMPP`

 NOTE: It is important to get the IP ADDRESS of the hosting, this will be use on deploying and building the mobile app to access the API of the WEB APP

 OUTPUT: `(SERVER IP ADDRESS)/TABULATION-SYSTEM/theme/templates/server`
 Copy this and we will use this on building mobile app.

## Setting Up Mobile App

* First you need to install `ionic CLI` and `cordova CLI`. type   `npm install -g cordova ionic`   on `CMD`.
* After install cd to your project folder and cd to mobile `cd mobile`.
* Once your inside on the mobile folder. type again on cmd `ionic restore state` , this will restore the plugins requires on the app. Wait until it says complete or done.
* After restoring, it has now android platform as well as cordova plugins. We can now setup the app to access the API on the server.
* Go to `mobile/www/js/app.js at line 4`.. Change the constant `HOST` value to the `SERVER IP ADDRESS` value you have copied lately.
* Once done we can test it on local browser first, before building it to Android.
* Type `ionic serve` inside the folder mobile on cmd. Wait until it will on the browser. Emulate the browser to mobile view for better experience. Test and explore the app, to check if the app connects successfully.
* Once connected successfully, we can now build the app to android.

## Deploying Mobile App on Device
To build the app we need to have Android SDK setup successfully, Lets assume that Android SDK is installed and successfully setup.

* cd again to mobile folder, type `ionic build android`.. to build the android app, the process on building is being done by cordova associated by ionic, please wait until it notifies complete and this takes a minute to build.

* Once completed go to `project folder/mobile/platforms/android/build/outputs/apk/` and copy the build apk. 
* You can now share the apk to your classmates or friends to test the app, and let them install it on there device.
* You can also deploy the app directly to a devices, simply type `ionic run android` right after you `ionic build android` the app..


## Bugs and Issues

Have a bug or an issue with this template? [Open a new issue](https://github.com/jbagaresgaray/TABULATION-SYSTEM/issues) here on GitHub.
