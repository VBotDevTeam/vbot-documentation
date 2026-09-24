---
outline: deep
---

# Tạo cuộc gọi

API tạo cuộc gọi tự động với kịch bản. Hỗ trợ gọi tới một số điện thoại (single call) hoặc nhiều số cùng lúc (batch call) theo danh sách số điện thoại. Để gọi cho thành viên SDK, vui lòng xem tài liệu [Gọi tự động cho thành viên SDK](/open-api/v3/campaign-sdk-member).

## Luồng xác thực & tương tác

![Luồng xác thực VBot Call Automation](/call-automation-flow-v3.png)

## Tạo cuộc gọi đơn lẻ {#tao-cuoc-goi-don}

Tạo cuộc gọi tự động tới một số điện thoại duy nhất.

<div class="api-container">
  <span class="api-method method-post">POST</span>
  <span>[URL]/m-auto-call/api/call/create</span>
</div>

**Header**

| Tham số      | Giá trị            | Bắt buộc |
| ------------ | ------------------ | -------- |
| Content-Type | `application/json` | Có       |
| X-API-Key    | `token-open-api`   | Có       |

**Body**

| Tham số          | Kiểu   | Bắt buộc | Mô tả                                                                 |
| ---------------- | ------ | -------- | --------------------------------------------------------------------- |
| phone            | String | Có       | Số điện thoại cần gọi                                                 |
| template_code    | String | Có       | Mã kịch bản hội thoại                                                 |
| hotline_code     | String | Có       | Số hotline (số tổng đài gọi ra)                                       |
| external_call_id | String |          | Mã cuộc gọi từ hệ thống bên ngoài                                     |
| name             | String |          | Tên khách hàng                                                        |
| customer_uid     | String |          | Mã định danh khách hàng                                               |
| max_time         | Int    |          | Thời gian tối đa gọi (giây), mặc định: -1 (không giới hạn)            |
| max_waiting_time | Int    |          | Thời gian chờ tối đa (giây), mặc định: 30                             |
| datas            | Object |          | Dữ liệu biến thay thế trong kịch bản (key là `cfkey` từ custom field) |

<div class="note">
<strong>Lưu ý về giá trị <code>external_call_id</code>:</strong><br/>
Giá trị <code>external_call_id</code> được truyền vào cần thỏa mãn các điều kiện sau:
<ul>
  <li>Độ dài tối đa: <strong>32 ký tự</strong>.</li>
  <li>Chỉ sử dụng các ký tự chữ thường (<code>a</code>–<code>z</code>) và chữ số (<code>0</code>–<code>9</code>).</li>
  <li><strong>Không</strong> chứa các ký tự đặc biệt, chữ in hoa hoặc khoảng trắng.</li>
</ul>
</div>

**Ví dụ request**

```json
{
  "phone": "0987654321",
  "template_code": "SCRIPT_001",
  "hotline_code": "HL_001",
  "name": "Nguyen Van A",
  "customer_uid": "CUST_001",
  "external_call_id": "extcall001",
  "max_time": -1,
  "max_waiting_time": 30,
  "datas": {
    "cf_ho_ten": "Nguyen Van A",
    "cf_so_tien": "5000000"
  }
}
```

**Response**

| Tham số   | Kiểu    | Mô tả                                                   |
| --------- | ------- | ------------------------------------------------------- |
| status    | Int     | Mã trạng thái HTTP (`200`, `500`)                       |
| msg       | String  | Thông báo phản hồi (`Success`, `error`)                 |
| errorCode | Int     | Mã lỗi nghiệp vụ (`0`: Thành công, `500`: Lỗi hệ thống) |
| data      | Boolean | Kết quả tạo cuộc gọi (`true`/`false`)                   |

**Ví dụ response**

Thành công:

```json
{
  "status": 200,
  "msg": "Success",
  "errorCode": 0,
  "data": true
}
```

Lỗi:

```json
{
  "status": 500,
  "msg": "error",
  "errorCode": 500,
  "data": null
}
```

**Bảng mã lỗi**

| errorCode | status | Mô tả        |
| --------- | ------ | ------------ |
| `0`       | `200`  | Thành công   |
| `500`     | `500`  | Lỗi hệ thống |

---

## Tạo cuộc gọi hàng loạt theo số điện thoại {#tao-cuoc-goi-hang-loat-sdt}

Tạo cuộc gọi tự động đến danh sách số điện thoại (tối đa 5 số, hệ thống tự động loại trùng).

<div class="api-container">
  <span class="api-method method-post">POST</span>
  <span>[URL]/m-auto-call/api/call/create-list-phone</span>
</div>

**Header**

| Tham số      | Giá trị            | Bắt buộc |
| ------------ | ------------------ | -------- |
| Content-Type | `application/json` | Có       |
| X-API-Key    | `token-open-api`   | Có       |

