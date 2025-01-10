import React, { useEffect, useState } from 'react'
import {
  Button,
  Card,
  Typography,
  Col,
  Row,
  Rate,
  InputNumber,
  DatePicker,
  message,
  Carousel
} from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'
import './TourDetail.css'
import { useNavigate, useNavigation, useParams } from 'react-router-dom'
import { getTourDetail } from '../../service/tourService'
import { useDispatch, useSelector } from 'react-redux'
import Feedback from '../../components/Feedback/Feedback'
import { getFeedBack } from '../../service/feedbackService'
import DealsTour from '../../components/Deals-tour/Deals-tour'

const { Title, Paragraph } = Typography

const TourDetail = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const [participants, setParticipants] = useState(1)
  const [selectedDate, setSelectedDate] = useState(null)
  const { detailTour, loading, error } = useSelector((state) => state.tour)
  //const { dataGetFeedBack } = useSelector((state) => state.feedback)

  useEffect(() => {
    if (id) {
      dispatch(getTourDetail(id))
    }
  }, [id, dispatch])

  // useEffect(() => {
  //   if (id) {
  //     dispatch(getFeedBack({ entity: 'tour', entity_id: id }))
  //   }
  // }, [id, dispatch])
  const tourDetail = detailTour?.tour
  console.log('tourDetail', tourDetail)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!tourDetail) return <div>No tour details found</div>

  const allImages =
    tourDetail?.tour_places?.flatMap((place) =>
      place.images.map((img) => img.url)
    ) || []

  const handelBooking = (id) => {
    if (selectedDate && participants <= tourDetail?.max_participants) {
      navigate('/tour/booking')
    } else {
      message.error(
        'Please select a date and ensure participants are within the limit.'
      )
    }
  }

  return (
    <>
      <div className="tour-detail-page">
        <Row
          className="ctn-tour-dt-page"
          gutter={24}
          style={{ padding: '20px' }}
        >
          <Col span={18}>
            <Carousel autoplay className="tour-carousel">
              {allImages.map((image, index) => (
                <div key={index}>
                  <img
                    src={image}
                    alt={`tour-place-${index}`}
                    className="tour-carousel-image"
                  />
                </div>
              ))}
            </Carousel>
            <Card
              title={tourDetail.name}
              bordered={false}
              className="info_tour-details"
            >
              <p>
                <strong>Ngày khởi hành: </strong>
                {tourDetail?.start_date
                  ? new Date(tourDetail.start_date).toLocaleDateString()
                  : 'N/A'}
              </p>
              <p>
                <strong>Thời gian: </strong>
                {tourDetail?.time}
              </p>
              <p>
                <strong>Nơi xuất phát: </strong>
                {tourDetail?.place_departure}
              </p>
              <p>
                <strong>Giá: </strong>
                {tourDetail?.price?.toLocaleString() || 'N/A'} VND
              </p>
              <p>
                <strong>Hoạt động: </strong>
                {tourDetail?.activities?.map((item) => {
                  return <p key={item}>{item} </p>
                })}
              </p>
            </Card>
            <div className="des_tourist">
              <Title level={4} className="tit_des">
                Điểm nhấn của chương trình
              </Title>
              <Paragraph className="detail_des">
                {tourDetail?.description}
              </Paragraph>
            </div>
            <Card className="tour-tourist-dt">
              <p>Các điểm đến</p>
              {tourDetail?.tour_places?.map((place) => (
                <Card
                  key={place._id}
                  title={place.name}
                  bordered={false}
                  className="tour-place-card"
                  style={{ marginBottom: '10px' }}
                >
                  <p>{place.description}</p>
                </Card>
              ))}
            </Card>
            <Feedback data={{ tour_id: tourDetail._id }} />
          </Col>

          <Col className="right_tour-dt" span={6}>
            <Card title="Đặt tour này" bordered={false}>
              <p>
                <strong>Tên tour: </strong>
                {tourDetail?.name}
              </p>
              <p>
                <strong>Mã tour: </strong>
                {tourDetail?.code}
              </p>
              <p>
                <strong>Số lượng người tham gia: </strong>
                {tourDetail?.max_participants}
              </p>
              <p>
                <strong>Số người tham gia hiện tại: </strong>
                {tourDetail?.current_participants}
              </p>
              <p>
                <strong>Đánh giá: </strong>
                <Rate value={tourDetail?.rating} disabled />
              </p>

              <div style={{ marginBottom: '10px' }}>
                <strong>Số lượng người tham gia: </strong>
                <InputNumber
                  min={1}
                  max={tourDetail?.max_participants}
                  value={participants}
                  onChange={setParticipants}
                />
              </div>

              <div style={{ marginBottom: '10px' }}>
                <strong>Chọn ngày tour: </strong>
                <DatePicker onChange={(date) => setSelectedDate(date)} />
              </div>

              <Button
                type="primary"
                icon={<ShoppingCartOutlined />}
                size="large"
                block
                onClick={() => handelBooking(tourDetail._id)}
                disabled={
                  participants > tourDetail?.max_participants || !selectedDate
                }
              >
                Đặt ngay
              </Button>
            </Card>
          </Col>
        </Row>
      </div>
      <div className="deff-tours">
        <h5>Tour khác dành cho bạn</h5>
        <DealsTour />
      </div>
    </>
  )
}

export default TourDetail
