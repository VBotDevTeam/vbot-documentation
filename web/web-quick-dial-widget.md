# Hướng dẫn sử dụng VBot Quick Dial Widget

`vbot-quick-dial-widget` là một Web Component , giúp bạn dễ dàng tích hợp chức năng gọi điện thoại qua tổng đài VBot vào bất kỳ trang web nào. Component này cung cấp hai chế độ hoạt động linh hoạt:

1.  **Chế độ Popover (Mặc định):** Một nút gọi nổi (floating button) sẵn sàng sử dụng, khi bấm vào sẽ hiển thị một popover để nhập số và thực hiện cuộc gọi. Chế độ này "plug-and-play", không cần cấu hình giao diện.
2.  **Chế độ Headless (Tùy chỉnh UI):** Component sẽ chạy ở chế độ nền, không hiển thị bất kỳ giao diện nào. Chế độ này cho phép bạn toàn quyền xây dựng giao diện (UI) của riêng mình và sử dụng các phương thức của component để điều khiển logic gọi điện.

## 1. Cài đặt

Để sử dụng component, bạn chỉ cần nhúng file script đã được build vào trang HTML của mình.

```html
<!DOCTYPE html>
<html>
  <head>
    ...
  </head>
  <body>
    ...
    <script src="path/to/vbot-quick-dial-widget@x.x.x.umd.cjs"></script>
  </body>
</html>
```

## 2\. Sử dụng cơ bản (Chế độ Popover)

Đây là cách đơn giản nhất để thêm nút gọi vào trang web của bạn. Chỉ cần đặt thẻ `<vbot-quick-dial-widget>` vào vị trí mong muốn trong file HTML.

Thuộc tính quan trọng nhất bạn cần cung cấp là `token` để xác thực với hệ thống VBot.

```html
<vbot-quick-dial-widget
  token="YOUR_SECRET_TOKEN_HERE"
  style="position: fixed; bottom: 24px; right: 24px; z-index: 50;"
>
</vbot-quick-dial-widget>
```

