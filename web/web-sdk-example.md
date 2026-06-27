---
outline: deep
---

# Ví dụ tích hợp VBot Web SDK

Trang này cung cấp hướng dẫn và mã nguồn mẫu tích hợp **VBot Web SDK** trên các nền tảng phổ biến (**HTML thuần, React, VueJS, Svelte**) cùng luồng xác thực an toàn từ Backend.

::: tip Dự án mẫu chạy thực tế (Github Example)
Chúng tôi cung cấp một kho mã nguồn mở mẫu tích hợp đầy đủ giao diện CRM giả lập và các luồng gọi điện. Bạn có thể clone và chạy thử:
👉 **Link GitHub**: [VBot-Web-SDK-Example](https://github.com/VBotDevTeam/VBot-Web-SDK-Example)
:::

---

## 1. Luồng hoạt động (Architecture)

Quy trình tích hợp chuẩn gồm 2 giai đoạn:
1. **Backend (Server-to-Server)**: Gọi Open API của VBot bằng API Key đối tác để khởi tạo thành viên động (JIT provisioning) và lấy token kết nối SDK bảo mật.
2. **Frontend (Client-side)**: Truyền Token vừa nhận từ Server vào thẻ `<vbot-widget>` để khởi chạy bàn phím và tính năng VoIP SIP.

---

## 2. Bước 1: Lấy SDK Token từ Backend

Backend của bạn sẽ thực hiện gọi API `POST /api/sdk/tokenSdk` của VBot. Đầu API này sẽ kiểm tra `member_no`, nếu chưa có sẽ tự động khởi tạo member mới trên VBot, gán hotline và trả về token JWT ngắn hạn cho Client.

::: code-group
```javascript [Node.js (Axios)]
const axios = require('axios');

async function getSdkToken(memberNo, hotlines) {
  try {
    const response = await axios.post(
      'https://open-api.vbot.vn/v3.0/api/sdk/tokenSdk',
      {
        member_no: memberNo,
        hotline_codes: hotlines // Ví dụ: ['hotline_1', 'hotline_2']
      },
      {
        headers: {
          'Authorization': `Bearer ${YOUR_PARTNER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    if (response.data.error === 0) {
      return response.data.data; // Trả về JWT Token SDK
    }
    throw new Error(response.data.message);
  } catch (error) {
    console.error('Lỗi lấy token:', error.message);
  }
}
```

```python [Python (Requests)]
import requests

def get_sdk_token(member_no, hotlines):
    url = "https://open-api.vbot.vn/v3.0/api/sdk/tokenSdk"
    headers = {
        "Authorization": f"Bearer {YOUR_PARTNER_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "member_no": member_no,
        "hotline_codes": hotlines
    }
    
    response = requests.post(url, json=payload, headers=headers)
    result = response.json()
    
    if result.get("error") == 0:
        return result.get("data") # Trả về JWT Token SDK
    else:
        raise Exception(result.get("message"))
```
:::

**Phản hồi giả lập từ VBot API:**
```json
{
  "error": 0,
  "message": "success",
  "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJWYWx1ZSI6ImFnZW50XzAwMSJ9..."
}
```

---

## 3. Bước 2: Nhúng & Cấu hình Widget dưới Frontend

Sau khi Frontend nhận được Token từ Backend của bạn, tiến hành nhúng và khởi tạo `<vbot-widget>` tùy thuộc vào framework đang sử dụng:

::: code-group
```html [HTML Thuần (Vanilla)]
<!-- Nhập SDK qua CDN -->
<script src="https://cdn.vbot.vn/vbot-sdk/vbot-sdk.umd.js" defer></script>

<!-- Nhúng thẻ Custom Element -->
<vbot-widget 
  token="TOKEN_NHẬN_TỪ_BACKEND"
  disconnect-sound-url="https://your-domain.com/sound-ended.webm"
></vbot-widget>
```

```tsx [React]
// 1. Cấu hình kiểu JSX cho Custom Element (src/vite-env.d.ts)
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'vbot-widget': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        token?: string;
        headless?: string;
        config?: string;
        ref?: React.RefObject<any>;
        'disconnect-sound-url'?: string;
      };
    }
  }
}

// 2. Component sử dụng Widget
import React, { useRef } from 'react';

export const PhoneWidget = ({ token }) => {
  const widgetRef = useRef(null);

  return (
    <vbot-widget 
      ref={widgetRef} 
      token={token} 
      disconnect-sound-url="https://your-domain.com/sound-ended.webm"
    />
  );
};
```

```vue [VueJS]
<!-- 1. Cấu hình compilerOptions tránh lỗi Custom Element (vite.config.js) -->
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('vbot-')
        }
      }
    })
  ]
});

<!-- 2. Component (PhoneCall.vue) -->
<template>
  <vbot-widget 
    ref="widgetRef" 
    :token="token" 
    disconnect-sound-url="https://your-domain.com/sound-ended.webm"
  />
</template>

<script setup>
import { ref } from 'vue';
defineProps({ token: String });
const widgetRef = ref(null);
</script>
```

```html [Svelte]
<!-- Svelte component (Phone.svelte) -->
<script>
  export let token = "";
  let widgetEl;
</script>

<vbot-widget 
  bind:this={widgetEl} 
  {token} 
  disconnect-sound-url="https://your-domain.com/sound-ended.webm"
/>
```
:::

---

## 4. Bước 3: Tương tác với SDK và Lắng nghe sự kiện

Bằng cách truy cập trực tiếp phần tử DOM của `<vbot-widget>`, bạn có thể gọi các phương thức để thực hiện cuộc gọi hoặc bắt sự kiện gửi ra để tương tác với hệ thống CRM (như mở popup thông tin khách hàng).

::: code-group
```javascript [HTML Thuần (Vanilla)]
const widget = document.querySelector('vbot-widget');

// Gọi điện đi
widget.makeCall('0912345678', 'hotline_mien_bac');

// Lắng nghe cuộc gọi đến
widget.addEventListener('vbot:onCallIncoming', (event) => {
  console.log('Có cuộc gọi đến từ số:', event.detail.phoneNumber);
  // Thực hiện hiển thị popup thông tin khách hàng trên CRM
});
```

```javascript [React]
import { useEffect } from 'react';

// Quản lý sự kiện trong useEffect hook
useEffect(() => {
  const widget = widgetRef.current;
  if (!widget) return;

  const handleIncoming = (e) => {
    console.log('Ringing:', e.detail.phoneNumber);
  };
  
  widget.addEventListener('vbot:onCallIncoming', handleIncoming);
  return () => {
    widget.removeEventListener('vbot:onCallIncoming', handleIncoming);
  };
}, [token]);

const handleCall = () => {
  widgetRef.current?.makeCall('0912345678');
};
```

```javascript [VueJS]
import { onMounted, onUnmounted } from 'vue';

const handleIncoming = (e) => {
  console.log('Ringing:', e.detail.phoneNumber);
};

onMounted(() => {
  widgetRef.value?.addEventListener('vbot:onCallIncoming', handleIncoming);
});

onUnmounted(() => {
  widgetRef.value?.removeEventListener('vbot:onCallIncoming', handleIncoming);
});
```

```javascript [Svelte]
import { onMount } from 'svelte';

const handleIncoming = (e) => {
  console.log('Ringing:', e.detail.phoneNumber);
};

onMount(() => {
  widgetEl.addEventListener('vbot:onCallIncoming', handleIncoming);
  return () => {
    widgetEl.removeEventListener('vbot:onCallIncoming', handleIncoming);
  };
});
```
:::
