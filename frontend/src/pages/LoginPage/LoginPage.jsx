import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../service/userService'
import './LoginPage.css'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, error, isLoggedIn, user } = useSelector(
    (state) => state.user
  )
  const [email, setemail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (isLoggedIn) {
      if (user?.role == 'admin') {
        navigate('/admin')
      } else {
        navigate('/')
      }
    }
  }, [isLoggedIn, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(loginUser({ email, password }))
  }

  return (
    <div className="login">
      <div className="imgLogin">
        <img
          src="https://i.pinimg.com/originals/cd/ae/fb/cdaefbb8ad36db3558130fb42e4a7f0d.png"
          alt="Login Background"
        />
      </div>
      <div className="content__login">
        <form onSubmit={handleSubmit}>
          <div className="header__login">
            <h2>Đăng nhập</h2>
          </div>
          {error && <p className="error">{error}</p>}
          <div className="pw">
            <input
              id="pw"
              type="text"
              placeholder="Tên đăng nhập"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
            />
          </div>
          <div className="pw">
            <input
              id="pw"
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <a className="forget" href="#">
            Quên mật khẩu?
          </a>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>
        {isLoggedIn && <p className="success">Đăng nhập thành công!</p>}
      </div>
    </div>
  )
}

export default LoginPage
