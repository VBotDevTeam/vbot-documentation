# Giới thiệu

VBot Open API cung cấp các endpoint cho phép tích hợp hệ thống bên thứ ba với nền tảng VBot — bao gồm quản lý khách hàng, thành viên, hotline, lịch sử cuộc gọi và gọi tự động.

## Thông tin chung

| Thuộc tính         | Giá trị                         |
| ------------------ | ------------------------------- |
| **Base URL**       | `https://open-api.vbot.vn/v2.0` |
| **Content-Type**   | `application/json`              |
| **Authentication** | Bearer Token                    |

## Phạm vi tài liệu

Tài liệu mô tả chi tiết quy trình và chức năng nghiệp vụ cho các nhóm API sau:

| Nhóm               | Mô tả                                                                                           |
| ------------------ | ----------------------------------------------------------------------------------------------- |
| Quản lý khách hàng | Thêm, sửa, xóa khách hàng và các thông tin liên quan (trạng thái, kiểu, nhóm, trường tùy chỉnh) |
| Quản lý thành viên | Quản lý thành viên, tài khoản SDK và SIP                                                        |
| Nhóm & Hotline     | Quản lý nhóm thành viên và hotline                                                              |
| Lịch sử cuộc gọi   | Tra cứu lịch sử cuộc gọi, file ghi âm                                                           |
| Gọi tự động        | Chiến dịch gọi, gọi xác nhận, lịch sử gọi campaign, trường tùy chỉnh, template kịch bản         |
| SDK                | Token, log, thông tin cuộc gọi, lịch sử gọi SDK                                                 |
| Khác               | Thống kê dự án, OneSME, Webhook SMS                                                             |

## Danh sách mã lỗi

| Mã lỗi | Mô tả                     |
| ------ | ------------------------- |
| -1     | Sai tham số               |
| 0      | Thành công                |
| 401    | Không có quyền truy cập   |
| 403    | Không có quyền thực hiện  |
| 404    | Không tìm thấy tài nguyên |
| 409    | Dữ liệu đã tồn tại        |
| 500    | Lỗi hệ thống              |
