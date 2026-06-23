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

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Body**

| Tham số   | Kiểu         | Mô tả              |
| --------- | ------------ | ------------------ |
| group_no  | String       | Mã nhóm thành viên |
| member_no | List[String] | Mã thành viên      |

**Ví dụ request**

```json
{
  "group_no": "sample string 3",
  "member_no": ["sample string 1", "sample string 2"]
}
```

**Response**

| Tham số | Kiểu   | Mô tả                                  |
| ------- | ------ | -------------------------------------- |
| error   | Int    | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message | String | Thông tin                              |
| data    | Bool   | Dữ liệu trả về                         |

**Ví dụ response**

```json
{
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

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Body**

| Tham số   | Kiểu         | Mô tả              |
| --------- | ------------ | ------------------ |
| group_no  | String       | Mã nhóm thành viên |
| member_no | List[String] | Mã thành viên      |

**Ví dụ request**

```json
{
  "group_no": "sample string 3",
  "member_no": ["sample string 1", "sample string 2"]
}
```

**Response**

| Tham số | Kiểu   | Mô tả                                  |
| ------- | ------ | -------------------------------------- |
| error   | Int    | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message | String | Thông tin                              |
| data    | Bool   | Dữ liệu trả về                         |

**Ví dụ response**

```json
{
  "error": 2,
  "message": "sample string 3",
  "data": true
}
```

---
