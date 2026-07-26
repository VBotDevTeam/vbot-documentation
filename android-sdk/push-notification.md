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

Trong file <span class="highlight-text"> build.gradle(Module :app) </span>

Ở mục <span class="highlight-text"> dependencies </span>, thêm 2 dòng sau:

```groovy
implementation platform('com.google.firebase:firebase-bom:32.4.0')
implementation 'com.google.firebase:firebase-messaging-ktx:23.3.1'
```

Ở mục <span class="highlight-text"> plugins </span>, thêm dòng sau:

```groovy
id 'com.google.gms.google-services'
```

Trong file <span class="highlight-text"> build.gradle(Project) </span>, ở mục <span class="highlight-text"> plugins </span>, thêm dòng sau:

```groovy
id 'com.google.gms.google-services'
```

## Nhận cuộc gọi đến

VBot SDK **không** tự khai `FirebaseMessagingService`. App của bạn sở hữu service và tự route payload noticall vào SDK qua `notificationCall(map)`. Nhờ vậy SDK **cùng tồn tại** được với `firebase_messaging` / notification nghiệp vụ sẵn có của bạn, không tranh chấp `MESSAGING_EVENT`.

Trong file <span class="highlight-text"> manifests </span>, ở thẻ <span class="highlight-text"> application </span>, khai service của **chính app bạn**:

```xml
<service
    android:name=".FirebaseService"
    android:exported="false"
    android:stopWithTask="false">
    <intent-filter>
        <action android:name="com.google.firebase.MESSAGING_EVENT" />
    </intent-filter>
</service>
```

Tạo class đón thông báo, khi nhận data message noticall thì chuyển nguyên `HashMap<String,String>` payload sang SDK:

```kotlin
class FirebaseService : FirebaseMessagingService() {
    override fun onNewToken(token: String) {
        // Lưu token; truyền vào connect() ở lần kết nối kế tiếp
    }

    override fun onMessageReceived(remoteMessage: RemoteMessage) {
        val map = HashMap(remoteMessage.data) // cần chứa key "transId" và "offCall"
        VBotClient(applicationContext).apply {
            if (!isSetup()) setup(VBotConfig(VBotEnvironment.PRODUCTION))
            notificationCall(map)
        }
    }
}
```

`notificationCall(map)` xử lý:
- `offCall == "0"`: hiện notification cuộc gọi đến + chuẩn bị (mở socket, register SIP). Khi cả hai sẵn sàng, SDK gửi ready và chờ INVITE. Nếu không register được trong **20 giây** → `onCallEnded(IncomingCallTimeout)` + tự dọn.
- `offCall != "0"`: cuộc gọi đã bị huỷ từ xa → huỷ chuẩn bị, gỡ notification.

::: tip Nếu app đã dùng firebase_messaging (Flutter)
Nếu bạn đã có service xử lý notification nghiệp vụ, chỉ cần trong `onMessageReceived` phân loại: message noticall (có `transId`/`offCall`) thì route sang `notificationCall(map)`, còn lại xử lý như cũ. Android chỉ cho một service nhận `MESSAGING_EVENT` — dùng service sẵn có của bạn, không khai thêm service riêng cho VBot.
:::
