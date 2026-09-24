---
outline: deep
---

# Changelog

Trang này ghi lại các thay đổi quan trọng của VBot Open API v3.0. Vui lòng theo dõi để cập nhật tích hợp kịp thời.

::: warning Cập nhật quan trọng

- **[11/06/2026]** Phát hành API v3.0: Cập nhật Base URL, chuyển sang xác thực bằng Header `X-API-Key` và gỡ bỏ tham số `vbot_id`, `project_code`.
- **[23/06/2026]** Bổ sung nhóm API Quản lý khách hàng, Tuỳ chỉnh thông tin và Lịch sử tương tác.
- **[27/06/2026]** Bổ sung API Tạo tài khoản & lấy Token SDK một bước (`POST /api/sdk/tokenSdk`), API lấy số dư tài khoản Admin (`GET /api/account/balance`), cập nhật trường `hotline_type` trong danh sách hotline (`GET /api/hotline/getAll`) và tính năng âm thanh ngắt kết nối (`disconnectSoundUrl`).
- **[13/08/2026]** Bổ sung API Tạo cuộc gọi tự động đến tài khoản thành viên SDK (`POST /m-auto-call/api/call/create-list-member`) và trang hướng dẫn nghiệp vụ Gọi thành viên SDK.
- **[24/09/2026]** Nâng cấp nhóm API Lịch sử cuộc gọi và Gọi tự động: Phân tách API theo từng module riêng biệt (`/m-cdr/` và `/m-auto-call/`) giúp tối ưu hiệu năng và mở rộng hệ thống. Các API cũ vẫn hoạt động bình thường.

:::

## 24/09/2026

Phân tách các nhóm API theo từng module riêng biệt: Lịch sử cuộc gọi (`/m-cdr/`) và Gọi tự động (`/m-auto-call/`) giúp tối ưu hiệu năng xử lý và dễ dàng mở rộng hệ thống.

### Nâng cấp nhóm API Lịch sử cuộc gọi

- `GET /m-cdr/api/call/get-all`: Lấy danh sách tất cả cuộc gọi (theo nhóm) của dự án với các bộ lọc nâng cao và phân trang.
- `GET /m-cdr/api/call/count-all`: Đếm tổng số lượng cuộc gọi theo các điều kiện lọc.
- `GET /m-cdr/api/call/get-detail`: Lấy danh sách chi tiết các luồng của cuộc gọi.
- `GET /m-cdr/api/call/record`: Lấy file ghi âm cuộc gọi.
- **Ghi chú**: Các API cũ (`/api/crm/historycall/...`) vẫn được duy trì hoạt động bình thường, tài liệu khuyến nghị chuyển đổi sang các API mới.

### Nâng cấp nhóm API Gọi tự động

- `POST /m-auto-call/api/call/create`: Tạo cuộc gọi đơn đến một số điện thoại duy nhất.
- `POST /m-auto-call/api/call/create-list-phone`: Tạo cuộc gọi tự động đến danh sách SĐT.
- `POST /m-auto-call/api/call/create-list-member`: Tạo cuộc gọi tự động đến danh sách tài khoản thành viên SDK.
- `GET /m-auto-call/api/cdr/get-all`: Tra cứu lịch sử cuộc gọi tự động.
- `GET /m-auto-call/api/cdr/count`: Đếm tổng số lượng bản ghi lịch sử cuộc gọi tự động theo bộ lọc.
- `GET /m-auto-call/api/cdr/get-bot-conversation`: Truy xuất toàn bộ nội dung hội thoại giữa Bot AI và khách hàng.
- `GET /m-auto-call/api/template-script/get-all`: Lấy danh sách kịch bản gọi tự động.
- `GET /m-auto-call/api/template-script/count`: Đếm tổng số lượng kịch bản gọi tự động.
- `GET /m-auto-call/api/template-script-sub/get-all`: Lấy danh sách nhánh kịch bản.
- **Ghi chú**: Các API cũ (`/api/campaignCall/...`) vẫn được duy trì hoạt động bình thường, tài liệu khuyến nghị chuyển đổi sang các API mới.

