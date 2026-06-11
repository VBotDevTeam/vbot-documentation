---
outline: deep
---

# Lịch sử cuộc gọi

API quản lý lịch sử cuộc gọi.

## Lấy danh sách lịch sử cuộc gọi

<div class="api-container">
  <span class="api-method method-get">GET</span>
  <span>[URL]/api/crm/historycall/getAll?phone={phone}&page={page}&size={size}</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-KEY | `token-open-api` |

**Tham số**

| Tham số | Kiểu   | Mô tả                 |
| ------- | ------ | --------------------- |
| phone   | String | Số điện thoại         |
| page    | Int    | Số trang              |
| size    | Int    | Số lượng trên 1 trang |

**Response**

| Tham số | Kiểu   | Mô tả                                  |
| ------- | ------ | -------------------------------------- |
| error   | Int    | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message | String | Thông tin                              |
| data    | Object | Danh sách lịch sử cuộc gọi             |

**Giá trị `disposition`**

| Giá trị         | Mô tả                  |
| --------------- | ---------------------- |
| misscall        | Cuộc gọi nhỡ           |
| answer          | Nghe máy               |
| busy            | Máy bận                |
| noanswer        | Không trả lời          |
| cancel          | Cuộc gọi bị hủy        |
| congestion      | Lỗi mạng               |
| chanunavail     | Không liên lạc được    |
| dontcall        | Người nhận từ chối     |
| torture         | Lỗi mạng               |
| invalidargs     | Tham số không hợp lệ   |
| someoneanswered | Người khác đã nghe máy |
| logout          | Đã đăng xuất           |
| botivr          | CallBot                |
| more            | Không trả lời          |

**Ví dụ response**

```json
{
  "error": 0,
  "message": "success",
  "data": [
    {
      "hotline_number": "sample string 1",
      "date_create": "02/27/2026 14:33:47",
      "caller": [
        {
          "phone": "sample string 1",
          "date_create": "02/27/2026 14:33:47",
          "disposition": "sample string 4",
          "time_call": "sample string 5",
          "postage": 6.1,
          "duration_call": 7,
          "source": "sample string 8",
          "member_no": "sample string 9"
        }
      ],
      "callee": [
        {
          "phone": "sample string 1",
          "date_create": "02/27/2026 14:33:47",
          "disposition": "sample string 4",
          "time_call": "sample string 5",
          "postage": 6.1,
          "duration_call": 7,
          "source": "sample string 8",
          "member_no": "sample string 9"
        }
      ],
      "time_call": "sample string 3",
      "duration_call": "sample string 4",
      "type_call": "sample string 5",
      "group_id": "sample string 6",
      "disposition": "sample string 7",
      "record_file": ["sample string 1", "sample string 2"],
      "external_call_id": "sample string 8"
    }
  ]
}
```

---

## Lấy danh sách lịch sử cuộc gọi theo khoảng thời gian

<div class="api-container">
  <span class="api-method method-get">GET</span>
  <span>[URL]/api/crm/historycall/getAll?from={from}&to={to}&phone={phone}&page={page}&size={size}</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-KEY | `token-open-api` |

**Tham số**

| Tham số | Kiểu   | Mô tả                 |
| ------- | ------ | --------------------- |
| from    | Int    | Từ ngày               |
| to      | Int    | Đến ngày              |
| phone   | String | Số điện thoại         |
| page    | Int    | Số trang              |
| size    | Int    | Số lượng trên 1 trang |

**Response**

| Tham số | Kiểu   | Mô tả                                  |
| ------- | ------ | -------------------------------------- |
| error   | Int    | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message | String | Thông tin                              |

**Giá trị `disposition`**

| Giá trị         | Mô tả                  |
| --------------- | ---------------------- |
| misscall        | Cuộc gọi nhỡ           |
| answer          | Nghe máy               |
| busy            | Máy bận                |
| noanswer        | Không trả lời          |
| cancel          | Cuộc gọi bị hủy        |
| congestion      | Lỗi mạng               |
| chanunavail     | Không liên lạc được    |
| dontcall        | Người nhận từ chối     |
| torture         | Lỗi mạng               |
| invalidargs     | Tham số không hợp lệ   |
| someoneanswered | Người khác đã nghe máy |
| logout          | Đã đăng xuất           |
| botivr          | CallBot                |
| more            | Không trả lời          |

**Ví dụ response**

```json
{
  "error": 0,
  "message": "success",
  "data": [
    {
      "hotline_number": "sample string 1",
      "date_create": "02/27/2026 14:33:47",
      "caller": [
        {
          "phone": "sample string 1",
          "date_create": "02/27/2026 14:33:47",
          "disposition": "sample string 4",
          "time_call": "sample string 5",
          "postage": 6.1,
          "duration_call": 7,
          "source": "sample string 8",
          "member_no": "sample string 9"
        }
      ],
      "callee": [
        {
          "phone": "sample string 1",
          "date_create": "02/27/2026 14:33:47",
          "disposition": "sample string 4",
          "time_call": "sample string 5",
          "postage": 6.1,
          "duration_call": 7,
          "source": "sample string 8",
          "member_no": "sample string 9"
        }
      ],
      "time_call": "sample string 3",
      "duration_call": "sample string 4",
      "type_call": "sample string 5",
      "group_id": "sample string 6",
      "disposition": "sample string 7",
      "record_file": ["sample string 1", "sample string 2"],
      "external_call_id": "sample string 8"
    }
  ]
}
```

---

## Lấy số lượng cuộc gọi

<div class="api-container">
  <span class="api-method method-get">GET</span>
  <span>[URL]/api/crm/historycall/countAll?phone={phone}</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-KEY | `token-open-api` |

**Tham số**

| Tham số | Kiểu   | Mô tả         |
| ------- | ------ | ------------- |
| phone   | String | Số điện thoại |

**Response**

| Tham số | Kiểu   | Mô tả                                  |
| ------- | ------ | -------------------------------------- |
| error   | Int    | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message | String | Thông tin                              |
| data    | Int    | Dữ liệu trả về                         |

**Ví dụ response**

```json
{
  "error": 2,
  "message": "sample string 3",
  "data": 4
}
```

---

## Lấy số lượng cuộc gọi theo khoảng thời gian

<div class="api-container">
  <span class="api-method method-get">GET</span>
  <span>[URL]/api/crm/historycall/countAll?from={from}&to={to}&phone={phone}</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-KEY | `token-open-api` |

**Tham số**

| Tham số | Kiểu   | Mô tả         |
| ------- | ------ | ------------- |
| from    | Int    | Từ ngày       |
| to      | Int    | Đến ngày      |
| phone   | String | Số điện thoại |

**Response**

| Tham số | Kiểu   | Mô tả                                  |
| ------- | ------ | -------------------------------------- |
| error   | Int    | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message | String | Thông tin                              |
| data    | Int    | Dữ liệu trả về                         |

**Ví dụ response**

```json
{
  "error": 2,
  "message": "sample string 3",
  "data": 4
}
```

---

## Lấy file ghi âm cuộc gọi

<div class="api-container">
  <span class="api-method method-get">GET</span>
  <span>[URL]/api/crm/historycall/record/{trans_id}</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-KEY | `token-open-api` |

**Tham số**

| Tham số  | Kiểu   | Mô tả        |
| -------- | ------ | ------------ |
| trans_id | String | Mã giao dịch |

**Response**

---
