
# Đề bài Hackathon FCT: ScamCheck

## Mục lục

·  Phần 1: Tổng quan bài toán

·  Phần 2: Mô tả bài toán

·  Phần 3: Cấu trúc 5 cấp

·  Phần 4: Tóm tắt danh mục công việc

----------

## Phần 1: Tổng quan bài toán

ScamCheck là một công cụ web giúp người dùng kiểm tra nhanh tin nhắn nghi ngờ lừa đảo qua SMS, Zalo, Messenger và email, đồng thời biết cách xử lý đúng. Sản phẩm hướng đến nhóm người dễ bị tổn thương nhất, đó là người từ 45 tuổi trở lên ít kinh nghiệm số, tức ông bà, bố mẹ và hàng xóm của các em.

Người dùng dán nội dung tin nhắn nghi ngờ vào ứng dụng, và trong vòng 15 giây nhận được ba thông tin: mức độ rủi ro của tin nhắn, các dấu hiệu lừa đảo cụ thể có trong tin, và hướng dẫn nên làm gì tiếp theo. Ở cấp cao hơn, sản phẩm còn đồng hành với người dùng qua ba nhân vật AI phối hợp để phân tích kỹ thuật, giải thích tâm lý và hướng dẫn xử lý khủng hoảng khi người dùng đã lỡ sa vào bẫy.

----------

## Phần 2: Mô tả bài toán

### 2.1. Bối cảnh và vấn đề

Lừa đảo qua tin nhắn ngày càng tinh vi và gây thiệt hại nghiêm trọng cho người dùng Việt Nam.

Quy mô thiệt hại:

Theo báo cáo tổng kết năm 2023 của Cục An toàn thông tin thuộc Bộ Thông tin và Truyền thông, cơ quan này đã tiếp nhận và xử lý hơn 15.900 phản ánh về trang web lừa đảo, tăng hơn 60 phần trăm so với năm 2022. (Nguồn: Cục An toàn thông tin, Báo cáo tổng kết 2023. Cần xác nhận lại số liệu trước khi in tài liệu.)

Ngân hàng Nhà nước Việt Nam ghi nhận thiệt hại từ lừa đảo tài chính qua kênh số lên đến hàng nghìn tỷ đồng mỗi năm, trong đó phần lớn nạn nhân bị tiếp cận qua tin nhắn giả mạo. (Nguồn: Ngân hàng Nhà nước Việt Nam. Cần xác nhận số liệu cụ thể theo năm.)

Bộ Công an ghi nhận lừa đảo trực tuyến là một trong những loại tội phạm tăng trưởng nhanh nhất, với các thủ đoạn phổ biến gồm giả mạo ngân hàng, giả mạo cơ quan công an, giả thông báo trúng thưởng và giả đơn vị giao hàng. (Nguồn: Cục Cảnh sát hình sự, Bộ Công an.)

Gợi ý cho nhóm: Tìm thêm số liệu thực tế từ VnExpress, Tuổi Trẻ, Thanh Niên với từ khoá “lừa đảo trực tuyến thống kê” kèm năm tương ứng để bổ sung vào tài liệu trình diễn của nhóm.

Nhóm người dễ bị tổn thương nhất:

Người từ 45 tuổi trở lên là nạn nhân phổ biến nhất vì ba lý do chính.

Thứ nhất, họ ít kinh nghiệm số nên không quen nhận diện các dấu hiệu kỹ thuật của tin giả như đường dẫn rút gọn, tên miền giả mạo hay lỗi chính tả kiểu máy dịch.

Thứ hai, họ dễ bị khai thác cảm xúc. Các thủ đoạn lừa đảo nhắm đúng vào nỗi sợ hãi như tài khoản bị khoá hoặc vi phạm pháp luật, cũng như lòng ham muốn như trúng thưởng hay hoàn tiền. Sự gấp gáp nhân tạo trong tin nhắn khiến người ta không kịp dừng lại suy nghĩ.

