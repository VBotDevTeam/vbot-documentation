---
outline: deep
---

# Lịch sử gọi Campaign

API tra cứu lịch sử cuộc gọi trong chiến dịch.

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

| Tham số             | Kiểu   | Mô tả                                                              |
| ------------------- | ------ | ------------------------------------------------------------------ |
| phone               | String | Số điện thoại khách hàng                                           |
| duration            | Int    | Tổng thời lượng cuộc gọi (giây)                                    |
| billsec             | Int    | Thời lượng tính cước (giây)                                        |
| disposition         | String | Trạng thái cuộc gọi (`ANSWER`, `NOANSWER`, `BUSY`, ...)            |
| hotlineCode         | String | Mã hotline (số tổng đài)                                           |
| inputLog            | String | Log tương tác DTMF của khách hàng                                  |
| voiceText           | String | Nội dung thoại đã chuyển thành văn bản (STT)                       |
| postage             | Double | Cước phí cuộc gọi                                                  |
| serviceCharge       | Double | Phí dịch vụ                                                        |
| memberName          | String | Tên thành viên thực hiện                                           |
| memberAccId         | String | Account ID thành viên                                              |
| answerAt            | Long   | Thời điểm nghe máy (Unix timestamp ms)                             |
| endCallAt           | Long   | Thời điểm kết thúc cuộc gọi (Unix timestamp ms)                    |
| botId               | String | ID của bot xử lý cuộc gọi                                          |
| campaignName        | String | Tên chiến dịch                                                     |
| campaignGroupName   | String | Tên nhóm chiến dịch                                                |
| templateScriptCode  | String | Mã kịch bản template                                               |
| templateScriptName  | String | Tên kịch bản template                                              |
| transId             | String | Mã giao dịch cuộc gọi (duy nhất)                                   |
| createAt            | Long   | Thời điểm tạo cuộc gọi (Unix timestamp ms)                         |
| postageService      | Double | Cước dịch vụ bổ sung                                               |
| postageBotService   | Double | Cước dịch vụ bot                                                   |
| telcoCode           | String | Mã nhà mạng (`VTL`, `VNP`, `VMS`, ...)                             |
| projectCode         | String | Mã dự án                                                           |
| callNet             | String | Loại cuộc gọi (`OFFNET`, `ONNET`)                                  |
| metaData            | String | Dữ liệu meta (JSON string) — các biến đầu vào kịch bản             |
| metaDataDescription | String | Mô tả các trường meta (JSON string)                                |
| externalCallId      | String | Mã cuộc gọi từ hệ thống bên ngoài                                  |
| callCollectedData   | String | Dữ liệu thu thập từ cuộc gọi (JSON string) — bao gồm cả kết quả AI |

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

---

## Lấy hội thoại bot

<div class="api-container">
  <span class="api-method method-get">GET</span>
  <span>[URL]/api/campaignCall/cdr/getBotConversation?bot_id={bot_id}&trans_id={trans_id}</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-KEY | `token-open-api` |

**Tham số**

| Tham số  | Kiểu   | Mô tả        |
| -------- | ------ | ------------ |
| bot_id   | String | Mã bot       |
| trans_id | String | Mã giao dịch |

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

## Lấy danh sách lịch sử gọi

<div class="api-container">
  <span class="api-method method-get">GET</span>
  <span>[URL]/api/campaignCall/cdr/getAll?bot_id={bot_id}&campaign_code={campaign_code}&member={member}&template_script_code={template_script_code}&disposition={disposition}&key={key}&end_date={end_date}&start_date={start_date}&hotline={hotline}&input_log_search={input_log_search}&status={status}&page={page}&size={size}</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-KEY | `token-open-api` |

**Tham số**

| Tham số              | Kiểu   | Mô tả                                                                     |
| -------------------- | ------ | ------------------------------------------------------------------------- |
| bot_id               | String | Mã bot                                                                    |
| campaign_code        | String | Mã chiến dịch                                                             |
| member               | String | Thành viên                                                                |
| template_script_code | String | Mã template kịch bản                                                      |
| disposition          | String | Trạng thái cuộc gọi. Xem [bảng giá trị disposition](#giá-trị-disposition) |
| key                  | String | Từ khóa tìm kiếm                                                          |
| end_date             | Int    | Ngày kết thúc                                                             |
| start_date           | Int    | Ngày bắt đầu                                                              |
| hotline              | String | Hotline                                                                   |
| input_log_search     | String | Tìm kiếm log                                                              |
| status               | Int    | Trạng thái                                                                |
| page                 | Int    | Số trang                                                                  |
| size                 | Int    | Số lượng trên 1 trang                                                     |

**Giá trị `disposition`** {#giá-trị-disposition}

| Giá trị         | Mô tả                  |
| --------------- | ---------------------- |
| misscall        | Cuộc gọi nhỡ           |
| answer          | Nghe máy               |
| busy            | Máy bận                |
| noanswer        | Không trả lời          |
| cancel          | Cuộc gọi bị hủy        |
| congestion      | Lỗi mạng               |
| chanunavail     | Không liên lạc được    |
| dontcall        | Người nhận từ chối     |
| torture         | Lỗi mạng               |
| invalidargs     | Tham số không hợp lệ   |
| someoneanswered | Người khác đã nghe máy |
| logout          | Đã đăng xuất           |
| botivr          | CallBot                |
| more            | Không trả lời          |

**Response**

| Tham số | Kiểu   | Mô tả                                  |
| ------- | ------ | -------------------------------------- |
| error   | Int    | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message | String | Thông tin                              |

**Ví dụ response**

```json
{
  "error": 2,
  "message": "sample string 3",
  "data": [
    {
      "phone": "sample string 1",
      "name": "sample string 2",
      "customer_uid": "sample string 3",
      "duration": 4,
      "billsec": 5,
      "sip_code": "sample string 6",
      "disposition": "sample string 7",
      "input_log": "sample string 8",
      "status": 9,
      "postage": 10.1,
      "service_charge": 11.1,
      "postage_bot_service": 12.1,
      "member": {
        "name": "sample string 1",
        "color": "sample string 2"
      },
      "hotline": {
        "code": "sample string 1",
        "name": "sample string 2",
        "phone_number": "sample string 3"
      },
      "call_collected_data": [
        {
          "cfkey": "sample string 1",
          "cfname": "sample string 2",
          "cfvalue": "sample string 3",
          "description": "sample string 4"
        },
        {
          "cfkey": "sample string 1",
          "cfname": "sample string 2",
          "cfvalue": "sample string 3",
          "description": "sample string 4"
        }
      ],
      "answer_at": 13,
      "end_call_at": 14,
      "campaign_name": "sample string 15",
      "campaign_code": "sample string 16",
      "campaign_group_name": "sample string 17",
      "campaign_group_code": "sample string 18",
      "template_script_name": "sample string 19",
      "template_script_code": "sample string 20",
      "voice_text": "sample string 21",
      "create_at": 22,
      "bot_id": "sample string 23",
      "trans_id": "sample string 24",
      "create_by": "sample string 25",
      "score": 26.1,
      "is_record": true
    },
    {
      "phone": "sample string 1",
      "name": "sample string 2",
      "customer_uid": "sample string 3",
      "duration": 4,
      "billsec": 5,
      "sip_code": "sample string 6",
      "disposition": "sample string 7",
      "input_log": "sample string 8",
      "status": 9,
      "postage": 10.1,
      "service_charge": 11.1,
      "postage_bot_service": 12.1,
      "member": {
        "name": "sample string 1",
        "color": "sample string 2"
      },
      "hotline": {
        "code": "sample string 1",
        "name": "sample string 2",
        "phone_number": "sample string 3"
      },
      "call_collected_data": [
        {
          "cfkey": "sample string 1",
          "cfname": "sample string 2",
          "cfvalue": "sample string 3",
          "description": "sample string 4"
        },
        {
          "cfkey": "sample string 1",
          "cfname": "sample string 2",
          "cfvalue": "sample string 3",
          "description": "sample string 4"
        }
      ],
      "answer_at": 13,
      "end_call_at": 14,
      "campaign_name": "sample string 15",
      "campaign_code": "sample string 16",
      "campaign_group_name": "sample string 17",
      "campaign_group_code": "sample string 18",
      "template_script_name": "sample string 19",
      "template_script_code": "sample string 20",
      "voice_text": "sample string 21",
      "create_at": 22,
      "bot_id": "sample string 23",
      "trans_id": "sample string 24",
      "create_by": "sample string 25",
      "score": 26.1,
      "is_record": true
    }
  ]
}
```

---

## Lấy số lượng lịch sử gọi

<div class="api-container">
  <span class="api-method method-get">GET</span>
  <span>[URL]/api/campaignCall/cdr/countAll?bot_id={bot_id}&campaign_code={campaign_code}&member={member}&template_script_code={template_script_code}&disposition={disposition}&key={key}&end_date={end_date}&start_date={start_date}&hotline={hotline}&input_log_search={input_log_search}&status={status}&page={page}&size={size}</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-KEY | `token-open-api` |

**Tham số**

| Tham số              | Kiểu   | Mô tả                 |
| -------------------- | ------ | --------------------- |
| bot_id               | String | Mã bot                |
| campaign_code        | String | Mã chiến dịch         |
| member               | String | Thành viên            |
| template_script_code | String | Mã template kịch bản  |
| disposition          | String | Trạng thái cuộc gọi   |
| key                  | String | Từ khóa tìm kiếm      |
| end_date             | Int    | Ngày kết thúc         |
| start_date           | Int    | Ngày bắt đầu          |
| hotline              | String | Hotline               |
| input_log_search     | String | Tìm kiếm log          |
| status               | Int    | Trạng thái            |
| page                 | Int    | Số trang              |
| size                 | Int    | Số lượng trên 1 trang |

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
