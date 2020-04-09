import React from "react";
import { mount } from "enzyme";
import SelectedProductTable from "./SelectedProductTable";
import Store, { StoreContext, ACTION_TYPES } from "../stores";

const MockSelectedProductsTable = function () {
    const [state, dispatch] = React.useContext(StoreContext); //eslint-disable-line

    React.useEffect(() => {
        dispatch({ type: ACTION_TYPES.LOAD_PRODUCTS });
    }, [dispatch]);

    return <SelectedProductTable />;
};

describe("<SelectedProductTable />", () => {
    let wrapper;
    beforeAll(() => {
        wrapper = mount(
            <Store>
                <MockSelectedProductsTable />
            </Store>
        );
    });
    afterAll(() => {
        wrapper.unmount();
    });

    it("should render and match snapshot", () => {
        expect(wrapper).toMatchSnapshot();
    });

    it("should have correct number of records", () => {
        expect(wrapper.find("tbody").children()).toHaveLength(2);
    });
});
