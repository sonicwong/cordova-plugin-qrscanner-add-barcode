## QR Scanner v3.0.1 Add Barcode Mod
URL: https://github.com/bitpay/cordova-plugin-qrscanner/issues/132


## Function
Add QR Scanner to support EAN-13, CODE-128, CODE-39.

Tested with: cordova-android: 8.1.0, cordova-ios: 5.1.1


## How To Use
1) Place all files under "hooks/qrscanner_add_barcode/".

2) Add below in "config.xml":
```xml
<platform name="android">
  <hook src="hooks/qrscanner_add_barcode/301_android.js" type="after_prepare" ></hook>
</platform>
<platform name="ios">
  <hook src="hooks/qrscanner_add_barcode/301_ios.js" type="after_prepare" ></hook>
</platform>
<preference name="UseSwiftLanguageVersion" value="5" ></preference>
```


## Change in Android
PATH: ⁨app/⁨src/⁨main/⁨java/⁨com/⁨bitpay/⁨cordova/⁨qrscanner⁩/QRScanner.java

Available Code Format: https://zxing.github.io/zxing/apidocs/com/google/zxing/BarcodeFormat.html
```
// LINE1
formatList.add(BarcodeFormat.EAN_13);
formatList.add(BarcodeFormat.CODE_128);
formatList.add(BarcodeFormat.CODE_39);
```

## Change in iOS
PATH: [APP_NAME]/⁨Plugins/⁨cordova-plugin-qrscanner/QRScanner.swift

Available Code Format: https://developer.apple.com/documentation/avfoundation/avmetadataobject/objecttype

```
// LINE 1
metaOutput!.metadataObjectTypes = [AVMetadataObject.ObjectType.qr, AVMetadataObject.ObjectType.ean13, AVMetadataObject.ObjectType.code128, AVMetadataObject.ObjectType.code39] //ADDED BY SONIC
```
```
// LINE 2
if ((found.type == AVMetadataObject.ObjectType.qr || found.type == AVMetadataObject.ObjectType.ean13 || found.type == AVMetadataObject.ObjectType.code128 || found.type == AVMetadataObject.ObjectType.code39) && found.stringValue != nil) { //ADDED BY SONIC
```

## Copyright
Original source code (QRScanner.java, QRScanner.swift) copyright by bitpay:

https://github.com/bitpay/cordova-plugin-qrscanner/
