import { Card, Row, Col, Typography, List, Image, Rate, Tag } from 'antd'
const { Title, Text, Paragraph } = Typography
import React from 'react'
import './AdminTouristDetail.css'

const AdminTouristDetail = ({ data }) => {
  const touristData = data

  return (
    <Card className="tourist-spot-card">
      <Row gutter={[16, 16]}>
        <Col span={10}>
          <Image
            className="tourist-spot-image"
            width="100%"
            src={touristData.images[0]?.url}
            alt={touristData.name}
          />
        </Col>

        <Col span={14}>
          <Title level={2} className="tourist-spot-title">
            {touristData.name}
          </Title>
          <Text strong className="tourist-spot-label">
            Rating:
            <Rate
              disabled
              defaultValue={touristData.rating}
              className="tourist-spot-rating"
            />
          </Text>
          <div>
            <Text strong className="tourist-spot-label">
              Location:
            </Text>{' '}
            {touristData.location.provinceCity}, {touristData.location.country}
          </div>
          <Paragraph className="tourist-spot-description">
            {touristData.description}
          </Paragraph>
          <div>
            <Text strong className="tourist-spot-label">
              Price:
            </Text>{' '}
            {touristData.price} VND ({touristData.rating})
          </div>
          <Text strong className="tourist-spot-label">
            Activities:
            <List
              className="tourist-spot-activities"
              dataSource={touristData.activities}
              renderItem={(item) => (
                <Tag color="blue" className="tourist-spot-activity-tag">
                  {item}
                </Tag>
              )}
            />
          </Text>
        </Col>
      </Row>
    </Card>
  )
}

export default AdminTouristDetail
