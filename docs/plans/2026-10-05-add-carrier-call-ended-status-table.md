# Bổ sung Bảng Tổng hợp Trạng thái Cuộc gọi do Nhà mạng Viễn thông Trả về

> **For Antigravity:** REQUIRED SUB-SKILL: Load executing-plans to implement this plan task-by-task.

**Goal:** Bổ sung bảng tổng hợp chi tiết các trạng thái kết thúc cuộc gọi thực tế do Nhà mạng viễn thông trả về (SIP code, mã SDK, reason enum, endedBy, tình huống thực tế) vào mục `VBotEndCallReason` trong tài liệu hướng dẫn sử dụng của cả Android SDK và iOS SDK, giữ nguyên bảng mã lỗi hiện hữu.

**Architecture:** Bổ sung tiểu mục `#### Bảng tổng hợp trạng thái do Nhà mạng viễn thông trả về (Khi gọi ra Số điện thoại)` ngay dưới bảng mã và ví dụ code của `VBotEndCallReason` trong `android-sdk/huong-dan-su-dung.md` và `ios-sdk/huong-dan-su-dung.md`. Đồng thời dọn dẹp bảng `SIP | endedBy` bị trùng đặt nhầm chỗ tại mục `Connect SDK` trong `ios-sdk/huong-dan-su-dung.md`. Kiểm tra tính hợp lệ bằng lệnh build VitePress.

**Tech Stack:** Markdown, VitePress 1.6.4, Git.

---

### Task 1: Cập nhật tài liệu Android SDK (`android-sdk/huong-dan-su-dung.md`)

**Files:**
- Modify: `android-sdk/huong-dan-su-dung.md:213-221`

**Step 1: Thêm bảng trạng thái nhà mạng trả về**
Thêm phần nội dung bảng nhà mạng ngay sau bảng `SIP | endedBy` (dưới code ví dụ `onCallEnded`):

```markdown
#### Bảng tổng hợp trạng thái do Nhà mạng viễn thông trả về (Khi gọi ra Số điện thoại)

Tài liệu của SDK liệt kê chung toàn bộ các trạng thái kết thúc cuộc gọi (bao gồm: lỗi thiết bị cục bộ, lỗi xác thực server VBot, gọi App-to-App nội bộ VoIP và gọi ra số điện thoại qua nhà mạng viễn thông).

Dưới đây là thống kê chi tiết các trạng thái thực tế mà nhà mạng viễn thông và VBot sẽ trả về khi bạn thực hiện cuộc gọi ra số điện thoại di động/cố định:

| SIP Code | Mã SDK | Reason Enum | endedBy | Tình huống thực tế từ Nhà mạng |
| :---: | :---: | :--- | :---: | :--- |
| `404` | `2024` | `destinationNotFound` (`destination_not_found`) | `carrier` | Số điện thoại không tồn tại / Sai số (Tổng đài phát âm: "Số máy quý khách vừa gọi không đúng..."). |
| `410` | `2037` | `destinationGone` (`destination_gone`) | `carrier` | Thuê bao đã bị hủy / thu hồi khỏi mạng di động. |
| `480` | `2014` | `temporarilyUnavailable` (`temporarily_unavailable`) | `carrier` | Thuê bao tạm thời không liên lạc được (Tắt máy, hết pin, ngoài vùng phủ sóng / không có sóng di động). |
| `502` | `2028` | `transmissionError` (`transmission_error`) | `carrier` | Lỗi đường truyền nhà mạng (Nghẽn mạng viễn thông, SIP Trunk/E1 gateway của nhà mạng gặp sự cố). |
| `486` | `1001` | `busy` (`busy`) | `callee` | Máy bận: Người nghe đang có cuộc gọi khác (chưa bật chờ cuộc gọi), hoặc bấm từ chối nhanh trên màn hình điện thoại (báo tút tút). |
| `603` | `2013` | `decline` (`decline`) | `callee` | Từ chối cuộc gọi: Người nhận bấm gạt từ chối cuộc gọi. |
| `411` | `2038` | `recipientAbsent` (`recipient_absent`) | `callee` | Không nghe máy: Đổ chuông hết thời gian quy định (thường 45s - 60s) nhưng không có người nhấc máy. |
| `403` | `2032` | `recipientBlocksCalls` (`recipient_blocks_calls`) | `callee` | Bị chặn cuộc gọi: Số gọi đi nằm trong danh sách chặn (Blacklist) của thuê bao nhận hoặc bị chặn bởi nhà mạng. |
| `200 → BYE` | `1000` | `normaly` (`normal`) | `caller`/`callee` | Cuộc gọi đã kết nối thành công, đàm thoại và kết thúc bình thường. |
```

---

### Task 2: Cập nhật tài liệu iOS SDK (`ios-sdk/huong-dan-su-dung.md`)

**Files:**
- Modify: `ios-sdk/huong-dan-su-dung.md:181-188` (Xóa bảng SIP đặt nhầm chỗ ở Connect SDK)
- Modify: `ios-sdk/huong-dan-su-dung.md:396-414` (Thêm bảng tổng hợp trạng thái nhà mạng trả về)

**Step 1: Xóa bảng `SIP | endedBy` đặt nhầm chỗ tại dòng 181-188**
Bảng này vốn thuộc ngữ cảnh của `callEnded`, việc xuất hiện ngay dưới `Connect SDK` là nhầm lẫn.

**Step 2: Thêm bảng trạng thái nhà mạng trả về dưới mục `VBotEndCallReason`**
Thêm nội dung bảng nhà mạng trả về tương tự như Android SDK.

---

### Task 3: Xác thực bản build VitePress

**Files:**
- Test verification

**Step 1: Chạy build tài liệu**
Run: `pnpm docs:build`
Expected output: VitePress build hoàn tất thành công (`build complete in ...`) không có lỗi.
