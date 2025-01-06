import React, { useState } from 'react'
import { Form, Radio, Collapse } from 'antd'
import './PaymentMethod.css' // Import the CSS file

const { Panel } = Collapse

const PaymentMethod = ({ onMethodChange }) => {
  const [selectedMethod, setSelectedMethod] = useState('')
  const [form] = Form.useForm()

  const handleMethodChange = (e) => {
    setSelectedMethod(e.target.value)
    onMethodChange(e.target.value)
  }

  const renderContent = () => {
    switch (selectedMethod) {
      case 'cash':
        return <p>Thanh toán trực tiếp bằng tiền mặt tại văn phòng.</p>
      case 'bank':
        return (
          <p>
            Chuyển khoản ngân hàng. Vui lòng gửi tiền vào tài khoản của chúng
            tôi và giữ lại biên lai.
          </p>
        )
      case 'zalo_pay':
        return (
          <div>
            <p>
              <strong>Hình thức thanh toán:</strong> ATM/Internet Banking.
            </p>
            <p>
              Hãy đảm bảo rằng bạn đã kích hoạt chức năng thanh toán trực tuyến
              qua ZaloPay.
              <a
                href="https://zalopay.vn"
                target="_blank"
                rel="noopener noreferrer"
              >
                Tìm hiểu thêm
              </a>
            </p>
          </div>
        )
      case 'credit_card':
        return <p>Thanh toán bằng thẻ tín dụng. Hỗ trợ Visa, MasterCard.</p>
      case 'vn_pay':
        return <p>Thanh toán qua VNPAY QR code nhanh chóng và tiện lợi.</p>
      case 'paypal':
        return <p>Thanh toán qua paypal nhanh chóng và tiện lợi.</p>
      case 'momo':
        return (
          <p>Thanh toán qua MoMo. Vui lòng quét mã QR để hoàn tất giao dịch.</p>
        )
      default:
        return null
    }
  }

  return (
    <Form.Item
      label="Các hình thức thanh toán"
      name="paymentMethod"
      rules={[
        { required: true, message: 'Vui lòng chọn phương thức thanh toán' }
      ]}
      className="payment-method-container"
    >
      <Radio.Group
        onChange={handleMethodChange}
        value={selectedMethod}
        className="payment-method-radio-group"
      >
        <Radio value="cash" className="payment-method-radio">
          Tiền mặt
        </Radio>
        <Radio value="bank" className="payment-method-radio">
          Chuyển khoản
        </Radio>
        <Radio value="zalo_pay" className="payment-method-radio">
          Thanh toán bằng ZaloPay
        </Radio>
        <Radio value="credit_card" className="payment-method-radio">
          Thẻ tín dụng
        </Radio>
        <Radio value="vn_pay" className="payment-method-radio">
          Thanh toán VNPAY
        </Radio>
        <Radio value="momo" className="payment-method-radio">
          Thanh toán bằng MoMo
        </Radio>
        <Radio value="paypal" className="payment-method-radio">
          Thanh toán bằng paypal
        </Radio>
      </Radio.Group>
      <Collapse
        activeKey={selectedMethod ? ['1'] : []}
        className="payment-method-collapse"
      >
        <Panel
          header="Chi tiết"
          key="1"
          className="payment-method-collapse-panel"
        >
          {renderContent()}
        </Panel>
      </Collapse>
    </Form.Item>
  )
}

export default PaymentMethod
