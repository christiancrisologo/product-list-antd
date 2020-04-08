import React, { useMemo, useState, useContext, useCallback } from "react";
import { Table } from "antd";
import { StoreContext, ACTION_TYPES } from "../stores";
import Chart from "./Chart";
import ProductCell from "./ProductCell";
import { escapeRegExpString, searchTest } from "utils/regex";
import { toCurrency } from "utils/formatters";
import { getNetGain } from "utils/formula";

function getCellRender(text, record, selectedRows, children) {
    return {
        props: {
            className: selectedRows.some(
                (item) => item.product_code === record.product_code
            )
                ? "selected"
                : "",
        },
        children: children || <div>{text}</div>,
    };
}

export default function () {
    const [{ products, selectedProducts, filterByProductName }, dispatch] = useContext(
        StoreContext
    );
    const [selectedRows, setSelectedRows] = useState([]);

    const dataSource = useMemo(() => {
        const cleanInput = escapeRegExpString(filterByProductName);
        return !filterByProductName
            ? products
            : products.filter((product) => searchTest(cleanInput, product.product_name));
    }, [filterByProductName, products]);

    const onAddProductHandler = useCallback(
        (payload) => {
            dispatch({ type: ACTION_TYPES.SELECT_PRODUCT, payload });
        },
        [dispatch]
    );

    const columns = useMemo(
        () => [
            {
                title: "Product",
                dataIndex: "product_name",
                key: "product_name",
                width: 400,
                sorter: (a, b) => a.product_name.length - b.product_name.length,
                sortDirections: ["descend"],
                render: (tag, props) => (
                    <ProductCell data={props} onAdd={onAddProductHandler} />
                ),
            },
            {
                title: "Price",
                dataIndex: "price",
                key: "price",
                defaultSortOrder: "descend",
                sorter: (a, b) => a.price - b.price,
                render: (text, record) =>
                    getCellRender(
                        text,
                        record,
                        selectedRows,
                        <div> {toCurrency(text)}</div>
                    ),
            },
            {
                title: "Vends",
                dataIndex: "average_sales",
                key: "average_sales",
                defaultSortOrder: "descend",
                sorter: (a, b) => a.average_sales - b.average_sales,
                render: (text, record) =>
                    getCellRender((text || 0).toFixed(2), record, selectedRows),
            },
            {
                title: "Revenue",
                dataIndex: "revenue",
                revenue: "revenue",
                defaultSortOrder: "descend",
                sorter: (a, b) => a.revenue - b.revenue,
                render: (text, record) =>
                    getCellRender(
                        text,
                        record,
                        selectedRows,
                        <div> {toCurrency(text)}</div>
                    ),
            },
            {
                title: "Net Gain",
                dataIndex: "net",
                net: "net",
                defaultSortOrder: "descend",
                sorter: (a, b) => a.net - b.net,
                render: (text, record) => {
                    const total = getNetGain(selectedProducts, record);
                    return getCellRender(
                        text,
                        record,
                        selectedRows,
                        <div> {toCurrency(total)}</div>
                    );
                },
            },
        ],
        [onAddProductHandler, selectedProducts, selectedRows]
    );

    const onClickHandler = useCallback(
        (e, record) => {
            e.preventDefault();
            const newRows = selectedRows.some(
                (item) => item.product_code === record.product_code
            )
                ? selectedRows.filter((item) => item.product_code !== record.product_code)
                : [...selectedRows, record];
            setSelectedRows(newRows);
        },
        [selectedRows]
    );

    return (
        <Table
            className="product-table"
            columns={columns}
            dataSource={dataSource}
            rowClassName={(record, index) =>
                `product-row ${
                    selectedRows.some((item) => item.product_code === record.product_code)
                        ? "selected"
                        : ""
                } ${record.flavour_type}`
            }
            expandedRowRender={(record) => (
                <Chart data={record} selectedProducts={selectedProducts} />
            )}
            expandIconAsCell={false}
            expandIcon={false}
            expandedRowKeys={selectedRows.map((item) => item.product_code)}
            rowKey="product_code"
            onRow={(record, rowIndex) => {
                return {
                    onClick: (e) => onClickHandler(e, record),
                };
            }}
        />
    );
}
