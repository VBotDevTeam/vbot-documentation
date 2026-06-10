import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
function getSidebar(version: 'v2' | 'v3') {
  return [
    {
      text: `Open API ${version.toUpperCase()}`,
      collapsed: false,
      items: [
        { text: "Giới thiệu", link: `/open-api/${version}/introduction` },
        { text: "Changelog", link: `/open-api/${version}/changelog` },
        { text: "Xác thực", link: `/open-api/${version}/authentication` },
        { text: "Webhooks", link: `/open-api/${version}/webhooks` },
        {
          text: "Khách hàng",
          collapsed: true,
          items: [
            { text: "Quản lý khách hàng", link: `/open-api/${version}/customers` },
            { text: "Trạng thái khách hàng", link: `/open-api/${version}/customer-status` },
            { text: "Kiểu khách hàng", link: `/open-api/${version}/customer-type` },
            { text: "Nhóm khách hàng", link: `/open-api/${version}/customer-group` },
            { text: "Trường thông tin", link: `/open-api/${version}/customer-field` },
          ],
        },
        {
          text: "Thành viên",
          collapsed: true,
          items: [
            { text: "Quản lý thành viên", link: `/open-api/${version}/member` },
            { text: "Tài khoản SDK", link: `/open-api/${version}/member-sdk` },
            { text: "Tài khoản SIP", link: `/open-api/${version}/member-sip` },
          ],
        },
        {
          text: "Nhóm thành viên",
          collapsed: true,
          items: [
            { text: "Quản lý nhóm", link: `/open-api/${version}/group-member` },
            { text: "Thành viên trong nhóm", link: `/open-api/${version}/group-member-action` },
          ],
        },
        {
          text: "Hotline",
          collapsed: true,
          items: [
            { text: "Danh sách hotline", link: `/open-api/${version}/hotline` },
            { text: "Hotline thành viên", link: `/open-api/${version}/hotline-member` },
          ],
        },
        {
          text: "Cuộc gọi",
          collapsed: true,
          items: [
            { text: "Lịch sử cuộc gọi", link: `/open-api/${version}/call-transaction` },
          ],
        },
        {
          text: "Gọi tự động",
          collapsed: true,
          items: [
            { text: "Tạo cuộc gọi", link: `/open-api/${version}/campaign-call` },
            { text: "Trường tùy chỉnh", link: `/open-api/${version}/campaign-custom-field` },
            { text: "Kịch bản gọi", link: `/open-api/${version}/campaign-template` },
            { text: "Lịch sử gọi", link: `/open-api/${version}/campaign-cdr` },
          ],
        },
      ],
    },
    {
      text: "Web",
      collapsed: false,
      items: [
        { text: "Web SDK", link: "/web/web-sdk" },
        { text: "Web Quick Dial Widget", link: "/web/web-quick-dial-widget" },
      ],
    },
    {
      text: "Android SDK",
      collapsed: false,
      items: [
        { text: "Changelog", link: "/android-sdk/changelog" },
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
        { text: "Changelog", link: "/ios-sdk/changelog" },
        { text: "Push Notification", link: "/ios-sdk/push-notification" },
        { text: "Cấu hình SDK", link: "/ios-sdk/cau-hinh-sdk" },
        { text: "Hướng dẫn sử dụng", link: "/ios-sdk/huong-dan-su-dung" },
      ],
    },
  ];
}

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
      {
        text: "Open API",
        items: [
          { text: "Open API v3 (Mới nhất)", link: "/open-api/v3/introduction" },
          { text: "Open API v2 (Cũ)", link: "/open-api/v2/introduction" },
        ],
      },
    ],

    sidebar: {
      "/open-api/v2/": getSidebar("v2"),
      "/open-api/v3/": getSidebar("v3"),
      "/": getSidebar("v3"),
    },
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
