---
outline: deep
---

# Webhooks

Webhook cho phép hệ thống VBot gửi thông báo realtime đến server của bạn khi có sự kiện xảy ra (ví dụ: cuộc gọi mới, kết thúc cuộc gọi, v.v.).

::: warning Lưu ý
Khách hàng cần mua thêm tiện ích bổ sung trong gói VBot để sử dụng tính năng này.
:::

## Mua tiện ích bổ sung

::: info Thông báo
Tính năng mua tiện ích bổ sung hiện đang bảo trì. Khách hàng vui lòng liên hệ với VBot để mua gói.
:::

## Cài đặt Webhooks

Sau khi mua tiện ích **API dịch vụ**, truy cập trang cấu hình [Webhooks](https://console-stable.vbot.vn/group-manager/webhook) để thiết lập.

**Các bước thực hiện:**

1. Nhập **URL** nhận webhook hệ thống của bạn
2. Nhập **Auth header** (nếu có) để xác thực request
3. Bật các **sự kiện** bạn muốn nhận thông báo

![Cấu hình Webhooks](/Webhooks/webhook.avif)

---

## Tổng quan sự kiện

| Mã sự kiện                  | Nhóm        | Mô tả                                       |
| --------------------------- | ----------- | ------------------------------------------- |
| `MANUAL_CALL_COMPLETE`      | Manual Call | Gói đủ: Lịch sử + Ghi âm + AI trích xuất    |
| `MANUAL_CALL_LOG`           | Manual Call | Lịch sử 1 cuộc gọi thường (vừa kết thúc)    |
| `MANUAL_CALL_RECORDING`     | Manual Call | File ghi âm cuộc gọi thường                 |
| `MANUAL_CALL_AI_EXTRACTION` | Manual Call | AI trích xuất cuộc gọi thường               |
| `AUTO_CALL_COMPLETE`        | Auto Call   | Gói đủ: Lịch sử + Ghi âm + AI trích xuất    |
| `AUTO_CALL_LOG`             | Auto Call   | Lịch sử 1 cuộc gọi tự động (vừa kết thúc)   |
| `AUTO_CALL_RECORDING`       | Auto Call   | File ghi âm cuộc gọi tự động                |
| `AUTO_CALL_AI_EXTRACTION`   | Auto Call   | AI trích xuất cuộc gọi tự động              |
| `P2P_CALL_LOG`              | P2P         | Lịch sử cuộc gọi nội bộ                     |
| `IN_COMINGCALL`             | Incoming    | Thông báo realtime có cuộc gọi đang gọi vào |

---

## Cuộc gọi thường (Manual Call)

### MANUAL_CALL_COMPLETE

Gói đầy đủ khi cuộc gọi thường hoàn tất, bao gồm lịch sử + ghi âm.

**Cấu trúc payload:**

| Phần                | Kiểu   | Mô tả                       |
| ------------------- | ------ | --------------------------- |
| manualCallLog       | Object | Thông tin chi tiết cuộc gọi |
| manualCallRecording | Object | Thông tin ghi âm cuộc gọi   |

#### `manualCallLog`

| Tham số               | Kiểu    | Mô tả                                                                                |
| --------------------- | ------- | ------------------------------------------------------------------------------------ |
| transId               | String  | Mã giao dịch cuộc gọi (duy nhất)                                                     |
| projectCode           | String  | Mã dự án                                                                             |
| typeCall              | Int     | Loại cuộc gọi (1: Gọi vào, 2: Gọi ra)                                                |
| timeCall              | Int     | Thời lượng đổ chuông (giây)                                                          |
| durationCall          | Int     | Tổng thời lượng cuộc gọi (giây)                                                      |
| createAt              | Long    | Thời điểm tạo cuộc gọi (Unix timestamp ms)                                           |
| callAt                | Long    | Thời điểm bắt đầu gọi (Unix timestamp ms)                                            |
| callerId              | String  | ID người gọi                                                                         |
| caller                | String  | Số người gọi                                                                         |
| callerName            | String  | Tên người gọi                                                                        |
| typeCaller            | String  | Loại người gọi (`Website_RTC`, `Phone`, `SIP`, ...)                                  |
| channelCaller         | String  | Channel ID người gọi                                                                 |
| callerMemberNo        | String  | memberNo của caller                                                                  |
| calleeId              | String  | ID người nhận                                                                        |
| callee                | String  | Số người nhận                                                                        |
| calleeName            | String  | Tên người nhận                                                                       |
| typeCallee            | String  | Loại người nhận (`Phone`, `Website_RTC`, `SIP`, ...)                                 |
| channelCallee         | String  | Channel ID người nhận                                                                |
| calleeMemberNo        | String  | memberNo của callee                                                                  |
| conferenceId          | String  | ID phòng hội nghị (nếu có)                                                           |
| telcoCode             | String  | Mã nhà mạng (`VTL`, `VNP`, `VMS`, ...)                                               |
| disposition           | String  | Trạng thái cuộc gọi (xem [Bảng tra cứu](#bang-tra-cuu-trang-thai-cuoc-goi-thuong))   |
| hangupCause           | String  | Nguyên nhân kết thúc (xem [Bảng tra cứu](#bang-tra-cuu-trang-thai-cuoc-goi-thuong))  |
| sipCode               | String  | Mã SIP response (xem [Bảng tra cứu](#bang-tra-cuu-trang-thai-cuoc-goi-thuong))       |
| endCall               | String  | Channel ID bên kết thúc cuộc gọi                                                     |
| hotline               | String  | Số hotline sử dụng                                                                   |
| isIvr                 | Boolean | Cuộc gọi có qua IVR hay không                                                        |
| groupId               | String  | ID nhóm cuộc gọi                                                                     |
| forwardBotIdEndCall   | String  | Bot ID nếu cuộc gọi được chuyển sang bot                                             |
| paymentChannel        | String  | Kênh thanh toán (`MONEY`, ...)                                                       |
| postage               | Double  | Cước phí cuộc gọi                                                                    |
| autoDialServiceCharge | Double  | Phí dịch vụ gọi tự động                                                              |
| campaignTransId       | String  | Mã giao dịch chiến dịch (nếu có)                                                     |
| customerUid           | String  | UID khách hàng trong hệ thống                                                        |
| customerName          | String  | Tên khách hàng                                                                       |
| firstQuestion         | String  | Câu hỏi đầu tiên (nếu có IVR)                                                        |
| externalCallId        | String  | Mã cuộc gọi từ hệ thống bên ngoài                                                    |
| groupMemberUid        | String  | UID nhóm thành viên                                                                  |

<div id="bang-tra-cuu-trang-thai-cuoc-goi-thuong" style="scroll-margin-top: 80px;"></div>

**Bảng tra cứu trạng thái cuộc gọi thường**

Dưới đây là sự tương quan giữa các mã `sipCode`, `disposition`, `hangupCause` và ý nghĩa chi tiết của chúng trên hệ thống:

| sipCode | disposition                 | hangupCause                 | Ý nghĩa                                        |
| ------- | --------------------------- | --------------------------- | ---------------------------------------------- |
| `200`   | `ANSWER`                    | `NORMAL_CLEARING`           | Nghe máy                                       |
| `400`   | `BAD_REQUEST`               | `NORMAL_TEMPORARY_FAILURE`  | Sai thông tin                                  |
| `401`   | `UNAUTHORIZED`              | `UNAUTHORIZED`              | Chưa xác thực                                  |
| `402`   | `OUT_OF_MONEY`              | `OUT_OF_MONEY`              | Số dư tài khoản không đủ để thực hiện cuộc gọi |
| `403`   | `DO_NOT_CALL`               | `DO_NOT_CALL`               | Người nhận chặn cuộc gọi quảng cáo             |
| `404`   | `NOT_FOUND`                 | `UNALLOCATED_NUMBER`        | Số không tồn tại                               |
| `405`   | `CALL_INTERVAL_NOT_ALLOWED` | `CALL_INTERVAL_NOT_ALLOWED` | Khung giờ gọi không được phép                  |
| `406`   | `MEMBER_NOT_ACTIVATED`      | `MEMBER_NOT_ACTIVATED`      | Thành viên chưa được kích hoạt                 |
| `407`   | `MEMBER_NOT_IN_PROJECT`     | `MEMBER_NOT_IN_PROJECT`     | Thành viên không thuộc dự án                   |
| `408`   | `TIME_OUT`                  | `RECOVERY_ON_TIMER_EXPIRE`  | Hết thời gian chờ                              |
| `409`   | `DO_NOT_DISTURB`            | `DO_NOT_DISTURB`            | Không làm phiền                                |
| `410`   | `GONE`                      | `NUMBER_CHANGED`            | Số không còn tồn tại                           |
| `411`   | `ABSENT`                    | `ABSENT`                    | Vắng mặt                                       |
| `412`   | `PACKAGE_EXPIRED`           | `PACKAGE_EXPIRED`           | Gói cước đã hết hạn                            |
| `413`   | `HOTLINE_NOT_SUPPORT_TELCO` | `HOTLINE_NOT_SUPPORT_TELCO` | Hotline không hỗ trợ nhà mạng                  |
| `414`   | `TELCO_NOT_FOUND`           | `TELCO_NOT_FOUND`           | Không tìm thấy nhà mạng theo số điện thoại     |
| `415`   | `INVALID_PARAMETER`         | `INVALID_PARAMETER`         | Tham số không hợp lệ                           |
| `416`   | `PROJECT_EXPIRED`           | `PROJECT_EXPIRED`           | Dự án đã hết hạn                               |
| `480`   | `NOANSWER`                  | `NO_USER_RESPONSE`          | Người nhận tạm thời không liên lạc được        |
| `486`   | `BUSY`                      | `USER_BUSY`                 | Người nhận tạm thời đang bận                   |
| `487`   | `CANCEL`                    | `ORIGINATOR_CANCEL`         | Người gọi hủy                                  |
| `500`   | `SERVER_ERROR`              | `NORMAL_TEMPORARY_FAILURE`  | Lỗi kết nối                                    |
| `502`   | `BAD_GATEWAY`               | `DESTINATION_OUT_OF_ORDER`  | Lỗi đường truyền                               |
| `603`   | `DECLINE`                   | `CALL_REJECTED`             | Người nhận từ chối cuộc gọi                    |

#### `manualCallRecording`

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

### MANUAL_CALL_LOG

Lịch sử 1 cuộc gọi thường vừa kết thúc. Payload là object phẳng với các trường giống [`manualCallLog`](#manualcalllog) ở trên.

### MANUAL_CALL_RECORDING

File ghi âm cuộc gọi thường. Payload giống [`manualCallRecording`](#manualcallrecording) ở trên.

### MANUAL_CALL_AI_EXTRACTION

AI trích xuất dữ liệu từ cuộc gọi thường. Payload giống [AUTO_CALL_AI_EXTRACTION](#auto-call-ai-extraction).

---

## Cuộc gọi tự động (Auto Call)

### AUTO_CALL_COMPLETE

Gói đầy đủ khi cuộc gọi tự động hoàn tất, bao gồm lịch sử + AI trích xuất + ghi âm.

**Cấu trúc payload:**

| Phần                 | Kiểu   | Mô tả                                                                             |
| -------------------- | ------ | --------------------------------------------------------------------------------- |
| autoCallLog          | Object | Thông tin chi tiết cuộc gọi (giống [AUTO_CALL_LOG](#auto-call-log))               |
| autoCallAIExtraction | Object | Dữ liệu AI trích xuất (giống [AUTO_CALL_AI_EXTRACTION](#auto-call-ai-extraction)) |
| autoCallRecording    | Object | Thông tin ghi âm (giống [AUTO_CALL_RECORDING](#auto-call-recording))              |

### AUTO_CALL_LOG

Lịch sử 1 cuộc gọi tự động vừa kết thúc. Payload là object phẳng:

| Tham số             | Kiểu   | Mô tả                                                                                         |
| ------------------- | ------ | --------------------------------------------------------------------------------------------- |
| phone               | String | Số điện thoại khách hàng                                                                      |
| duration            | Int    | Tổng thời lượng cuộc gọi (giây)                                                               |
| billsec             | Int    | Thời lượng tính cước (giây)                                                                   |
| disposition         | String | Trạng thái cuộc gọi (xem [Bảng tra cứu](#bang-tra-cuu-trang-thai-cuoc-goi-tu-dong))          |
| hotlineCode         | String | Mã hotline                                                                                    |
| inputLog            | String | Log tương tác DTMF                                                                            |
| voiceText           | String | Nội dung thoại chuyển văn bản (STT)                                                           |
| postage             | Double | Cước phí cuộc gọi                                                                             |
| serviceCharge       | Double | Phí dịch vụ                                                                                   |
| memberName          | String | Tên thành viên thực hiện                                                                      |
| memberAccId         | String | Account ID thành viên                                                                         |
| memberNo            | String | memberNo của thành viên tạo cuộc gọi tự động                                                  |
| answerAt            | Long   | Thời điểm nghe máy (Unix timestamp ms)                                                        |
| endCallAt           | Long   | Thời điểm kết thúc (Unix timestamp ms)                                                        |
| botId               | String | ID của bot xử lý cuộc gọi                                                                     |
| campaignName        | String | Tên chiến dịch                                                                                |
| campaignGroupName   | String | Tên nhóm chiến dịch                                                                           |
| templateScriptCode  | String | Mã kịch bản template                                                                          |
| templateScriptName  | String | Tên kịch bản template                                                                         |
| transId             | String | Mã giao dịch cuộc gọi (duy nhất)                                                              |
| createAt            | Long   | Thời điểm tạo cuộc gọi (Unix timestamp ms)                                                    |
| postageService      | Double | Cước dịch vụ bổ sung                                                                          |
| postageBotService   | Double | Cước dịch vụ bot                                                                              |
| telcoCode           | String | Mã nhà mạng (`VTL`, `VNP`, `VMS`, ...)                                                        |
| projectCode         | String | Mã dự án                                                                                      |
| callNet             | String | Loại cuộc gọi (`OFFNET`, `ONNET`)                                                             |
| metaData            | String | Dữ liệu meta đầu vào kịch bản (JSON string)                                                   |
| metaDataDescription | String | Mô tả các trường meta (JSON string)                                                           |
| externalCallId      | String | Mã cuộc gọi từ hệ thống bên ngoài                                                             |
| callCollectedData   | String | Dữ liệu thu thập từ cuộc gọi (JSON string)                                                    |

<div id="bang-tra-cuu-trang-thai-cuoc-goi-tu-dong" style="scroll-margin-top: 80px;"></div>

**Bảng tra cứu trạng thái cuộc gọi tự động**

Dưới đây là các trạng thái `disposition` và ý nghĩa chi tiết:

| disposition | Ý nghĩa |
| ----------- | ------- |
| `NOT_FOUND_PRICE` | Không đủ tiền |
| `NOT_FOUND_TELCO` | Không tìm thấy nhà mạng |
| `ANSWER` | Nghe máy |
| `NOANSWER` | Người nhận tạm thời không liên lạc được |
| `BUSY` | Người nhận tạm thời đang bận |
| `NOT_MONEY` | Số dư tài khoản không đủ để thực hiện cuộc gọi |
| `SERVER_ERROR` | Lỗi kết nối |

### AUTO_CALL_AI_EXTRACTION

AI trích xuất dữ liệu từ cuộc gọi tự động.

| Tham số           | Kiểu   | Mô tả                                           |
| ----------------- | ------ | ----------------------------------------------- |
| transId           | String | Mã giao dịch cuộc gọi                           |
| externalCallId    | String | Mã cuộc gọi từ hệ thống bên ngoài               |
| callCollectedData | String | Dữ liệu AI trích xuất từ cuộc gọi (JSON string) |

`callCollectedData` là JSON string chứa mảng các trường dữ liệu đã trích xuất:

| Key trong item | Kiểu   | Mô tả               |
| -------------- | ------ | ------------------- |
| cfkey          | String | Mã trường           |
| cfname         | String | Tên hiển thị trường |
| cfvalue        | String | Giá trị trích xuất  |
| description    | String | Mô tả trường        |

### AUTO_CALL_RECORDING

File ghi âm cuộc gọi tự động.

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

## Cuộc gọi nội bộ (P2P)

### P2P_CALL_LOG

Lịch sử cuộc gọi nội bộ (peer-to-peer). Payload có cấu trúc giống [`manualCallLog`](#manualcalllog).

---

## Cuộc gọi đến

### IN_COMINGCALL

Thông báo realtime khi có cuộc gọi đang gọi vào hệ thống. Sự kiện này được gửi ngay khi cuộc gọi reo, trước khi được trả lời.

Cấu trúc payload:

| Tham số      | Kiểu   | Mô tả                              |
| ------------ | ------ | ---------------------------------- |
| project_code | String | Mã dự án                           |
| phone        | String | Số điện thoại                      |
| hotline      | String | Số hotline sử dụng                 |
| trans_id     | String | Mã giao dịch cuộc gọi              |
| event_data   | String | Mã sự kiện (`IN_COMINGCALL`)       |
| member       | Object | Thông tin thành viên               |
| time         | Long   | Thời gian sự kiện (Unix timestamp) |
| eventData    | String | Mã sự kiện (`IN_COMINGCALL`)       |

Cấu trúc object `member` (Thông tin thành viên):

| Tham số     | Kiểu   | Mô tả          |
| ----------- | ------ | -------------- |
| member_no   | String | Mã thành viên  |
| account_sip | String | Tài khoản SIP  |
| name        | String | Tên thành viên |

**Ví dụ payload:**

```json
{
  "project_code": "PR202211251413234534",
  "phone": "0339421067",
  "hotline": "0974454532",
  "trans_id": "080920261142317640112a72a84f3fbbea33dd1632a04f",
  "event_data": "IN_COMINGCALL",
  "member": {
    "member_no": "191215105327352",
    "account_sip": "12191501234869",
    "name": "Đoàn Thị Minh Thư"
  },
  "time": 1788842552,
  "eventData": "IN_COMINGCALL"
}
```

---

## Sự kiện cũ (Deprecated)

::: warning Lưu ý
Các sự kiện dưới đây vẫn hoạt động nhưng sẽ ngừng hỗ trợ cập nhật. Vui lòng chuyển sang sử dụng sự kiện mới tương ứng.
:::

| Mã sự kiện cũ             | Sự kiện thay thế  | Mô tả                    |
| ------------------------- | ----------------- | ------------------------ |
| `CAMPAIGN_CALL`           | `AUTO_CALL_LOG`   | Lịch sử cuộc gọi tự động |
| `HISTORY_CALL`            | `MANUAL_CALL_LOG` | Lịch sử cuộc gọi thường  |
| `HISTORY_CALL_PEERTOPEER` | `P2P_CALL_LOG`    | Lịch sử cuộc gọi nội bộ  |

### CAMPAIGN_CALL

Payload giống [AUTO_CALL_LOG](#auto-call-log).

### HISTORY_CALL / HISTORY_CALL_PEERTOPEER

| Tham số          | Kiểu   | Mô tả                                                   |
| ---------------- | ------ | ------------------------------------------------------- |
| hotline_number   | String | Số hotline                                              |
| date_create      | String | Thời điểm tạo cuộc gọi                                  |
| caller           | Array  | Danh sách thông tin người gọi                           |
| callee           | Array  | Danh sách thông tin người nhận                          |
| time_call        | String | Thời lượng đàm thoại                                    |
| duration_call    | String | Tổng thời lượng cuộc gọi                                |
| type_call        | String | Loại cuộc gọi (`OUTCALL`, `INCALL`)                     |
| group_id         | String | ID nhóm cuộc gọi                                        |
| disposition      | String | Trạng thái cuộc gọi (`ANSWER`, `NOANSWER`, `BUSY`, ...) |
| external_call_id | String | Mã cuộc gọi từ hệ thống bên ngoài                       |
| record_file      | Array  | Danh sách URL file ghi âm                               |

<div class="note">
<strong>Lưu ý về giá trị <code>external_call_id</code>:</strong><br/>
Giá trị <code>external_call_id</code> được truyền vào cần thỏa mãn các điều kiện sau:
<ul>
  <li>Độ dài tối đa: <strong>32 ký tự</strong>.</li>
  <li>Chỉ sử dụng các ký tự chữ thường (<code>a</code>–<code>z</code>) và chữ số (<code>0</code>–<code>9</code>).</li>
  <li><strong>Không</strong> chứa các ký tự đặc biệt, chữ in hoa hoặc khoảng trắng.</li>
</ul>
</div>

Mỗi item trong `caller` / `callee`:

| Tham số       | Kiểu   | Mô tả                                      |
| ------------- | ------ | ------------------------------------------ |
| phone         | String | Số điện thoại                              |
| vbot_id       | String | VBot ID                                    |
| date_create   | String | Thời điểm                                  |
| disposition   | String | Trạng thái                                 |
| time_call     | String | Thời lượng đàm thoại                       |
| postage       | Double | Cước phí                                   |
| duration_call | Int    | Thời lượng cuộc gọi (giây)                 |
| source        | String | Nguồn cuộc gọi (`App_SDK`, `Phone`, `SIP`) |
| member_no     | String | Số nhánh thành viên                        |
