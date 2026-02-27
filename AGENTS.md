# AGENTS.md — VBot Documentation

> File này cung cấp tổng quan cho AI agent (và developer) hiểu nhanh cấu trúc, quy ước và ngữ cảnh của dự án.

---

## 1. Tổng quan dự án

**VBot Documentation** là trang tài liệu kỹ thuật chính thức của **VBot** — nền tảng tổng đài AI đa tính năng, đa nền tảng. Tài liệu được viết hoàn toàn bằng **tiếng Việt**, phục vụ đối tượng là khách hàng doanh nghiệp và developer tích hợp.

- **URL gốc**: Được deploy qua GitHub Pages tại path `/vbot-documentation/`.
- **Repository**: `VBotDevTeam/vbot-documentation`

---

## 2. Tech Stack

| Thành phần        | Công nghệ                                    |
| ----------------- | -------------------------------------------- |
| Static Site Gen   | [VitePress](https://vitepress.dev/) `^1.6.3` |
| Package Manager   | `pnpm@9.15.4`                                |
| Ngôn ngữ nội dung | Markdown (`.md`) + inline HTML/CSS           |
| Theme             | VitePress Default Theme (extended)           |
| Font              | Google Fonts — **Be Vietnam Pro**, Inter     |
| Brand Color       | `#19b24f` (xanh lá VBot)                     |

---

## 3. Cấu trúc thư mục

```
vbot-documentation/
├── .github/workflows/       # CI/CD (GitHub Actions deploy)
├── .vitepress/
│   ├── config.mts           # ⚙️  Cấu hình VitePress (nav, sidebar, search, base URL)
│   ├── theme/
│   │   ├── index.ts          # Theme entry — extends DefaultTheme
│   │   └── style.css         # Custom CSS: brand color, font, API badge, highlight-text
│   └── cache/                # Build cache (git-ignored)
├── public/                   # Static assets (images, icons, SVG)
│   ├── app-logo.png          # Favicon + logo
│   ├── icon-pages.svg        # Hero image
│   ├── CauhinhSDK/           # Hình minh hoạ Android/iOS SDK
│   ├── GitHub/               # Hình GitHub
│   ├── Push-Notification/    # Hình push notification
│   ├── Webhooks/             # Hình hướng dẫn webhooks (5 ảnh)
│   ├── WebQuickDialWidget/   # Hình Quick Dial Widget (6 ảnh)
│   └── iOSSDK/              # Hình iOS SDK
│
├── open-api/                 # 📖 Mục "Open API" — 9 file
│   ├── introduction.md       # Giới thiệu chung, bảng mã lỗi
│   ├── authentication.md     # Lấy token, refresh token
│   ├── webhooks.md           # Cấu hình webhook
│   ├── customers.md          # CRUD khách hàng, trạng thái, kiểu, nhóm KH
│   ├── member.md             # CRUD thành viên, tài khoản SDK/SIP, token, tiền
│   ├── group-member.md       # CRUD nhóm thành viên, thêm/xoá member trong nhóm
│   ├── hotline.md            # Lấy DS hotline, gán/xoá hotline cho thành viên
│   ├── call-transaction.md   # Lịch sử cuộc gọi, đếm cuộc gọi
│   └── autocall.md           # Tạo chiến dịch gọi tự động (campaign)
│
├── web/                      # 📖 Mục "Web" — 3 file
│   ├── web-sdk.md            # JavaScript SDK: kết nối, gọi, nhận cuộc gọi, DTMF
│   ├── web-phone.md          # Web Plugin: nhúng bàn phím quay số (VBotWebCall)
│   └── web-quick-dial-widget.md  # Quick Dial Widget: Web Component, Headless mode,
│                              #    Turnstile, theme tokens, sự kiện, mã lỗi
│
├── android-sdk/              # 📖 Mục "Android SDK" — 4 file
│   ├── cau-hinh-sdk.md       # Cấu hình Gradle + JitPack
│   ├── push-notification.md  # Push notification
│   ├── khoi-tao-sdk.md       # Khởi tạo SDK
│   └── huong-dan-su-dung.md  # Hướng dẫn sử dụng
│
├── ios-sdk/                  # 📖 Mục "iOS SDK" — 3 file
│   ├── cau-hinh-sdk.md       # Cấu hình CocoaPods
│   ├── push-notification.md  # Push notification
│   └── huong-dan-su-dung.md  # Hướng dẫn sử dụng
│
├── index.md                  # 🏠 Trang chủ (VitePress Home layout)
├── package.json              # Scripts: docs:dev, docs:build, docs:preview
├── README.md                 # (Trống)
├── api-examples.md           # File mẫu VitePress (không dùng chính)
└── markdown-examples.md      # File mẫu VitePress (không dùng chính)
```

---

## 4. Các mục nội dung chính

### 4.1. Open API (`open-api/`)

Tài liệu REST API cho backend integration. Tất cả sử dụng Bearer token authentication.

| File                  | Nội dung                                       | Số API |
| --------------------- | ---------------------------------------------- | ------ |
| `introduction.md`     | Giới thiệu, phạm vi, bảng mã lỗi chung         | —      |
| `authentication.md`   | Lấy token (`POST /token`), refresh token       | 2      |
| `webhooks.md`         | Hướng dẫn mua tiện ích + cài đặt webhook URL   | —      |
| `customers.md`        | CRUD khách hàng, trạng thái, kiểu, nhóm KH     | ~18    |
| `member.md`           | CRUD thành viên SDK/SIP, token, nhánh, tiền    | ~12    |
| `group-member.md`     | CRUD nhóm thành viên, thêm/xoá thành viên      | 7      |
| `hotline.md`          | Lấy DS hotline, gán/xoá hotline cho thành viên | 3      |
| `call-transaction.md` | Lịch sử cuộc gọi + đếm số lượng                | 2      |
| `autocall.md`         | Tạo campaign gọi tự động + webhook callback    | 1+     |

### 4.2. Web (`web/`)

| File                       | Nội dung                                                                            |
| -------------------------- | ----------------------------------------------------------------------------------- |
| `web-sdk.md`               | JS SDK: `VBotClient`, connect, invite, events, DTMF, I/O                            |
| `web-phone.md`             | Web Plugin: nhúng `<script>` VBotWebCall                                            |
| `web-quick-dial-widget.md` | Web Component `<vbot-quick-dial-widget>`: Popover + Headless mode, Turnstile, theme |

### 4.3. Android SDK (`android-sdk/`)

SDK native Android qua JitPack: `VBotPhoneSDKAndroid-Public:1.0.9`

| File                   | Nội dung                         |
| ---------------------- | -------------------------------- |
| `cau-hinh-sdk.md`      | Cấu hình Gradle + dependencies   |
| `push-notification.md` | Push notification setup          |
| `khoi-tao-sdk.md`      | Khởi tạo SDK trong app           |
| `huong-dan-su-dung.md` | Hướng dẫn sử dụng từng chức năng |

### 4.4. iOS SDK (`ios-sdk/`)

SDK native iOS qua CocoaPods: `VBotPhoneSDKiOS-Public 1.1.0` (platform iOS 13.5+)

| File                   | Nội dung                        |
| ---------------------- | ------------------------------- |
| `cau-hinh-sdk.md`      | Podfile setup + token hướng dẫn |
| `push-notification.md` | Push notification               |
| `huong-dan-su-dung.md` | Hướng dẫn sử dụng               |

---

## 5. Scripts phát triển

```bash
# Chạy dev server
pnpm docs:dev

# Build production
pnpm docs:build

# Preview bản build
pnpm docs:preview
```

---

## 6. Quy ước viết nội dung

### Ngôn ngữ

- **Nội dung**: Tiếng Việt
- **Code/biến/URL/key**: Tiếng Anh

### Markdown conventions

- Mỗi file bắt đầu bằng frontmatter `outline: deep` (cho table of contents chi tiết)
- API endpoint hiển thị bằng custom HTML class:
  ```html
  <div class="api-container">
    <span class="api-method">POST</span>
    <span>[URL]/api/...</span>
  </div>
  ```
- Highlight text dùng: `<span class="highlight-text">text</span>`
- Note block dùng: `<div class="note">...</div>`
- Warning block dùng inline HTML với SVG icon + border

### Cấu trúc API documentation

Mỗi API endpoint được tổ chức theo pattern:

1. **Tiêu đề** (H2/H3)
2. **API badge** (POST/GET + URL)
3. **Parameters**:
   - Header (Authorization)
   - Body/Request (bảng tham số)
   - JSON example
4. **Response**:
   - Bảng trường dữ liệu
   - JSON example

### Response format chuẩn

```json
{
  "status": 1,
  "error": 0,
  "message": "success",
  "data": "..."
}
```

---

## 7. Custom Theme & Styling

- **Brand color**: `#19b24f` (xanh lá VBot)
- **Font chính**: `Be Vietnam Pro` (Google Fonts)
- **API badge**: Nền xanh `#21a366`, viền `#808080`, có animation scale on click
- **Highlight text**: Màu `#22c55e`
- **Note block**: Border-left xanh dương `#2e92cc`, italic
- **Hero glow**: Gradient 45° `#309c56` → `#1865BD`, blur 44–100px

---

## 8. Cấu hình Sidebar (Navigation)

Sidebar được định nghĩa trong `.vitepress/config.mts`, gồm 4 section:

1. **Open API** — 9 items (collapsed: false)
2. **Web** — 3 items
3. **Android SDK** — 4 items
4. **iOS SDK** — 3 items

Mỗi section có `collapsed: false` (luôn mở).

---

## 9. Deploy & CI/CD

- **Base URL**: `/vbot-documentation/` (GitHub Pages)
- **Favicon**: `/vbot-documentation/app-logo.png`
- **CI/CD**: GitHub Actions workflow trong `.github/workflows/`

---

## 10. Lưu ý khi chỉnh sửa

1. **Thêm trang mới** → Cập nhật sidebar trong `.vitepress/config.mts`
2. **Thêm ảnh** → Đặt trong `public/` với thư mục con tương ứng
3. **Custom CSS class** → Thêm vào `.vitepress/theme/style.css`
4. **Không dùng** `api-examples.md` và `markdown-examples.md` — đây là file mẫu VitePress mặc định, có thể xoá
5. **Search**: Sử dụng VitePress local search, đã Việt hoá đầy đủ
