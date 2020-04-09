import React from "react";
import { mount } from "enzyme";
import ProductCell from "./ProductCell";

const dummyData = {
    display_category: 0,
    product_code: "133129",
    product_name: "16Z CN 24LS_MON NRG",
    type_name: "BEVERAGE",
    flavour_type: "recommended",
    average_sales: 1.24275,
    price: 275,
    subsidy_price: 0,
    expected_price: 275,
    revenue_bar_width: 28.2876883513,
    is_known: true,
    is_predicted: true,
    has_stock: true,
};

describe("<ProductCell />", () => {
    let wrapper;
    beforeAll(() => {
        wrapper = mount(<ProductCell data={dummyData} onAdd={() => {}} />);
    });
    afterAll(() => {
        wrapper.unmount();
    });

    it("should render and match snapshot", () => {
        expect(wrapper).toMatchSnapshot();
    });

    it("should have correct image src", () => {
        expect(wrapper.find("img").prop("src")).toEqual(
            `https://cdn.vendinganalytics.com/reyes-ccb/tb/${dummyData.product_code}.png`
        );
    });

    it("should have correct product name and product code", () => {
        const texts = wrapper.find("Typography").map((node) => node.text());
        expect(texts).toEqual([dummyData.product_name, dummyData.product_code]);
    });
});
