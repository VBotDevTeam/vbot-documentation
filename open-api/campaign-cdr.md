---
outline: deep
---

# Lịch sử gọi Campaign

API tra cứu lịch sử cuộc gọi trong chiến dịch.

## Lấy hội thoại bot

<div class="api-container">
  <span class="api-method method-get">GET</span>
  <span>[URL]/api/campaignCall/cdr/getBotConversation?vbot_id={vbot_id}&project_code={project_code}&bot_id={bot_id}&trans_id={trans_id}</span>
</div>

**Header**

| Tham số       | Giá trị               |
| ------------- | --------------------- |
| Authorization | Bearer `access_token` |

**Tham số**

| Tham số      | Kiểu   | Mô tả             |
| ------------ | ------ | ----------------- |
| vbot_id      | String | VBotID khách hàng |
| project_code | String | Mã nhóm           |
| bot_id       | String | Mã bot            |
| trans_id     | String | Mã giao dịch      |

**Response**

| Tham số | Kiểu   | Mô tả                                      |
| ------- | ------ | ------------------------------------------ |
| status  | Int    | Mã trạng thái (1: Thành công, 0: Thất bại) |
| error   | Int    | Mã lỗi                                     |
| message | String | Thông tin                                  |
| data    | String | Dữ liệu trả về                             |

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

## Lấy danh sách lịch sử gọi

<div class="api-container">
  <span class="api-method method-get">GET</span>
  <span>[URL]/api/campaignCall/cdr/getAll?vbot_id={vbot_id}&project_code={project_code}&bot_id={bot_id}&campaign_code={campaign_code}&member={member}&template_script_code={template_script_code}&disposition={disposition}&key={key}&end_date={end_date}&start_date={start_date}&hotline={hotline}&input_log_search={input_log_search}&status={status}&page={page}&size={size}</span>
</div>

**Header**

| Tham số       | Giá trị               |
| ------------- | --------------------- |
| Authorization | Bearer `access_token` |

**Tham số**

| Tham số              | Kiểu   | Mô tả                                                                     |
| -------------------- | ------ | ------------------------------------------------------------------------- |
| vbot_id              | String | VBotID khách hàng                                                         |
| project_code         | String | Mã nhóm                                                                   |
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

| Tham số | Kiểu   | Mô tả                                      |
| ------- | ------ | ------------------------------------------ |
| status  | Int    | Mã trạng thái (1: Thành công, 0: Thất bại) |
| error   | Int    | Mã lỗi                                     |
| message | String | Thông tin                                  |

**Ví dụ response**

```json
{
  "status": 1,
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
        "color": "sample string 2",
        "vbot_id": "sample string 3"
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
        "color": "sample string 2",
        "vbot_id": "sample string 3"
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
  <span>[URL]/api/campaignCall/cdr/countAll?vbot_id={vbot_id}&project_code={project_code}&bot_id={bot_id}&campaign_code={campaign_code}&member={member}&template_script_code={template_script_code}&disposition={disposition}&key={key}&end_date={end_date}&start_date={start_date}&hotline={hotline}&input_log_search={input_log_search}&status={status}&page={page}&size={size}</span>
</div>

**Header**

| Tham số       | Giá trị               |
| ------------- | --------------------- |
| Authorization | Bearer `access_token` |

**Tham số**

| Tham số              | Kiểu   | Mô tả                 |
| -------------------- | ------ | --------------------- |
| vbot_id              | String | VBotID khách hàng     |
| project_code         | String | Mã nhóm               |
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

| Tham số | Kiểu   | Mô tả                                      |
| ------- | ------ | ------------------------------------------ |
| status  | Int    | Mã trạng thái (1: Thành công, 0: Thất bại) |
| error   | Int    | Mã lỗi                                     |
| message | String | Thông tin                                  |
| data    | Int    | Dữ liệu trả về                             |

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
