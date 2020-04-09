import React from "react";
import { mount } from "enzyme";
import ProductsTable from "./ProductsTable";
import Store, { StoreContext, ACTION_TYPES } from "../stores";

const MockProductsTable = function () {
    const [state, dispatch] = React.useContext(StoreContext); //eslint-disable-line

    React.useEffect(() => {
        dispatch({ type: ACTION_TYPES.LOAD_PRODUCTS });
    }, [dispatch]);

    return <ProductsTable />;
};

describe("<ProductTable />", () => {
    let wrapper;
    beforeAll(() => {
        wrapper = mount(
            <Store>
                <MockProductsTable />
            </Store>
        );
    });
    afterAll(() => {
        wrapper.unmount();
    });

    it("should render and match snapshot", () => {
        expect(wrapper).toMatchSnapshot();
    });

    it("should have   correct number of records", () => {
        expect(wrapper.find("tbody").children()).toHaveLength(10);
    });
});
