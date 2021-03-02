import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr, checkProps } from "../../test/testUtils";
import Input from "./Input";

const setup = (secretWord = "party") => {
  return shallow(<Input secretWord={secretWord} />);
};

test("App renders without error", () => {
  const wrapper = setup();
  const componentInput = findByTestAttr(wrapper, "componentInput");
  expect(componentInput.length).toBe(1);
});

test("does not throw warning with expected props", () => {
  checkProps(Input, { secretWord: "party" });
});

describe("state controlled input field", () => {
  let wrapper;
  let mockSetCurrentGuess = jest.fn();
  beforeEach(() => {
    mockSetCurrentGuess.mockClear();
    React.useState = jest.fn(() => ["", mockSetCurrentGuess]);
    wrapper = setup();
  });
  test("state updates with value of input box upon change", () => {
    const inputBox = findByTestAttr(wrapper, "inputBox");

    const mockEvent = { target: { value: "train" } };
    inputBox.simulate("change", mockEvent);

    expect(mockSetCurrentGuess).toHaveBeenCalledWith("train");
  });

  test("state updates with value of input box upon change", () => {
    const submitButton = findByTestAttr(wrapper, "submitButton");

    submitButton.simulate("click", { preventDefault() {} });

    expect(mockSetCurrentGuess).toHaveBeenCalledWith("");
  });
});
