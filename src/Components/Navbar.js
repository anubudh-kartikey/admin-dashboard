import React, {useState} from 'react';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined, UsergroupDeleteOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type {MenuProps, MenuTheme} from 'antd';
import {Breadcrumb, Layout, Menu, Switch, theme} from 'antd';

const {Header, Content, Footer, Sider} = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    }
}

const items: MenuItem[] = [
    getItem('Home', '1', <PieChartOutlined/>),
    getItem('Permission', '10', <UsergroupDeleteOutlined/>, [
        getItem('Add Permission', '13'),
        getItem('All Permissions', '14'),
    ]),
    getItem('Role', '2', <DesktopOutlined/>, [
        getItem('Add Role', '11'),
        getItem('Assign Permission', '12'),
        getItem('All Roles', '15'),
    ]),
    getItem('Users', 'sub1', <UserOutlined/>, [
        getItem('Add User', '3'),
        getItem('All Users', '4'),
        getItem('Upload file', '5'),
    ]),
    getItem('Analysis', 'sub2', <TeamOutlined/>, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined/>),
];

const Navbar: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [bgColor, setBgColor] = useState('dark');
    const changeTheme = (value: boolean) => {
        setBgColor(value ? 'dark' : 'light');
    };
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div style={{height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)'}}/>
                <br/>
                <br/>
                <Menu theme={bgColor} defaultSelectedKeys={['1']} mode="inline" items={items}/>
            </Sider>
            <Layout className="site-layout">
                <Header style={{padding: 0, background: colorBgContainer}}/>
                <Content style={{margin: '0 16px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{padding: 24, minHeight: 360, background: colorBgContainer}}>
                        Bill is a cat.
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>Ant Design ©2023 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    );
};

export default Navbar;