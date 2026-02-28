---
outline: deep
---

# Chiến dịch gọi V2

API quản lý chiến dịch gọi tự động phiên bản 2.

## Lấy danh sách chiến dịch

<div class="api-container">
  <span class="api-method method-get">GET</span>
  <span>[URL]/api/campaignCall/campaign/getAll?vbot_id={vbot_id}&project_code={project_code}&key={key}&campaign_group_code={campaign_group_code}&campaign_type={campaign_type}&page={page}&size={size}</span>
</div>

**Header**

| Tham số | Giá trị |
|---|---|
| Authorization | Bearer `access_token` |

**Tham số**

| Tham số | Kiểu | Mô tả |
|---|---|---|
| vbot_id | String | VBotID khách hàng |
| project_code | String | Mã nhóm |
| key | String | Từ khóa tìm kiếm |
| campaign_group_code | String | Mã nhóm chiến dịch |
| campaign_type | String | Loại chiến dịch |
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
      "name": "sample string 2",
      "description": "sample string 3",
      "max_time_call": 4,
      "max_thread": 5,
      "max_waiting_time": 6,
      "code": "sample string 7",
      "campaign_type": "sample string 8",
      "hotline": {
        "code": "sample string 1",
        "name": "sample string 2",
        "phone_number": "sample string 3"
      },
      "status": 9,
      "create_at": 10,
      "campaign_group_code": "sample string 11",
      "campaign_group_name": "sample string 12",
      "template_script_code": "sample string 13",
      "template_script_name": "sample string 14",
      "template_script_is_delete": true,
      "create_by": "sample string 16",
      "reason_stop": "sample string 17",
      "import_phone_status": "sample string 18"
    },
    {
      "id": 1,
      "name": "sample string 2",
      "description": "sample string 3",
      "max_time_call": 4,
      "max_thread": 5,
      "max_waiting_time": 6,
      "code": "sample string 7",
      "campaign_type": "sample string 8",
      "hotline": {
        "code": "sample string 1",
        "name": "sample string 2",
        "phone_number": "sample string 3"
      },
      "status": 9,
      "create_at": 10,
      "campaign_group_code": "sample string 11",
      "campaign_group_name": "sample string 12",
      "template_script_code": "sample string 13",
      "template_script_name": "sample string 14",
      "template_script_is_delete": true,
      "create_by": "sample string 16",
      "reason_stop": "sample string 17",
      "import_phone_status": "sample string 18"
    }
  ]
}
```

---

## Lấy số lượng chiến dịch

<div class="api-container">
  <span class="api-method method-get">GET</span>
  <span>[URL]/api/campaignCall/campaign/countAll?vbot_id={vbot_id}&project_code={project_code}&key={key}&campaign_group_code={campaign_group_code}&campaign_type={campaign_type}&page={page}&size={size}</span>
</div>

**Header**

| Tham số | Giá trị |
|---|---|
| Authorization | Bearer `access_token` |

**Tham số**

| Tham số | Kiểu | Mô tả |
|---|---|---|
| vbot_id | String | VBotID khách hàng |
| project_code | String | Mã nhóm |
| key | String | Từ khóa tìm kiếm |
| campaign_group_code | String | Mã nhóm chiến dịch |
| campaign_type | String | Loại chiến dịch |
| page | Int | Số trang |
| size | Int | Số lượng trên 1 trang |

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
