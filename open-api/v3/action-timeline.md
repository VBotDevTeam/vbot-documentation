---
outline: deep
---

# Lịch sử tương tác

Xem lịch sử các hoạt động liên quan đến một khách hàng (cuộc gọi, cập nhật thông tin, ghi chú...).

## Loại tương tác

Mỗi sự kiện có 2 trường phân loại:

| Trường   | Mô tả                 |
| -------- | --------------------- |
| type     | Loại sự kiện nhóm cha |
| type_sub | Loại sự kiện chi tiết |

**Bảng giá trị:**

| type           | type_sub                 | Mô tả                         |
| -------------- | ------------------------ | ----------------------------- |
| `CUSTOMER`     | `CUSTOMER_CREATE`        | Tạo khách hàng                |
|                | `CUSTOMER_UPDATE`        | Cập nhật thông tin khách hàng |
| `NOTE`         | `NOTE_INSERT`            | Tạo ghi chú                   |
|                | `NOTE_UPDATE`            | Sửa ghi chú                   |
|                | `NOTE_DELETE`            | Xóa ghi chú                   |
| `HISTORY_CALL` | `HISTORY_CALL_IN`        | Cuộc gọi đến                  |
|                | `HISTORY_CALL_OUT`       | Cuộc gọi đi                   |
|                | `HISTORY_MISS_CALL`      | Cuộc gọi nhỡ                  |
| `TICKET`       | `NEW_TICKET`             | Tạo mới ticket                |
|                | `REOPEN_TICKET`          | Mở lại ticket                 |
|                | `UPDATE_STATUS_TICKET`   | Cập nhật trạng thái           |
|                | `UPDATE_ASSIGNEE_TICKET` | Thay đổi người được giao      |
| `TODO`         | `NEW_TODO`               | Tạo mới todo                  |
|                | `REOPEN_TODO`            | Mở lại todo                   |
|                | `UPDATE_STATUS_TODO`     | Cập nhật trạng thái           |
|                | `UPDATE_ASSIGNEE_TODO`   | Thay đổi người được giao      |

## Danh sách tương tác

<div class="api-container">
  <span class="api-method">GET</span>
  <span>[URL]/api/ActionTimeline/get-all</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Tham số**

| Tham số       | Kiểu   | Bắt buộc | Mô tả                                                                    |
| ------------- | ------ | -------- | ------------------------------------------------------------------------ |
| customer_code | String | Có       | Mã khách hàng                                                            |
| type          | String | Không    | Lọc theo loại. [Xem bảng trên](#loai-tuong-tac). Mặc định `ALL` = tất cả |
| from          | Long   | Không    | Lọc từ ngày (Unix timestamp - ms). `-1` = không áp dụng                  |
| to            | Long   | Không    | Lọc đến ngày (Unix timestamp - ms). `-1` = không áp dụng                 |
| page          | Int    | Không    | Số trang                                                                 |
| size          | Int    | Không    | Số lượng trên 1 trang                                                    |

> Kết quả sắp xếp theo thời gian **mới nhất trước**.

**Lọc theo `type`:**

- Truyền giá trị `CUSTOMER`, `NOTE`, `HISTORY_CALL`, `TICKET`, hoặc `TODO` → lấy tất cả sự kiện trong nhóm đó
- Không truyền hoặc truyền `ALL` → lấy tất cả

**Response**

| Tham số | Kiểu         | Mô tả                                  |
| ------- | ------------ | -------------------------------------- |
| error   | Int          | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message | String       | Thông tin                              |
| data    | List[Object] | Danh sách tương tác                    |

**Ví dụ response**

```json
{
  "error": 0,
  "message": "success",
  "data": [
    {
      "create_at": 1718100000000,
      "member_no": "MEM01",
      "type": "CUSTOMER",
      "type_sub": "CUSTOMER_UPDATE",
      "content": "Cập nhật thông tin khách hàng",
      "customer_code": "KH001"
    },
    {
      "create_at": 1718050000000,
      "member_no": "MEM02",
      "type": "HISTORY_CALL",
      "type_sub": "HISTORY_CALL_IN",
      "content": "",
      "customer_code": "KH001"
    }
  ]
}
```

**Cấu trúc phần tử trong `data`**

| Tham số       | Kiểu   | Mô tả                                   |
| ------------- | ------ | --------------------------------------- |
| create_at     | Long   | Thời gian sự kiện (Unix timestamp - ms) |
| member_no     | String | Mã thành viên                           |
| type          | String | Loại sự kiện nhóm cha                   |
| type_sub      | String | Loại sự kiện chi tiết                   |
| content       | String | Mô tả hành động                         |
| customer_code | String | Mã khách hàng                           |

---

## Đếm số lượng tương tác

<div class="api-container">
  <span class="api-method">GET</span>
  <span>[URL]/api/ActionTimeline/count-all</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Tham số**

| Tham số       | Kiểu   | Bắt buộc | Mô tả                                                                    |
| ------------- | ------ | -------- | ------------------------------------------------------------------------ |
| customer_code | String | Có       | Mã khách hàng                                                            |
| type          | String | Không    | Lọc theo loại. [Xem bảng trên](#loai-tuong-tac). Mặc định `ALL` = tất cả |
| from          | Long   | Không    | Lọc từ ngày (Unix timestamp - ms). `-1` = không tìm kiếm                 |
| to            | Long   | Không    | Lọc đến ngày (Unix timestamp - ms). `-1` = không tìm kiếm                |

**Response**

| Tham số | Kiểu   | Mô tả                                  |
| ------- | ------ | -------------------------------------- |
| error   | Int    | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message | String | Thông tin                              |
| data    | Int    | Số lượng                               |

**Ví dụ response**

```json
{
  "error": 0,
  "message": "success",
  "data": 42
}
```
