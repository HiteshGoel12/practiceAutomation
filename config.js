var specReporter = require('jasmine-spec-reporter'),
    jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter'),
    reporters = require('jasmine-reporters'),
    mkdirp = require('mkdirp'),
    fs = require('fs');

function rmDir(dirPath) {
    try { 
        var files = fs.readdirSync(dirPath); 
    } catch(e) { 
        return; 
    }
    if (files.length > 0) {
        for (var i = 0; i < files.length; i++) {
            var filePath = dirPath + '/' + files[i];
            if (fs.statSync(filePath).isFile())
                fs.unlinkSync(filePath);
            else
                rmDir(filePath);
        }
    }
    fs.rmdirSync(dirPath);
    };

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['src/test/home.page.spec.js'],
    restartBrowserBetweenTests: false,
    "getPageTimeout": 30000,
    onPrepare: function() {
        browser.driver.manage().window().maximize();
        browser.ignoreSynchronization = true;
        
        var reporterPath = __dirname + '/target/reports';
        rmDir(reporterPath);
        mkdirp(reporterPath, function (err) {
            if (err) {
                console.info(err);
            } else {
                console.info('Directory created: ' + reporterPath);
            }
        });
        console.info('The test reports will be stored in:', reporterPath);

        jasmine.getEnv().addReporter(new reporters.JUnitXmlReporter({
            'savePath': reporterPath,
            'consolidate': false,
            'consolidateAll': true
        }));

        jasmine.getEnv().addReporter(new jasmine2HtmlReporter({
            savePath: 'target/reports/',
            screenshotsFolder: 'images',
            takeScreenshotsOnlyOnFailures: true
        }));
    }
};