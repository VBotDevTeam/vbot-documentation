---
outline: deep
---

# Cấu hình SDK

Thêm JitPack vào project Android

```
allprojects {
    repositories {
        mavenCentral()
+       maven { url 'https://jitpack.io' }
    }
}
```

Mở app/build.gradle thêm VBot SDK

```
dependencies {
		//các thư viện cần thiết để SDK hoạt động
+		implementation("io.reactivex.rxjava2:rxjava:2.2.21")
+		implementation("com.google.code.gson:gson:2.11.0")
+		implementation("com.squareup.retrofit2:adapter-rxjava2:2.11.0")
+		implementation("com.squareup.retrofit2:converter-gson:2.11.0")
+		implementation("com.squareup.retrofit2:retrofit:2.11.0")
+		implementation("org.reactivestreams:reactive-streams:1.0.4")
+		implementation ("com.squareup.okhttp3:okhttp:5.0.0-alpha.14")
+		implementation("com.jakewharton.timber:timber:5.0.1")
+		implementation("com.squareup.okhttp3:okhttp-dnsoverhttps:4.9.0")
+		implementation 'com.github.VBotDevTeam:VBotPhoneSDKAndroid-Public:1.0.12'
}
```
