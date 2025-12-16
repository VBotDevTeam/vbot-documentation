# VBot Quick Dial Widget

**Web Component nhúng tổng đài VBot vào mọi website**

**VBot Quick Dial Widget** là một Web Component độc lập giúp tích hợp nhanh chức năng gọi điện qua tổng đài VBot vào bất kỳ một website nào.

Giải pháp hỗ trợ hai chế độ:

- **Popover (mặc định):** Hiển thị nút gọi nổi và giao diện gọi điện đầy đủ.
- **Headless:** Chỉ dùng SDK và sự kiện, cho phép khách hàng tự thiết kế UI.

Các lớp bảo mật tích hợp sẵn bao gồm Cloudflare Turnstile, kiểm tra nguồn (Origin Validation), mã hóa hai chiều nhằm bảo vệ tuyệt đối trước bot, spam và bảo mật thông tin.

## 1. Tính năng nổi bật

- Nhúng nhanh chỉ bằng một thẻ `<vbot-quick-dial-widget>`.
- Tự động tạo nút gọi nổi, popover nhập số và giao diện màn hình gọi.
- Hỗ trợ **Headless Mode** để tự xây dựng UI, vẫn giữ nguyên toàn bộ API & sự kiện.
- Xác thực đa tầng: Turnstile → Mã hóa hai chiều → Tài khoản kết nối tạm thời.
- Hệ thống **theme token** dễ tùy biến giao diện.
- Bundle dạng UMD, hoạt động trên mọi nền tảng: HTML thuần, React, Vue, Angular, WordPress…

## 2. Cấu hình Cloudflare Turnstile

### 2.1. Truy cập Cloudflare Dashboard

