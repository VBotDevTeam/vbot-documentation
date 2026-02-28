---
outline: deep
---

# Thành viên trong nhóm

API thêm/xóa thành viên trong nhóm thành viên.

## Thêm thành viên vào nhóm

<div class="api-container">
  <span class="api-method method-post">POST</span>
  <span>[URL]/api/groupmember/member/add</span>
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
| member_no | List[String] | Mã thành viên |

**Ví dụ request**

```json
{
  "vbot_id": "sample string 1",
  "project_code": "sample string 2",
  "group_no": "sample string 3",
  "member_no": [
    "sample string 1",
    "sample string 2"
  ]
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

## Xóa thành viên khỏi nhóm

<div class="api-container">
  <span class="api-method method-post">POST</span>
  <span>[URL]/api/groupmember/member/delete</span>
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
| member_no | List[String] | Mã thành viên |

**Ví dụ request**

```json
{
  "vbot_id": "sample string 1",
  "project_code": "sample string 2",
  "group_no": "sample string 3",
  "member_no": [
    "sample string 1",
    "sample string 2"
  ]
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
