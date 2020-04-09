import React from "react";
import { mount, shallow } from "enzyme";
import MainLayout from "./MainLayout";

describe("<MainLayout />", () => {
    let wrapper;
    beforeAll(() => {
        wrapper = mount(<MainLayout title="Dummy Title" footer="Dummy Footer" />);
    });
    afterAll(() => {
        wrapper.unmount();
    });

    it("should render and match snapshot", () => {
        const component = shallow(
            <MainLayout title="Dummy Title" footer="Dummy Footer" />
        );
        expect(component).toMatchSnapshot();
    });

    it("should have title and footer", () => {
        expect(wrapper.find("h4").text()).toEqual("Dummy Title");
        expect(wrapper.find("footer").text()).toEqual("Dummy Footer");
    });
});
