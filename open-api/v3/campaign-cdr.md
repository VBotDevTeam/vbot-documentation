---
outline: deep
---

# Lịch sử gọi Campaign

API tra cứu lịch sử cuộc gọi trong chiến dịch tự động và các sự kiện Webhook nhận dữ liệu cuộc gọi.

## Webhook: Cuộc gọi tự động hoàn tất

Khi một cuộc gọi tự động (auto call) hoàn tất, hệ thống sẽ gửi webhook event `AUTO_CALL_COMPLETE` tới URL đã đăng ký. Bản tin chứa đầy đủ thông tin: **lịch sử cuộc gọi**, **ghi âm** và **dữ liệu AI trích xuất**.

**Event**: `AUTO_CALL_COMPLETE`

**Phương thức**: `POST` — Hệ thống gửi tới webhook URL đã cấu hình

### Cấu trúc payload

Payload gồm 3 phần chính:

| Phần                 | Kiểu   | Mô tả                                   |
| -------------------- | ------ | --------------------------------------- |
| autoCallLog          | Object | Thông tin chi tiết cuộc gọi             |
| autoCallAIExtraction | Object | Dữ liệu AI trích xuất từ cuộc hội thoại |
| autoCallRecording    | Object | Thông tin ghi âm cuộc gọi               |

### `autoCallLog` — Lịch sử cuộc gọi

