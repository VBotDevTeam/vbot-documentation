---
outline: deep
---

# VBot Web SDK

Javascript SDK giúp khách hàng tích hợp VBot vào website của mình.

## Tích hợp

Thêm script bundle từ CDN:

```html
<script src="https://cdn.vbot.vn/vbot-sdk/vbot-sdk.es.js" defer></script>
```

Khuyến nghị sử dụng `defer` hoặc đặt ở cuối trang để widget đăng ký custom element sau khi tải xong.

## Kết nối

```JAVASCRIPT

// Khởi tạo client
// access_token: Token của user
var client = await VBotClient(access_token);

// Kết nối với máy chủ VBot
client.connect()
```

## Nhận các sự kiện kết nối của tài khoản

```JAVASCRIPT
// CONNECTING = 'connecting',
// CONNECTED = 'connected',
// RECOVERING = 'recovering',
// DISCONNECTING = 'disconnecting',
// DISCONNECTED = 'disconnected'

client.on('statusUpdate', function (status) {
    logger.info(`Trạng thái tài khoản đã thay đổi thành ${status}`);
});
```

## Lấy danh sách hotline

```JAVASCRIPT
const hotlines = await client.getHotlines();
```

## Thực hiện cuộc gọi

```JAVASCRIPT
try {
	// Khởi tạo cuộc gọi
	// phoneNumber: Số điện thoại cần gọi
	// hotlineNumber: Số hotline
	const session = await client.invite(phoneNumber, hotlineNumber).catch(logger.error);

	session.on('progressUpdate', response => {
    	if (response.message.statusCode === 180) {
        // Web tự phát nhạc chờ tự chọn của mình

      	} else if (response.message.statusCode === 183) {
    		// Phát nhạc chờ, early media của nhà mạng
        	session.sessionSetDescription(response.message.body).catch(exception => {
				session.terminate({
            	statusCode: 488,
            	reason_phrase: 'Bad Media Description'
          		});
        	});
      	}
    });

	if (!session) {
 	   return;
	}

	// Hiển thị progress đang gọi
	// showOutgoingCallProgressHub();

	let { accepted, rejectCause } = await session.accepted(); // wait until the call is picked up
	if (!accepted) {
		// Hiển thị màn hình cuộc gọi bị từ chối
    	// showCallRejectedScreen(rejectCause);
    	return;
	}

	// Hiện màn hình cuộc gọi
	// showCallScreen();

	// Cuộc gọi kết thúc
	await session.terminated(); // wait until the call is terminated
} catch (e) {
	logger.error(e);
}
```

## Lắng nghe sự kiện cuộc gọi đến

```JAVASCRIPT
client.on('invite', (session) => {
	try {
		// Đổ chuông
    	ringer();

		// Chờ người dùng trả lời
    	let { accepted, rejectCause } = await session.accepted();
    	if (!accepted) {
    		return;
    	}
		// Tắt chuông
		// Hiển thị màn hình cuộc gọi
    	// showCallScreen();

		// Cuộc gọi kết thúc
    	await session.terminated(); // wait until the call is terminated
  	} catch (e) {
    	logger.error(e);
  	} finally {
		// Tắt màn hình cuộc gọi
    	// closeCallScreen();
  	}
});
```

## Lắng nghe các sự kiện của cuộc gọi

```JAVASCRIPT
// TRYING = 'trying',
// RINGING = 'ringing',
// ACTIVE = 'active',
// ON_HOLD = 'on_hold',
// TERMINATED = 'terminated'
this.session.on('statusUpdate', function (status) {
    logger.info(`Trạng thái của cuộc gọi đã thay đổi thành ${status}`);
});
```

## Các hành động trong một cuộc gọi

```JAVASCRIPT

// Lấy thông tin số điện thoại đang gọi
this.session.phoneNumber;

// Chấp nhận 1 cuộc gọi đến
await this.session.accept();

// Từ chối 1 cuộc gọi đến
await this.session.reject();

// Kết thúc cuộc gọi
await this.session.terminate();

// Hủy 1 cuộc gọi đi
await this.session.cancel();

// Hold cuộc gọi
await this.session.hold();

// Unhold cuộc gọi
await this.session.unhold();

// Mute âm thanh đầu vào
this.session.media.input.muted = !this.session.media.input.muted;

// Gửi DTMF
this.session.dtmf(dataset.key);

// Thay đổi I/O devices
client.defaultMedia.output.id = 'device output id';
client.defaultMedia.input.id = 'device input id';

//Thay đổi I/O devices của 1 cuộc gọi
this.session.media.input.volume = 80;
this.session.media.input.audioProcessing = false;
this.session.media.input.muted = true;
this.session.media.output.muted = false;
this.session.media.setInput({
  id: 'device input id',
  audioProcessing: true,
  volume: 0.8,
  muted: false
});

```
