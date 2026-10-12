# Kế Hoạch Cập Nhật Tài Liệu VBot Web SDK (v1.0.12)

> **For Antigravity:** REQUIRED SUB-SKILL: Load executing-plans to implement this plan task-by-task.

**Goal:** Cập nhật toàn diện tài liệu VBot Web SDK trên `vbot-documentation` (`web/web-sdk.md` và `web/changelog.md`) phản ánh chính xác phiên bản `1.0.12`: chuẩn hóa vòng đời sự kiện cuộc gọi (`onCallFailed` trước `onCallEnded`), mở rộng `CallData` (`code`, `endReason`, `endedBy`, `status`), bảng tra cứu 28 mã lý do chuẩn VBot, bổ sung tài liệu chi tiết cho chế độ Giao diện dựng sẵn (Built-in UI) và cập nhật phiên bản CDN.

**Architecture & Strategy:**
- File `web/web-sdk.md`:
  - Cập nhật số phiên bản CDN từ `1.0.11` lên `1.0.12`.
  - Bổ sung mục chuyên biệt **"Chế độ Giao diện dựng sẵn (Built-in UI Mode)"** làm nổi bật cách cấu hình và điều khiển UI sẵn có (so sánh trực quan với Headless Mode).
  - Cập nhật mục **"4. Lắng nghe Sự kiện"**: cập nhật payload `vbot:onCallFailed` thành `{ error: string, callData: CallData }`, nhấn mạnh quy chuẩn thứ tự sự kiện `vbot:onCallFailed` luôn phát trước `vbot:onCallEnded`.
  - Cập nhật mục **"Cấu trúc đối tượng CallData"**: bổ sung các trường mới (`code`, `endReason`, `endedBy`, `status`, `errorMessage`).
  - Thêm bảng tra cứu chi tiết **"Bảng mã lý do kết thúc cuộc gọi chuẩn hóa (VBotEndCallReasonKey & VBotCallEndParty)"** đồng bộ với hệ sinh thái iOS/Android SDK.
- File `web/changelog.md`:
  - Thêm mục `## v1.0.12` ghi nhận các tính năng mới và cải tiến.
- Kiểm thử:
  - Chạy `pnpm docs:build` để xác nhận không có lỗi cú pháp Markdown hay broken links.

**Tech Stack:** Markdown, VitePress 1.6.4.

---

### Task 1: Cập nhật CDN & Hướng dẫn Chế độ Giao diện Dựng sẵn (`web/web-sdk.md`)

**Files:**
- Modify: `web/web-sdk.md` (Phần đầu & Cấu hình Widget)

- [x] **Step 1: Cập nhật các đường dẫn CDN sang v1.0.12**
  - Đổi các URL `https://cdn.vbot.vn/vbot-sdk/1.0.11/...` thành `https://cdn.vbot.vn/vbot-sdk/1.0.12/...`.

- [x] **Step 2: Thêm tiểu mục hướng dẫn "Chế độ Giao diện Dựng sẵn (Built-in UI Mode)"**
  - Trình bày rõ: Mặc định `<vbot-widget>` hoạt động ở chế độ Built-in UI đã bao gồm: Bàn phím số (`dialpad`), Màn hình cuộc gọi đến (`incoming`), Màn hình đàm thoại (`calling`), Bong bóng nổi thu nhỏ (`floating bubble`) và Thông báo (`toast`).
  - Hướng dẫn các phương thức runtime điều khiển UI:
    - `widget.showCallUI()` / `widget.dismissCallUI()`
    - `widget.openDialpad()` / `widget.closeDialpad()`
  - Bảng so sánh nhanh: Khi nào dùng Built-in UI vs Khi nào dùng Headless Mode.

---

### Task 2: Cập nhật Sự kiện & Cấu trúc `CallData` Chuẩn Hóa (`web/web-sdk.md`)

**Files:**
- Modify: `web/web-sdk.md` (Mục 4. Lắng nghe Sự kiện)

- [x] **Step 1: Cập nhật bảng sự kiện**
  - Cập nhật payload của `vbot:onCallFailed`: `{ error: string, callData: CallData }`.
  - Ghi chú quy tắc thứ tự: Khi cuộc gọi lỗi, `vbot:onCallFailed` luôn phát **TRƯỚC**, `vbot:onCallEnded` phát **SAU** khi chuyển về `idle`.

- [x] **Step 2: Cập nhật bảng thuộc tính `CallData`**
  - Bổ sung:
    - `status`: Trạng thái cuối của cuộc gọi (`'dialing'`, `'ringing'`, `'in-call'`, `'ended'`, `'failed'`).
    - `endReason`: Mã lý do kết thúc cuộc gọi chuẩn hóa (`VBotEndCallReasonKey`).
    - `endedBy`: Phía kết thúc cuộc gọi (`'caller'`, `'callee'`, `'server'`, `'carrier'`, `'system'`, `'unknown'`).
    - `code`: Mã phản hồi SIP/HTTP (`200`, `486`, `408`, `402`,...).
    - `errorMessage`: Chuỗi thông báo lỗi chi tiết.

- [x] **Step 3: Bổ sung Bảng tra cứu `VBotEndCallReasonKey` & `VBotCallEndParty`**
  - Liệt kê đầy đủ 28 lý do kết thúc chuẩn hóa của hệ sinh thái VBot kèm SIP code và ý nghĩa thực tế.

---

### Task 3: Bổ sung Bản phát hành `v1.0.12` vào `web/changelog.md`

**Files:**
- Modify: `web/changelog.md`

- [x] **Step 1: Thêm section `## v1.0.12` ở đầu trang Changelog**
  - Ghi rõ ngày phát hành (`10/10/2026`).
  - Liệt kê các cải tiến:
    - Chuẩn hóa vòng đời sự kiện: `vbot:onCallFailed` phát trước `vbot:onCallEnded`.
    - Mở rộng `CallData` với `code`, `endReason`, `endedBy`, `status`, `errorMessage`.
    - Đồng bộ mã lý do kết thúc cuộc gọi với hệ sinh thái VBot.
    - Cập nhật CDN link cho `1.0.12`.

---

### Task 4: Kiểm thử và Xác thực Bản build VitePress

**Files:**
- Run test: `pnpm docs:build`

- [x] **Step 1: Chạy build tài liệu**
  - Thực thi: `pnpm docs:build` tại thư mục `vbot-documentation`.
  - Xác nhận output `build complete` thành công không có lỗi.
