---
outline: deep
---

# Changelog

Trang này ghi lại các thay đổi quan trọng của VBot Open API. Vui lòng theo dõi để cập nhật tích hợp kịp thời.

::: warning Cập nhật quan trọng
- **[13/02/2026]** Webhook `HISTORY_CALL` và `HISTORY_CALL_PEERTOPEER` trả thêm trường `external_call_id`.
- **[28/02/2026]** Base URL chính thức: `https://open-api.vbot.vn/v2.0`
- **[03/04/2026]** Response API không còn trả về trường `status` — sử dụng trường `error` để kiểm tra kết quả (`0` = Thành công).
- **[03/04/2026]** Thêm webhook events mới: `MANUAL_CALL_COMPLETE`, `MANUAL_CALL_RECORDING`, `MANUAL_CALL_AI_EXTRACTION`, `AUTO_CALL_COMPLETE`, `AUTO_CALL_AI_EXTRACTION`, `AUTO_CALL_RECORDING`, `P2P_CALL_LOG`, `IN_COMINGCALL`.
- **[03/04/2026]** Deprecated 3 webhook events cũ: `CAMPAIGN_CALL`, `HISTORY_CALL`, `HISTORY_CALL_PEERTOPEER`.
- **[26/05/2026]** Thay đổi Base URL sang: `https://open-api-h01.vbot.vn/v2.0`
:::

## 26/05/2026

### Thay đổi Base URL

Hệ thống thay đổi Base URL mới cho tất cả các API. Vui lòng cập nhật Base URL sau cho các tích hợp của bạn:

```text
https://open-api-h01.vbot.vn/v2.0
```

---

## 03/04/2026

### Thay đổi Response format

Response API **không còn** trả về trường `status`. Vui lòng sử dụng trường `error` để kiểm tra kết quả:

| Trường    | Kiểu   | Mô tả                                     |
| --------- | ------ | ------------------------------------------ |
| `error`   | Int    | `0` = Thành công, khác `0` = Có lỗi        |
| `message` | String | Thông tin chi tiết                          |
| `data`    | Any    | Dữ liệu trả về                             |

::: warning Lưu ý quan trọng
Nếu hệ thống của bạn đang kiểm tra trường `status` để xác định kết quả, hãy chuyển sang sử dụng trường `error`. Xem chi tiết tại [Response format chuẩn](./introduction#response-format-chuan).
:::

### Thêm Webhook Events mới

Hệ thống hỗ trợ các webhook event mới cho tất cả loại cuộc gọi:

**Cuộc gọi thường (Manual Call):**

| Event                        | Mô tả                                                            |
| ---------------------------- | ---------------------------------------------------------------- |
| `MANUAL_CALL_COMPLETE`       | Cuộc gọi thường hoàn tất — bao gồm lịch sử, ghi âm              |
| `MANUAL_CALL_LOG`            | Lịch sử 1 cuộc gọi thường vừa kết thúc                           |
| `MANUAL_CALL_RECORDING`      | File ghi âm cuộc gọi thường sẵn sàng tải về                      |
| `MANUAL_CALL_AI_EXTRACTION`  | AI hoàn tất trích xuất dữ liệu từ cuộc gọi thường                |

**Cuộc gọi tự động (Auto Call):**

| Event                      | Mô tả                                                               |
| -------------------------- | ------------------------------------------------------------------- |
| `AUTO_CALL_COMPLETE`       | Cuộc gọi tự động hoàn tất — bao gồm lịch sử, ghi âm và AI trích xuất |
| `AUTO_CALL_LOG`            | Lịch sử 1 cuộc gọi tự động vừa kết thúc                              |
| `AUTO_CALL_AI_EXTRACTION`  | AI hoàn tất trích xuất dữ liệu từ cuộc gọi tự động                  |
| `AUTO_CALL_RECORDING`      | File ghi âm cuộc gọi tự động sẵn sàng tải về                        |

**Cuộc gọi nội bộ & Cuộc gọi đến:**

| Event           | Mô tả                                          |
| --------------- | ----------------------------------------------- |
| `P2P_CALL_LOG`  | Lịch sử cuộc gọi nội bộ (peer-to-peer)          |
| `IN_COMINGCALL` | Thông báo realtime có cuộc gọi đang gọi vào      |

### Deprecated Webhook Events

Các event cũ vẫn hoạt động nhưng sẽ ngừng hỗ trợ trong tương lai:

| Event cũ                   | Thay thế bằng       |
| -------------------------- | -------------------- |
| `CAMPAIGN_CALL`            | `AUTO_CALL_LOG`      |
| `HISTORY_CALL`             | `MANUAL_CALL_LOG`    |
| `HISTORY_CALL_PEERTOPEER`  | `P2P_CALL_LOG`       |

Xem chi tiết payload tại [Webhooks](./webhooks).

---

## 04/03/2026

### Thêm bảng giá trị `disposition`

Bổ sung bảng mô tả chi tiết các trạng thái kết quả cuộc gọi (`disposition`) trong API:

| Giá trị     | Mô tả              |
| ----------- | ------------------- |
| `ANSWER`    | Cuộc gọi được nghe  |
| `NOANSWER`  | Không nghe máy      |
| `BUSY`      | Máy bận             |
| `CANCEL`    | Hủy cuộc gọi        |

Xem đầy đủ tại [Lịch sử cuộc gọi](./call-transaction) và [Lịch sử gọi Campaign](./campaign-cdr).

---

## 28/02/2026

### Ra mắt nhóm API Gọi tự động

Bổ sung nhóm API mới phục vụ tính năng **gọi tự động (Auto Call)**:

| API                | Mô tả                                    |
| ------------------ | ----------------------------------------- |
| [Tạo cuộc gọi](./campaign-call)        | Tạo cuộc gọi tự động đơn lẻ hoặc hàng loạt |
| [Trường tùy chỉnh](./campaign-custom-field) | Quản lý các trường dữ liệu tùy chỉnh     |
| [Kịch bản gọi](./campaign-template)    | Quản lý template kịch bản gọi             |
| [Lịch sử gọi](./campaign-cdr)          | Tra cứu lịch sử và hội thoại bot          |

### Base URL

Tất cả API sử dụng chung Base URL:

```
https://open-api.vbot.vn/v2.0
```

Xem hướng dẫn xác thực tại [Xác thực](./authentication).

---

## 13/02/2026

### API Lịch sử cuộc gọi trả thêm `external_call_id`

API `/api/crm/historycall/getAll` bổ sung trường `external_call_id` trong dữ liệu trả về, cho phép liên kết cuộc gọi với hệ thống bên ngoài.

Xem chi tiết tại [Lịch sử cuộc gọi](./call-transaction).

### Webhook trả thêm `external_call_id`

Webhook `HISTORY_CALL` và `HISTORY_CALL_PEERTOPEER` bổ sung trường `external_call_id` trong payload, cho phép liên kết cuộc gọi với hệ thống bên ngoài.

Xem chi tiết tại [Webhooks](./webhooks#history-call-history-call-peertopeer).
