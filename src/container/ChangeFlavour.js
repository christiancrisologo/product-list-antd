import React, { useContext, useEffect } from "react";
import { Layout, Button, message } from "antd";
import ProductsTable from "components/ProductsTable";
import SelectedProductTable from "components/SelectedProductTable";
import SearchBox from "components/SearchBox";
import { StoreContext, ACTION_TYPES } from "../stores";
import MainLayout from "components/MainLayout";

const { Content } = Layout;

export default function () {
    const [state, dispatch] = useContext(StoreContext);

    useEffect(() => {
        dispatch({ type: ACTION_TYPES.LOAD_PRODUCTS });
    }, [dispatch]);

    const saveHandler = () => {
        message.loading({ content: "Saving...", key: "dummy-save" });
        setTimeout(() => {
            message.success({
                content: "Product has been updated succesfully !",
                key: "dummy-save",
                duration: 2,
            });
        }, 1000);
    };

    return (
        <MainLayout
            title="Change Flavour"
            footer="DEVELOPED BY : CHRISTIAN CRISOLOGO (Sr. Frontend Developer)"
        >
            <SearchBox />

            <Layout className="product-content">
                <div className="selected-products">
                    <SelectedProductTable />
                </div>

                <Content style={{ minHeight: 450 }}>
                    <ProductsTable />
                </Content>
            </Layout>

            <Layout className="action-buttons">
                <div className="buttons">
                    <Button block>CANCEL</Button>
                    <Button type="primary" block onClick={saveHandler}>
                        SAVE
                    </Button>
                </div>
            </Layout>
        </MainLayout>
    );
}
