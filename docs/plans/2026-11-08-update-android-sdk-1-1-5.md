# Cập nhật Tài liệu Android SDK lên phiên bản 1.1.5

> **For Antigravity:** REQUIRED SUB-SKILL: Load executing-plans to implement this plan task-by-task.

**Goal:** Cập nhật toàn bộ tài liệu hướng dẫn và changelog của Android SDK trong `vbot-documentation` lên phiên bản mới nhất `1.1.5`, bổ sung 2 mã trạng thái kết thúc cuộc gọi mới (`userNotInGroup` - 2043, `doNotCall` - 2044) và đồng bộ thông tin phiên bản trong `AGENTS.md`.

**Architecture:** Cập nhật phiên bản dependency trong `android-sdk/cau-hinh-sdk.md`, thêm changelog `v1.1.5` vào `android-sdk/changelog.md`, cập nhật bảng enum `VBotEndCallReason` trong `android-sdk/huong-dan-su-dung.md`, cập nhật thông tin tổng quan trong `AGENTS.md`, và chạy build kiểm tra tính hợp lệ bằng `pnpm docs:build`.

**Tech Stack:** Markdown, VitePress 1.6.4, Git.

---

### Task 1: Cập nhật dependency phiên bản 1.1.5 trong `android-sdk/cau-hinh-sdk.md`

**Files:**
- Modify: `android-sdk/cau-hinh-sdk.md:25-29`

**Step 1: Cập nhật dependency version**

Thay thế `1.1.4` thành `1.1.5`:

```groovy
dependencies {
    // Chỉ một dòng duy nhất — mọi thư viện phụ thuộc đã nằm sẵn trong SDK.
    implementation 'com.github.VBotDevTeam:VBotPhoneSDKAndroid-Public:1.1.5'
}
```

**Step 2: Kiểm tra nội dung file**

Kiểm tra lại `android-sdk/cau-hinh-sdk.md` đảm bảo URL maven repository và version `1.1.5` chính xác.

---

### Task 2: Thêm mục changelog cho phiên bản `v1.1.5` trong `android-sdk/changelog.md`

**Files:**
- Modify: `android-sdk/changelog.md:8-10`

**Step 1: Bổ sung changelog v1.1.5 lên đầu danh sách phiên bản**

Chèn mục `## v1.1.5` ngay trên `## v1.1.4`:

```markdown
## v1.1.5

_Ngày phát hành: 27/10/2026_

### Tính năng mới & Cải tiến

- Cải thiện khả năng xử lý và tự động giải phóng cuộc gọi khi kết nối mạng bị gián đoạn hoặc thay đổi.
- Bổ sung các mã trạng thái kết thúc cuộc gọi mới vào `VBotEndCallReason`: `userNotInGroup (2043)` và `doNotCall (2044)`.

::: tip Cập nhật dependency

```groovy
implementation 'com.github.VBotDevTeam:VBotPhoneSDKAndroid-Public:1.1.5'
```

:::
```

---

### Task 3: Bổ sung 2 mã trạng thái mới vào bảng `VBotEndCallReason` trong `android-sdk/huong-dan-su-dung.md`

**Files:**
- Modify: `android-sdk/huong-dan-su-dung.md:215-220` và `android-sdk/huong-dan-su-dung.md:231-242`

**Step 1: Bổ sung vào bảng tổng quát `VBotEndCallReason`**

Thêm `userNotInGroup (2043)` và `doNotCall (2044)` ngay sau `transmissionError (2042)` và trước `unknownError (9996)`:

```markdown
| `transmissionError`            | 2042 | Lỗi đường truyền                                    |
| `userNotInGroup`               | 2043 | Người dùng không thuộc nhóm này                     |
| `doNotCall`                    | 2044 | Người nhận chặn cuộc gọi quảng cáo (Do Not Call)    |
| `unknownError`                 | 9996 | Lỗi chưa xác định                                   |
```

**Step 2: Bổ sung vào bảng trạng thái viễn thông / nhà mạng trả về (nếu phù hợp)**

Trong bảng "Bảng tổng hợp trạng thái do Nhà mạng viễn thông trả về", bổ sung `doNotCall`:

```markdown
| `doNotCall`              | 2044 |     `callee`      | Thuê bao từ chối cuộc gọi quảng cáo / thuộc danh sách DNC (Do Not Call) |
```

---

### Task 4: Cập nhật thông tin phiên bản Android SDK trong `AGENTS.md`

**Files:**
- Modify: `AGENTS.md:120`

**Step 1: Cập nhật thông tin tổng quan Android SDK**

Sửa dòng mô tả Android SDK từ bản cũ sang bản hiện tại:

```markdown
SDK native Android qua Maven tĩnh (`raw.githubusercontent.com`): `VBotPhoneSDKAndroid-Public:1.1.5`
```

---

### Task 5: Kiểm tra và Build kiểm thử dự án

**Step 1: Chạy build VitePress**

Run: `pnpm docs:build`
Expected: `build complete in ...s.` không có lỗi compile hay hỏng liên kết markdown.

**Step 2: Kiểm tra git diff**

Run: `git diff`
Expected: Chỉ thay đổi các file liên quan đến Android SDK 1.1.5.

