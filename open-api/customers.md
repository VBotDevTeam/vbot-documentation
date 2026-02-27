---
outline: deep
---

# Quản lý khách hàng

API quản lý thông tin khách hàng.

## Thêm khách hàng

<div class="api-container">
  <span class="api-method">POST</span>
  <span>[URL]/api/crm/customer/create</span>
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
| customer_name | String | Tên khách hàng |
| customer_no | String | Mã khách hàng |
| customer_address | String | Địa chỉ khách hàng |
| customer_email | String | Email khách hàng |
| customer_phones | List[String] | Danh sách số điện thoại |
| customer_status_code | String | Mã trạng thái |
| customer_type_code | String | Mã loại |
| customer_group_name | String | Tên nhóm |

**Ví dụ request**

```json
{
  "vbot_id": "sample string 1",
  "project_code": "sample string 2",
  "customer_name": "sample string 3",
  "customer_no": "sample string 4",
  "customer_address": "sample string 5",
  "customer_email": "sample string 6",
  "customer_phones": [
    "sample string 1",
    "sample string 2"
  ],
  "customer_status_code": "sample string 7",
  "customer_type_code": "sample string 8",
  "customer_group_name": "sample string 9",
  "fileds": [
    {
      "field_key": "sample string 1",
      "field_value": "sample string 2"
    },
    {
      "field_key": "sample string 1",
      "field_value": "sample string 2"
    }
  ]
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

## Sửa khách hàng

<div class="api-container">
  <span class="api-method">POST</span>
  <span>[URL]/api/crm/customer/update</span>
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
| customer_name | String | Tên khách hàng |
| customer_no | String | Mã khách hàng |
| customer_address | String | Địa chỉ khách hàng |
| customer_email | String | Email khách hàng |
| customer_phones | List[String] | Danh sách số điện thoại |
| customer_status_code | String | Mã trạng thái |
| customer_type_code | String | Mã loại |
| customer_group_name | String | Tên nhóm |

**Ví dụ request**

```json
{
  "vbot_id": "sample string 1",
  "project_code": "sample string 2",
  "customer_name": "sample string 3",
  "customer_no": "sample string 4",
  "customer_address": "sample string 5",
  "customer_email": "sample string 6",
  "customer_phones": [
    "sample string 1",
    "sample string 2"
  ],
  "customer_status_code": "sample string 7",
  "customer_type_code": "sample string 8",
  "customer_group_name": "sample string 9",
  "fileds": [
    {
      "field_key": "sample string 1",
      "field_value": "sample string 2"
    },
    {
      "field_key": "sample string 1",
      "field_value": "sample string 2"
    }
  ]
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

## Xóa khách hàng

<div class="api-container">
  <span class="api-method">POST</span>
  <span>[URL]/api/crm/customer/delete</span>
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
| customer_no | String | Mã khách hàng |

**Ví dụ request**

```json
{
  "vbot_id": "sample string 1",
  "project_code": "sample string 2",
  "customer_no": "sample string 3"
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

## Xóa tất cả khách hàng

<div class="api-container">
  <span class="api-method">POST</span>
  <span>[URL]/api/crm/customer/deleteAll</span>
</div>

**Header**

| Tham số | Giá trị |
|---|---|
| Authorization | Bearer `access_token` |

**Response**

---

## Sửa mã khách hàng

<div class="api-container">
  <span class="api-method">POST</span>
  <span>[URL]/api/crm/customer/updateNo</span>
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
| customer_no_old | String | Mã khách hàng cũ |
| customer_no_new | String | Mã khách hàng mới |

**Ví dụ request**

```json
{
  "vbot_id": "sample string 1",
  "project_code": "sample string 2",
  "customer_no_old": "sample string 3",
  "customer_no_new": "sample string 4"
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