**Body**

| Tham số          | Kiểu   | Bắt buộc | Mô tả                                         |
| ---------------- | ------ | -------- | --------------------------------------------- |
| template_code    | String | Có       | Mã kịch bản hội thoại                         |
| hotline_code     | String | Có       | Số hotline (số tổng đài gọi ra)               |
| phone_infos      | Array  | Có       | Danh sách số điện thoại cần gọi (tối đa 5 số) |
| max_time         | Int    |          | Thời gian tối đa gọi (giây), mặc định: -1     |
| max_waiting_time | Int    |          | Thời gian chờ tối đa (giây), mặc định: 30     |

**Cấu trúc mỗi phần tử trong `phone_infos`:**

| Tham số          | Kiểu   | Bắt buộc | Mô tả                                                                 |
| ---------------- | ------ | -------- | --------------------------------------------------------------------- |
| phone            | String | Có       | Số điện thoại cần gọi                                                 |
| external_call_id | String |          | Mã cuộc gọi từ hệ thống bên ngoài                                     |
| customer_uid     | String |          | Mã định danh khách hàng                                               |
| name             | String |          | Tên khách hàng                                                        |
| datas            | Object |          | Dữ liệu biến thay thế trong kịch bản (key là `cfkey` từ custom field) |

<div class="note">
<strong>Lưu ý:</strong>
<ul>
  <li>Tối đa <strong>5 số điện thoại</strong> trong một yêu cầu (tính sau khi loại trùng theo trường <code>phone</code>).</li>
  <li>Hệ thống <strong>tự động loại bỏ số trùng lặp</strong> (giữ lại bản ghi đầu tiên xuất hiện).</li>
  <li>Độ dài <code>external_call_id</code> tối đa 32 ký tự, chỉ gồm chữ thường <code>a-z</code> và số <code>0-9</code>.</li>
</ul>
</div>

**Ví dụ request**

```json
{
  "template_code": "SCRIPT_001",
  "hotline_code": "HL_001",
  "phone_infos": [
    {
      "phone": "0987654321",
      "name": "Nguyen Van A",
      "customer_uid": "CUST_001",
      "external_call_id": "extcall001",
      "datas": {
        "cf_ho_ten": "Nguyen Van A",
        "cf_so_tien": "5000000"
      }
    },
    {
      "phone": "0912345678",
      "name": "Tran Thi B",
      "datas": {
        "cf_ho_ten": "Tran Thi B",
        "cf_so_tien": "3000000"
      }
    }
  ]
}
```

**Response**

| Tham số   | Kiểu    | Mô tả                                 |
| --------- | ------- | ------------------------------------- |
| status    | Int     | Mã trạng thái HTTP (`200`, `500`)     |
| msg       | String  | Thông báo phản hồi                    |
| errorCode | Int     | Mã lỗi nghiệp vụ                      |
| data      | Boolean | Kết quả tạo cuộc gọi (`true`/`false`) |

**Ví dụ response**

Thành công:

```json
{
  "status": 200,
  "msg": "Success",
  "errorCode": 0,
  "data": true
}
```

Lỗi (`phone_infos` là null):

```json
{
  "status": 500,
  "msg": "phoneInfos is null",
  "errorCode": -1,
  "data": false
}
```

Lỗi (vượt quá 5 số):

```json
{
  "status": 500,
  "msg": "error",
  "errorCode": 403,
  "data": null
}
```

**Bảng mã lỗi**

| errorCode | status | Mô tả                                                  |
| --------- | ------ | ------------------------------------------------------ |
| `0`       | `200`  | Thành công                                             |
| `-1`      | `500`  | `phone_infos` là `null`                                |
| `403`     | `500`  | Vượt quá giới hạn 5 số điện thoại (sau khi loại trùng) |
| `500`     | `500`  | Lỗi hệ thống                                           |

---

## Các API phiên bản cũ (Deprecated)

::: warning Khuyến nghị
Các API dưới đây thuộc phiên bản cũ (Deprecated). Hiện tại hệ thống **vẫn đang tiếp tục hỗ trợ và duy trì hoạt động bình thường**. Tuy nhiên, VBot **khuyến nghị** quý khách hàng ưu tiên chuyển sang sử dụng các API phiên bản mới ở trên (`/m-auto-call/api/call/create`, `/m-auto-call/api/call/create-list-phone`) để tối ưu hiệu năng và được cập nhật các tính năng mới nhất trong tương lai.
:::

### Tạo cuộc gọi đơn lẻ (Deprecated)

Tạo cuộc gọi tới một số điện thoại duy nhất (phiên bản cũ).

<div class="api-container">
  <span class="api-method method-post">POST</span>
  <span>[URL]/api/campaignCall/callConfirm/insert</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Body**

