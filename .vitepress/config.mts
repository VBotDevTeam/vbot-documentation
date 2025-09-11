import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "VBot Documentation",
  description: "Official documentation for VBot",
  head: [
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        href: "/vbot-documentation/app-logo.png",
      },
    ],
  ],
  base: "/vbot-documentation/",
  themeConfig: {
    docFooter: {
      prev: "Trang trước",
      next: "Trang sau",
    },
    nav: [
      { text: "Trang chủ", link: "/" },
      { text: "Tài liệu", link: "/open-api/introduction" },
    ],

    sidebar: [
      {
        text: "Open API",
        collapsed: false,
        items: [
          { text: "Giới thiệu", link: "/open-api/introduction" },
          { text: "Webhooks", link: "/open-api/webhooks" },
          { text: "Xác thực", link: "/open-api/authentication" },
          { text: "Khách hàng", link: "/open-api/customers" },
          { text: "Thành viên", link: "/open-api/member" },
          { text: "Nhóm thành viên", link: "/open-api/group-member" },
          { text: "Hotline", link: "/open-api/hotline" },
          { text: "Lịch sử cuộc gọi", link: "/open-api/call-transaction" },
          { text: "Gọi tự động", link: "/open-api/autocall" },
        ],
      },
      {
        text: "Web",
        collapsed: false,
        items: [
          { text: "Web SDK", link: "/web/web-sdk" },
          { text: "Web Plugin", link: "/web/web-phone" },
          { text: "Web Quick Dial Widget", link: "/web/web-quick-dial-widget" },
        ],
      },
      {
        text: "Android SDK",
        collapsed: false,
        items: [
          { text: "Cấu hình SDK", link: "/android-sdk/cau-hinh-sdk" },
          { text: "Push Notification", link: "/android-sdk/push-notification" },
          { text: "Khởi tạo SDK", link: "/android-sdk/khoi-tao-sdk" },
          { text: "Hướng dẫn sử dụng", link: "/android-sdk/huong-dan-su-dung" },
        ],
      },
      {
        text: "iOS SDK",
        collapsed: false,
        items: [
          { text: "Push Notification", link: "/ios-sdk/push-notification" },
          { text: "Cấu hình SDK", link: "/ios-sdk/cau-hinh-sdk" },
          { text: "Hướng dẫn sử dụng", link: "/ios-sdk/huong-dan-su-dung" },
        ],
      },
    ],
    outlineTitle: "Mục lục",
    logo: "/app-logo.png",
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "Tìm kiếm",
            buttonAriaLabel: "Tìm kiếm",
          },
          modal: {
            displayDetails: "Hiển thị danh sách chi tiết",
            resetButtonTitle: "Đặt lại tìm kiếm",
            backButtonTitle: "Đóng tìm kiếm",
            noResultsText: "Không có kết quả",
            footer: {
              selectText: "Chọn",
              selectKeyAriaLabel: "Nhập",
              navigateText: "Điều hướng",
              navigateUpKeyAriaLabel: "Mũi tên lên",
              navigateDownKeyAriaLabel: "Mũi tên xuống",
              closeText: "Đóng",
              closeKeyAriaLabel: "Esc",
            },
          },
        },
      },
    },
  },
});