Thứ ba, họ thiếu kênh kiểm chứng nhanh. Khi nhận tin lạ lúc 11 giờ đêm, không có nơi nào để hỏi trong vài phút.

Đây chính xác là ông bà, bố mẹ và hàng xóm của các em, những người gần gũi nhất và cũng là những người cần được bảo vệ nhất.

### 2.2. Đối tượng người dùng

Người dùng chính là người từ 45 tuổi trở lên, ít kinh nghiệm với công nghệ số. Họ thường xuyên nhận tin nhắn lạ qua SMS, Zalo và Messenger nhưng không có công cụ kiểm tra nhanh và đáng tin. Khó khăn của họ là không biết tin nào nên tin, ngại hỏi con cháu vì sợ bị cười, và khi đã lỡ sa bẫy thì không biết làm gì tiếp theo.

Người dùng phụ là chính các em học viên, vừa dùng cho bản thân vừa hướng dẫn và chia sẻ cho người thân trong gia đình.

Mục tiêu trải nghiệm mà sản phẩm cần đạt được:

·  Tốc độ: Trong vòng 30 giây từ khi nhận tin lạ, người dùng đã có ý kiến đáng tin về tin đó.

·  Hiểu biết: Người dùng không chỉ biết tin nguy hiểm hay an toàn mà còn hiểu vì sao, để lần sau có thể tự nhận ra.

·  Cảm xúc: Ứng dụng nói chuyện thân thiện, không hù doạ, không làm người dùng xấu hổ khi đã suýt tin.

### 2.3. Yêu cầu tổng quát của sản phẩm

Người dùng dán nội dung tin nhắn nghi ngờ vào ô nhập liệu, bấm nút Kiểm tra, và trong vòng 15 giây nhận được ba thông tin: mức độ rủi ro, các dấu hiệu lừa đảo cụ thể có trong tin, và hướng dẫn nên làm gì tiếp theo.

Năm yêu cầu chức năng chính:

1.  Nhận đầu vào là văn bản tin nhắn, dán bằng tay hoặc đọc bằng giọng nói qua micro hệ điều hành.

2.  Gọi AI để phân tích và trả về kết quả có cấu trúc gồm mức rủi ro, dấu hiệu và hành động đề xuất.

3.  Hiển thị kết quả rõ ràng, đọc được trên iPhone của người 45 tuổi trở lên với cỡ chữ đủ lớn và độ tương phản cao.

4.  Lưu lịch sử 10 tin gần nhất để xem lại mà không cần gọi AI thêm lần nữa.

5.  Cung cấp hướng dẫn xử lý khủng hoảng khi người dùng cho biết mình đã lỡ sa vào bẫy, ở cấp 5.

### 2.4. Ràng buộc kỹ thuật

Bắt buộc cho mọi nhóm, áp dụng theo đầu ra:

·  Sản phẩm truy cập được qua địa chỉ web công khai, không yêu cầu người dùng cài ứng dụng.

·  Tích hợp ít nhất một giao diện lập trình ứng dụng AI để phân tích nội dung.

·  Không yêu cầu cài đặt phần mềm phía người dùng.

Khuyến nghị về bộ công nghệ, mentor hỗ trợ đầy đủ hai lựa chọn này:

·  HTML kết hợp JavaScript thuần và Tailwind CSS qua mạng phân phối nội dung, không cần bộ khung, triển khai bằng GitHub Pages.

·  Python kết hợp Flask và Jinja2, phù hợp nhóm đã học Python, triển khai bằng Render hoặc Railway ở gói miễn phí.

Nhóm muốn dùng bộ công nghệ ngoài hai lựa chọn trên cần thống nhất với mentor trước ngày [DD/MM/YYYY] để đảm bảo được hỗ trợ kỹ thuật.

Lý do khuyến nghị không dùng bộ khung sẵn có: Khi dùng HTML và JavaScript thuần, nhóm buộc phải hiểu rõ luồng dữ liệu thật giữa trình duyệt và giao diện lập trình ứng dụng. Đây chính là kỹ năng cốt lõi mà AI hỗ trợ tốt nhất. Với bộ khung sẵn có, rất dễ làm được mà không hiểu tại sao chạy được.

Giao diện lập trình ứng dụng AI dùng cho sản phẩm là Gemini của Google. Khoá do mentor cấp cho từng nhóm, nhóm không cần tự đăng ký Google Cloud.

### 2.5. Ngoài phạm vi

Những thứ sau không cần làm trong hackathon này:

·  Xây dựng cơ sở dữ liệu riêng về các vụ lừa đảo vì dùng AI phân tích là đủ.

·  Tích hợp với hệ thống ngân hàng hay cơ quan chức năng.

·  Hỗ trợ đa ngôn ngữ vì chỉ cần tiếng Việt.

·  Đăng nhập hay tài khoản người dùng vì dữ liệu lưu trong trình duyệt là đủ.

·  Phân tích video hoặc cuộc gọi thoại trực tiếp.

### 2.6. Lưu ý pháp lý bắt buộc

Mọi màn hình của ứng dụng, cùng với file giới thiệu dự án và slide trình diễn, đều phải hiện một dòng nói rõ ràng ScamCheck là công cụ giáo dục do nhóm học viên phát triển và đánh giá của ứng dụng không thay thế cảnh báo chính thức từ ngân hàng hoặc cơ quan chức năng. Khi nghi ngờ, người dùng nên gọi tổng đài chính thức của ngân hàng được in trên thẻ.

----------

## Phần 3: Cấu trúc 5 cấp

Nguyên tắc quan trọng: Mỗi cấp là một phiên bản sản phẩm chạy được hoàn chỉnh, không phải một cột mốc nội bộ trừu tượng. Người dùng mở ứng dụng ở bất kỳ cấp nào cũng dùng được. Nhóm đạt cấp 5 là hoàn chỉnh; nhóm chỉ đạt cấp 2 hay 3 vẫn ra được sản phẩm có giá trị thực.

Cách hình dung dễ nhất: tưởng tượng một bác 50 tuổi đem cùng một tin nhắn lừa đảo, dán vào ứng dụng ở mỗi cấp, thì bác sẽ thấy gì.

### 3.0. Bảng tổng hợp nhanh

| Cấp | Tên | Hạn nộp | Tính năng cốt lõi | Nhóm tính năng |
|---|---|---|---|---|
| 1 | Bản thô | $$DD/MM/YYYY$$ | Gọi AI, trả kết quả thô, đưa lên mạng | N1 |
| 2 | Phiên bản tối giản đầy đủ | $$DD/MM/YYYY$$ | Thám tử, thẻ rủi ro, tô vàng, lịch sử | N1 đến N3 |
| 3 | Thêm Cô tâm lý | $$DD/MM/YYYY$$ | Chuỗi hai nhân vật AI, chiều sâu cảm xúc | N1 đến N4 |
| 4 | Hai tính năng mở rộng | $$DD/MM/YYYY$$ | Tích hợp hai trong bốn tính năng mở rộng đã chọn | N1 đến N5 |
| 5 | Thêm Người ứng cứu | $$DD/MM/YYYY$$ | Chuỗi ba nhân vật AI, xử lý khủng hoảng | N1 đến N6 |

----------

### 3.1. Cấp 1: Bản thô

Hạn hoàn thành: Hết ngày khởi động [DD/MM/YYYY].

Mục tiêu kỹ năng: Nhóm chứng minh kết nối được với Gemini và đưa được một trang web lên mạng công khai. Đây là vòng lặp cơ bản nhất: gọi giao diện lập trình ứng dụng, nhận kết quả, hiển thị cho người dùng.

