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
          onChange={(event) => setCurrentGuess(event.target.value)}
        />
        <button
          data-test="submitButton"
          className="btn btn-primary mb-2"
          onClick={(e) => {
            e.preventDefault(e);
            // TODO - update guessedWords context
            // TODO - Check against secret work and optionally...
            // ...update the sucess context
            setCurrentGuess("");
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
