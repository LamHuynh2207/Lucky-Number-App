# 🚀 QUICK START - Lucky Number STEM DAY

## ⚡ Bắt Đầu Nhanh

### Option 1: Demo Mode (Không cần setup gì)

1. Mở app
2. Nhập mã admin: `STEMDAY2025`
3. App sẽ chạy ở chế độ **Demo/Offline**
4. Bạn có thể quay số ngay lập tức! ✨

**Demo Mode:**
- ✅ Hoạt động 100% offline
- ✅ Lưu lịch sử vào localStorage
- ❌ KHÔNG có realtime sync
- ❌ KHÔNG có multi-user

---

### Option 2: Realtime Mode (Cần setup Firebase)

**Khi nào dùng Realtime Mode?**
- Bạn cần nhiều người xem cùng lúc
- Cần đồng bộ giữa màn hình chiếu và điện thoại khán giả
- Muốn lưu trữ lịch sử trên cloud

**Setup:**
1. Đọc file [`FIREBASE_SETUP.md`](./FIREBASE_SETUP.md)
2. Setup Firebase (5-10 phút)
3. Paste config vào `/config/firebase.ts`
4. Reload app
5. Done! 🎉

---

## 🎯 Cách Sử Dụng

### Admin (Người Điều Khiển)

```
Mở app → Nhập mã: STEMDAY2025 → Click "Đăng nhập Admin"
```

**Quyền:**
- ✅ Quay số 4 hàng (nghìn, trăm, chục, đơn vị)
- ✅ Reset về 0000
- ✅ Xóa lịch sử
- ✅ Xóa từng số riêng

### Viewer (Người Xem) - Chỉ Realtime Mode

```
Mở app → Click "Vào chế độ Xem (Viewer)"
```

**Xem được:**
- 👀 Số chạy realtime khi admin quay
- 📜 Lịch sử số may mắn
- 🔴 Thông báo "Đang quay số..."

**Không thể:**
- ❌ Quay số
- ❌ Reset
- ❌ Xóa lịch sử

---

## 🐛 Troubleshooting

### "Firebase chưa cấu hình"

**Giải pháp:**
- **Option A**: Dùng Demo Mode (vẫn hoạt động tốt!)
- **Option B**: Setup Firebase theo [`FIREBASE_SETUP.md`](./FIREBASE_SETUP.md)

### "Đã có admin đang hoạt động"

**Giải pháp:**
1. Đợi 30 giây (auto disconnect)
2. Hoặc vào Firebase Console > Realtime Database > Xóa node `session/adminId`
3. Hoặc vào chế độ Viewer

### App không load

**Checklist:**
- ✅ Đã cài dependencies? (`npm install`)
- ✅ File `/config/firebase.ts` có tồn tại?
- ✅ Check console browser (F12) xem lỗi gì

---

## 📱 Workflow Sự Kiện

### Setup Trước Sự Kiện (15 phút)

1. Setup Firebase (nếu dùng Realtime)
2. Test app trên laptop
3. Tạo QR code link đến app
4. In QR code lên poster/slide

### Trong Sự Kiện

**Admin:**
1. Kết nối laptop với máy chiếu
2. Mở app, login Admin
3. Full screen (F11)

**Khán giả:**
1. Quét QR code
2. Chọn "Viewer mode"
3. Xem realtime trên điện thoại!

**Quay số:**
1. Admin click "HÀNG NGHÌN" → Số chạy 2 giây
2. Click "HÀNG TRĂM" → Chạy tiếp
3. Click "HÀNG CHỤC"
4. Click "HÀNG ĐƠN VỊ"
5. 🎉 Confetti effect + Lưu tự động!

---

## 💡 Tips & Tricks

### Phím tắt

- `ESC` - Thoát app (có confirm)
- `F11` - Full screen

### Hiệu ứng

- 🎨 STEM icons bay khi quay số
- ✨ Confetti khi hoàn thành 4 số
- 💡 Glow effect xung quanh số
- 🐜 Linh vật nhún nhảy khi Reset

### Performance

- App chạy mượt ở 60fps
- Hoạt động tốt trên mobile & desktop
- Support Chrome, Firefox, Safari, Edge

---

## 🎨 Customization

### Đổi mã Admin

File: `/App.tsx`
```typescript
const ADMIN_KEY = 'STEMDAY2025'; // Đổi thành mã bạn muốn
```

### Đổi số lượng lịch sử

File: `/App.tsx`
```typescript
const updated = [newEntry, ...recentNumbers].slice(0, 10); // Đổi 10 thành số bạn muốn
```

### Đổi thời gian quay

File: `/App.tsx` - function `spinNumber`
```typescript
setTimeout(async () => {
  // ...
}, 2000); // Đổi 2000 (2 giây) thành thời gian bạn muốn
```

---

## 📞 Support

Nếu gặp vấn đề:
1. Check console browser (F12)
2. Đọc lại [`FIREBASE_SETUP.md`](./FIREBASE_SETUP.md)
3. Thử Demo Mode xem có hoạt động không

---

**Made with ❤️ for FPT STEM DAY 2025**

Chúc sự kiện thành công rực rỡ! 🎉✨🚀
