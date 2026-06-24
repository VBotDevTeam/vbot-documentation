---
outline: deep
---

# VBot Web SDK

VBot Web SDK cung cấp Web Component `<vbot-widget>` (đã tích hợp sẵn UI, state, CSS và SIP manager) giúp khách hàng tích hợp chức năng tổng đài VBot vào website của mình chỉ với vài dòng code.

## 1. Tích hợp

Thêm script bundle từ CDN:

::: code-group
```html [ESM (Khuyến nghị)]
<script type="module" src="https://cdn.vbot.vn/vbot-sdk/vbot-sdk.es.js"></script>

<vbot-widget token="YOUR_ACCESS_TOKEN"></vbot-widget>
```

```html [UMD]
<script src="https://cdn.vbot.vn/vbot-sdk/vbot-sdk.umd.js" defer></script>

<vbot-widget token="YOUR_ACCESS_TOKEN"></vbot-widget>
```
:::

> **Lưu ý:**
> - UMD build sẽ tự động đăng ký Custom Element `vbot-widget` ngay khi tải xong.
> - Hãy thay `YOUR_ACCESS_TOKEN` bằng Access Token tài khoản của bạn để SDK tự kết nối và lấy thông tin SIP cấu hình tự động.

---

## 2. Cấu hình Widget (VBotWidgetConfig)

Lập trình viên có thể cấu hình widget thông qua thuộc tính `config` (dưới dạng JSON string) hoặc gọi phương thức `updateWidgetConfig(...)` tại runtime.

Ví dụ:
```html
<vbot-widget 
  token="YOUR_ACCESS_TOKEN" 
  config='{"autoShowDialpad": false, "themeMode": "auto"}'
></vbot-widget>
```

### Các thuộc tính cấu hình hỗ trợ:

| Thuộc tính | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `autoShowDialpad` | `boolean` | `false` | Tự động mở bàn phím số (dialpad) khi widget khởi tạo thành công. |
| `headless` | `boolean` | `false` | Bật chế độ không giao diện (Headless). Chỉ giữ kết nối và xử lý sự kiện âm thanh ngầm. |
| `ringtoneUrl` | `string` | _Sẵn có_ | URL nhạc chuông khi có cuộc gọi đến. Mặc định dùng nhạc chuông của VBot. |
| `holdMusicUrl` | `string` | _Sẵn có_ | URL nhạc chờ khi thực hiện cuộc gọi đi. |
| `ringtoneVolume` | `number` | `0.8` | Âm lượng nhạc chuông (từ `0` đến `1`). |
| `holdMusicVolume` | `number` | `0.8` | Âm lượng nhạc chờ (từ `0` đến `1`). |
| `themeMode` | `'auto' \| 'light' \| 'dark'` | `'auto'` | Chế độ hiển thị giao diện sáng/tối. `'auto'` sẽ tự động đồng bộ theo class `.dark` của thẻ `<html>`. |
| `themeOverrides` | `Record<string, string>` | `null` | Ghi đè các token màu sắc hoặc thiết kế của hệ thống. |
| `overlayPositions` | `object` | _Xem dưới_ | Cấu hình vị trí hiển thị của các khung popup UI (`dialpad`, `incoming`, `calling`). |
| `overlayMargins` | `object` | _Xem dưới_ | Cấu hình khoảng cách (margin) theo pixel cho từng khung UI. |

### Cấu hình Vị trí & Margin hiển thị

Các giá trị vị trí (`overlayPositions`) được hỗ trợ:
- `center`, `top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center`, `bottom-right`.

Ví dụ cấu hình vị trí và khoảng cách tùy biến (thường dùng để đặt bàn phím bên trên hoặc bên dưới các nút có sẵn trên web):
```json
{
  "overlayPositions": {
    "dialpad": "bottom-right",
    "calling": "bottom-right",
    "incoming": "bottom-right"
  },
  "overlayMargins": {
    "dialpad": { "bottom": 88, "right": 24 },
    "calling": { "bottom": 88, "right": 24 },
    "incoming": { "bottom": 88, "right": 24 }
  }
}
```

---

## 3. Các Phương thức Public (Runtime API)

Bạn có thể gọi trực tiếp các phương thức này từ DOM element của `<vbot-widget>`.

```javascript
const widget = document.querySelector('vbot-widget');
```

| Tên phương thức | Tham số | Kiểu trả về | Mô tả |
| :--- | :--- | :--- | :--- |
| `updateWidgetConfig(config)` | `VBotWidgetConfig` | `void` | Cập nhật cấu hình của widget tại thời điểm runtime. |
| `makeCall(phone, hotline?)` | `string, string` | `Promise<void>` | Thực hiện cuộc gọi đi tới số `phone`. `hotline` là tùy chọn. |
| `answerCall()` | - | `Promise<void>` | Chấp nhận và kết nối cuộc gọi đến. |
| `hangupCall()` | - | `Promise<void>` | Kết thúc cuộc gọi hiện tại hoặc từ chối cuộc gọi đến. |
| `sendDTMF(tone)` | `string` | `void` | Gửi tín hiệu DTMF (bấm phím số khi đang đàm thoại). |
| `getHotlines()` | - | `Promise<Hotline[]>`| Trả về danh sách hotline được cấu hình cho tài khoản. |
| `showCallUI()` | - | `void` | Mở giao diện bàn phím số/cuộc gọi (chỉ hoạt động ở chế độ builtin UI). |
| `dismissCallUI()` | - | `void` | Ẩn toàn bộ giao diện overlay của widget. |
| `setAudioInputDevice(deviceId)` | `string` | `Promise<boolean>` | Thay đổi thiết bị đầu vào microphone bằng Device ID. |
| `setAudioOutputDevice(deviceId)`| `string` | `Promise<boolean>` | Thay đổi thiết bị đầu ra (loa/tai nghe) bằng Device ID. |
| `toggleMuteMicrophone()` | - | `void` | Bật/tắt chế độ câm (Mute/Unmute) cho microphone của cuộc gọi hiện tại. |
| `isMicrophoneMuted()` | - | `boolean` | Kiểm tra microphone của cuộc gọi hiện tại có đang bị tắt tiếng hay không. |
| `setDialHotline(hotline)` | `string \| null` | `void` | Thay đổi hotline đang được chọn trên bàn phím quay số. |
| `getCallState()` | - | `string` | Lấy trạng thái cuộc gọi hiện tại (`idle`, `dialing`, `ringing`, `in-call`, `ended`). |
| `getCallData()` | - | `CallData \| null` | Lấy toàn bộ thông tin chi tiết của cuộc gọi hiện tại (số điện thoại, hướng gọi, ID cuộc gọi...). |

