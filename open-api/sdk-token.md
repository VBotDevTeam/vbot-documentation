---
outline: deep
---

# SDK Token & Chức năng

API quản lý token SDK và các chức năng mở rộng.

## Lấy token SDK

<div class="api-container">
  <span class="api-method">GET</span>
  <span>[URL]/api/sdk/getToken?project_code={project_code}&member_no={member_no}</span>
</div>

**Header**

| Tham số | Giá trị |
|---|---|
| Authorization | Bearer `access_token` |

**Tham số**

| Tham số | Kiểu | Mô tả |
|---|---|---|
| project_code | String | Mã nhóm |
| member_no | String | Mã thành viên |

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

## Thêm log SDK

<div class="api-container">
  <span class="api-method">POST</span>
  <span>[URL]/api/sdk/addlog</span>
</div>

**Header**

| Tham số | Giá trị |
|---|---|
| Authorization | Bearer `access_token` |

**Body**

| Tham số | Kiểu | Mô tả |
|---|---|---|
| deviceUID | String |  |
| systemDevice | String |  |
| sdkVersion | String |  |
| appVersion | String |  |
| uid | String |  |
| ipPublic | String |  |
| ipLocal | String |  |
| network | String |  |
| permission | String |  |
| source | String | Nguồn cuộc gọi |
| sid | String |  |
| bundleId | String |  |

**Ví dụ request**

```json
{
  "deviceUID": "sample string 1",
  "deviceName": "sample string 2",
  "systemDevice": "sample string 3",
  "sdkVersion": "sample string 4",
  "appName": "sample string 5",
  "appVersion": "sample string 6",
  "uid": "sample string 7",
  "userName": "sample string 8",
  "ipPublic": "sample string 9",
  "ipLocal": "sample string 10",
  "network": "sample string 11",
  "permission": "sample string 12",
  "source": "sample string 13",
  "sid": "sample string 14",
  "bundleId": "sample string 15"
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

## Cập nhật thông tin SDK

<div class="api-container">
  <span class="api-method">POST</span>
  <span>[URL]/api/sdk/info</span>
</div>

**Header**

| Tham số | Giá trị |
|---|---|
| Authorization | Bearer `access_token` |

**Body**

| Tham số | Kiểu | Mô tả |
|---|---|---|
| source | String | Nguồn cuộc gọi |
| tokenCall | String |  |
| tokenNotiCall | String |  |
| version | String |  |
| bundleId | String |  |

**Ví dụ request**

```json
{
  "source": "sample string 1",
  "tokenCall": "sample string 2",
  "tokenNotiCall": "sample string 3",
  "version": "sample string 4",
  "bundleId": "sample string 5"
}
```

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
    "displayName": "sample string 1",
    "websocketUrl": "sample string 2",
    "pid": 3,
    "sid": "sample string 4",
    "memberUID": "sample string 5",
    "accounts": [
      {
        "username": "sample string 1",
        "password": "sample string 2",
        "domain": "sample string 3",
        "realm": "sample string 4",
        "port": "sample string 5",
        "transport": "sample string 6",
        "isActive": true
      },
      {
        "username": "sample string 1",
        "password": "sample string 2",
        "domain": "sample string 3",
        "realm": "sample string 4",
        "port": "sample string 5",
        "transport": "sample string 6",
        "isActive": true
      }
    ]
  }
}
```

---

## Đăng xuất SDK

<div class="api-container">
  <span class="api-method">POST</span>
  <span>[URL]/api/sdk/logout</span>
</div>

**Header**

| Tham số | Giá trị |
|---|---|
| Authorization | Bearer `access_token` |

**Body**

| Tham số | Kiểu | Mô tả |
|---|---|---|
| source | String | Nguồn cuộc gọi |
| sid | String |  |

**Ví dụ request**

