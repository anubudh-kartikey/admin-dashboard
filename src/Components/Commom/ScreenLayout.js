import {Layout, theme} from "antd";
import Navbar from "./Navbar";
import React from "react";
import {Breadcrumbs} from "./Breadcrumb";
import {Outlet} from "react-router-dom"

const {Header, Content, Footer} = Layout;

export const ScreenLayout: React.FC = () => {
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    return (
        <>
            <Layout style={{minHeight: '100vh'}}>
                <Navbar/>
                <Layout className="site-layout">
                    <Content style={{margin: '0 16px'}}>
                        <Breadcrumbs/>
                        <div style={{padding: 24, minHeight: 360, background: colorBgContainer}}>
                            <Outlet/>
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>Gupta Design ©2023 All Right Reserved</Footer>
                </Layout>
            </Layout>
        </>
    )
}
