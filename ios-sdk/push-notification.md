---
outline: deep
---

# Cấu hình Push Notification

Hướng dẫn cấu hình nhận thông báo cuộc gọi đến cho VBot iOS SDK.

## Các bước thực hiện

1. Bật VoIP trong dự án Xcode

2. Tạo chứng chỉ VoIP

3. Cập nhật thông tin lên VBot.vn

## Bật VoIP trong dự án Xcode

Chọn <span class="highlight-text"> Xcode Project </span> → <span class="highlight-text"> Capabilities</span>

Chọn <span class="highlight-text"> Background Modes </span> và <span class="highlight-text"> Push Notifications </span>

Ở <span class="highlight-text"> Background Modes </span>, tích chọn <span class="highlight-text"> Audio, AirPlay, and Picture in Picture </span> | <span class="highlight-text"> Voice over IP </span> | <span class="highlight-text"> Background Fetch </span> | <span class="highlight-text"> Remote Notifications </span>

![ios1](/iOSSDK/ios1.png)

Mở tệp info.plist và thêm key sau

```XML
<key>NSMicrophoneUsageDescription</key>
<string>Microphone access is necessary to be able to make calls.</string>
```

## Tạo chứng chỉ VoIP

### Tạo tệp CSR

Mở ứng dụng <span class="highlight-text"> Keychain Access </span> trên MacOS

Từ menu chọn <span class="highlight-text"> Keychain Access </span> → <span class="highlight-text"> Certificate Assistant </span> -> <span class="highlight-text"> Request a Certificate From a Certificate Authority </span>

![ios2](/iOSSDK/ios2.png)

Nhập tên tệp (vd: demo_sdk.certSignsRequest) → Chọn <span class="highlight-text"> Saved to disk </span> → <span class="highlight-text"> Save </span>

### Tạo tệp Certificate

Truy cập vào <span class="highlight-text"> Certificates, Identifiers & Profiles - Apple Developer </span> → <span class="highlight-text"> Create a New Certificate </span> → chọn <span class="highlight-text"> VoIP Services Certificate </span> → <span class="highlight-text"> Continue </span>

![ios3](/iOSSDK/ios3.png)

Chọn <span class="highlight-text"> ID ứng dụng </span> của dự án Xcode của bạn → <span class="highlight-text"> Continue </span>

![ios4](/iOSSDK/ios4.png)

Tải lên tệp <span class="highlight-text"> CSR </span> được tạo từ <span class="highlight-text"> Keychain </span> → sau khi tải lên thành công chọn <span class="highlight-text"> Continue </span>

![ios5](/iOSSDK/ios5.png)

Chọn <span class="highlight-text"> Download </span>

![ios6](/iOSSDK/ios6.png)

Bấm mở tệp vừa download. <span class="highlight-text"> Certificate </span> sẽ được thêm vào <span class="highlight-text"> Keychain </span>

Xuất chứng chỉ định dạng <span class="highlight-text"> .p12 </span> từ <span class="highlight-text"> Keychain </span>

![ios7](/iOSSDK/ios7.png)

Xuất 2 tệp <span class="highlight-text"> certificate key </span> và <span class="highlight-text"> private key </span> từ file <span class="highlight-text"> .p12 </span> bằng cách mở app <span class="highlight-text"> Terminal </span> và chạy command:

```POWERSHELL
openssl pkcs12 -in cred.p12 -nokeys -out cert.pem -nodes
```

<div class="note">
<span class="highlight-text"> cert.pem </span> là tệp <span class="highlight-text"> certificate key </span> của bạn.
</div>

Tiếp tục chạy command sau:

```POWERSHELL
openssl pkcs12 -in cred.p12 -nocerts -out key.pem -nodes
```

<div class="note">
<span class="highlight-text"> key.pem </span> là tệp <span class="highlight-text"> private key </span> của bạn.
</div>

Mở 2 tệp vừa tạo bằng TextEditor, xóa bỏ mọi thông tin bên ngoài <span class="highlight-text"> -----BEGIN CERTIFICATE----- </span> và <span class="highlight-text"> -----END CERTIFICATE----- </span> cũng như <span class="highlight-text"> -----BEGIN RSA PRIVATE KEY----- </span> và <span class="highlight-text"> -----END RSA PRIVATE KEY----- </span>

**cert.pem**

```JAVASCRIPT
-----BEGIN CERTIFICATE-----
ZXJ0aWZpY2F0aW9uIEF1dGhvcmrlgLb1tsHGn6pzNzANBgkqhkiG9w0BAQsFADB1
MUQwQgYDVQQDDDtBcHBsZSBXb3JsZHdpZGUgRGV2ZWxvcGVyIFJlbGF0aW9ucyBD
ZXJ0aWZpY2F0aW9uIEF1dGhvcml0eTELMAkGA1UECwwCRzQxEzARBgNVBAoMCkFw
cGxlIEluYy4xCzAJBgNVBAYTAlVTMB4XDTI0MDEwMzAzMjUwMloXDTI1MDIwMTAz
VWz47mDAB+sflO7UPZY75TTarBc0nQp1PwjhA/0y5n58R9B5oHZiK2GbG/0p3zor
ixOkPiAkBi4VVTMB4XDTI0MDEwMzAzMjR8ImNyBIDb6aw4aK/3ncO2on0qwrRY2i
vo+A0PVuYKzbkqF6QK6mMqeIptAn8HM28R8ImNyBID=
-----END CERTIFICATE-----
```

**key.pem**

```JAVASCRIPT
-----BEGIN RSA PRIVATE KEY-----
ZXJ0aWZpY2F0aW9uIEF1dGhvcmrlgLb1tsHGn6pzNzANBgkqhkiG9w0BAQsFADB1
MUQwQgYDVQQDDDtBcHBsZSBXb3JsZHdpZGUgRGV2ZWxvcGVyIFJlbGF0aW9ucyBD
ZXJ0aWZpY2F0aW9uIEF1dGhvcml0eTELMAkGA1UECwwCRzQxEzARBgNVBAoMCkFw
cGxlIEluYy4xCzAJBgNVBAYTAlVTMB4XDTI0MDEwMzAzMjUwMloXDTI1MDIwMTAz
VWz47mDAB+sflO7UPZY75TTarBc0nQp1PwjhA/0y5n58R9B5oHZiK2GbG/0p3zor
ixOkPiAkBi4VVTMB4XDTI0MDEwMzAzMjR8ImNyBIDb6aw4aK/3ncO2on0qwrRY2i
vo+A0PVuYKzbkqF6QK6mMqeIptAn8HM28R8ImNyBID=
-----END RSA PRIVATE KEY-----
```

## Trên VBot.vn

Truy cập vào website VBot và đăng nhập

Chọn <span class="highlight-text"> Cài đặt nhóm</span> → <span class="highlight-text"> SDK Mobile Push </span> → <span class="highlight-text"> Thêm mới </span>

Chọn như trong hình và dán thông tin trong 2 tệp vào

Chọn <span class="highlight-text"> Lưu </span>

![ios8](/iOSSDK/ios8.png)
