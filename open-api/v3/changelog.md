---
outline: deep
---

# Changelog

Trang này ghi lại các thay đổi quan trọng của VBot Open API v3.0. Vui lòng theo dõi để cập nhật tích hợp kịp thời.

::: warning Cập nhật quan trọng

- **[11/06/2026]** Phát hành API v3.0: Cập nhật Base URL, chuyển sang xác thực bằng Header `X-API-Key` và gỡ bỏ tham số `vbot_id`, `project_code`.

:::

## 11/06/2026

### Phát hành Open API v3.0

Hệ thống chính thức nâng cấp Open API lên phiên bản v3.0 với các cải tiến nhằm tăng tính bảo mật và tối ưu trải nghiệm tích hợp:

1. **Cập nhật Base URL**: Tất cả các API được chuyển sang version `v3.0`.
   ```text
   https://open-api-h01.vbot.vn/v3.0
   ```
2. **Xác thực bằng API Key**: Các request giờ đây yêu cầu xác thực thông qua custom Header là `X-API-Key`.
3. **Tối giản tham số**: Loại bỏ hoàn toàn tham số `vbot_id` và `project_code` khỏi URL và request body của toàn bộ API. Việc định danh sẽ được hệ thống xử lý tự động qua API Key.
