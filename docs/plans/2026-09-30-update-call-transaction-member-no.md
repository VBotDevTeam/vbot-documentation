# Cập nhật Tham số `member_no` vào Tài liệu Lịch sử Cuộc gọi và Changelog

> **For Antigravity:** REQUIRED SUB-SKILL: Load executing-plans to implement this plan task-by-task.

**Goal:** Bổ sung tham số lọc `member_no` (Mã thành viên) vào tài liệu API `getAll` và `countAll` thuộc module Lịch sử cuộc gọi v3 (`/m-cdr/`), đồng thời cập nhật trang Changelog v3.

**Architecture:** Chỉnh sửa file Markdown tài liệu `open-api/v3/call-transaction.md` để bổ sung tham số `member_no` vào query URL và bảng tham số của hai API `getAll` và `countAll`. Thêm mục cập nhật ngày 30/09/2026 vào `open-api/v3/changelog.md`. Kiểm tra tính hợp lệ bằng lệnh build VitePress.

**Tech Stack:** Markdown, VitePress 1.6.4, Git.

> [!IMPORTANT]
> **RÀNG BUỘC BẮT BUỘC TỪ USER:** Tuyệt đối không sử dụng từ ngữ liên quan đến `sip`, `SIP`, `Sip` trong toàn bộ nội dung cập nhật (tài liệu API, changelog, commit message, v.v.). Luôn dùng thuật ngữ **"thành viên"** / **"mã thành viên"** (ví dụ: `member_no`).

---

### Task 1: Cập nhật tài liệu API Lịch sử cuộc gọi (`open-api/v3/call-transaction.md`)

**Files:**
- Modify: `open-api/v3/call-transaction.md:15-43` (API `getAll`)
- Modify: `open-api/v3/call-transaction.md:151-179` (API `countAll`)

**Step 1: Bổ sung tham số `member_no` vào API `getAll`**
- Thêm `&member_no={member_no}` vào query URL trong thẻ `<div class="api-container">` (sau `group_member_no={group_member_no}`).
- Thêm một dòng vào bảng **Tham số** sau dòng `group_member_no`:
  ```markdown
  | member_no       | String |          | Mã thành viên (ví dụ: `1001`)                                                                      |
  ```

**Step 2: Bổ sung tham số `member_no` vào API `countAll`**
- Thêm `&member_no={member_no}` vào query URL trong thẻ `<div class="api-container">` (sau `group_member_no={group_member_no}`).
- Thêm một dòng vào bảng **Tham số** sau dòng `group_member_no`:
  ```markdown
  | member_no       | String |          | Mã thành viên (ví dụ: `1001`)                                                                      |
  ```

**Step 3: Commit thay đổi cho `call-transaction.md`**
```bash
git add open-api/v3/call-transaction.md
git commit -m "docs: add member_no query parameter to call transaction getAll and countAll APIs"
```

---

### Task 2: Cập nhật trang Changelog v3 (`open-api/v3/changelog.md`)

**Files:**
- Modify: `open-api/v3/changelog.md:9-25`

**Step 1: Cập nhật phần thông báo quan trọng `::: warning Cập nhật quan trọng`**
Thêm mục ngày 30/09/2026 lên đầu danh sách:
```markdown
- **[30/09/2026]** Cập nhật API Lịch sử cuộc gọi: Bổ sung tham số lọc theo mã thành viên (`member_no`) cho API `GET /m-cdr/api/call/get-all` và `GET /m-cdr/api/call/count-all`.
```

**Step 2: Thêm mục chi tiết ngày 30/09/2026**
Thêm phần nội dung phía trước mục `## 24/09/2026`:
```markdown
## 30/09/2026

### Cập nhật tham số lọc cho API Lịch sử cuộc gọi (/m-cdr/)

Bổ sung tham số truy vấn `member_no` (Mã thành viên) cho các API tra cứu lịch sử cuộc gọi trong module `/m-cdr/`:

- `GET /m-cdr/api/call/get-all`: Bổ sung tham số `member_no` vào query string cho phép lọc danh sách lịch sử cuộc gọi theo thành viên cụ thể.
- `GET /m-cdr/api/call/count-all`: Bổ sung tham số `member_no` vào query string cho phép đếm tổng số lượng cuộc gọi theo thành viên cụ thể.
```

**Step 3: Commit thay đổi cho `changelog.md`**
```bash
git add open-api/v3/changelog.md
git commit -m "docs: add changelog entry for member_no parameter update on 2026-09-30"
```

---

### Task 3: Xác thực bản build VitePress

**Files:**
- Test verification

**Step 1: Chạy build tài liệu**
Run: `pnpm docs:build`
Expected output: VitePress build thành công (`build complete in ...`) không có lỗi cú pháp hoặc đứt gãy liên kết.

**Step 2: Commit file plan hoàn tất (nếu cần lưu trong repo)**
```bash
git add docs/plans/2026-09-30-update-call-transaction-member-no.md
git commit -m "docs: add implementation plan for member_no documentation update"
```
