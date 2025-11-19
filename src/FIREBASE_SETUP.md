# 🔥 HƯỚNG DẪN SETUP FIREBASE CHO LUCKY NUMBER APP

## Bước 1: Tạo Firebase Project

1. Truy cập [Firebase Console](https://console.firebase.google.com/)
2. Đăng nhập bằng tài khoản Google
3. Click **"Add project"** (Thêm dự án)
4. Đặt tên project: `lucky-number-stem-day` (hoặc tên bạn thích)
5. Tắt Google Analytics (không cần thiết cho app này)
6. Click **"Create project"**

## Bước 2: Tạo Realtime Database

1. Trong Firebase Console, vào menu bên trái chọn **"Build" > "Realtime Database"**
2. Click **"Create Database"**
3. Chọn location gần bạn nhất:
   - **Singapore**: `asia-southeast1`
   - **US**: `us-central1`
4. Chọn **"Start in test mode"** (cho development)
5. Click **"Enable"**

## Bước 3: Cấu hình Database Rules

1. Trong Realtime Database, chọn tab **"Rules"**
2. Paste rules sau vào:

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

3. Click **"Publish"**

⚠️ **LƯU Ý**: Rules trên dùng cho demo/testing. Khi deploy production, nên có rules bảo mật chặt chẽ hơn:

```json
{
  "rules": {
    "session": {
      ".read": true,
      ".write": true
    },
    "history": {
      ".read": true,
      ".write": true
    }
  }
}
```

## Bước 4: Lấy Firebase Config

1. Trong Firebase Console, click vào icon **⚙️ Settings** > **"Project settings"**
2. Scroll xuống phần **"Your apps"**
3. Click vào icon **Web (</>)** để thêm web app
4. Đặt nickname: `Lucky Number Web`
5. **KHÔNG** tick vào "Also set up Firebase Hosting"
6. Click **"Register app"**
7. Copy đoạn code `firebaseConfig` object

## Bước 5: Cập nhật Config trong Code

1. Mở file `/config/firebase.ts`
2. Thay thế object `firebaseConfig` bằng config bạn vừa copy
3. Ví dụ:

```typescript
const firebaseConfig = {
  apiKey: "AIzaSyD-9tSKYqEaL4k8JfZ3jQxPxMxN0F4d6Yw",
  authDomain: "lucky-number-stem.firebaseapp.com",
  databaseURL: "https://lucky-number-stem-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "lucky-number-stem",
  storageBucket: "lucky-number-stem.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456"
};
```

4. **Quan trọng**: Đảm bảo `databaseURL` có format đúng với region bạn chọn

## Bước 6: Test Kết Nối

1. Lưu file và chạy lại ứng dụng
2. Khi mở app, modal đăng nhập sẽ hiện ra
3. Nhập mã admin: `STEMDAY2025`
4. Nếu thành công, bạn sẽ thấy badge "ADMIN" góc phải màn hình
5. Mở một tab/cửa sổ mới, vào chế độ "Viewer"
6. Quay số ở tab Admin, tab Viewer sẽ cập nhật realtime! 🎉

## Cấu Trúc Dữ Liệu Firebase

App sẽ tạo cấu trúc dữ liệu như sau:

```
lucky-number-stem-day/
├── session/
│   ├── adminId: "admin_1698765432100"
│   ├── adminName: "Admin-14:30"
│   ├── numbers: { thousands: 5, hundreds: 7, tens: 3, ones: 2 }
│   └── spinning: { thousands: false, hundreds: false, tens: false, ones: false }
└── history/
    ├── 0: { number: "5732", timestamp: "04/11/2025, 14:30:45" }
    ├── 1: { number: "1234", timestamp: "04/11/2025, 14:25:12" }
    └── ...
```

## Troubleshooting

### ❌ Lỗi "Permission denied"
- Kiểm tra Database Rules đã publish chưa
- Đảm bảo rules cho phép `.read: true` và `.write: true`

### ❌ Lỗi "Database URL not found"
- Kiểm tra `databaseURL` trong config có đúng không
- Format phải là: `https://[project-id]-default-rtdb.[region].firebasedatabase.app`

### ❌ App không kết nối
- Kiểm tra console browser (F12) xem có lỗi gì
- Verify tất cả các key trong `firebaseConfig` đã đúng
- Thử tắt ad-blocker/firewall

### ⚠️ "Đã có admin đang hoạt động"
- Có người khác đang giữ admin session
- Đợi 30 giây (disconnect timeout) hoặc
- Vào Firebase Console > Realtime Database > Xóa node `session/adminId`

## Tính Năng Nâng Cao (Tùy chọn)

### Thay đổi mã Admin

Mở file `/App.tsx`, tìm dòng:
```typescript
const ADMIN_KEY = 'STEMDAY2025';
```
Đổi thành mã bạn muốn.

### Export dữ liệu

Trong Firebase Console > Realtime Database > tab "Data" > click vào node `history` > click icon 3 chấm > "Export JSON"

## Giới Hạn Firebase Free Plan

- **Realtime Database**: 1GB storage
- **Concurrent connections**: 100 connections
- **Downloads**: 10GB/month

Với sự kiện STEM DAY, giới hạn này quá đủ! 🚀

---

**Cần hỗ trợ?** Check console browser (F12) để xem log lỗi chi tiết.
