import React from "react";
import PropTypes from "prop-types";

export default function Input({ secretWord }) {
  const [currentGuess, setCurrentGuess] = React.useState("");
  return (
    <div data-test="componentInput">
      <form className="form-inline">
        <input
          data-test="inputBox"
          className="mb-2 mx-sm-3"
          type="text"
          placeholder="enter guess"
          value={currentGuess}
          onChange={(e) => setCurrentGuess(e.target.value)}
        />
        <button
          date-test="submitButton"
          className="btn btn-primary mb-2"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

Input.propTypes = {
  secretWord: PropTypes.string.isRequired,
};
