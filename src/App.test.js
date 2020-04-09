import React from "react";
import { shallow } from "enzyme";
import App from "./App";

it("renders without crashing", () => {
    shallow(<App />);
});

it("should render", () => {
    let wrapper = shallow(<App />);
    expect(wrapper.exists()).toBeTruthy();
});
