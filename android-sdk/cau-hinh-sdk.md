---
outline: deep
---

# Cấu hình SDK

## 1. Thêm repository

Thêm vào `settings.gradle` (hoặc `build.gradle` ở thư mục gốc). Repo Public phục vụ như Maven tĩnh qua `raw.githubusercontent.com`, không cần credential:

```groovy
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
        maven { url 'https://raw.githubusercontent.com/VBotDevTeam/VBotPhoneSDKAndroid-Public/main/' }
    }
}
```

## 2. Thêm SDK vào `app/build.gradle`

```groovy
dependencies {
    // Chỉ một dòng duy nhất — mọi thư viện phụ thuộc đã nằm sẵn trong SDK.
    implementation 'com.github.VBotDevTeam:VBotPhoneSDKAndroid-Public:1.1.2'
}
```

::: warning Nâng cấp từ 1.0.x
Hãy **xoá toàn bộ** các dòng khai báo rxjava / gson / retrofit / okhttp / reactive-streams / timber mà tài liệu cũ yêu cầu, cùng mọi `exclude group: 'com.squareup.okio'` đã thêm để né xung đột — chúng không còn cần thiết. Đồng thời đổi repository từ `jitpack.io` sang `raw.githubusercontent.com` như trên.
:::

## 3. ProGuard / R8

SDK đã kèm sẵn **consumer ProGuard rules**
