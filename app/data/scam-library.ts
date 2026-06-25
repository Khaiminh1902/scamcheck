export type ScamCategory = "bank" | "police" | "prize" | "delivery" | "job";

export type ScamLibraryItem = {
  id: string;
  name: string;
  description: string;
  example: string;
  category: ScamCategory;
};

export const SCAM_CATEGORIES = {
  all: "Tất cả",
  bank: "Giả ngân hàng",
  police: "Giả cơ quan công an",
  prize: "Trúng thưởng",
  delivery: "Giả đơn vị giao hàng",
  job: "Việc làm online",
};

export const SCAM_LIBRARY: ScamLibraryItem[] = [
  {
    id: "bank-1",
    name: "Cảnh báo khóa tài khoản ngân hàng",
    description: "Kẻ gian gửi tin nhắn mạo danh ngân hàng cảnh báo tài khoản của bạn sẽ bị khóa hoặc tạm ngưng dịch vụ do nghi ngờ gian lận. Kèm theo đó là một đường link giả mạo yêu cầu bạn đăng nhập để xác thực thông tin.",
    example: "[Vietcombank] Tai khoan cua quy khach da bi khoa tam thoi. Vui long truy cap https://vcb-online.vip de xac thuc lai thong tin va mo khoa.",
    category: "bank",
  },
  {
    id: "bank-2",
    name: "Thông báo nâng cấp ứng dụng ngân hàng",
    description: "Tin nhắn giả mạo yêu cầu người dùng nâng cấp ứng dụng SmartBanking để tiếp tục sử dụng dịch vụ hoặc nhận ưu đãi mới. Link đính kèm thường tải xuống file APK độc hại chứa mã độc.",
    example: "BIDV: Ung dung SmartBanking cua ban da loi thoi. Tai ung dung moi nhat de nhan uu dai 50k tai https://bidv-smartbanking.apk-app.com",
    category: "bank",
  },
  {
    id: "bank-3",
    name: "Phát hiện giao dịch bất thường",
    description: "Kẻ gian dọa bạn vừa bị trừ một số tiền lớn. Nếu không phải bạn thực hiện, chúng yêu cầu bấm vào link để hủy giao dịch và hoàn tiền.",
    example: "Techcombank: TK cua ban vua bi tru 15,000,000 VND. Neu khong phai ban giao dich, vui long truy cap https://techcombank-refund.net de huy.",
    category: "bank",
  },
  {
    id: "police-1",
    name: "Phạt nguội vi phạm giao thông",
    description: "Tin nhắn mạo danh CSGT thông báo bạn có biên lai phạt nguội chưa nộp. Bạn được yêu cầu bấm vào link để xem chi tiết lỗi vi phạm và nộp phạt.",
    example: "CUC CSGT: Phat nguoi! Xe cua ban vi pham giao thong vao ngay 10/10. De xem bien ban va nop phat, truy cap: https://phatnguoivn.com/tra-cuu",
    category: "police",
  },
  {
    id: "police-2",
    name: "Triệu tập vì liên quan đến ma túy/rửa tiền",
    description: "Đối tượng xưng là công an, điều tra viên nhắn tin dọa bạn liên quan đến một đường dây ma túy hoặc rửa tiền xuyên quốc gia, yêu cầu hợp tác điều tra qua mạng.",
    example: "BO CONG AN: Ong/ba hien dang lien quan den duong day rua tien qua bien gioi. Yeu cau truy cap web https://bocongan-dientu.net de khai bao thanh khan.",
    category: "police",
  },
  {
    id: "police-3",
    name: "Yêu cầu cài đặt VNeID giả mạo",
    description: "Kẻ gian yêu cầu tải và cài đặt ứng dụng định danh điện tử VNeID giả mạo để tích hợp giấy tờ. Ứng dụng này sẽ cấp quyền điều khiển điện thoại cho kẻ gian.",
    example: "CONG AN QUAN: Yeu cau cong dan cap nhat app VNeID muc do 2 de tich hop giay phep lai xe. Tai app moi tai link: https://vneid-dichvucong.apk",
    category: "police",
  },
  {
    id: "prize-1",
    name: "Trúng iPhone đời mới",
    description: "Thông báo bạn là khách hàng may mắn trúng thưởng iPhone 15/16 Pro Max. Yêu cầu chuyển khoản một số tiền nhỏ gọi là 'phí làm hồ sơ' hoặc 'phí vận chuyển' để nhận quà.",
    example: "CHUC MUNG! Ban da trung thuong 1 Iphone 16 Pro Max tu chuong trinh tri an. Vui long chuyen khoan 500k phi nhan thuong vao STK 01234567 de chung toi gui qua.",
    category: "prize",
  },
  {
    id: "prize-2",
    name: "Quà tặng tri ân khách hàng từ sàn TMĐT",
    description: "Tin nhắn giả mạo Shopee/Lazada thông báo tặng phiếu mua hàng trị giá lớn hoặc phần quà đặc biệt. Yêu cầu cung cấp thông tin cá nhân hoặc bấm vào link giả mạo.",
    example: "SHOPEE: Tri an khach hang VIP! Tang ban Voucher 2 trieu dong. Nhan vao link de luu ma: https://shopee-tri-an.net",
    category: "prize",
  },
  {
    id: "prize-3",
    name: "Trúng giải sổ xố/quay số may mắn",
    description: "Gửi tin nhắn trúng thưởng tiền mặt hàng trăm triệu đồng từ một sự kiện ảo hoặc mạng xã hội. Thường yêu cầu truy cập website lạ và điền thông tin ngân hàng để nhận tiền.",
    example: "[ZALO] Chuc mung tai khoan cua ban da quay trung Giai Nhat tri gia 100 trieu dong. Nhan vao https://zalo-nhanthuong.com de lam thu tuc.",
    category: "prize",
  },
  {
    id: "delivery-1",
    name: "Giao hàng thất bại, yêu cầu nộp phí",
    description: "Giả mạo nhân viên bưu điện hoặc shipper báo rằng có bưu phẩm bị kẹt ở hải quan hoặc không thể giao do sai địa chỉ. Yêu cầu thanh toán thêm phí qua link.",
    example: "GIAOHANG: Kien hang cua ban khong the giao thanh cong do sai thong tin. Vui long cap nhat va tra phi 20k tai https://ghn-redelivery.com",
    category: "delivery",
  },
  {
    id: "delivery-2",
    name: "Giả shipper đòi chuyển khoản trước",
    description: "Nhắn tin qua Zalo hoặc SMS giả danh shipper đang giao đơn, yêu cầu chuyển khoản tiền COD trước vì đang để hàng ở bốt bảo vệ hoặc không tiện gặp.",
    example: "Em shipper day a. Don hang 350k em de o bao ve roi. Anh/chi CK qua STK nay cho em nhe: 99912345 Bank ABC.",
    category: "delivery",
  },
  {
    id: "delivery-3",
    name: "Đơn hàng giá trị cao từ nước ngoài",
    description: "Thông báo có bưu kiện giá trị lớn từ nước ngoài gửi về. Yêu cầu nộp tiền thuế hải quan vào tài khoản cá nhân để được thông quan.",
    example: "HAI QUAN: Ban co 1 kien hang tu My tri gia 5.000 USD dang bi tam giu. Can nop the thue 2.000.000d de thong quan. Chi tiet LH Zalo: 0987654321",
    category: "delivery",
  },
  {
    id: "job-1",
    name: "Tuyển dụng việc nhẹ lương cao",
    description: "Mời gọi làm việc bán thời gian tại nhà, xem video TikTok/YouTube kiếm tiền. Cần chuyển tiền ứng trước làm nhiệm vụ rồi bị chiếm đoạt.",
    example: "TUYEN DUNG: Tim nguoi xem video Tiktok/Youtube tai nha. Luong 500k-1trieu/ngay. Khong can kinh nghiem. Ket ban Zalo 01234567 de lam ngay.",
    category: "job",
  },
  {
    id: "job-2",
    name: "Cộng tác viên thanh toán hộ đơn hàng",
    description: "Tuyển cộng tác viên chốt đơn ảo cho các sàn thương mại điện tử để tăng tương tác. Hứa hẹn hoàn tiền gốc và hoa hồng 10-20%. Những đơn đầu nhỏ lẻ được trả đủ, đến đơn lớn thì viện cớ lỗi hệ thống và bắt đóng thêm tiền.",
    example: "Shopee tuyen CTV chot don ao. Chuyen khoan tien don hang duoc hoan lai + 20% hoa hong. Lam luon tren dien thoai. LH Zalo 0999888777",
    category: "job",
  },
  {
    id: "bank-4",
    name: "Chuyển khoản nhầm để ép vay nặng lãi",
    description: "Kẻ gian chuyển một số tiền nhỏ vào tài khoản của bạn với nội dung gây hiểu nhầm (ví dụ: chuyển khoản vay). Sau đó, một đối tượng khác sẽ gọi điện, nhắn tin đòi nợ với lãi suất cắt cổ, đe dọa nếu không trả.",
    example: "[Ngân hàng] Giao dịch nhận +5,000,000 VND từ TK 102938475. ND: Nguyễn Văn A chuyển tiền vay tháng 6.",
    category: "bank",
  },
  {
    id: "bank-5",
    name: "Hỗ trợ rút tiền mặt qua thẻ tín dụng trực tuyến",
    description: "Các bài đăng hoặc tin nhắn quảng cáo hỗ trợ rút tiền mặt từ thẻ tín dụng với phí cực thấp, không cần hồ sơ. Kẻ gian sẽ yêu cầu quét mã QR hoặc cung cấp thông tin thẻ (số thẻ, ngày hết hạn, mã CVV) để rút tiền hộ nhưng thực tế là đánh cắp thông tin thẻ.",
    example: "Dich vu rut tien mat tu the tin dung an toan, bao mat, phi chi 1.2%. Nhan tien mat ngay qua Zalo hoac tai khoan ngan hang. LH: 0901.xxx.xxx",
    category: "bank",
  },
  {
    id: "police-4",
    name: "Cảnh báo khóa thuê bao/sim điện thoại",
    description: "Đối tượng mạo danh Cục Viễn thông hoặc nhà mạng nhắn tin/gọi điện thông báo thuê bao điện thoại của bạn sắp bị khóa do chưa chuẩn hóa thông tin hoặc liên quan đến vụ án phát tán tin rác. Yêu cầu truy cập link lạ hoặc làm theo hướng dẫn để tránh bị khóa sim.",
    example: "[CUC VIEN THONG] Thue bao cua quy khach chua duoc chuan hoa thong tin va se bi tam dung hoat dong sau 2h. Vui long cap nhat tai: https://cucvienthong-chuanhoa.net",
    category: "police",
  },
  {
    id: "police-5",
    name: "Cập nhật dữ liệu dân cư/sổ hộ khẩu điện tử",
    description: "Mạo danh công an cấp xã/phường liên hệ yêu cầu người dân cập nhật thông tin hộ tịch, sổ hộ khẩu điện tử hoặc đồng bộ thẻ bảo hiểm xã hội qua ứng dụng dịch vụ công. Kẻ gian gửi link tải ứng dụng giả mạo dạng file cài đặt (.apk) nhằm chiếm đoạt quyền điều khiển điện thoại.",
    example: "Cong an Phuong thong bao: So ho khau giay da het gia tri. Vui long tai app dich vu cong de khai bao thong tin so ho khau dien tu tai: http://dichvucong-gov.apk",
    category: "police",
  },
  {
    id: "prize-4",
    name: "Mừng sinh nhật/kỷ niệm thương hiệu lớn để tặng quà",
    description: "Tin nhắn hoặc bài viết giả mạo các nhãn hàng lớn như Coca-Cola, Samsung, Heineken... tặng quà miễn phí hoặc phiếu mua hàng lớn nhân dịp kỷ niệm. Người tham gia phải làm khảo sát, chia sẻ link cho bạn bè và điền thông tin cá nhân hoặc đóng phí ship để nhận quà.",
    example: "Kỷ niệm 100 năm thành lập Coca-Cola! Bạn được nhận 1 thùng nước ngọt miễn phí và phiếu mua hàng 1.000.000đ. Nhận quà ngay tại: https://cocacola-100years.club",
    category: "prize",
  },
  {
    id: "prize-5",
    name: "Trúng thẻ cào điện thoại qua mạng xã hội",
    description: "Nhắn tin thông báo trúng thẻ cào điện thoại mệnh giá cao (200k, 500k) do may mắn trúng thưởng khi tương tác, thả tim bài viết trên mạng xã hội. Đường link đính kèm yêu cầu nhập thông tin tài khoản mạng xã hội để nhận mã thẻ, thực chất để hack tài khoản.",
    example: "Chuc mung ban da nhan duoc the cao Viettel 500.000d tu chuong trinh may man cua Fanpage. Nhan ma the tai day: http://nhanthecao-viettel.com/free",
    category: "prize",
  },
  {
    id: "delivery-4",
    name: "Đơn hàng tri ân 0 đồng nhưng thu phí ship cao",
    description: "Kẻ gian giả danh các sàn thương mại điện tử gửi tặng bạn món quà tri ân ngẫu nhiên với giá trị đơn hàng là 0 đồng. Tuy nhiên, khi shipper đến giao hàng, bạn được yêu cầu thanh toán khoản phí vận chuyển (phí ship) rất cao (từ 50k đến vài trăm nghìn) cho một món quà vô giá trị.",
    example: "GIAOHANG: Ban co don hang 0d (Qua tri an tu Lazada) dang duoc giao. Phi van chuyen thu ho la 99.000d. Vui long de y dien thoai nhan hang.",
    category: "delivery",
  },
  {
    id: "delivery-5",
    name: "Hàng xách tay/quà gửi từ nước ngoài bị giữ tại sân bay",
    description: "Đối tượng mạo danh nhân viên hải quan hoặc hãng vận chuyển quốc tế báo rằng bạn có bưu kiện giá trị lớn gửi từ nước ngoài đang bị tạm giữ do phát hiện vi phạm quy định, hàng cấm hoặc thiếu thuế. Yêu cầu chuyển khoản tiền phạt, tiền bảo lãnh hoặc tiền thuế vào tài khoản cá nhân để được thông quan.",
    example: "HAI QUAN TAN SON NHAT: Kien hang so VN-98721 gui cho ban tu Anh Quoc dang bi tam giu do thieu khai bao thue. Can dong thue 3.500.000d vao STK 102938475 de duoc giai toa.",
    category: "delivery",
  },
  {
    id: "job-3",
    name: "Tuyển cộng tác viên đọc sách/thu âm truyện tại nhà",
    description: "Đăng tin tuyển dụng CTV đọc sách, thu âm giọng đọc truyện, lồng tiếng tại nhà với mức thù lao hấp dẫn. Ban đầu kẻ gian yêu cầu nộp 'tiền bảo đặt cọc sách' hoặc 'phí kiểm tra giọng đọc', hứa hẹn sẽ hoàn lại sau đơn hàng đầu tiên nhưng sau đó chặn liên lạc.",
    example: "[TUYEN DUNG CTV] Can 15 ban doc truyen truyen cam tai nha, luong 200k/chuong. Khong can len cong ty. Dang ky lam thu giong qua Zalo: 0868.xxx.xxx",
    category: "job",
  },
  {
    id: "job-4",
    name: "Làm nhiệm vụ đánh giá Google Maps/địa điểm du lịch",
    description: "Dụ dỗ người dùng tham gia làm cộng tác viên đánh giá 5 sao cho các khách sạn, địa điểm du lịch trên Google Maps để nhận hoa hồng 20.000đ - 50.000đ/lần. Sau vài nhiệm vụ miễn phí đầu tiên có trả tiền thật, kẻ gian sẽ yêu cầu chuyển tiền làm 'nhiệm vụ nâng cấp' với số tiền lớn hơn rồi khóa tài khoản.",
    example: "Tuyển CTV đánh giá địa điểm Google Maps kiếm tiền online. Chỉ cần bấm thích và đánh giá 5 sao nhận ngay 50k/nhiệm vụ. Liên hệ Telegram: @danhgia_googlemaps",
    category: "job",
  }
];
