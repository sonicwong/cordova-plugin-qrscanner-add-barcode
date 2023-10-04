#!/usr/bin/env node

var fs = require('fs');
var path = require('path');

var xml2js = require('xml2js');
var parser = new xml2js.Parser();

module.exports = function(context) {
  console.log("### QR Scanner Add Format (iOS) ======================");

  // Make sure ios platform is part of build
  if (!context.opts.platforms.includes('ios')) return;

  // read app name from config.xml
  const configXml = fs.readFileSync(path.join(context.opts.projectRoot, 'config.xml'), 'UTF-8');
  parser.parseString(configXml, function (err, data) {
    if(err) {
      console.log(err);
      return;
    }
    const appName = String(data.widget.name);

    var filestocopy = [{
      "myhooks/jacobg-cordova-plugin-qrscanner/QRScanner.swift":
      "platforms/ios/" + appName + "/Plugins/cordova-plugin-qrscanner/QRScanner.swift"
    }];

    var rootdir = context.opts.projectRoot;
    filestocopy.forEach(function(obj) {
      Object.keys(obj).forEach(function(key) {
        var val = obj[key];
        var srcfile = path.join(rootdir, key);
        var destfile = path.join(rootdir, val);
        console.log("copying ["+srcfile+"]");
        console.log("to ["+destfile+"]");
        var destdir = path.dirname(destfile);
        if (fs.existsSync(srcfile) && fs.existsSync(destdir)) {
          fs.createReadStream(srcfile).pipe(fs.createWriteStream(destfile));
        }
      });
    });

  });
};
