// Karma configuration
// Generated on Wed Jan 01 2014 12:26:05 GMT+0200 (IST)

module.exports = function(config) {
    config.set({

        // base path, that will be used to resolve files and exclude
        basePath: '',

        plugins: [
            'karma-jasmine',
            /*'karma-firefox-launcher',*/
            'karma-chrome-launcher',
            'karma-phantomjs-launcher',
            'karma-junit-reporter'

        ],

        // frameworks to use
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            'http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js',
            'http://ajax.googleapis.com/ajax/libs/angularjs/1.3.0/angular.min.js',
            'http://ajax.googleapis.com/ajax/libs/angularjs/1.3.0/angular-route.js',
            'http://code.angularjs.org/1.3.0/angular-mocks.js',
            'dist/dev/*.js',
            '**/*.spec.js'

        ],

        /*preprocessors : {
         '../build/html*//*.html': ['ng-html2js']
         },*/

        /*ngHtml2JsPreprocessor: {
         cacheIdFromPath: function(filepath) {
         // If you had more than one html file you would want to do something more clever here.
         return 'inlinetemplates';
         },
         moduleName: 'inlinetemplates'
         },*/

        // list of files to exclude
        exclude: [

        ],


        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera (has to be installed with `npm install karma-opera-launcher`)
        // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
        // - PhantomJS
        // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
        browsers: ['Chrome'],


        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false
    });
};
