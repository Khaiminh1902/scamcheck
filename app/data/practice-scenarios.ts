export type PracticeScenario = {
  id: string;
  content: string;
  isScam: boolean;
  explanation: string;
  type: string;
};

export const PRACTICE_SCENARIOS: PracticeScenario[] = [
  {
    id: "prac-1",
    content: "Techcombank: Tai khoan cua ban bi khoa, vui long xac thuc ngay tai https://techcombank-verify.vip/login",
    isScam: true,
    explanation: "Đây là tin nhắn giả mạo ngân hàng Techcombank. Đường link 'techcombank-verify.vip' là tên miền giả mạo, ngân hàng thật không dùng đuôi .vip và không bao giờ gửi link yêu cầu đăng nhập trực tiếp từ tin nhắn.",
    type: "Giả mạo ngân hàng"
  },
  {
    id: "prac-2",
    content: "Bo Cong An: Dong chi co lien quan den duong day ma tuy. Yeu cau tai ung dung VNeID tai http://vneid-gov.apk de phuc vu dieu tra.",
    isScam: true,
    explanation: "Cơ quan Công an không bao giờ làm việc qua tin nhắn, cũng không yêu cầu người dân cài đặt ứng dụng qua file .apk ngoài cửa hàng ứng dụng chính thức (Google Play / App Store).",
    type: "Giả danh cơ quan chức năng"
  },
  {
    id: "prac-3",
    content: "Vietcombank thong bao: TK 0123456789 cua quy khach da duoc cong them 5,000,000 VND. So du hien tai: 15,500,000 VND. ND: Nguyen Van A chuyen tien.",
    isScam: false,
    explanation: "Đây là tin nhắn biến động số dư thông thường của ngân hàng. Tin nhắn không chứa đường link lạ, không yêu cầu cung cấp thông tin hay mã OTP.",
    type: "Thông báo số dư (An toàn)"
  },
  {
    id: "prac-4",
    content: "Chuc mung ban da trung thuong xe may SH 150i. Vui long chuyen khoan 2 trieu vao STK 987654321 de dong le phi truoc ba va nhan xe.",
    isScam: true,
    explanation: "Đây là hình thức lừa đảo trúng thưởng điển hình. Không có chương trình nào yêu cầu chuyển khoản tiền lệ phí trước khi nhận giải thưởng. Đừng bao giờ chuyển tiền cho người lạ.",
    type: "Lừa đảo trúng thưởng"
  },
  {
    id: "prac-5",
    content: "Viettel: Gói cước V120N của quý khách đã gia hạn thành công. Cước phí: 120.000đ/tháng. Hạn sử dụng: 30/11/2026. Để hủy gia hạn, soạn HUY gửi 191.",
    isScam: false,
    explanation: "Đây là tin nhắn thông báo gia hạn gói cước tự động của nhà mạng. Tin nhắn cung cấp thông tin rõ ràng, số tổng đài nhắn đến và hướng dẫn hủy gửi về đầu số ngắn chính thức (191).",
    type: "Tin nhắn nhà mạng (An toàn)"
  },
  {
    id: "prac-6",
    content: "Tuyen dung nhan vien xem video Tiktok, luong 300k-500k/ngay. Khong coc, khong phi. Quan tam IB qua Zalo: 0988.xxx.xxx",
    isScam: true,
    explanation: "Hình thức 'việc nhẹ lương cao' lừa đảo rất phổ biến. Kẻ gian thường hứa hẹn không cọc, nhưng sau đó sẽ dụ dỗ bạn nạp tiền để nâng cấp VIP hoặc làm nhiệm vụ khó hơn để chiếm đoạt.",
    type: "Lừa đảo việc làm"
  },
  {
    id: "prac-7",
    content: "GiaoHangNhanh: Kien hang cua ban khong the giao thanh cong do sai thong tin dia chi. Vui long cap nhat tai https://ghn-redelivery.com va dong phi xu ly 20.000d.",
    isScam: true,
    explanation: "Shipper thật sẽ gọi điện thoại trực tiếp. Tin nhắn yêu cầu bấm vào link lạ để đóng phí là lừa đảo. Đường link 'ghn-redelivery.com' là tên miền giả mạo.",
    type: "Giả mạo đơn vị giao hàng"
  },
  {
    id: "prac-8",
    content: "Lich hop phu huynh cua lop 10A1 se dien ra vao luc 8h sang Chu Nhat tuan nay tai phong 302. Tran trong kinh moi anh/chi den du.",
    isScam: false,
    explanation: "Tin nhắn thông báo lịch họp của giáo viên hoặc nhà trường. Tin nhắn có nội dung thông tin thuần túy, không chứa link lạ hay yêu cầu chuyển khoản.",
    type: "Thông báo nội bộ (An toàn)"
  },
  {
    id: "prac-9",
    content: "Cảnh sát giao thông thông báo: Xe ô tô BKS 30G-123.45 của bạn có 1 biên bản phạt nguội. Vui lòng kiểm tra và nộp phạt tại link: http://tracuu-phatnguoi-vn.com/30G-123.45",
    isScam: true,
    explanation: "CSGT sẽ gửi giấy báo nộp phạt về tận nhà hoặc tra cứu trên ứng dụng chính thức, KHÔNG nhắn tin kèm link để nộp phạt. Link trong tin nhắn là giả mạo.",
    type: "Giả mạo phạt nguội"
  },
  {
    id: "prac-10",
    content: "Shopee: Đơn hàng mã SPX12345678 của bạn đã được giao thành công. Đánh giá sản phẩm ngay để nhận 200 Shopee xu. Truy cập App Shopee để đánh giá.",
    isScam: false,
    explanation: "Tin nhắn thông báo giao hàng thành công từ Shopee. Tin nhắn yêu cầu bạn mở ứng dụng (App) chính thức của họ, không đính kèm các đường link trang web đáng ngờ.",
    type: "Thông báo mua hàng (An toàn)"
  },
  {
    id: "prac-11",
    content: "VietinBank: Ung dung iPay cua quy khach phat hien dang nhap la tai Ha Noi. Vui long nhan vao http://vietinbank-ipay.cc de xac nhan danh tinh.",
    isScam: true,
    explanation: "Đây là tin nhắn lừa đảo mạo danh VietinBank. Tên miền 'vietinbank-ipay.cc' hoàn toàn giả mạo, ngân hàng thật sẽ dùng tên miền .vn chính thức và không gửi link đăng nhập trực tiếp qua tin nhắn SMS.",
    type: "Giả mạo ngân hàng"
  },
  {
    id: "prac-12",
    content: "Cuc Vien Thong: Thue bao cua ban se bi khoa sau 1h vi phat tan tin nhan rac. Bam vao link http://cucvienthong-gov.net de xac thuc thong tin thue bao.",
    isScam: true,
    explanation: "Mạo danh Cục Viễn thông để lừa đảo. Cục Viễn thông không trực tiếp nhắn tin đe dọa khóa thuê bao đi kèm đường link yêu cầu cập nhật thông tin cá nhân/nhập mật khẩu.",
    type: "Giả danh cơ quan chức năng"
  },
  {
    id: "prac-13",
    content: "Tri an khach hang! Coca-cola tang mien phi 1 thung nuoc ngot va phieu mua hang 500k cho 100 nguoi dau tien dang ky tai link: http://cocacola-vietnam.club",
    isScam: true,
    explanation: "Hình thức lừa đảo trúng thưởng, tặng quà miễn phí giả mạo thương hiệu lớn. Các đường link này thường nhằm mục đích thu thập thông tin cá nhân hoặc lừa đóng tiền phí vận chuyển ảo.",
    type: "Lừa đảo trúng thưởng"
  },
  {
    id: "prac-14",
    content: "GHN: Ban co don hang tu nuoc ngoai chua nhan vi sai dia chi giao. Cap nhat thong tin tai day de duoc phat lai: http://ghn-tracking-vn.net",
    isScam: true,
    explanation: "Tin nhắn lừa đảo mạo danh đơn vị Giao Hàng Nhanh (GHN). Đường link 'ghn-tracking-vn.net' là giả mạo để chiếm đoạt thông tin thẻ ngân hàng hoặc bắt thanh toán phí xử lý sai địa chỉ.",
    type: "Giả mạo đơn vị giao hàng"
  },
  {
    id: "prac-15",
    content: "Cong ty Shopee tuyen CTV lam viec tai nha. Lam nhiem vu tang tuong tac shop va nhan hoa hong 15%. Lien he Telegram: @shopee_ctv_vietnam",
    isScam: true,
    explanation: "Kịch bản tuyển CTV làm nhiệm vụ giật đơn, tương tác ảo để nhận hoa hồng. Đây là lừa đảo nạp tiền làm nhiệm vụ nâng cấp VIP và sau đó sẽ bị khóa không cho rút tiền.",
    type: "Lừa đảo việc làm"
  },
  {
    id: "prac-16",
    content: "BIDV: So du TK 1234567890 cua Quy khach da thanh toan tien dien cho Dien luc EVN. So tien: 350,000 VND vao luc 10:30.",
    isScam: false,
    explanation: "Đây là tin nhắn thông báo thanh toán hóa đơn tự động bình thường từ ngân hàng BIDV. Không yêu cầu nhấn link lạ hay cung cấp mã xác thực OTP.",
    type: "Thông báo giao dịch (An toàn)"
  },
  {
    id: "prac-17",
    content: "VNeID: Ma OTP cua ban de dang nhap ung dung la 982173. Ma co hieu luc trong 3 phut. Tuyet doi khong chia se ma OTP cho bat ky ai.",
    isScam: false,
    explanation: "Tin nhắn SMS chứa mã OTP đăng nhập chính thức từ ứng dụng định danh VNeID của Bộ Công An. Tin nhắn không có đường link yêu cầu điền thông tin và có cảnh báo bảo mật rõ ràng.",
    type: "Mã OTP chính thức (An toàn)"
  },
  {
    id: "prac-18",
    content: "Giao Hang Tiet Kiem: Shipper Nguyen Van B dang di giao don hang cua ban. SDT shipper: 0987.654.321. Vui long bat may khi shipper goi.",
    isScam: false,
    explanation: "Tin nhắn thông báo lộ trình giao hàng thực tế của bưu tá GHTK, ghi rõ tên và số điện thoại liên lạc của shipper, không đính kèm đường link yêu cầu đóng tiền hay đổi địa chỉ trực tuyến.",
    type: "Thông báo giao hàng (An toàn)"
  },
  {
    id: "prac-19",
    content: "Dien luc EVN: Thong bao lich tam ngung cung cap dien de bao tri luoi dien khu vuc tu 08:00 den 12:00 ngay 28/06/2026.",
    isScam: false,
    explanation: "Thông báo lịch tạm ngưng cấp điện chính thức của Điện lực Việt Nam (EVN). Tin nhắn chỉ cung cấp thông tin thời gian bảo trì, hoàn toàn không đòi nộp tiền hay yêu cầu truy cập website lạ.",
    type: "Thông báo dịch vụ (An toàn)"
  },
  {
    id: "prac-20",
    content: "Zalo: Ma kich hoat tai khoan cua ban la 654321. Ma nay co hieu luc trong 5 phut. Vui long khong tiet lo ma nay cho nguoi khac.",
    isScam: false,
    explanation: "Tin nhắn cung cấp mã kích hoạt tài khoản Zalo thông thường. Nội dung ngắn gọn, không đính kèm liên kết lạ và khuyên người dùng bảo mật mã số này.",
    type: "Thông báo dịch vụ (An toàn)"
  }
];
