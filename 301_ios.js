#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();

module.exports = function(context) {
    fs.readFile(path.join(context.opts.projectRoot, 'config.xml'), function(err, xmlString) {
        parser.parseString(xmlString, function (err, xmlObj) {
            var filesToOverWrite = [{
                srcFile: path.join(__dirname, 'QRScanner.swift'),
                destFile: path.join(context.opts.projectRoot, 'platforms/ios/' + xmlObj.widget.name + '/Plugins/cordova-plugin-qrscanner/QRScanner.swift')
            }];
            console.log('*** cordova-plugin-qrscanner-add-barcode MOD (iOS) ***');
            filesToOverWrite.forEach(function(file) {
                console.log('Overwriting [' + file.destFile + '] ...');
                if (fs.existsSync(file.srcFile) && fs.existsSync(path.dirname(file.destFile))) {
                    fs.createReadStream(file.srcFile).pipe(
                        fs.createWriteStream(file.destFile)
                    );
                }
            });
        });
    });
};