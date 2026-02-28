---
outline: deep
---

# Quản lý thành viên

API quản lý thành viên trong doanh nghiệp.

## Lấy danh sách thành viên

<div class="api-container">
  <span class="api-method method-get">GET</span>
  <span>[URL]/api/member/getAll?vbot_id={vbot_id}&project_code={project_code}&page={page}&size={size}</span>
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
      "member_name": "sample string 1",
      "member_type": 2,
      "member_color": "sample string 3",
      "member_ext_number": 4,
      "member_no": "sample string 5",
      "member_status": 6,
      "member_money": 7.1,
      "expiration_date": "sample string 8"
    },
    {
      "member_name": "sample string 1",
      "member_type": 2,
      "member_color": "sample string 3",
      "member_ext_number": 4,
      "member_no": "sample string 5",
      "member_status": 6,
      "member_money": 7.1,
      "expiration_date": "sample string 8"
    }
  ]
}
```

---

## Lấy số lượng thành viên

<div class="api-container">
  <span class="api-method method-get">GET</span>
  <span>[URL]/api/member/countAll?vbot_id={vbot_id}&project_code={project_code}</span>
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

## Lấy thông tin thành viên theo mã

<div class="api-container">
  <span class="api-method method-get">GET</span>
  <span>[URL]/api/member/getByMemberNo?vbot_id={vbot_id}&project_code={project_code}&member_no={member_no}</span>
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
| member_no | String | Mã thành viên |

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
  "data": {
    "member_name": "sample string 1",
    "member_type": 2,
    "member_color": "sample string 3",
    "member_ext_number": 4,
    "member_no": "sample string 5",
    "member_status": 6,
    "member_money": 7.1,
    "expiration_date": "sample string 8"
  }
}
```

---

## Thêm tiền cho thành viên

<div class="api-container">
  <span class="api-method method-post">POST</span>
  <span>[URL]/api/member/addMoney</span>
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
| member_no | String | Mã thành viên |
| money | decimal number | Số tiền |

**Ví dụ request**

```json
{
  "vbot_id": "sample string 1",
  "project_code": "sample string 2",
  "member_no": "sample string 3",
  "money": 4.1
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

## Sửa mã thành viên

<div class="api-container">
  <span class="api-method method-post">POST</span>
  <span>[URL]/api/member/updateNo</span>
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
| member_no | String | Mã thành viên |
| member_no_new | String | Mã thành viên mới |

**Ví dụ request**

```json
{
  "vbot_id": "sample string 1",
  "project_code": "sample string 2",
  "member_no": "sample string 3",
  "member_no_new": "sample string 4"
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

## Sửa nhánh thành viên

<div class="api-container">
  <span class="api-method method-post">POST</span>
  <span>[URL]/api/member/updateExtNumber</span>
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
| member_no | String | Mã thành viên |
| member_ext_number | Int | Mã nhánh |

**Ví dụ request**

```json
{
  "vbot_id": "sample string 1",
  "project_code": "sample string 2",
  "member_no": "sample string 3",
  "member_ext_number": 4
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

## Xóa thành viên

<div class="api-container">
  <span class="api-method method-post">POST</span>
  <span>[URL]/api/member/delete</span>
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
| member_no | String | Mã thành viên |

**Ví dụ request**

```json
{
  "vbot_id": "sample string 1",
  "project_code": "sample string 2",
  "member_no": "sample string 3"
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
