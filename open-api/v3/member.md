---
outline: deep
---

# Quản lý thành viên

API quản lý thành viên trong doanh nghiệp.

## Lấy danh sách thành viên

<div class="api-container">
  <span class="api-method method-get">GET</span>
  <span>[URL]/api/member/getAll?page={page}&size={size}</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-KEY | `token-open-api` |

**Tham số**

| Tham số | Kiểu | Mô tả                 |
| ------- | ---- | --------------------- |
| page    | Int  | Số trang              |
| size    | Int  | Số lượng trên 1 trang |

**Response**

| Tham số | Kiểu         | Mô tả                                  |
| ------- | ------------ | -------------------------------------- |
| error   | Int          | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message | String       | Thông tin                              |
| data    | List[Object] | Danh sách thông tin thành viên         |

**Cấu trúc phần tử trong `data` (Thông tin thành viên)**

| Tham số           | Kiểu    | Mô tả           |
| ----------------- | ------- | --------------- |
| member_name       | String  | Tên thành viên  |
| member_type       | Int     | Loại thành viên |
| member_color      | String  | Màu sắc         |
| member_ext_number | Int     | Số máy nhánh    |
| member_no         | String  | Mã thành viên   |
| member_status     | Int     | Trạng thái      |
| member_money      | Decimal | Số dư tài khoản |
| expiration_date   | String  | Ngày hết hạn    |

**Ví dụ response**

```json
{
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
  <span>[URL]/api/member/countAll</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-KEY | `token-open-api` |

**Tham số**

| Tham số | Kiểu | Mô tả |
| ------- | ---- | ----- |

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

## Lấy thông tin thành viên theo mã

<div class="api-container">
  <span class="api-method method-get">GET</span>
  <span>[URL]/api/member/getByMemberNo?member_no={member_no}</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-KEY | `token-open-api` |

**Tham số**

| Tham số   | Kiểu   | Mô tả         |
| --------- | ------ | ------------- |
| member_no | String | Mã thành viên |

**Response**

| Tham số | Kiểu   | Mô tả                                  |
| ------- | ------ | -------------------------------------- |
| error   | Int    | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message | String | Thông tin                              |
| data    | Object | Thông tin chi tiết thành viên          |

**Cấu trúc `data`**

| Tham số           | Kiểu    | Mô tả           |
| ----------------- | ------- | --------------- |
| member_name       | String  | Tên thành viên  |
| member_type       | Int     | Loại thành viên |
| member_color      | String  | Màu sắc         |
| member_ext_number | Int     | Số máy nhánh    |
| member_no         | String  | Mã thành viên   |
| member_status     | Int     | Trạng thái      |
| member_money      | Decimal | Số dư tài khoản |
| expiration_date   | String  | Ngày hết hạn    |

**Ví dụ response**

```json
{
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

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-KEY | `token-open-api` |

**Body**

| Tham số   | Kiểu           | Mô tả         |
| --------- | -------------- | ------------- |
| member_no | String         | Mã thành viên |
| money     | decimal number | Số tiền       |

**Ví dụ request**

```json
{
  "member_no": "sample string 3",
  "money": 4.1
}
```

**Response**

| Tham số | Kiểu   | Mô tả                                  |
| ------- | ------ | -------------------------------------- |
| error   | Int    | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message | String | Thông tin                              |
| data    | String | Dữ liệu trả về                         |

**Ví dụ response**

```json
{
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

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-KEY | `token-open-api` |

**Body**

| Tham số       | Kiểu   | Mô tả             |
| ------------- | ------ | ----------------- |
| member_no     | String | Mã thành viên     |
| member_no_new | String | Mã thành viên mới |

**Ví dụ request**

```json
{
  "member_no": "sample string 3",
  "member_no_new": "sample string 4"
}
```

**Response**

| Tham số | Kiểu   | Mô tả                                  |
| ------- | ------ | -------------------------------------- |
| error   | Int    | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message | String | Thông tin                              |
| data    | String | Dữ liệu trả về                         |

**Ví dụ response**

```json
{
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

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-KEY | `token-open-api` |

**Body**

| Tham số           | Kiểu   | Mô tả         |
| ----------------- | ------ | ------------- |
| member_no         | String | Mã thành viên |
| member_ext_number | Int    | Mã nhánh      |

**Ví dụ request**

```json
{
  "member_no": "sample string 3",
  "member_ext_number": 4
}
```

**Response**

| Tham số | Kiểu   | Mô tả                                  |
| ------- | ------ | -------------------------------------- |
| error   | Int    | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message | String | Thông tin                              |
| data    | String | Dữ liệu trả về                         |

**Ví dụ response**

```json
{
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

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-KEY | `token-open-api` |

**Body**

| Tham số   | Kiểu   | Mô tả         |
| --------- | ------ | ------------- |
| member_no | String | Mã thành viên |

**Ví dụ request**

```json
{
  "member_no": "sample string 3"
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
