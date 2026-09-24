---
outline: deep
---

# Lịch sử cuộc gọi

API quản lý và tra cứu dữ liệu lịch sử cuộc gọi.

## Lấy danh sách lịch sử cuộc gọi {#lay-danh-sach-lich-su-cuoc-goi}

Lấy danh sách tất cả cuộc gọi (theo nhóm) của dự án. Hỗ trợ phân trang và nhiều điều kiện lọc

Nếu tham số lọc số truyền giá trị `-1` sẽ được hiểu là **bỏ qua điều kiện lọc đó**.

<div class="api-container">
  <span class="api-method method-get">GET</span>
  <span>[URL]/m-cdr/api/call/get-all?key_search={key_search}&group_member_no={group_member_no}&hotline={hotline}&disposition={disposition}&customer_code={customer_code}&from={from}&to={to}&type_call={type_call}&min_postage={min_postage}&max_postage={max_postage}&has_hotline={has_hotline}&page={page}&size={size}</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Tham số**

| Tham số         | Kiểu   | Bắt buộc | Mô tả                                                                                              |
| --------------- | ------ | -------- | -------------------------------------------------------------------------------------------------- |
| key_search      | String |          | Từ khóa tìm kiếm (số điện thoại)                                                                   |
| group_member_no | String |          | Mã nhóm nhân viên (ví dụ: `mem_12345`)                                                             |
| hotline         | String |          | Số hotline sử dụng (ví dụ: `19001001`)                                                             |
| disposition     | String |          | Trạng thái cuộc gọi (xem [Bảng tra cứu trạng thái](#bang-tra-cuu-trang-thai))                      |
| customer_code   | String |          | Mã khách hàng (ví dụ: `cus_556677`)                                                                |
| from            | Long   |          | Thời gian bắt đầu (Unix timestamp - epoch milliseconds)                                            |
| to              | Long   |          | Thời gian kết thúc (Unix timestamp - epoch milliseconds)                                           |
| type_call       | Int    |          | Loại cuộc gọi (xem bảng [Phân loại cuộc gọi](#loai-cuoc-goi-type-call)). Mặc định: `-1` (tất cả)   |
| min_postage     | Double |          | Cước phí tối thiểu. Mặc định: `-1` (bỏ qua)                                                        |
| max_postage     | Double |          | Cước phí tối đa. Mặc định: `-1` (bỏ qua)                                                           |
| page            | Int    |          | Trang hiện tại (bắt đầu từ `0`, mặc định: `0`)                                                     |
| size            | Int    |          | Số lượng bản ghi mỗi trang (mặc định: `20`)                                                        |
| has_hotline     | Int    |          | Lọc hotline: `-1` hoặc để trống (có hotline), `0` (không có hotline), `1` (tất cả). Mặc định: `-1` |

**Response**

| Tham số | Kiểu         | Mô tả                                  |
| ------- | ------------ | -------------------------------------- |
| error   | Int          | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message | String       | Thông báo kết quả                      |
| data    | List[Object] | Danh sách cuộc gọi theo nhóm           |

**Cấu trúc phần tử trong `data` (Thông tin cuộc gọi):**

| Tham số                  | Kiểu    | Mô tả                                                                         |
| ------------------------ | ------- | ----------------------------------------------------------------------------- |
| trans_id                 | String  | Mã giao dịch cuộc gọi                                                         |
| group_id                 | String  | ID nhóm cuộc gọi                                                              |
| create_at                | Long    | Thời điểm tạo cuộc gọi (Unix timestamp - ms)                                  |
| call_at                  | Long    | Thời điểm bắt đầu đàm thoại (Unix timestamp - ms)                             |
| caller_info              | Object  | Thông tin người gọi (xem bảng [CallPartyInfo](#call-party-info))              |
| callee_info              | Object  | Thông tin người nghe (xem bảng [CallPartyInfo](#call-party-info))             |
| hotline                  | String  | Số hotline sử dụng                                                            |
| type_call                | Int     | Loại cuộc gọi (xem bảng [Phân loại cuộc gọi](#loai-cuoc-goi-type-call))       |
| end_call                 | String  | Kênh/Bên kết thúc cuộc gọi (`CALLER`, `CALLEE`,...)                           |
| postage                  | Double  | Cước phí cuộc gọi                                                             |
| time_call                | Int     | Thời gian đàm thoại (giây)                                                    |
| duration                 | Int     | Tổng thời lượng cuộc gọi bao gồm cả đổ chuông (giây)                          |
| disposition              | String  | Trạng thái cuộc gọi (xem [Bảng tra cứu trạng thái](#bang-tra-cuu-trang-thai)) |
| is_record                | Boolean | `true` nếu có file ghi âm, `false` nếu không có ghi âm                        |
| customer_code            | String  | Mã khách hàng trong hệ thống                                                  |
| payment_channel          | String  | Kênh thanh toán (ví dụ: `MONEY`)                                              |
| group_member_no          | String  | Mã nhóm nhân viên phụ trách                                                   |
| external_call_id         | String  | Mã cuộc gọi từ hệ thống bên ngoài                                             |
| auto_dial_service_charge | Double  | Phí dịch vụ gọi tự động                                                       |

<div id="call-party-info" style="scroll-margin-top: 80px;"></div>

**Cấu trúc đối tượng `CallPartyInfo` (`caller_info` / `callee_info`):**

| Tham số    | Kiểu   | Mô tả                                                     |
| ---------- | ------ | --------------------------------------------------------- |
| member_no  | String | Mã nhánh/thành viên (caller_member_no / callee_member_no) |
| number     | String | Đầu số điện thoại                                         |
| name       | String | Tên người gọi / người nghe                                |
| channel    | String | Kênh kết nối (ví dụ: `SIP/1000`, `PSTN`)                  |
| type       | String | Loại đối tượng (`USER`, `Phone`, `SIP`,...)               |
| telco_code | String | Mã nhà mạng viễn thông (`VTL`, `VNP`, `VMS`,...)          |

**Ví dụ response**

```json
{
  "error": 0,
  "message": "SUCCESS",
  "data": [
    {
      "create_at": 1712034000000,
      "call_at": 1712034002000,
      "group_id": "GRP_98765",
      "caller_info": {
        "member_no": "MEM_001",
        "number": "0987654321",
        "name": "Nguyen Van A",
        "channel": "SIP/1000",
        "type": "USER",
        "telco_code": ""
      },
      "callee_info": {
        "member_no": "MEM_002",
        "number": "0123456789",
        "name": "Khách Hàng",
        "channel": "PSTN",
        "type": "Phone",
        "telco_code": "VTL"
      },
      "hotline": "19001000",
      "type_call": 1,
      "end_call": "CALLER",
      "postage": 1500.0,
      "time_call": 120,
      "duration": 135,
      "disposition": "ANSWERED",
      "trans_id": "CALL_ABC123",
      "is_record": true,
      "customer_code": "cus_556677",
      "payment_channel": "MONEY",
      "group_member_no": "mem_12345",
      "external_call_id": "ext_9999",
      "auto_dial_service_charge": 0.0
    }
  ]
}
```

**Bảng mã lỗi**

| error | Mô tả                                             |
| ----- | ------------------------------------------------- |
| `0`   | Thành công                                        |
| `409` | API Key không hợp lệ hoặc không có quyền truy cập |
| `500` | Lỗi hệ thống                                      |

---

## Lấy số lượng cuộc gọi {#dem-so-luong-cuoc-goi}

Lấy tổng số lượng cuộc gọi theo các điều kiện lọc

Nếu tham số lọc số truyền giá trị `-1` sẽ được hiểu là **bỏ qua điều kiện lọc đó**.

<div class="api-container">
  <span class="api-method method-get">GET</span>
  <span>[URL]/m-cdr/api/call/count-all?key_search={key_search}&group_member_no={group_member_no}&hotline={hotline}&disposition={disposition}&customer_code={customer_code}&from={from}&to={to}&type_call={type_call}&min_postage={min_postage}&max_postage={max_postage}&has_hotline={has_hotline}&page={page}&size={size}</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Tham số**

| Tham số         | Kiểu   | Bắt buộc | Mô tả                                                                                              |
| --------------- | ------ | -------- | -------------------------------------------------------------------------------------------------- |
| key_search      | String |          | Từ khóa tìm kiếm (số điện thoại)                                                                   |
| group_member_no | String |          | Mã nhóm nhân viên (ví dụ: `mem_12345`)                                                             |
| hotline         | String |          | Số hotline sử dụng (ví dụ: `19001001`)                                                             |
| disposition     | String |          | Trạng thái cuộc gọi (xem [Bảng tra cứu trạng thái](#bang-tra-cuu-trang-thai))                      |
| customer_code   | String |          | Mã khách hàng (ví dụ: `cus_556677`)                                                                |
| from            | Long   |          | Thời gian bắt đầu (Unix timestamp - epoch milliseconds)                                            |
| to              | Long   |          | Thời gian kết thúc (Unix timestamp - epoch milliseconds)                                           |
| type_call       | Int    |          | Loại cuộc gọi (xem bảng [Phân loại cuộc gọi](#loai-cuoc-goi-type-call)). Mặc định: `-1` (tất cả)   |
| min_postage     | Double |          | Cước phí tối thiểu. Mặc định: `-1` (bỏ qua)                                                        |
| max_postage     | Double |          | Cước phí tối đa. Mặc định: `-1` (bỏ qua)                                                           |
| page            | Int    |          | Trang hiện tại (bắt đầu từ `0`, mặc định: `0`)                                                     |
| size            | Int    |          | Số lượng bản ghi mỗi trang (mặc định: `20`)                                                        |
| has_hotline     | Int    |          | Lọc hotline: `-1` hoặc để trống (có hotline), `0` (không có hotline), `1` (tất cả). Mặc định: `-1` |

**Response**

| Tham số | Kiểu   | Mô tả                                     |
| ------- | ------ | ----------------------------------------- |
| error   | Int    | Mã lỗi (0: Thành công, khác 0: Có lỗi)    |
| message | String | Thông tin kết quả                         |
| data    | Int    | Tổng số lượng cuộc gọi thỏa mãn điều kiện |

**Ví dụ response**

```json
{
  "error": 0,
  "message": "SUCCESS",
  "data": 1450
}
```

**Bảng mã lỗi**

| error | Mô tả                                             |
| ----- | ------------------------------------------------- |
| `0`   | Thành công                                        |
| `409` | API Key không hợp lệ hoặc không có quyền truy cập |
| `500` | Lỗi hệ thống                                      |

---

## Lấy chi tiết cuộc gọi {#lay-chi-tiet-cuoc-goi}

Lấy danh sách chi tiết các luồng của một cuộc gọi thông qua `group_id`

<div class="api-container">
  <span class="api-method method-get">GET</span>
  <span>[URL]/m-cdr/api/call/get-detail?group_id={group_id}</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Tham số**

| Tham số  | Kiểu   | Bắt buộc | Mô tả                                       |
| -------- | ------ | -------- | ------------------------------------------- |
| group_id | String | Có       | ID nhóm cuộc gọi (lấy từ trường `group_id`) |

**Response**

| Tham số | Kiểu         | Mô tả                                  |
| ------- | ------------ | -------------------------------------- |
| error   | Int          | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message | String       | Thông tin kết quả                      |
| data    | List[Object] | Danh sách chi tiết các luồng cuộc gọi  |

**Cấu trúc phần tử trong `data` (Chi tiết luồng cuộc gọi):**

| Tham số                  | Kiểu    | Mô tả                                                                          |
| ------------------------ | ------- | ------------------------------------------------------------------------------ |
| trans_id                 | String  | Mã giao dịch của luồng cuộc gọi                                                |
| group_id                 | String  | ID nhóm cuộc gọi                                                               |
| create_at                | Long    | Thời điểm tạo (Unix timestamp - ms)                                            |
| call_at                  | Long    | Thời điểm bắt đầu đàm thoại (Unix timestamp - ms)                              |
| time_call                | Int     | Thời lượng đàm thoại của luồng (giây)                                          |
| duration                 | Int     | Tổng thời lượng của luồng (giây)                                               |
| caller_info              | Object  | Thông tin người gọi (xem bảng [CallPartyInfo](#call-party-info))               |
| callee_info              | Object  | Thông tin người nghe (xem bảng [CallPartyInfo](#call-party-info))              |
| disposition              | String  | Trạng thái của luồng (xem [Bảng tra cứu trạng thái](#bang-tra-cuu-trang-thai)) |
| hangup_cause             | String  | Nguyên nhân kết thúc (xem [Bảng tra cứu trạng thái](#bang-tra-cuu-trang-thai)) |
| sip_code                 | String  | Mã SIP response (xem [Bảng tra cứu trạng thái](#bang-tra-cuu-trang-thai))      |
| end_call                 | String  | Bên kết thúc luồng gọi (`CALLER`, `CALLEE`)                                    |
| hotline                  | String  | Số hotline                                                                     |
| is_record                | Boolean | `true` nếu luồng này có file ghi âm                                            |
| postage                  | Double  | Cước phí phát sinh ở luồng này                                                 |
| conference_id            | String  | ID phòng hội nghị (nếu có)                                                     |
| payment_channel          | String  | Kênh thanh toán                                                                |
| auto_dial_service_charge | Double  | Phí dịch vụ gọi tự động                                                        |
| customer_code            | String  | Mã khách hàng                                                                  |
| type_call                | Int     | Loại cuộc gọi (xem bảng [Phân loại cuộc gọi](#loai-cuoc-goi-type-call))        |
| external_call_id         | String  | Mã cuộc gọi từ hệ thống bên ngoài                                              |
| group_member_no          | String  | Mã nhóm nhân viên                                                              |

**Ví dụ response**

```json
{
  "error": 0,
  "message": "SUCCESS",
  "data": [
    {
      "create_at": 1712034000000,
      "call_at": 1712034002000,
      "time_call": 120,
      "duration": 135,
      "trans_id": "CALL_ABC123",
      "group_id": "GRP_98765",
      "caller_info": {
        "member_no": "MEM_001",
        "number": "0987654321",
        "name": "Nguyen Van A",
        "channel": "SIP/1000",
        "type": "USER",
        "telco_code": ""
      },
      "callee_info": {
        "member_no": "MEM_002",
        "number": "0123456789",
        "name": "Khách Hàng",
        "channel": "PSTN",
        "type": "Phone",
        "telco_code": "VTL"
      },
      "disposition": "ANSWERED",
      "hangup_cause": "NORMAL_CLEARING",
      "sip_code": "200",
      "end_call": "CALLER",
      "hotline": "19001000",
      "is_record": true,
      "postage": 1500.0,
      "conference_id": "",
      "payment_channel": "MONEY",
      "auto_dial_service_charge": 0.0,
      "customer_code": "cus_556677",
      "type_call": 1,
      "external_call_id": "ext_9999",
      "group_member_no": "mem_12345"
    }
  ]
}
```

**Bảng mã lỗi**

| error | Mô tả                                             |
| ----- | ------------------------------------------------- |
| `0`   | Thành công                                        |
| `409` | API Key không hợp lệ hoặc không có quyền truy cập |
| `500` | Lỗi hệ thống                                      |

---

## Lấy file ghi âm cuộc gọi {#lay-file-ghi-am-cuoc-goi}

Lấy file ghi âm của cuộc gọi có trường `is_record: true`.

<div class="api-container">
  <span class="api-method method-get">GET</span>
  <span>[URL]/api/crm/historycall/record/{trans_id}</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Tham số**

| Tham số  | Kiểu   | Bắt buộc | Mô tả                                            |
| -------- | ------ | -------- | ------------------------------------------------ |
| trans_id | String | Có       | Mã giao dịch cuộc gọi (lấy từ trường `trans_id`) |

**Response**

File ghi âm cuộc gọi.

**Bảng mã lỗi**

| error | Mô tả                                             |
| ----- | ------------------------------------------------- |
| `0`   | Thành công                                        |
| `404` | Không tìm thấy file ghi âm                        |
| `409` | API Key không hợp lệ hoặc không có quyền truy cập |
| `500` | Lỗi hệ thống                                      |

---

## Phân loại, Trạng thái và Nguyên nhân kết thúc cuộc gọi {#phan-loai-trang-thai-va-nguyen-nhan-ket-thuc-cuoc-goi}

### Phân loại cuộc gọi (`type_call`) {#loai-cuoc-goi-type-call}

| Giá trị | Tên loại | Mô tả                                                     |
| ------- | -------- | --------------------------------------------------------- |
| `1`     | Inbound  | Cuộc gọi vào tổng đài                                     |
| `2`     | Outbound | Cuộc gọi ra từ tổng đài                                   |
| `3`     | MissCall | Cuộc gọi nhỡ                                              |
| `-1`    | Tất cả   | Áp dụng khi truyền làm tham số lọc để lấy tất cả các loại |

### Bảng tra cứu trạng thái {#bang-tra-cuu-trang-thai}

<span id="bang-tra-cuu-trang-thai-ket-hop"></span><span id="trang-thai-cuoc-goi-disposition"></span><span id="nguyen-nhan-ket-thuc-cuoc-goi-hangup-cause"></span>

Dưới đây là sự tương quan giữa các mã `sip_code`, `disposition`, `hangup_cause` và ý nghĩa chi tiết của chúng trên hệ thống:

| sip_code | disposition                 | hangup_cause                | Ý nghĩa                                        |
| -------- | --------------------------- | --------------------------- | ---------------------------------------------- |
| `200`    | `ANSWER`                    | `NORMAL_CLEARING`           | Nghe máy                                       |
| `400`    | `BAD_REQUEST`               | `NORMAL_TEMPORARY_FAILURE`  | Sai thông tin                                  |
| `401`    | `UNAUTHORIZED`              | `UNAUTHORIZED`              | Chưa xác thực                                  |
| `402`    | `OUT_OF_MONEY`              | `OUT_OF_MONEY`              | Số dư tài khoản không đủ để thực hiện cuộc gọi |
| `403`    | `DO_NOT_CALL`               | `DO_NOT_CALL`               | Người nhận chặn cuộc gọi quảng cáo             |
| `404`    | `NOT_FOUND`                 | `UNALLOCATED_NUMBER`        | Số không tồn tại                               |
| `405`    | `CALL_INTERVAL_NOT_ALLOWED` | `CALL_INTERVAL_NOT_ALLOWED` | Khung giờ gọi không được phép                  |
| `406`    | `MEMBER_NOT_ACTIVATED`      | `MEMBER_NOT_ACTIVATED`      | Thành viên chưa được kích hoạt                 |
| `407`    | `MEMBER_NOT_IN_PROJECT`     | `MEMBER_NOT_IN_PROJECT`     | Thành viên không thuộc dự án                   |
| `408`    | `TIME_OUT`                  | `RECOVERY_ON_TIMER_EXPIRE`  | Hết thời gian chờ                              |
| `409`    | `DO_NOT_DISTURB`            | `DO_NOT_DISTURB`            | Không làm phiền                                |
| `410`    | `GONE`                      | `NUMBER_CHANGED`            | Số không còn tồn tại                           |
| `411`    | `ABSENT`                    | `ABSENT`                    | Vắng mặt                                       |
| `412`    | `PACKAGE_EXPIRED`           | `PACKAGE_EXPIRED`           | Gói cước đã hết hạn                            |
| `413`    | `HOTLINE_NOT_SUPPORT_TELCO` | `HOTLINE_NOT_SUPPORT_TELCO` | Hotline không hỗ trợ nhà mạng                  |
| `414`    | `TELCO_NOT_FOUND`           | `TELCO_NOT_FOUND`           | Không tìm thấy nhà mạng theo số điện thoại     |
| `415`    | `INVALID_PARAMETER`         | `INVALID_PARAMETER`         | Tham số không hợp lệ                           |
| `416`    | `PROJECT_EXPIRED`           | `PROJECT_EXPIRED`           | Dự án đã hết hạn                               |
| `480`    | `NOANSWER`                  | `NO_USER_RESPONSE`          | Người nhận tạm thời không liên lạc được        |
| `486`    | `BUSY`                      | `USER_BUSY`                 | Người nhận tạm thời đang bận                   |
| `487`    | `CANCEL`                    | `ORIGINATOR_CANCEL`         | Người gọi hủy                                  |
| `500`    | `SERVER_ERROR`              | `NORMAL_TEMPORARY_FAILURE`  | Lỗi kết nối                                    |
| `502`    | `BAD_GATEWAY`               | `DESTINATION_OUT_OF_ORDER`  | Lỗi đường truyền                               |
| `603`    | `DECLINE`                   | `CALL_REJECTED`             | Người nhận từ chối cuộc gọi                    |

---

## Các API phiên bản cũ (Deprecated) {#cac-api-phien-ban-cu-deprecated}

::: warning Khuyến nghị
Các API dưới đây thuộc phiên bản cũ (Deprecated). Hệ thống **vẫn đang tiếp tục hỗ trợ và duy trì hoạt động bình thường**. Tuy nhiên, VBot **khuyến nghị** quý khách hàng ưu tiên chuyển sang sử dụng các API phiên bản mới ở trên (`/m-cdr/api/call/get-all`, `/m-cdr/api/call/count-all`) để tối ưu hiệu năng và được cập nhật các tính năng mới nhất trong tương lai.
:::

### Lấy danh sách lịch sử cuộc gọi (Deprecated) {#lay-danh-sach-lich-su-cuoc-goi-deprecated}

API lấy danh sách lịch sử cuộc gọi (phiên bản cũ).

<div class="api-container">
  <span class="api-method method-get">GET</span>
  <span>[URL]/api/crm/historycall/getAll?phone={phone}&page={page}&size={size}</span>
</div>

Hoặc lọc theo khoảng thời gian:

<div class="api-container">
  <span class="api-method method-get">GET</span>
  <span>[URL]/api/crm/historycall/getAll?from={from}&to={to}&phone={phone}&page={page}&size={size}</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Tham số**

| Tham số | Kiểu   | Mô tả                 |
| ------- | ------ | --------------------- |
| phone   | String | Số điện thoại         |
| from    | Int    | Từ ngày (timestamp)   |
| to      | Int    | Đến ngày (timestamp)  |
| page    | Int    | Số trang              |
| size    | Int    | Số lượng trên 1 trang |

**Response**

| Tham số | Kiểu   | Mô tả                                  |
| ------- | ------ | -------------------------------------- |
| error   | Int    | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message | String | Thông tin                              |
| data    | Object | Danh sách lịch sử cuộc gọi             |

**Ví dụ response**

```json
{
  "error": 0,
  "message": "success",
  "data": [
    {
      "hotline_number": "19001001",
      "date_create": "02/27/2026 14:33:47",
      "caller": [
        {
          "phone": "0987654321",
          "date_create": "02/27/2026 14:33:47",
          "disposition": "answer",
          "time_call": "120",
          "postage": 1500.0,
          "duration_call": 135,
          "source": "App_SDK",
          "member_no": "MEM_001"
        }
      ],
      "callee": [
        {
          "phone": "0123456789",
          "date_create": "02/27/2026 14:33:47",
          "disposition": "answer",
          "time_call": "120",
          "postage": 1500.0,
          "duration_call": 135,
          "source": "Phone",
          "member_no": "MEM_002"
        }
      ],
      "time_call": "120",
      "duration_call": "135",
      "type_call": "OUTCALL",
      "group_id": "GRP_98765",
      "disposition": "answer",
      "record_file": ["https://recordings.vbot.vn/sample.mp3"],
      "external_call_id": "sample_ext_id"
    }
  ]
}
```

---

### Lấy số lượng cuộc gọi (Deprecated) {#lay-so-luong-cuoc-goi-deprecated}

API đếm tổng số lượng cuộc gọi (phiên bản cũ).

<div class="api-container">
  <span class="api-method method-get">GET</span>
  <span>[URL]/api/crm/historycall/countAll?phone={phone}</span>
</div>

Hoặc lọc theo khoảng thời gian:

<div class="api-container">
  <span class="api-method method-get">GET</span>
  <span>[URL]/api/crm/historycall/countAll?from={from}&to={to}&phone={phone}</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Tham số**

| Tham số | Kiểu   | Mô tả                |
| ------- | ------ | -------------------- |
| phone   | String | Số điện thoại        |
| from    | Int    | Từ ngày (timestamp)  |
| to      | Int    | Đến ngày (timestamp) |

**Response**

| Tham số | Kiểu   | Mô tả                                  |
| ------- | ------ | -------------------------------------- |
| error   | Int    | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message | String | Thông tin                              |
| data    | Int    | Dữ liệu trả về (số lượng cuộc gọi)     |

**Ví dụ response**

```json
{
  "error": 0,
  "message": "success",
  "data": 128
}
```
