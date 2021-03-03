import React from "react";
import { shallow, mount } from "enzyme";

import { findByTestAttr } from "../test/testUtils";
import App from "./App";

import hookActions from "./actions/hookActions";

const mockGetSecretWord = jest.fn();

const setup = () => {
  mockGetSecretWord.mockClear();
  hookActions.getSecretWord = mockGetSecretWord;

  // use mount because useEffect not called on 'shallow'
  return mount(<App />);
};

test("App renders without error", () => {
  const wrapper = setup();
  const componentApp = findByTestAttr(wrapper, "componentApp");
  expect(componentApp.length).toBe(1);
});
describe("getSecretWord calls", () => {
  test("getSecretWord gets called on App mount", () => {
    setup();

    expect(mockGetSecretWord).toHaveBeenCalled();
  });

  test("secretWord doesn't update on App update", () => {
    const wrapper = setup();
    mockGetSecretWord.mockClear();

    wrapper.setProps();

    expect(mockGetSecretWord).not.toHaveBeenCalled();
  });
});