Mô tả sản phẩm ở cấp này: Bác dán tin, bấm Kiểm tra, và sau vài giây AI viết ra một đoạn văn bản kiểu như “Tin này có dấu hiệu lừa đảo vì có yêu cầu mã xác thực và có đường dẫn lạ”. Giao diện còn thô, chưa có thẻ màu, chưa tô vàng. Nhưng ứng dụng đã chạy, đã lên mạng, đã có dòng lưu ý pháp lý ở chân trang.

Yêu cầu đầu ra:

·  Trang web có ô nhập liệu và nút Kiểm tra.

·  Gọi được Gemini và hiển thị kết quả dạng văn bản thô.

·  Dòng lưu ý pháp lý hiện ở mọi màn hình.

·  Sản phẩm đã được triển khai lên GitHub Pages hoặc nền tảng tương đương, có địa chỉ web công khai.

Tiêu chí hoàn thành: Mentor mở địa chỉ web trên iPhone, dán một tin mẫu và thấy kết quả từ AI trong 30 giây. Kiểm tra lịch sử kho mã không tìm thấy khoá giao diện lập trình ứng dụng bị lộ trong bất kỳ lần ghi nhận nào.

Gợi ý kỹ thuật trọng tâm: Gọi giao diện lập trình ứng dụng bằng lệnh fetch với async và await. Lưu khóa trong file config.js đã khai báo trong .gitignore. Tạo file config.example.js không chứa khoá thật để đồng đội biết cần điền gì. Bật GitHub Pages từ phần cài đặt của kho mã, chọn nhánh main và thư mục gốc.

----------

### 3.2. Cấp 2: Phiên bản tối giản đầy đủ

Hạn hoàn thành: Mốc đánh giá giữa kỳ [DD/MM/YYYY].

Mục tiêu kỹ năng: Nhóm hoàn thiện sản phẩm cốt lõi với nhân vật Thám tử, giao diện đầy đủ và trải nghiệm chạy được trên iPhone của người 45 tuổi trở lên. Đây là mức tối thiểu để bảo vệ sản phẩm trước ban giám khảo.

Mô tả sản phẩm ở cấp này: Bác đi qua ba màn hình rõ ràng. Trang chính có ô dán tin và ba nút tin mẫu để thử nhanh mà không phải tự tìm. Màn hình chờ có hiệu ứng lịch sự khi AI đang xử lý. Màn hình kết quả có bốn phần: thẻ màu mức độ rủi ro gồm An toàn, Nghi ngờ hoặc Nguy hiểm; danh sách dấu hiệu lừa đảo kèm đoạn trích tô vàng trong tin gốc; ba việc nên hoặc không nên làm tiếp theo; và trang lịch sử mười tin gần nhất. Bác mở trên iPhone, dùng được trong 30 giây mà không cần ai chỉ.

Yêu cầu đầu ra:

·  Nhân vật Thám tử được thiết kế với hồ sơ rõ ràng: nhiệm vụ phân tích kỹ thuật, giọng khô khan lý tính, kết quả trả về theo định dạng dữ liệu có cấu trúc cố định.

·  Thẻ màu mức độ rủi ro hiện ở vị trí nổi bật.

·  Dấu hiệu lừa đảo kèm đoạn trích nguyên văn từ tin gốc, được tô vàng ngay trong tin.

·  Ba hành động cụ thể người dùng nên hoặc không nên làm.

·  Lịch sử mười tin gần nhất, mở lại được mà không cần gọi AI thêm lần nữa.

·  Cỡ chữ từ 18px trở lên, độ tương phản cao, hiển thị tốt trên Safari iPhone.

Tiêu chí hoàn thành: Thử 15 tin mẫu từ bộ chung ban tổ chức cấp, ít nhất 12 trong 15 tin cho kết luận đúng. Mentor mở trên iPhone thật, dùng được trong 30 giây không cần hướng dẫn. Ứng dụng không gãy khi thử năm trường hợp biên: tin trống, tin quá dài hơn 5.000 ký tự, mất kết nối, AI bị lọc nội dung và AI trả về định dạng lệch.

