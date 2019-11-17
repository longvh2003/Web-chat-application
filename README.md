
# Web-chat-application

**Nhóm 8:**

**Võ Hồng Long**

**Trần Mạnh Thắng**

**Nguyễn Anh Quân**

**Lê Trung Kiên**

**Vũ Quang Huy**

**Nguyễn Công Khánh**

**Lý Tả Mẩy**

**Đặng Ngọc Tiến**

**TODO:**
Profile, Hiển thị list friend, Inivite, Thông báo.

#

# I.Giới thiệu:

## I.1: Mục đích:

Tài liệu này bao gồm các thông tin về chức năng, người dùng,... của dự án &quot;Web Chat Application&quot;.

## I.2: Đối tượng sử dụng tài liệu:
- **Người quản lí dự án:**  Người quản lý và trả lời cho chất lượng của hệ thống. Người quản lý dự án nên đọc toàn bộ tài liệu để lập kế hoạch và phân công công việc.
- **Nhà phát triển**** :** Dev là người triển khai hệ thống từ thiết kế và tài liệu thành phiên bản có thể chạy được.Dev phải đọc toàn bộ tài liệu để thực hiện đúng hệ thống.
- **Người kiểm tra:** Người kiểm tra nên đọc chi tiết để viết bài kiểm tra đơn vị.

## I.3: Phạm vi sản phẩm:
Toàn cầu, những ai muốn chat với mọi người đều có thể sử dụng.

# II.Chức năng:

|   **Chức năng** |   **Mô tả** |	**Quản trị viên**	|	**Thành viên**	|
| --- | --- | --- | --- |
| **Đăng kí** | Người dùng tạo tài khoản để đăng nhập |  | X |
| **Đăng nhập** | Người dùng đăng nhập để tham gia web chat. | X | X |
| **Tìm kiếm** | Mọi người tìm kiếm bạn bè thông qua từ khóa, sẽ xuất hiện các kết quả trùng khớp nhất. | X | X |
| **Kết bạn online** | Mọi người có thể kết bạn với nhau qua mạng, kể cả khi không biết người đó là ai thông qua việc tìm kiếm tên người đó trên thanh tìm kiếm của trang web. |  | X |
| **Chat** | Mọi người có thể chat với nhau trực tuyến qua mạng.Có thể chat từng đôi một với nhau hoặc có thể chat theo nhóm. | X | X |
| **Tùy chỉnh hồ sơ** | Thể hiện cá tính của người dùng. Mọi người có thể thay đổi: tên, biệt danh, avatar, … |  | X |
| **Thông báo** | Thông báo khi có người gửi lời mời kết bạn, nhắn tin, …. |  | X |
| **Xóa tài khoản** | Xóa tài khoản vi phạm quy tắc của web chat. | X |  |

# III. Các đối tượng sử dụng:
## III.1: Quản trị viên:
Quản trị viên là những người có trách nhiệm quản trị trang web, thực hiện các tác vụ:
•	Cấm nick những người dùng vi phạm quy ước chung.
•	Thêm, sửa, xóa người dùng.
•	Quản lí thông tin người dùng.
## III.2: Thành viên:
Thành viên là những người dùng đã đăng kí.
Thành viên có thể sử dụng các chức năng của trang web như chat,...
Cau truc log-in: https://colorlib.com/wp/template/login-form-v1/

# IV.Demo màn hình chức năng:
## IV.1: Đăng ký:
 ![alt text](https://scontent.xx.fbcdn.net/v/t1.15752-9/75305226_2617785808264557_8660315435100536832_n.png?_nc_cat=110&_nc_oc=AQmOB0PeLs_oYlUzMHmSbKVXuoWc_iO9rj_UOcWiZRHtktNxLN7YN0JKZompwnDXmqM&_nc_ht=scontent.fhan3-1.fna&oh=b2fdb84578be19aadc611a86eb42bffa&oe=5E592DBE&_nc_fr=fhan3c01)
 
## IV.2: Đăng nhập:

 ![login Form](https://user-images.githubusercontent.com/43175311/67635052-197fe980-f8f5-11e9-90cd-5d70eb07a671.png)
 
 
## IV.3,4,5:Tìm kiếm,kết bạn,thông báo:

 ![friend](https://user-images.githubusercontent.com/43175311/67635048-15ec6280-f8f5-11e9-86c9-c2cba7e6a592.png)
 

## IV.6:Chat:

![chat](https://user-images.githubusercontent.com/43175311/67635050-17b62600-f8f5-11e9-8aeb-5c0597f449eb.png)


## IV.7:Tùy chỉnh hồ sơ:

![change info](https://user-images.githubusercontent.com/43175311/67635045-0f5deb00-f8f5-11e9-91d9-ad71bec085ed.png)

 
## IV.8:Xóa Tài khoản vi phạm (admin):

![admin](https://user-images.githubusercontent.com/43175311/67635046-12f17200-f8f5-11e9-847b-8e0a163bfcdf.png)
 
 
## Database design:

![database](https://i.ibb.co/dW2bJS5/Capture.png)

# V.Biểu đồ ca sử dụng:

![main](https://user-images.githubusercontent.com/43175311/67636515-07f20e00-f904-11e9-96c6-0475c7b513df.png)

_Image1: Use case main diagram_

## V.1: Biểu đồ ca sử dụng gói hệ thống:

 ![system](https://user-images.githubusercontent.com/43175311/67636519-0d4f5880-f904-11e9-8470-f70aa271fd17.png)

_Image2: Use case system package diagram_

## V.2: Biểu đồ ca sử dụng gói quản lí:

![management](https://user-images.githubusercontent.com/43175311/67636517-0c1e2b80-f904-11e9-8df8-1b79e489d32f.png)

_Image3: Use case management package diagram_


## V.3: Mô tả mô hình ca sử dụng:

### V.3.1. Các tác nhân:

Hệ thống bao gồm 3 tác nhân: Quản trị viên, thành viên, khách.

#### V.3.1.1. Quản trị viên:

Quản trị viên có trách nhiệm chính là quản lí thành viên.

Các ca sử dụng chính của một quản trị viên là quản lí thành viên và giải quyết báo cáo.

#### V.3.1.2. Thành viên:

Thành viên là một người đã đăng kí và đăng nhập vào hệ thống.

Thành viên có thể có nhiều ca sử dụng như: tìm kiếm, kết bạn, chat, tùy chỉnh thông tin, gửi báo cáo,.v.v.

#### V.3.1.3. Khách:

Khách là bất kì người nào ghé thăm hệ thống. Khách không thể thực hiện bất kì nhiệm vụ nào trong hệ thống nếu chưa đăng kí tài khoản. Sau khi đăng kí tài khoản, khách trở thành thành viên.

### V.3.2.Các ca sử dụng:

Hệ thống gồm có 10 ca sử dụng chính, được chia thành 2 gói: gói hệ thống và gói quản lý.

#### V.3.2.1:Gói hệ thống:

Gói hệ thống bao gồm tất cả các ca sử dụng liên quan đến tương tác giữa tác nhân và hệ thống. Gói hệ thống có 4 ca sử dụng chính:

- Đăng kí.
- Đăng nhập.
- Tìm kiếm
- Kết bạn
- Chat
- Tùy chỉnh thông tin
- Xem thông báo

#### V.3.2.2:Gói quản lí:

Gói quản lí bao gồm tất cả các ca sử dụng liên quan đến việc quản lí. Gói quản lí có 4 ca sử dụng chính:

- Quản lí thành viên.
- Báo cáo tới quản trị viên.
- Giải quyết các báo cáo.
	
