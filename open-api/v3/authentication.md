---
outline: deep
---

# Xác thực

VBot Open API v3.0 thực hiện xác thực thông qua API Key, bạn chỉ cần lấy `token-open-api` từ hệ thống và truyền vào Header của mọi request.

## Cấu hình Header

| Key           | Value            |
| ------------- | ---------------- |
| **X-API-KEY** | `token-open-api` |

## Hướng dẫn lấy API Key

**Bước 1:** Đăng nhập vào trang VBot Console

**Bước 2:** Truy cập vào menu **Cài đặt nhóm** -> **Api Key**

**Bước 3:** Chọn **Thêm mới**, nhập tên API Key và bấm **Tạo**

**Bước 4:** Sao chép API Key

API Key này được dùng để xác thực cho Open API V3

![Open API Key](/open-api-key.png)
