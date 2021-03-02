import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr } from "../test/testUtils";
import App from "./App";

const setup = () => {
  return shallow(<App />);
};

test("App renders without error", () => {
  const wrapper = setup();
  const componentApp = findByTestAttr(wrapper, "componentApp");
  expect(componentApp.length).toBe(1);
});
