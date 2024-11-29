import React from 'react'
import './TouristPage.css'
import { Row, Col, Form, Select, Input, Button } from "antd";
import { useParams } from 'react-router-dom';
import CardTour from '../../components/Tourist/CardTour';
import LocationTourist from '../../components/Tourist/LocationTourist/LocationTourist';
import AllLocationTourist from '../../components/Tourist/AllLocationTourist/AllLocationTourist';
import FilterCpm from '../../components/Filter/FilterCpm';

const TouristPage = () => {
    const { locationId } = useParams();
    console.log('locationId', locationId)
    return (
        <div className='main_tourist'>
            <p className='nav_tourist'>
                <span>Trang chủ</span>
                <span> / </span>
                <span>Du lịch Hà Nội</span>
            </p>
            <h2 className='title_tourist-page'>Du lịch Hà Nội</h2>
            <Row gutter={16} style={{ padding: "20px" }}>
                <Col span={6}>
                    <FilterCpm />
                </Col>
                <Col span={18}>
                    {locationId ?
                        <LocationTourist locationId={locationId} />
                        : <AllLocationTourist />
                    }
                </Col>
            </Row>
        </div>
    )
}

export default TouristPage
