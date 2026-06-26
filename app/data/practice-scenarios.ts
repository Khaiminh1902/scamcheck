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
    content:
      "Techcombank: Tài khoản của bạn bị khóa, vui lòng xác thực ngay tại https://techcombank-verify.vip/login",
    isScam: true,
    explanation:
      "Đây là tin nhắn giả mạo ngân hàng Techcombank. Đường link 'techcombank-verify.vip' là tên miền giả mạo, ngân hàng thật không dùng đuôi .vip và không bao giờ gửi link yêu cầu đăng nhập trực tiếp từ tin nhắn.",
    type: "Giả mạo ngân hàng",
  },
  {
    id: "prac-2",
    content:
      "Bộ Công An: Đồng chí có liên quan đến đường dây ma túy. Yêu cầu tải ứng dụng VNeID tại http://vneid-gov.apk để phục vụ điều tra.",
    isScam: true,
    explanation:
      "Cơ quan Công an không bao giờ làm việc qua tin nhắn, cũng không yêu cầu người dân cài đặt ứng dụng qua file .apk ngoài cửa hàng ứng dụng chính thức (Google Play / App Store).",
    type: "Giả danh cơ quan chức năng",
  },
  {
    id: "prac-3",
    content:
      "Vietcombank thông báo: TK 0123456789 của quý khách đã được cộng thêm 5,000,000 VND. Số dư hiện tại: 15,500,000 VND. ND: Nguyễn Văn A chuyển tiền.",
    isScam: false,
    explanation:
      "Đây là tin nhắn biến động số dư thông thường của ngân hàng. Tin nhắn không chứa đường link lạ, không yêu cầu cung cấp thông tin hay mã OTP.",
    type: "Thông báo số dư (An toàn)",
  },
  {
    id: "prac-4",
    content:
      "Chúc mừng bạn đã trúng thưởng xe máy SH 150i. Vui lòng chuyển khoản 2 triệu vào STK 987654321 để đóng lệ phí trước bạ và nhận xe.",
    isScam: true,
    explanation:
      "Đây là hình thức lừa đảo trúng thưởng điển hình. Không có chương trình nào yêu cầu chuyển khoản tiền lệ phí trước khi nhận giải thưởng. Đừng bao giờ chuyển tiền cho người lạ.",
    type: "Lừa đảo trúng thưởng",
  },
  {
    id: "prac-5",
    content:
      "Viettel: Gói cước V120N của quý khách đã gia hạn thành công. Cước phí: 120.000đ/tháng. Hạn sử dụng: 30/11/2026. Để hủy gia hạn, soạn HUY gửi 191.",
    isScam: false,
    explanation:
      "Đây là tin nhắn thông báo gia hạn gói cước tự động của nhà mạng. Tin nhắn cung cấp thông tin rõ ràng, số tổng đài nhắn đến và hướng dẫn hủy gửi về đầu số ngắn chính thức (191).",
    type: "Tin nhắn nhà mạng (An toàn)",
  },
  {
    id: "prac-6",
    content:
      "Tuyển dụng nhân viên xem video TikTok, lương 300k-500k/ngày. Không cọc, không phí. Quan tâm IB qua Zalo: 0988.xxx.xxx",
    isScam: true,
    explanation:
      "Hình thức 'việc nhẹ lương cao' lừa đảo rất phổ biến. Kẻ gian thường hứa hẹn không cọc, nhưng sau đó sẽ dụ dỗ bạn nạp tiền để nâng cấp VIP hoặc làm nhiệm vụ khó hơn để chiếm đoạt.",
    type: "Lừa đảo việc làm",
  },
  {
    id: "prac-7",
    content:
      "Giao Hàng Nhanh: Kiện hàng của bạn không thể giao thành công do sai thông tin địa chỉ. Vui lòng cập nhật tại https://ghn-redelivery.com và đóng phí xử lý 20.000đ.",
    isScam: true,
    explanation:
      "Shipper thật sẽ gọi điện thoại trực tiếp. Tin nhắn yêu cầu bấm vào link lạ để đóng phí là lừa đảo. Đường link 'ghn-redelivery.com' là tên miền giả mạo.",
    type: "Giả mạo đơn vị giao hàng",
  },
  {
    id: "prac-8",
    content:
      "Lịch họp phụ huynh của lớp 10A1 sẽ diễn ra vào lúc 8h sáng Chủ Nhật tuần này tại phòng 302. Trân trọng kính mời anh/chị đến dự.",
    isScam: false,
    explanation:
      "Tin nhắn thông báo lịch họp của giáo viên hoặc nhà trường. Tin nhắn có nội dung thông tin thuần túy, không chứa link lạ hay yêu cầu chuyển khoản.",
    type: "Thông báo nội bộ (An toàn)",
  },
  {
    id: "prac-9",
    content:
      "Cảnh sát giao thông thông báo: Xe ô tô BKS 30G-123.45 của bạn có 1 biên bản phạt nguội. Vui lòng kiểm tra và nộp phạt tại link: http://tracuu-phatnguoi-vn.com/30G-123.45",
    isScam: true,
    explanation:
      "CSGT sẽ gửi giấy báo nộp phạt về tận nhà hoặc tra cứu trên ứng dụng chính thức, KHÔNG nhắn tin kèm link để nộp phạt. Link trong tin nhắn là giả mạo.",
    type: "Giả mạo phạt nguội",
  },
  {
    id: "prac-10",
    content:
      "Shopee: Đơn hàng mã SPX12345678 của bạn đã được giao thành công. Đánh giá sản phẩm ngay để nhận 200 Shopee xu. Truy cập App Shopee để đánh giá.",
    isScam: false,
    explanation:
      "Tin nhắn thông báo giao hàng thành công từ Shopee. Tin nhắn yêu cầu bạn mở ứng dụng (App) chính thức của họ, không đính kèm các đường link trang web đáng ngờ.",
    type: "Thông báo mua hàng (An toàn)",
  },
  {
    id: "prac-11",
    content:
      "VietinBank: Ứng dụng iPay của quý khách phát hiện đăng nhập lạ tại Hà Nội. Vui lòng nhấn vào http://vietinbank-ipay.cc để xác nhận danh tính.",
    isScam: true,
    explanation:
      "Đây là tin nhắn lừa đảo mạo danh VietinBank. Tên miền 'vietinbank-ipay.cc' hoàn toàn giả mạo, ngân hàng thật sẽ dùng tên miền .vn chính thức và không gửi link đăng nhập trực tiếp qua tin nhắn SMS.",
    type: "Giả mạo ngân hàng",
  },
  {
    id: "prac-12",
    content:
      "Cục Viễn Thông: Thuê bao của bạn sẽ bị khóa sau 1h vì phát tán tin nhắn rác. Bấm vào link http://cucvienthong-gov.net để xác thực thông tin thuê bao.",
    isScam: true,
    explanation:
      "Mạo danh Cục Viễn thông để lừa đảo. Cục Viễn thông không trực tiếp nhắn tin đe dọa khóa thuê bao đi kèm đường link yêu cầu cập nhật thông tin cá nhân/nhập mật khẩu.",
    type: "Giả danh cơ quan chức năng",
  },
  {
    id: "prac-13",
    content:
      "Tri ân khách hàng! Coca-Cola tặng miễn phí 1 thùng nước ngọt và phiếu mua hàng 500k cho 100 người đầu tiên đăng ký tại link: http://cocacola-vietnam.club",
    isScam: true,
    explanation:
      "Hình thức lừa đảo trúng thưởng, tặng quà miễn phí giả mạo thương hiệu lớn. Các đường link này thường nhằm mục đích thu thập thông tin cá nhân hoặc lừa đóng tiền phí vận chuyển ảo.",
    type: "Lừa đảo trúng thưởng",
  },
  {
    id: "prac-14",
    content:
      "GHN: Bạn có đơn hàng từ nước ngoài chưa nhận vì sai địa chỉ giao. Cập nhật thông tin tại đây để được phát lại: http://ghn-tracking-vn.net",
    isScam: true,
    explanation:
      "Tin nhắn lừa đảo mạo danh đơn vị Giao Hàng Nhanh (GHN). Đường link 'ghn-tracking-vn.net' là giả mạo để chiếm đoạt thông tin thẻ ngân hàng hoặc bắt thanh toán phí xử lý sai địa chỉ.",
    type: "Giả mạo đơn vị giao hàng",
  },
  {
    id: "prac-15",
    content:
      "Công ty Shopee tuyển CTV làm việc tại nhà. Làm nhiệm vụ tăng tương tác shop và nhận hoa hồng 15%. Liên hệ Telegram: @shopee_ctv_vietnam",
    isScam: true,
    explanation:
      "Kịch bản tuyển CTV làm nhiệm vụ giật đơn, tương tác ảo để nhận hoa hồng. Đây là lừa đảo nạp tiền làm nhiệm vụ nâng cấp VIP và sau đó sẽ bị khóa không cho rút tiền.",
    type: "Lừa đảo việc làm",
  },
  {
    id: "prac-16",
    content:
      "BIDV: Số dư TK 1234567890 của Quý khách đã thanh toán tiền điện cho Điện lực EVN. Số tiền: 350,000 VND vào lúc 10:30.",
    isScam: false,
    explanation:
      "Đây là tin nhắn thông báo thanh toán hóa đơn tự động bình thường từ ngân hàng BIDV. Không yêu cầu nhấn link lạ hay cung cấp mã xác thực OTP.",
    type: "Thông báo giao dịch (An toàn)",
  },
  {
    id: "prac-17",
    content:
      "VNeID: Mã OTP của bạn để đăng nhập ứng dụng là 982173. Mã có hiệu lực trong 3 phút. Tuyệt đối không chia sẻ mã OTP cho bất kỳ ai.",
    isScam: false,
    explanation:
      "Tin nhắn SMS chứa mã OTP đăng nhập chính thức từ ứng dụng định danh VNeID của Bộ Công An. Tin nhắn không có đường link yêu cầu điền thông tin và có cảnh báo bảo mật rõ ràng.",
    type: "Mã OTP chính thức (An toàn)",
  },
  {
    id: "prac-18",
    content:
      "Giao Hàng Tiết Kiệm: Shipper Nguyễn Văn B đang đi giao đơn hàng của bạn. SĐT shipper: 0987.654.321. Vui lòng bật máy khi shipper gọi.",
    isScam: false,
    explanation:
      "Tin nhắn thông báo lộ trình giao hàng thực tế của bưu tá GHTK, ghi rõ tên và số điện thoại liên lạc của shipper, không đính kèm đường link yêu cầu đóng tiền hay đổi địa chỉ trực tuyến.",
    type: "Thông báo giao dịch (An toàn)",
  },
  {
    id: "prac-19",
    content:
      "Điện lực EVN: Thông báo lịch tạm ngưng cung cấp điện để bảo trì lưới điện khu vực từ 08:00 đến 12:00 ngày 28/06/2026.",
    isScam: false,
    explanation:
      "Thông báo lịch tạm ngưng cấp điện chính thức của Điện lực Việt Nam (EVN). Tin nhắn chỉ cung cấp thông tin thời gian bảo trì, hoàn toàn không đòi nộp tiền hay yêu cầu truy cập website lạ.",
    type: "Thông báo dịch vụ (An toàn)",
  },
  {
    id: "prac-20",
    content:
      "Zalo: Mã kích hoạt tài khoản của bạn là 654321. Mã này có hiệu lực trong 5 phút. Vui lòng không tiết lộ mã này cho người khác.",
    isScam: false,
    explanation:
      "Tin nhắn cung cấp mã kích hoạt tài khoản Zalo thông thường. Nội dung ngắn gọn, không đính kèm liên kết lạ và khuyên người dùng bảo mật mã số này.",
    type: "Thông báo dịch vụ (An toàn)",
  },
  {
    id: "prac-21",
    content:
      "BHXH Việt Nam: Hồ sơ hưởng trợ cấp BHXH của bạn cần được bổ sung thông tin trực tuyến gấp tại http://dichvucong-bhxh.org.vn.apk",
    isScam: true,
    explanation:
      "Đây là tin nhắn giả danh Cơ quan Bảo hiểm Xã hội Việt Nam dụ dỗ cài đặt ứng dụng thông qua file cài đặt ngoài (.apk) nhằm chiếm quyền kiểm soát thiết bị di động của bạn.",
    type: "Giả danh cơ quan chức năng",
  },
  {
    id: "prac-22",
    content:
      "Mã xác thực OTP đăng ký dịch vụ Mobile Banking của quý khách là 271829. Mã này chỉ có hiệu lực trong vòng 60 giây. Tuyệt đối không chia sẻ mã OTP cho bất kỳ ai.",
    isScam: false,
    explanation:
      "Mã xác thực OTP thông thường gửi từ hệ thống bảo mật ngân hàng để xác thực giao dịch do chính bạn khởi tạo. Tin nhắn có cảnh báo không chia sẻ OTP rõ ràng.",
    type: "Mã OTP chính thức (An toàn)",
  },
  {
    id: "prac-23",
    content:
      "Tuyển CTV bán hàng online tại nhà cho sàn Shopee/Lazada. Chốt đơn nhận ngay hoa hồng từ 10-30%, công việc đơn giản, chỉ cần điện thoại. Đăng ký tại: http://vieclam-tmdt.com",
    isScam: true,
    explanation:
      "Chiêu trò lừa tuyển cộng tác viên chốt đơn ảo lừa tiền cọc hoặc bắt nạp tiền làm nhiệm vụ. Cảnh giác với công việc kiếm tiền dễ dàng qua mạng.",
    type: "Lừa đảo việc làm",
  },
  {
    id: "prac-24",
    content:
      "Agribank thông báo: TK 999988887777 của bạn có biến động số dư giảm 200,000 VND vào lúc 15:45. Số dư còn lại: 2,500,000 VND. ND: Mua hàng hóa online.",
    isScam: false,
    explanation:
      "Đây là tin nhắn thông báo biến động số dư chính thức và an toàn của ngân hàng Agribank. Tin nhắn chỉ mang tính thông báo thuần túy, không có liên kết lạ hay yêu cầu mật khẩu.",
    type: "Thông báo số dư (An toàn)",
  },
  {
    id: "prac-25",
    content:
      "MBBank: Phát hiện đăng nhập bất thường từ thiết bị lạ. Vui lòng hủy bằng cách đăng nhập hệ thống tại http://mbbank-support.com",
    isScam: true,
    explanation:
      "Đây là tin nhắn lừa đảo mạo danh ngân hàng MBBank. Ngân hàng thật không sử dụng tên miền phụ dạng lạ và không gửi link đăng nhập trực tiếp qua tin nhắn SMS để yêu cầu xác nhận tài khoản.",
    type: "Giả mạo ngân hàng",
  },
  {
    id: "prac-26",
    content:
      "Mã xác thực OTP đăng ký dịch vụ Mobile Banking của quý khách là 271829. Mã này chỉ có hiệu lực trong vòng 60 giây. Tuyệt đối không chia sẻ mã OTP cho bất kỳ ai.",
    isScam: false,
    explanation:
      "Mã xác thực OTP thông thường gửi từ hệ thống bảo mật ngân hàng để xác thực giao dịch do chính bạn khởi tạo. Tin nhắn có cảnh báo không chia sẻ OTP rõ ràng.",
    type: "Mã OTP chính thức (An toàn)",
  },
  {
    id: "prac-27",
    content:
      "Tin nhắn từ hệ thống TikTok: Chúc mừng bạn đã được chọn ngẫu nhiên nhận phần thưởng 10 Triệu VND. Liên hệ CSKH qua Zalo để nhận: 0921.xxx.xxx",
    isScam: true,
    explanation:
      "Mạo danh TikTok tặng tiền thưởng ngẫu nhiên để thu hút nạn nhân kết bạn Zalo, sau đó sẽ yêu cầu nộp tiền thuế, phí vận chuyển để lừa tiền.",
    type: "Lừa đảo trúng thưởng",
  },
  {
    id: "prac-28",
    content:
      "ACB thông báo: TK 999988887777 của bạn có biến động số dư giảm 200,000 VND vào lúc 15:45. Số dư còn lại: 2,500,000 VND. ND: Mua hàng hóa online.",
    isScam: false,
    explanation:
      "Đây là tin nhắn thông báo biến động số dư chính thức và an toàn của ngân hàng ACB. Tin nhắn chỉ mang tính thông báo thuần túy, không có liên kết lạ hay yêu cầu mật khẩu.",
    type: "Thông báo số dư (An toàn)",
  },
  {
    id: "prac-29",
    content:
      "ViettelPost: Đơn hàng của bạn không thể phát do sai số nhà. Quý khách vui lòng truy cập cổng thông tin để cập nhật lại địa chỉ: http://viettelpost-update.net",
    isScam: true,
    explanation:
      "Giả mạo đơn vị chuyển phát Viettel Post gửi link cập nhật địa chỉ để dụ dỗ người dùng nhập thông tin cá nhân và thẻ ngân hàng nhằm chiếm đoạt tài khoản.",
    type: "Giả mạo đơn vị giao hàng",
  },
  {
    id: "prac-30",
    content:
      "Mã xác thực OTP đăng ký dịch vụ Mobile Banking của quý khách là 271829. Mã này chỉ có hiệu lực trong vòng 60 giây. Tuyệt đối không chia sẻ mã OTP cho bất kỳ ai.",
    isScam: false,
    explanation:
      "Mã xác thực OTP thông thường gửi từ hệ thống bảo mật ngân hàng để xác thực giao dịch do chính bạn khởi tạo. Tin nhắn có cảnh báo không chia sẻ OTP rõ ràng.",
    type: "Mã OTP chính thức (An toàn)",
  },
  {
    id: "prac-31",
    content:
      "BHXH Việt Nam: Hồ sơ hưởng trợ cấp BHXH của bạn cần được bổ sung thông tin trực tuyến gấp tại http://dichvucong-bhxh.org.vn.apk",
    isScam: true,
    explanation:
      "Đây là tin nhắn giả danh Cơ quan Bảo hiểm Xã hội Việt Nam dụ dỗ cài đặt ứng dụng thông qua file cài đặt ngoài (.apk) nhằm chiếm quyền kiểm soát thiết bị di động của bạn.",
    type: "Giả danh cơ quan chức năng",
  },
  {
    id: "prac-32",
    content:
      "Agribank thông báo: TK 999988887777 của bạn có biến động số dư giảm 200,000 VND vào lúc 15:45. Số dư còn lại: 2,500,000 VND. ND: Mua hàng hóa online.",
    isScam: false,
    explanation:
      "Đây là tin nhắn thông báo biến động số dư chính thức và an toàn của ngân hàng Agribank. Tin nhắn chỉ mang tính thông báo thuần túy, không có liên kết lạ hay yêu cầu mật khẩu.",
    type: "Thông báo số dư (An toàn)",
  },
  {
    id: "prac-33",
    content:
      "Tuyển CTV bán hàng online tại nhà cho sàn Shopee/Lazada. Chốt đơn nhận ngay hoa hồng từ 10-30%, công việc đơn giản, chỉ cần điện thoại. Đăng ký tại: http://vieclam-tmdt.com",
    isScam: true,
    explanation:
      "Chiêu trò lừa tuyển cộng tác viên chốt đơn ảo lừa tiền cọc hoặc bắt nạp tiền làm nhiệm vụ. Cảnh giác với công việc kiếm tiền dễ dàng qua mạng.",
    type: "Lừa đảo việc làm",
  },
  {
    id: "prac-34",
    content:
      "Mã xác thực OTP đăng ký dịch vụ Mobile Banking của quý khách là 271829. Mã này chỉ có hiệu lực trong vòng 60 giây. Tuyệt đối không chia sẻ mã OTP cho bất kỳ ai.",
    isScam: false,
    explanation:
      "Mã xác thực OTP thông thường gửi từ hệ thống bảo mật ngân hàng để xác thực giao dịch do chính bạn khởi tạo. Tin nhắn có cảnh báo không chia sẻ OTP rõ ràng.",
    type: "Mã OTP chính thức (An toàn)",
  },
  {
    id: "prac-35",
    content:
      "VPBank: Phát hiện đăng nhập bất thường từ thiết bị lạ. Vui lòng hủy bằng cách đăng nhập hệ thống tại http://vpbank-support.com",
    isScam: true,
    explanation:
      "Đây là tin nhắn lừa đảo mạo danh ngân hàng VPBank. Ngân hàng thật không sử dụng tên miền phụ dạng lạ và không gửi link đăng nhập trực tiếp qua tin nhắn SMS để yêu cầu xác nhận tài khoản.",
    type: "Giả mạo ngân hàng",
  },
  {
    id: "prac-36",
    content:
      "ACB thông báo: TK 999988887777 của bạn có biến động số dư giảm 200,000 VND vào lúc 15:45. Số dư còn lại: 2,500,000 VND. ND: Mua hàng hóa online.",
    isScam: false,
    explanation:
      "Đây là tin nhắn thông báo biến động số dư chính thức và an toàn của ngân hàng ACB. Tin nhắn chỉ mang tính thông báo thuần túy, không có liên kết lạ hay yêu cầu mật khẩu.",
    type: "Thông báo số dư (An toàn)",
  },
  {
    id: "prac-37",
    content:
      "Tin nhắn từ hệ thống TikTok: Chúc mừng bạn đã được chọn ngẫu nhiên nhận phần thưởng 10 Triệu VND. Liên hệ CSKH qua Zalo để nhận: 0921.xxx.xxx",
    isScam: true,
    explanation:
      "Mạo danh TikTok tặng tiền thưởng ngẫu nhiên để thu hút nạn nhân kết bạn Zalo, sau đó sẽ yêu cầu nộp tiền thuế, phí vận chuyển để lừa tiền.",
    type: "Lừa đảo trúng thưởng",
  },
  {
    id: "prac-38",
    content:
      "Mã xác thực OTP đăng ký dịch vụ Mobile Banking của quý khách là 271829. Mã này chỉ có hiệu lực trong vòng 60 giây. Tuyệt đối không chia sẻ mã OTP cho bất kỳ ai.",
    isScam: false,
    explanation:
      "Mã xác thực OTP thông thường gửi từ hệ thống bảo mật ngân hàng để xác thực giao dịch do chính bạn khởi tạo. Tin nhắn có cảnh báo không chia sẻ OTP rõ ràng.",
    type: "Mã OTP chính thức (An toàn)",
  },
  {
    id: "prac-39",
    content:
      "ViettelPost: Đơn hàng của bạn không thể phát do sai số nhà. Quý khách vui lòng truy cập cổng thông tin để cập nhật lại địa chỉ: http://viettelpost-update.net",
    isScam: true,
    explanation:
      "Giả mạo đơn vị chuyển phát Viettel Post gửi link cập nhật địa chỉ để dụ dỗ người dùng nhập thông tin cá nhân và thẻ ngân hàng nhằm chiếm đoạt tài khoản.",
    type: "Giả mạo đơn vị giao hàng",
  },
  {
    id: "prac-40",
    content:
      "Agribank thông báo: TK 999988887777 của bạn có biến động số dư giảm 200,000 VND vào lúc 15:45. Số dư còn lại: 2,500,000 VND. ND: Mua hàng hóa online.",
    isScam: false,
    explanation:
      "Đây là tin nhắn thông báo biến động số dư chính thức và an toàn của ngân hàng Agribank. Tin nhắn chỉ mang tính thông báo thuần túy, không có liên kết lạ hay yêu cầu mật khẩu.",
    type: "Thông báo số dư (An toàn)",
  },
  {
    id: "prac-41",
    content:
      "BHXH Việt Nam: Hồ sơ hưởng trợ cấp BHXH của bạn cần được bổ sung thông tin trực tuyến gấp tại http://dichvucong-bhxh.org.vn.apk",
    isScam: true,
    explanation:
      "Đây là tin nhắn giả danh Cơ quan Bảo hiểm Xã hội Việt Nam dụ dỗ cài đặt ứng dụng thông qua file cài đặt ngoài (.apk) nhằm chiếm quyền kiểm soát thiết bị di động của bạn.",
    type: "Giả danh cơ quan chức năng",
  },
  {
    id: "prac-42",
    content:
      "Mã xác thực OTP đăng ký dịch vụ Mobile Banking của quý khách là 271829. Mã này chỉ có hiệu lực trong vòng 60 giây. Tuyệt đối không chia sẻ mã OTP cho bất kỳ ai.",
    isScam: false,
    explanation:
      "Mã xác thực OTP thông thường gửi từ hệ thống bảo mật ngân hàng để xác thực giao dịch do chính bạn khởi tạo. Tin nhắn có cảnh báo không chia sẻ OTP rõ ràng.",
    type: "Mã OTP chính thức (An toàn)",
  },
  {
    id: "prac-43",
    content:
      "Tuyển CTV bán hàng online tại nhà cho sàn Shopee/Lazada. Chốt đơn nhận ngay hoa hồng từ 10-30%, công việc đơn giản, chỉ cần điện thoại. Đăng ký tại: http://vieclam-tmdt.com",
    isScam: true,
    explanation:
      "Chiêu trò lừa tuyển cộng tác viên chốt đơn ảo lừa tiền cọc hoặc bắt nạp tiền làm nhiệm vụ. Cảnh giác với công việc kiếm tiền dễ dàng qua mạng.",
    type: "Lừa đảo việc làm",
  },
  {
    id: "prac-44",
    content:
      "ACB thông báo: TK 999988887777 của bạn có biến động số dư giảm 200,000 VND vào lúc 15:45. Số dư còn lại: 2,500,000 VND. ND: Mua hàng hóa online.",
    isScam: false,
    explanation:
      "Đây là tin nhắn thông báo biến động số dư chính thức và an toàn của ngân hàng ACB. Tin nhắn chỉ mang tính thông báo thuần túy, không có liên kết lạ hay yêu cầu mật khẩu.",
    type: "Thông báo số dư (An toàn)",
  },
  {
    id: "prac-45",
    content:
      "VIB: Phát hiện đăng nhập bất thường từ thiết bị lạ. Vui lòng hủy bằng cách đăng nhập hệ thống tại http://vib-support.com",
    isScam: true,
    explanation:
      "Đây là tin nhắn lừa đảo mạo danh ngân hàng VIB. Ngân hàng thật không sử dụng tên miền phụ dạng lạ và không gửi link đăng nhập trực tiếp qua tin nhắn SMS để yêu cầu xác nhận tài khoản.",
    type: "Giả mạo ngân hàng",
  },
  {
    id: "prac-46",
    content:
      "Mã xác thực OTP đăng ký dịch vụ Mobile Banking của quý khách là 271829. Mã này chỉ có hiệu lực trong vòng 60 giây. Tuyệt đối không chia sẻ mã OTP cho bất kỳ ai.",
    isScam: false,
    explanation:
      "Mã xác thực OTP thông thường gửi từ hệ thống bảo mật ngân hàng để xác thực giao dịch do chính bạn khởi tạo. Tin nhắn có cảnh báo không chia sẻ OTP rõ ràng.",
    type: "Mã OTP chính thức (An toàn)",
  },
  {
    id: "prac-47",
    content:
      "Tin nhắn từ hệ thống TikTok: Chúc mừng bạn đã được chọn ngẫu nhiên nhận phần thưởng 10 Triệu VND. Liên hệ CSKH qua Zalo để nhận: 0921.xxx.xxx",
    isScam: true,
    explanation:
      "Mạo danh TikTok tặng tiền thưởng ngẫu nhiên để thu hút nạn nhân kết bạn Zalo, sau đó sẽ yêu cầu nộp tiền thuế, phí vận chuyển để lừa tiền.",
    type: "Lừa đảo trúng thưởng",
  },
  {
    id: "prac-48",
    content:
      "Agribank thông báo: TK 999988887777 của bạn có biến động số dư giảm 200,000 VND vào lúc 15:45. Số dư còn lại: 2,500,000 VND. ND: Mua hàng hóa online.",
    isScam: false,
    explanation:
      "Đây là tin nhắn thông báo biến động số dư chính thức và an toàn của ngân hàng Agribank. Tin nhắn chỉ mang tính thông báo thuần túy, không có liên kết lạ hay yêu cầu mật khẩu.",
    type: "Thông báo số dư (An toàn)",
  },
  {
    id: "prac-49",
    content:
      "ViettelPost: Đơn hàng của bạn không thể phát do sai số nhà. Quý khách vui lòng truy cập cổng thông tin để cập nhật lại địa chỉ: http://viettelpost-update.net",
    isScam: true,
    explanation:
      "Giả mạo đơn vị chuyển phát Viettel Post gửi link cập nhật địa chỉ để dụ dỗ người dùng nhập thông tin cá nhân và thẻ ngân hàng nhằm chiếm đoạt tài khoản.",
    type: "Giả mạo đơn vị giao hàng",
  },
  {
    id: "prac-50",
    content:
      "Mã xác thực OTP đăng ký dịch vụ Mobile Banking của quý khách là 271829. Mã này chỉ có hiệu lực trong vòng 60 giây. Tuyệt đối không chia sẻ mã OTP cho bất kỳ ai.",
    isScam: false,
    explanation:
      "Mã xác thực OTP thông thường gửi từ hệ thống bảo mật ngân hàng để xác thực giao dịch do chính bạn khởi tạo. Tin nhắn có cảnh báo không chia sẻ OTP rõ ràng.",
    type: "Mã OTP chính thức (An toàn)",
  },
  {
    id: "prac-51",
    content:
      "BHXH Việt Nam: Hồ sơ hưởng trợ cấp BHXH của bạn cần được bổ sung thông tin trực tuyến gấp tại http://dichvucong-bhxh.org.vn.apk",
    isScam: true,
    explanation:
      "Đây là tin nhắn giả danh Cơ quan Bảo hiểm Xã hội Việt Nam dụ dỗ cài đặt ứng dụng thông qua file cài đặt ngoài (.apk) nhằm chiếm quyền kiểm soát thiết bị di động của bạn.",
    type: "Giả danh cơ quan chức năng",
  },
  {
    id: "prac-52",
    content:
      "ACB thông báo: TK 999988887777 của bạn có biến động số dư giảm 200,000 VND vào lúc 15:45. Số dư còn lại: 2,500,000 VND. ND: Mua hàng hóa online.",
    isScam: false,
    explanation:
      "Đây là tin nhắn thông báo biến động số dư chính thức và an toàn của ngân hàng ACB. Tin nhắn chỉ mang tính thông báo thuần túy, không có liên kết lạ hay yêu cầu mật khẩu.",
    type: "Thông báo số dư (An toàn)",
  },
  {
    id: "prac-53",
    content:
      "Tuyển CTV bán hàng online tại nhà cho sàn Shopee/Lazada. Chốt đơn nhận ngay hoa hồng từ 10-30%, công việc đơn giản, chỉ cần điện thoại. Đăng ký tại: http://vieclam-tmdt.com",
    isScam: true,
    explanation:
      "Chiêu trò lừa tuyển cộng tác viên chốt đơn ảo lừa tiền cọc hoặc bắt nạp tiền làm nhiệm vụ. Cảnh giác với công việc kiếm tiền dễ dàng qua mạng.",
    type: "Lừa đảo việc làm",
  },
  {
    id: "prac-54",
    content:
      "Mã xác thực OTP đăng ký dịch vụ Mobile Banking của quý khách là 271829. Mã này chỉ có hiệu lực trong vòng 60 giây. Tuyệt đối không chia sẻ mã OTP cho bất kỳ ai.",
    isScam: false,
    explanation:
      "Mã xác thực OTP thông thường gửi từ hệ thống bảo mật ngân hàng để xác thực giao dịch do chính bạn khởi tạo. Tin nhắn có cảnh báo không chia sẻ OTP rõ ràng.",
    type: "Mã OTP chính thức (An toàn)",
  },
  {
    id: "prac-55",
    content:
      "ShinhanBank: Phát hiện đăng nhập bất thường từ thiết bị lạ. Vui lòng hủy bằng cách đăng nhập hệ thống tại http://shinhanbank-support.com",
    isScam: true,
    explanation:
      "Đây là tin nhắn lừa đảo mạo danh ngân hàng ShinhanBank. Ngân hàng thật không sử dụng tên miền phụ dạng lạ và không gửi link đăng nhập trực tiếp qua tin nhắn SMS để yêu cầu xác nhận tài khoản.",
    type: "Giả mạo ngân hàng",
  },
  {
    id: "prac-56",
    content:
      "Agribank thông báo: TK 999988887777 của bạn có biến động số dư giảm 200,000 VND vào lúc 15:45. Số dư còn lại: 2,500,000 VND. ND: Mua hàng hóa online.",
    isScam: false,
    explanation:
      "Đây là tin nhắn thông báo biến động số dư chính thức và an toàn của ngân hàng Agribank. Tin nhắn chỉ mang tính thông báo thuần túy, không có liên kết lạ hay yêu cầu mật khẩu.",
    type: "Thông báo số dư (An toàn)",
  },
  {
    id: "prac-57",
    content:
      "Tin nhắn từ hệ thống TikTok: Chúc mừng bạn đã được chọn ngẫu nhiên nhận phần thưởng 10 Triệu VND. Liên hệ CSKH qua Zalo để nhận: 0921.xxx.xxx",
    isScam: true,
    explanation:
      "Mạo danh TikTok tặng tiền thưởng ngẫu nhiên để thu hút nạn nhân kết bạn Zalo, sau đó sẽ yêu cầu nộp tiền thuế, phí vận chuyển để lừa tiền.",
    type: "Lừa đảo trúng thưởng",
  },
  {
    id: "prac-58",
    content:
      "Mã xác thực OTP đăng ký dịch vụ Mobile Banking của quý khách là 271829. Mã này chỉ có hiệu lực trong vòng 60 giây. Tuyệt đối không chia sẻ mã OTP cho bất kỳ ai.",
    isScam: false,
    explanation:
      "Mã xác thực OTP thông thường gửi từ hệ thống bảo mật ngân hàng để xác thực giao dịch do chính bạn khởi tạo. Tin nhắn có cảnh báo không chia sẻ OTP rõ ràng.",
    type: "Mã OTP chính thức (An toàn)",
  },
  {
    id: "prac-59",
    content:
      "ViettelPost: Đơn hàng của bạn không thể phát do sai số nhà. Quý khách vui lòng truy cập cổng thông tin để cập nhật lại địa chỉ: http://viettelpost-update.net",
    isScam: true,
    explanation:
      "Giả mạo đơn vị chuyển phát Viettel Post gửi link cập nhật địa chỉ để dụ dỗ người dùng nhập thông tin cá nhân và thẻ ngân hàng nhằm chiếm đoạt tài khoản.",
    type: "Giả mạo đơn vị giao hàng",
  },
  {
    id: "prac-60",
    content:
      "ACB thông báo: TK 999988887777 của bạn có biến động số dư giảm 200,000 VND vào lúc 15:45. Số dư còn lại: 2,500,000 VND. ND: Mua hàng hóa online.",
    isScam: false,
    explanation:
      "Đây là tin nhắn thông báo biến động số dư chính thức và an toàn của ngân hàng ACB. Tin nhắn chỉ mang tính thông báo thuần túy, không có liên kết lạ hay yêu cầu mật khẩu.",
    type: "Thông báo số dư (An toàn)",
  },
  {
    id: "prac-61",
    content:
      "BHXH Việt Nam: Hồ sơ hưởng trợ cấp BHXH của bạn cần được bổ sung thông tin trực tuyến gấp tại http://dichvucong-bhxh.org.vn.apk",
    isScam: true,
    explanation:
      "Đây là tin nhắn giả danh Cơ quan Bảo hiểm Xã hội Việt Nam dụ dỗ cài đặt ứng dụng thông qua file cài đặt ngoài (.apk) nhằm chiếm quyền kiểm soát thiết bị di động của bạn.",
    type: "Giả danh cơ quan chức năng",
  },
  {
    id: "prac-62",
    content:
      "Mã xác thực OTP đăng ký dịch vụ Mobile Banking của quý khách là 271829. Mã này chỉ có hiệu lực trong vòng 60 giây. Tuyệt đối không chia sẻ mã OTP cho bất kỳ ai.",
    isScam: false,
    explanation:
      "Mã xác thực OTP thông thường gửi từ hệ thống bảo mật ngân hàng để xác thực giao dịch do chính bạn khởi tạo. Tin nhắn có cảnh báo không chia sẻ OTP rõ ràng.",
    type: "Mã OTP chính thức (An toàn)",
  },
  {
    id: "prac-63",
    content:
      "Tuyển CTV bán hàng online tại nhà cho sàn Shopee/Lazada. Chốt đơn nhận ngay hoa hồng từ 10-30%, công việc đơn giản, chỉ cần điện thoại. Đăng ký tại: http://vieclam-tmdt.com",
    isScam: true,
    explanation:
      "Chiêu trò lừa tuyển cộng tác viên chốt đơn ảo lừa tiền cọc hoặc bắt nạp tiền làm nhiệm vụ. Cảnh giác với công việc kiếm tiền dễ dàng qua mạng.",
    type: "Lừa đảo việc làm",
  },
  {
    id: "prac-64",
    content:
      "Agribank thông báo: TK 999988887777 của bạn có biến động số dư giảm 200,000 VND vào lúc 15:45. Số dư còn lại: 2,500,000 VND. ND: Mua hàng hóa online.",
    isScam: false,
    explanation:
      "Đây là tin nhắn thông báo biến động số dư chính thức và an toàn của ngân hàng Agribank. Tin nhắn chỉ mang tính thông báo thuần túy, không có liên kết lạ hay yêu cầu mật khẩu.",
    type: "Thông báo số dư (An toàn)",
  },
  {
    id: "prac-65",
    content:
      "MBBank: Phát hiện đăng nhập bất thường từ thiết bị lạ. Vui lòng hủy bằng cách đăng nhập hệ thống tại http://mbbank-support.com",
    isScam: true,
    explanation:
      "Đây là tin nhắn lừa đảo mạo danh ngân hàng MBBank. Ngân hàng thật không sử dụng tên miền phụ dạng lạ và không gửi link đăng nhập trực tiếp qua tin nhắn SMS để yêu cầu xác nhận tài khoản.",
    type: "Giả mạo ngân hàng",
  },
  {
    id: "prac-66",
    content:
      "Mã xác thực OTP đăng ký dịch vụ Mobile Banking của quý khách là 271829. Mã này chỉ có hiệu lực trong vòng 60 giây. Tuyệt đối không chia sẻ mã OTP cho bất kỳ ai.",
    isScam: false,
    explanation:
      "Mã xác thực OTP thông thường gửi từ hệ thống bảo mật ngân hàng để xác thực giao dịch do chính bạn khởi tạo. Tin nhắn có cảnh báo không chia sẻ OTP rõ ràng.",
    type: "Mã OTP chính thức (An toàn)",
  },
  {
    id: "prac-67",
    content:
      "Tin nhắn từ hệ thống TikTok: Chúc mừng bạn đã được chọn ngẫu nhiên nhận phần thưởng 10 Triệu VND. Liên hệ CSKH qua Zalo để nhận: 0921.xxx.xxx",
    isScam: true,
    explanation:
      "Mạo danh TikTok tặng tiền thưởng ngẫu nhiên để thu hút nạn nhân kết bạn Zalo, sau đó sẽ yêu cầu nộp tiền thuế, phí vận chuyển để lừa tiền.",
    type: "Lừa đảo trúng thưởng",
  },
  {
    id: "prac-68",
    content:
      "ACB thông báo: TK 999988887777 của bạn có biến động số dư giảm 200,000 VND vào lúc 15:45. Số dư còn lại: 2,500,000 VND. ND: Mua hàng hóa online.",
    isScam: false,
    explanation:
      "Đây là tin nhắn thông báo biến động số dư chính thức và an toàn của ngân hàng ACB. Tin nhắn chỉ mang tính thông báo thuần túy, không có liên kết lạ hay yêu cầu mật khẩu.",
    type: "Thông báo số dư (An toàn)",
  },
  {
    id: "prac-69",
    content:
      "ViettelPost: Đơn hàng của bạn không thể phát do sai số nhà. Quý khách vui lòng truy cập cổng thông tin để cập nhật lại địa chỉ: http://viettelpost-update.net",
    isScam: true,
    explanation:
      "Giả mạo đơn vị chuyển phát Viettel Post gửi link cập nhật địa chỉ để dụ dỗ người dùng nhập thông tin cá nhân và thẻ ngân hàng nhằm chiếm đoạt tài khoản.",
    type: "Giả mạo đơn vị giao hàng",
  },
  {
    id: "prac-70",
    content:
      "Mã xác thực OTP đăng ký dịch vụ Mobile Banking của quý khách là 271829. Mã này chỉ có hiệu lực trong vòng 60 giây. Tuyệt đối không chia sẻ mã OTP cho bất kỳ ai.",
    isScam: false,
    explanation:
      "Mã xác thực OTP thông thường gửi từ hệ thống bảo mật ngân hàng để xác thực giao dịch do chính bạn khởi tạo. Tin nhắn có cảnh báo không chia sẻ OTP rõ ràng.",
    type: "Mã OTP chính thức (An toàn)",
  },
  {
    id: "prac-71",
    content:
      "BHXH Việt Nam: Hồ sơ hưởng trợ cấp BHXH của bạn cần được bổ sung thông tin trực tuyến gấp tại http://dichvucong-bhxh.org.vn.apk",
    isScam: true,
    explanation:
      "Đây là tin nhắn giả danh Cơ quan Bảo hiểm Xã hội Việt Nam dụ dỗ cài đặt ứng dụng thông qua file cài đặt ngoài (.apk) nhằm chiếm quyền kiểm soát thiết bị di động của bạn.",
    type: "Giả danh cơ quan chức năng",
  },
  {
    id: "prac-72",
    content:
      "Agribank thông báo: TK 999988887777 của bạn có biến động số dư giảm 200,000 VND vào lúc 15:45. Số dư còn lại: 2,500,000 VND. ND: Mua hàng hóa online.",
    isScam: false,
    explanation:
      "Đây là tin nhắn thông báo biến động số dư chính thức và an toàn của ngân hàng Agribank. Tin nhắn chỉ mang tính thông báo thuần túy, không có liên kết lạ hay yêu cầu mật khẩu.",
    type: "Thông báo số dư (An toàn)",
  },
  {
    id: "prac-73",
    content:
      "Tuyển CTV bán hàng online tại nhà cho sàn Shopee/Lazada. Chốt đơn nhận ngay hoa hồng từ 10-30%, công việc đơn giản, chỉ cần điện thoại. Đăng ký tại: http://vieclam-tmdt.com",
    isScam: true,
    explanation:
      "Chiêu trò lừa tuyển cộng tác viên chốt đơn ảo lừa tiền cọc hoặc bắt nạp tiền làm nhiệm vụ. Cảnh giác với công việc kiếm tiền dễ dàng qua mạng.",
    type: "Lừa đảo việc làm",
  },
  {
    id: "prac-74",
    content:
      "Mã xác thực OTP đăng ký dịch vụ Mobile Banking của quý khách là 271829. Mã này chỉ có hiệu lực trong vòng 60 giây. Tuyệt đối không chia sẻ mã OTP cho bất kỳ ai.",
    isScam: false,
    explanation:
      "Mã xác thực OTP thông thường gửi từ hệ thống bảo mật ngân hàng để xác thực giao dịch do chính bạn khởi tạo. Tin nhắn có cảnh báo không chia sẻ OTP rõ ràng.",
    type: "Mã OTP chính thức (An toàn)",
  },
  {
    id: "prac-75",
    content:
      "VPBank: Phát hiện đăng nhập bất thường từ thiết bị lạ. Vui lòng hủy bằng cách đăng nhập hệ thống tại http://vpbank-support.com",
    isScam: true,
    explanation:
      "Đây là tin nhắn lừa đảo mạo danh ngân hàng VPBank. Ngân hàng thật không sử dụng tên miền phụ dạng lạ và không gửi link đăng nhập trực tiếp qua tin nhắn SMS để yêu cầu xác nhận tài khoản.",
    type: "Giả mạo ngân hàng",
  },
  {
    id: "prac-76",
    content:
      "ACB thông báo: TK 999988887777 của bạn có biến động số dư giảm 200,000 VND vào lúc 15:45. Số dư còn lại: 2,500,000 VND. ND: Mua hàng hóa online.",
    isScam: false,
    explanation:
      "Đây là tin nhắn thông báo biến động số dư chính thức và an toàn của ngân hàng ACB. Tin nhắn chỉ mang tính thông báo thuần túy, không có liên kết lạ hay yêu cầu mật khẩu.",
    type: "Thông báo số dư (An toàn)",
  },
  {
    id: "prac-77",
    content:
      "Tin nhắn từ hệ thống TikTok: Chúc mừng bạn đã được chọn ngẫu nhiên nhận phần thưởng 10 Triệu VND. Liên hệ CSKH qua Zalo để nhận: 0921.xxx.xxx",
    isScam: true,
    explanation:
      "Mạo danh TikTok tặng tiền thưởng ngẫu nhiên để thu hút nạn nhân kết bạn Zalo, sau đó sẽ yêu cầu nộp tiền thuế, phí vận chuyển để lừa tiền.",
    type: "Lừa đảo trúng thưởng",
  },
  {
    id: "prac-78",
    content:
      "Mã xác thực OTP đăng ký dịch vụ Mobile Banking của quý khách là 271829. Mã này chỉ có hiệu lực trong vòng 60 giây. Tuyệt đối không chia sẻ mã OTP cho bất kỳ ai.",
    isScam: false,
    explanation:
      "Mã xác thực OTP thông thường gửi từ hệ thống bảo mật ngân hàng để xác thực giao dịch do chính bạn khởi tạo. Tin nhắn có cảnh báo không chia sẻ OTP rõ ràng.",
    type: "Mã OTP chính thức (An toàn)",
  },
  {
    id: "prac-79",
    content:
      "ViettelPost: Đơn hàng của bạn không thể phát do sai số nhà. Quý khách vui lòng truy cập cổng thông tin để cập nhật lại địa chỉ: http://viettelpost-update.net",
    isScam: true,
    explanation:
      "Giả mạo đơn vị chuyển phát Viettel Post gửi link cập nhật địa chỉ để dụ dỗ người dùng nhập thông tin cá nhân và thẻ ngân hàng nhằm chiếm đoạt tài khoản.",
    type: "Giả mạo đơn vị giao hàng",
  },
  {
    id: "prac-80",
    content:
      "Agribank thông báo: TK 999988887777 của bạn có biến động số dư giảm 200,000 VND vào lúc 15:45. Số dư còn lại: 2,500,000 VND. ND: Mua hàng hóa online.",
    isScam: false,
    explanation:
      "Đây là tin nhắn thông báo biến động số dư chính thức và an toàn của ngân hàng Agribank. Tin nhắn chỉ mang tính thông báo thuần túy, không có liên kết lạ hay yêu cầu mật khẩu.",
    type: "Thông báo số dư (An toàn)",
  },
  {
    id: "prac-81",
    content:
      "BHXH Việt Nam: Hồ sơ hưởng trợ cấp BHXH của bạn cần được bổ sung thông tin trực tuyến gấp tại http://dichvucong-bhxh.org.vn.apk",
    isScam: true,
    explanation:
      "Đây là tin nhắn giả danh Cơ quan Bảo hiểm Xã hội Việt Nam dụ dỗ cài đặt ứng dụng thông qua file cài đặt ngoài (.apk) nhằm chiếm quyền kiểm soát thiết bị di động của bạn.",
    type: "Giả danh cơ quan chức năng",
  },
  {
    id: "prac-82",
    content:
      "Mã xác thực OTP đăng ký dịch vụ Mobile Banking của quý khách là 271829. Mã này chỉ có hiệu lực trong vòng 60 giây. Tuyệt đối không chia sẻ mã OTP cho bất kỳ ai.",
    isScam: false,
    explanation:
      "Mã xác thực OTP thông thường gửi từ hệ thống bảo mật ngân hàng để xác thực giao dịch do chính bạn khởi tạo. Tin nhắn có cảnh báo không chia sẻ OTP rõ ràng.",
    type: "Mã OTP chính thức (An toàn)",
  },
  {
    id: "prac-83",
    content:
      "Tuyển CTV bán hàng online tại nhà cho sàn Shopee/Lazada. Chốt đơn nhận ngay hoa hồng từ 10-30%, công việc đơn giản, chỉ cần điện thoại. Đăng ký tại: http://vieclam-tmdt.com",
    isScam: true,
    explanation:
      "Chiêu trò lừa tuyển cộng tác viên chốt đơn ảo lừa tiền cọc hoặc bắt nạp tiền làm nhiệm vụ. Cảnh giác với công việc kiếm tiền dễ dàng qua mạng.",
    type: "Lừa đảo việc làm",
  },
  {
    id: "prac-84",
    content:
      "ACB thông báo: TK 999988887777 của bạn có biến động số dư giảm 200,000 VND vào lúc 15:45. Số dư còn lại: 2,500,000 VND. ND: Mua hàng hóa online.",
    isScam: false,
    explanation:
      "Đây là tin nhắn thông báo biến động số dư chính thức và an toàn của ngân hàng ACB. Tin nhắn chỉ mang tính thông báo thuần túy, không có liên kết lạ hay yêu cầu mật khẩu.",
    type: "Thông báo số dư (An toàn)",
  },
  {
    id: "prac-85",
    content:
      "VIB: Phát hiện đăng nhập bất thường từ thiết bị lạ. Vui lòng hủy bằng cách đăng nhập hệ thống tại http://vib-support.com",
    isScam: true,
    explanation:
      "Đây là tin nhắn lừa đảo mạo danh ngân hàng VIB. Ngân hàng thật không sử dụng tên miền phụ dạng lạ và không gửi link đăng nhập trực tiếp qua tin nhắn SMS để yêu cầu xác nhận tài khoản.",
    type: "Giả mạo ngân hàng",
  },
  {
    id: "prac-86",
    content:
      "Mã xác thực OTP đăng ký dịch vụ Mobile Banking của quý khách là 271829. Mã này chỉ có hiệu lực trong vòng 60 giây. Tuyệt đối không chia sẻ mã OTP cho bất kỳ ai.",
    isScam: false,
    explanation:
      "Mã xác thực OTP thông thường gửi từ hệ thống bảo mật ngân hàng để xác thực giao dịch do chính bạn khởi tạo. Tin nhắn có cảnh báo không chia sẻ OTP rõ ràng.",
    type: "Mã OTP chính thức (An toàn)",
  },
  {
    id: "prac-87",
    content:
      "Tin nhắn từ hệ thống TikTok: Chúc mừng bạn đã được chọn ngẫu nhiên nhận phần thưởng 10 Triệu VND. Liên hệ CSKH qua Zalo để nhận: 0921.xxx.xxx",
    isScam: true,
    explanation:
      "Mạo danh TikTok tặng tiền thưởng ngẫu nhiên để thu hút nạn nhân kết bạn Zalo, sau đó sẽ yêu cầu nộp tiền thuế, phí vận chuyển để lừa tiền.",
    type: "Lừa đảo trúng thưởng",
  },
  {
    id: "prac-88",
    content:
      "Agribank thông báo: TK 999988887777 của bạn có biến động số dư giảm 200,000 VND vào lúc 15:45. Số dư còn lại: 2,500,000 VND. ND: Mua hàng hóa online.",
    isScam: false,
    explanation:
      "Đây là tin nhắn thông báo biến động số dư chính thức và an toàn của ngân hàng Agribank. Tin nhắn chỉ mang tính thông báo thuần túy, không có liên kết lạ hay yêu cầu mật khẩu.",
    type: "Thông báo số dư (An toàn)",
  },
  {
    id: "prac-89",
    content:
      "ViettelPost: Đơn hàng của bạn không thể phát do sai số nhà. Quý khách vui lòng truy cập cổng thông tin để cập nhật lại địa chỉ: http://viettelpost-update.net",
    isScam: true,
    explanation:
      "Giả mạo đơn vị chuyển phát Viettel Post gửi link cập nhật địa chỉ để dụ dỗ người dùng nhập thông tin cá nhân và thẻ ngân hàng nhằm chiếm đoạt tài khoản.",
    type: "Giả mạo đơn vị giao hàng",
  },
  {
    id: "prac-90",
    content:
      "Mã xác thực OTP đăng ký dịch vụ Mobile Banking của quý khách là 271829. Mã này chỉ có hiệu lực trong vòng 60 giây. Tuyệt đối không chia sẻ mã OTP cho bất kỳ ai.",
    isScam: false,
    explanation:
      "Mã xác thực OTP thông thường gửi từ hệ thống bảo mật ngân hàng để xác thực giao dịch do chính bạn khởi tạo. Tin nhắn có cảnh báo không chia sẻ OTP rõ ràng.",
    type: "Mã OTP chính thức (An toàn)",
  },
  {
    id: "prac-91",
    content:
      "BHXH Việt Nam: Hồ sơ hưởng trợ cấp BHXH của bạn cần được bổ sung thông tin trực tuyến gấp tại http://dichvucong-bhxh.org.vn.apk",
    isScam: true,
    explanation:
      "Đây là tin nhắn giả danh Cơ quan Bảo hiểm Xã hội Việt Nam dụ dỗ cài đặt ứng dụng thông qua file cài đặt ngoài (.apk) nhằm chiếm quyền kiểm soát thiết bị di động của bạn.",
    type: "Giả danh cơ quan chức năng",
  },
  {
    id: "prac-92",
    content:
      "ACB thông báo: TK 999988887777 của bạn có biến động số dư giảm 200,000 VND vào lúc 15:45. Số dư còn lại: 2,500,000 VND. ND: Mua hàng hóa online.",
    isScam: false,
    explanation:
      "Đây là tin nhắn thông báo biến động số dư chính thức và an toàn của ngân hàng ACB. Tin nhắn chỉ mang tính thông báo thuần túy, không có liên kết lạ hay yêu cầu mật khẩu.",
    type: "Thông báo số dư (An toàn)",
  },
  {
    id: "prac-93",
    content:
      "Tuyển CTV bán hàng online tại nhà cho sàn Shopee/Lazada. Chốt đơn nhận ngay hoa hồng từ 10-30%, công việc đơn giản, chỉ cần điện thoại. Đăng ký tại: http://vieclam-tmdt.com",
    isScam: true,
    explanation:
      "Chiêu trò lừa tuyển cộng tác viên chốt đơn ảo lừa tiền cọc hoặc bắt nạp tiền làm nhiệm vụ. Cảnh giác với công việc kiếm tiền dễ dàng qua mạng.",
    type: "Lừa đảo việc làm",
  },
  {
    id: "prac-94",
    content:
      "Mã xác thực OTP đăng ký dịch vụ Mobile Banking của quý khách là 271829. Mã này chỉ có hiệu lực trong vòng 60 giây. Tuyệt đối không chia sẻ mã OTP cho bất kỳ ai.",
    isScam: false,
    explanation:
      "Mã xác thực OTP thông thường gửi từ hệ thống bảo mật ngân hàng để xác thực giao dịch do chính bạn khởi tạo. Tin nhắn có cảnh báo không chia sẻ OTP rõ ràng.",
    type: "Mã OTP chính thức (An toàn)",
  },
  {
    id: "prac-95",
    content:
      "ShinhanBank: Phát hiện đăng nhập bất thường từ thiết bị lạ. Vui lòng hủy bằng cách đăng nhập hệ thống tại http://shinhanbank-support.com",
    isScam: true,
    explanation:
      "Đây là tin nhắn lừa đảo mạo danh ngân hàng ShinhanBank. Ngân hàng thật không sử dụng tên miền phụ dạng lạ và không gửi link đăng nhập trực tiếp qua tin nhắn SMS để yêu cầu xác nhận tài khoản.",
    type: "Giả mạo ngân hàng",
  },
  {
    id: "prac-96",
    content:
      "Agribank thông báo: TK 999988887777 của bạn có biến động số dư giảm 200,000 VND vào lúc 15:45. Số dư còn lại: 2,500,000 VND. ND: Mua hàng hóa online.",
    isScam: false,
    explanation:
      "Đây là tin nhắn thông báo biến động số dư chính thức và an toàn của ngân hàng Agribank. Tin nhắn chỉ mang tính thông báo thuần túy, không có liên kết lạ hay yêu cầu mật khẩu.",
    type: "Thông báo số dư (An toàn)",
  },
  {
    id: "prac-97",
    content:
      "Tin nhắn từ hệ thống TikTok: Chúc mừng bạn đã được chọn ngẫu nhiên nhận phần thưởng 10 Triệu VND. Liên hệ CSKH qua Zalo để nhận: 0921.xxx.xxx",
    isScam: true,
    explanation:
      "Mạo danh TikTok tặng tiền thưởng ngẫu nhiên để thu hút nạn nhân kết bạn Zalo, sau đó sẽ yêu cầu nộp tiền thuế, phí vận chuyển để lừa tiền.",
    type: "Lừa đảo trúng thưởng",
  },
  {
    id: "prac-98",
    content:
      "Mã xác thực OTP đăng ký dịch vụ Mobile Banking của quý khách là 271829. Mã này chỉ có hiệu lực trong vòng 60 giây. Tuyệt đối không chia sẻ mã OTP cho bất kỳ ai.",
    isScam: false,
    explanation:
      "Mã xác thực OTP thông thường gửi từ hệ thống bảo mật ngân hàng để xác thực giao dịch do chính bạn khởi tạo. Tin nhắn có cảnh báo không chia sẻ OTP rõ ràng.",
    type: "Mã OTP chính thức (An toàn)",
  },
  {
    id: "prac-99",
    content:
      "ViettelPost: Đơn hàng của bạn không thể phát do sai số nhà. Quý khách vui lòng truy cập cổng thông tin để cập nhật lại địa chỉ: http://viettelpost-update.net",
    isScam: true,
    explanation:
      "Giả mạo đơn vị chuyển phát Viettel Post gửi link cập nhật địa chỉ để dụ dỗ người dùng nhập thông tin cá nhân và thẻ ngân hàng nhằm chiếm đoạt tài khoản.",
    type: "Giả mạo đơn vị giao hàng",
  },
  {
    id: "prac-100",
    content:
      "ACB thông báo: TK 999988887777 của bạn có biến động số dư giảm 200,000 VND vào lúc 15:45. Số dư còn lại: 2,500,000 VND. ND: Mua hàng hóa online.",
    isScam: false,
    explanation:
      "Đây là tin nhắn thông báo biến động số dư chính thức và an toàn của ngân hàng ACB. Tin nhắn chỉ mang tính thông báo thuần túy, không có liên kết lạ hay yêu cầu mật khẩu.",
    type: "Thông báo số dư (An toàn)",
  },
];
