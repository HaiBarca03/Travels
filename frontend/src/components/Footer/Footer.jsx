import React from 'react'
import './Footer.css'
import { Row, Col } from 'antd'
import {
  FacebookOutlined,
  TwitterOutlined,
  YoutubeOutlined,
  InstagramOutlined,
  GoogleOutlined
} from '@ant-design/icons'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <Row gutter={[16, 16]}>
          {/* Thông tin liên hệ */}
          <Col xs={24} md={7}>
            <h3 className="footer-title">THÔNG TIN LIÊN HỆ</h3>
            <p>Địa chỉ: Thanh Xuân, Hà Nội</p>
            <p>Email: support@hhtravels.vn</p>
            <p>Hotline: 1900 1900</p>
            <p>Thời gian hỗ trợ: 08:30 - 21:30 các ngày trong tuần</p>
          </Col>

          {/* Hướng dẫn */}
          <Col xs={24} md={5} style={{ paddingLeft: '50px' }}>
            <h3 className="footer-title">HƯỚNG DẪN</h3>
            <ul className="footer-links">
              <li>Trang chủ</li>
              <li>Giới thiệu</li>
              <li>Tour du lịch</li>
              <li>Tin tức</li>
              <li>FAQs</li>
              <li>Liên hệ</li>
            </ul>
          </Col>

          {/* Thông tin cần biết */}
          <Col xs={24} md={6}>
            <h3 className="footer-title">THÔNG TIN CẦN BIẾT</h3>
            <ul className="footer-links">
              <li>Về chúng tôi</li>
              <li>Câu hỏi thường gặp</li>
              <li>Điều kiện, điều khoản</li>
              <li>Quy chế hoạt động</li>
              <li>Liên hệ</li>
            </ul>
          </Col>
          <Col xs={24} md={6}>
            <Row xs={24} md={12} className="footer-connect">
              <h3>KẾT NỐI</h3>
              <div className="footer-icons">
                <FacebookOutlined />
                <YoutubeOutlined />
                <TwitterOutlined />
                <InstagramOutlined />
                <GoogleOutlined />
              </div>
            </Row>

            <Row xs={24} md={12} className="footer-payment">
              <div>
                <h3>TẢI ỨNG DỤNG ND TRAVEL</h3>
                <img
                  src="https://bizweb.dktcdn.net/100/505/645/themes/956063/assets/img-app-store.png?1728351987196"
                  alt="App Store"
                />
                <img
                  src="https://bizweb.dktcdn.net/100/505/645/themes/956063/assets/img-google-play.png?1728351987196"
                  alt="Google Play"
                />
              </div>
            </Row>
          </Col>
        </Row>
      </div>

      {/* Bản quyền */}
      <div className="footer-copyright">
        <p>© Bản quyền thuộc về HH Theme | Cung cấp bởi HH travels</p>
      </div>
    </footer>
  )
}

export default Footer