Gợi ý kỹ thuật trọng tâm: Định nghĩa cấu trúc dữ liệu cố định cho kết quả Thám tử và yêu cầu AI trả về đúng cấu trúc đó. Viết hàm bóc tách dữ liệu chịu lỗi bằng cách bọc trong khối xử lý lỗi kèm giá trị mặc định khi định dạng lệch. Dùng bộ nhớ cục bộ trình duyệt cho lịch sử. Kỹ thuật tô vàng là tìm chuỗi con trong tin gốc và bọc nó trong thẻ đánh dấu.

Ghi chú giám khảo: Nhóm đạt cấp 2 được coi là đã ra sản phẩm thật. Nếu vì lý do nào đó nhóm chỉ dừng ở cấp 2, sản phẩm vẫn có giá trị trình diễn trước ban giám khảo.

----------

### 3.3. Cấp 3: Thêm Cô tâm lý

Hạn hoàn thành: [DD/MM/YYYY].

Mục tiêu kỹ năng: Nhóm thêm chiều sâu cảm xúc vào sản phẩm bằng nhân vật AI thứ hai, buộc phải thiết kế chuỗi gọi AI tuần tự và xử lý lỗi độc lập từng tầng.

Mô tả sản phẩm ở cấp này: Mọi thứ như cấp 2, nhưng khi Thám tử kết luận tin là nghi ngờ hoặc nguy hiểm, dưới phần phân tích kỹ thuật xuất hiện thêm vài câu thân thiện từ Cô tâm lý, chẳng hạn: “Bác à, tin này nhắm vào nỗi sợ tài khoản bị khoá. Khi gặp tin gấp gáp như thế này, hãy dừng lại mười giây và gọi tổng đài ngân hàng được in mặt sau thẻ trước khi làm bất cứ điều gì.” Bác không xấu hổ, bác học được một điều mới.

Yêu cầu đầu ra:

·  Nhân vật Cô tâm lý có hồ sơ riêng: giọng gần gũi, xưng “cô” và gọi người dùng là “bác”, chỉ từ hai đến ba câu, không hù doạ, không lên giọng dạy dỗ.

·  Cô tâm lý chỉ xuất hiện khi Thám tử kết luận tin là nghi ngờ hoặc nguy hiểm.

·  Kết quả hiện ra hai phần riêng biệt rõ ràng: Phân tích kỹ thuật và Hiểu vì sao mình suýt tin.

·  Nếu Cô tâm lý gặp lỗi, kết quả của Thám tử vẫn hiển thị bình thường kèm thông báo lịch sự.

Tiêu chí hoàn thành: Thử với năm tin khác nhau, chuỗi hai nhân vật hoàn thành trong 20 giây và cả hai phần kết quả hiện mạch lạc. Khi cố ý làm Cô tâm lý gãy, kết quả Thám tử vẫn hiển thị kèm dòng “Cô tâm lý đang bận, vui lòng thử lại sau”.

Gợi ý kỹ thuật trọng tâm: Tổ chức chuỗi gọi AI tuần tự, chờ Thám tử xong mới gọi Cô tâm lý. Bọc lỗi độc lập từng tầng để một nhân vật gãy không kéo cả kết quả gãy theo. Điều kiện kích hoạt Cô tâm lý dựa trên mức độ rủi ro mà Thám tử trả về.

----------

### 3.4. Cấp 4: Hai tính năng mở rộng

Hạn hoàn thành: [DD/MM/YYYY].

Mục tiêu kỹ năng: Nhóm tích hợp hai tính năng mở rộng đã chốt từ ngày khởi động vào sản phẩm, tạo phong cách riêng của nhóm mà không làm hỏng luồng chính.

