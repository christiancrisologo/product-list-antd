import React, { useCallback } from "react";
import { Typography, Tooltip, Button } from "antd";
import { CheckCircleFilled, PlusCircleTwoTone } from "@ant-design/icons";
const { Paragraph } = Typography;

export default function ({ data, onAdd }) {
    const onAddHandler = useCallback(
        (e) => {
            e.preventDefault();
            onAdd(data);
        },
        [data, onAdd]
    );

    return (
        <div className="product-cell">
            <div className="product-img">
                <img
                    src={`https://cdn.vendinganalytics.com/reyes-ccb/tb/${data.product_code}.png`}
                    alt="product code"
                    width="100%"
                    height="auto"
                />
            </div>
            <div className="product-label-container">
                <Paragraph style={{ marginBottom: 0 }}>{data.product_name}</Paragraph>
                <Paragraph disabled>{data.product_code}</Paragraph>
                <Button
                    type="primary"
                    onClick={onAddHandler}
                    icon={<PlusCircleTwoTone />}
                >
                    ADD PRODUCT
                </Button>
            </div>
            {data.has_stock && (
                <Tooltip placement="top" title="Currently in stock" className="tooltip">
                    <CheckCircleFilled
                        style={{
                            color: "#1890ff",
                            cursor: "pointer",
                            fontSize: 24,
                        }}
                    />
                </Tooltip>
            )}
        </div>
    );
}