Bạn cũng có thể tùy chỉnh các dòng chữ hiển thị thông qua thuộc tính `config`. Xem chi tiết ở phần [Tham chiếu API](https://www.google.com/search?q=%234-tham-chi%E1%BA%BFu-api-api-reference).

## 3\. Sử dụng nâng cao (Chế độ Headless)

Chế độ này phù hợp khi bạn muốn tích hợp chức năng gọi điện vào giao diện có sẵn của mình.

**Bước 1: Thêm component với thuộc tính `headless`**

Đặt component vào trang HTML với thuộc tính `headless`. Component sẽ được ẩn đi. Đừng quên đặt `id` để dễ dàng truy cập từ JavaScript.

```html
<vbot-quick-dial-widget
  id="vbot-brain"
  token="YOUR_SECRET_TOKEN_HERE"
  style="display: none;"
>
</vbot-quick-dial-widget>
```

**Bước 2: Tạo giao diện người dùng (UI) tùy chỉnh**

Tạo các thành phần HTML của riêng bạn như ô nhập số, nút gọi, nút kết thúc, và khu vực hiển thị trạng thái.

```html
<div class="custom-ui-container">
  <h3>Giao diện cuộc gọi tùy chỉnh</h3>
  <input type="tel" id="my-phone-input" placeholder="Nhập số điện thoại" />

  <button id="my-call-button">Gọi</button>
  <button id="my-end-call-button" style="display: none;">Kết thúc</button>

  <p id="my-call-status">Trạng thái: Đang chờ...</p>
</div>
```

**Bước 3: Kết nối UI với component bằng JavaScript**

Sử dụng JavaScript để lấy tham chiếu đến component `vbot-brain` và các phần tử UI của bạn. Sau đó, gọi các **phương thức** và lắng nghe các **sự kiện** của component để điều khiển luồng cuộc gọi.

```javascript
// Chờ cho custom element được định nghĩa hoàn toàn
customElements.whenDefined("vbot-quick-dial-widget").then(() => {
  const vbotBrain = document.getElementById("vbot-brain");
  const myPhoneInput = document.getElementById("my-phone-input");
  const myCallButton = document.getElementById("my-call-button");
  const myEndCallButton = document.getElementById("my-end-call-button");
  const myCallStatus = document.getElementById("my-call-status");

  // Gọi phương thức startCall khi người dùng bấm nút "Gọi"
  myCallButton.addEventListener("click", () => {
    const phoneNumber = myPhoneInput.value;
    if (phoneNumber && vbotBrain) {
      vbotBrain.startCall(phoneNumber);
    }
  });

  // Gọi phương thức endCall khi người dùng bấm nút "Kết thúc"
  myEndCallButton.addEventListener("click", () => {
    if (vbotBrain) {
      vbotBrain.endCall();
    }
  });

  // Lắng nghe các sự kiện từ component để cập nhật UI
  vbotBrain.addEventListener("vbot:onUserConnected", () => {
    myCallStatus.textContent = "Trạng thái: Sẵn sàng gọi!";
    myCallButton.disabled = false;
  });

  vbotBrain.addEventListener("vbot:onCallProgress", () => {
    myCallStatus.textContent = "Trạng thái: Đang đổ chuông...";
    myCallButton.style.display = "none";
    myEndCallButton.style.display = "inline-block";
  });

  vbotBrain.addEventListener("vbot:onCallAccepted", () => {
    myCallStatus.textContent = "Trạng thái: Đã kết nối.";
  });

  vbotBrain.addEventListener("vbot:onCallEnded", () => {
    myCallStatus.textContent = "Trạng thái: Cuộc gọi kết thúc.";
    myCallButton.style.display = "inline-block";
    myEndCallButton.style.display = "none";
  });

  vbotBrain.addEventListener("vbot:onCallFailed", (event) => {
    myCallStatus.textContent = `Lỗi: ${event.detail.cause || "Không xác định"}`;
    myCallButton.style.display = "inline-block";
    myEndCallButton.style.display = "none";
  });
});
```

## 4\. Tham chiếu API (API Reference)

### Thuộc tính (Props)

Đây là các thuộc tính bạn có thể thiết lập trực tiếp trên thẻ HTML của component.

| Thuộc tính | Kiểu dữ liệu           | Bắt buộc | Mặc định       | Mô tả                                                           |
| :--------- | :--------------------- | :------- | :------------- | :-------------------------------------------------------------- |
| `token`    | `string`               | **Có**   | `''`           | Token bí mật để xác thực với API của VBot.                      |
| `config`   | `object` hoặc `string` | Không    | (xem bên dưới) | Một đối tượng hoặc chuỗi JSON để cấu hình văn bản và giao diện. |

**Chi tiết thuộc tính `config`:**

Đối tượng `config` có các trường sau:

- `theme`: (`'normal'` | `'dark'` | `'system'`) - Giao diện sáng hoặc tối.
- `prepareTitle`: (`string`) - Tiêu đề khi popover ở trạng thái chuẩn bị gọi. Mặc định: `'VBot - Tổng đài AI'`.
- `prepareDescription`: (`string`) - Mô tả khi popover ở trạng thái chuẩn bị gọi. Mặc định: `'Quý khách vui lòng nhập số điện thoại để trải nghiệm dịch vụ.'`.
- `callingTitle`: (`string`) - Tiêu đề khi đang trong cuộc gọi. Mặc định: `'VBot - Cuộc gọi miễn phí'`.
- `callingDescription`: (`string`) - Mô tả khi đang trong cuộc gọi. Mặc định: `'Tổng đài AI của VBot'`.

Bạn có thể truyền `config` dưới dạng một chuỗi JSON:

```html
<vbot-quick-dial-widget
  token="..."
  config='{
        "prepareTitle": "Chào bạn!",
        "prepareDescription": "Nhập số để gọi cho chúng tôi."
    }'
>
</vbot-quick-dial-widget>
```

### Phương thức (Methods)

Bạn có thể gọi các phương thức này trên instance của component từ JavaScript.

| Phương thức              | Tham số               | Mô tả                                                 |
| :----------------------- | :-------------------- | :---------------------------------------------------- |
| `startCall(phoneNumber)` | `phoneNumber: string` | Bắt đầu một cuộc gọi đến số điện thoại được cung cấp. |
| `endCall()`              | (không có)            | Kết thúc cuộc gọi hiện tại.                           |
| `show()`                 | (không có)            | Hiển thị popover (chỉ hoạt động ở chế độ Popover).    |
| `hide()`                 | (không có)            | Ẩn popover (chỉ hoạt động ở chế độ Popover).          |
| `toggle()`               | (không có)            | Bật/tắt popover (chỉ hoạt động ở chế độ Popover).     |

### Sự kiện (Events)

Component phát ra các sự kiện tùy chỉnh (Custom Events) để bạn có thể theo dõi trạng thái của kết nối và cuộc gọi. Bạn có thể lắng nghe chúng bằng `addEventListener`.

| Tên sự kiện                   | `event.detail`   | Mô tả                                                         |
| :---------------------------- | :--------------- | :------------------------------------------------------------ |
| `vbot:onConnecting`           | (không có)       | Đang kết nối đến máy chủ tổng đài.                            |
| `vbot:onConnected`            | (không có)       | Đã kết nối thành công đến máy chủ.                            |
| `vbot:onDisconnected`         | (không có)       | Mất kết nối đến máy chủ.                                      |
| `vbot:onUserConnected`        | (không có)       | Đã kết nối tài khoản thành công, sẵn sàng thực hiện cuộc gọi. |
| `vbot:onUserDisconnected`     | (không có)       | Đã ngắt kết nối tài khoản.                                    |
| `vbot:onUserConnectionFailed` | `{ error: any }` | Kết nối tài khoản thất bại. `error` chứa thông tin lỗi.       |
| `vbot:onCallProgress`         | (không có)       | Cuộc gọi đang được thực hiện (đang đổ chuông).                |
| `vbot:onCallAccepted`         | (không có)       | Người nhận đã nhấc máy, cuộc gọi đã được kết nối.             |
| `vbot:onCallFailed`           | `{ cause: any }` | Thực hiện cuộc gọi thất bại. `cause` chứa lý do thất bại.     |
| `vbot:onCallEnded`            | (không có)       | Cuộc gọi đã kết thúc (bởi một trong hai bên).                 |

## 5\. Tùy chỉnh Giao diện (Styling)

Bạn có thể tùy chỉnh màu sắc chính của component (chế độ Popover) bằng cách sử dụng các biến CSS (CSS Custom Properties) trên selector `:root` hoặc trên chính thẻ component.

```css
/* Ví dụ: Thay đổi màu chính của nút gọi */
:root {
  --vbot-quick-dial-widget-primary-color: #ff5722;
  --vbot-quick-dial-widget-primary-hover-color: #f4511e;
}
```

| Biến CSS                                        | Mô tả                     |
| :---------------------------------------------- | :------------------------ |
| `--vbot-quick-dial-widget-primary-color`        | Màu nền chính.            |
| `--vbot-quick-dial-widget-primary-hover-color`  | Màu nền khi di chuột qua. |
| `--vbot-quick-dial-widget-primary-active-color` | Màu nền khi bấm vào.      |
