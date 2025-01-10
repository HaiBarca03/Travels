import { Col, Row } from 'antd'
import React from 'react'
import './QuickBooking.css'

const QuickBooking = () => {
  return (
    <div className="frame-quick-booking">
      <div className="title-quick-booking">
        <h2>Booking cùng HH Travel</h2>
        <h4>
          Chỉ với 3 bước đơn giản và dễ dàng có ngay trải nghiệm tuyệt vời!
        </h4>
      </div>
      <div className="list-item--quick_booking">
        <Row className="frame_info-quick-booking">
          <Col span={8} className="item-quick-booking">
            <div className="number_quick-booking">1</div>
            <div className="image_quick-booking">
              <img
                src="https://bizweb.dktcdn.net/100/505/645/themes/956063/assets/icon_step_1.png?1728351987196"
                className="item-img-quick-booking"
                alt=""
              />
            </div>
            <div className="title_quick-booking">
              <h3>Tìm nơi muốn đến</h3>
              <h4>
                Bất cứ nơi đâu bạn muốn đến, chúng tôi có tất cả những gì bạn
                cần
              </h4>
            </div>
          </Col>
          <Col span={8} className="item-quick-booking">
            <div className="number_quick-booking">1</div>
            <div className="image_quick-booking">
              <img
                src="https://bizweb.dktcdn.net/100/505/645/themes/956063/assets/icon_step_2.png?1728351987196"
                className="item-img-quick-booking"
                alt=""
              />
            </div>
            <div className="title_quick-booking">
              <h3>Đặt vé</h3>
              <h4>
                HH Travel sẽ hỗ trợ bạn đặt vé trực tiếp nhanh chóng và thuận
                tiện
              </h4>
            </div>
          </Col>
          <Col span={8} className="item-quick-booking">
            <div className="number_quick-booking">1</div>
            <div className="image_quick-booking">
              <img
                src="https://bizweb.dktcdn.net/100/505/645/themes/956063/assets/icon_step_3.png?1728351987196"
                className="item-img-quick-booking"
                alt=""
              />
            </div>
            <div className="title_quick-booking">
              <h3>Thanh toán</h3>
              <h4>
                Hoàn thành bước thanh toán và sẵn sàng cho chuyến đi ngay thôi
              </h4>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default QuickBooking