| Tham số             | Kiểu   | Mô tả                                                                                      |
| ------------------- | ------ | ------------------------------------------------------------------------------------------ |
| phone               | String | Số điện thoại khách hàng                                                                   |
| duration            | Int    | Tổng thời lượng cuộc gọi (giây)                                                            |
| billsec             | Int    | Thời lượng tính cước (giây)                                                                |
| disposition         | String | Trạng thái cuộc gọi (xem tại [Bảng tra cứu trạng thái](#bang-tra-cuu-trang-thai-autocall)) |
| hotlineCode         | String | Mã hotline (số tổng đài)                                                                   |
| inputLog            | String | Log tương tác DTMF của khách hàng                                                          |
| voiceText           | String | Nội dung thoại đã chuyển thành văn bản (STT)                                               |
| postage             | Double | Cước phí cuộc gọi                                                                          |
| serviceCharge       | Double | Phí dịch vụ                                                                                |
| memberName          | String | Tên thành viên thực hiện                                                                   |
| memberAccId         | String | Account ID thành viên                                                                      |
| answerAt            | Long   | Thời điểm nghe máy (Unix timestamp ms)                                                     |
| endCallAt           | Long   | Thời điểm kết thúc cuộc gọi (Unix timestamp ms)                                            |
| botId               | String | ID của bot xử lý cuộc gọi                                                                  |
| campaignName        | String | Tên chiến dịch                                                                             |
| campaignGroupName   | String | Tên nhóm chiến dịch                                                                        |
| templateScriptCode  | String | Mã kịch bản template                                                                       |
| templateScriptName  | String | Tên kịch bản template                                                                      |
| transId             | String | Mã giao dịch cuộc gọi (duy nhất)                                                           |
| createAt            | Long   | Thời điểm tạo cuộc gọi (Unix timestamp ms)                                                 |
| postageService      | Double | Cước dịch vụ bổ sung                                                                       |
| postageBotService   | Double | Cước dịch vụ bot                                                                           |
| telcoCode           | String | Mã nhà mạng (`VTL`, `VNP`, `VMS`, ...)                                                     |
| projectCode         | String | Mã dự án                                                                                   |
| callNet             | String | Loại cuộc gọi (`OFFNET`, `ONNET`)                                                          |
| metaData            | String | Dữ liệu meta (JSON string) — các biến đầu vào kịch bản                                     |
| metaDataDescription | String | Mô tả các trường meta (JSON string)                                                        |
| externalCallId      | String | Mã cuộc gọi từ hệ thống bên ngoài                                                          |
| callCollectedData   | String | Dữ liệu thu thập từ cuộc gọi (JSON string) — bao gồm cả kết quả AI                         |

<div id="bang-tra-cuu-trang-thai-autocall" style="scroll-margin-top: 80px;"></div>

**Bảng tra cứu trạng thái**

Dưới đây là các trạng thái `disposition` và ý nghĩa chi tiết:

| disposition       | Ý nghĩa                                        |
| ----------------- | ---------------------------------------------- |
| `NOT_FOUND_PRICE` | Không đủ tiền                                  |
| `NOT_FOUND_TELCO` | Không tìm thấy nhà mạng                        |
| `ANSWER`          | Nghe máy                                       |
| `NOANSWER`        | Người nhận tạm thời không liên lạc được        |
| `BUSY`            | Người nhận tạm thời đang bận                   |
| `NOT_MONEY`       | Số dư tài khoản không đủ để thực hiện cuộc gọi |
| `SERVER_ERROR`    | Lỗi kết nối                                    |

### `autoCallAIExtraction` — Dữ liệu AI trích xuất

| Tham số           | Kiểu   | Mô tả                                                              |
| ----------------- | ------ | ------------------------------------------------------------------ |
| transId           | String | Mã giao dịch cuộc gọi                                              |
| externalCallId    | String | Mã cuộc gọi từ hệ thống bên ngoài                                  |
| callCollectedData | String | Kết quả AI trích xuất (JSON string) — danh sách các trường dữ liệu |

**Cấu trúc mỗi item trong `callCollectedData`:**

| Tham số     | Kiểu   | Mô tả                      |
| ----------- | ------ | -------------------------- |
| cfkey       | String | Key của trường dữ liệu     |
| cfname      | String | Tên hiển thị               |
| cfvalue     | String | Giá trị AI trích xuất được |
| description | String | Mô tả trường dữ liệu       |

### `autoCallRecording` — Ghi âm cuộc gọi

| Tham số        | Kiểu   | Mô tả                                      |
| -------------- | ------ | ------------------------------------------ |
| transId        | String | Mã giao dịch cuộc gọi                      |
| externalCallId | String | Mã cuộc gọi từ hệ thống bên ngoài          |
| recordUrl      | String | URL tải file ghi âm (yêu cầu Bearer token) |

<div class="note">
<strong>Lưu ý về giá trị <code>externalCallId</code>:</strong><br/>
Giá trị <code>externalCallId</code> được truyền vào cần thỏa mãn các điều kiện sau:
<ul>
  <li>Độ dài tối đa: <strong>32 ký tự</strong>.</li>
  <li>Chỉ sử dụng các ký tự chữ thường (<code>a</code>–<code>z</code>) và chữ số (<code>0</code>–<code>9</code>).</li>
  <li><strong>Không</strong> chứa các ký tự đặc biệt, chữ in hoa hoặc khoảng trắng.</li>
</ul>
</div>

---

## Webhook: AI trích xuất cuộc gọi tự động

Khi AI hoàn tất trích xuất dữ liệu từ cuộc gọi tự động, hệ thống sẽ gửi webhook event `AUTO_CALL_AI_EXTRACTION` tới URL đã đăng ký.

**Event**: `AUTO_CALL_AI_EXTRACTION`

**Phương thức**: `POST` — Hệ thống gửi tới webhook URL đã cấu hình

### Cấu trúc payload

| Tham số           | Kiểu   | Mô tả                                                              |
| ----------------- | ------ | ------------------------------------------------------------------ |
| transId           | String | Mã giao dịch cuộc gọi                                              |
| externalCallId    | String | Mã cuộc gọi từ hệ thống bên ngoài                                  |
| callCollectedData | String | Kết quả AI trích xuất (JSON string) — danh sách các trường dữ liệu |

<div class="note">
<strong>Lưu ý về giá trị <code>externalCallId</code>:</strong><br/>
Giá trị <code>externalCallId</code> được truyền vào cần thỏa mãn các điều kiện sau:
<ul>
  <li>Độ dài tối đa: <strong>32 ký tự</strong>.</li>
  <li>Chỉ sử dụng các ký tự chữ thường (<code>a</code>–<code>z</code>) và chữ số (<code>0</code>–<code>9</code>).</li>
  <li><strong>Không</strong> chứa các ký tự đặc biệt, chữ in hoa hoặc khoảng trắng.</li>
</ul>
</div>

**Cấu trúc mỗi item trong `callCollectedData`:**

| Tham số     | Kiểu   | Mô tả                      |
| ----------- | ------ | -------------------------- |
| cfkey       | String | Key của trường dữ liệu     |
| cfname      | String | Tên hiển thị               |
| cfvalue     | String | Giá trị AI trích xuất được |
| description | String | Mô tả trường dữ liệu       |

---

## Webhook: Ghi âm cuộc gọi tự động

Khi file ghi âm cuộc gọi tự động sẵn sàng, hệ thống sẽ gửi webhook event `AUTO_CALL_RECORDING` tới URL đã đăng ký.

**Event**: `AUTO_CALL_RECORDING`

**Phương thức**: `POST` — Hệ thống gửi tới webhook URL đã cấu hình

### Cấu trúc payload

| Tham số        | Kiểu   | Mô tả                                      |
| -------------- | ------ | ------------------------------------------ |
| transId        | String | Mã giao dịch cuộc gọi                      |
| externalCallId | String | Mã cuộc gọi từ hệ thống bên ngoài          |
| recordUrl      | String | URL tải file ghi âm (yêu cầu Bearer token) |

<div class="note">
<strong>Lưu ý về giá trị <code>externalCallId</code>:</strong><br/>
Giá trị <code>externalCallId</code> được truyền vào cần thỏa mãn các điều kiện sau:
<ul>
  <li>Độ dài tối đa: <strong>32 ký tự</strong>.</li>
  <li>Chỉ sử dụng các ký tự chữ thường (<code>a</code>–<code>z</code>) và chữ số (<code>0</code>–<code>9</code>).</li>
  <li><strong>Không</strong> chứa các ký tự đặc biệt, chữ in hoa hoặc khoảng trắng.</li>
</ul>
</div>

---

## Lấy hội thoại bot {#lay-hoi-thoai-bot}

Lấy nội dung chi tiết hội thoại của bot AI trong cuộc gọi. Dùng cho các kịch bản có tích hợp bot AI.

<div class="api-container">
  <span class="api-method method-get">GET</span>
  <span>[URL]/m-auto-call/api/cdr/get-bot-conversation?trans_id={trans_id}&bot_id={bot_id}</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Tham số**

| Tham số    | Kiểu   | Bắt buộc | Mô tả                                                               |
| ---------- | ------ | -------- | ------------------------------------------------------------------- |
| `trans_id` | String | Có       | Mã giao dịch cuộc gọi (lấy từ CDR)                                  |
| `bot_id`   | String | Không    | Mã bot AI. Nếu không truyền, hệ thống tự lấy từ CDR theo `trans_id` |

**Response**

| Tham số   | Kiểu   | Mô tả                                             |
| --------- | ------ | ------------------------------------------------- |
| status    | Int    | HTTP Status code (`200` - Thành công)             |
| msg       | String | Thông điệp phản hồi (`Success`)                   |
| errorCode | Int    | Mã lỗi nghiệp vụ (`0` - Thành công)               |
| data      | String | Nội dung cuộc hội thoại giữa bot AI và khách hàng |

**Ví dụ response**

Thành công:

```json
{
  "status": 200,
  "msg": "Success",
  "errorCode": 0,
  "data": "assistant: Xin chào, tôi là trợ lý ảo của công ty ABC. Hôm nay tôi gọi để nhắc anh/chị về khoản thanh toán. | user: Vâng, tôi biết rồi. | assistant: Anh/chị có muốn thanh toán ngay không ạ? | user: Để tôi thanh toán chiều nay. | assistant: Dạ vâng, cảm ơn anh/chị. Chúc anh/chị một ngày tốt lành. |"
}
```

Lỗi (không tìm thấy CDR hoặc bot):

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

<div class="note">
<strong>Lưu ý:</strong>
<ul>
  <li>Nội dung hội thoại trả về dạng chuỗi, các lượt nói được phân cách bằng ký tự <code>|</code>.</li>
  <li>Mỗi lượt nói có định dạng: <code>role: content |</code>, trong đó <code>role</code> là <code>assistant</code> (bot AI) hoặc <code>user</code> (khách hàng).</li>
  <li>Nếu không truyền <code>bot_id</code>, hệ thống sẽ tự động tra cứu từ bản ghi CDR theo <code>trans_id</code>.</li>
</ul>
</div>

---

## Lấy danh sách lịch sử gọi {#lay-danh-sach-lich-su-goi}

Lấy danh sách chi tiết cuộc gọi có phân trang, hỗ trợ nhiều bộ lọc mở rộng (theo từ khóa, thời gian, trạng thái, kịch bản, cước phí, kết quả nhận diện bot AI...).

<div class="api-container">
  <span class="api-method method-get">GET</span>
  <span>[URL]/m-auto-call/api/cdr/get-all?key_search={key_search}&input_log_search={input_log_search}&disposition_search={disposition_search}&project_code={project_code}&bot_id={bot_id}&campaign_code={campaign_code}&member={member}&template_script_code={template_script_code}&status={status}&hotline={hotline}&min_postage={min_postage}&max_postage={max_postage}&start_date={start_date}&end_date={end_date}&page={page}&size={size}</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Tham số**

| Tham số              | Kiểu   | Bắt buộc | Mô tả                                                                                      |
| -------------------- | ------ | -------- | ------------------------------------------------------------------------------------------ |
| key_search           | String |          | Từ khóa tìm kiếm (SĐT, customerUid, tên)                                                   |
| input_log_search     | String |          | Lọc theo nội dung nhận dạng bot / phím bấm                                                 |
| disposition_search   | String |          | Lọc theo trạng thái cuộc gọi (xem tại [Bảng tra cứu trạng thái](#bang-tra-cuu-trang-thai)) |
| project_code         | String |          | Mã dự án. Tự lấy từ X-API-Key nếu không truyền                                             |
| bot_id               | String |          | Mã bot AI                                                                                  |
| campaign_code        | String |          | Mã chiến dịch                                                                              |
| member               | String |          | MemberUid người tạo (member chỉ xem CDR của mình)                                          |
| template_script_code | String |          | Mã kịch bản gọi                                                                            |
| status               | Int    |          | Trạng thái CDR, mặc định: -1 (tất cả)                                                      |
| hotline              | String |          | Mã hotline gọi ra                                                                          |
| min_postage          | Double |          | Cước phí tối thiểu                                                                         |
| max_postage          | Double |          | Cước phí tối đa                                                                            |
| start_date           | Long   |          | Thời gian bắt đầu (Unix timestamp - epoch milliseconds)                                    |
| end_date             | Long   |          | Thời gian kết thúc (Unix timestamp - epoch milliseconds)                                   |
| page                 | Int    |          | Số trang (mặc định: 1)                                                                     |
| size                 | Int    |          | Số lượng trên 1 trang (mặc định: 10)                                                       |

**Response**

| Tham số   | Kiểu                | Mô tả                                 |
| --------- | ------------------- | ------------------------------------- |
| status    | Int                 | HTTP Status code (`200` - Thành công) |
| msg       | String              | Thông điệp phản hồi (`Success`)       |
| errorCode | Int                 | Mã lỗi nghiệp vụ (`0` - Thành công)   |
| data      | Array\<CdrDetails\> | Danh sách bản ghi CDR                 |

**Cấu trúc phần tử trong `data` (Chi tiết cuộc gọi):**

| Tham số                | Kiểu    | Mô tả                                                                             |
| ---------------------- | ------- | --------------------------------------------------------------------------------- |
| phone                  | String  | Số điện thoại nhận cuộc gọi                                                       |
| name                   | String  | Tên khách hàng                                                                    |
| customerUid            | String  | Mã khách hàng                                                                     |
| duration               | Int     | Tổng thời lượng cuộc gọi (giây)                                                   |
| billsec                | Int     | Thời gian đàm thoại tính cước (giây)                                              |
| sipCode                | String  | Mã SIP phản hồi (xem tại [Bảng tra cứu trạng thái](#bang-tra-cuu-trang-thai))     |
| disposition            | String  | Trạng thái cuộc gọi (xem tại [Bảng tra cứu trạng thái](#bang-tra-cuu-trang-thai)) |
| hotline                | Object  | Thông tin hotline gọi ra                                                          |
| inputLog               | String  | Nội dung nhận dạng bot / phím bấm                                                 |
| voiceText              | String  | Nội dung chuyển đổi giọng nói sang văn bản                                        |
| status                 | Int     | Trạng thái CDR                                                                    |
| botMemberStatusConnect | String  | Trạng thái kết nối bot-member                                                     |
| postage                | Double  | Cước phí cuộc gọi                                                                 |
| serviceCharge          | Double  | Phí dịch vụ                                                                       |
| postageBotService      | Double  | Cước phí bot AI                                                                   |
| externalCallId         | String  | Mã cuộc gọi từ hệ thống bên ngoài                                                 |
| member                 | Object  | Thông tin member phụ trách                                                        |
| answerAt               | Long    | Thời điểm trả lời (Unix timestamp - ms)                                           |
| endCallAt              | Long    | Thời điểm kết thúc (Unix timestamp - ms)                                          |
| botId                  | String  | Mã bot AI                                                                         |
| campaignId             | Long    | ID chiến dịch                                                                     |
| campaignCode           | String  | Mã chiến dịch                                                                     |
| campaignName           | String  | Tên chiến dịch                                                                    |
| campaignGroupId        | Long    | ID nhóm chiến dịch                                                                |
| campaignGroupCode      | String  | Mã nhóm chiến dịch                                                                |
| campaignGroupName      | String  | Tên nhóm chiến dịch                                                               |
| templateScriptId       | Long    | ID kịch bản                                                                       |
| templateScriptCode     | String  | Mã kịch bản                                                                       |
| templateScriptName     | String  | Tên kịch bản                                                                      |
| transId                | String  | Mã giao dịch cuộc gọi (duy nhất)                                                  |
| createAt               | Long    | Thời điểm tạo (Unix timestamp - ms)                                               |
| isRecord               | Boolean | Có file ghi âm hay không                                                          |
| score                  | Float   | Điểm đánh giá cuộc gọi                                                            |
| callCollectedData      | Array   | Dữ liệu thu thập / AI trích xuất từ cuộc gọi                                      |

**Cấu trúc mỗi phần tử trong `callCollectedData`:**

| Tham số     | Kiểu   | Mô tả                            |
| ----------- | ------ | -------------------------------- |
| cfkey       | String | Key của trường tuỳ chỉnh         |
| cfname      | String | Tên trường tuỳ chỉnh             |
| cfvalue     | String | Giá trị thu thập / AI trích xuất |
| description | String | Mô tả trường                     |

**Ví dụ response**

```json
{
  "status": 200,
  "msg": "Success",
  "errorCode": 0,
  "data": [
    {
      "phone": "0987654321",
      "name": "Nguyen Van A",
      "customerUid": "CUST_001",
      "duration": 45,
      "billsec": 30,
      "sipCode": "200",
      "disposition": "ANSWERED",
      "status": 1,
      "postage": 500.0,
      "externalCallId": "extcall001",
      "campaignCode": "CAMP_001",
      "campaignName": "Chiến dịch 1",
      "templateScriptCode": "SCRIPT_001",
      "templateScriptName": "Kịch bản 1",
      "transId": "trans_abc123",
      "createAt": 1695254400000,
      "answerAt": 1695254410000,
      "endCallAt": 1695254440000,
      "isRecord": true,
      "callCollectedData": [
        {
          "cfkey": "cf_ho_ten",
          "cfname": "Họ tên",
          "cfvalue": "Nguyen Van A",
          "description": ""
        }
      ]
    }
  ]
}
```

**Bảng mã lỗi**

| errorCode | status | Mô tả              |
| --------- | ------ | ------------------ |
| `0`       | `200`  | Thành công         |
| `803`     | `500`  | Không có quyền xem |
| `500`     | `500`  | Lỗi hệ thống       |

---

## Lấy số lượng số lịch sử gọi {#lay-so-luong-lich-su-goi}

Trả về tổng số bản ghi lịch sử gọi tự động theo các điều kiện lọc

<div class="api-container">
  <span class="api-method method-get">GET</span>
  <span>[URL]/m-auto-call/api/cdr/count?key_search={key_search}&input_log_search={input_log_search}&disposition_search={disposition_search}&project_code={project_code}&bot_id={bot_id}&campaign_code={campaign_code}&member={member}&template_script_code={template_script_code}&status={status}&hotline={hotline}&min_postage={min_postage}&max_postage={max_postage}&start_date={start_date}&end_date={end_date}&page={page}&size={size}</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Tham số**

| Tham số                | Kiểu   | Bắt buộc | Mô tả                                                                                      |
| ---------------------- | ------ | -------- | ------------------------------------------------------------------------------------------ |
| `key_search`           | String |          | Từ khóa tìm kiếm (SĐT, customerUid, tên)                                                   |
| `input_log_search`     | String |          | Lọc theo nội dung nhận dạng bot                                                            |
| `disposition_search`   | String |          | Lọc theo trạng thái cuộc gọi (xem tại [Bảng tra cứu trạng thái](#bang-tra-cuu-trang-thai)) |
| `project_code`         | String |          | Mã dự án. Tự lấy từ X-API-Key nếu không truyền                                             |
| `bot_id`               | String |          | Mã bot AI                                                                                  |
| `campaign_code`        | String |          | Mã chiến dịch                                                                              |
| `member`               | String |          | MemberUid người tạo (member chỉ xem CDR của mình)                                          |
| `template_script_code` | String |          | Mã kịch bản gọi                                                                            |
| `status`               | Int    |          | Trạng thái CDR. Mặc định: `-1` (tất cả)                                                    |
| `hotline`              | String |          | Mã hotline                                                                                 |
| `min_postage`          | Double |          | Cước phí tối thiểu                                                                         |
| `max_postage`          | Double |          | Cước phí tối đa                                                                            |
| `start_date`           | Long   |          | Thời gian bắt đầu (Unix timestamp - epoch milliseconds)                                    |
| `end_date`             | Long   |          | Thời gian kết thúc (Unix timestamp - epoch milliseconds)                                   |
| `page`                 | Int    |          | Trang hiện tại (mặc định: `1`)                                                             |
| `size`                 | Int    |          | Số bản ghi mỗi trang (mặc định: `10`)                                                      |

**Response**

| Tham số   | Kiểu   | Mô tả                                 |
| --------- | ------ | ------------------------------------- |
| status    | Int    | HTTP Status code (`200` - Thành công) |
| msg       | String | Thông điệp phản hồi (`Success`)       |
| errorCode | Int    | Mã lỗi nghiệp vụ (`0` - Thành công)   |
| data      | Int    | Tổng số bản ghi CDR thỏa điều kiện    |

**Ví dụ response**

```json
{
  "status": 200,
  "msg": "Success",
  "errorCode": 0,
  "data": 1250
}
```

**Bảng mã lỗi**

| errorCode | status | Mô tả        |
| --------- | ------ | ------------ |
| `0`       | `200`  | Thành công   |
| `500`     | `500`  | Lỗi hệ thống |

---

<div id="bang-tra-cuu-trang-thai" style="scroll-margin-top: 80px;"></div>

**Bảng tra cứu trạng thái**

Dưới đây là sự tương quan giữa các mã `sipCode`, `disposition` và ý nghĩa chi tiết của chúng trên hệ thống:

| sipCode | disposition       | Ý nghĩa                                        |
| ------- | ----------------- | ---------------------------------------------- |
| `101`   | `NOT_FOUND_PRICE` | Không đủ tiền                                  |
| `102`   | `NOT_FOUND_TELCO` | Không tìm thấy nhà mạng                        |
| `200`   | `ANSWER`          | Nghe máy                                       |
| `480`   | `NOANSWER`        | Người nhận tạm thời không liên lạc được        |
| `486`   | `BUSY`            | Người nhận tạm thời đang bận                   |
| `402`   | `NOT_MONEY`       | Số dư tài khoản không đủ để thực hiện cuộc gọi |
| `500`   | `SERVER_ERROR`    | Lỗi kết nối                                    |

---

## Các API phiên bản cũ (Deprecated)

::: warning Khuyến nghị
Các API dưới đây thuộc phiên bản cũ (Deprecated). Hệ thống **vẫn đang tiếp tục hỗ trợ và duy trì hoạt động bình thường**. Tuy nhiên, VBot **khuyến nghị** quý khách hàng sử dụng các API phiên bản mới ở trên (`/m-auto-call/api/cdr/get-all`, `/m-auto-call/api/cdr/count`, `/m-auto-call/api/cdr/get-bot-conversation`) để tối ưu hiệu năng và được cập nhật các tính năng mới nhất trong tương lai.
:::

### Lấy danh sách lịch sử gọi (Deprecated) {#lay-danh-sach-lich-su-goi-deprecated}

<div class="api-container">
  <span class="api-method method-get">GET</span>
  <span>[URL]/api/campaignCall/cdr/getAll?bot_id={bot_id}&campaign_code={campaign_code}&member={member}&template_script_code={template_script_code}&disposition={disposition}&key={key}&end_date={end_date}&start_date={start_date}&hotline={hotline}&input_log_search={input_log_search}&status={status}&page={page}&size={size}</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Tham số**

| Tham số              | Kiểu   | Mô tả                                                                             |
| -------------------- | ------ | --------------------------------------------------------------------------------- |
| bot_id               | String | Mã bot                                                                            |
| campaign_code        | String | Mã chiến dịch                                                                     |
| member               | String | Thành viên                                                                        |
| template_script_code | String | Mã template kịch bản                                                              |
| disposition          | String | Trạng thái cuộc gọi (xem tại [Bảng tra cứu trạng thái](#bang-tra-cuu-trang-thai)) |
| key                  | String | Từ khóa tìm kiếm                                                                  |
| end_date             | Int    | Ngày kết thúc                                                                     |
| start_date           | Int    | Ngày bắt đầu                                                                      |
| hotline              | String | Hotline                                                                           |
| input_log_search     | String | Tìm kiếm log                                                                      |
| status               | Int    | Trạng thái                                                                        |
| page                 | Int    | Số trang                                                                          |
| size                 | Int    | Số lượng trên 1 trang                                                             |

**Response**

| Tham số | Kiểu   | Mô tả                                  |
| ------- | ------ | -------------------------------------- |
| error   | Int    | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message | String | Thông tin                              |
| data    | Array  | Danh sách lịch sử cuộc gọi             |

**Ví dụ response**

```json
{
  "error": 0,
  "message": "Success",
  "data": [
    {
      "phone": "0987654321",
      "name": "Nguyễn Văn A",
      "customer_uid": "CUST_001",
      "duration": 45,
      "billsec": 30,
      "sip_code": "200",
      "disposition": "answer",
      "input_log": "",
      "status": 1,
      "postage": 500.0,
      "service_charge": 0.0,
      "postage_bot_service": 100.0,
      "member": {
        "name": "Admin",
        "color": "#19b24f"
      },
      "hotline": {
        "code": "HL01",
        "name": "Hotline CSKH",
        "phone_number": "02473001234"
      },
      "call_collected_data": [
        {
          "cfkey": "cf_ho_ten",
          "cfname": "Họ tên",
          "cfvalue": "Nguyễn Văn A",
          "description": ""
        }
      ],
      "answer_at": 1695254410000,
      "end_call_at": 1695254440000,
      "campaign_name": "Chiến dịch xác nhận đơn hàng",
      "campaign_code": "CAMP_001",
      "campaign_group_name": "Nhóm CSKH",
      "campaign_group_code": "GRP_001",
      "template_script_name": "Kịch bản xác nhận",
      "template_script_code": "SCRIPT_001",
      "voice_text": "Khách hàng đồng ý nhận hàng",
      "create_at": 1695254400000,
      "bot_id": "BOT_001",
      "trans_id": "TRANS_123456",
      "create_by": "user01",
      "score": 5.0,
      "is_record": true
    }
  ]
}
```

---

### Lấy số lượng lịch sử gọi (Deprecated) {#lay-so-luong-lich-su-goi-deprecated}

<div class="api-container">
  <span class="api-method method-get">GET</span>
  <span>[URL]/api/campaignCall/cdr/countAll?bot_id={bot_id}&campaign_code={campaign_code}&member={member}&template_script_code={template_script_code}&disposition={disposition}&key={key}&end_date={end_date}&start_date={start_date}&hotline={hotline}&input_log_search={input_log_search}&status={status}&page={page}&size={size}</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Tham số**

| Tham số              | Kiểu   | Mô tả                                                                             |
| -------------------- | ------ | --------------------------------------------------------------------------------- |
| bot_id               | String | Mã bot                                                                            |
| campaign_code        | String | Mã chiến dịch                                                                     |
| member               | String | Thành viên                                                                        |
| template_script_code | String | Mã template kịch bản                                                              |
| disposition          | String | Trạng thái cuộc gọi (xem tại [Bảng tra cứu trạng thái](#bang-tra-cuu-trang-thai)) |
| key                  | String | Từ khóa tìm kiếm                                                                  |
| end_date             | Int    | Ngày kết thúc                                                                     |
| start_date           | Int    | Ngày bắt đầu                                                                      |
| hotline              | String | Hotline                                                                           |
| input_log_search     | String | Tìm kiếm log                                                                      |
| status               | Int    | Trạng thái                                                                        |
| page                 | Int    | Số trang                                                                          |
| size                 | Int    | Số lượng trên 1 trang                                                             |

**Response**

| Tham số | Kiểu   | Mô tả                                  |
| ------- | ------ | -------------------------------------- |
| error   | Int    | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message | String | Thông tin                              |
| data    | Int    | Tổng số bản ghi CDR                    |

**Ví dụ response**

```json
{
  "error": 0,
  "message": "Success",
  "data": 128
}
```

---

### Lấy hội thoại bot (Deprecated) {#lay-hoi-thoai-bot-deprecated}

Lấy nội dung chi tiết hội thoại của bot AI trong cuộc gọi (phiên bản cũ).

<div class="api-container">
  <span class="api-method method-get">GET</span>
  <span>[URL]/api/campaignCall/cdr/getBotConversation?bot_id={bot_id}&trans_id={trans_id}</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Tham số**

| Tham số    | Kiểu   | Mô tả        |
| ---------- | ------ | ------------ |
| `bot_id`   | String | Mã bot       |
| `trans_id` | String | Mã giao dịch |

**Response**

| Tham số   | Kiểu   | Mô tả                                  |
| --------- | ------ | -------------------------------------- |
| `error`   | Int    | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| `message` | String | Thông tin                              |
| `data`    | String | Dữ liệu trả về                         |

**Ví dụ response**

```json
{
  "error": 0,
  "message": "Success",
  "data": "Nội dung cuộc hội thoại"
}
```
