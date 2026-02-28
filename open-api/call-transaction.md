---
outline: deep
---

# Lịch sử cuộc gọi

API quản lý lịch sử cuộc gọi.

## Lấy danh sách lịch sử cuộc gọi

<div class="api-container">
  <span class="api-method method-get">GET</span>
  <span>[URL]/api/crm/historycall/getAll?vbot_id={vbot_id}&project_code={project_code}&phone={phone}&page={page}&size={size}</span>
</div>

**Header**

| Tham số | Giá trị |
|---|---|
| Authorization | Bearer `access_token` |

**Tham số**

| Tham số | Kiểu | Mô tả |
|---|---|---|
| vbot_id | String | VBotID khách hàng |
| project_code | String | Mã nhóm |
| phone | String | Số điện thoại |
| page | Int | Số trang |
| size | Int | Số lượng trên 1 trang |

**Response**

| Tham số | Kiểu | Mô tả |
|---|---|---|
| status | Int | Mã trạng thái (1: Thành công, 0: Thất bại) |
| error | Int | Mã lỗi |
| message | String | Thông tin |

**Ví dụ response**

```json
{
  "status": 1,
  "error": 2,
  "message": "sample string 3",
  "data": [
    {
      "hotline_number": "sample string 1",
      "date_create": "02/27/2026 14:33:47",
      "caller": [
        {
          "phone": "sample string 1",
          "vbot_id": "sample string 2",
          "date_create": "02/27/2026 14:33:47",
          "disposition": "sample string 4",
          "time_call": "sample string 5",
          "postage": 6.1,
          "duration_call": 7,
          "source": "sample string 8",
          "member_no": "sample string 9"
        },
        {
          "phone": "sample string 1",
          "vbot_id": "sample string 2",
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
          "vbot_id": "sample string 2",
          "date_create": "02/27/2026 14:33:47",
          "disposition": "sample string 4",
          "time_call": "sample string 5",
          "postage": 6.1,
          "duration_call": 7,
          "source": "sample string 8",
          "member_no": "sample string 9"
        },
        {
          "phone": "sample string 1",
          "vbot_id": "sample string 2",
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
      "record_file": [
        "sample string 1",
        "sample string 2"
      ]
    },
    {
      "hotline_number": "sample string 1",
      "date_create": "02/27/2026 14:33:47",
      "caller": [
        {
          "phone": "sample string 1",
          "vbot_id": "sample string 2",
          "date_create": "02/27/2026 14:33:47",
          "disposition": "sample string 4",
          "time_call": "sample string 5",
          "postage": 6.1,
          "duration_call": 7,
          "source": "sample string 8",
          "member_no": "sample string 9"
        },
        {
          "phone": "sample string 1",
          "vbot_id": "sample string 2",
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
          "vbot_id": "sample string 2",
          "date_create": "02/27/2026 14:33:47",
          "disposition": "sample string 4",
          "time_call": "sample string 5",
          "postage": 6.1,
          "duration_call": 7,
          "source": "sample string 8",
          "member_no": "sample string 9"
        },
        {
          "phone": "sample string 1",
          "vbot_id": "sample string 2",
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
      "record_file": [
        "sample string 1",
        "sample string 2"
      ]
    }
  ]
}
```

---

## Lấy danh sách lịch sử cuộc gọi

<div class="api-container">
  <span class="api-method method-get">GET</span>
  <span>[URL]/api/crm/historycall/getAll?vbot_id={vbot_id}&project_code={project_code}&from={from}&to={to}&phone={phone}&page={page}&size={size}</span>
</div>

**Header**

| Tham số | Giá trị |
|---|---|
| Authorization | Bearer `access_token` |

**Tham số**

| Tham số | Kiểu | Mô tả |
|---|---|---|
| vbot_id | String | VBotID khách hàng |
| project_code | String | Mã nhóm |
| from | Int | Từ ngày |
| to | Int | Đến ngày |
| phone | String | Số điện thoại |
| page | Int | Số trang |
| size | Int | Số lượng trên 1 trang |

**Response**

| Tham số | Kiểu | Mô tả |
|---|---|---|
| status | Int | Mã trạng thái (1: Thành công, 0: Thất bại) |
| error | Int | Mã lỗi |
| message | String | Thông tin |

**Ví dụ response**

