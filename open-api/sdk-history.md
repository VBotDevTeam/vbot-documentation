---
outline: deep
---

# Lịch sử cuộc gọi SDK

API tra cứu lịch sử cuộc gọi qua SDK.

## Lấy danh sách lịch sử gọi SDK

<div class="api-container">
  <span class="api-method">GET</span>
  <span>[URL]/api/sdk/historycall/getAll?token={token}&page={page}&size={size}</span>
</div>

**Header**

| Tham số | Giá trị |
|---|---|
| Authorization | Bearer `access_token` |

**Tham số**

| Tham số | Kiểu | Mô tả |
|---|---|---|
| token | String | Token SDK |
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
      "id": 1,
      "DateCreate": "02/27/2026 14:34:15",
      "userId": "sample string 3",
      "accountSIP": "sample string 4",
      "phone": "sample string 5",
      "accountOpenfire": "sample string 6",
      "avatar": "sample string 7",
      "name": "sample string 8",
      "count": 9,
      "timeCall": "sample string 10",
      "type": 11,
      "status": 12,
      "isVbot": 13,
      "idCustomer": 1,
      "isCustomer": 14,
      "avatarColor": "sample string 15",
      "transId": "sample string 16",
      "groupId": "sample string 17",
      "hotline": "sample string 18",
      "totalTagging": 19,
      "totalNote": 20,
      "postage": 21.1,
      "disposition": "sample string 22",
      "conferenceId": "sample string 23",
      "source": "sample string 24"
    },
    {
      "id": 1,
      "DateCreate": "02/27/2026 14:34:15",
      "userId": "sample string 3",
      "accountSIP": "sample string 4",
      "phone": "sample string 5",
      "accountOpenfire": "sample string 6",
      "avatar": "sample string 7",
      "name": "sample string 8",
      "count": 9,
      "timeCall": "sample string 10",
      "type": 11,
      "status": 12,
      "isVbot": 13,
      "idCustomer": 1,
      "isCustomer": 14,
      "avatarColor": "sample string 15",
      "transId": "sample string 16",
      "groupId": "sample string 17",
      "hotline": "sample string 18",
      "totalTagging": 19,
      "totalNote": 20,
      "postage": 21.1,
      "disposition": "sample string 22",
      "conferenceId": "sample string 23",
      "source": "sample string 24"
    }
  ]
}
```

---

## Lấy số lượng cuộc gọi SDK

<div class="api-container">
  <span class="api-method">GET</span>
  <span>[URL]/api/sdk/historycall/countAll?token={token}</span>
</div>

**Header**

| Tham số | Giá trị |
|---|---|
| Authorization | Bearer `access_token` |

**Tham số**

| Tham số | Kiểu | Mô tả |
|---|---|---|
| token | String | Token SDK |

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
