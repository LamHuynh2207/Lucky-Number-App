# 🎲 Lucky Number - STEM DAY 2025 (Realtime Edition)

## 🌟 Tính Năng Mới

Ứng dụng Lucky Number giờ đây hỗ trợ **realtime đa người dùng** với Firebase Realtime Database!

### ✨ Điểm Nổi Bật

- 👥 **Multi-user**: Nhiều người cùng xem trên nhiều thiết bị
- 🔄 **Realtime Sync**: Cập nhật tức thời không cần reload
- 🛡️ **Phân Quyền**: Chỉ Admin mới quay được số
- 🔒 **Session Management**: Chỉ 1 admin hoạt động cùng lúc
- 💾 **Cloud Storage**: Lịch sử lưu trên Firebase
- 📱 **Responsive**: Hoạt động tốt trên mobile & desktop

## 🚀 Cách Sử Dụng

### 1️⃣ Người Điều Khiển (Admin)

1. Mở ứng dụng
2. Chọn **"Đăng nhập Admin"**
3. Nhập mã: `STEMDAY2025`
4. Bắt đầu quay số!

**Quyền của Admin:**
- ✅ Quay số các hàng
- ✅ Reset số về 0000
- ✅ Xóa lịch sử số đã quay
- ✅ Xóa từng số riêng lẻ

### 2️⃣ Người Xem (Viewer)

1. Mở ứng dụng (có thể trên điện thoại, máy tính khác)
2. Chọn **"Vào chế độ Xem (Viewer)"**
3. Ngồi lại và thưởng thức! 👀

**Viewer sẽ thấy:**
- ✅ Số chạy realtime khi admin quay
- ✅ Lịch sử số may mắn
- ✅ Thông báo "Đang quay số..."
- ❌ KHÔNG thể thao tác (nút bị disable)

## 📋 Workflow Sự Kiện

```
Admin mở app → Đăng nhập với mã
      ↓
Chiếu lên màn hình lớn (projector)
      ↓
Khán giả mở app trên điện thoại → Chế độ Viewer
      ↓
Admin quay số → Tất cả người xem cập nhật đồng thời! 🎉
      ↓
Số may mắn hiện ra → Lưu vào lịch sử
```

## 🎯 Use Cases

### Sự kiện STEM DAY

**Setup:**
- 1 laptop admin kết nối máy chiếu
- Khán giả quét QR code vào app (viewer mode)
- Admin quay từng số một
- Tất cả khán giả thấy realtime!

### Lucky Draw

- Import danh sách số dự thưởng
- Admin quay ngẫu nhiên
- Viewer xem trực tiếp
- Transparent & công bằng!

## 🔐 Bảo Mật

- ✅ Mã admin có thể tùy chỉnh
- ✅ Chỉ 1 admin session cùng lúc
- ✅ Auto disconnect khi đóng tab
- ⚠️ Lưu ý: App này dùng cho sự kiện, không lưu thông tin nhạy cảm

## 🛠️ Setup Firebase

**Cần setup Firebase trước khi dùng!**

👉 Xem hướng dẫn chi tiết trong file: [`FIREBASE_SETUP.md`](./FIREBASE_SETUP.md)

**Tóm tắt:**
1. Tạo Firebase project
2. Tạo Realtime Database
3. Copy config vào `/config/firebase.ts`
4. Done! 🎉

## 🎨 Giao Diện

### Badge Vai Trò (góc phải)
- 🔵 **ADMIN** - Badge màu cyan + icon Shield
- 🟣 **VIEWER** - Badge màu tím + icon Eye
- 🟢 **Kết nối** - Badge màu xanh lá + icon Wifi

### Thông Báo Realtime (viewer)
- Khi admin quay: "🎲 ĐANG QUAY SỐ..."
- Khi chờ: "Đang chờ admin quay số..."

### Controls (chỉ admin)
- 4 nút quay số: HÀNG NGHÌN, HÀNG TRĂM, HÀNG CHỤC, HÀNG ĐƠN VỊ
- 1 nút RESET (màu xanh lá)
- Bảng lịch sử với nút xóa

## 🐛 Troubleshooting

### "Lỗi kết nối Firebase"
→ Kiểm tra config trong `/config/firebase.ts`

### "Đã có admin đang hoạt động"
→ Đợi 30s hoặc xóa session trong Firebase Console

### Viewer không thấy số chạy
→ Kiểm tra internet connection
→ Reload trang

### Số không đồng bộ
→ Kiểm tra Database Rules đã publish chưa

## 📊 Monitoring

Xem realtime data trong Firebase Console:
1. Vào Realtime Database
2. Tab "Data"
3. Xem nodes `session` và `history`

## 💡 Tips

- **Khuyến nghị**: Test kỹ trước sự kiện
- **Internet**: Cần kết nối ổn định
- **Backup**: Export lịch sử thường xuyên
- **Multiple displays**: Admin có thể clone window ra nhiều màn

## 📱 QR Code Setup

Tạo QR code link đến app để khán giả quét nhanh:
- Dùng https://qr-code-generator.com/
- Link: URL của app sau khi deploy
- Print QR code lên poster/slide

## 🎬 Demo Video

1. Admin login với mã
2. Viewer vào chế độ xem
3. Admin quay số → Viewer cập nhật realtime
4. Hiệu ứng STEM particles bay
5. Lưu số vào lịch sử

---

**Made with ❤️ for FPT STEM DAY 2025**

Chúc sự kiện thành công! 🚀✨
