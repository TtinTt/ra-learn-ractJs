import "../css/FooterBot.css";

function FooterBot() {
  return (
    <div class="footer-card">
      <footer>
        <div class="footer">
          <div class="about">
            <div onclick="HomePage()" class="logo-set-small">
              <img
                id="icon-logo"
                // style="width: 30px; height: 30px"
                // src="/imgs/FindYour Logo - 50x50.png"
                alt=""
              />
              <h6>FindYour.com</h6>
            </div>
            <section class="about-p">
              <p>Chúng tôi mang tới những công việc tuyệt vời!</p>
            </section>
          </div>
          <div class="info">
            <h4>Liên kết</h4>
            <nav>
              <ul>
                <li>
                  <a href="">Các câu hỏi thường gặp</a>
                </li>

                <li>
                  <a href="">Câu chuyện của chúng tôi</a>
                </li>
                {/* <li>
                  <a href="">Chính sách đổi trả</a>
                </li> */}
                <li>
                  <a href="">Trang chủ</a>
                </li>
                <li onclick="LoginAdminPage()">
                  <a href="/Admin/LoginAdmin.html">Truy cập quyền quản trị</a>
                </li>
              </ul>
            </nav>
          </div>
          <div class="contact">
            <h4>Liên hệ</h4>
            <ul class="link-list">
              <li>
                <a href="">info@FindYour.com</a>
              </li>
              <li>
                <a href="">www.FindYour.com</a>
              </li>
              <li>
                <a href="">Da Nang City, Vietnam</a>
              </li>
              <li>
                <a href="">+03 3333 333</a>
              </li>
            </ul>
          </div>
          <div class="social">
            <h4>Social</h4>
            <ul class="link">
              <li>
                <i class="fab fa-facebook-f"></i> 22.543 Likes
              </li>
              <li>
                <i class="fab fa-twitter"></i> 12.860 Followers
              </li>
              <li>
                <i class="fab fa-pinterest"></i> 3331 Pins
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default FooterBot;
