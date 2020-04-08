import React from "react";
import { Layout, Typography } from "antd";

const { Header, Footer } = Layout;
const { Title } = Typography;

export default function ({ children, title, footer }) {
    return (
        <Layout>
            <Header className="header">
                <Title level={4}>{title}</Title>
            </Header>

            {children}

            <Footer style={{ textAlign: "center" }}>{footer}</Footer>
        </Layout>
    );
}
