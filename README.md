# ScamCheck — Công Cụ Nhận Diện Tin Nhắn Lừa Đảo

ScamCheck là một công cụ web (Next.js) giúp người dùng (đặc biệt là người từ 45 tuổi trở lên ít kinh nghiệm số) kiểm tra nhanh nội dung các tin nhắn nghi ngờ lừa đảo qua SMS, Zalo, Messenger, email để biết mức độ rủi ro, dấu hiệu đáng ngờ và hành động ứng xử phù hợp.

Dự án được xây dựng dựa trên **Design System Cosmos** tối giản, trực quan, hỗ trợ tối đa cho người lớn tuổi.

---

## Hướng dẫn cài đặt và chạy dự án dưới local

### 1. Yêu cầu hệ thống (Prerequisites)
Đảm bảo máy tính của bạn đã cài đặt:
- **Node.js** phiên bản v18 trở lên.
- **npm** (đi kèm khi cài đặt Node.js).

### 2. Cài đặt các thư viện phụ thuộc (Dependencies)
Mở terminal tại thư mục gốc của dự án và chạy lệnh:
```bash
npm install
```

### 3. Cấu hình biến môi trường (Environment Variables)
Ứng dụng gọi trực tiếp API của Google Gemini để phân tích tin nhắn, vì vậy bạn cần cấu hình khóa API:
1. Tạo một file tên là `.env.local` ở thư mục gốc của dự án.
2. Thêm khóa API Gemini của bạn vào file với định dạng sau:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```
*(Thay `your_gemini_api_key_here` bằng khóa API Gemini thực tế do ban tổ chức/mentor cấp hoặc tự khởi tạo từ Google AI Studio).*

### 4. Khởi chạy Server phát triển (Development Server)
Chạy lệnh sau để khởi động môi trường local dev:
```bash
npm run dev
```
Mở trình duyệt và truy cập: [http://localhost:3000](http://localhost:3000) để trải nghiệm ứng dụng.

### 5. Biên dịch và Đóng gói (Production Build)
Để kiểm tra lỗi biên dịch TypeScript/ESLint và đóng gói ứng dụng tối ưu:
```bash
# Biên dịch dự án
npm run build

# Khởi chạy server production sau khi build thành công
npm start
```

---

## Lưu ý pháp lý bắt buộc (Disclaimer)
ScamCheck là công cụ giáo dục và không thay thế cảnh báo chính thức từ ngân hàng hoặc cơ quan chức năng. Khi nghi ngờ có lừa đảo liên quan tới tài chính, người dùng nên liên hệ trực tiếp đến số hotline chính thức được in trên thẻ ngân hàng của mình.
