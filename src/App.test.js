import React from "react";
import { shallow, mount } from "enzyme";

import { findByTestAttr } from "../test/testUtils";
import App from "./App";

import hookActions from "./actions/hookActions";

const mockGetSecretWord = jest.fn();

const setup = (secretWord = "party") => {
  mockGetSecretWord.mockClear();
  hookActions.getSecretWord = mockGetSecretWord;

  const mockUseReducer = jest.fn().mockReturnValue([{ secretWord }, jest.fn()]);
  React.useReducer = mockUseReducer;

  // use mount because useEffect not called on 'shallow'
  return mount(<App />);
};

test("App renders without error", () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, "appComponent");
  expect(appComponent.length).toBe(1);
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
describe("secretWord is not null ", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup("party");
  });
  test("renders app when secretWord is not null", () => {
    const appComponent = findByTestAttr(wrapper, "appComponent");
    expect(appComponent.exists()).toBe(true);
  });

  test("does not render spinner when secretWord is not null", () => {
    const spinner = findByTestAttr(wrapper, "spinner");
    expect(spinner.exists()).toBe(false);
  });
});

describe("secretWord is null ", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup(null);
  });
  test("does not renders app when secretWord is not null", () => {
    const appComponent = findByTestAttr(wrapper, "appComponent");
    expect(appComponent.exists()).toBe(false);
  });

  test("renders spinner when secretWord is null", () => {
    const spinner = findByTestAttr(wrapper, "spinner");
    expect(spinner.exists()).toBe(true);
  });
});