---

## 4. Lắng nghe Sự kiện (Custom Events)

Thẻ `<vbot-widget>` phát ra các sự kiện Custom Event giúp tích hợp chặt chẽ với hệ thống CRM của bạn.

```javascript
widget.addEventListener('vbot:onCallIncoming', (event) => {
  console.log('Thông tin cuộc gọi đến:', event.detail);
});
```

### Danh sách các sự kiện:

| Tên sự kiện | Dữ liệu kèm theo (`event.detail`) | Mô tả sự kiện |
| :--- | :--- | :--- |
| `vbot:onConnecting` | - | Bắt đầu khởi tạo kết nối tới tổng đài. |
| `vbot:onConnected` | - | Kết nối cơ sở dữ liệu thành công. |
| `vbot:onDisconnected` | - | Ngắt kết nối khỏi máy chủ tổng đài. |
| `vbot:onUserConnected` | - | Tài khoản SIP đã đăng ký online thành công. |
| `vbot:onUserDisconnected` | - | Tài khoản SIP đã ngắt đăng ký (offline). |
| `vbot:onUserConnectionFailed` | `{ error: string }` | Đăng ký tài khoản SIP thất bại. |
| `vbot:onCallIncoming` | `{ phoneNumber: string, direction: 'incoming' }` | Có cuộc gọi đến từ khách hàng. |
| `vbot:onCallProgress` | `{ phoneNumber: string, direction: 'outgoing' }` | Đang đổ chuông cuộc gọi đi. |
| `vbot:onCallAccepted` | `{ phoneNumber: string }` | Cuộc gọi đã được kết nối (nghe máy). |
| `vbot:onCallEnded` | `{ duration: number }` | Cuộc gọi kết thúc thành công. |
| `vbot:onCallFailed` | `{ error: string }` | Cuộc gọi thất bại (bận, sai số, lỗi thiết bị...). |
| `vbot:onCallStateChange` | `{ state: string }` | Trạng thái cuộc gọi thay đổi (`trying`, `ringing`, `active`, `on_hold`, `terminated`). |
| `vbot:onCallDuration` | `{ duration: number }` | Cập nhật thời gian gọi theo giây. |
| `vbot:onHotlinesUpdated` | `{ hotlines: Hotline[] }` | Danh sách hotline khả dụng đã được tải xong. |
| `vbot:onError` | `{ message: string }` | Có lỗi hệ thống phát sinh từ SDK. |

---

## 5. Chế độ không giao diện (Headless Mode)

Nếu muốn tự thiết kế toàn bộ giao diện cuộc gọi riêng phù hợp với thương hiệu, bạn chỉ cần bật cấu hình `headless` trên widget. 

Khi bật `headless`:
- Thẻ `<vbot-widget>` hoàn toàn ẩn đi và không render bất kỳ popover hay giao diện mặc định nào.
- SDK chỉ xử lý kết nối SIP, luồng cuộc gọi và tự động phát nhạc chuông/âm thanh đàm thoại ngầm.
- Bạn hoàn toàn điều khiển cuộc gọi thông qua các phương thức public (ví dụ: `makeCall`, `answerCall`, `hangupCall`) và cập nhật trạng thái UI từ các sự kiện của SDK.

Cú pháp:
```html
<vbot-widget token="YOUR_ACCESS_TOKEN" headless="true"></vbot-widget>
```

---

## 6. Giao diện & CSS Tokens

Giao diện mặc định của SDK được thiết kế hiện đại, responsive và hỗ trợ chuyển đổi giao diện sáng/tối tự động. Bạn có thể thay đổi màu sắc chủ đạo để đồng bộ với website thông qua các CSS Variables truyền vào style của widget hoặc khai báo trong CSS toàn cục:

```html
<vbot-widget
  token="YOUR_ACCESS_TOKEN"
  style="--vbot-primary: #10b981; --vbot-call-primary: #22c55e;"
></vbot-widget>
```

### Các CSS Variables chính được hỗ trợ:

- `--vbot-primary`: Màu sắc chủ đạo (Nút bấm chính, viền tiêu điểm).
- `--vbot-primary-foreground`: Màu chữ hiển thị trên nền màu chủ đạo.
- `--vbot-background`: Màu nền của bàn phím số/màn hình gọi.
- `--vbot-foreground`: Màu chữ mặc định.
- `--vbot-border`: Màu viền phân cách các phần tử.
- `--vbot-ring`: Màu vòng phát sáng tiêu điểm khi focus.
- `--vbot-call-primary`: Màu xanh lá cho nút bắt đầu cuộc gọi/nút nghe máy.
- `--vbot-call-danger`: Màu đỏ cho nút dừng cuộc gọi/nút từ chối.