| Tham số          | Kiểu   | Bắt buộc | Mô tả                                                                 |
| ---------------- | ------ | -------- | --------------------------------------------------------------------- |
| phone            | String | Có       | Số điện thoại cần gọi (format: 09xxxxxxxx)                            |
| hotline_code     | String | Có       | Số hotline (số tổng đài)                                              |
| template_code    | String | Có       | Mã template script                                                    |
| max_time         | Int    |          | Thời gian tối đa gọi (giây), -1 = unlimited                           |
| max_waiting_time | Int    |          | Thời gian chờ tối đa (giây), default: 30                              |
| external_call_id | String |          | Mã cuộc gọi từ hệ thống bên ngoài                                     |
| datas            | Object |          | Dữ liệu biến thay thế trong kịch bản (key là `cfkey` từ custom field) |

**Ví dụ request**

```json
{
  "phone": "0912345678",
  "hotline_code": "0812345678",
  "template_code": "CONFIRM_ORDER",
  "max_time": -1,
  "max_waiting_time": 30,
  "external_call_id": "extcall001",
  "datas": {
    "customer_name": "Nguyễn Văn A",
    "order_id": "ORD_12345"
  }
}
```

**Response**

| Tham số | Kiểu   | Mô tả                                  |
| ------- | ------ | -------------------------------------- |
| error   | Int    | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message | String | Thông tin                              |
| data    | Object | Thông tin cuộc gọi                     |

**Ví dụ response**

```json
{
  "error": 0,
  "message": "success",
  "data": true
}
```

---

### Tạo cuộc gọi hàng loạt (Deprecated)

Tạo cuộc gọi tới nhiều số điện thoại cùng lúc (phiên bản cũ).

<div class="api-container">
  <span class="api-method method-post">POST</span>
  <span>[URL]/api/campaignCall/callConfirm/insertListPhone</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Body**

| Tham số                  | Kiểu   | Bắt buộc | Mô tả                                                                 |
| ------------------------ | ------ | -------- | --------------------------------------------------------------------- |
| hotline_code             | String | Có       | Số hotline (số tổng đài)                                              |
| template_code            | String | Có       | Mã template script                                                    |
| phoneInfos               | Array  | Có       | Danh sách số điện thoại                                               |
| phoneInfos[].phone       | String | Có       | Số điện thoại                                                         |
| phoneInfos[].name        | String |          | Tên khách hàng                                                        |
| phoneInfos[].customerUid | String |          | ID khách hàng (unique)                                                |
| phoneInfos[].datas       | Object |          | Dữ liệu biến thay thế trong kịch bản (key là `cfkey` từ custom field) |

**Ví dụ request**

```json
{
  "hotline_code": "0812345678",
  "template_code": "CONFIRM_ORDER",
  "phoneInfos": [
    {
      "phone": "0912345678",
      "name": "Nguyễn Văn A",
      "customerUid": "CUST_001"
    },
    {
      "phone": "0987654321",
      "name": "Trần Thị B",
      "customerUid": "CUST_002"
    }
  ]
}
```

**Response**

| Tham số | Kiểu   | Mô tả                                  |
| ------- | ------ | -------------------------------------- |
| error   | Int    | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message | String | Thông tin                              |
| data    | Object | Thông tin batch call                   |

**Ví dụ response**

```json
{
  "error": 0,
  "message": "Batch call campaign được tạo thành công",
  "data": {
    "batch_id": "BATCH_20240110_001",
    "phone_count": 2,
    "status": "processing"
  }
}
```

---

### Lấy trường tùy chỉnh trong kịch bản (Deprecated) {#lay-truong-tuy-chinh-trong-kich-ban}

Lấy danh sách các trường tùy chỉnh (custom field) được sử dụng trong một template script cụ thể.

<div class="api-container">
  <span class="api-method method-get">GET</span>
  <span>[URL]/api/campaignCall/callConfirm/getCustomFieldInScript?template_script_code={template_script_code}</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Tham số**

| Tham số              | Kiểu   | Mô tả                |
| -------------------- | ------ | -------------------- |
| template_script_code | String | Mã template kịch bản |

**Response**

| Tham số | Kiểu   | Mô tả                                  |
| ------- | ------ | -------------------------------------- |
| error   | Int    | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message | String | Thông tin                              |

**Ví dụ response**

```json
{
  "error": 0,
  "message": "Success",
  "data": [
    {
      "id": 1,
      "cfname": "Tên khách hàng",
      "cfkey": "customer_name",
      "description": "Tên khách hàng để xưng hô",
      "cftype": "text",
      "isRequired": true
    },
    {
      "id": 2,
      "cfname": "Mã đơn hàng",
      "cfkey": "order_id",
      "description": "Mã đơn hàng cần xác nhận",
      "cftype": "text",
      "isRequired": false
    }
  ]
}
```