Mô tả sản phẩm ở cấp này: Tuỳ cặp tính năng đã chọn mà sản phẩm mỗi nhóm mang phong cách riêng. Nhóm chọn A và D sẽ có trang thư viện kiểu lừa đảo và thẻ cảnh báo có thể chia sẻ. Nhóm chọn B và C sẽ phân tích đường dẫn web và có chế độ luyện tập.

Yêu cầu đầu ra:

·  Luồng chính từ cấp 3 hoạt động bình thường.

·  Hai tính năng mở rộng đã chọn được tích hợp hoàn chỉnh vào sản phẩm.

·  Người dùng vào phần mở rộng và quay lại luồng chính mà không cần tải lại trang.

Tiêu chí hoàn thành: Mỗi tính năng mở rộng được thử với ba tình huống: thuận lợi, lỗi và biên. Cả ba không làm gãy ứng dụng. File giới thiệu dự án liệt kê hai tính năng đã chọn kèm mô tả ngắn.

Ghi chú giám khảo: Ban giám khảo cho điểm cao hơn cho hai tính năng làm sâu so với hai tính năng làm sơ sài. Xem thang điểm cụ thể trong tài liệu Tiêu chí chấm điểm đính kèm.

----------

### 3.5. Cấp 5: Thêm Người ứng cứu

Hạn hoàn thành: [DD/MM/YYYY].

Mục tiêu kỹ năng: Nhóm thêm nhân vật AI thứ ba, hoàn tất chuỗi ba nhân vật phối hợp và biến sản phẩm từ công cụ phán xét tin nhắn thành công cụ đồng hành xử lý tình huống cho người đã lỡ sa vào bẫy.

Mô tả sản phẩm ở cấp này: Sau phần kết quả phân tích, xuất hiện câu hỏi nhỏ: “Bác đã làm gì rồi?” với bốn lựa chọn. Nếu bác chọn chưa làm gì, ứng dụng khen ngắn và Người ứng cứu không xuất hiện. Nếu bác chọn đã chuyển khoản, Người ứng cứu xuất hiện với giọng bình tĩnh và dứt khoát, đưa ra kịch bản từng bước như gọi tổng đài ngân hàng để khoá giao dịch ngay, gọi đường dây nóng công an, chuẩn bị giấy tờ và những việc cần làm trong 24 giờ tiếp theo. Mỗi bước có kèm câu nói mẫu để bác dùng khi gọi điện.

Yêu cầu đầu ra:

·  Câu hỏi “Bác đã làm gì rồi?” với bốn lựa chọn: chưa làm gì, đã bấm vào đường dẫn, đã chuyển khoản, đã cung cấp mã xác thực.

·  Nhân vật Người ứng cứu có giọng bình tĩnh và dứt khoát, không phân tích, không an ủi, chỉ đưa hành động cụ thể.

·  Bảng số tổng đài chính thống được lưu trong kho mã, Người ứng cứu trích số từ bảng chứ không tự sinh ra.

Tiêu chí hoàn thành: Tính năng hoạt động trên cả Chrome máy tính và Safari iPhone. Thử bốn tình huống, Người ứng cứu đưa kịch bản phù hợp từng tình huống. Đối chiếu mọi số điện thoại trong kết quả với bảng tổng đài đã lưu trong kho mã, không có số nào do AI tự sinh ra.

Gợi ý kỹ thuật trọng tâm: Quản lý trạng thái theo bốn tình huống người dùng chọn. Tách dữ liệu tĩnh quan trọng là bảng tổng đài ra khỏi AI, lưu trong thư mục dữ liệu và nạp từ kho mã. Ràng buộc lời chỉ dẫn để Người ứng cứu chỉ được dùng số trong bảng.

Ghi chú giám khảo: Vì cấp 5 liên quan tới an toàn thực tế, mentor xác nhận lần cuối vào sáng ngày trình diễn bằng cách đọc qua ba kịch bản đầy đủ và xác nhận hướng dẫn của Người ứng cứu là an toàn, dứt khoát và đúng quy trình thật.

