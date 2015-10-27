angular.module('geng', ['ngResource', 'hljs'])

.config(function (hljsServiceProvider) {
    hljsServiceProvider.setOptions({
        tabReplace: '    '
    });
})

.factory('Query', function($resource) {

    return $resource('/build', {}, {
        request : {
            method : 'POST',
            data : '@params'
        },
    });

})

.controller('AppCtrl', function($scope, Query) {

    $scope.application = {};
    $scope.application.endpoints = [];

    $scope.add_endpoint = function() {
        $scope.application.endpoints.push({});
    };

    $scope.add_kv = function(endpoint) {
        if (!endpoint.kvs) {
            endpoint.kvs = [];
        }
        endpoint.kvs.push({});
    };

    $scope.generate_output = function() {
        var params = $scope.application;
        Query.request(params, function(data) {
            $scope.index_output = data.index;
            $scope.app_output = data.app;
            $scope.controller_output = data.controller;
            $scope.service_output = data.service;
            $scope.api_output = data.api;
            $scope.script_output = data.script;
            $scope.nav_output = data.nav;
            $scope.tests_output = data.tests;
            $scope.endpoints = data.endpoints;
            $scope.tarfile = data.tarfile;
        });
    };

    $scope.add_plugin = function(plugin_id) {
        console.log(plugin_id);
    };

    $scope.plugins = [
        {
            "cmd": "cordova plugin add https://github.com/EddyVerbruggen/cordova-plugin-actionsheet.git",
            "description": "<p>The Action Sheet plugin shows a native sheet of options the user can choose from. iOS uses the native <code>UIActionSheet</code>. Android uses the native <code>AlertDialog</code>.</p>",
            "id": "actionSheet",
            "name": "Action Sheet",
            "url": "http://ngcordova.com/docs/plugins/actionSheet"
        },
        {
            "cmd": "cordova plugin add https://github.com/floatinghotpot/cordova-plugin-admob.git",
            "description": "<p>The <a href=\"https://github.com/floatinghotpot/cordova-plugin-admob\">AdMob</a> plugin presents AdMob Ads in Mobile App/Games natively from JavaScript.</p>",
            "id": "adMob",
            "name": "Ad Mob",
            "url": "http://ngcordova.com/docs/plugins/adMob"
        },
        {
            "cmd": "cordova plugin add https://github.com/ohh2ahh/AppAvailability.git",
            "description": "<p>The <a href=\"https://github.com/ohh2ahh/AppAvailability\">AppAvailability</a> plugin allows you to check if an app is installed on the user&#39;s device. It requires an URI Scheme (e.g. twitter://) on iOS or a Package Name (e.g com.twitter.android) on Android.</p>",
            "id": "appAvailability",
            "name": "App Availability",
            "url": "http://ngcordova.com/docs/plugins/appAvailability"
        },
        {
            "cmd": "cordova plugin add https://github.com/pushandplay/cordova-plugin-apprate.git",
            "description": "<p>The <a href=\"https://github.com/pushandplay/cordova-plugin-apprate\">AppRate</a> plugin makes it easy to prompt the user to rate your app, either now or later, or never.</p>",
            "id": "appRate",
            "name": "App Rate",
            "url": "http://ngcordova.com/docs/plugins/appRate"
        },
        {
            "cmd": "cordova plugin add https://github.com/whiteoctober/cordova-plugin-app-version.git",
            "description": "<p>Reads the version of your app from the target build settings.</p>",
            "id": "appVersion",
            "name": "App Version",
            "url": "http://ngcordova.com/docs/plugins/appVersion"
        },
        {
            "cmd": "cordova plugin add https://github.com/katzer/cordova-plugin-badge.git",
            "description": "<p>Access and modify the badge number of the app icon on various mobile platforms including iOS, Android and Windows Phone.</p>",
            "id": "badge",
            "name": "Badge",
            "url": "http://ngcordova.com/docs/plugins/badge"
        },
        {
            "cmd": "cordova plugin add https://github.com/christocracy/cordova-plugin-background-geolocation.git",
            "description": "<p>Cross-platform background geolocation for Cordova / PhoneGap with battery-saving &quot;circular region monitoring&quot; and &quot;stop detection&quot;.</p>",
            "id": "backgroundGeolocation",
            "name": "Background Geolocation",
            "url": "http://ngcordova.com/docs/plugins/backgroundGeolocation"
        },
        {
            "cmd": "cordova plugin add cordova-plugin-battery-status",
            "description": "<p>The <a href=\"https://github.com/apache/cordova-plugin-battery-status\">BatteryStatus</a> plugin provides an API for the current battery status.</p>",
            "id": "batteryStatus",
            "name": "Battery Status",
            "url": "http://ngcordova.com/docs/plugins/batteryStatus"
        },
        {
            "cmd": "cordova plugin add https://github.com/wildabeast/BarcodeScanner.git",
            "description": "<p>The <a href=\"https://github.com/wildabeast/BarcodeScanner/\">Barcode Scanner Plugin</a> opens a camera view and automagically scans a barcode, returning the data back to you.</p>",
            "id": "barcodeScanner",
            "name": "Barcode Scanner",
            "url": "http://ngcordova.com/docs/plugins/barcodeScanner"
        },
        {
            "cmd": "cordova plugin add https://github.com/EddyVerbruggen/Calendar-PhoneGap-Plugin.git",
            "description": "<p>The <a href=\"https://github.com/EddyVerbruggen/Calendar-PhoneGap-Plugin\">Calendar Plugin</a> allows you to manage events in the devices native calendar.</p>",
            "id": "calendar",
            "name": "Calendar",
            "url": "http://ngcordova.com/docs/plugins/calendar"
        },
        {
            "cmd": "cordova plugin add cordova-plugin-camera",
            "description": "<p>This service makes it easy to use the <a href=\"https://github.com/apache/cordova-plugin-camera\"><code>cordova-plugin-camera</code></a> plugin to take pictures and video\nfrom a device.</p>",
            "id": "camera",
            "name": "Camera",
            "url": "http://ngcordova.com/docs/plugins/camera"
        },
        {
            "cmd": "$cordova plugin add cordova-plugin-media-capture",
            "description": "<p>This plugin allows you to record sound, video and images through the native capabilities of the device.</p>",
            "id": "capture",
            "name": "Capture",
            "url": "http://ngcordova.com/docs/plugins/capture"
        },
        {
            "cmd": "cordova plugin add https://github.com/VersoSolutions/CordovaClipboard.git",
            "description": "<p>The <a href=\"https://github.com/VersoSolutions/CordovaClipboard\">Clipboard</a> plugin provides Clipboard management for Cordova/PhoneGap that supports iOS, Android, and Windows Phone 8.</p>",
            "id": "clipboard",
            "name": "Clipboard",
            "url": "http://ngcordova.com/docs/plugins/clipboard"
        },
        {
            "cmd": "cordova plugin add cordova-plugin-contacts",
            "description": "<p>A powerful way to create, remove, and search through contacts on the device.</p>",
            "id": "contacts",
            "name": "Contacts",
            "url": "http://ngcordova.com/docs/plugins/contacts"
        },
        {
            "cmd": "cordova plugin add https://github.com/VitaliiBlagodir/cordova-plugin-datepicker.git",
            "description": "<p>Show a native date or time picker widget.</p>",
            "id": "datePicker",
            "name": "Date Picker",
            "url": "http://ngcordova.com/docs/plugins/datePicker"
        },
        {
            "cmd": "cordova plugin add cordova-plugin-device",
            "description": "<p>Grab device related information, such as platform, and device model.</p>",
            "id": "device",
            "name": "Device",
            "url": "http://ngcordova.com/docs/plugins/device"
        },
        {
            "cmd": "cordova plugin add cordova-plugin-device-motion",
            "description": "<p>This plugin provides access to the device&#39;s accelerometer. The accelerometer is a motion sensor that detects the change (delta) in movement relative to the current device orientation, in three dimensions along the x, y, and z axis.</p>",
            "id": "deviceMotion",
            "name": "Device Motion",
            "url": "http://ngcordova.com/docs/plugins/deviceMotion"
        },
        {
            "cmd": "cordova plugin add cordova-plugin-device-orientation",
            "description": "<p>This plugin provides access to the device&#39;s compass. The compass is a sensor that detects the direction or heading that the device is pointed, typically from the top of the device. It measures the heading in degrees from 0 to 359.99, where 0 is north.</p>",
            "id": "deviceOrientation",
            "name": "Device Orientation",
            "url": "http://ngcordova.com/docs/plugins/deviceOrientation"
        },
        {
            "cmd": "cordova plugin add cordova-plugin-dialogs",
            "description": "<p>Trigger alert, confirm, and prompt windows, or send beeps (beep, beep!)</p>",
            "id": "dialogs",
            "name": "Dialogs",
            "url": "http://ngcordova.com/docs/plugins/dialogs"
        },
        {
            "cmd": "cordova plugin add https://github.com/katzer/cordova-plugin-email-composer.git",
            "description": "<p>The plugin provides access to the standard interface that manages the editing and sending an email message. You can use this view controller to display a standard email view inside your application and populate the fields of that view with initial values, such as the subject, email recipients, body text, and attachments. The user can edit the initial contents you specify and choose to send the email or cancel the operation.</p>",
            "id": "emailComposer",
            "name": "Email Composer",
            "url": "http://ngcordova.com/docs/plugins/emailComposer"
        },
        {
            "cmd": "cordova plugin add https://github.com/Wizcorp/phonegap-facebook-plugin.git --variableAPP_ID=&quot;123456789&quot;--variableAPP_NAME=&quot;myApplication&quot;",
            "description": "<p>The Facebook Connect plugin to obtain access to the native FB application on iOS and Android. This plugin is not simple to install so make sure to check out the official docs.</p>",
            "id": "facebook",
            "name": "Facebook",
            "url": "http://ngcordova.com/docs/plugins/facebook"
        },
        {
            "cmd": "cordova plugin add cordova-plugin-file",
            "description": "<p>A Plugin to get access to the device&#39;s files and directories.</p>",
            "id": "file",
            "name": "File",
            "url": "http://ngcordova.com/docs/plugins/file"
        },
        {
            "cmd": "cordova plugin add cordova-plugin-file-transfer",
            "description": "<p>This plugin allows you to upload and download files.</p>",
            "id": "fileTransfer",
            "name": "File Transfer",
            "url": "http://ngcordova.com/docs/plugins/fileTransfer"
        },
        {
            "cmd": "cordova plugin add https://github.com/pwlin/cordova-plugin-file-opener2.git",
            "description": "<p>This plugin will open a file on your device file system with its default application.</p>",
            "id": "fileOpener2",
            "name": "File Opener2",
            "url": "http://ngcordova.com/docs/plugins/fileOpener2"
        },
        {
            "cmd": "cordova plugin add https://github.com/EddyVerbruggen/Flashlight-PhoneGap-Plugin.git",
            "description": "<p>Flashlight Cordova plugin.</p>",
            "id": "flashlight",
            "name": "Flashlight",
            "url": "http://ngcordova.com/docs/plugins/flashlight"
        },
        {
            "cmd": "cordova plugin add cordova-plugin-geolocation",
            "description": "<p>Grab the current location of the user, or grab continuous location changes:</p>",
            "id": "geolocation",
            "name": "Geolocation",
            "url": "http://ngcordova.com/docs/plugins/geolocation"
        },
        {
            "cmd": "cordova plugin add cordova-plugin-globalization",
            "description": "<p>Obtains information and performs operations specific to the user&#39;s locale and timezone.</p>",
            "id": "globalization",
            "name": "Globalization",
            "url": "http://ngcordova.com/docs/plugins/globalization"
        },
        {
            "cmd": "cordova plugin add https://github.com/danwilson/google-analytics-plugin.git",
            "description": "<p>A Plugin to connect to Google&#39;s native Universal Analytics SDK 3.0</p>",
            "id": "googleAnalytics",
            "name": "Google Analytics",
            "url": "http://ngcordova.com/docs/plugins/googleAnalytics"
        },
        {
            "cmd": "cordova plugin add https://github.com/Telerik-Verified-Plugins/HealthKit.git",
            "description": "<p><img src=\"/img/plugins/healthkit/hk.png\" style=\"width: 128px\" /></p>",
            "id": "healthkit",
            "name": "HealthKit",
            "url": "http://ngcordova.com/docs/plugins/healthkit"
        },
        {
            "cmd": "cordova plugin add https://github.com/wymsee/cordova-imagePicker.git",
            "description": "<p>Cordova Plugin For Multiple Image Selection - implemented for iOS and Android 4.0 and above.</p>",
            "id": "imagePicker",
            "name": "Image Picker",
            "url": "http://ngcordova.com/docs/plugins/imagePicker"
        },
        {
            "cmd": "cordova plugin add cordova-plugin-inappbrowser",
            "description": "<p>Provides a web browser view. It could be used to open images, access web pages, and open PDF files.</p>",
            "id": "inAppBrowser",
            "name": "In App Browser",
            "url": "http://ngcordova.com/docs/plugins/inAppBrowser"
        },
        {
            "cmd": "cordova plugin add https://github.com/vstirbu/InstagramPlugin.git",
            "description": "<p>Cordova Plugin For opening images in the Instagram app.</p>",
            "id": "instagram",
            "name": "Instagram",
            "url": "http://ngcordova.com/docs/plugins/instagram"
        },
        {
            "cmd": "cordova plugin add https://github.com/driftyco/ionic-plugins-keyboard.git",
            "description": "<p>Accessing the Keyboard of iOS from cordova</p>",
            "id": "keyboard",
            "name": "Keyboard",
            "url": "http://ngcordova.com/docs/plugins/keyboard"
        },
        {
            "cmd": "cordova plugin add https://github.com/shazron/KeychainPlugin.git",
            "description": "<p>Accessing the keychain of iOS from cordova</p>",
            "id": "keychain",
            "name": "Keychain",
            "url": "http://ngcordova.com/docs/plugins/keychain"
        },
        {
            "cmd": "cordova plugin add de.appplant.cordova.plugin.local-notification",
            "description": "<p>The essential purpose of local notifications is to enable an application to inform its users that it has something for them \u2014 for example, a message or an upcoming appointment \u2014 when the application isn\u2019t running in the foreground.\nThey are scheduled by an application and delivered on the same device.</p>",
            "id": "localNotification",
            "name": "Local Notification",
            "url": "http://ngcordova.com/docs/plugins/localNotification"
        },
        {
            "cmd": "cordova plugin add cordova-plugin-media",
            "description": "<p>This plugin provides the ability to record and play back audio files on a device.</p>",
            "id": "media",
            "name": "Media",
            "url": "http://ngcordova.com/docs/plugins/media"
        },
        {
            "cmd": "cordova plugin add https://github.com/SidneyS/cordova-plugin-nativeaudio.git",
            "description": "<p>Cordova / PhoneGap 3.5+ extension for Native Audio playback, aimed at HTML5 gaming and audio applications which require minimum latency, polyphony and concurrency.</p>",
            "id": "nativeAudio",
            "name": "Native Audio",
            "url": "http://ngcordova.com/docs/plugins/nativeAudio"
        },
        {
            "cmd": "cordova plugin add cordova-plugin-network-information",
            "description": "<p>This plugin provides an implementation of an old version of the <a href=\"http://www.w3.org/TR/2011/WD-netinfo-api-20110607/\">Network Information API</a>. It provides information about the device&#39;s cellular and wifi connection, and whether the device has an internet connection.</p>",
            "id": "network",
            "name": "Network",
            "url": "http://ngcordova.com/docs/plugins/network"
        },
        {
            "cmd": "cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-inappbrowser.git",
            "description": "<p>Use browser login flow for various Oauth providers</p>",
            "id": "oauth",
            "name": "OAuth",
            "url": "http://ngcordova.com/docs/plugins/oauth"
        },
        {
            "cmd": "cordova plugin add https://github.com/Paldom/PinDialog.git",
            "description": "<p>Numeric password dialog.</p>",
            "id": "pinDialog",
            "name": "Pin Dialog",
            "url": "http://ngcordova.com/docs/plugins/pinDialog"
        },
        {
            "cmd": "cordova plugin add https://github.com/dferrell/plugins-application-preferences.git",
            "description": "<p>Accessing application preference with the <a href=\"https://github.com/dferrell/plugins-application-preferences\">application-preferences</a> plugin.</p>",
            "id": "preferences",
            "name": "Preferences",
            "url": "http://ngcordova.com/docs/plugins/preferences"
        },
        {
            "cmd": "cordova plugin add https://github.com/katzer/cordova-plugin-printer.git",
            "description": "<p>Printer plugin</p>",
            "id": "printer",
            "name": "Printer",
            "url": "http://ngcordova.com/docs/plugins/printer"
        },
        {
            "cmd": "cordova plugin add https://github.com/pbernasconi/cordova-progressIndicator.git",
            "description": "<p>Various Progress Dialogs for indicating loading or downloading.</p>",
            "id": "progressIndicator",
            "name": "Progress Indicator",
            "url": "http://ngcordova.com/docs/plugins/progressIndicator"
        },
        {
            "cmd": "cordova plugin add https://github.com/phonegap-build/PushPlugin.git",
            "description": "<p>Allows your application to receive push notifications. To receive notifications in your controllers or services, listen for <code>$cordovaPush:notificationReceived</code> event.</p>",
            "id": "pushNotifications",
            "name": "Push Notifications",
            "url": "http://ngcordova.com/docs/plugins/pushNotifications"
        },
        {
            "cmd": "cordova plugin add https://github.com/cordova-sms/cordova-sms-plugin.git",
            "description": "<p>Easily send SMS natively in iOS or Android SMS app</p>",
            "id": "sms",
            "name": "SMS",
            "url": "http://ngcordova.com/docs/plugins/sms"
        },
        {
            "cmd": "cordova plugin add https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin.git",
            "description": "<p>Share images, text, messages via Facebook, Twitter, Email, SMS, WhatsApp, etc using this plugin.</p>",
            "id": "socialSharing",
            "name": "Social Sharing",
            "url": "http://ngcordova.com/docs/plugins/socialSharing"
        },
        {
            "cmd": "cordova plugin add https://github.com/Paldom/SpinnerDialog.git",
            "description": "<p>A dialog with a spinner wheel.</p>",
            "id": "spinnerDialog",
            "name": "Spinner Dialog",
            "url": "http://ngcordova.com/docs/plugins/spinnerDialog"
        },
        {
            "cmd": "cordova plugin add cordova-plugin-splashscreen",
            "description": "<p>Show or hide the Splash Screen.</p>",
            "id": "splashscreen",
            "name": "Splashscreen",
            "url": "http://ngcordova.com/docs/plugins/splashscreen"
        },
        {
            "cmd": "cordova plugin add https://github.com/litehelpers/Cordova-sqlite-storage.git",
            "description": "<p>Native interface to sqlite in a Cordova/PhoneGap plugin for Android/iOS/WP(8), with HTML5 Web SQL API <a href=\"https://github.com/brodysoft/Cordova-SQLitePlugin/blob/master/README.md\">View Docs</a></p>",
            "id": "sqlite",
            "name": "SQLite",
            "url": "http://ngcordova.com/docs/plugins/sqlite"
        },
        {
            "cmd": "cordova plugin add cordova-plugin-statusbar",
            "description": "<p>Configure the device&#39;s StatusBar with colors and styles.</p>",
            "id": "statusbar",
            "name": "StatusBar",
            "url": "http://ngcordova.com/docs/plugins/statusbar"
        },
        {
            "cmd": "cordova plugin add https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin.git",
            "description": "<p>This plugin allows you to show a native Toast (a little text popup) on iOS, Android and WP8. It&#39;s great for showing a non intrusive native notification which is guaranteed always in the viewport of the browser.</p>",
            "id": "toast",
            "name": "Toast",
            "url": "http://ngcordova.com/docs/plugins/toast"
        },
        {
            "cmd": "cordova plugin add cordova-plugin-vibration",
            "description": "<p>Vibrate the device programmatically.</p>",
            "id": "vibration",
            "name": "Vibration",
            "url": "http://ngcordova.com/docs/plugins/vibration"
        },
        {
            "cmd": "cordova plugin add https://github.com/MobileChromeApps/zip.git",
            "description": "<p>Unzip a file.</p>",
            "id": "zip",
            "name": "ZIP",
            "url": "http://ngcordova.com/docs/plugins/zip"
        }
    ]
    
})
;
