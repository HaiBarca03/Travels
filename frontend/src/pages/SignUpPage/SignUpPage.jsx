import React, { useState } from 'react'
import './SignUpPage.css'
import { registerUser } from '../../service/userService'
import { useDispatch, useSelector } from 'react-redux'

const SignUpPage = () => {
  const dispatch = useDispatch()
  const { isLoading, error, isRegistered } = useSelector((state) => state.user)
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    addresses: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match')
      return
    }
    dispatch(registerUser(formData))
  }

  return (
    <div className="register">
      <div className="imgRegister">
        <img
          src="https://i.pinimg.com/originals/cd/ae/fb/cdaefbb8ad36db3558130fb42e4a7f0d.png"
          alt="Register Background"
        />
      </div>
      <div className="content__register">
        <form onSubmit={handleSubmit}>
          <div className="header__register">
            <h2>Đăng ký</h2>
          </div>
          {error && <p className="error">{error}</p>}
          <div className="field">
            <input
              id="email"
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="field">
            <input
              id="name"
              type="text"
              placeholder="Tên"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="field">
            <input
              id="phone"
              type="text"
              placeholder="Số điện thoại"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="field">
            <input
              id="addresses"
              type="text"
              placeholder="Địa chỉ"
              name="addresses"
              value={formData.addresses}
              onChange={handleChange}
              required
            />
          </div>
          <div className="field">
            <input
              id="password"
              type="password"
              placeholder="Mật khẩu"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="field">
            <input
              id="confirmPassword"
              type="password"
              placeholder="Xác nhận mật khẩu"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Đang đăng ký...' : 'Đăng ký'}
          </button>
        </form>
        {isRegistered && <p className="success">Đăng ký thành công!</p>}
      </div>
    </div>
  )
}

export default SignUpPage
