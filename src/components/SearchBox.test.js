import React from "react";
import { mount } from "enzyme";
import SearchBox from "./SearchBox";
import Store from "../stores";

describe("<SearchBox />", () => {
    let wrapper;
    beforeAll(() => {
        wrapper = mount(
            <Store>
                <SearchBox />
            </Store>
        );
    });
    afterAll(() => {
        wrapper.unmount();
    });

    it("should render and match snapshot", () => {
        expect(wrapper).toMatchSnapshot();
    });
});