```json
{
  "status": 1,
  "error": 2,
  "message": "sample string 3",
  "data": [
    {
      "hotline_number": "sample string 1",
      "date_create": "02/27/2026 14:33:47",
      "caller": [
        {
          "phone": "sample string 1",
          "vbot_id": "sample string 2",
          "date_create": "02/27/2026 14:33:47",
          "disposition": "sample string 4",
          "time_call": "sample string 5",
          "postage": 6.1,
          "duration_call": 7,
          "source": "sample string 8",
          "member_no": "sample string 9"
        },
        {
          "phone": "sample string 1",
          "vbot_id": "sample string 2",
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
          "vbot_id": "sample string 2",
          "date_create": "02/27/2026 14:33:47",
          "disposition": "sample string 4",
          "time_call": "sample string 5",
          "postage": 6.1,
          "duration_call": 7,
          "source": "sample string 8",
          "member_no": "sample string 9"
        },
        {
          "phone": "sample string 1",
          "vbot_id": "sample string 2",
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
      "record_file": [
        "sample string 1",
        "sample string 2"
      ]
    },
    {
      "hotline_number": "sample string 1",
      "date_create": "02/27/2026 14:33:47",
      "caller": [
        {
          "phone": "sample string 1",
          "vbot_id": "sample string 2",
          "date_create": "02/27/2026 14:33:47",
          "disposition": "sample string 4",
          "time_call": "sample string 5",
          "postage": 6.1,
          "duration_call": 7,
          "source": "sample string 8",
          "member_no": "sample string 9"
        },
        {
          "phone": "sample string 1",
          "vbot_id": "sample string 2",
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
          "vbot_id": "sample string 2",
          "date_create": "02/27/2026 14:33:47",
          "disposition": "sample string 4",
          "time_call": "sample string 5",
          "postage": 6.1,
          "duration_call": 7,
          "source": "sample string 8",
          "member_no": "sample string 9"
        },
        {
          "phone": "sample string 1",
          "vbot_id": "sample string 2",
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
      "record_file": [
        "sample string 1",
        "sample string 2"
      ]
    }
  ]
}
```

---

## Lấy số lượng cuộc gọi

<div class="api-container">
  <span class="api-method method-get">GET</span>
  <span>[URL]/api/crm/historycall/countAll?vbot_id={vbot_id}&project_code={project_code}&phone={phone}</span>
</div>

**Header**

| Tham số | Giá trị |
|---|---|
| Authorization | Bearer `access_token` |

**Tham số**

| Tham số | Kiểu | Mô tả |
|---|---|---|
| vbot_id | String | VBotID khách hàng |
| project_code | String | Mã nhóm |
| phone | String | Số điện thoại |

**Response**

| Tham số | Kiểu | Mô tả |
|---|---|---|
| status | Int | Mã trạng thái (1: Thành công, 0: Thất bại) |
| error | Int | Mã lỗi |
| message | String | Thông tin |
| data | Int | Dữ liệu trả về |

**Ví dụ response**

```json
{
  "status": 1,
  "error": 2,
  "message": "sample string 3",
  "data": 4
}
```

---

## Lấy số lượng cuộc gọi

<div class="api-container">
  <span class="api-method method-get">GET</span>
  <span>[URL]/api/crm/historycall/countAll?vbot_id={vbot_id}&project_code={project_code}&from={from}&to={to}&phone={phone}</span>
</div>

**Header**

| Tham số | Giá trị |
|---|---|
| Authorization | Bearer `access_token` |

**Tham số**

| Tham số | Kiểu | Mô tả |
|---|---|---|
| vbot_id | String | VBotID khách hàng |
| project_code | String | Mã nhóm |
| from | Int | Từ ngày |
| to | Int | Đến ngày |
| phone | String | Số điện thoại |

**Response**

| Tham số | Kiểu | Mô tả |
|---|---|---|
| status | Int | Mã trạng thái (1: Thành công, 0: Thất bại) |
| error | Int | Mã lỗi |
| message | String | Thông tin |
| data | Int | Dữ liệu trả về |

**Ví dụ response**

```json
{
  "status": 1,
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

| Tham số | Giá trị |
|---|---|
| Authorization | Bearer `access_token` |

**Tham số**

| Tham số | Kiểu | Mô tả |
|---|---|---|
| trans_id | String | Mã giao dịch |

**Response**

---
