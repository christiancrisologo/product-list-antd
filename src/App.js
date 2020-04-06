import React from "react";
import "assets/less/app.less";
import Store from "stores";
import Layout from "components/Layout";

export default function () {
    return (
        <Store>
            <Layout />
        </Store>
    );
}
