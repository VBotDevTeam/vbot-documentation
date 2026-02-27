---
outline: deep
---

# Trạng thái khách hàng

API quản lý trạng thái khách hàng.

## Thêm trạng thái

<div class="api-container">
  <span class="api-method">POST</span>
  <span>[URL]/api/crm/status/create</span>
</div>

**Header**

| Tham số | Giá trị |
|---|---|
| Authorization | Bearer `access_token` |

**Body**

| Tham số | Kiểu | Mô tả |
|---|---|---|
| vbot_id | String | VBotID khách hàng |
| project_code | String | Mã nhóm |
| status_name | String | Tên trạng thái |
| status_no | String | Mã trạng thái |

**Ví dụ request**

```json
{
  "vbot_id": "sample string 1",
  "project_code": "sample string 2",
  "status_name": "sample string 3",
  "status_no": "sample string 4"
}
```

**Response**

| Tham số | Kiểu | Mô tả |
|---|---|---|
| status | Int | Mã trạng thái (1: Thành công, 0: Thất bại) |
| error | Int | Mã lỗi |
| message | String | Thông tin |
| data | String | Dữ liệu trả về |

**Ví dụ response**

```json
{
  "status": 1,
  "error": 2,
  "message": "sample string 3",
  "data": "sample string 4"
}
```

---

## Sửa trạng thái

<div class="api-container">
  <span class="api-method">POST</span>
  <span>[URL]/api/crm/status/update</span>
</div>

**Header**

| Tham số | Giá trị |
|---|---|
| Authorization | Bearer `access_token` |

**Body**

| Tham số | Kiểu | Mô tả |
|---|---|---|
| vbot_id | String | VBotID khách hàng |
| project_code | String | Mã nhóm |
| status_name | String | Tên trạng thái |
| status_no | String | Mã trạng thái |

**Ví dụ request**

```json
{
  "vbot_id": "sample string 1",
  "project_code": "sample string 2",
  "status_name": "sample string 3",
  "status_no": "sample string 4"
}
```

**Response**

| Tham số | Kiểu | Mô tả |
|---|---|---|
| status | Int | Mã trạng thái (1: Thành công, 0: Thất bại) |
| error | Int | Mã lỗi |
| message | String | Thông tin |
| data | String | Dữ liệu trả về |

**Ví dụ response**

```json
{
  "status": 1,
  "error": 2,
  "message": "sample string 3",
  "data": "sample string 4"
}
```

---

## Xóa trạng thái

<div class="api-container">
  <span class="api-method">POST</span>
  <span>[URL]/api/crm/status/delete</span>
</div>

**Header**

| Tham số | Giá trị |
|---|---|
| Authorization | Bearer `access_token` |

**Body**

| Tham số | Kiểu | Mô tả |
|---|---|---|
| vbot_id | String | VBotID khách hàng |
| project_code | String | Mã nhóm |
| status_no | String | Mã trạng thái |

**Ví dụ request**

```json
{
  "vbot_id": "sample string 1",
  "project_code": "sample string 2",
  "status_no": "sample string 3"
}
```

**Response**

| Tham số | Kiểu | Mô tả |
|---|---|---|
| status | Int | Mã trạng thái (1: Thành công, 0: Thất bại) |
| error | Int | Mã lỗi |
| message | String | Thông tin |
| data | Bool | Dữ liệu trả về |

**Ví dụ response**

```json
{
  "status": 1,
  "error": 2,
  "message": "sample string 3",
  "data": true
}
```

---

## Sửa mã trạng thái

<div class="api-container">
  <span class="api-method">POST</span>
  <span>[URL]/api/crm/status/updateNo</span>
</div>

**Header**

| Tham số | Giá trị |
|---|---|
| Authorization | Bearer `access_token` |

**Body**

| Tham số | Kiểu | Mô tả |
|---|---|---|
| vbot_id | String | VBotID khách hàng |
| project_code | String | Mã nhóm |
| status_no_old | String | Mã trạng thái cũ |
| status_no_new | String | Mã trạng thái mới |

**Ví dụ request**

```json
{
  "vbot_id": "sample string 1",
  "project_code": "sample string 2",
  "status_no_old": "sample string 3",
  "status_no_new": "sample string 4"
}
```

**Response**

| Tham số | Kiểu | Mô tả |
|---|---|---|
| status | Int | Mã trạng thái (1: Thành công, 0: Thất bại) |
| error | Int | Mã lỗi |
| message | String | Thông tin |
| data | String | Dữ liệu trả về |

**Ví dụ response**

```json
{
  "status": 1,
  "error": 2,
  "message": "sample string 3",
  "data": "sample string 4"
}
```

---
