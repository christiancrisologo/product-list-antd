import React from "react";
import { mount } from "enzyme";
import ChangeFlavour from "./ChangeFlavour";
import Store from "../stores";

describe("<ChangeFlavour />", () => {
    let wrapper;
    beforeAll(() => {
        wrapper = mount(
            <Store>
                <ChangeFlavour />
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
