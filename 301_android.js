#!/usr/bin/env node
var fs = require('fs');
var path = require('path');

module.exports = function(context) {
    var filesToOverWrite = [{
        srcFile: path.join(__dirname, 'QRScanner.java'),
        destFile: path.join(context.opts.projectRoot, 'platforms/android/app/src/main/java/com/bitpay/cordova/qrscanner/QRScanner.java')
    }];
    console.log('*** cordova-plugin-qrscanner-add-barcode MOD (android) ***');
    filesToOverWrite.forEach(function(file) {
        console.log('Overwriting [' + file.destFile + '] ...');
        if (fs.existsSync(file.srcFile) && fs.existsSync(path.dirname(file.destFile))) {
            fs.createReadStream(file.srcFile).pipe(
                fs.createWriteStream(file.destFile)
            );
        }
    });
};