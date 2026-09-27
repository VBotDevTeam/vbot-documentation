---
outline: deep
---

# Changelog

Trang này ghi lại các thay đổi của VBot Web SDK. Vui lòng theo dõi để cập nhật tích hợp kịp thời.

## v1.0.11

_Ngày phát hành: 28/09/2026_

### Tính năng mới & Cải tiến

- **Tùy chỉnh Z-Index & Tầng hiển thị (Stacking Layer)**:
  - Nâng base `z-index` mặc định lên `2147483000` (giới hạn int32 an toàn trên trình duyệt) để không bị che lấp bởi các modal, drawer hay header của website tích hợp. Toast và Floating Indicator được offset `+10` để luôn nổi trên cùng.
  - Hỗ trợ tùy biến linh hoạt qua CSS Token `--vbot-z-index`, HTML Attribute `z-index="..."`, hoặc qua `config.zIndex`.
  - Bổ sung hướng dẫn tích hợp theo route trong SPA (React `createPortal`, Vue `Teleport`) giúp giữ đúng component lifecycle và tránh bẫy Stacking Context cục bộ do CSS của trang tạo ra.

::: tip Cập nhật script bundle CDN

```html
<!-- ESM -->
<script
  type="module"
  src="https://cdn.vbot.vn/vbot-sdk/1.0.11/vbot-sdk.es.js"
></script>

<!-- UMD -->
<script
  src="https://cdn.vbot.vn/vbot-sdk/1.0.11/vbot-sdk.umd.js"
  defer
></script>
```

:::

## v1.0.10

_Ngày phát hành: 27/09/2026_

### Tính năng mới & Cải tiến

- **Chế độ Debug Logging chuyên dụng**: Hỗ trợ bật/tắt log debug của SDK linh hoạt thông qua:
  - Thuộc tính `debug` hoặc `enableLog` trong đối tượng `config`.
  - Thuộc tính HTML (Attribute): `<vbot-widget debug ...>`.
  - Bật tức thời tại Console DevTools: `window.__VBOT_DEBUG__ = true` hoặc `localStorage.setItem('vbot_debug', 'true')`.

::: tip Cập nhật script bundle CDN

```html
<!-- ESM -->
<script
  type="module"
  src="https://cdn.vbot.vn/vbot-sdk/1.0.10/vbot-sdk.es.js"
></script>

<!-- UMD -->
<script
  src="https://cdn.vbot.vn/vbot-sdk/1.0.10/vbot-sdk.umd.js"
  defer
></script>
```

:::

## v1.0.9

_Ngày phát hành: 25/09/2026_

### Tính năng mới & Cải tiến

- **Thông báo Cuộc gọi nhỡ (Missed Call)**: Bổ sung nhận diện và hiển thị thông báo cuộc gọi nhỡ kèm số điện thoại thuê bao gọi đến (`Cuộc gọi nhỡ từ thuê bao {số điện thoại}`).
- **Chuẩn hóa luồng sự kiện**:
  - Khi cuộc gọi đến bị người gọi hủy (`remote Canceled`) hoặc hết thời gian chờ (`No Answer` / `Expires`), SDK phát thông báo qua sự kiện `vbot:onInfo` và chuyển về `vbot:onCallEnded`, không phát `vbot:onCallFailed` để tránh nhầm lẫn với lỗi hạ tầng kết nối.
  - Sửa lỗi trạng thái cuộc gọi bị nhảy sai sang `dialing` khi nhận `progress(local)` từ cuộc gọi đến.

::: tip Cập nhật script bundle CDN

```html
<!-- ESM -->
<script
  type="module"
  src="https://cdn.vbot.vn/vbot-sdk/1.0.9/vbot-sdk.es.js"
></script>

<!-- UMD -->
<script src="https://cdn.vbot.vn/vbot-sdk/1.0.9/vbot-sdk.umd.js" defer></script>
```

:::

## v1.0.8

_Ngày phát hành: 23/09/2026_

### Tính năng mới & Cải tiến

- **Hỗ trợ `externalCallId`**: Cho phép cấu hình sẵn ID định danh cuộc gọi của hệ thống CRM bên ngoài trước khi thực hiện cuộc gọi qua bàn phím quay số.
- **Can thiệp cuộc gọi (`vbot:onDial`)**: Hỗ trợ gọi `event.preventDefault()` trên sự kiện `vbot:onDial` để chặn cuộc gọi ngay lập tức, cho phép CRM tạo trước phiên ghi nhận lịch sử và lấy mã cuộc gọi.

::: tip Cập nhật script bundle CDN

```html
<!-- ESM -->
<script
  type="module"
  src="https://cdn.vbot.vn/vbot-sdk/1.0.8/vbot-sdk.es.js"
></script>

<!-- UMD -->
<script src="https://cdn.vbot.vn/vbot-sdk/1.0.8/vbot-sdk.umd.js" defer></script>
```

:::

## v1.0.7

_Ngày phát hành: 18/09/2026_

### Tính năng mới & Cải tiến

- **Quản lý thiết bị âm thanh I/O**: Bổ sung các phương thức runtime `setAudioInputDevice` và `setAudioOutputDevice` cho phép chọn micro và tai nghe/loa linh hoạt.
- **Tối ưu Headless Mode**: Ẩn hoàn toàn overlay popover và chỉ chạy ngầm âm thanh cũng như luồng tín hiệu cuộc gọi.

::: tip Cập nhật script bundle CDN

```html
<!-- ESM -->
<script
  type="module"
  src="https://cdn.vbot.vn/vbot-sdk/1.0.7/vbot-sdk.es.js"
></script>

<!-- UMD -->
<script src="https://cdn.vbot.vn/vbot-sdk/1.0.7/vbot-sdk.umd.js" defer></script>
```

:::
