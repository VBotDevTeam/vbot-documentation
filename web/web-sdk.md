---
outline: deep
---

# VBot Web SDK

VBot Web SDK cung cấp Web Component `<vbot-widget>` để nhúng tính năng thoại VBot trực tiếp vào website.

## 1. Nhúng SDK

Nhúng script bundle từ CDN:

::: code-group

```html [ESM - Cố định phiên bản]
<!-- Khuyên dùng cho Production (cố định phiên bản, tối ưu CDN cache) -->
<script
  type="module"
  src="https://cdn.vbot.vn/vbot-sdk/1.0.12/vbot-sdk.es.js"
></script>

<vbot-widget token="YOUR_ACCESS_TOKEN"></vbot-widget>
```

```html [UMD - Cố định phiên bản]
<script
  src="https://cdn.vbot.vn/vbot-sdk/1.0.12/vbot-sdk.umd.js"
  defer
></script>

<vbot-widget token="YOUR_ACCESS_TOKEN"></vbot-widget>
```

```html [ESM - Bản mới nhất]
<script
  type="module"
  src="https://cdn.vbot.vn/vbot-sdk/vbot-sdk.es.js"
></script>

<vbot-widget token="YOUR_ACCESS_TOKEN"></vbot-widget>
```

```html [UMD - Bản mới nhất]
<script src="https://cdn.vbot.vn/vbot-sdk/vbot-sdk.umd.js" defer></script>

<vbot-widget token="YOUR_ACCESS_TOKEN"></vbot-widget>
```

:::

