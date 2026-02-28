---
outline: deep
---

# Thống kê dự án

API thống kê hiệu suất cuộc gọi trong dự án.

## Lấy thống kê cuộc gọi

<div class="api-container">
  <span class="api-method method-get">GET</span>
  <span>[URL]/api/project/getAllCallPersent?vbot_id={vbot_id}&project_code={project_code}&page={page}&size={size}</span>
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
      "create_at": 1,
      "call_at": 2,
      "trans_id": "sample string 3",
      "project_code": "sample string 4",
      "caller": {
        "phone": "sample string 1",
        "member_no": "sample string 2",
        "source": "sample string 3"
      },
      "callee": {
        "phone": "sample string 1",
        "member_no": "sample string 2",
        "source": "sample string 3"
      },
      "hotline": "sample string 5",
      "type_call": "sample string 6"
    },
    {
      "create_at": 1,
      "call_at": 2,
      "trans_id": "sample string 3",
      "project_code": "sample string 4",
      "caller": {
        "phone": "sample string 1",
        "member_no": "sample string 2",
        "source": "sample string 3"
      },
      "callee": {
        "phone": "sample string 1",
        "member_no": "sample string 2",
        "source": "sample string 3"
      },
      "hotline": "sample string 5",
      "type_call": "sample string 6"
    }
  ]
}
```

---

## Lấy số lượng thống kê

<div class="api-container">
  <span class="api-method method-get">GET</span>
  <span>[URL]/api/project/countAllCallPersent?vbot_id={vbot_id}&project_code={project_code}</span>
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
