# ScamCheck — Công Cụ Nhận Diện Tin Nhắn Lừa Đảo

ScamCheck là một ứng dụng web (Next.js) đột phá nhằm hỗ trợ người dùng nhận diện và phòng chống các hình thức lừa đảo qua tin nhắn. Sản phẩm đặc biệt hướng tới nhóm người dễ bị tổn thương nhất — người từ 45 tuổi trở lên ít kinh nghiệm số (ông bà, bố mẹ, người thân của chúng ta).

Với giao diện tối giản theo **Design System Cosmos**, cỡ chữ lớn dễ đọc, độ tương phản cao và hỗ trợ Dark Mode tinh tế, ScamCheck giúp người dùng kiểm chứng tin nhắn nghi ngờ chỉ trong vòng vài giây.

---

## 🌟 Tính Năng Nổi Bật (Đã Hoàn Thành)

Dự án đã hoàn thành các cấp độ tính năng từ cơ bản đến nâng cao:

1. **Nền tảng & Vận hành (Cấp 1)**
   - Giao diện tối giản, tối ưu hiển thị trên các thiết bị di động (đặc biệt là Safari trên iPhone).
   - Tích hợp mô hình ngôn ngữ lớn Google Gemini phục vụ phân tích bất đồng bộ.
   - Cảnh báo pháp lý cố định dưới chân trang (Disclaimer).

2. **Thám tử AI Phân Tích Kỹ Thuật (Cấp 2)**
   - Phân tích và chấm điểm mức độ rủi ro: **An toàn** (Xanh), **Nghi ngờ** (Vàng), **Nguy hiểm** (Đỏ).
   - Trích xuất dấu hiệu lừa đảo và tự động tô vàng làm nổi bật đoạn văn bản vi phạm trong tin nhắn gốc.
   - Đưa ra 3 khuyến nghị hành động cụ thể.
   - Lưu trữ lịch sử 10 lượt kiểm tra gần nhất vào bộ nhớ trình duyệt (Local Storage) để xem lại không tốn phí API.

3. **Cô Tâm Lý AI Giải Mã Chiêu Thức (Cấp 3)**
   - Kích hoạt tự động khi tin nhắn ở mức Nghi ngờ hoặc Nguy hiểm.
   - Sử dụng nhân vật "Cô tâm lý" với giọng điệu gần gũi, xưng "cô" gọi "bác" để chỉ ra các đòn tâm lý kẻ xấu sử dụng (tạo sự gấp gáp, đánh vào nỗi sợ hãi hoặc lòng tham).

4. **Thư viện Lừa Đảo & Chế độ Luyện Tập (Cấp 4)**
   - **Thư viện**: Danh sách các kiểu lừa đảo phổ biến (giả danh ngân hàng, cơ quan công an, trúng thưởng, giả giao hàng) kèm ví dụ thực tế.
   - **Chế độ luyện tập**: Bộ trắc nghiệm 10 câu hỏi thực tế giúp người dùng tương tác, học hỏi và tự nâng cao kỹ năng phòng vệ trước tin tặc.
   - **Chia sẻ**: Tạo mã QR và nút tải ảnh tóm tắt kết quả phân tích để chia sẻ cho người thân qua Zalo, Messenger.

5. **Người Ứng Cứu AI Hỗ Trợ Khủng Hoảng (Cấp 5)**
   - Tiếp nhận 4 tình huống khẩn cấp: *Chưa làm gì, Đã bấm vào liên kết, Đã chuyển tiền,* và *Đã cung cấp OTP/Thông tin cá nhân*.
   - Đưa ra các bước hành động xử lý khủng hoảng khẩn cấp tức thì.
   - Tích hợp danh bạ Hotline khẩn cấp xác thực của các ngân hàng lớn và cơ quan chức năng (Cục ATTT, Bộ Công an).

---

## 🛠️ Hướng dẫn cài đặt và chạy dự án dưới local

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
Ứng dụng gọi trực tiếp API của Google Gemini để phân tích tin nhắn và sử dụng Vercel KV để lưu trữ các đường link chia sẻ kết quả:

1. Tạo một file tên là `.env.local` ở thư mục gốc của dự án.
2. Cấu hình các biến môi trường sau:
```env
# API Key của Google Gemini (Bắt buộc)
GEMINI_API_KEY=your_gemini_api_key_here

# Cấu hình Vercel KV/Redis (Không bắt buộc ở local)
# Nếu không cấu hình dưới local, ứng dụng sẽ tự động fallback sang lưu trữ bằng RAM (In-memory cache) để phục vụ việc test nhanh tính năng chia sẻ.
KV_URL=your_kv_url_here
KV_REST_API_URL=your_kv_rest_api_url_here
KV_REST_API_TOKEN=your_kv_rest_api_token_here
KV_REST_API_READ_ONLY_TOKEN=your_kv_rest_api_read_only_token_here
```
*(Thay `your_gemini_api_key_here` bằng khóa API Gemini thực tế do ban tổ chức/mentor cấp hoặc tự khởi tạo từ Google AI Studio. Nếu muốn sử dụng cơ sở dữ liệu thật khi phát triển ở local, bạn hãy chạy lệnh `vercel env pull .env.local` sau khi đã liên kết dự án với Vercel).*


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

## 👥 Thành Viên Phát Triển (Team Members)

Dự án được hoàn thành bởi nhóm phát triển:
- **[Họ tên thành viên 1]** - Vai trò: Front-end Developer / UI-UX Designer
- **[Họ tên thành viên 2]** - Vai trò: Back-end Developer / AI Prompt Engineer
- **[Họ tên thành viên 3]** - Vai trò: Full-stack Developer / Devops

*(Vui lòng điền thông tin chi tiết của các thành viên nhóm bạn vào đây)*

---

## ⚖️ Lưu ý pháp lý bắt buộc (Disclaimer)

ScamCheck là công cụ giáo dục và không thay thế cảnh báo chính thức từ ngân hàng hoặc cơ quan chức năng. Khi nghi ngờ có lừa đảo liên quan tới tài chính, người dùng nên liên hệ trực tiếp đến số hotline chính thức được in trên thẻ ngân hàng của mình hoặc danh bạ khẩn cấp được tích hợp trong ứng dụng.

