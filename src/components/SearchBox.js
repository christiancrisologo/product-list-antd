import React, { useContext, useCallback } from "react";
import { Layout, Input, Tooltip } from "antd";
import { QuestionCircleFilled } from "@ant-design/icons";
import { StoreContext, ACTION_TYPES } from "../stores";

const { Content } = Layout;

export default function () {
    const [state, dispatch] = useContext(StoreContext); //eslint-disable-line

    const searchChangeHandler = useCallback(
        (e) => {
            e.preventDefault();
            dispatch({
                type: ACTION_TYPES.FILTER_BY_PRODUCT_NAME,
                payload: e.target.value || "",
            });
        },
        [dispatch]
    );
    return (
        <Content className="ant-search-container">
            <div className="search-product">
                <Input
                    placeholder="Search"
                    suffix={
                        <Tooltip title="Search by product">
                            <QuestionCircleFilled
                                style={{ fontSize: 24, marginTop: 4 }}
                            />
                        </Tooltip>
                    }
                    onChange={searchChangeHandler}
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
    );
}
