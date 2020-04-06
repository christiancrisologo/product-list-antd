import React from "react";
import { Layout, Menu, Typography, Row, Col, Input, Tooltip } from "antd";
import {
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
    QuestionCircleTwoTone,
} from "@ant-design/icons";
import ProductsTable from "./ProductsTable";
import SelectedProductTable from "./SelectedProductTable";
const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;
const { Title } = Typography;

export default function () {
    return (
        <Layout>
            <Header className="header">
                <Title level={4}>Change Flavour</Title>
            </Header>

            <Content className="ant-search-container">
                <div className="search-product">
                    <Input
                        placeholder="Search"
                        suffix={
                            <Tooltip title="Search by product">
                                <QuestionCircleTwoTone />
                            </Tooltip>
                        }
                        style={{ width: 200 }}
                    />
                </div>

                <div className="legends">
                    <div className="legend-box">
                        <div className="legend-icon recommended-bg" />
                        Recommended Flavours
                    </div>
                    <div className="legend-box">
                        <div className="legend-icon other-bg" />
                        Other Flavours
                    </div>
                    <div className="legend-box">
                        <div className="legend-icon caution-bg" />
                        Caution Flavours
                    </div>
                </div>
            </Content>

            <Layout className="site-layout-background">
                <Sider className="side-bar-product site-layout-background" width={200}>
                    <SelectedProductTable />
                </Sider>

                <Content style={{ minHeight: 450 }}>
                    <ProductsTable />
                </Content>
            </Layout>

            <Footer style={{ textAlign: "center" }}>
                DEVELOPED BY : CHRISTIAN CRISOLOGO (Sr. Frontend Developer)
            </Footer>
        </Layout>
    );
}
