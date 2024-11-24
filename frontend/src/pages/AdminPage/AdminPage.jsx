import React from 'react';
import './AdminPage.css'
import { Layout, Menu, Row, Col, Card, Typography } from 'antd';
import { PieChartOutlined, UserOutlined, FileOutlined, BarChartOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

const AdminPage = () => {
    const { isLoading, error, isLoggedIn, user } = useSelector((state) => state.user);
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider theme="light">
                <div className="logo" style={{ padding: '16px', textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }}>
                    <div className='frame_avt-admin'>
                        <img src={user.avatar?.url} className='img_admin-page' alt="" />
                    </div>
                    <p className='admin_name'>{user.name}</p>
                </div>
                <Menu defaultSelectedKeys={['1']} mode="inline">
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
                        Blog
                    </Menu.Item>
                    <Menu.Item key="5" icon={<FileOutlined />}>
                        Login
                    </Menu.Item>
                    <Menu.Item key="6" icon={<FileOutlined />}>
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
                    <Row gutter={16}>
                        <Col span={6}>
                            <Card style={{ textAlign: 'center', backgroundColor: '#f0f9ff' }}>
                                <Title level={3}>714k</Title>
                                <Text>Weekly Sales</Text>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card style={{ textAlign: 'center', backgroundColor: '#e7f5ff' }}>
                                <Title level={3}>1.35m</Title>
                                <Text>New Users</Text>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card style={{ textAlign: 'center', backgroundColor: '#fff4e6' }}>
                                <Title level={3}>1.72m</Title>
                                <Text>Item Orders</Text>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card style={{ textAlign: 'center', backgroundColor: '#ffe7e7' }}>
                                <Title level={3}>234</Title>
                                <Text>Bug Reports</Text>
                            </Card>
                        </Col>
                    </Row>

                    <Row gutter={16} style={{ marginTop: '16px' }}>
                        <Col span={16}>
                            <Card>
                                <Title level={5}>Website Visits</Title>
                                <Text>(+43% than last year)</Text>
                                <div style={{ height: '200px', marginTop: '16px', backgroundColor: '#f0f0f0' }}>Bar Chart</div>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card>
                                <Title level={5}>Current Visits</Title>
                                <div style={{ height: '200px', marginTop: '16px', backgroundColor: '#f0f0f0' }}>Pie Chart</div>
                            </Card>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminPage;