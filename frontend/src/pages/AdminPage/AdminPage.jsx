import React, { useState } from 'react';
import './AdminPage.css';
import { Layout, Menu, Typography } from 'antd';
import { PieChartOutlined, UserOutlined, FileOutlined, BarChartOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import User from '../../components/User/User';
import AdminLocationCpn from '../../components/Location/AdminLocationCpn/AdminLocationCpn';
import AdminRestaurantCpn from '../../components/Restaurant/AdminRestaurantCpn/AdminRestaurantCpn';
import AdminHotelCpn from '../../components/Hotel/AdminHotelCpn/AdminHotelCpn';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const AdminPage = () => {
    const [selectedMenu, setSelectedMenu] = useState('1');
    const { user } = useSelector((state) => state.user);

    const renderContent = () => {
        switch (selectedMenu) {
            case '1':
                return <div>Dashboard Content</div>;
            case '2':
                return <User />;
            case '3':
                return <div>Product Content</div>;
            case '4':
                return <AdminLocationCpn />;
            case '5':
                return <AdminRestaurantCpn />
            case '6':
                return <AdminHotelCpn />;
            case '7':
                return <div>Not Found Content</div>;
            default:
                return <div>Select a menu item</div>;
        }
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider theme="light">
                <div className="logo" style={{ padding: '16px', textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }}>
                    <div className='frame_avt-admin'>
                        <img src={user?.avatar?.url} className='img_admin-page' alt="" />
                    </div>
                    <p className='admin_name'>{user?.name}</p>
                </div>
                <Menu
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    onClick={(e) => setSelectedMenu(e.key)}
                >
                    <Menu.Item key="1" icon={<PieChartOutlined />}>
                        Dashboard
                    </Menu.Item>
                    <Menu.Item key="2" icon={<UserOutlined />}>
                        User
                    </Menu.Item>
                    <Menu.Item key="3" icon={<FileOutlined />}>
                        Product
                    </Menu.Item>
                    <Menu.Item key="4" icon={<BarChartOutlined />}>
                        Location
                    </Menu.Item>
                    <Menu.Item key="5" icon={<FileOutlined />}>
                        Nhà hàng
                    </Menu.Item>
                    <Menu.Item key="6" icon={<FileOutlined />}>
                        Khách sạn
                    </Menu.Item>
                    <Menu.Item key="7" icon={<FileOutlined />}>
                        Not Found
                    </Menu.Item>
                </Menu>
            </Sider>

            <Layout>
                <Header style={{ background: '#fff', padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Title level={4} style={{ margin: 0 }}>
                        Hi, Welcome back
                    </Title>
                    <div>
                        <img src={user.avatar?.url} alt="User" className='user_profile-ad' />
                    </div>
                </Header>

                <Content style={{ margin: '16px' }}>
                    {renderContent()}
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminPage;