## 13/08/2026

### Bổ sung API Tạo cuộc gọi tự động cho thành viên SDK

1. **API Tạo cuộc gọi tự động đến thành viên SDK (`POST /m-auto-call/api/call/create-list-member`)**:
   - Bổ sung API cho phép Backend đối tác phát cuộc gọi cảnh báo trực tiếp qua VoIP tới danh sách tài khoản SDK (`member_no`).
   - Tùy chỉnh tên hiển thị (`display_name`), mã kịch bản cuộc gọi (`template_code`), giới hạn thời gian và danh sách các biến tùy chỉnh (`datas`).
2. **Cập nhật trang tài liệu Gọi thành viên SDK**:
   - Bổ sung trang tài liệu nghiệp vụ [Gọi thành viên SDK](/open-api/v3/campaign-sdk-member) bao gồm sơ đồ luồng tuần tự Backend, Usecase tích hợp SDK và liên kết sự kiện Webhook (`AUTO_CALL_COMPLETE`, `AUTO_CALL_AI_EXTRACTION`, `AUTO_CALL_RECORDING`).

## 27/06/2026

### Bổ sung API Token SDK, Số dư Admin & Trả về Loại Hotline

1. **API Tạo tài khoản & lấy Token SDK (`POST /api/sdk/tokenSdk`)**:
   - Bổ sung API một bước (One-Step Provisioning) dành cho Backend đối tác để tự động khởi tạo thành viên và cấp JWT token kết nối SDK.
2. **Quản lý Tài chính & Số dư**:
   - Bổ sung API lấy số dư tài khoản Admin (`GET /api/account/balance`) để theo dõi ngân sách dự án.
3. **Cập nhật trường Loại Hotline (`GET /api/hotline/getAll`)**:
   - API danh sách hotline chính thức trả về thêm trường `hotline_type` có giá trị `ALIAS` hoặc `HOTLINE` nhằm phục vụ việc kiểm tra và phân biệt loại hotline hoạt động của dự án.
4. **Âm thanh ngắt cuộc gọi (Web SDK)**:
   - Tự động phát âm thanh kết thúc cuộc gọi khi cuộc gọi gác máy hoặc bị lỗi.
   - Hỗ trợ thuộc tính cấu hình `disconnectSoundUrl` (hoặc attribute `disconnect-sound-url` trên thẻ `<vbot-widget>`) để tùy chỉnh file âm thanh ngắt kết nối.

## 23/06/2026

### Bổ sung nhóm API Quản lý khách hàng

Bổ sung các nhóm API hỗ trợ quản trị và tích hợp dữ liệu khách hàng:

1. **Quản lý khách hàng**: Bổ sung API truy xuất danh sách, xem chi tiết, đếm số lượng, thêm mới, cập nhật và xóa khách hàng.
2. **Tuỳ chỉnh thông tin**: Bổ sung API quản lý các cấu hình trường thông tin động của khách hàng.
3. **Lịch sử tương tác**: Bổ sung API tra cứu lịch sử tương tác của khách hàng.

## 11/06/2026

### Phát hành Open API v3.0

Hệ thống chính thức nâng cấp Open API lên phiên bản v3.0 với các cải tiến nhằm tăng tính bảo mật và tối ưu trải nghiệm tích hợp:

1. **Cập nhật Base URL**: Tất cả các API được chuyển sang version `v3.0`.
   ```text
   https://open-api-h01.vbot.vn/v3.0
   ```
2. **Xác thực bằng API Key**: Các request giờ đây yêu cầu xác thực thông qua custom Header là `X-API-Key`.
3. **Tối giản tham số**: Loại bỏ hoàn toàn tham số `vbot_id` và `project_code` khỏi URL và request body của toàn bộ API. Việc định danh sẽ được hệ thống xử lý tự động qua API Key.
