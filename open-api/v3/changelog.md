---
outline: deep
---

# Changelog

Trang này ghi lại các thay đổi quan trọng của VBot Open API v3.0. Vui lòng theo dõi để cập nhật tích hợp kịp thời.

::: warning Cập nhật quan trọng

- **[11/06/2026]** Phát hành API v3.0: Cập nhật Base URL, chuyển sang xác thực bằng Header `X-API-Key` và gỡ bỏ tham số `vbot_id`, `project_code`.
- **[23/06/2026]** Bổ sung nhóm API Quản lý khách hàng, Tuỳ chỉnh thông tin và Lịch sử tương tác.
- **[27/06/2026]** Bổ sung API Tạo tài khoản & lấy Token SDK một bước (`POST /api/sdk/tokenSdk`), API Tài chính (Số dư Admin, Nạp/trừ tiền thành viên), API Hotline thành viên và tính năng âm thanh ngắt kết nối (`disconnectSoundUrl`) cho Web SDK.

:::

## 27/06/2026

### Cập nhật & Bổ sung API Quản lý Tài chính, Hotline và SDK Token

1. **API Tạo tài khoản & lấy Token SDK (`POST /api/sdk/tokenSdk`)**: 
   * Bổ sung API một bước (One-Step Provisioning) dành cho Backend đối tác để tự động khởi tạo thành viên và cấp JWT token kết nối SDK.
2. **Quản lý Tài chính & Số dư**:
   * Bổ sung API lấy số dư tài khoản Admin (`GET /api/account/balance`).
   * Bổ sung API nạp/trừ tiền cho Thành viên (`POST /api/member/addMoney`), hỗ trợ truyền số dương để nạp và số âm để trừ tiền.
3. **Quản lý Hotline**:
   * Bổ sung API gán hotline cho thành viên (`POST /api/hotline/member/add`).
   * Bổ sung API xóa hotline của thành viên (`POST /api/hotline/member/delete`).
   * Cập nhật API danh sách hotline (`GET /api/hotline/getAll`) trả về thêm trường `hotline_type` (`ALIAS` hoặc `HOTLINE`).
4. **Âm thanh ngắt cuộc gọi (Web SDK)**: 
   * Tự động phát âm thanh kết thúc cuộc gọi khi cuộc gọi gác máy hoặc bị lỗi.
   * Hỗ trợ thuộc tính cấu hình `disconnectSoundUrl` (hoặc attribute `disconnect-sound-url` trên thẻ `<vbot-widget>`) để tùy chỉnh file âm thanh ngắt kết nối.

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