- **Bước 1:** Truy cập vào [https://dash.cloudflare.com/](https://dash.cloudflare.com/) chọn Turnstile
- **Bước 2:** Chọn **Add widget**

![Cloudflare Dashboard](/public/WebQuickDialWidget/Picture1.png)

### 2.2. Add Hostname

- **Bước 1:** Nhập tên của widget
- **Bước 2:** Chọn **Add Hostnames**
- **Bước 3:** Nhập danh sách các Hostname của bạn

  **Lưu ý:**

  - Các hostname có trong danh sách này thì mới có thể được xác thực bởi Turnstile
  - Khi code và run debug app ở localhost (Ví dụ: localhost:5143) thì hãy thay bằng 127.0.0.1 (Ví dụ: 127.0.0.1:5143) và nhớ thêm 127.0.0.1 vào cấu hình Hostname này

- **Bước 4:** Chọn Add để lưu

![Add Hostname](/public/WebQuickDialWidget/Picture2.png)

### 2.3. Copy Site Key và Secret Key

Sao chép 2 mã là **Site Key** và **Secret Key**

Hai mã này sẽ dùng để cấu hình widget trên website **VBot Console**

![Copy Site Key và Secret Key](/public/WebQuickDialWidget/Picture3.png)

## 3. Cách tích hợp widget vào website

Thêm script bundle từ CDN:

```html
<script
  src="https://cdn.vbot.vn/quick-dial/vbot-quick-dial-widget@x.x.x.umd.cjs"
  defer
></script>
```

Khuyến nghị sử dụng `defer` hoặc đặt ở cuối trang để widget đăng ký custom element sau khi tải xong.

## 4. Sử dụng chế độ Popover (mặc định)

### 4.1. Cấu hình

```html
<vbot-quick-dial-widget
  client-id="YOUR_CLIENT_ID"
  style="position: fixed; bottom: 24px; right: 24px; z-index: 50;"
></vbot-quick-dial-widget>
```

Giải thích thuộc tính:

- **client-id:** Mã tenant được cấp riêng cho từng khách hàng.

Widget tự xử lý toàn bộ luồng xác thực, kết nối tổng đài trước và thực hiện cuộc gọi.

### 4.2. Vị trí

Bạn có thể tùy chỉnh bằng cách cấu hình `position: fixed` + offset và `z-index` (ví dụ trên). Một số vị trí mẫu:

- Góc dưới phải: `style="position: fixed; bottom: 24px; right: 24px; z-index: 50;"`
- Góc dưới trái: `style="position: fixed; bottom: 24px; left: 24px; z-index: 50;"`
- Góc trên phải: `style="position: fixed; top: 24px; right: 24px; z-index: 50;"`
- Góc trên trái: `style="position: fixed; top: 24px; left: 24px; z-index: 50;"`

### 4.3. Theme

Ghi đè trên thẻ widget hoặc `:root`:

```css
vbot-quick-dial-widget {
  --vb-wg-color-primary: #2563eb;
  --vb-wg-color-primary-foreground: #f8fafc;
  --vb-wg-color-card: #ffffff;
  --vb-wg-color-border: #dbeafe;
  --vb-wg-color-muted: #64748b;
  --vb-wg-color-destructive: #dc2626;
  --vb-wg-font-sans: "Space Grotesk", "Inter", "Segoe UI", system-ui, sans-serif;
  --vb-wg-radius-lg: 1.25rem;
}
```

Dark mode tự áp dụng khi host có class `.dark` hoặc theme `system`.

### 4.4. Tùy chỉnh nội dung hiển thị

- `triggerBadge`: VBot
- `triggerHeadline`: Tư vấn miễn phí
- `prepareSectionLabel`: VBot
- `prepareTitle`: VBot - Tổng đài AI
- `prepareDescription`: Quý khách vui lòng nhập số điện thoại của mình để trải nghiệm dịch vụ.
- `phoneFieldLabel`: Số điện thoại
- `phonePlaceholder`: _(trống)_
- `inputLoadingPlaceholder`: Đang xác thực...
- `startCallCta`: Bắt đầu cuộc gọi
- `verificationRequiredMessage`: Bạn cần xác thực trước khi thực hiện cuộc gọi.
- `verificationFailedMessage`: Không thể xác thực. Vui lòng thử lại.
- `verificationExpiredMessage`: Phiên xác thực đã hết hạn, vui lòng xác thực lại.
- `sessionInitMessage`: Đang khởi tạo phiên an toàn...
- `sessionReadyMessage`: Phiên đã sẵn sàng, vui lòng xác thực để gọi.
- `sessionErrorMessage`: Không thể khởi tạo phiên. Vui lòng thử lại.
- `sessionExpiredMessage`: Phiên đã hết hạn. Vui lòng mở lại để khởi tạo mới.
- `callingSectionLabel`: Cuộc gọi miễn phí
- `callingTitle`: VBot - Cuộc gọi miễn phí
- `endCallCta`: Kết thúc cuộc gọi
- `validationEmptyPhone`: Vui lòng nhập số điện thoại!
- `validationInvalidPhone`: Số điện thoại không hợp lệ. Vui lòng kiểm tra lại.
- `statuses`:
  - `fetchingCredentials`: Đang lấy thông tin...
  - `initializingSession`: Đang khởi tạo...
  - `connectingGateway`: Đang kết nối...
  - `connectedRegistering`: Đã kết nối
  - `registering`: Đang đăng ký...
  - `disconnected`: Mất kết nối!
  - `dialing`: Đang gọi...
  - `registrationFailed`: Kết nối thất bại!
  - `ringing`: Đang đổ chuông...
  - `callConnected`: Cuộc gọi đã kết nối
  - `callEnded`: Cuộc gọi đã kết thúc.
  - `systemError`: Lỗi hệ thống!
  - `callFailed`: Gọi thất bại: {reason}
  - `unknownReason`: Không rõ nguyên nhân

## 5. Chế độ Headless (tự xây UI)

Luồng chuẩn: `init()` → nhận `turnstileSiteKey` (sống ~5 phút, hết ngay sau 1 lần `connect`) → render Turnstile → lấy token → `connect(phone, token)`.

### 5.1. Khởi tạo widget headless

```html
<vbot-quick-dial-widget
  headless
  client-id="YOUR_CLIENT_ID"
></vbot-quick-dial-widget>
<div id="my-turnstile"></div>
<input id="phone" type="tel" />
<button id="call" disabled>Gọi</button>
<button id="end" hidden>Kết thúc</button>
<p id="status">Đang khởi tạo...</p>
```

Giải thích thuộc tính:

- **client-id:** Mã tenant được cấp riêng cho từng khách hàng.
- **headless:** boolean - Ẩn UI mặc định.

### 5.2. Script

```html
<script
  src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
  async
  defer
></script>
<script type="module">
  customElements.whenDefined("vbot-quick-dial-widget").then(async () => {
    const widget = document.querySelector("#vbot-brain");
    const callBtn = document.querySelector("#call");
    const endBtn = document.querySelector("#end");
    const phoneInput = document.querySelector("#phone");
    const status = document.querySelector("#status");
    const container = document.querySelector("#my-turnstile");
    let token = "";

    const renderTurnstile = async () => {
      const { turnstileSiteKey, expiresAt } = await widget.init();
      status.textContent = `Phiên sẵn sàng (hết hạn: ${new Date(
        expiresAt
      ).toLocaleTimeString()})`;
      container.innerHTML = "";
      window.turnstile.render(container, {
        sitekey: turnstileSiteKey,
        callback: (t) => {
          token = t;
          callBtn.disabled = false;
        },
        "expired-callback": () => {
          token = "";
          callBtn.disabled = true;
          status.textContent = "Token hết hạn, xác thực lại.";
        },
      });
    };

    window.turnstile
      ? renderTurnstile()
      : window.addEventListener("load", renderTurnstile);

    callBtn.onclick = async () => {
      if (!token) return;
      try {
        await widget.connect(phoneInput.value, token);
        callBtn.hidden = true;
        endBtn.hidden = false;
      } catch (e) {
        status.textContent = `Lỗi: ${e?.message || "Không xác định"}`;
        token = "";
        callBtn.disabled = true;
        renderTurnstile();
      }
    };
    endBtn.onclick = () => widget.endCall();

    widget.addEventListener(
      "vbot:onCallProgress",
      () => (status.textContent = "Đang đổ chuông...")
    );
    widget.addEventListener(
      "vbot:onCallAccepted",
      () => (status.textContent = "Đã kết nối.")
    );
    widget.addEventListener("vbot:onCallEnded", () => {
      status.textContent = "Cuộc gọi đã kết thúc.";
      callBtn.hidden = false;
      endBtn.hidden = true;
      token = "";
      renderTurnstile();
    });
    widget.addEventListener("vbot:onCallFailed", (e) => {
      status.textContent = `Gọi thất bại: ${
        (e.detail?.cause?.message ||
          e.detail?.cause?.code ||
          e.detail?.cause) ??
        "Không xác định"
      }`;
      callBtn.hidden = false;
      endBtn.hidden = true;
      token = "";
      renderTurnstile();
    });
    widget.addEventListener("vbot:onSessionExpired", () => {
      status.textContent = "Phiên hết hạn, hãy xác thực lại.";
      token = "";
      renderTurnstile();
    });
  });
</script>
```

## 6. Hàm public

| Phương thức                      | Tham số            | Ghi chú                                                                                              |
| -------------------------------- | ------------------ | ---------------------------------------------------------------------------------------------------- |
| `init()`                         | -                  | Headless: init session, trả `{ turnstileSiteKey, expiresAt }`. TTL ~5 phút, hết sau 1 lần `connect`. |
| `connect(phone, turnstileToken)` | `string`, `string` | Headless: thực hiện gọi, yêu cầu token Turnstile còn hạn.                                            |
| `endCall()`                      | -                  | Kết thúc cuộc gọi hiện tại.                                                                          |
| `show()` / `hide()` / `toggle()` | -                  | Điều khiển popover (không tác dụng khi `headless`).                                                  |
| `sendDtmf(tone)`                 | `string`           | Gửi DTMF khi cuộc gọi đang kết nối.                                                                  |

## 7. Lắng nghe sự kiện

### 7.1. Danh sách sự kiện

| Tên sự kiện                                                              | event.detail                                                | Khi nào                                          |
| ------------------------------------------------------------------------ | ----------------------------------------------------------- | ------------------------------------------------ |
| `vbot:onConnecting` / `onConnected` / `onDisconnected`                   | -                                                           | Trạng thái SK.                                   |
| `vbot:onUserConnected` / `onUserDisconnected` / `onUserConnectionFailed` | `{ error?: any }`                                           | Kết nối thành công/thất bại                      |
| `vbot:onCallProgress` / `onCallAccepted` / `onCallEnded`                 | -                                                           | Đổ chuông / trả lời / kết thúc                   |
| `vbot:onCallFailed`                                                      | `{ cause: { code?: string; message?: string; raw?: any } }` | Cuộc gọi thất bại (busy/rejected/timeout/mic...) |
| `vbot:onVerificationFailed`                                              | `{ reason: string }`                                        | Token Turnstile thiếu/hết hạn/bị từ chối         |
| `vbot:onSessionInit`                                                     | `{ expiresAt: number }`                                     | Init session thành công (TTL tính bằng ms)       |
| `vbot:onSessionExpired`                                                  | -                                                           | Session hết hạn, cần init() lại                  |

### 7.2. Danh sách mã lỗi

| Code                            | Message mặc định              | Ghi chú                      |
| ------------------------------- | ----------------------------- | ---------------------------- |
| `MIC_NOT_AVAILABLE`             | Không tìm thấy microphone     | Không có/không cấp quyền mic |
| `CALL_BUSY`                     | Đường dây bận                 | -                            |
| `CALL_REJECTED`                 | Cuộc gọi bị từ chối           | -                            |
| `CALLEE_NOT_FOUND`              | Không tìm thấy người nhận     | -                            |
| `CALLEE_UNAVAILABLE`            | Không thể liên lạc            | -                            |
| `CALL_TIMEOUT`                  | Hết thời gian kết nối         | -                            |
| `CALL_FAILED`                   | Cuộc gọi thất bại             | -                            |
| `TURNSTILE_VERIFICATION_FAILED` | Turnstile verification failed | Thiếu/sai token Turnstile    |
| `SESSION_EXPIRED`               | Session has expired           | Session hết hạn              |
| `SESSION_NOT_INITIALIZED`       | Session not initialized       | Chưa init mà đã connect      |
| `SESSION_INIT_FAILED`           | Failed to initialize session  | Init session lỗi             |

## 8. Giao diện

![Giao diện nút gọi](/public/WebQuickDialWidget/Picture4.png)

![Giao diện nhập số điện thoại](/public/WebQuickDialWidget/Picture5.png)

![Giao diện đang gọi](/public/WebQuickDialWidget/Picture6.png)
