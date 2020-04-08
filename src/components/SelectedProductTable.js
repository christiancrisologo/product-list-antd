import React, { useMemo, useContext } from "react";
import { Table } from "antd";
import { StoreContext } from "../stores";
import SelectedProductCell from "./SelectedProductCell";

export default function () {
    const [{ selectedProducts }] = useContext(StoreContext);

    const columns = useMemo(
        () => [
            {
                title: "Selected Products",
                dataIndex: "product_name",
                key: "product_name",
                width: 400,
                sorter: (a, b) => a.product_name.length - b.product_name.length,
                sortDirections: ["descend"],
                render: (tag, props) => <SelectedProductCell {...props} />,
            },
        ],
        []
    );

    return (
        <Table
            className="selected-products-table"
            columns={columns}
            pagination={false}
            dataSource={selectedProducts}
        />
    );
}
