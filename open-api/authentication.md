---
outline: deep
---

# Xác thực

API dùng để lấy access token. Acess token là chuỗi mã hóa chứa thông tin của doanh nghiệp, có thời gian hết hạn là 24 giờ.

## Lấy token

Lấy token để truy cập các API khác

<div class="api-container">
  <span class="api-method method-post">POST</span>
  <span>[URL]/token</span>
</div>


## Parameters

### Header

|              |                       |
|--------------|---------------------------------|
| Accept      | application/json               |
| Content-Type | application/x-www-form-urlencoded |

### Body


|             |             |                |
|-------------|-------------|----------------------|
| username    | String      | Tên tài khoản       |
| password    | String      | Mật khẩu            |
| grant_type  | String      | Mặc định: "password" |

``` JSON
{
    "username": "",
    "grant_type": "password",
    "password": ""
}
``` 

### Response

|               |            |                             |
|---------------|------------|-----------------------------|
| access_token  | String     | Access token truy cập       |
| token_type    | String     | Bearer                      |
| expires_in    | Long       | Thời hạn token tính bằng giây |
| refresh_token | String     | Chuỗi cấp token mới         |


``` JSON
{
    "access_token": "du7wzwDFqB3CzFRCYxK76YNziYEHN6YSWN_xUj1ahUGxxxx",
    "token_type": "bearer",
    "expires_in": 899,
    "refresh_token": "f2bd26e2-5274-4ac3-9db6-0b828027f446"
}
```

## Lấy token mới

Lấy token mới khi token hết hạn

<div class="api-container">
  <span class="api-method method-post">POST</span>
  <span>[URL]/token</span>
</div>


## Parameters

### Header
|               |                                         |
|---------------|-----------------------------------------|
| Accept        | application/json                        |
| Content-Type  | application/x-www-form-urlencoded       |

### Body

| refresh_token | String      | refresh_token khi lấy token lần đầu |
|---------------|-------------|-------------------------------------|
| grant_type    | String      | Mặc định: "refresh_token"           |

### Response

| access_token  | String     | Access token truy cập         |
|---------------|------------|-------------------------------|
| token_type    | String     | Bearer                        |
| expires_in    | Long       | Thời hạn token tính bằng giây |
| refresh_token | String     | Chuỗi cấp token mới           |

``` JSON
{
    "access_token": "du7wzwDFqB3CzFRCYxK76YNziYEHN6YSWN_xUj1ahUGxxxx",
    "token_type": "bearer",
    "expires_in": 899,
    "refresh_token": "f2bd26e2-5274-4ac3-9db6-0b828027f446"
}