> **Lưu ý:**
>
> - Khuyên dùng phiên bản cố định (ví dụ `/1.0.12/`) trên môi trường Production.
> - Bản UMD tự động đăng ký thẻ `<vbot-widget>` sau khi script tải xong.
> - Thay `YOUR_ACCESS_TOKEN` bằng Access Token được tạo từ backend qua API [Tạo tài khoản & lấy Token SDK](/open-api/v3/member-sdk#tao-tai-khoan-lay-token-sdk-one-step-provisioning).

---

## 2. Cấu hình

Cấu hình widget qua thuộc tính `config` (chuỗi JSON) hoặc gọi phương thức `updateWidgetConfig(...)` tại runtime:

```html
<vbot-widget
  token="YOUR_ACCESS_TOKEN"
  config='{"autoShowDialpad": false, "themeMode": "auto"}'
></vbot-widget>
```

### Giao diện mặc định

Mặc định, `<vbot-widget>` hoạt động với giao diện có sẵn được đóng gói trong **Shadow DOM**, không bị ảnh hưởng bởi CSS của website.

Các thành phần giao diện gồm:
1. **Bàn phím số (Dialpad)**: Nhập số, chọn hotline gọi đi và thực hiện cuộc gọi.
2. **Màn hình gọi đi / đàm thoại (Calling)**: Hiển thị trạng thái (`dialing`, `ringing`, `in-call`), thời lượng gọi, các nút tắt mic, bàn phím DTMF và gác máy.
3. **Màn hình cuộc gọi đến (Incoming)**: Hiển thị số và tên người gọi, nút nghe / từ chối kèm nhạc chuông.
4. **Bong bóng thu nhỏ (Floating Bubble)**: Khi thu nhỏ màn hình gọi trong lúc đang đàm thoại, bong bóng nổi hiển thị ở góc màn hình (có thể kéo thả), nhấp vào để mở lại giao diện gọi.
5. **Thông báo (Toast)**: Cảnh báo quyền micro, mất kết nối mạng hoặc thông báo hệ thống.

#### Điều khiển qua JavaScript
- **Tự động mở bàn phím**: Đặt `"autoShowDialpad": true` trong `config` để mở bàn phím ngay khi kết nối thành công.
- **Mở / Đóng giao diện**:
  ```javascript
  const widget = document.querySelector("vbot-widget");

  // Mở bàn phím hoặc khôi phục màn hình cuộc gọi đang diễn ra
  widget.showCallUI();

  // Đóng giao diện (thu nhỏ cuộc gọi về dạng bong bóng nổi)
  widget.dismissCallUI();
  ```

#### So sánh hai chế độ

| Tiêu chí | Giao diện dựng sẵn | Chế độ Headless |
| :--- | :--- | :--- |
| **Cấu hình** | `headless: false` (mặc định) | `headless: true` |
| **Giao diện** | Tự render Dialpad, Calling, Incoming, Toast, Floating Bubble qua Shadow DOM | Ẩn hoàn toàn, không render HTML ra trang |
| **Điều khiển** | Thao tác trực tiếp qua nút bấm trên UI của SDK | Tự dựng UI và gọi các phương thức (`makeCall`, `answerCall`, `hangupCall`) |
| **Thông báo** | SDK tự hiển thị Toast | Không tự hiển thị Toast, SDK chỉ phát sự kiện (`vbot:onInfo`, `vbot:onWarning`...) |
| **Phù hợp với** | Tích hợp nhanh, dùng luôn giao diện có sẵn | Tự thiết kế UI riêng theo giao diện của website/CRM |

---

### Bảng cấu hình

| Thuộc tính             | Kiểu dữ liệu                  | Mặc định    | Mô tả                                                                                                        |
| :--------------------- | :---------------------------- | :---------- | :----------------------------------------------------------------------------------------------------------- |
| `autoShowDialpad`      | `boolean`                     | `false`     | Tự động mở bàn phím số khi kết nối thành công.                                                               |
| `headless`             | `boolean`                     | `false`     | Bật chế độ không giao diện (chỉ giữ kết nối và xử lý âm thanh ngầm).                                         |
| `themeMode`            | `'auto' \| 'light' \| 'dark'` | `'auto'`    | Chế độ giao diện sáng/tối (`'auto'` đồng bộ theo class `.dark` của thẻ `<html>`).                            |
| `zIndex`               | `number \| string`            | `2147483000`| Giá trị `z-index` của widget.                                                                                |
| `externalCallId`       | `string`                      | `undefined` | Mã định danh cuộc gọi từ CRM cho cuộc gọi đi tiếp theo (khi gọi từ bàn phím).                                 |
| `debug`                | `boolean`                     | `false`     | In log chi tiết của SDK ra Console trình duyệt.                                                              |
| `enableFloatingBubble` | `boolean`                     | `true`      | Bật/tắt bong bóng cuộc gọi thu nhỏ khi ẩn màn hình gọi.                                                      |
| `overlayPositions`     | `object`                      | _Xem dưới_  | Vị trí hiển thị của các khung popup (`dialpad`, `incoming`, `calling`).                                       |
| `overlayMargins`       | `object`                      | _Xem dưới_  | Khoảng cách (margin pixel) cho từng khung popup.                                                             |
| `ringtoneUrl`          | `string`                      | _Sẵn có_    | URL nhạc chuông tùy chỉnh cho cuộc gọi đến.                                                                  |
| `holdMusicUrl`         | `string`                      | _Sẵn có_    | URL nhạc chờ tùy chỉnh khi thực hiện cuộc gọi đi.                                                            |
| `ringtoneVolume`       | `number`                      | `0.8`       | Âm lượng nhạc chuông (từ `0` đến `1`).                                                                       |
| `holdMusicVolume`      | `number`                      | `0.8`       | Âm lượng nhạc chờ (từ `0` đến `1`).                                                                          |

---

### Cấu hình qua HTML Attribute

Ngoài đối tượng `config` JSON, bạn có thể truyền trực tiếp thuộc tính HTML trên thẻ `<vbot-widget>`:

```html
<vbot-widget
  token="YOUR_ACCESS_TOKEN"
  debug
  z-index="100000"
  external-call-id="CRM_CALL_12345"
></vbot-widget>
```

### Z-Index

Mặc định, `<vbot-widget>` có `z-index` là **`2147483000`** để luôn nổi trên các thành phần khác của trang. Tùy biến `z-index` bằng 3 cách:

1. **Qua thuộc tính HTML:**
   ```html
   <vbot-widget token="YOUR_ACCESS_TOKEN" z-index="100000"></vbot-widget>
   ```

2. **Qua đối tượng `config`:**
   ```html
   <vbot-widget
     token="YOUR_ACCESS_TOKEN"
     config='{"zIndex": 100000}'
   ></vbot-widget>
   ```

3. **Qua CSS Custom Property:**
   ```css
   vbot-widget {
     --vbot-z-index: 100000;
   }
   ```

### Chế độ Debug

Khi bật `debug`, SDK sẽ in log kết nối và sự kiện ra Console trình duyệt kèm tiền tố `[VBot-SDK]`:

```html
<!-- Qua thuộc tính HTML -->
<vbot-widget token="YOUR_ACCESS_TOKEN" debug></vbot-widget>

<!-- Hoặc qua đối tượng config -->
<vbot-widget
  token="YOUR_ACCESS_TOKEN"
  config='{"debug": true}'
></vbot-widget>
```

### Vị trí hiển thị

Các giá trị vị trí (`overlayPositions`) được hỗ trợ:

- `center`, `top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center`, `bottom-right`.

Ví dụ cấu hình vị trí và khoảng cách ở góc dưới bên phải:

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

## 3. Phương thức

Gọi phương thức trực tiếp qua DOM element của `<vbot-widget>`:

```javascript
const widget = document.querySelector("vbot-widget");
```

| Tên phương thức                              | Tham số                    | Kiểu trả về          | Mô tả                                                                                                                                  |
| :------------------------------------------- | :------------------------- | :------------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| `updateWidgetConfig(config)`                 | `VBotWidgetConfig`         | `void`               | Cập nhật cấu hình widget tại runtime.                                                                                                  |
| `makeCall(phone, hotline?, externalCallId?)` | `string, string?, string?` | `Promise<void>`      | Thực hiện cuộc gọi đi tới số `phone`. `hotline` và `externalCallId` là các tham số tùy chọn dùng để đối soát trên CRM.                  |
| `answerCall()`                               | -                          | `Promise<void>`      | Chấp nhận cuộc gọi đến.                                                                                                                |
| `hangupCall()`                               | -                          | `Promise<void>`      | Kết thúc cuộc gọi hiện tại hoặc từ chối cuộc gọi đến.                                                                                  |
| `sendDTMF(tone)`                             | `string`                   | `void`               | Gửi tín hiệu DTMF (bấm phím số khi đang đàm thoại).                                                                                    |
| `getHotlines()`                              | -                          | `Promise<Hotline[]>` | Trả về danh sách hotline được cấu hình cho tài khoản.                                                                                  |
| `showCallUI()`                               | -                          | `void`               | Mở giao diện bàn phím số hoặc khôi phục màn hình cuộc gọi.                                                                             |
| `dismissCallUI()`                            | -                          | `void`               | Ẩn giao diện overlay của widget.                                                                                                       |
| `setAudioInputDevice(deviceId)`              | `string`                   | `Promise<boolean>`   | Thay đổi thiết bị microphone bằng Device ID.                                                                                           |
| `setAudioOutputDevice(deviceId)`             | `string`                   | `Promise<boolean>`   | Thay đổi thiết bị loa/tai nghe bằng Device ID.                                                                                         |
| `toggleMuteMicrophone()`                     | -                          | `void`               | Bật/tắt mic cho cuộc gọi hiện tại.                                                                                                     |
| `isMicrophoneMuted()`                        | -                          | `boolean`            | Kiểm tra mic hiện tại có đang bị tắt tiếng hay không.                                                                                  |
| `setDialHotline(hotline)`                    | `string \| null`           | `void`               | Thay đổi hotline đang chọn trên bàn phím quay số.                                                                                      |
| `getCallState()`                             | -                          | `string`             | Lấy trạng thái cuộc gọi hiện tại (`idle`, `dialing`, `ringing`, `in-call`, `ended`).                                                   |
| `getCallData()`                              | -                          | `CallData \| null`   | Lấy thông tin chi tiết cuộc gọi hiện tại.                                                                                              |

<div class="note">
<strong>Quy chuẩn <code>externalCallId</code>:</strong>
<ul>
  <li>Độ dài tối đa: <strong>32 ký tự</strong>.</li>
  <li>Chỉ gồm chữ thường (<code>a</code>–<code>z</code>) và số (<code>0</code>–<code>9</code>).</li>
  <li>Không chứa ký tự đặc biệt, chữ in hoa hoặc khoảng trắng.</li>
</ul>
</div>

---

## 4. Sự kiện

Thẻ `<vbot-widget>` phát ra các Custom Event để theo dõi trạng thái và tích hợp với CRM:

```javascript
widget.addEventListener("vbot:onCallIncoming", (event) => {
  console.log("Thông tin cuộc gọi đến:", event.detail);
});
```

### Bảng sự kiện

| Tên sự kiện                   | Dữ liệu kèm theo (`event.detail`) | Mô tả sự kiện                                                                        |
| :---------------------------- | :-------------------------------- | :----------------------------------------------------------------------------------- |
| `vbot:onDial`                 | `{ phoneNumber: string }`         | Kích hoạt khi người dùng bấm nút Gọi trên bàn phím số mặc định của SDK (có thể hủy). |
| `vbot:onConnecting`           | -                                 | Bắt đầu khởi tạo kết nối tới tổng đài.                                               |
| `vbot:onConnected`            | -                                 | Kết nối tới máy chủ tổng đài thành công.                                             |
| `vbot:onDisconnected`         | -                                 | Ngắt kết nối khỏi máy chủ tổng đài.                                                  |
| `vbot:onUserConnected`        | -                                 | Tài khoản đã đăng ký online thành công.                                              |
| `vbot:onUserDisconnected`     | -                                 | Tài khoản đã ngắt đăng ký (offline).                                                 |
| `vbot:onUserConnectionFailed` | `{ error: string }`               | Đăng ký tài khoản thất bại.                                                          |
| `vbot:onCallIncoming`         | `{ callData: CallData }`          | Có cuộc gọi đến từ khách hàng.                                                       |
| `vbot:onCallProgress`         | `{ callData: CallData }`          | Đang đổ chuông cuộc gọi đi.                                                          |
| `vbot:onCallAccepted`         | `{ callData: CallData }`          | Cuộc gọi đã được kết nối (nghe máy).                                                 |
| `vbot:onCallEnded`            | `{ callData: CallData }`          | Cuộc gọi kết thúc thành công hoặc kết thúc sau khi thất bại.                          |
| `vbot:onCallFailed`           | `{ error: string, callData: CallData }` | Cuộc gọi thất bại (bận, từ chối, lỗi kết nối hoặc micro...). Xem thứ tự sự kiện bên dưới. |
| `vbot:onCallStateChange`      | `{ state: CallState }`            | Trạng thái cuộc gọi thay đổi (`idle`, `dialing`, `ringing`, `in-call`, `ended`).     |
| `vbot:onCallDuration`         | `{ duration: number }`            | Cập nhật thời gian gọi theo giây.                                                    |
| `vbot:onHotlinesUpdated`      | `{ hotlines: Hotline[] }`         | Danh sách hotline khả dụng đã được tải xong.                                         |
| `vbot:onError`                | `{ message: string }`             | Có lỗi hệ thống phát sinh từ SDK.                                                    |
| `vbot:onWarning`              | `{ message: string }`             | Cảnh báo hệ thống phát sinh từ SDK.                                                  |
| `vbot:onInfo`                 | `{ message: string }`             | Thông báo trạng thái hoặc thông tin hệ thống (ví dụ: cuộc gọi nhỡ).                  |

### Thứ tự sự kiện khi cuộc gọi lỗi

Khi cuộc gọi thất bại, SDK phát sự kiện theo thứ tự:

1. Phát **`vbot:onCallFailed`** trước tiên kèm thông tin lỗi và `callData`:
   ```javascript
   widget.addEventListener("vbot:onCallFailed", (event) => {
     const { error, callData } = event.detail;
     console.error("Lỗi cuộc gọi:", error);
     console.log("Mã lý do kết thúc:", callData.endReason); // VBotEndCallReasonKey
     console.log("Phía kết thúc:", callData.endedBy);       // VBotCallEndParty
     console.log("Mã SIP:", callData.code);                 // ví dụ: 486, 408, 603...
   });
   ```
2. Sau đó, SDK giải phóng media stream, đưa trạng thái về `idle` và phát **`vbot:onCallEnded`** (với `callData.status` là `'failed'`).

::: tip Trường hợp không phát onCallFailed
- **Cuộc gọi nhỡ (`incoming_call_timeout`)**: Cuộc gọi đến hết thời gian chờ, SDK chỉ phát `vbot:onInfo` và `vbot:onCallEnded` (không phát `vbot:onCallFailed` để tránh nhầm với lỗi đường truyền).
- **Người gọi tự hủy (`caller_canceled`)**: Người gọi dập máy trước khi đối phương bắt máy, SDK chuyển thẳng về `vbot:onCallEnded`.
:::

### Can thiệp cuộc gọi

Sự kiện `vbot:onDial` hỗ trợ `event.preventDefault()` để hoãn cuộc gọi. Thường dùng khi cần gọi API backend tạo trước lịch sử cuộc gọi và lấy `externalCallId`:

```javascript
widget.addEventListener("vbot:onDial", async (event) => {
  // 1. Hoãn cuộc gọi
  event.preventDefault();

  const phoneNumber = event.detail.phoneNumber;

  try {
    // 2. Tạo lịch sử cuộc gọi trên CRM và lấy ExternalCallId
    const res = await VbotService.createCallHistory({
      phoneNumber,
      ContextType: currentContextType,
      EntityId: currentEntityId,
    });

    // 3. Thực hiện cuộc gọi kèm ExternalCallId
    widget.makeCall(phoneNumber, undefined, res.ExternalCallId);
  } catch (error) {
    console.error("Lỗi khởi tạo cuộc gọi:", error);
  }
});
```

### Đối tượng CallData

| Trường           | Kiểu dữ liệu               | Mô tả                                                                                                                  |
| :--------------- | :------------------------- | :--------------------------------------------------------------------------------------------------------------------- |
| `id`             | `string`                   | ID định danh duy nhất của cuộc gọi trong phiên chạy SDK.                                                               |
| `phoneNumber`    | `string`                   | Số điện thoại đối tác (số khách hàng gọi đến hoặc số đang gọi đi).                                                     |
| `displayName`    | `string \| undefined`      | Tên hiển thị của đối tác (nếu có).                                                                                     |
| `direction`      | `'incoming' \| 'outgoing'` | Hướng cuộc gọi (`incoming` là cuộc gọi đến, `outgoing` là cuộc gọi đi).                                                |
| `startTime`      | `Date`                     | Thời điểm bắt đầu phiên kết nối cuộc gọi.                                                                              |
| `endTime`        | `Date \| undefined`        | Thời điểm cuộc gọi kết thúc.                                                                                           |
| `externalCallId` | `string \| undefined`      | ID cuộc gọi từ hệ thống CRM bên ngoài truyền vào khi gọi đi, hoặc trong thông tin cuộc gọi đến.                        |
| `status`         | `CallState`                | Trạng thái cuối của cuộc gọi (`'dialing'`, `'ringing'`, `'in-call'`, `'ended'`, `'failed'`).                          |
| `endReason`      | `VBotEndCallReasonKey`     | Mã lý do kết thúc cuộc gọi chuẩn hóa (xem bảng tra cứu bên dưới).                                                      |
| `endedBy`        | `VBotCallEndParty`         | Phía kích hoạt kết thúc cuộc gọi (`'caller'`, `'callee'`, `'server'`, `'carrier'`, `'system'`, `'unknown'`).          |
| `code`           | `number \| undefined`      | Mã phản hồi SIP/HTTP chuẩn (ví dụ: `200`, `486`, `408`, `402`, `403`...).                                              |
| `errorMessage`   | `string \| undefined`      | Chuỗi thông báo lỗi chi tiết khi cuộc gọi kết thúc không thành công.                                                   |

### Mã lý do kết thúc cuộc gọi

#### Phía kết thúc

| Giá trị (`endedBy`) | Phía kết thúc | Mô tả thực tế |
| :--- | :--- | :--- |
| `'caller'` | Người gọi | Người khởi tạo cuộc gọi chủ động dập máy hoặc hủy kết nối. |
| `'callee'` | Người nhận | Người nhận cuộc gọi bấm từ chối hoặc chủ động gác máy. |
| `'server'` | Máy chủ VBot | Tổng đài VBot chủ động ngắt cuộc gọi (hết số dư, gói cước hết hạn, chặn cuộc gọi...). |
| `'carrier'` | Nhà mạng viễn thông | Nhà mạng di động/cố định từ chối kết nối (thuê bao không liên lạc được, nhà mạng không hỗ trợ hướng gọi...). |
| `'system'` | Hệ thống Client SDK | SDK nội bộ phát hiện sự cố (hết thời gian chờ - timeout, lỗi micro, lỗi phiên WebRTC...). |
| `'unknown'` | Không xác định | Không đủ dữ liệu để xác định chính xác phía kết thúc. |

#### Danh mục mã lý do

| Mã lý do (`endReason`) | Mã SIP (`code`) | Phía kết thúc điển hình (`endedBy`) | Ý nghĩa & Mô tả chi tiết |
| :--- | :--- | :--- | :--- |
| `normal` | `200` | `caller` / `callee` | Cuộc gọi hoàn thành và kết thúc bình thường (BYE / OK). |
| `busy` | `486` | `callee` | Thuê bao bận, đang trong cuộc gọi khác hoặc bấm bận. |
| `caller_canceled` | `487` | `caller` | Người gọi chủ động dập máy/hủy gọi trước khi người nhận bắt máy. |
| `decline` | `603` | `callee` | Người nhận chủ động bấm từ chối cuộc gọi đến. |
| `temporarily_unavailable` | `480` | `carrier` | Thuê bao tạm thời không liên lạc được hoặc ngoài vùng phủ sóng. |
| `destination_not_found` | `404` | `carrier` / `server` | Số điện thoại đích không tồn tại hoặc không tìm thấy trên hệ thống viễn thông. |
| `destination_gone` | `410` | `server` | Số điện thoại hoặc tài khoản đích không còn hoạt động trên hệ thống. |
| `recipient_absent` | `480` | `carrier` | Người nhận không có mặt hoặc thiết bị không đăng ký online. |
| `time_out` | `408` | `system` / `server` | Hết thời gian chờ thiết lập cuộc gọi đi mà không có phản hồi từ máy chủ. |
| `incoming_call_timeout` | `408` | `system` | Cuộc gọi đến đổ chuông hết thời gian chờ mà không có nhân viên bắt máy (Cuộc gọi nhỡ). |
| `do_not_disturb` | `480` | `carrier` / `callee` | Thuê bao đích đang bật chế độ Không làm phiền (DND). |
| `do_not_call` | `603` | `server` / `carrier` | Số điện thoại nằm trong danh sách từ chối nhận cuộc gọi (DNC). |
| `recipient_blocks_calls` | `603` | `carrier` / `callee` | Thuê bao đích chặn cuộc gọi đến từ hotline/số này. |
| `insufficient_balance` | `402` | `server` | Tài khoản hoặc nhánh gọi không đủ số dư để thực hiện cuộc gọi. |
| `package_expired` | `403` | `server` | Gói cước dịch vụ tổng đài VBot đã hết hạn. |
| `project_expired` | `403` | `server` | Dự án tổng đài đã hết hạn hoặc tạm dừng hoạt động. |
| `unauthenticated` | `401` / `403` | `server` | Xác thực cuộc gọi thất bại, token hoặc thông tin SIP không hợp lệ. |
| `member_not_activated` | `403` | `server` | Tài khoản thành viên chưa được kích hoạt trên hệ thống VBot. |
| `member_not_in_project` | `403` | `server` | Thành viên không thuộc dự án tổng đài này. |
| `user_not_in_group` | `403` | `server` | Người dùng không thuộc nhóm cuộc gọi được cấu hình. |
| `hotline_telco_not_supported` | `488` | `server` / `carrier` | Hotline được chọn không hỗ trợ hướng gọi tới nhà mạng của thuê bao đích. |
| `telco_not_found` | `404` | `server` | Không xác định được nhà mạng của số điện thoại đích. |
| `call_interval_not_allowed` | `403` | `server` | Khoảng cách giữa các cuộc gọi không được phép (gọi liên tiếp quá nhanh). |
| `incorrect_information` | `400` | `server` | Thông tin cuộc gọi hoặc cú pháp số điện thoại không hợp lệ. |
| `invalid_parameter` | `488` | `server` | Tham số yêu cầu thiết lập cuộc gọi không hợp lệ. |
| `connection_error` | `500` / `503` | `system` / `server` | Lỗi kết nối truyền thông WebRTC / ICE / DTLS hoặc máy chủ quá tải. |
| `transmission_error` | `500` | `system` / `carrier` | Lỗi truyền dẫn gói tin media hoặc sự cố hạ tầng viễn thông. |
| `microphone_permission_denied` | `0` | `system` | Người dùng từ chối cấp quyền truy cập Microphone trên trình duyệt. |
| `network_error` | `0` | `system` | Mất kết nối Internet hoặc rớt kết nối WebSocket tới máy chủ tổng đài. |
| `unknown_error` | `0` | `unknown` | Lỗi khác không xác định. |

---

## 5. Chế độ Headless

Nếu muốn tự xây dựng giao diện riêng bằng HTML/CSS của website, bật thuộc tính `headless`:

```html
<vbot-widget token="YOUR_ACCESS_TOKEN" headless="true"></vbot-widget>
```

Khi bật `headless`:
- Thẻ `<vbot-widget>` không render giao diện (bàn phím số, màn hình đàm thoại, toast...).
- SDK chỉ xử lý kết nối SIP, cuộc gọi và âm thanh ngầm.
- Điều khiển cuộc gọi qua các phương thức JavaScript (`makeCall`, `answerCall`, `hangupCall`) và cập nhật UI theo sự kiện phát ra.

::: warning Xử lý thông báo ở chế độ Headless
Ở chế độ Headless, SDK không hiển thị thông báo Toast mặc định. Lắng nghe sự kiện để hiển thị thông báo qua UI của website (ví dụ Ant Design, Sonner, React-Toastify...):

```javascript
const widget = document.querySelector("vbot-widget");

// Thông tin hệ thống / cuộc gọi nhỡ
widget.addEventListener("vbot:onInfo", (event) => {
  myNotification.info(event.detail.message);
});

// Cảnh báo (ví dụ chưa cấp quyền micro)
widget.addEventListener("vbot:onWarning", (event) => {
  myNotification.warning(event.detail.message);
});

// Lỗi cuộc gọi thất bại hoặc lỗi hệ thống
widget.addEventListener("vbot:onCallFailed", (event) => {
  if (event.detail.error) {
    myNotification.error(event.detail.error);
  }
});

widget.addEventListener("vbot:onError", (event) => {
  myNotification.error(event.detail.message);
});
```
:::

---

## 6. Tùy biến giao diện

Tùy biến màu sắc giao diện mặc định bằng CSS Variables trên thẻ hoặc trong CSS toàn cục:

```html
<vbot-widget
  token="YOUR_ACCESS_TOKEN"
  style="--vbot-primary: #10b981; --vbot-call-primary: #22c55e;"
></vbot-widget>
```

### Danh sách CSS Variables

- `--vbot-primary`: Màu chủ đạo (nút bấm chính, viền tiêu điểm).
- `--vbot-primary-foreground`: Màu chữ trên nền màu chủ đạo.
- `--vbot-background`: Màu nền bàn phím số và màn hình gọi.
- `--vbot-foreground`: Màu chữ mặc định.
- `--vbot-border`: Màu viền các phần tử.
- `--vbot-ring`: Màu vòng phát sáng khi focus.
- `--vbot-call-primary`: Màu nút gọi và nút nghe máy.
- `--vbot-call-danger`: Màu nút dừng cuộc gọi và từ chối.
- `--vbot-z-index`: Giá trị `z-index` của widget (mặc định: `2147483000`).

---

## 7. Tích hợp Framework

Lưu ý khi tích hợp Web Component `<vbot-widget>` vào React, Next.js hoặc Vue:

### Đợi Custom Element sẵn sàng

Đảm bảo Custom Element đã sẵn sàng trước khi gọi các phương thức (`makeCall`, `answerCall`...):

```javascript
await customElements.whenDefined("vbot-widget");
const widget = document.querySelector("vbot-widget");
```

### Next.js

Trong Next.js, component `<Script>` chỉ nạp một lần khi tải trang. Khi chuyển trang (unmount/remount), nên kết hợp `customElements.whenDefined` thay vì dựa vào callback `onLoad`:

```tsx
"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

export default function VBotPhoneIntegration() {
  const widgetRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let widgetElement = widgetRef.current;

    const handleCallIncoming = (event: any) => {
      console.log("Có cuộc gọi đến:", event.detail.callData);
    };

    const handleCallEnded = (event: any) => {
      console.log("Cuộc gọi kết thúc:", event.detail.callData);
    };

    if (widgetElement) {
      widgetElement.addEventListener("vbot:onCallIncoming", handleCallIncoming);
      widgetElement.addEventListener("vbot:onCallEnded", handleCallEnded);
    }

    // Cleanup: gỡ bỏ listener khi unmount để tránh rò rỉ bộ nhớ
    return () => {
      if (widgetElement) {
        widgetElement.removeEventListener(
          "vbot:onCallIncoming",
          handleCallIncoming,
        );
        widgetElement.removeEventListener("vbot:onCallEnded", handleCallEnded);
      }
    };
  }, []);

  return (
    <>
      {/* Nạp SDK qua Next.js Script */}
      <Script
        src="https://cdn.vbot.vn/vbot-sdk/1.0.12/vbot-sdk.umd.js"
        strategy="afterInteractive"
      />

      {/* Thẻ Widget VBot */}
      <vbot-widget
        ref={widgetRef}
        token="YOUR_ACCESS_TOKEN"
        debug
      ></vbot-widget>
    </>
  );
}
```

### Tích hợp trong Modal và SPA

Nếu đặt widget trong component có CSS `transform`, `filter` hoặc modal giới hạn overflow, nên dùng Portal (React) hoặc Teleport (Vue) để đưa thẻ ra `document.body` tránh lỗi định vị:

::: code-group

```tsx [React / Next.js (createPortal)]
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

export default function CallCenterPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="crm-page-container">
      <h1>Tổng Đài Chăm Sóc Khách Hàng</h1>
      <p>Nội dung trang CRM...</p>

      {/* Giữ lifecycle trong trang nhưng render DOM ở document.body */}
      {mounted &&
        createPortal(
          <vbot-widget token="YOUR_ACCESS_TOKEN" debug />,
          document.body,
        )}
    </div>
  );
}
```

```vue [Vue 3 (Teleport)]
<template>
  <div class="crm-page-container">
    <h1>Tổng Đài Chăm Sóc Khách Hàng</h1>
    <p>Nội dung trang CRM...</p>

    <!-- Giữ lifecycle trong trang nhưng render DOM ở document.body -->
    <Teleport to="body">
      <vbot-widget token="YOUR_ACCESS_TOKEN" debug />
    </Teleport>
  </div>
</template>
```

:::

::: tip Khai báo TypeScript cho thẻ `<vbot-widget>`
Khi dùng TypeScript với React/Next.js, tạo file `custom-elements.d.ts` trong thư mục `src/` (hoặc `types/`) để khai báo kiểu cho thẻ `<vbot-widget>`:

```typescript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "vbot-widget": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          token?: string;
          config?: string | Record<string, any>;
          headless?: boolean | string;
          debug?: boolean | string;
          "external-call-id"?: string;
          "z-index"?: number | string;
          zIndex?: number | string;
        },
        HTMLElement
      >;
    }
  }
}
```

:::
