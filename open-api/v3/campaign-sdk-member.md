---
outline: deep
---

# Gọi tự động cho thành viên SDK

VBot cung cấp Open API thực hiện cuộc gọi tự động trực tiếp qua VoIP đến các tài khoản thành viên (VBot hoặc SDK).

::: tip Bài toán & Giải pháp

- **Bài toán**: Phát cảnh báo khẩn cấp đến khách hàng một cách hiệu quả, tránh bỏ sót như thông báo đẩy (push notification) thông thường.
- **Giải pháp**: Tích hợp Open API để thực hiện cuộc gọi VoIP trực tiếp tới tài khoản SDK của khách hàng, hỗ trợ tuỳ chỉnh tên hiển thị và thông tin cuộc gọi.
  :::

## Sơ đồ nghiệp vụ

### Luồng tuần tự Backend

![Luồng tuần tự Backend](/CampainCall/LuongBackend.png)

### Usecase khách hàng dùng SDK

![Usecase khách hàng dùng SDK](/CampainCall/LuongKhachHang.png)

Khi hệ thống đối tác tạo cuộc gọi cảnh báo bằng Open API của VBot, tất cả các tài khoản SDK của khách hàng được khai báo trong `member_infos` sẽ nhận được cuộc gọi. Nội dung cuộc gọi được phát sẽ tùy theo **kịch bản cuộc gọi** đã chọn. Thông tin cuộc gọi hiển thị trên máy khách hàng (tên hiển thị, thời gian gọi) là thông tin đối tác đã truyền khi tạo cuộc gọi.

## Quy trình tích hợp Backend

### Tạo tài khoản & Lấy Token SDK

Phía Backend gọi API để tạo hoặc lấy JWT token cấp quyền cho SDK Client kèm theo `member_no`. Đối với tài khoản nhân viên/khách hàng mới chưa có trên hệ thống (`member_no` chưa tồn tại), hệ thống sẽ tự động khởi tạo thành viên.

