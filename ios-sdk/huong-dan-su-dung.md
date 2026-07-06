---
outline: deep
---

# Hướng dẫn sử dụng

Hướng dẫn sử dụng VBot iOS SDK.

## Cấu hình dự án

### Bật Voip trong dự án Xcode

Chọn **Xcode Project → Capabilities**

Thêm **Background Modes** và **Push Notifications**

Ở **Background Modes,** Bật **Audio, AirPlay, and Picture in Picture |** **Voice over IP | Background Fetch | Remote Notifications**

Mở tệp **info.plist** và thêm key sau

```swift
<key>NSMicrophoneUsageDescription</key>
<string>Microphone access is necessary to be able to make calls.</string>
```

Lưu ý:

Khi khởi chạy dự án mà Xcode trả về lỗi

“Sandbox: rsync.samba (13105) deny(1) file-write-create”

Thực hiện chỉnh sửa sau:

Trong **Build Settings**, tìm **User Script Sandboxing**: Chọn **No**

## Sử dụng SDK

### AppDelegate.swift

#### Khởi tạo

Trong hàm **application didFinishLaunchingWithOptions**, gọi hàm khởi tạo VBotPhone và khởi tạo voipRegistry:

```swift
// Khởi tạo đầy đủ với các cấu hình tùy chọn
let config = VBotConfig(
    supportPopupCall: false,            // Mặc định: false. Cho phép hiển thị popup cuộc gọi.
    includesCallsInRecents: true,       // Mặc định: false. Cho phép lưu lịch sử cuộc gọi vào nhật ký cuộc gọi hệ thống qua CallKit.
    iconTemplateImageData: UIImage(named: "callkit-icon")?.pngData(), // Ảnh icon hiển thị trên giao diện CallKit.
    environment: .production,           // Môi trường API. Mặc định là .production.
    customBaseUrl: nil                  // URL API tùy chỉnh nếu muốn cấu hình thủ công (ghi đè cấu hình môi trường).
)

VBotPhone.sharedInstance.setup(with: config)

voipRegistry = PKPushRegistry(queue: .main)
voipRegistry!.desiredPushTypes = [.voIP]
voipRegistry!.delegate = self
```

Trong đó:

- **supportPopupCall**: Cho phép hoặc từ chối hiển thị popup cuộc gọi của SDK.
- **includesCallsInRecents**: Hiển thị lịch sử cuộc gọi trong app Điện thoại của iOS.
- **iconTemplateImageData**: Icon được hiển thị trong màn hình cuộc gọi CallKit.
- **environment**: Chỉ định môi trường kết nối API.
- **customBaseUrl**: Đường dẫn API URL tùy chọn nếu bạn muốn kết nối trực tiếp đến endpoint riêng. Ghi đè cấu hình từ `environment`.

#### iOS History Call handle

Nếu trong VBotConfig có set **includesCallsInRecents** là true thì trong app Phone của iOS sẽ hiển thị lịch sử cuộc gọi.

Khi khách hàng tap vào 1 lịch sử cuộc gọi, app sẽ mở ra.
Hãy dùng code sau để handle

```swift
import Intents

func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {

        switch userActivity.activityType {
        case "INStartAudioCallIntent":
            return handleStartCallIntent(
                INStartAudioCallIntent.self,
                userActivity: userActivity,
                contacts: \.contacts,
            )

        case "INStartCallIntent":
            if #available(iOS 13.0, *) {
                return handleStartCallIntent(
                    INStartCallIntent.self,
                    userActivity: userActivity,
                    contacts: \.contacts,
                )
            } else {
                return false
            }

        default:
            return false
        }
    }

private func handleStartCallIntent<T: INIntent>(
        _ intentType: T.Type,
        userActivity: NSUserActivity,
        contacts: KeyPath<T, [INPerson]?>,
    ) -> Bool {
        let intent = userActivity.interaction?.intent

        guard let intent = intent as? T else {
            return false
        }

        if let person =  intent[keyPath: contacts]?.first {
            let displayName = person.displayName

            let result = VBotPhone.sharedInstance.getCallIntentFromUserActivity(displayName)
            // result này chứa name và number của người gọi. Từ đây app có thể dùng hàm startOutgoingCall để thực hiện cuộc gọi đi
        }

        return true
    }
```

#### Cuộc gọi đến

Thêm hàm lắng nghe sự kiện của PushKit (Thông báo cuộc gọi) và AppDelegate