```json
{
  "source": "sample string 1",
  "sid": "sample string 2"
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

## Cập nhật token thông báo

<div class="api-container">
  <span class="api-method">POST</span>
  <span>[URL]/api/sdk/updateNotiToken</span>
</div>

**Header**

| Tham số | Giá trị |
|---|---|
| Authorization | Bearer `access_token` |

**Body**

| Tham số | Kiểu | Mô tả |
|---|---|---|
| tokenCall | String |  |
| tokenNotiCall | String |  |
| bundleId | String |  |

**Ví dụ request**

```json
{
  "tokenCall": "sample string 1",
  "tokenNotiCall": "sample string 2",
  "bundleId": "sample string 3"
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

## Lấy danh sách hotline SDK

<div class="api-container">
  <span class="api-method">GET</span>
  <span>[URL]/api/sdk/getHotline</span>
</div>

**Header**

| Tham số | Giá trị |
|---|---|
| Authorization | Bearer `access_token` |

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
      "name": "sample string 1",
      "phoneNumber": "sample string 2"
    },
    {
      "name": "sample string 1",
      "phoneNumber": "sample string 2"
    }
  ]
}
```

---

## Kiểm tra cuộc gọi theo transaction

<div class="api-container">
  <span class="api-method">GET</span>
  <span>[URL]/api/sdk/checkCallExistByTrans?transId={transId}</span>
</div>

**Header**

| Tham số | Giá trị |
|---|---|
| Authorization | Bearer `access_token` |

**Tham số**

| Tham số | Kiểu | Mô tả |
|---|---|---|
| transId | String | Mã giao dịch |

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

## Đánh giá chất lượng cuộc gọi

<div class="api-container">
  <span class="api-method">POST</span>
  <span>[URL]/api/sdk/addCallQuality</span>
</div>

**Header**

| Tham số | Giá trị |
|---|---|
| Authorization | Bearer `access_token` |

**Body**

| Tham số | Kiểu | Mô tả |
|---|---|---|
| transId | String | Mã giao dịch |
| source | String | Nguồn cuộc gọi |
| dateEnd | Int |  |
| qualityAdv | decimal number |  |

**Ví dụ request**

```json
{
  "transId": "sample string 1",
  "source": "sample string 2",
  "qualitys": [
    {
      "date": 1,
      "quality": 2.1
    },
    {
      "date": 1,
      "quality": 2.1
    }
  ],
  "dateEnd": 3,
  "qualityAdv": 4.1
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

## Lấy transaction ID

<div class="api-container">
  <span class="api-method">GET</span>
  <span>[URL]/api/sdk/getTransId?caller={caller}&extNumber={extNumber}&pid={pid}</span>
</div>

**Header**

| Tham số | Giá trị |
|---|---|
| Authorization | Bearer `access_token` |

**Tham số**

| Tham số | Kiểu | Mô tả |
|---|---|---|
| caller | String | Người gọi |
| extNumber | Int | Mã nhánh |
| pid | Int | Process ID |

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

## Lấy quyền SDK

<div class="api-container">
  <span class="api-method">GET</span>
  <span>[URL]/api/sdk/getPermission</span>
</div>

**Header**

| Tham số | Giá trị |
|---|---|
| Authorization | Bearer `access_token` |

**Response**

| Tham số | Kiểu | Mô tả |
|---|---|---|
| id | Int |  |
| parentId | Int |  |
| name | String |  |
| description | String |  |
| codePermission | String |  |
| parentCode | String |  |

---

## Lấy thông tin cuộc gọi

<div class="api-container">
  <span class="api-method">GET</span>
  <span>[URL]/api/sdk/getInfoCall?transId={transId}&source={source}&phone={phone}&typeCall={typeCall}</span>
</div>

**Header**

| Tham số | Giá trị |
|---|---|
| Authorization | Bearer `access_token` |

**Tham số**

| Tham số | Kiểu | Mô tả |
|---|---|---|
| transId | String | Mã giao dịch |
| source | String | Nguồn cuộc gọi |
| phone | String | Số điện thoại |
| typeCall | String | Loại cuộc gọi |

**Response**

| Tham số | Kiểu | Mô tả |
|---|---|---|
| createAt | Int |  |
| projectId | Int |  |
| code | String |  |
| transId | String |  |
| groupId | String |  |
| hotline | String |  |
| createBy | String |  |
| isInComing | Int |  |

**Ví dụ response**

```json
{
  "createAt": 1,
  "projectId": 1,
  "code": "sample string 2",
  "transId": "sample string 3",
  "groupId": "sample string 4",
  "hotline": "sample string 5",
  "hotlineName": "sample string 6",
  "createBy": "sample string 7",
  "isInComing": 8,
  "modelItems": [
    {
      "name": "sample string 1",
      "id": 2,
      "typeId": 3,
      "isVbot": 4,
      "vbotId": "sample string 5",
      "isCustomer": 6,
      "idCustomer": 7,
      "avatar": "sample string 8",
      "avatarcolor": "sample string 9",
      "accountSIP": "sample string 10",
      "phone": "sample string 11",
      "source": "sample string 12",
      "externalCallId": "sample string 13"
    },
    {
      "name": "sample string 1",
      "id": 2,
      "typeId": 3,
      "isVbot": 4,
      "vbotId": "sample string 5",
      "isCustomer": 6,
      "idCustomer": 7,
      "avatar": "sample string 8",
      "avatarcolor": "sample string 9",
      "accountSIP": "sample string 10",
      "phone": "sample string 11",
      "source": "sample string 12",
      "externalCallId": "sample string 13"
    }
  ]
}
```

---

## Tìm khách hàng theo số điện thoại

<div class="api-container">
  <span class="api-method">GET</span>
  <span>[URL]/api/sdk/getCustomerByPhone?phone={phone}</span>
</div>

**Header**

| Tham số | Giá trị |
|---|---|
| Authorization | Bearer `access_token` |

**Response**

---

## Lấy token SDK (POST)

<div class="api-container">
  <span class="api-method">POST</span>
  <span>[URL]/api/SDK_Token?_log={_log}</span>
</div>

**Header**

| Tham số | Giá trị |
|---|---|
| Authorization | Bearer `access_token` |

**Body**

| Tham số | Kiểu | Mô tả |
|---|---|---|
| _log | String | Log |

**Response**

---
