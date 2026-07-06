---
outline: deep
---

# Push Notification

VBot Android SDK sử dụng Google Firebase để nhận thông báo cuộc gọi đến.

## Trên Firebase

Tạo Project

Thêm ứng dụng của bạn vào Project vừa tạo

Tải file <span class="highlight-text"> google-services.json </span>

Vào <span class="highlight-text"> Project Setting </span> -> <span class="highlight-text"> Service accounts </span> -> <span class="highlight-text"> Firebase Admin SDK </span>

Trong màn hình hiện ra. Chọn <span class="highlight-text"> Java </span>

Chọn <span class="highlight-text"> Generate new private key </span>

![Push1](/Push-Notification/Push1.png)

Mở file vừa tải về. Sao chép toàn bộ nội dung có trong file

## Trên Website VBot

Dùng tài khoản Admin đăng nhập vào website [VBot.vn](https://vbot.vn)

Truy cập vào <span class="highlight-text"> Cài đặt nhóm </span> -> <span class="highlight-text"> SDK Mobile Push </span>

Chọn <span style="color: #22c55e;">+ Thêm mới</span>

![Push2](/Push-Notification/Push2.png)

Nhập tên của app

Chọn loại là <span class="highlight-text"> FCM Push Credential (Android)</span>

Dán nội dung file vừa sao chép ở bước trên vào ô <span class="highlight-text"> KEY </span>

Chọn <span class="highlight-text"> Lưu </span>

![Push3](/Push-Notification/Push3.avif)

## Trên Project App của bạn

Thêm <span class="highlight-text"> google-services.json </span> vào thư mục <span class="highlight-text"> app </span>

![Push4](/Push-Notification/Push4.png)

Thêm ứng dụng của bạn vào Project vừa tạo

Trong file <span class="highlight-text"> build.gradle(Module :app) </span>

Ở mục <span class="highlight-text"> dependencies </span>

Thêm 2 dòng sau:

```JSON
implementation platform('com.google.firebase:firebase-bom:32.4.0')
implementation 'com.google.firebase:firebase-messaging-ktx:23.3.1'
```

Ở mục <span class="highlight-text"> plugins </span>

Thêm dòng sau:

```JSON
id 'com.google.gms.google-services'
```

Trong file <span class="highlight-text"> build.gradle(Project) </span>

Ở mục <span class="highlight-text"> plugins </span>

Thêm dòng sau:

```JSON
id 'com.google.gms.google-services'
```

Trong file <span class="highlight-text"> manifests </span>
ở thư mục <span class="highlight-text"> application </span>

Thêm những dòng sau:

```XML
<service
	android:name=".FirebaseService"
	android:exported="false"
	android:stopWithTask="false">
	<intent-filter>
		<action android:name="com.google.firebase.MESSAGING_EVENT" />
	</intent-filter>
</service>
```

Tạo class để đón thông báo cuộc gọi

```KOTLIN
class FirebaseService : FirebaseMessagingService() {
	// Nhận thông báo cuộc gọi
	override fun onMessageReceived(remoteMessage: RemoteMessage) {
	}
}
```
