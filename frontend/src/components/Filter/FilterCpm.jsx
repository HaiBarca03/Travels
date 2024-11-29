import React from 'react'
import { Row, Col, Form, Select, Input, Button } from "antd";
const { Option } = Select;

const FilterCpm = () => {
    return (
        <Form layout="vertical">
            <Form.Item label="Ngân sách:">
                <Select>
                    <Option value="below-5">Dưới 5 triệu</Option>
                    <Option value="5-10">Từ 5 - 10 triệu</Option>
                    <Option value="10-20">Từ 10 - 20 triệu</Option>
                    <Option value="above-20">Trên 20 triệu</Option>
                </Select>
            </Form.Item>
            <Form.Item label="Điểm khởi hành:">
                <Select>
                    <Option value="all">Tất cả</Option>
                    <Option value="hcm">TP. Hồ Chí Minh</Option>
                    <Option value="hn">Hà Nội</Option>
                </Select>
            </Form.Item>
            <Form.Item label="Điểm đến:">
                <Select>
                    <Option value="danang">Đà Nẵng</Option>
                    <Option value="hue">Huế</Option>
                    <Option value="phongnha">Phong Nha</Option>
                </Select>
            </Form.Item>
            <Form.Item label="Ngày đi:">
                <Input type='date' placeholder="T7, 23 tháng 11" />
            </Form.Item>
            <Form.Item label="Dòng tour:">
                <Select mode="multiple" placeholder="Chọn dòng tour">
                    <Option value="cao-cap">Cao cấp</Option>
                    <Option value="tieu-chuan">Tiêu chuẩn</Option>
                    <Option value="tiet-kiem">Tiết kiệm</Option>
                    <Option value="gia-tot">Giá tốt</Option>
                </Select>
            </Form.Item>
            <Form.Item label="Phương tiện:">
                <Select>
                    <Option value="xe">Xe</Option>
                    <Option value="may-bay">Máy bay</Option>
                </Select>
            </Form.Item>
            <Button type="primary" block>
                Áp dụng
            </Button>
        </Form>
    )
}

export default FilterCpm
