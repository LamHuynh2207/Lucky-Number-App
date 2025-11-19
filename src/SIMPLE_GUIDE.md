# 🎯 HƯỚNG DẪN SỬ DỤNG ĐỞN GIẢN

## 🚀 Bắt Đầu Nhanh Chóng

### Mở App Lần Đầu

1. Mở ứng dụng Lucky Number
2. Bạn sẽ thấy giao diện chính ngay lập tức
3. **KHÔNG CẦN ĐĂNG NHẬP**! 👏

---

## 👥 Ai Làm Gì?

### 🎭 Tất Cả Mọi Người (Viewer)

Khi mở app, **ai cũng có thể**:

- ✅ **Xem** số hiển thị trên màn hình
- ✅ **Xem** lịch sử số đã quay
- ✅ **Xem** hiệu ứng STEM particles
- ✅ **Xem** realtime khi admin quay số (nếu có Firebase)

### 👑 Người Điều Khiển (Admin)

**Khi nào trở thành Admin?**

➡️ **Khi bạn bấm vào nút quay số lần đầu tiên!**

**Flow:**

```
1. Click nút "HÀNG NGHÌN" (hoặc nút quay số bất kỳ)
   ↓
2. Popup hiện ra yêu cầu nhập mã
   ↓
3. Nhập mã: STEMDAY2025
   ↓
4. ✅ Xác thực thành công!
   ↓
5. Số bắt đầu quay!
```

**Sau khi xác thực Admin, bạn có thể:**

- ✅ Quay số tất cả các hàng
- ✅ Reset về 0000
- ✅ Xóa lịch sử
- ✅ Xóa từng số riêng

**Lưu ý:** Chỉ cần nhập mã **1 LẦN DUY NHẤT**. Sau đó bạn có thể quay số thoải mái không cần nhập lại!

---

## 🎬 Workflow Sự Kiện Thực Tế

### Setup Trước Sự Kiện

1. Mở app trên laptop
2. Kết nối laptop với máy chiếu
3. Full screen (F11)
4. **CHƯA CẦN LÀM GÌ CẢ!**

### Khán Giả Tham Gia

**Nếu KHÔNG có Firebase:**
- Khán giả mở app trên điện thoại
- Xem được số trên màn hình điện thoại
- ❌ Không sync realtime với màn chiếu

**Nếu CÓ Firebase:**
- Khán giả mở app trên điện thoại  
- Số sẽ cập nhật **REALTIME** đồng bộ với màn chiếu! 🎉
- Không cần làm gì, tự động sync!

### Bắt Đầu Quay Số

**Admin (người cầm laptop):**

1. Click "HÀNG NGHÌN"
2. Nhập mã: `STEMDAY2025`
3. Số bắt đầu quay! 🎲
4. Click "HÀNG TRĂM" → Quay tiếp
5. Click "HÀNG CHỤC" → Quay tiếp
6. Click "HÀNG ĐƠN VỊ" → Quay xong
7. 🎉 Confetti effect + Lưu tự động!

**Khán giả:**
- Ngồi xem màn hình điện thoại
- Số tự động cập nhật realtime!
- Không cần làm gì cả!

---

## 🔑 Mã Admin

### Mã Mặc Định

```
STEMDAY2025
```

### Đổi Mã Admin

Nếu muốn đổi mã, edit file `/App.tsx`:

```typescript
const ADMIN_KEY = 'STEMDAY2025'; // Đổi thành mã bạn muốn
```

**Lưu ý:** Nên đổi mã trước sự kiện để bảo mật!

---

## 💡 Các Tính Năng

### Khi CHƯA Xác Thực Admin

- 🔘 Nút quay số: **Bấm được** → Hiện popup nhập mã
- 🔘 Nút Reset: **Bấm được** → Hiện popup nhập mã  
- 🔘 Nút xóa lịch sử: **Bấm được** → Hiện popup nhập mã
- 👀 Xem số realtime: **Luôn được**

### Sau Khi Xác Thực Admin

- 🎮 **Toàn quyền điều khiển**
- 🏷️ Badge "ADMIN" hiện góc phải màn hình
- 🔓 Không cần nhập mã nữa (trong phiên)

