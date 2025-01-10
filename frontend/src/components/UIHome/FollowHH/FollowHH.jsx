import { Button, Input } from 'antd'
import React from 'react'
import './FollowHH.css'

const FollowHH = () => {
  return (
    <div className="frame_follow-hh">
      <div className="follow-hh-content">
        <h2>Theo dõi và cập nhật tin tức mới nhất</h2>
        <h4>
          Vinh hạnh của chúng tôi là mang đến cho bạn những chuyến đi đáng nhớ.
          Mang đến cho bạn những chuyến đi đầy cảm hứng. Khám phá những vùng đất
          mới. Tự do khám phá cùng chúng tôi.
        </h4>
        <div className="input_submit-fb">
          <Input
            placeholder="Nhập email của bạn"
            style={{ width: '300px', marginRight: '10px' }}
          />
          <Button className="btn_submit-follow" type="primary">
            Theo dõi
          </Button>
        </div>
      </div>
    </div>
  )
}

export default FollowHH
