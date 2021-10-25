import React, { useState } from "react";

const Search = () => {
  return (
    <div>
      <form class="form-inline" style={styles.form}>
        <input
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />

        <button
          class="btn btn-outline-secondary my-2 my-sm-0"
          type="submit"
          style={styles.formButton}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;

const styles = {
  form: {
    display: "flex",
    flexDirection: "row",
    width: "50vw",
    marginLeft: "8vw",
  },
  formButton: {
    marginLeft: "1vw",
    color: "rgb(226, 89, 55)",
    borderColor: "rgb(226, 89, 55)",
    backgroundColor: "black",
  },
};