**Chi tiết API đã có trong tài liệu**: Xem tại [Tạo tài khoản & lấy Token SDK (One-Step Provisioning)](/open-api/v3/member-sdk#tao-tai-khoan-lay-token-sdk-one-step-provisioning).

### Lấy thông tin tài khoản SDK

Sau khi tạo tài khoản SDK thành công, đối tác gọi API để lấy thông tin tài khoản và lưu `member_no` vào cơ sở dữ liệu phục vụ bước tạo cuộc gọi tiếp theo.

**Chi tiết API đã có trong tài liệu**: Xem tại [Lấy thông tin thành viên theo mã](/open-api/v3/member#lay-thong-tin-thanh-vien-theo-ma).

### Tạo cuộc gọi tự động đến tài khoản SDK

Để khởi tạo cuộc gọi cảnh báo trực tiếp tới các tài khoản SDK, đối tác gọi API dưới đây:

<div class="api-container">
  <span class="api-method method-post">POST</span>
  <span>[URL]/m-auto-call/api/call/create-list-member</span>
</div>

**Header**

| Tham số      | Giá trị            | Bắt buộc |
| :----------- | :----------------- | :------- |
| Content-Type | `application/json` | Có       |
| X-API-Key    | `token-open-api`   | Có       |

**Body Request**

| Tham số                           | Kiểu   | Bắt buộc | Mô tả                                                                                     |
| :-------------------------------- | :----- | :------- | :---------------------------------------------------------------------------------------- |
| `template_code`                   | String | Có       | Mã kịch bản cuộc gọi.                                                                     |
| `member_infos`                    | Array  | Có       | Danh sách thành viên nhận cuộc gọi (tối đa 5 thành viên).                                 |
| `display_name`                    | String | Không    | Tên hiển thị trên app khách hàng khi thực hiện gọi tự động (**không chứa khoảng trắng**). |
| `type`                            | String | Không    | Kiểu cuộc gọi, truyền chuỗi `"MEMBER"` (mặc định nhận diện theo endpoint gọi).            |
| `max_time`                        | Int    | Không    | Thời gian gọi tối đa (giây). Mặc định: `-1` (không giới hạn).                             |
| `max_waiting_time`                | Int    | Không    | Thời gian tối đa chờ khách hàng nhấc máy (giây). Mặc định: `30`.                          |
| `member_infos[].member_no`        | String | Có       | Số nội bộ / mã thành viên SDK (chỉ chấp nhận chữ và số: a-zA-Z0-9).                       |
| `member_infos[].external_call_id` | String | Không    | Mã định danh cuộc gọi phía đối tác (dùng để mapping khi truy vấn CDR).                    |
| `member_infos[].name`             | String | Không    | Tên thành viên.                                                                           |
| `member_infos[].datas`            | Object | Không    | Dữ liệu biến thay thế trong kịch bản (key là `cfkey` từ custom field).                    |

<div class="note">
<strong>Lưu ý:</strong>
<ul>
  <li>Tối đa <strong>5 thành viên</strong> trong một yêu cầu (tính sau khi loại trùng theo trường <code>member_no</code>).</li>
  <li>Hệ thống <strong>tự động loại bỏ thành viên trùng lặp</strong> (giữ lại bản ghi đầu tiên).</li>
  <li>Độ dài <code>external_call_id</code> tối đa: <strong>32 ký tự</strong>, chỉ sử dụng các ký tự chữ thường (<code>a</code>–<code>z</code>) và chữ số (<code>0</code>–<code>9</code>), <strong>không</strong> chứa ký tự đặc biệt, chữ in hoa hoặc khoảng trắng.</li>
</ul>
</div>

**Ví dụ Request**

```json
{
  "display_name": "CanhBaoKhanCap",
  "type": "MEMBER",
  "template_code": "TMP_26070909305271137",
  "max_time": 120,
  "max_waiting_time": 30,
  "member_infos": [
    {
      "external_call_id": "extcall001",
      "member_no": "agent001",
      "name": "Nguyễn Văn A",
      "datas": {
        "order_content": "Thông báo đơn hàng bị hủy",
        "order_cod": "150000"
      }
    }
  ]
}
```

**Response**

| Tham số     | Kiểu    | Mô tả                                 |
| :---------- | :------ | :------------------------------------ |
| `status`    | Int     | Mã trạng thái HTTP (`200`, `500`)     |
| `msg`       | String  | Thông báo phản hồi                    |
| `errorCode` | Int     | Mã lỗi nghiệp vụ                      |
| `data`      | Boolean | Kết quả tạo cuộc gọi (`true`/`false`) |

**Ví dụ Response**

Thành công:

```json
{
  "status": 200,
  "msg": "Success",
  "errorCode": 0,
  "data": true
}
```

Lỗi (`member_infos` là null):

```json
{
  "status": 500,
  "msg": "memberInfos is null",
  "errorCode": -1,
  "data": false
}
```

Lỗi (vượt quá 5 member):

```json
{
  "status": 500,
  "msg": "error",
  "errorCode": 403,
  "data": null
}
```

**Bảng mã lỗi**

| errorCode | status | Mô tả                                           |
| --------- | ------ | ----------------------------------------------- |
| `0`       | `200`  | Thành công                                      |
| `-1`      | `500`  | `member_infos` là `null`                        |
| `403`     | `500`  | Vượt quá giới hạn 5 member (sau khi loại trùng) |
| `500`     | `500`  | Lỗi hệ thống                                    |

### Các API hỗ trợ liên quan

Các API được sử dụng để lấy thông tin cần thiết trước khi tạo cuộc gọi đã có sẵn trong tài liệu:

1. **Lấy danh sách thành viên & `member_no`**:  
   Xem tại [Lấy danh sách thành viên](/open-api/v3/member#lay-danh-sach-thanh-vien).
2. **Lấy danh sách kịch bản mẫu & `template_code`**:
   Lấy danh sách kịch bản mẫu và mã của từng kịch bản (trả qua param `code`). Mỗi cuộc gọi tự động sẽ sử dụng 1 kịch bản, tương ứng với 1 `template_code` truyền vào.
   Xem tại [Lấy danh sách kịch bản](/open-api/v3/campaign-template#lay-danh-sach-kich-ban).

3. **Lấy các biến tùy chỉnh trong kịch bản (`datas`)**:  
   Với các kịch bản có biến tuỳ chỉnh (custom field), đối tác gọi API để lấy danh sách các biến trong kịch bản đó (Tải danh sách biến tuỳ chỉnh ngay sau khi chọn kịch bản). Các biến và giá trị sẽ được truyền vào `datas` (key là `cfkey`) của `member_infos` trong API tạo cuộc gọi tự động.
   Xem tại [Lấy trường tùy chỉnh trong kịch bản](/open-api/v3/campaign-call#lay-truong-tuy-chinh-trong-kich-ban).

## Nhận sự kiện thông qua Webhook sau khi kết thúc cuộc gọi

Đối với mỗi cuộc gọi tự động tới khách hàng, sau khi cuộc gọi kết thúc, VBot sẽ tự động gửi sự kiện (event) Webhook về URL đã được đối tác cấu hình từ trước.

Các bản tin sự kiện nhận được bao gồm:

- [`AUTO_CALL_COMPLETE`](/open-api/v3/webhooks#auto-call-complete): Bản tin đầy đủ thông tin cuộc gọi, ghi âm và dữ liệu AI trích xuất.
- [`AUTO_CALL_AI_EXTRACTION`](/open-api/v3/webhooks#auto-call-ai-extraction): Bản tin trích xuất dữ liệu trả lời của khách hàng từ AI.
- [`AUTO_CALL_RECORDING`](/open-api/v3/webhooks#auto-call-recording): Bản tin chứa link file ghi âm cuộc gọi.

**Chi tiết cấu hình Webhook và cấu trúc payload**: Xem tại [Webhooks - Event Auto Call](/open-api/v3/webhooks#auto_call_complete) và [Lịch sử gọi tự động](/open-api/v3/campaign-cdr).
