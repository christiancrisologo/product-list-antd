import React from "react";
import { Typography } from "antd";
import { toCurrency } from "utils/formatters";
const { Text } = Typography;

const LabelField = function ({ field, value }) {
    return (
        <div className="selected-product-field">
            <Text strong className="field">
                {field}
            </Text>
            <Text strong>{value}</Text>
        </div>
    );
};
export default function (props) {
    return (
        <div className="selected-product-cell">
            <div style={{ display: "block" }}>
                <img
                    src={`https://cdn.vendinganalytics.com/reyes-ccb/tb/${props.product_code}.png`}
                    alt="product code"
                    width="40px"
                    height="auto"
                />
            </div>
            <div className="labels">
                <Text strong>{props.product_name}</Text>
                <Text strong disabled style={{ marginBottom: 8 }}>
                    {props.product_code}
                </Text>
                <LabelField field="Price:" value={toCurrency(props.price)} />
                <LabelField field="Vends:" value={props.average_sales || 0} />
                <LabelField field="Revenue:" value={toCurrency(props.revenue)} />
                <LabelField field="Cols:" value={props.cols || "1/10"} />
            </div>
        </div>
    );
}
