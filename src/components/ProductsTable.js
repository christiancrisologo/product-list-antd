import React from "react";
import { Table, Tag, Typography } from "antd";
import { productUpdateData as data } from "data";

const { Text, Paragraph } = Typography;

const columns = [
    {
        title: "Product",
        dataIndex: "product_name",
        key: "product_name",
        width: 300,
        sorter: (a, b) => a.product_name.length - b.product_name.length,
        sortDirections: ["descend"],
        render: (tag, props, index) => {
            return (
                <div className="product-cell">
                    <div className="product-img">
                        <img
                            src={`https://cdn.vendinganalytics.com/reyes-ccb/tb/${props.product_code}.png`}
                            alt="product code"
                            width="100%"
                            height="auto"
                        />
                    </div>
                    <div className="product-label-container">
                        <Paragraph style={{ marginBottom: 0 }}>{tag}</Paragraph>
                        <Text disabled>{props.product_code}</Text>
                    </div>
                </div>
            );
        },
    },
    {
        title: "Price",
        dataIndex: "price",
        key: "price",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.price - b.price,
    },
    {
        title: "Vends",
        dataIndex: "vends",
        key: "vends",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.vends - b.vends,
    },
    {
        title: "Revenue",
        dataIndex: "revenue",
        revenue: "revenue",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.revenue - b.revenue,
    },
    {
        title: "Net Gain",
        dataIndex: "net",
        net: "net",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.net - b.net,
    },
];

function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
}

const Cell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    console.log("#CC -- ", {
        dataIndex,
        title,
        inputType,
        record,
        index,
        restProps,
        children,
    });
    return (
        <td {...restProps}>
            {dataIndex === "product" ? (
                <div className="product-cell">{record}</div>
            ) : (
                children
            )}
        </td>
    );
};

export default function () {
    return <Table columns={columns} dataSource={data} onChange={onChange} />;
}