### Mất Quyền Admin Khi Nào?

- Đóng tab/cửa sổ browser
- Reload trang (F5)
- Mất kết nối internet (nếu dùng Firebase)

➡️ **Giải pháp:** Nhập mã lại là được!

---

## 🔥 Firebase: Có Hay Không?

### KHÔNG Có Firebase (Demo Mode)

**Ưu điểm:**
- ✅ Setup cực nhanh (0 phút)
- ✅ Không cần internet
- ✅ Mọi tính năng hoạt động

**Nhược điểm:**
- ❌ KHÔNG có realtime sync
- ❌ Mỗi thiết bị độc lập
- ❌ Lịch sử lưu local (mất khi xóa browser data)

**Khi nào dùng:**
- Event nhỏ, chỉ 1 màn hình
- Không cần khán giả xem realtime
- Muốn đơn giản nhất

### CÓ Firebase (Realtime Mode)

**Ưu điểm:**
- ✅ **Realtime sync** giữa tất cả thiết bị
- ✅ Nhiều người xem cùng lúc
- ✅ Lịch sử lưu trên cloud
- ✅ Chỉ 1 admin hoạt động (tránh conflict)

**Nhược điểm:**
- ⏱️ Cần setup Firebase (5-10 phút)
- 🌐 Cần internet ổn định

**Khi nào dùng:**
- Event lớn, nhiều khán giả
- Muốn khán giả xem trên điện thoại
- Cần lưu trữ lịch sử dài hạn

**Hướng dẫn setup:** Xem file [`FIREBASE_SETUP.md`](./FIREBASE_SETUP.md)

---

## 🎨 Tips & Tricks

### Phím Tắt

- `F11` - Full screen (cho màn chiếu)
- `ESC` - Thoát full screen

### Hiệu Ứng Đẹp

- 🌟 STEM icons bay khi đang quay
- ✨ Confetti effect khi hoàn thành 4 số
- 💡 Glow pulsing xung quanh số
- 🐜 Kiến nhún nhảy khi Reset

### UX Tốt Nhất

1. **Cho Event nhỏ:** Chỉ cần 1 laptop + màn chiếu
2. **Cho Event lớn:** Setup Firebase + QR code cho khán giả
3. **Test trước:** Thử quay vài số test trước event thật

---

## ❓ FAQs

### Q: Tôi có cần đăng nhập không?

**A:** KHÔNG! Chỉ cần nhập mã khi muốn quay số lần đầu.

---

### Q: Tôi nhập sai mã thì sao?

**A:** Thông báo lỗi hiện ra. Nhập lại mã đúng là được.

---

### Q: Có thể có 2 admin cùng lúc không?

**A:** 
- **Demo Mode:** Có, mỗi thiết bị độc lập
- **Firebase Mode:** KHÔNG, chỉ 1 admin. Người thứ 2 sẽ bị reject.

---

### Q: Quên mã admin thì làm sao?

**A:** Mở file `/App.tsx`, tìm dòng `const ADMIN_KEY = '...'`

---

### Q: App có lưu mã admin không?

**A:** KHÔNG. Mỗi lần reload phải nhập lại (an toàn hơn).

---

### Q: Có thể xem app trên mobile không?

**A:** CÓ! Responsive 100%. Nhưng nên dùng landscape để xem đẹp hơn.

---

## 🎯 So Sánh Flow Cũ vs Mới

### Flow Cũ (Phức Tạp)

```
Mở app → Màn hình đăng nhập → Chọn Admin/Viewer → Nhập mã → Vào app
```

### Flow Mới (Đơn Giản) ⭐

```
Mở app → Vào thẳng app → Click quay số → Nhập mã (nếu cần)
```

**Đơn giản hơn 70%!** 🎉

---

## 🎊 Kết Luận

**App này giờ CỰC KỲ ĐƠN GIẢN:**

1. 🚀 Mở là dùng được ngay
2. 👀 Ai cũng có thể xem
3. 🔑 Chỉ cần mã khi muốn quay số
4. 🎯 Perfect cho mọi loại event!

**Chúc sự kiện STEM DAY 2025 thành công rực rỡ!** 🎉✨🚀

---

Made with ❤️ for FPT STEM DAY 2025
