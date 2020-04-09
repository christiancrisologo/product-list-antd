import React from "react";
import { mount } from "enzyme";
import SelectedProductCell from "./SelectedProductCell";
import Store from "../stores";
import { toCurrency } from "utils/formatters";
import { getRevenue } from "utils/formula";

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
    cols: "1/10",
};

describe("<SelectedProductCell />", () => {
    let wrapper;
    beforeAll(() => {
        wrapper = mount(
            <Store>
                <SelectedProductCell {...dummyData} />
            </Store>
        );
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

    it("should have correct product name, product code, price, vends revenue, and cols", () => {
        const texts = wrapper.find("Typography").map((node) => node.text());
        expect(texts[0]).toEqual(dummyData.product_name);
        expect(texts[1]).toEqual(dummyData.product_code);
        expect(texts[3]).toEqual(toCurrency(dummyData.price));
        expect(texts[5]).toEqual(`${dummyData.average_sales}`);
        expect(texts[7]).toEqual(toCurrency(getRevenue(dummyData.revenue)));
        expect(texts[9]).toEqual(dummyData.cols);
    });
});
