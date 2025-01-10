import { Col, Row } from 'antd'
import React from 'react'
import './Why.css'

const Why = () => {
  return (
    <div className="frame_why-book">
      <h2>Vì sao bạn nên chọn HH Travel</h2>
      <div className="list_why-book">
        <Row>
          <Col span={8} className="item_why-book">
            <div className="image_why-book">
              <img
                src="https://bizweb.dktcdn.net/100/505/645/themes/956063/assets/icon_whychoose_1.png?1728351987196"
                className="img_item-why"
                alt=""
              />
            </div>
            <div className="content-why-book">
              <h3>Chất lượng dịch vụ tốt nhất</h3>
              <h4>
                Có nhiều mức giá đa dạng, phù hợp với ngân sách và nhu cầu của
                bạn
              </h4>
            </div>
          </Col>
          <Col span={8} className="item_why-book">
            <div className="image_why-book">
              <img
                src="https://bizweb.dktcdn.net/100/505/645/themes/956063/assets/icon_whychoose_2.png?1728351987196"
                className="img_item-why"
                alt=""
              />
            </div>
            <div className="content-why-book">
              <h3>Chất lượng dịch vụ tốt nhất</h3>
              <h4>
                Có nhiều mức giá đa dạng, phù hợp với ngân sách và nhu cầu của
                bạn
              </h4>
            </div>
          </Col>
          <Col span={8} className="item_why-book">
            <div className="image_why-book">
              <img
                src="https://bizweb.dktcdn.net/100/505/645/themes/956063/assets/icon_whychoose_3.png?1728351987196"
                className="img_item-why"
                alt=""
              />
            </div>
            <div className="content-why-book">
              <h3>Chất lượng dịch vụ tốt nhất</h3>
              <h4>
                Có nhiều mức giá đa dạng, phù hợp với ngân sách và nhu cầu của
                bạn
              </h4>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Why
