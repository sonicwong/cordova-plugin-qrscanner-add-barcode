## QR Scanner v3.0.1 Add Barcode Mod
URL: https://github.com/bitpay/cordova-plugin-qrscanner/issues/132


## Function
1) Add QR Scanner to support EAN-13, CODE-128, CODE-39.

2) Fix NulPointerException crashed in android.

Tested with: cordova-android: 11.0.0, cordova-ios: 6.3.0


## How To Use
1) Uninstall original bitpay code if installed

```
npm uninstall --save cordova-plugin-qrscanner
```

2) install modernize version (2022 May 6) to work with cordova-android v11.0.0

```
npm install --save https://github.com/jacobg/cordova-plugin-qrscanner#modernize
```

3) install @ionic-native/qr-scanner@4

```
npm install --save @ionic-native/qr-scanner@4
```

4) Place all files under "hooks/jacobg-cordova-plugin-qrscanner/".

5) Add below in "config.xml":
```xml
<platform name="android">
  <hook src="hooks/jacobg-cordova-plugin-qrscanner/android.js" type="after_prepare" ></hook>
</platform>
<platform name="ios">
  <hook src="hooks/jacobg-cordova-plugin-qrscanner/ios.js" type="after_prepare" ></hook>
</platform>
<preference name="UseSwiftLanguageVersion" value="5" ></preference>
```


## Code changed in Android (java)
PATH: platforms/android/app/src/main/java/com/bitpay/cordova/qrscanner/QRScanner.java

Available Code Format: https://zxing.github.io/zxing/apidocs/com/google/zxing/BarcodeFormat.html
```
[FIND]
formatList.add(BarcodeFormat.QR_CODE);
[ADD_BELOW]
formatList.add(BarcodeFormat.EAN_13);
formatList.add(BarcodeFormat.CODE_128);
formatList.add(BarcodeFormat.CODE_39);
```

FIX: When accessing the parent of mBarcodeView, in some cases the NulPointerException crashed (MIUI Global 14 series) (by @mrFloony)
```
[FIND]
((ViewGroup) mBarcodeView.getParent()).removeView(mBarcodeView);
[REPLACE_WITH]
ViewGroup parent = ((ViewGroup) mBarcodeView.getParent());
if (parent != null) {
    parent.removeView(mBarcodeView);
}
```


## Code changed in iOS (swift)
PATH: platforms/ios/[APP_NAME]/Plugins/cordova-plugin-qrscanner/QRScanner.swift"

Available Code Format: https://developer.apple.com/documentation/avfoundation/avmetadataobject/objecttype

```
[FIND]
metaOutput!.metadataObjectTypes = [AVMetadataObject.ObjectType.qr]
[REPLACE]
metaOutput!.metadataObjectTypes = [AVMetadataObject.ObjectType.qr, AVMetadataObject.ObjectType.ean13, AVMetadataObject.ObjectType.code128, AVMetadataObject.ObjectType.code39]

[FIND]
if found.type == AVMetadataObject.ObjectType.qr && found.stringValue != nil {
[REPLACE]
if ((found.type == AVMetadataObject.ObjectType.qr || found.type == AVMetadataObject.ObjectType.ean13 || found.type == AVMetadataObject.ObjectType.code128 || found.type == AVMetadataObject.ObjectType.code39) && found.stringValue != nil) {
```


## Copyright
https://github.com/bitpay/cordova-plugin-qrscanner/
https://github.com/jacobg/cordova-plugin-qrscanner#modernize