```swift
import PushKit

extension AppDelegate: PKPushRegistryDelegate {
    nonisolated func pushRegistry(_ registry: PKPushRegistry, didUpdate pushCredentials: PKPushCredentials, for type: PKPushType) {

            guard let token = registry.pushToken(for: .voIP) else {
                // Không lấy được token
                return
            }

            let pushToken = token.map { String(format: "%.2hhx", $0) }.joined()

            // Lưu token này lại, dùng khi connect account
            // savePushToken(pushToken)


    }

    nonisolated func pushRegistry(_ registry: PKPushRegistry, didReceiveIncomingPushWith payload: PKPushPayload, for type: PKPushType, completion: @escaping () -> Void) {

        // Nếu payload có loại là .voIP thì gọi hàm startIncomingCall để khởi tạo cuộc gọi
        if type == .voIP {
            VBotPhone.sharedInstance.startIncomingCall(
                payload: payload,
                completion: completion
            )

        } else {
            completion()
        }

    }

}

```

### Connect SDK

```SWIFT
VBotPhone.sharedInstance.connect(token: token, pushkitToken: pushKitToken) { displayName, error in
	if let error = error as NSError? {
		// login error
		return
	}
    // login successful
}
```

Trong đó:

- **token**: Token SDK của tài khoản VBot <br>
- **pushkitToken**: Pushkit token đã lưu từ bước trước <br>
- **error**: Lỗi trả về khi đăng nhập không thành công

### Disconnect SDK

```SWIFT
VBotPhone.sharedInstance.disconnect { error in
	if let error = error as NSError? {
		// logout error
		return
	}
	 // logout error
}
```

### Lấy danh sách hotline

```SWIFT
VBotPhone.sharedInstance.getHotlines { hotlines, error in
	if error != nil {
		// get hotline error
		return
	}
	// get hotline successful
}
```

### Gọi đi

```swift
VBotPhone.sharedInstance.startOutgoingCall(
    displayName: "Nguyễn Văn A",
    number: "0901234567",
    hotline: "1900xxxx",
    externalCallId: "ext-call-123"  // Mã định danh cuộc gọi từ hệ thống ngoài (Tùy chọn)
) { success, error in
    if success {
        // Bắt đầu cuộc gọi đi thành công
    } else {
        // Lỗi khởi tạo cuộc gọi đi (lỗi nằm trong biến error)
    }
}
```

Trong đó:

- **displayName**: Tên người nhận hiển thị trên CallKit.
- **number**: Số điện thoại cần gọi.
- **hotline**: Số hotline sử dụng.
- **externalCallId** _(tùy chọn)_: Mã cuộc gọi từ hệ thống bên ngoài, dùng để liên kết dữ liệu cuộc gọi.
  <div class="note">
  <strong>Yêu cầu về giá trị <code>externalCallId</code>:</strong>
  <ul>
    <li>Độ dài tối đa: <strong>32 ký tự</strong>.</li>
    <li>Ký tự hợp lệ: chữ thường (<code>a</code>–<code>z</code>) và chữ số (<code>0</code>–<code>9</code>).</li>
    <li><strong>Không</strong> chứa ký tự đặc biệt, chữ in hoa hoặc khoảng trắng.</li>
  </ul>
  </div>

### Gác máy

```SWIFT
// Tắt call
VBotPhone.sharedInstance.endCall { error in
	if let error = error as NSError? {
		return
	}
}
```

### Các hành động khác trong cuộc gọi

```SWIFT
// Bật tắt mic
VBotPhone.sharedInstance.muteCall()

// Bật tắt loa ngoài
VBotPhone.sharedInstance.onOffSpeaker()
```

## Lắng nghe các sự kiện (Delegate)

Đăng ký nhận các sự kiện cuộc gọi:

```swift
// Đăng ký nhận delegate
VBotPhone.sharedInstance.addDelegate(self)

// Hủy đăng ký nhận delegate
deinit {
    VBotPhone.sharedInstance.removeDelegate(self)
}
```

Các delegate method được cung cấp bởi `VBotPhoneDelegate`:

```swift
protocol VBotPhoneDelegate {
    // Trạng thái cuộc gọi thay đổi
    func callStateChanged(state: VBotCallState)

    // Cuộc gọi đi đã bắt đầu
    func callStarted()

    // Cuộc gọi đến được chấp nhận (Khi user chọn chấp nhận cuộc gọi)
    func callAccepted()

    // Cuộc gọi kết thúc, đi kèm nguyên nhân kết thúc cuộc gọi
    func callEnded(reason: VBotEndCallReason)

    // Trạng thái quyền truy cập microphone
    func microphonePermission(status: AVAudioSession.RecordPermission)

    // Trạng thái tắt/mở âm microphone thay đổi
    func callMuteStateDidChange(muted: Bool)

    // Nhận externalCallId (chỉ gọi 1 lần duy nhất khi bắt đầu cuộc gọi có chứa ID này, nếu không nil hoặc không rỗng)
    func didReceiveExternalCallId(_ externalCallId: String)

    // Yêu cầu hiển thị giao diện cuộc gọi
    func showCallVC()

    // Yêu cầu quay lại giao diện cuộc gọi
    func returnToCallVC()

    // Yêu cầu ẩn giao diện cuộc gọi
    func hideCallVC()

    // Mất kết nối mạng
    func networkIsUnreachable()

    // Kết nối mạng thay đổi
    func internetConnectionChanged()
}
```

---

## Xem thêm

### VBotEndCallReason và VBotError

```
    // Timeout
    case timeOut = -1001

    // Khởi tạo không thành công
    case initiationFailed = 1001

    case initiationFailed_1 = 1002

    // Chưa cấp truyền mic
    case microphonePermissionDenied = 1003

    case invalidPhoneNumber = 1004

    // Không có dữ liệu từ máy chủ
    case noDataFromServer = 1005

    case initiationFailed_2 = 1006

    case initiationFailed_3 = 1007

    // Dữ liệu không hợp lệ
    case dataInvalid = 1008

    case initiationFailed_4 = 1009

    // Xác thực thất bại
    case authenticatedFailed = 1010

    // Đang có cuộc gọi khác
    case anotherCallInProgress = 1011

    // Cuộc gọi kết thúc
    case normal = 1012

    // Từ chối cuộc gọi
    case decline = 1013

    // Không liên lạc được
    case temporarilyUnavailable = 1014

    // Máy bận
    case busy = 1015

    // reportNewIncomingCall lỗi
    case reportNewIncomingCallFailed = 1016

    // Lỗi chưa xác định
    case unknownError = 1999
```

---

## Sử dụng với Objective-C

SDK tương thích hoàn toàn để sử dụng từ dự án Objective-C.

### 1. Import Module

Import module trong tệp `.m` hoặc `.mm` của bạn:

```objc
@import VBotPhoneSDK;
```

### 2. Khởi tạo SDK trong AppDelegate

```objc
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    NSData *iconData = UIImagePNGRepresentation([UIImage imageNamed:@"callkit-icon"]);

    VBotConfig *config = [[VBotConfig alloc] initWithSupportPopupCall:NO
                                               includesCallsInRecents:YES
                                                iconTemplateImageData:iconData
                                                          environment:VBotEnvironmentProduction
                                                        customBaseUrl:nil];

    [[VBotPhone sharedInstance] setupWith:config];
    return YES;
}
```

### 3. Thực hiện cuộc gọi đi (Outgoing Call)

```objc
[[VBotPhone sharedInstance] startOutgoingCallWithDisplayName:@"Nguyễn Văn A"
                                                      number:@"0901234567"
                                                     hotline:@"1900xxxx"
                                              externalCallId:@"ext-call-123" // nil nếu không sử dụng
                                                  completion:^(BOOL success, NSError * _Nullable error) {
        if (success) {
            NSLog(@"Gọi đi thành công");
        } else {
            NSLog(@"Gọi đi thất bại với lỗi: %@", error.localizedDescription);
        }
    }];
```

#### 4. Nhận sự kiện cuộc gọi qua Delegate

```objc
@interface ViewController () <VBotPhoneDelegate>
@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    [[VBotPhone sharedInstance] addDelegate:self];
}

- (void)dealloc {
    [[VBotPhone sharedInstance] removeDelegate:self];
}

#pragma mark - VBotPhoneDelegate

- (void)callStateChangedWithState:(enum VBotCallState)state {
    NSLog(@"Trạng thái cuộc gọi thay đổi: %ld", (long)state);
}

- (void)callStarted {
    NSLog(@"Cuộc gọi đi đã bắt đầu");
}

- (void)callAccepted {
    NSLog(@"Cuộc gọi đã được chấp nhận");
}

- (void)callEndedWithReason:(enum VBotEndCallReason)reason {
    NSLog(@"Cuộc gọi kết thúc với nguyên nhân: %ld", (long)reason);
}

- (void)didReceiveExternalCallId:(NSString *)externalCallId {
    NSLog(@"Nhận được External Call ID: %@", externalCallId);
}

@end
```
