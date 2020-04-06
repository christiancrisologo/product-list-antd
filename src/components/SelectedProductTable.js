import React from "react";
import { Table } from "antd";

const columns = [
    {
        title: "Selected Products",
        // specify the condition of filtering result
        // here is that finding the name started with `value`
        // onFilter: (value, record) => record.name.indexOf(value) === 0,
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ["descend"],
    },
];

const data = [
    {
        key: "1",
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
    },
    {
        key: "2",
        name: "Jim Green",
        age: 42,
        address: "London No. 1 Lake Park",
    },
    {
        key: "3",
        name: "Joe Black",
        age: 32,
        address: "Sidney No. 1 Lake Park",
    },
    {
        key: "4",
        name: "Jim Red",
        age: 32,
        address: "London No. 2 Lake Park",
    },
];

function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
}

export default function () {
    return (
        <Table
            columns={columns}
            pagination={false}
            dataSource={data}
            onChange={onChange}
        />
    );
}
