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
    "id": "bank-1",
    "name": "Cảnh báo khóa tài khoản ngân hàng",
    "description": "Kẻ gian gửi tin nhắn mạo danh ngân hàng cảnh báo tài khoản của bạn sẽ bị khóa hoặc tạm ngưng dịch vụ do nghi ngờ gian lận. Kèm theo đó là một đường link giả mạo yêu cầu bạn đăng nhập để xác thực thông tin.",
    "example": "[Vietcombank] Tai khoan cua quy khach da bi khoa tam thoi. Vui long truy cap https://vcb-online.vip de xac thuc lai thong tin va mo khoa.",
    "category": "bank"
  },
  {
    "id": "bank-2",
    "name": "Thông báo nâng cấp ứng dụng ngân hàng",
    "description": "Tin nhắn giả mạo yêu cầu người dùng nâng cấp ứng dụng SmartBanking để tiếp tục sử dụng dịch vụ hoặc nhận ưu đãi mới. Link đính kèm thường tải xuống file APK độc hại chứa mã độc.",
    "example": "BIDV: Ung dung SmartBanking cua ban da loi thoi. Tai ung dung moi nhat de nhan uu dai 50k tai https://bidv-smartbanking.apk-app.com",
    "category": "bank"
  },
  {
    "id": "bank-3",
    "name": "Phát hiện giao dịch bất thường",
    "description": "Kẻ gian dọa bạn vừa bị trừ một số tiền lớn. Nếu không phải bạn thực hiện, chúng yêu cầu bấm vào link để hủy giao dịch và hoàn tiền.",
    "example": "Techcombank: TK cua ban vua bi tru 15,000,000 VND. Neu khong phai ban giao dich, vui long truy cap https://techcombank-refund.net de huy.",
    "category": "bank"
  },
  {
    "id": "police-1",
    "name": "Phạt nguội vi phạm giao thông",
    "description": "Tin nhắn mạo danh CSGT thông báo bạn có biên lai phạt nguội chưa nộp. Bạn được yêu cầu bấm vào link để xem chi tiết lỗi vi phạm và nộp phạt.",
    "example": "CUC CSGT: Phat nguoi! Xe cua ban vi pham giao thong vao ngay 10/10. De xem bien ban va nop phat, truy cap: https://phatnguoivn.com/tra-cuu",
    "category": "police"
  },
  {
    "id": "police-2",
    "name": "Triệu tập vì liên quan đến ma túy/rửa tiền",
    "description": "Đối tượng xưng là công an, điều tra viên nhắn tin dọa bạn liên quan đến một đường dây ma túy hoặc rửa tiền xuyên quốc gia, yêu cầu hợp tác điều tra qua mạng.",
    "example": "BO CONG AN: Ong/ba hien dang lien quan den duong day rua tien qua bien gioi. Yeu cau truy cap web https://bocongan-dientu.net de khai bao thanh khan.",
    "category": "police"
  },
  {
    "id": "police-3",
    "name": "Yêu cầu cài đặt VNeID giả mạo",
    "description": "Kẻ gian yêu cầu tải và cài đặt ứng dụng định danh điện tử VNeID giả mạo để tích hợp giấy tờ. Ứng dụng này sẽ cấp quyền điều khiển điện thoại cho kẻ gian.",
    "example": "CONG AN QUAN: Yeu cau cong dan cap nhat app VNeID muc do 2 de tich hop giay phep lai xe. Tai app moi tai link: https://vneid-dichvucong.apk",
    "category": "police"
  },
  {
    "id": "prize-1",
    "name": "Trúng iPhone đời mới",
    "description": "Thông báo bạn là khách hàng may mắn trúng thưởng iPhone 15/16 Pro Max. Yêu cầu chuyển khoản một số tiền nhỏ gọi là 'phí làm hồ sơ' hoặc 'phí vận chuyển' để nhận quà.",
    "example": "CHUC MUNG! Ban da trung thuong 1 Iphone 16 Pro Max tu chuong trinh tri an. Vui long chuyen khoan 500k phi nhan thuong vao STK 01234567 de chung toi gui qua.",
    "category": "prize"
  },
  {
    "id": "prize-2",
    "name": "Quà tặng tri ân khách hàng từ sàn TMĐT",
    "description": "Tin nhắn giả mạo Shopee/Lazada thông báo tặng phiếu mua hàng trị giá lớn hoặc phần quà đặc biệt. Yêu cầu cung cấp thông tin cá nhân hoặc bấm vào link giả mạo.",
    "example": "SHOPEE: Tri an khach hang VIP! Tang ban Voucher 2 trieu dong. Nhan vao link de luu ma: https://shopee-tri-an.net",
    "category": "prize"
  },
  {
    "id": "prize-3",
    "name": "Trúng giải sổ xố/quay số may mắn",
    "description": "Gửi tin nhắn trúng thưởng tiền mặt hàng trăm triệu đồng từ một sự kiện ảo hoặc mạng xã hội. Thường yêu cầu truy cập website lạ và điền thông tin ngân hàng để nhận tiền.",
    "example": "[ZALO] Chuc mung tai khoan cua ban da quay trung Giai Nhat tri gia 100 trieu dong. Nhan vao https://zalo-nhanthuong.com de lam thu tuc.",
    "category": "prize"
  },
  {
    "id": "delivery-1",
    "name": "Giao hàng thất bại, yêu cầu nộp phí",
    "description": "Giả mạo nhân viên bưu điện hoặc shipper báo rằng có bưu phẩm bị kẹt ở hải quan hoặc không thể giao do sai địa chỉ. Yêu cầu thanh toán thêm phí qua link.",
    "example": "GIAOHANG: Kien hang cua ban khong the giao thanh cong do sai thong tin. Vui long cap nhat va tra phi 20k tai https://ghn-redelivery.com",
    "category": "delivery"
  },
  {
    "id": "delivery-2",
    "name": "Giả shipper đòi chuyển khoản trước",
    "description": "Nhắn tin qua Zalo hoặc SMS giả danh shipper đang giao đơn, yêu cầu chuyển khoản tiền COD trước vì đang để hàng ở bốt bảo vệ hoặc không tiện gặp.",
    "example": "Em shipper day a. Don hang 350k em de o bao ve roi. Anh/chi CK qua STK nay cho em nhe: 99912345 Bank ABC.",
    "category": "delivery"
  },
  {
    "id": "delivery-3",
    "name": "Đơn hàng giá trị cao từ nước ngoài",
    "description": "Thông báo có bưu kiện giá trị lớn từ nước ngoài gửi về. Yêu cầu nộp tiền thuế hải quan vào tài khoản cá nhân để được thông quan.",
    "example": "HAI QUAN: Ban co 1 kien hang tu My tri gia 5.000 USD dang bi tam giu. Can nop the thue 2.000.000d de thong quan. Chi tiet LH Zalo: 0987654321",
    "category": "delivery"
  },
  {
    "id": "job-1",
    "name": "Tuyển dụng việc nhẹ lương cao",
    "description": "Mới gọi làm việc bán thời gian tại nhà, xem video TikTok/YouTube kiếm tiền. Cần chuyển tiền ứng trước làm nhiệm vụ rồi bị chiếm đoạt.",
    "example": "TUYEN DUNG: Tim nguoi xem video Tiktok/Youtube tai nha. Luong 500k-1trieu/ngay. Khong can kinh nghiem. Ket ban Zalo 01234567 de lam ngay.",
    "category": "job"
  },
  {
    "id": "job-2",
    "name": "Cộng tác viên thanh toán hộ đơn hàng",
    "description": "Tuyển cộng tác viên chốt đơn ảo cho các sàn thương mại điện tử để tăng tương tác. Hứa hẹn hoàn tiền gốc và hoa hồng 10-20%. Những đơn đầu nhỏ lẻ được trả đủ, đến đơn lớn thì viện cớ lỗi hệ thống và bắt đóng thêm tiền.",
    "example": "Shopee tuyen CTV chot don ao. Chuyen khoan tien don hang duoc hoan lai + 20% hoa hong. Lam luon tren dien thoai. LH Zalo 0999888777",
    "category": "job"
  },
  {
    "id": "bank-4",
    "name": "Chuyển khoản nhầm để ép vay nặng lãi",
    "description": "Kẻ gian chuyển một số tiền nhỏ vào tài khoản của bạn với nội dung gây hiểu nhầm (ví dụ: chuyển khoản vay). Sau đó, một đối tượng khác sẽ gọi điện, nhắn tin đòi nợ với lãi suất cắt cổ, đe dọa nếu không trả.",
    "example": "[Ngân hàng] Giao dịch nhận +5,000,000 VND từ TK 102938475. ND: Nguyễn Văn A chuyển tiền vay tháng 6.",
    "category": "bank"
  },
  {
    "id": "bank-5",
    "name": "Hỗ trợ rút tiền mặt qua thẻ tín dụng trực tuyến",
    "description": "Các bài đăng hoặc tin nhắn quảng cáo hỗ trợ rút tiền mặt từ thẻ tín dụng với phí cực thấp, không cần hồ sơ. Kẻ gian sẽ yêu cầu quét mã QR hoặc cung cấp thông tin thẻ (số thẻ, ngày hết hạn, mã CVV) để rút tiền hộ nhưng thực tế là đánh cắp thông tin thẻ.",
    "example": "Dich vu rut tien mat tu the tin dung an toan, bao mat, phi chi 1.2%. Nhan tien mat ngay qua Zalo hoac tai khoan ngan hang. LH: 0901.xxx.xxx",
    "category": "bank"
  },
  {
    "id": "police-4",
    "name": "Cảnh báo khóa thuê bao/sim điện thoại",
    "description": "Đối tượng mạo danh Cục Viễn thông hoặc nhà mạng nhắn tin/gọi điện thông báo thuê bao điện thoại của bạn sắp bị khóa do chưa chuẩn hóa thông tin hoặc liên quan đến vụ án phát tán tin rác. Yêu cầu truy cập link lạ hoặc làm theo hướng dẫn để tránh bị khóa sim.",
    "example": "[CUC VIEN THONG] Thue bao cua quy khach chua duoc chuan hoa thong tin va se bi tam dung hoat dung sau 2h. Vui long cap nhat tai: https://cucvienthong-chuanhoa.net",
    "category": "police"
  },
  {
    "id": "police-5",
    "name": "Cập nhật dữ liệu dân cư/sổ hộ khẩu điện tử",
    "description": "Mạo danh công an cấp xã/phường liên hệ yêu cầu người dân cập nhật thông tin hộ tịch, sổ hộ khẩu điện tử hoặc đồng bộ thẻ bảo hiểm xã hội qua ứng dụng dịch vụ công. Kẻ gian gửi link tải ứng dụng giả mạo dạng file cài đặt (.apk) nhằm chiếm đoạt quyền điều khiển điện thoại.",
    "example": "Cong an Phuong thong bao: So ho khau giay da het gia tri. Vui long tai app dich vu cong de khai bao thong tin so ho khau dien tu tai: http://dichvucong-gov.apk",
    "category": "police"
  },
  {
    "id": "prize-4",
    "name": "Mừng sinh nhật/kỷ niệm thương hiệu lớn để tặng quà",
    "description": "Tin nhắn hoặc bài viết giả mạo các nhãn hàng lớn như Coca-Cola, Samsung, Heineken... tặng quà miễn phí hoặc phiếu mua hàng lớn nhân dịp kỷ niệm. Người tham gia phải làm khảo sát, chia sẻ link cho bạn bè và điền thông tin cá nhân hoặc đóng phí ship để nhận quà.",
    "example": "Kỷ niệm 100 năm thành lập Coca-Cola! Bạn được nhận 1 thùng nước ngọt miễn phí và phiếu mua hàng 1.000.000đ. Nhận quà ngay tại: https://cocacola-100years.club",
    "category": "prize"
  },
  {
    "id": "prize-5",
    "name": "Trúng thẻ cào điện thoại qua mạng xã hội",
    "description": "Nhắn tin thông báo trúng thẻ cào điện thoại mệnh giá cao (200k, 500k) do may mắn trúng thưởng khi tương tác, thả tim bài viết trên mạng xã hội. Đường link đính kèm yêu cầu nhập thông tin tài khoản mạng xã hội để nhận mã thẻ, thực chất để hack tài khoản.",
    "example": "Chuc mung ban da nhan duoc the cao Viettel 500.000d tu chuong trinh may man cua Fanpage. Nhan ma the tai day: http://nhanthecao-viettel.com/free",
    "category": "prize"
  },
  {
    "id": "delivery-4",
    "name": "Đơn hàng tri ân 0 đồng nhưng thu phí ship cao",
    "description": "Kẻ gian giả danh các sàn thương mại điện tử gửi tặng bạn món quà tri ân ngẫu nhiên với giá trị đơn hàng là 0 đồng. Tuy nhiên, khi shipper đến giao hàng, bạn được yêu cầu thanh toán khoản phí vận chuyển (phí ship) rất cao (từ 50k đến vài trăm nghìn) cho một món quà vô giá trị.",
    "example": "GIAOHANG: Ban co don hang 0d (Qua tri an tu Lazada) dang duoc giao. Phi van chuyen thu ho la 99.000d. Vui long de y dien thoai nhan hang.",
    "category": "delivery"
  },
  {
    "id": "delivery-5",
    "name": "Hàng xách tay/quà gửi từ nước ngoài bị giữ tại sân bay",
    "description": "Đối tượng mạo danh nhân viên hải quan hoặc hãng vận chuyển quốc tế báo rằng bạn có bưu kiện giá trị lớn gửi từ nước ngoài đang bị tạm giữ do phát hiện vi phạm quy định, hàng cấm hoặc thiếu thuế. Yêu cầu chuyển khoản tiền phạt, tiền bảo lãnh hoặc tiền thuế vào tài khoản cá nhân để được thông quan.",
    "example": "HAI QUAN TAN SON NHAT: Kien hang so VN-98721 gui cho ban tu Anh Quoc dang bi tam giu do thieu khai bao thue. Can dong thue 3.500.000d vao STK 102938475 de duoc giai toa.",
    "category": "delivery"
  },
  {
    "id": "job-3",
    "name": "Tuyển cộng tác viên đọc sách/thu âm truyện tại nhà",
    "description": "Đăng tin tuyển dụng CTV đọc sách, thu âm giọng đọc truyện, lồng tiếng tại nhà với mức thù lao hấp dẫn. Ban đầu kẻ gian yêu cầu nộp 'tiền bảo đặt cọc sách' hoặc 'phí kiểm tra giọng đọc', hứa hẹn sẽ hoàn lại sau đơn hàng đầu tiên nhưng sau đó chặn liên lạc.",
    "example": "[TUYEN DUNG CTV] Can 15 ban doc truyen truyen cam tai nha, luong 200k/chuong. Khong can len cong ty. Dang ky lam thu giong qua Zalo: 0868.xxx.xxx",
    "category": "job"
  },
  {
    "id": "job-4",
    "name": "Làm nhiệm vụ đánh giá Google Maps/địa điểm du lịch",
    "description": "Dụ dỗ người dùng tham gia làm cộng tác viên đánh giá 5 sao cho các khách sạn, địa điểm du lịch trên Google Maps để nhận hoa hồng 20.000đ - 50.000đ/lần. Sau vài nhiệm vụ miễn phí đầu tiên có trả tiền thật, kẻ gian sẽ yêu cầu chuyển tiền làm 'nhiệm vụ nâng cấp' với số tiền lớn hơn rồi khóa tài khoản.",
    "example": "Tuyển CTV đánh giá địa điểm Google Maps kiếm tiền online. Chỉ cần bấm thích và đánh giá 5 sao nhận ngay 50k/nhiệm vụ. Liên hệ Telegram: @danhgia_googlemaps",
    "category": "job"
  },
  {
    "id": "bank-6",
    "name": "Khóa tài khoản do giao dịch đáng ngờ (Dạng 2)",
    "description": "Đối tượng gửi tin nhắn SMS giả mạo hoặc gọi điện xưng là nhân viên ngân hàng để thông báo về dịch vụ \"Khóa tài khoản do giao dịch đáng ngờ (Dạng 2)\". Yêu cầu nạn nhân bấm vào link để cung cấp OTP hoặc đăng nhập thông tin thẻ.",
    "example": "[Cảnh báo] Dịch vụ Khóa tài khoản do giao dịch đáng ngờ (Dạng 2) đang được xử lý. Để hoàn tất hoặc hủy bỏ, vui lòng truy cập trang liên kết: http://ebank-service-verify.com",
    "category": "bank"
  },
  {
    "id": "police-6",
    "name": "Cảnh báo hành vi phát tán tin nhắn rác (Dạng 2)",
    "description": "Kẻ gian giả danh cơ quan hành chính nhà nước hoặc cảnh sát khu vực thông báo về thủ tục \"Cảnh báo hành vi phát tán tin nhắn rác (Dạng 2)\". Yêu cầu người dân cài đặt phần mềm độc hại qua file apk hoặc chuyển khoản.",
    "example": "Cong An Quan thong bao: Yeu cau cong dan lam thu tuc Cảnh báo hành vi phát tán tin nhắn rác (Dạng 2) ngay tai nha qua ung dung he thong: http://dichvucong-dan.apk",
    "category": "police"
  },
  {
    "id": "prize-6",
    "name": "Vòng quay may mắn trúng xe máy điện (Dạng 2)",
    "description": "Thông báo từ trang mạng xã hội hoặc số lạ gửi tin nhắn trúng giải thưởng lớn \"Vòng quay may mắn trúng xe máy điện (Dạng 2)\". Mục đích dẫn dụ nạn nhân vào website giả mạo nhập mật khẩu MXH hoặc chuyển khoản trước phí nhận thưởng.",
    "example": "CHUC MUNG! Ban da may man trung thuong phan qua Vòng quay may mắn trúng xe máy điện (Dạng 2). Vui long truy cap lien ket de dang ky nhan thuong mien phi: http://quatang-trian.vip",
    "category": "prize"
  },
  {
    "id": "delivery-6",
    "name": "Đơn hàng gửi từ hải quan sân bay quốc tế (Dạng 2)",
    "description": "Mạo danh đơn vị vận chuyển (ViettelPost, GHN, GHTK) báo thông tin về bưu kiện của bạn gặp lỗi liên quan đến \"Đơn hàng gửi từ hải quan sân bay quốc tế (Dạng 2)\". Yêu cầu đóng phí phát sinh hoặc cung cấp thông tin tài khoản qua link lạ.",
    "example": "GHTK thong bao: Kien hang gap truc trac do Đơn hàng gửi từ hải quan sân bay quốc tế (Dạng 2). Ban can thanh toan bo sung chi phi 30.000d de duoc giao lai tai: http://ghtk-tracking.net",
    "category": "delivery"
  },
  {
    "id": "job-6",
    "name": "Tuyển CTV dịch thuật tài liệu tại nhà (Dạng 2)",
    "description": "Tuyển dụng bán thời gian online liên quan đến \"Tuyển CTV dịch thuật tài liệu tại nhà (Dạng 2)\", hứa hẹn thu nhập cao. Nạn nhân ban đầu nhận được tiền hoa hồng nhỏ, sau đó bị dụ nạp tiền cọc lớn làm nhiệm vụ và bị chiếm đoạt.",
    "example": "TUYEN CTV: Tuyen nhan vien tham gia Tuyển CTV dịch thuật tài liệu tại nhà (Dạng 2) tai nha, luong 300k - 800k/ngay. Moi lua tuoi deu lam duoc. Ket ban Zalo: 0899.xxx.xxx",
    "category": "job"
  },
  {
    "id": "bank-7",
    "name": "Hoàn phí dịch vụ quản lý thẻ (Dạng 3)",
    "description": "Đối tượng gửi tin nhắn SMS giả mạo hoặc gọi điện xưng là nhân viên ngân hàng để thông báo về dịch vụ \"Hoàn phí dịch vụ quản lý thẻ (Dạng 3)\". Yêu cầu nạn nhân bấm vào link để cung cấp OTP hoặc đăng nhập thông tin thẻ.",
    "example": "[Cảnh báo] Dịch vụ Hoàn phí dịch vụ quản lý thẻ (Dạng 3) đang được xử lý. Để hoàn tất hoặc hủy bỏ, vui lòng truy cập trang liên kết: http://ebank-service-verify.com",
    "category": "bank"
  },
  {
    "id": "police-7",
    "name": "Yêu cầu giải trình tài sản nghi vấn (Dạng 3)",
    "description": "Kẻ gian giả danh cơ quan hành chính nhà nước hoặc cảnh sát khu vực thông báo về thủ tục \"Yêu cầu giải trình tài sản nghi vấn (Dạng 3)\". Yêu cầu người dân cài đặt phần mềm độc hại qua file apk hoặc chuyển khoản.",
    "example": "Cong An Quan thong bao: Yeu cau cong dan lam thu tuc Yêu cầu giải trình tài sản nghi vấn (Dạng 3) ngay tai nha qua ung dung he thong: http://dichvucong-dan.apk",
    "category": "police"
  },
  {
    "id": "prize-7",
    "name": "Quà tặng tri ân khách hàng thân thiết (Dạng 3)",
    "description": "Thông báo từ trang mạng xã hội hoặc số lạ gửi tin nhắn trúng giải thưởng lớn \"Quà tặng tri ân khách hàng thân thiết (Dạng 3)\". Mục đích dẫn dụ nạn nhân vào website giả mạo nhập mật khẩu MXH hoặc chuyển khoản trước phí nhận thưởng.",
    "example": "CHUC MUNG! Ban da may man trung thuong phan qua Quà tặng tri ân khách hàng thân thiết (Dạng 3). Vui long truy cap lien ket de dang ky nhan thuong mien phi: http://quatang-trian.vip",
    "category": "prize"
  },
  {
    "id": "delivery-7",
    "name": "Kiện hàng bị hoàn trả do ghi sai địa chỉ (Dạng 3)",
    "description": "Mạo danh đơn vị vận chuyển (ViettelPost, GHN, GHTK) báo thông tin về bưu kiện của bạn gặp lỗi liên quan đến \"Kiện hàng bị hoàn trả do ghi sai địa chỉ (Dạng 3)\". Yêu cầu đóng phí phát sinh hoặc cung cấp thông tin tài khoản qua link lạ.",
    "example": "GHTK thong bao: Kien hang gap truc trac do Kiện hàng bị hoàn trả do ghi sai địa chỉ (Dạng 3). Ban can thanh toan bo sung chi phi 30.000d de duoc giao lai tai: http://ghtk-tracking.net",
    "category": "delivery"
  },
  {
    "id": "job-7",
    "name": "Làm nhiệm vụ tăng lượt theo dõi kênh YouTube (Dạng 3)",
    "description": "Tuyển dụng bán thời gian online liên quan đến \"Làm nhiệm vụ tăng lượt theo dõi kênh YouTube (Dạng 3)\", hứa hẹn thu nhập cao. Nạn nhân ban đầu nhận được tiền hoa hồng nhỏ, sau đó bị dụ nạp tiền cọc lớn làm nhiệm vụ và bị chiếm đoạt.",
    "example": "TUYEN CTV: Tuyen nhan vien tham gia Làm nhiệm vụ tăng lượt theo dõi kênh YouTube (Dạng 3) tai nha, luong 300k - 800k/ngay. Moi lua tuoi deu lam duoc. Ket ban Zalo: 0899.xxx.xxx",
    "category": "job"
  },
  {
    "id": "bank-8",
    "name": "Nâng cấp gói tài khoản ưu tiên (Dạng 4)",
    "description": "Đối tượng gửi tin nhắn SMS giả mạo hoặc gọi điện xưng là nhân viên ngân hàng để thông báo về dịch vụ \"Nâng cấp gói tài khoản ưu tiên (Dạng 4)\". Yêu cầu nạn nhân bấm vào link để cung cấp OTP hoặc đăng nhập thông tin thẻ.",
    "example": "[Cảnh báo] Dịch vụ Nâng cấp gói tài khoản ưu tiên (Dạng 4) đang được xử lý. Để hoàn tất hoặc hủy bỏ, vui lòng truy cập trang liên kết: http://ebank-service-verify.com",
    "category": "bank"
  },
  {
    "id": "police-8",
    "name": "Hỗ trợ đồng bộ định danh mức độ 2 từ xa (Dạng 4)",
    "description": "Kẻ gian giả danh cơ quan hành chính nhà nước hoặc cảnh sát khu vực thông báo về thủ tục \"Hỗ trợ đồng bộ định danh mức độ 2 từ xa (Dạng 4)\". Yêu cầu người dân cài đặt phần mềm độc hại qua file apk hoặc chuyển khoản.",
    "example": "Cong An Quan thong bao: Yeu cau cong dan lam thu tuc Hỗ trợ đồng bộ định danh mức độ 2 từ xa (Dạng 4) ngay tai nha qua ung dung he thong: http://dichvucong-dan.apk",
    "category": "police"
  },
  {
    "id": "prize-8",
    "name": "Nhận gói quà sức khỏe miễn phí (Dạng 4)",
    "description": "Thông báo từ trang mạng xã hội hoặc số lạ gửi tin nhắn trúng giải thưởng lớn \"Nhận gói quà sức khỏe miễn phí (Dạng 4)\". Mục đích dẫn dụ nạn nhân vào website giả mạo nhập mật khẩu MXH hoặc chuyển khoản trước phí nhận thưởng.",
    "example": "CHUC MUNG! Ban da may man trung thuong phan qua Nhận gói quà sức khỏe miễn phí (Dạng 4). Vui long truy cap lien ket de dang ky nhan thuong mien phi: http://quatang-trian.vip",
    "category": "prize"
  },
  {
    "id": "delivery-8",
    "name": "Đóng phí bảo hiểm hàng hóa dễ vỡ (Dạng 4)",
    "description": "Mạo danh đơn vị vận chuyển (ViettelPost, GHN, GHTK) báo thông tin về bưu kiện của bạn gặp lỗi liên quan đến \"Đóng phí bảo hiểm hàng hóa dễ vỡ (Dạng 4)\". Yêu cầu đóng phí phát sinh hoặc cung cấp thông tin tài khoản qua link lạ.",
    "example": "GHTK thong bao: Kien hang gap truc trac do Đóng phí bảo hiểm hàng hóa dễ vỡ (Dạng 4). Ban can thanh toan bo sung chi phi 30.000d de duoc giao lai tai: http://ghtk-tracking.net",
    "category": "delivery"
  },
  {
    "id": "job-8",
    "name": "Tuyển nhân viên nhập liệu/gõ capcha kiếm tiền (Dạng 4)",
    "description": "Tuyển dụng bán thời gian online liên quan đến \"Tuyển nhân viên nhập liệu/gõ capcha kiếm tiền (Dạng 4)\", hứa hẹn thu nhập cao. Nạn nhân ban đầu nhận được tiền hoa hồng nhỏ, sau đó bị dụ nạp tiền cọc lớn làm nhiệm vụ và bị chiếm đoạt.",
    "example": "TUYEN CTV: Tuyen nhan vien tham gia Tuyển nhân viên nhập liệu/gõ capcha kiếm tiền (Dạng 4) tai nha, luong 300k - 800k/ngay. Moi lua tuoi deu lam duoc. Ket ban Zalo: 0899.xxx.xxx",
    "category": "job"
  },
  {
    "id": "bank-9",
    "name": "Cấp lại hạn mức tín dụng tăng thêm (Dạng 5)",
    "description": "Đối tượng gửi tin nhắn SMS giả mạo hoặc gọi điện xưng là nhân viên ngân hàng để thông báo về dịch vụ \"Cấp lại hạn mức tín dụng tăng thêm (Dạng 5)\". Yêu cầu nạn nhân bấm vào link để cung cấp OTP hoặc đăng nhập thông tin thẻ.",
    "example": "[Cảnh báo] Dịch vụ Cấp lại hạn mức tín dụng tăng thêm (Dạng 5) đang được xử lý. Để hoàn tất hoặc hủy bỏ, vui lòng truy cập trang liên kết: http://ebank-service-verify.com",
    "category": "bank"
  },
  {
    "id": "police-9",
    "name": "Cập nhật mã số thuế cá nhân điện tử (Dạng 5)",
    "description": "Kẻ gian giả danh cơ quan hành chính nhà nước hoặc cảnh sát khu vực thông báo về thủ tục \"Cập nhật mã số thuế cá nhân điện tử (Dạng 5)\". Yêu cầu người dân cài đặt phần mềm độc hại qua file apk hoặc chuyển khoản.",
    "example": "Cong An Quan thong bao: Yeu cau cong dan lam thu tuc Cập nhật mã số thuế cá nhân điện tử (Dạng 5) ngay tai nha qua ung dung he thong: http://dichvucong-dan.apk",
    "category": "police"
  },
  {
    "id": "prize-9",
    "name": "Trúng thưởng nhân dịp khai trương chi nhánh (Dạng 5)",
    "description": "Thông báo từ trang mạng xã hội hoặc số lạ gửi tin nhắn trúng giải thưởng lớn \"Trúng thưởng nhân dịp khai trương chi nhánh (Dạng 5)\". Mục đích dẫn dụ nạn nhân vào website giả mạo nhập mật khẩu MXH hoặc chuyển khoản trước phí nhận thưởng.",
    "example": "CHUC MUNG! Ban da may man trung thuong phan qua Trúng thưởng nhân dịp khai trương chi nhánh (Dạng 5). Vui long truy cap lien ket de dang ky nhan thuong mien phi: http://quatang-trian.vip",
    "category": "prize"
  },
  {
    "id": "delivery-9",
    "name": "Đơn giao hỏa tốc cần đặt cọc trước (Dạng 5)",
    "description": "Mạo danh đơn vị vận chuyển (ViettelPost, GHN, GHTK) báo thông tin về bưu kiện của bạn gặp lỗi liên quan đến \"Đơn giao hỏa tốc cần đặt cọc trước (Dạng 5)\". Yêu cầu đóng phí phát sinh hoặc cung cấp thông tin tài khoản qua link lạ.",
    "example": "GHTK thong bao: Kien hang gap truc trac do Đơn giao hỏa tốc cần đặt cọc trước (Dạng 5). Ban can thanh toan bo sung chi phi 30.000d de duoc giao lai tai: http://ghtk-tracking.net",
    "category": "delivery"
  },
  {
    "id": "job-9",
    "name": "Cộng tác viên lồng tiếng quảng cáo (Dạng 5)",
    "description": "Tuyển dụng bán thời gian online liên quan đến \"Cộng tác viên lồng tiếng quảng cáo (Dạng 5)\", hứa hẹn thu nhập cao. Nạn nhân ban đầu nhận được tiền hoa hồng nhỏ, sau đó bị dụ nạp tiền cọc lớn làm nhiệm vụ và bị chiếm đoạt.",
    "example": "TUYEN CTV: Tuyen nhan vien tham gia Cộng tác viên lồng tiếng quảng cáo (Dạng 5) tai nha, luong 300k - 800k/ngay. Moi lua tuoi deu lam duoc. Ket ban Zalo: 0899.xxx.xxx",
    "category": "job"
  },
  {
    "id": "bank-10",
    "name": "Xác nhận thay đổi số điện thoại đăng ký (Dạng 6)",
    "description": "Đối tượng gửi tin nhắn SMS giả mạo hoặc gọi điện xưng là nhân viên ngân hàng để thông báo về dịch vụ \"Xác nhận thay đổi số điện thoại đăng ký (Dạng 6)\". Yêu cầu nạn nhân bấm vào link để cung cấp OTP hoặc đăng nhập thông tin thẻ.",
    "example": "[Cảnh báo] Dịch vụ Xác nhận thay đổi số điện thoại đăng ký (Dạng 6) đang được xử lý. Để hoàn tất hoặc hủy bỏ, vui lòng truy cập trang liên kết: http://ebank-service-verify.com",
    "category": "bank"
  },
  {
    "id": "police-10",
    "name": "Thông báo vi phạm trật tự đô thị (Dạng 6)",
    "description": "Kẻ gian giả danh cơ quan hành chính nhà nước hoặc cảnh sát khu vực thông báo về thủ tục \"Thông báo vi phạm trật tự đô thị (Dạng 6)\". Yêu cầu người dân cài đặt phần mềm độc hại qua file apk hoặc chuyển khoản.",
    "example": "Cong An Quan thong bao: Yeu cau cong dan lam thu tuc Thông báo vi phạm trật tự đô thị (Dạng 6) ngay tai nha qua ung dung he thong: http://dichvucong-dan.apk",
    "category": "police"
  },
  {
    "id": "prize-10",
    "name": "Quà tặng tri ân ngày quốc tế phụ nữ (Dạng 6)",
    "description": "Thông báo từ trang mạng xã hội hoặc số lạ gửi tin nhắn trúng giải thưởng lớn \"Quà tặng tri ân ngày quốc tế phụ nữ (Dạng 6)\". Mục đích dẫn dụ nạn nhân vào website giả mạo nhập mật khẩu MXH hoặc chuyển khoản trước phí nhận thưởng.",
    "example": "CHUC MUNG! Ban da may man trung thuong phan qua Quà tặng tri ân ngày quốc tế phụ nữ (Dạng 6). Vui long truy cap lien ket de dang ky nhan thuong mien phi: http://quatang-trian.vip",
    "category": "prize"
  },
  {
    "id": "delivery-10",
    "name": "Shipper giao nhầm địa chỉ đòi tiền cọc (Dạng 6)",
    "description": "Mạo danh đơn vị vận chuyển (ViettelPost, GHN, GHTK) báo thông tin về bưu kiện của bạn gặp lỗi liên quan đến \"Shipper giao nhầm địa chỉ đòi tiền cọc (Dạng 6)\". Yêu cầu đóng phí phát sinh hoặc cung cấp thông tin tài khoản qua link lạ.",
    "example": "GHTK thong bao: Kien hang gap truc trac do Shipper giao nhầm địa chỉ đòi tiền cọc (Dạng 6). Ban can thanh toan bo sung chi phi 30.000d de duoc giao lai tai: http://ghtk-tracking.net",
    "category": "delivery"
  },
  {
    "id": "job-10",
    "name": "Tuyển mẫu ảnh nhí chụp hình thời trang (Dạng 6)",
    "description": "Tuyển dụng bán thời gian online liên quan đến \"Tuyển mẫu ảnh nhí chụp hình thời trang (Dạng 6)\", hứa hẹn thu nhập cao. Nạn nhân ban đầu nhận được tiền hoa hồng nhỏ, sau đó bị dụ nạp tiền cọc lớn làm nhiệm vụ và bị chiếm đoạt.",
    "example": "TUYEN CTV: Tuyen nhan vien tham gia Tuyển mẫu ảnh nhí chụp hình thời trang (Dạng 6) tai nha, luong 300k - 800k/ngay. Moi lua tuoi deu lam duoc. Ket ban Zalo: 0899.xxx.xxx",
    "category": "job"
  },
  {
    "id": "bank-11",
    "name": "Hoàn tiền giao dịch thẻ bị lỗi (Dạng 7)",
    "description": "Đối tượng gửi tin nhắn SMS giả mạo hoặc gọi điện xưng là nhân viên ngân hàng để thông báo về dịch vụ \"Hoàn tiền giao dịch thẻ bị lỗi (Dạng 7)\". Yêu cầu nạn nhân bấm vào link để cung cấp OTP hoặc đăng nhập thông tin thẻ.",
    "example": "[Cảnh báo] Dịch vụ Hoàn tiền giao dịch thẻ bị lỗi (Dạng 7) đang được xử lý. Để hoàn tất hoặc hủy bỏ, vui lòng truy cập trang liên kết: http://ebank-service-verify.com",
    "category": "bank"
  },
  {
    "id": "police-11",
    "name": "Mạo danh viện kiểm sát nhân dân tối cao (Dạng 7)",
    "description": "Kẻ gian giả danh cơ quan hành chính nhà nước hoặc cảnh sát khu vực thông báo về thủ tục \"Mạo danh viện kiểm sát nhân dân tối cao (Dạng 7)\". Yêu cầu người dân cài đặt phần mềm độc hại qua file apk hoặc chuyển khoản.",
    "example": "Cong An Quan thong bao: Yeu cau cong dan lam thu tuc Mạo danh viện kiểm sát nhân dân tối cao (Dạng 7) ngay tai nha qua ung dung he thong: http://dichvucong-dan.apk",
    "category": "police"
  },
  {
    "id": "prize-11",
    "name": "Nhận lì xì may mắn đầu năm mới (Dạng 7)",
    "description": "Thông báo từ trang mạng xã hội hoặc số lạ gửi tin nhắn trúng giải thưởng lớn \"Nhận lì xì may mắn đầu năm mới (Dạng 7)\". Mục đích dẫn dụ nạn nhân vào website giả mạo nhập mật khẩu MXH hoặc chuyển khoản trước phí nhận thưởng.",
    "example": "CHUC MUNG! Ban da may man trung thuong phan qua Nhận lì xì may mắn đầu năm mới (Dạng 7). Vui long truy cap lien ket de dang ky nhan thuong mien phi: http://quatang-trian.vip",
    "category": "prize"
  },
  {
    "id": "delivery-11",
    "name": "Hỗ trợ thay đổi số điện thoại nhận bưu phẩm (Dạng 7)",
    "description": "Mạo danh đơn vị vận chuyển (ViettelPost, GHN, GHTK) báo thông tin về bưu kiện của bạn gặp lỗi liên quan đến \"Hỗ trợ thay đổi số điện thoại nhận bưu phẩm (Dạng 7)\". Yêu cầu đóng phí phát sinh hoặc cung cấp thông tin tài khoản qua link lạ.",
    "example": "GHTK thong bao: Kien hang gap truc trac do Hỗ trợ thay đổi số điện thoại nhận bưu phẩm (Dạng 7). Ban can thanh toan bo sung chi phi 30.000d de duoc giao lai tai: http://ghtk-tracking.net",
    "category": "delivery"
  },
  {
    "id": "job-11",
    "name": "Làm nhiệm vụ thả tim video trên TikTok (Dạng 7)",
    "description": "Tuyển dụng bán thời gian online liên quan đến \"Làm nhiệm vụ thả tim video trên TikTok (Dạng 7)\", hứa hẹn thu nhập cao. Nạn nhân ban đầu nhận được tiền hoa hồng nhỏ, sau đó bị dụ nạp tiền cọc lớn làm nhiệm vụ và bị chiếm đoạt.",
    "example": "TUYEN CTV: Tuyen nhan vien tham gia Làm nhiệm vụ thả tim video trên TikTok (Dạng 7) tai nha, luong 300k - 800k/ngay. Moi lua tuoi deu lam duoc. Ket ban Zalo: 0899.xxx.xxx",
    "category": "job"
  },
  {
    "id": "bank-12",
    "name": "Cảnh báo trừ phí duy trì dịch vụ hàng tháng (Dạng 8)",
    "description": "Đối tượng gửi tin nhắn SMS giả mạo hoặc gọi điện xưng là nhân viên ngân hàng để thông báo về dịch vụ \"Cảnh báo trừ phí duy trì dịch vụ hàng tháng (Dạng 8)\". Yêu cầu nạn nhân bấm vào link để cung cấp OTP hoặc đăng nhập thông tin thẻ.",
    "example": "[Cảnh báo] Dịch vụ Cảnh báo trừ phí duy trì dịch vụ hàng tháng (Dạng 8) đang được xử lý. Để hoàn tất hoặc hủy bỏ, vui lòng truy cập trang liên kết: http://ebank-service-verify.com",
    "category": "bank"
  },
  {
    "id": "police-12",
    "name": "Yêu cầu kê khai bảo hiểm y tế điện tử (Dạng 8)",
    "description": "Kẻ gian giả danh cơ quan hành chính nhà nước hoặc cảnh sát khu vực thông báo về thủ tục \"Yêu cầu kê khai bảo hiểm y tế điện tử (Dạng 8)\". Yêu cầu người dân cài đặt phần mềm độc hại qua file apk hoặc chuyển khoản.",
    "example": "Cong An Quan thong bao: Yeu cau cong dan lam thu tuc Yêu cầu kê khai bảo hiểm y tế điện tử (Dạng 8) ngay tai nha qua ung dung he thong: http://dichvucong-dan.apk",
    "category": "police"
  },
  {
    "id": "prize-12",
    "name": "Trúng thưởng từ chương trình xem livestream (Dạng 8)",
    "description": "Thông báo từ trang mạng xã hội hoặc số lạ gửi tin nhắn trúng giải thưởng lớn \"Trúng thưởng từ chương trình xem livestream (Dạng 8)\". Mục đích dẫn dụ nạn nhân vào website giả mạo nhập mật khẩu MXH hoặc chuyển khoản trước phí nhận thưởng.",
    "example": "CHUC MUNG! Ban da may man trung thuong phan qua Trúng thưởng từ chương trình xem livestream (Dạng 8). Vui long truy cap lien ket de dang ky nhan thuong mien phi: http://quatang-trian.vip",
    "category": "prize"
  },
  {
    "id": "delivery-12",
    "name": "Yêu cầu trả phí lưu kho quá hạn (Dạng 8)",
    "description": "Mạo danh đơn vị vận chuyển (ViettelPost, GHN, GHTK) báo thông tin về bưu kiện của bạn gặp lỗi liên quan đến \"Yêu cầu trả phí lưu kho quá hạn (Dạng 8)\". Yêu cầu đóng phí phát sinh hoặc cung cấp thông tin tài khoản qua link lạ.",
    "example": "GHTK thong bao: Kien hang gap truc trac do Yêu cầu trả phí lưu kho quá hạn (Dạng 8). Ban can thanh toan bo sung chi phi 30.000d de duoc giao lai tai: http://ghtk-tracking.net",
    "category": "delivery"
  },
  {
    "id": "job-12",
    "name": "Tuyển CTV viết bài đánh giá sản phẩm (Dạng 8)",
    "description": "Tuyển dụng bán thời gian online liên quan đến \"Tuyển CTV viết bài đánh giá sản phẩm (Dạng 8)\", hứa hẹn thu nhập cao. Nạn nhân ban đầu nhận được tiền hoa hồng nhỏ, sau đó bị dụ nạp tiền cọc lớn làm nhiệm vụ và bị chiếm đoạt.",
    "example": "TUYEN CTV: Tuyen nhan vien tham gia Tuyển CTV viết bài đánh giá sản phẩm (Dạng 8) tai nha, luong 300k - 800k/ngay. Moi lua tuoi deu lam duoc. Ket ban Zalo: 0899.xxx.xxx",
    "category": "job"
  },
  {
    "id": "bank-13",
    "name": "Đăng ký chương trình nhận hoàn tiền chi tiêu (Dạng 9)",
    "description": "Đối tượng gửi tin nhắn SMS giả mạo hoặc gọi điện xưng là nhân viên ngân hàng để thông báo về dịch vụ \"Đăng ký chương trình nhận hoàn tiền chi tiêu (Dạng 9)\". Yêu cầu nạn nhân bấm vào link để cung cấp OTP hoặc đăng nhập thông tin thẻ.",
    "example": "[Cảnh báo] Dịch vụ Đăng ký chương trình nhận hoàn tiền chi tiêu (Dạng 9) đang được xử lý. Để hoàn tất hoặc hủy bỏ, vui lòng truy cập trang liên kết: http://ebank-service-verify.com",
    "category": "bank"
  },
  {
    "id": "police-13",
    "name": "Tống tiền bằng hình ảnh cắt ghép nhạy cảm (Dạng 9)",
    "description": "Kẻ gian giả danh cơ quan hành chính nhà nước hoặc cảnh sát khu vực thông báo về thủ tục \"Tống tiền bằng hình ảnh cắt ghép nhạy cảm (Dạng 9)\". Yêu cầu người dân cài đặt phần mềm độc hại qua file apk hoặc chuyển khoản.",
    "example": "Cong An Quan thong bao: Yeu cau cong dan lam thu tuc Tống tiền bằng hình ảnh cắt ghép nhạy cảm (Dạng 9) ngay tai nha qua ung dung he thong: http://dichvucong-dan.apk",
    "category": "police"
  },
  {
    "id": "prize-13",
    "name": "Quà tặng dùng thử sản phẩm công nghệ mới (Dạng 9)",
    "description": "Thông báo từ trang mạng xã hội hoặc số lạ gửi tin nhắn trúng giải thưởng lớn \"Quà tặng dùng thử sản phẩm công nghệ mới (Dạng 9)\". Mục đích dẫn dụ nạn nhân vào website giả mạo nhập mật khẩu MXH hoặc chuyển khoản trước phí nhận thưởng.",
    "example": "CHUC MUNG! Ban da may man trung thuong phan qua Quà tặng dùng thử sản phẩm công nghệ mới (Dạng 9). Vui long truy cap lien ket de dang ky nhan thuong mien phi: http://quatang-trian.vip",
    "category": "prize"
  },
  {
    "id": "delivery-13",
    "name": "Đơn hàng hoàn trả bị kẹt ở bưu cục (Dạng 9)",
    "description": "Mạo danh đơn vị vận chuyển (ViettelPost, GHN, GHTK) báo thông tin về bưu kiện của bạn gặp lỗi liên quan đến \"Đơn hàng hoàn trả bị kẹt ở bưu cục (Dạng 9)\". Yêu cầu đóng phí phát sinh hoặc cung cấp thông tin tài khoản qua link lạ.",
    "example": "GHTK thong bao: Kien hang gap truc trac do Đơn hàng hoàn trả bị kẹt ở bưu cục (Dạng 9). Ban can thanh toan bo sung chi phi 30.000d de duoc giao lai tai: http://ghtk-tracking.net",
    "category": "delivery"
  },
  {
    "id": "job-13",
    "name": "Làm nhiệm vụ đăng bài trên hội nhóm Facebook (Dạng 9)",
    "description": "Tuyển dụng bán thời gian online liên quan đến \"Làm nhiệm vụ đăng bài trên hội nhóm Facebook (Dạng 9)\", hứa hẹn thu nhập cao. Nạn nhân ban đầu nhận được tiền hoa hồng nhỏ, sau đó bị dụ nạp tiền cọc lớn làm nhiệm vụ và bị chiếm đoạt.",
    "example": "TUYEN CTV: Tuyen nhan vien tham gia Làm nhiệm vụ đăng bài trên hội nhóm Facebook (Dạng 9) tai nha, luong 300k - 800k/ngay. Moi lua tuoi deu lam duoc. Ket ban Zalo: 0899.xxx.xxx",
    "category": "job"
  },
  {
    "id": "bank-14",
    "name": "Xác thực sinh trắc học bắt buộc (Dạng 10)",
    "description": "Đối tượng gửi tin nhắn SMS giả mạo hoặc gọi điện xưng là nhân viên ngân hàng để thông báo về dịch vụ \"Xác thực sinh trắc học bắt buộc (Dạng 10)\". Yêu cầu nạn nhân bấm vào link để cung cấp OTP hoặc đăng nhập thông tin thẻ.",
    "example": "[Cảnh báo] Dịch vụ Xác thực sinh trắc học bắt buộc (Dạng 10) đang được xử lý. Để hoàn tất hoặc hủy bỏ, vui lòng truy cập trang liên kết: http://ebank-service-verify.com",
    "category": "bank"
  },
  {
    "id": "police-14",
    "name": "Cảnh báo vi phạm luật an ninh mạng (Dạng 10)",
    "description": "Kẻ gian giả danh cơ quan hành chính nhà nước hoặc cảnh sát khu vực thông báo về thủ tục \"Cảnh báo vi phạm luật an ninh mạng (Dạng 10)\". Yêu cầu người dân cài đặt phần mềm độc hại qua file apk hoặc chuyển khoản.",
    "example": "Cong An Quan thong bao: Yeu cau cong dan lam thu tuc Cảnh báo vi phạm luật an ninh mạng (Dạng 10) ngay tai nha qua ung dung he thong: http://dichvucong-dan.apk",
    "category": "police"
  },
  {
    "id": "prize-14",
    "name": "Tri ân khách hàng sử dụng dịch vụ viễn thông (Dạng 10)",
    "description": "Thông báo từ trang mạng xã hội hoặc số lạ gửi tin nhắn trúng giải thưởng lớn \"Tri ân khách hàng sử dụng dịch vụ viễn thông (Dạng 10)\". Mục đích dẫn dụ nạn nhân vào website giả mạo nhập mật khẩu MXH hoặc chuyển khoản trước phí nhận thưởng.",
    "example": "CHUC MUNG! Ban da may man trung thuong phan qua Tri ân khách hàng sử dụng dịch vụ viễn thông (Dạng 10). Vui long truy cap lien ket de dang ky nhan thuong mien phi: http://quatang-trian.vip",
    "category": "prize"
  },
  {
    "id": "delivery-14",
    "name": "Shipper báo mất đơn yêu cầu đền bù qua ví (Dạng 10)",
    "description": "Mạo danh đơn vị vận chuyển (ViettelPost, GHN, GHTK) báo thông tin về bưu kiện của bạn gặp lỗi liên quan đến \"Shipper báo mất đơn yêu cầu đền bù qua ví (Dạng 10)\". Yêu cầu đóng phí phát sinh hoặc cung cấp thông tin tài khoản qua link lạ.",
    "example": "GHTK thong bao: Kien hang gap truc trac do Shipper báo mất đơn yêu cầu đền bù qua ví (Dạng 10). Ban can thanh toan bo sung chi phi 30.000d de duoc giao lai tai: http://ghtk-tracking.net",
    "category": "delivery"
  },
  {
    "id": "job-14",
    "name": "Tuyển nhân viên trả lời tin nhắn Fanpage (Dạng 10)",
    "description": "Tuyển dụng bán thời gian online liên quan đến \"Tuyển nhân viên trả lời tin nhắn Fanpage (Dạng 10)\", hứa hẹn thu nhập cao. Nạn nhân ban đầu nhận được tiền hoa hồng nhỏ, sau đó bị dụ nạp tiền cọc lớn làm nhiệm vụ và bị chiếm đoạt.",
    "example": "TUYEN CTV: Tuyen nhan vien tham gia Tuyển nhân viên trả lời tin nhắn Fanpage (Dạng 10) tai nha, luong 300k - 800k/ngay. Moi lua tuoi deu lam duoc. Ket ban Zalo: 0899.xxx.xxx",
    "category": "job"
  },
  {
    "id": "bank-15",
    "name": "Liên kết ví điện tử nhận quà khủng (Dạng 11)",
    "description": "Đối tượng gửi tin nhắn SMS giả mạo hoặc gọi điện xưng là nhân viên ngân hàng để thông báo về dịch vụ \"Liên kết ví điện tử nhận quà khủng (Dạng 11)\". Yêu cầu nạn nhân bấm vào link để cung cấp OTP hoặc đăng nhập thông tin thẻ.",
    "example": "[Cảnh báo] Dịch vụ Liên kết ví điện tử nhận quà khủng (Dạng 11) đang được xử lý. Để hoàn tất hoặc hủy bỏ, vui lòng truy cập trang liên kết: http://ebank-service-verify.com",
    "category": "bank"
  },
  {
    "id": "police-15",
    "name": "Thông báo thu hồi giấy chứng nhận quyền sử dụng đất (Dạng 11)",
    "description": "Kẻ gian giả danh cơ quan hành chính nhà nước hoặc cảnh sát khu vực thông báo về thủ tục \"Thông báo thu hồi giấy chứng nhận quyền sử dụng đất (Dạng 11)\". Yêu cầu người dân cài đặt phần mềm độc hại qua file apk hoặc chuyển khoản.",
    "example": "Cong An Quan thong bao: Yeu cau cong dan lam thu tuc Thông báo thu hồi giấy chứng nhận quyền sử dụng đất (Dạng 11) ngay tai nha qua ung dung he thong: http://dichvucong-dan.apk",
    "category": "police"
  },
  {
    "id": "prize-15",
    "name": "Nhận Voucher nghỉ dưỡng 5 sao miễn phí (Dạng 11)",
    "description": "Thông báo từ trang mạng xã hội hoặc số lạ gửi tin nhắn trúng giải thưởng lớn \"Nhận Voucher nghỉ dưỡng 5 sao miễn phí (Dạng 11)\". Mục đích dẫn dụ nạn nhân vào website giả mạo nhập mật khẩu MXH hoặc chuyển khoản trước phí nhận thưởng.",
    "example": "CHUC MUNG! Ban da may man trung thuong phan qua Nhận Voucher nghỉ dưỡng 5 sao miễn phí (Dạng 11). Vui long truy cap lien ket de dang ky nhan thuong mien phi: http://quatang-trian.vip",
    "category": "prize"
  },
  {
    "id": "delivery-15",
    "name": "Hàng gửi tặng kèm hóa đơn phí dịch vụ phụ (Dạng 11)",
    "description": "Mạo danh đơn vị vận chuyển (ViettelPost, GHN, GHTK) báo thông tin về bưu kiện của bạn gặp lỗi liên quan đến \"Hàng gửi tặng kèm hóa đơn phí dịch vụ phụ (Dạng 11)\". Yêu cầu đóng phí phát sinh hoặc cung cấp thông tin tài khoản qua link lạ.",
    "example": "GHTK thong bao: Kien hang gap truc trac do Hàng gửi tặng kèm hóa đơn phí dịch vụ phụ (Dạng 11). Ban can thanh toan bo sung chi phi 30.000d de duoc giao lai tai: http://ghtk-tracking.net",
    "category": "delivery"
  },
  {
    "id": "job-15",
    "name": "Cộng tác viên kiểm thử game di động mới (Dạng 11)",
    "description": "Tuyển dụng bán thời gian online liên quan đến \"Cộng tác viên kiểm thử game di động mới (Dạng 11)\", hứa hẹn thu nhập cao. Nạn nhân ban đầu nhận được tiền hoa hồng nhỏ, sau đó bị dụ nạp tiền cọc lớn làm nhiệm vụ và bị chiếm đoạt.",
    "example": "TUYEN CTV: Tuyen nhan vien tham gia Cộng tác viên kiểm thử game di động mới (Dạng 11) tai nha, luong 300k - 800k/ngay. Moi lua tuoi deu lam duoc. Ket ban Zalo: 0899.xxx.xxx",
    "category": "job"
  },
  {
    "id": "bank-16",
    "name": "Xóa nợ xấu ngân hàng trên hệ thống CIC (Dạng 12)",
    "description": "Đối tượng gửi tin nhắn SMS giả mạo hoặc gọi điện xưng là nhân viên ngân hàng để thông báo về dịch vụ \"Xóa nợ xấu ngân hàng trên hệ thống CIC (Dạng 12)\". Yêu cầu nạn nhân bấm vào link để cung cấp OTP hoặc đăng nhập thông tin thẻ.",
    "example": "[Cảnh báo] Dịch vụ Xóa nợ xấu ngân hàng trên hệ thống CIC (Dạng 12) đang được xử lý. Để hoàn tất hoặc hủy bỏ, vui lòng truy cập trang liên kết: http://ebank-service-verify.com",
    "category": "bank"
  },
  {
    "id": "police-16",
    "name": "Cảnh báo trốn nghĩa vụ quân sự (Dạng 12)",
    "description": "Kẻ gian giả danh cơ quan hành chính nhà nước hoặc cảnh sát khu vực thông báo về thủ tục \"Cảnh báo trốn nghĩa vụ quân sự (Dạng 12)\". Yêu cầu người dân cài đặt phần mềm độc hại qua file apk hoặc chuyển khoản.",
    "example": "Cong An Quan thong bao: Yeu cau cong dan lam thu tuc Cảnh báo trốn nghĩa vụ quân sự (Dạng 12) ngay tai nha qua ung dung he thong: http://dichvucong-dan.apk",
    "category": "police"
  },
  {
    "id": "prize-16",
    "name": "Cào thẻ trúng thưởng tiền mặt trên mạng (Dạng 12)",
    "description": "Thông báo từ trang mạng xã hội hoặc số lạ gửi tin nhắn trúng giải thưởng lớn \"Cào thẻ trúng thưởng tiền mặt trên mạng (Dạng 12)\". Mục đích dẫn dụ nạn nhân vào website giả mạo nhập mật khẩu MXH hoặc chuyển khoản trước phí nhận thưởng.",
    "example": "CHUC MUNG! Ban da may man trung thuong phan qua Cào thẻ trúng thưởng tiền mặt trên mạng (Dạng 12). Vui long truy cap lien ket de dang ky nhan thuong mien phi: http://quatang-trian.vip",
    "category": "prize"
  },
  {
    "id": "delivery-16",
    "name": "Bưu phẩm chuyển phát nhanh yêu cầu quét mã OTP (Dạng 12)",
    "description": "Mạo danh đơn vị vận chuyển (ViettelPost, GHN, GHTK) báo thông tin về bưu kiện của bạn gặp lỗi liên quan đến \"Bưu phẩm chuyển phát nhanh yêu cầu quét mã OTP (Dạng 12)\". Yêu cầu đóng phí phát sinh hoặc cung cấp thông tin tài khoản qua link lạ.",
    "example": "GHTK thong bao: Kien hang gap truc trac do Bưu phẩm chuyển phát nhanh yêu cầu quét mã OTP (Dạng 12). Ban can thanh toan bo sung chi phi 30.000d de duoc giao lai tai: http://ghtk-tracking.net",
    "category": "delivery"
  },
  {
    "id": "job-16",
    "name": "Tuyển người soát lỗi chính tả sách nói (Dạng 12)",
    "description": "Tuyển dụng bán thời gian online liên quan đến \"Tuyển người soát lỗi chính tả sách nói (Dạng 12)\", hứa hẹn thu nhập cao. Nạn nhân ban đầu nhận được tiền hoa hồng nhỏ, sau đó bị dụ nạp tiền cọc lớn làm nhiệm vụ và bị chiếm đoạt.",
    "example": "TUYEN CTV: Tuyen nhan vien tham gia Tuyển người soát lỗi chính tả sách nói (Dạng 12) tai nha, luong 300k - 800k/ngay. Moi lua tuoi deu lam duoc. Ket ban Zalo: 0899.xxx.xxx",
    "category": "job"
  },
  {
    "id": "bank-17",
    "name": "Vay vốn online duyệt nhanh không thế chấp (Dạng 13)",
    "description": "Đối tượng gửi tin nhắn SMS giả mạo hoặc gọi điện xưng là nhân viên ngân hàng để thông báo về dịch vụ \"Vay vốn online duyệt nhanh không thế chấp (Dạng 13)\". Yêu cầu nạn nhân bấm vào link để cung cấp OTP hoặc đăng nhập thông tin thẻ.",
    "example": "[Cảnh báo] Dịch vụ Vay vốn online duyệt nhanh không thế chấp (Dạng 13) đang được xử lý. Để hoàn tất hoặc hủy bỏ, vui lòng truy cập trang liên kết: http://ebank-service-verify.com",
    "category": "bank"
  },
  {
    "id": "police-17",
    "name": "Mạo danh ban tiếp công dân trung ương (Dạng 13)",
    "description": "Kẻ gian giả danh cơ quan hành chính nhà nước hoặc cảnh sát khu vực thông báo về thủ tục \"Mạo danh ban tiếp công dân trung ương (Dạng 13)\". Yêu cầu người dân cài đặt phần mềm độc hại qua file apk hoặc chuyển khoản.",
    "example": "Cong An Quan thong bao: Yeu cau cong dan lam thu tuc Mạo danh ban tiếp công dân trung ương (Dạng 13) ngay tai nha qua ung dung he thong: http://dichvucong-dan.apk",
    "category": "police"
  },
  {
    "id": "prize-17",
    "name": "Trúng quà tặng từ sự kiện thể thao lớn (Dạng 13)",
    "description": "Thông báo từ trang mạng xã hội hoặc số lạ gửi tin nhắn trúng giải thưởng lớn \"Trúng quà tặng từ sự kiện thể thao lớn (Dạng 13)\". Mục đích dẫn dụ nạn nhân vào website giả mạo nhập mật khẩu MXH hoặc chuyển khoản trước phí nhận thưởng.",
    "example": "CHUC MUNG! Ban da may man trung thuong phan qua Trúng quà tặng từ sự kiện thể thao lớn (Dạng 13). Vui long truy cap lien ket de dang ky nhan thuong mien phi: http://quatang-trian.vip",
    "category": "prize"
  },
  {
    "id": "delivery-17",
    "name": "Nhận thay bưu kiện của hàng xóm đòi tiền COD (Dạng 13)",
    "description": "Mạo danh đơn vị vận chuyển (ViettelPost, GHN, GHTK) báo thông tin về bưu kiện của bạn gặp lỗi liên quan đến \"Nhận thay bưu kiện của hàng xóm đòi tiền COD (Dạng 13)\". Yêu cầu đóng phí phát sinh hoặc cung cấp thông tin tài khoản qua link lạ.",
    "example": "GHTK thong bao: Kien hang gap truc trac do Nhận thay bưu kiện của hàng xóm đòi tiền COD (Dạng 13). Ban can thanh toan bo sung chi phi 30.000d de duoc giao lai tai: http://ghtk-tracking.net",
    "category": "delivery"
  },
  {
    "id": "job-17",
    "name": "Làm nhiệm vụ khảo sát nhận thẻ cào (Dạng 13)",
    "description": "Tuyển dụng bán thời gian online liên quan đến \"Làm nhiệm vụ khảo sát nhận thẻ cào (Dạng 13)\", hứa hẹn thu nhập cao. Nạn nhân ban đầu nhận được tiền hoa hồng nhỏ, sau đó bị dụ nạp tiền cọc lớn làm nhiệm vụ và bị chiếm đoạt.",
    "example": "TUYEN CTV: Tuyen nhan vien tham gia Làm nhiệm vụ khảo sát nhận thẻ cào (Dạng 13) tai nha, luong 300k - 800k/ngay. Moi lua tuoi deu lam duoc. Ket ban Zalo: 0899.xxx.xxx",
    "category": "job"
  },
  {
    "id": "bank-18",
    "name": "Nhận tiền kiều hối gửi từ nước ngoài (Dạng 14)",
    "description": "Đối tượng gửi tin nhắn SMS giả mạo hoặc gọi điện xưng là nhân viên ngân hàng để thông báo về dịch vụ \"Nhận tiền kiều hối gửi từ nước ngoài (Dạng 14)\". Yêu cầu nạn nhân bấm vào link để cung cấp OTP hoặc đăng nhập thông tin thẻ.",
    "example": "[Cảnh báo] Dịch vụ Nhận tiền kiều hối gửi từ nước ngoài (Dạng 14) đang được xử lý. Để hoàn tất hoặc hủy bỏ, vui lòng truy cập trang liên kết: http://ebank-service-verify.com",
    "category": "bank"
  },
  {
    "id": "police-18",
    "name": "Điều tra liên quan đến số tài khoản giả mạo (Dạng 14)",
    "description": "Kẻ gian giả danh cơ quan hành chính nhà nước hoặc cảnh sát khu vực thông báo về thủ tục \"Điều tra liên quan đến số tài khoản giả mạo (Dạng 14)\". Yêu cầu người dân cài đặt phần mềm độc hại qua file apk hoặc chuyển khoản.",
    "example": "Cong An Quan thong bao: Yeu cau cong dan lam thu tuc Điều tra liên quan đến số tài khoản giả mạo (Dạng 14) ngay tai nha qua ung dung he thong: http://dichvucong-dan.apk",
    "category": "police"
  },
  {
    "id": "prize-18",
    "name": "Lộc vàng may mắn từ chương trình bốc thăm (Dạng 14)",
    "description": "Thông báo từ trang mạng xã hội hoặc số lạ gửi tin nhắn trúng giải thưởng lớn \"Lộc vàng may mắn từ chương trình bốc thăm (Dạng 14)\". Mục đích dẫn dụ nạn nhân vào website giả mạo nhập mật khẩu MXH hoặc chuyển khoản trước phí nhận thưởng.",
    "example": "CHUC MUNG! Ban da may man trung thuong phan qua Lộc vàng may mắn từ chương trình bốc thăm (Dạng 14). Vui long truy cap lien ket de dang ky nhan thuong mien phi: http://quatang-trian.vip",
    "category": "prize"
  },
  {
    "id": "delivery-18",
    "name": "Giao hàng quà tặng sự kiện thu phí vận chuyển (Dạng 14)",
    "description": "Mạo danh đơn vị vận chuyển (ViettelPost, GHN, GHTK) báo thông tin về bưu kiện của bạn gặp lỗi liên quan đến \"Giao hàng quà tặng sự kiện thu phí vận chuyển (Dạng 14)\". Yêu cầu đóng phí phát sinh hoặc cung cấp thông tin tài khoản qua link lạ.",
    "example": "GHTK thong bao: Kien hang gap truc trac do Giao hàng quà tặng sự kiện thu phí vận chuyển (Dạng 14). Ban can thanh toan bo sung chi phi 30.000d de duoc giao lai tai: http://ghtk-tracking.net",
    "category": "delivery"
  },
  {
    "id": "job-18",
    "name": "Tuyển CTV trực page chốt đơn mỹ phẩm (Dạng 14)",
    "description": "Tuyển dụng bán thời gian online liên quan đến \"Tuyển CTV trực page chốt đơn mỹ phẩm (Dạng 14)\", hứa hẹn thu nhập cao. Nạn nhân ban đầu nhận được tiền hoa hồng nhỏ, sau đó bị dụ nạp tiền cọc lớn làm nhiệm vụ và bị chiếm đoạt.",
    "example": "TUYEN CTV: Tuyen nhan vien tham gia Tuyển CTV trực page chốt đơn mỹ phẩm (Dạng 14) tai nha, luong 300k - 800k/ngay. Moi lua tuoi deu lam duoc. Ket ban Zalo: 0899.xxx.xxx",
    "category": "job"
  },
  {
    "id": "bank-19",
    "name": "Mở tài khoản số đẹp miễn phí phí duy trì (Dạng 15)",
    "description": "Đối tượng gửi tin nhắn SMS giả mạo hoặc gọi điện xưng là nhân viên ngân hàng để thông báo về dịch vụ \"Mở tài khoản số đẹp miễn phí phí duy trì (Dạng 15)\". Yêu cầu nạn nhân bấm vào link để cung cấp OTP hoặc đăng nhập thông tin thẻ.",
    "example": "[Cảnh báo] Dịch vụ Mở tài khoản số đẹp miễn phí phí duy trì (Dạng 15) đang được xử lý. Để hoàn tất hoặc hủy bỏ, vui lòng truy cập trang liên kết: http://ebank-service-verify.com",
    "category": "bank"
  },
  {
    "id": "police-19",
    "name": "Khai báo thông tin hộ tịch thay đổi (Dạng 15)",
    "description": "Kẻ gian giả danh cơ quan hành chính nhà nước hoặc cảnh sát khu vực thông báo về thủ tục \"Khai báo thông tin hộ tịch thay đổi (Dạng 15)\". Yêu cầu người dân cài đặt phần mềm độc hại qua file apk hoặc chuyển khoản.",
    "example": "Cong An Quan thong bao: Yeu cau cong dan lam thu tuc Khai báo thông tin hộ tịch thay đổi (Dạng 15) ngay tai nha qua ung dung he thong: http://dichvucong-dan.apk",
    "category": "police"
  },
  {
    "id": "prize-19",
    "name": "Nhận hoàn tiền 100% hóa đơn mua sắm đầu tiên (Dạng 15)",
    "description": "Thông báo từ trang mạng xã hội hoặc số lạ gửi tin nhắn trúng giải thưởng lớn \"Nhận hoàn tiền 100% hóa đơn mua sắm đầu tiên (Dạng 15)\". Mục đích dẫn dụ nạn nhân vào website giả mạo nhập mật khẩu MXH hoặc chuyển khoản trước phí nhận thưởng.",
    "example": "CHUC MUNG! Ban da may man trung thuong phan qua Nhận hoàn tiền 100% hóa đơn mua sắm đầu tiên (Dạng 15). Vui long truy cap lien ket de dang ky nhan thuong mien phi: http://quatang-trian.vip",
    "category": "prize"
  },
  {
    "id": "delivery-19",
    "name": "Đơn hàng mua sắm quốc tế bị treo tại hải quan (Dạng 15)",
    "description": "Mạo danh đơn vị vận chuyển (ViettelPost, GHN, GHTK) báo thông tin về bưu kiện của bạn gặp lỗi liên quan đến \"Đơn hàng mua sắm quốc tế bị treo tại hải quan (Dạng 15)\". Yêu cầu đóng phí phát sinh hoặc cung cấp thông tin tài khoản qua link lạ.",
    "example": "GHTK thong bao: Kien hang gap truc trac do Đơn hàng mua sắm quốc tế bị treo tại hải quan (Dạng 15). Ban can thanh toan bo sung chi phi 30.000d de duoc giao lai tai: http://ghtk-tracking.net",
    "category": "delivery"
  },
  {
    "id": "job-19",
    "name": "Cộng tác viên chia sẻ liên kết affiliate (Dạng 15)",
    "description": "Tuyển dụng bán thời gian online liên quan đến \"Cộng tác viên chia sẻ liên kết affiliate (Dạng 15)\", hứa hẹn thu nhập cao. Nạn nhân ban đầu nhận được tiền hoa hồng nhỏ, sau đó bị dụ nạp tiền cọc lớn làm nhiệm vụ và bị chiếm đoạt.",
    "example": "TUYEN CTV: Tuyen nhan vien tham gia Cộng tác viên chia sẻ liên kết affiliate (Dạng 15) tai nha, luong 300k - 800k/ngay. Moi lua tuoi deu lam duoc. Ket ban Zalo: 0899.xxx.xxx",
    "category": "job"
  },
  {
    "id": "bank-20",
    "name": "Đăng ký Smart OTP bảo mật cấp độ cao (Dạng 16)",
    "description": "Đối tượng gửi tin nhắn SMS giả mạo hoặc gọi điện xưng là nhân viên ngân hàng để thông báo về dịch vụ \"Đăng ký Smart OTP bảo mật cấp độ cao (Dạng 16)\". Yêu cầu nạn nhân bấm vào link để cung cấp OTP hoặc đăng nhập thông tin thẻ.",
    "example": "[Cảnh báo] Dịch vụ Đăng ký Smart OTP bảo mật cấp độ cao (Dạng 16) đang được xử lý. Để hoàn tất hoặc hủy bỏ, vui lòng truy cập trang liên kết: http://ebank-service-verify.com",
    "category": "bank"
  },
  {
    "id": "police-20",
    "name": "Đăng ký tạm trú tạm vắng online qua link lạ (Dạng 16)",
    "description": "Kẻ gian giả danh cơ quan hành chính nhà nước hoặc cảnh sát khu vực thông báo về thủ tục \"Đăng ký tạm trú tạm vắng online qua link lạ (Dạng 16)\". Yêu cầu người dân cài đặt phần mềm độc hại qua file apk hoặc chuyển khoản.",
    "example": "Cong An Quan thong bao: Yeu cau cong dan lam thu tuc Đăng ký tạm trú tạm vắng online qua link lạ (Dạng 16) ngay tai nha qua ung dung he thong: http://dichvucong-dan.apk",
    "category": "police"
  },
  {
    "id": "prize-20",
    "name": "Tặng thẻ thành viên VIP mua hàng ưu đãi (Dạng 16)",
    "description": "Thông báo từ trang mạng xã hội hoặc số lạ gửi tin nhắn trúng giải thưởng lớn \"Tặng thẻ thành viên VIP mua hàng ưu đãi (Dạng 16)\". Mục đích dẫn dụ nạn nhân vào website giả mạo nhập mật khẩu MXH hoặc chuyển khoản trước phí nhận thưởng.",
    "example": "CHUC MUNG! Ban da may man trung thuong phan qua Tặng thẻ thành viên VIP mua hàng ưu đãi (Dạng 16). Vui long truy cap lien ket de dang ky nhan thuong mien phi: http://quatang-trian.vip",
    "category": "prize"
  },
  {
    "id": "delivery-20",
    "name": "Xác nhận nhận lại hàng ký gửi lưu kho (Dạng 16)",
    "description": "Mạo danh đơn vị vận chuyển (ViettelPost, GHN, GHTK) báo thông tin về bưu kiện của bạn gặp lỗi liên quan đến \"Xác nhận nhận lại hàng ký gửi lưu kho (Dạng 16)\". Yêu cầu đóng phí phát sinh hoặc cung cấp thông tin tài khoản qua link lạ.",
    "example": "GHTK thong bao: Kien hang gap truc trac do Xác nhận nhận lại hàng ký gửi lưu kho (Dạng 16). Ban can thanh toan bo sung chi phi 30.000d de duoc giao lai tai: http://ghtk-tracking.net",
    "category": "delivery"
  },
  {
    "id": "job-20",
    "name": "Tuyển nhân viên hỗ trợ chăm sóc khách hàng tại nhà (Dạng 16)",
    "description": "Tuyển dụng bán thời gian online liên quan đến \"Tuyển nhân viên hỗ trợ chăm sóc khách hàng tại nhà (Dạng 16)\", hứa hẹn thu nhập cao. Nạn nhân ban đầu nhận được tiền hoa hồng nhỏ, sau đó bị dụ nạp tiền cọc lớn làm nhiệm vụ và bị chiếm đoạt.",
    "example": "TUYEN CTV: Tuyen nhan vien tham gia Tuyển nhân viên hỗ trợ chăm sóc khách hàng tại nhà (Dạng 16) tai nha, luong 300k - 800k/ngay. Moi lua tuoi deu lam duoc. Ket ban Zalo: 0899.xxx.xxx",
    "category": "job"
  },
  {
    "id": "bank-21",
    "name": "Thanh toán lãi suất thẻ tín dụng trễ hạn (Dạng 17)",
    "description": "Đối tượng gửi tin nhắn SMS giả mạo hoặc gọi điện xưng là nhân viên ngân hàng để thông báo về dịch vụ \"Thanh toán lãi suất thẻ tín dụng trễ hạn (Dạng 17)\". Yêu cầu nạn nhân bấm vào link để cung cấp OTP hoặc đăng nhập thông tin thẻ.",
    "example": "[Cảnh báo] Dịch vụ Thanh toán lãi suất thẻ tín dụng trễ hạn (Dạng 17) đang được xử lý. Để hoàn tất hoặc hủy bỏ, vui lòng truy cập trang liên kết: http://ebank-service-verify.com",
    "category": "bank"
  }
];
