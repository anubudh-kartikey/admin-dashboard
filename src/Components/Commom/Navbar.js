import React, {useState} from 'react';
import {
    DesktopOutlined,
    PieChartOutlined,
    UnlockOutlined,
    UsergroupDeleteOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Layout, Menu} from 'antd';
import {useLocation, useNavigate} from "react-router-dom";
import {DASHBOARD_PATHS} from "../../Routes/Paths";

const {Sider} = Layout;

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

const root = DASHBOARD_PATHS.ROOT;
const items: MenuItem[] = [
    getItem('Home', root + DASHBOARD_PATHS.HOME, <PieChartOutlined/>),

    getItem('Permission', root + DASHBOARD_PATHS.GET_ALL_PERMISSIONS, <UnlockOutlined/>,
        //     [
        //     getItem('Add Permission', root + DASHBOARD_PATHS.ADD_PERMISSION),
        //     getItem('All Permissions', root + DASHBOARD_PATHS.GET_ALL_PERMISSIONS),
        // ]
    ),
    getItem('Role', 'role', <DesktopOutlined/>,
        [
            // getItem('Add Role', root + DASHBOARD_PATHS.ADD_ROLE),
            getItem('All Roles', root + DASHBOARD_PATHS.GET_ALL_ROLES),
            getItem('Assign Permission', root + DASHBOARD_PATHS.ASSIGN_PERMISSIONS),

        ]
    ),
    getItem('Users', '3', <UsergroupDeleteOutlined/>, [
        // getItem('Add User', root + DASHBOARD_PATHS.ADD_USER),
        getItem('All Users', root + DASHBOARD_PATHS.GET_ALL_USERS),
        getItem('Upload file', root + DASHBOARD_PATHS.UPLOAD_USER_FILE),
    ]),

    getItem('My Profile', root + DASHBOARD_PATHS.MY_PROFILE, <UserOutlined/>),

    // getItem('Analysis', 'sub2', <TeamOutlined/>, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    // getItem('Files', '9', <FileOutlined/>),
];

const Navbar: React.FC = () => {
    const {pathname} = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const onClick = (e) => {
        navigate(e.key);
    };


    return (
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <div style={{height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)'}}/>
            <Menu theme={'dark'} defaultSelectedKeys={[pathname]} onClick={onClick} mode="inline" items={items}/>
        </Sider>
    );
};

export default Navbar;