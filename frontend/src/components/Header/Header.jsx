import React from 'react'
import { Button, Col, Dropdown, Row, Space } from 'antd';
import './Header.css'
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, LinkedinOutlined, LoginOutlined, FormOutlined, DownOutlined, UserOutlined, ShoppingCartOutlined, LogoutOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../redux/reducer/user/userSlice';

const Header = () => {
    const { isLoading, error, isLoggedIn, user } = useSelector((state) => state.user);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logoutUser());

        localStorage.removeItem('token');
        history.push('/login');
    };
    const handleLogin = () => {
        navigate('/login')
    }
    const handleRegister = () => {
        navigate('/register')
    }
    const naviHome = () => {
        navigate('/')
    }
    const openHotel = () => {
        navigate('/all-hotel')
    }
    const items = [
        {
            label: 'Asia',
            key: '1',
            icon: <UserOutlined />,
        },
        {
            label: 'Europe',
            key: '2',
            icon: <UserOutlined />,
        },
        {
            label: 'America',
            key: '3',
            icon: <UserOutlined />,
            danger: true,
        }
    ];

    const menuProps = {
        items
    };

    return (
        <div className='main_header'>
            <Row className='top_header'>
                <Col span={6}>
                    <ul class="list-inline">
                        <li class="list-inline-item">
                            <a title="(024) 2242 0777" href="tel:+(024) 2242 0777" class="header-info__link">(024) 2242 0777</a>
                        </li>
                        <li class="list-inline-item">
                            <a title="info@mytravel.com" href="mailto:info@webtravel.com" class="header-info__link">info@webtravel.com</a>
                        </li>
                    </ul>
                </Col>
                <Col span={10}>

                </Col>
                <Col span={8}>
                    <Row className='right-item'>
                        <Col span={6} className='social-network'>
                            <ul class="list-inline social-media">
                                <li className="list-inline-item">
                                    <a title="Facebook" href="https://www.facebook.com/" className="">
                                        <FacebookOutlined />
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a title="Twitter" href="https://www.twitter.com/" className="">
                                        <TwitterOutlined />
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a title="Instagram" href="https://www.instagram.com/" className="">
                                        <InstagramOutlined />
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a title="Linkedin" href="https://www.linkedin.com/" className="">
                                        <LinkedinOutlined />
                                    </a>
                                </li>
                            </ul>
                        </Col>
                        {isLoggedIn
                            ? <>
                                <Col span={12} className="info">
                                    <div className='username'>{user.name}</div>
                                    <div onClick={handleLogout} className='logout'>
                                        <LogoutOutlined />
                                        <span>Logout</span>
                                    </div>
                                </Col>
                            </>
                            : <>
                                <Col span={12} className="sign-up-in">
                                    <div onClick={handleLogin} className='login'>
                                        <LoginOutlined />
                                        <span>Login</span>
                                    </div>
                                    <div onClick={handleRegister} className='register'>
                                        <FormOutlined />
                                        <span>Register</span>
                                    </div>
                                </Col>
                            </>
                        }
                        <Col span={6} className="location">
                            <Dropdown menu={menuProps}>
                                <Button>
                                    <Space>
                                        VN
                                        <DownOutlined />
                                    </Space>
                                </Button>
                            </Dropdown>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className='bot_header'>
                <Col className='logo_left' onClick={naviHome} span={10}>
                    <img src='https://png.pngtree.com/png-vector/20230409/ourmid/pngtree-travel-logo-design-template-for-business-and-company-vector-png-image_6696146.png' className='logo' />
                    <span className='navbar-brand__text'>My Travels</span>
                </Col>
                <Col span={10}>
                    <ul class="navbar-nav">
                        <li class="menu-item">
                            <a href="" class="nav-link header-nav-link" onClick={naviHome}>
                                Home
                            </a>
                        </li>
                        <li class="menu-item">
                            <a href="" class="nav-link header-nav-link" onClick={openHotel}>
                                Hotel
                            </a>
                        </li>
                        <li class="menu-item">
                            <a href="" class="nav-link header-nav-link">
                                Tour
                            </a>
                        </li>
                        <li class="menu-item">
                            <a href="" class="nav-link header-nav-link">
                                Activity
                            </a>
                        </li>
                        <li class="menu-item">
                            <a href="" class="nav-link header-nav-link">
                                Rental
                            </a>
                        </li>
                        <li class="menu-item">
                            <a href="" class="nav-link header-nav-link">
                                Car
                            </a>
                        </li>
                        <li class="menu-item">
                            <a href="" class="nav-link header-nav-link">
                                Yacht
                            </a>
                        </li>
                    </ul>
                </Col>
                <Col className='cart_booking' span={4}>
                    <div className='cart'>
                        <ShoppingCartOutlined className='img_cart-item' />
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Header
