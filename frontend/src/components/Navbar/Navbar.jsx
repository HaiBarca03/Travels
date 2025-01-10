import React, { useState } from 'react'
import './Navbar.css'
import { Col, Row } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import SearchHotel from '../Search/SearchHotel/SearchHotel'
import SearchTour from '../Search/SearchTour/SearchTour'
import SearchRestaurant from '../Search/SearchRestaurant/SearchRestaurant'

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('hotel')
  return (
    <>
      <div className="main_navbar">
        <div className="title_text-head">
          <p className="title_banner_f">Du lịch cùng HH travel</p>
          <p className="title_banner_s">
            Vinh hạnh của chúng tôi là đem đến những chuyến đi an toàn và đáng
            nhớ tại những vùng đất mới !!!{' '}
          </p>
        </div>
        <div className="frame_search-nav">
          <div className="content_nav">
            <Row className="list_nav">
              <Col
                span={4}
                className="item_nav"
                onClick={() => setActiveTab('tour')}
              >
                <HomeOutlined
                  className={`icon_nav ${
                    activeTab === 'tour' ? 'active_icon-nav' : ''
                  }`}
                />
                <p className="txt_nav">Điểm đến</p>
              </Col>
              <Col
                span={4}
                className="item_nav"
                onClick={() => setActiveTab('hotel')}
              >
                <HomeOutlined
                  className={`icon_nav ${
                    activeTab === 'hotel' ? 'active_icon-nav' : ''
                  }`}
                />
                <p className="txt_nav">Khách sạn</p>
              </Col>
              <Col
                span={4}
                className="item_nav"
                onClick={() => setActiveTab('restaurant')}
              >
                <HomeOutlined
                  className={`icon_nav ${
                    activeTab === 'restaurant' ? 'active_icon-nav' : ''
                  }`}
                />
                <p className="txt_nav">Nhà hàng</p>
              </Col>
            </Row>
          </div>
          {activeTab === 'hotel' && <SearchHotel />}
          {activeTab === 'tour' && <SearchTour />}
          {activeTab === 'restaurant' && <SearchRestaurant />}
        </div>
      </div>
    </>
  )
}

export default Navbar
