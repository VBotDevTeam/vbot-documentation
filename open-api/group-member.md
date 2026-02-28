---
outline: deep
---

# Quản lý nhóm thành viên

API quản lý nhóm thành viên.

## Lấy danh sách nhóm thành viên

<div class="api-container">
  <span class="api-method method-get">GET</span>
  <span>[URL]/api/groupmember/getAll?vbot_id={vbot_id}&project_code={project_code}&key={key}&page={page}&size={size}</span>
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
| key | String | Từ khóa tìm kiếm |
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
      "group_no": "sample string 1",
      "group_name": "sample string 2",
      "description": "sample string 3",
      "group_ext_number": 4,
      "is_internal": true
    },
    {
      "group_no": "sample string 1",
      "group_name": "sample string 2",
      "description": "sample string 3",
      "group_ext_number": 4,
      "is_internal": true
    }
  ]
}
```

---

## Thêm nhóm thành viên

<div class="api-container">
  <span class="api-method method-post">POST</span>
  <span>[URL]/api/groupmember/create</span>
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
| group_no | String | Mã nhóm thành viên |
| group_name | String | Tên nhóm thành viên |
| description | String | Mô tả |
| group_ext_number | Int | Mã nhánh nhóm |
| is_internal | Bool |  |

**Ví dụ request**

```json
{
  "vbot_id": "sample string 1",
  "project_code": "sample string 2",
  "group_no": "sample string 3",
  "group_name": "sample string 4",
  "description": "sample string 5",
  "group_ext_number": 6,
  "is_internal": true
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

## Sửa nhóm thành viên

<div class="api-container">
  <span class="api-method method-post">POST</span>
  <span>[URL]/api/groupmember/update</span>
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
| group_no | String | Mã nhóm thành viên |
| group_name | String | Tên nhóm thành viên |
| description | String | Mô tả |

**Ví dụ request**

```json
{
  "vbot_id": "sample string 1",
  "project_code": "sample string 2",
  "group_no": "sample string 3",
  "group_name": "sample string 4",
  "description": "sample string 5"
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

## Sửa mã nhóm thành viên

<div class="api-container">
  <span class="api-method method-post">POST</span>
  <span>[URL]/api/groupmember/updateNo</span>
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
| group_no | String | Mã nhóm thành viên |
| group_no_new | String | Mã nhóm mới |

**Ví dụ request**

```json
{
  "vbot_id": "sample string 1",
  "project_code": "sample string 2",
  "group_no": "sample string 3",
  "group_no_new": "sample string 4"
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

## Sửa mã nhánh nhóm thành viên

<div class="api-container">
  <span class="api-method method-post">POST</span>
  <span>[URL]/api/groupmember/updateExtNumber</span>
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
| group_no | String | Mã nhóm thành viên |
| group_ext_number | Int | Mã nhánh nhóm |

**Ví dụ request**

```json
{
  "vbot_id": "sample string 1",
  "project_code": "sample string 2",
  "group_no": "sample string 3",
  "group_ext_number": 4
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

## Xóa nhóm thành viên

<div class="api-container">
  <span class="api-method method-post">POST</span>
  <span>[URL]/api/groupmember/delete</span>
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
| group_no | String | Mã nhóm thành viên |

**Ví dụ request**

```json
{
  "vbot_id": "sample string 1",
  "project_code": "sample string 2",
  "group_no": "sample string 3"
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