----------

### 3.6. Tính năng mở rộng

Ngay trong ngày khởi động, mỗi nhóm chọn hai trong bốn tính năng và báo mentor. Lý do giới hạn ở hai tính năng: một tính năng vượt mong đợi được sáu điểm, còn một tính năng có nhưng sơ sài chỉ được hai điểm. Hai tính năng vượt mong đợi cộng được mười hai điểm, trong khi hai tính năng sơ sài chỉ cộng được bốn điểm. Hãy dồn sức làm sâu thay vì làm cho có.


| Mã | Tên | Người dùng làm được thêm gì | Độ khó | Gợi ý kỹ thuật |
| :--- | :--- | :--- | :--- | :--- |
| A | Thư viện kiểu lừa đảo | Xem danh sách các kiểu lừa đảo phổ biến, lọc theo nhóm như giả ngân hàng hoặc giả công an | Thấp | Trang tĩnh có bộ lọc, dữ liệu tự biên soạn |
| B | Soi đường dẫn và tên miền | Ứng dụng tách đường dẫn web trong tin, cảnh báo tên miền giả mạo trước khi bấm vào | Vừa | Biểu thức chính quy để tách đường dẫn, so khớp ký tự thay thế |
| C | Chế độ luyện tập | Làm mười câu đoán tin lừa hoặc an toàn, được chấm điểm và giải thích sau mỗi câu | Vừa | Quản lý trạng thái bài tập, dữ liệu mười tin đã gán nhãn sẵn |
| D | Thẻ cảnh báo có thể chia sẻ | Tạo ảnh tóm tắt kết quả kèm mã QR để gửi vào nhóm gia đình | Thấp | Canvas API để vẽ ảnh, thư viện tạo mã QR |


Gợi ý chọn cặp:

·  Nhóm muốn tập trung vào giao diện và trải nghiệm người dùng nên chọn A và D vì cả hai độ khó thấp, để có thời gian trau chuốt giao diện.

·  Nhóm muốn đẩy chiều sâu kỹ thuật nên chọn B và C.

----------

## Phần 4: Tóm tắt danh mục công việc

Danh mục công việc đầy đủ gồm từng mục với mức ưu tiên, ước lượng giờ, tiêu chí hoàn thành và gợi ý kỹ thuật được lưu trong tệp đính kèm riêng. Bảng dưới đây tóm tắt bức tranh tổng thể theo từng nhóm tính năng lớn.


### Chi tiết các nhóm tính năng

| Mã | Tên nhóm tính năng | Cấp | Nội dung cốt lõi |
| :--- | :--- | :--- | :--- |
| N1 | Nền tảng và vận hành | 1 | Kho mã, khoá an toàn, hàm gọi Gemini, triển khai lên mạng, dòng pháp lý |
| N2 | Thám tử và phân tích kỹ thuật | 2 | Hồ sơ Thám tử, cấu trúc dữ liệu kết quả, tô vàng trích đoạn, thẻ rủi ro |
| N3 | Trải nghiệm người dùng cốt lõi | 2 | Tin mẫu, kiểm tra đầu vào, màn chờ, xử lý lỗi, lịch sử, hiển thị tốt trên iPhone |
| N4 | Cô tâm lý và chiều sâu cảm xúc | 3 | Hồ sơ Cô tâm lý, chuỗi hai nhân vật, xử lý lỗi độc lập |
| N5 | Hai tính năng mở rộng | 4 | Chọn và tích hợp hai trong bốn tính năng mở rộng |
| N6 | Người ứng cứu và dữ liệu cứu hộ | 5 | Câu hỏi tình huống, bảng tổng đài, hồ sơ Người ứng cứu, kịch bản từng bước |
| N7 | Sẵn sàng trình diễn | Song song từ cấp 2 | Tài liệu, sơ đồ, slide, kịch bản demo, minh chứng AI, video dự phòng |
