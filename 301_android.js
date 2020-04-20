#!/usr/bin/env node

var fs = require('fs');
var path = require('path');

var filestocopy = [{
  "hooks/qrscanner_mod/QRScanner.java":
  "platforms/android/app/src/main/java/com/bitpay/cordova/qrscanner/QRScanner.java"
}];

module.exports = function(context) {

    // no need to configure below
    var rootdir = context.opts.projectRoot;

    filestocopy.forEach(function(obj) {
        Object.keys(obj).forEach(function(key) {
            var val = obj[key];
            var srcfile = path.join(rootdir, key);
            var destfile = path.join(rootdir, val);
            console.log("copying "+srcfile+" to "+destfile);
            var destdir = path.dirname(destfile);
            if (fs.existsSync(srcfile) && fs.existsSync(destdir)) {
                fs.createReadStream(srcfile).pipe(
                    fs.createWriteStream(destfile));
            }
        });
    });

};
