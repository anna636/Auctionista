import React, { useState } from "react";
import { useAuctionItem } from "../../contexts/AuctionItemContext";
import { Popover, OverlayTrigger } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Search = () => {
  const [userInput, setUserInput] = useState();
  const { fetchAuctionItemByTitle } = useAuctionItem();
  const [popoverMessage, setPopoverMessage] = useState(false);
  let history = useHistory();

  function handleSearch(event) {
    event.preventDefault();
    history.push("/");
    getAuctionItemByTitle();
    setUserInput("");
  }

  const getAuctionItemByTitle = async () => {
    let fetchedItem = await fetchAuctionItemByTitle(userInput);
    if (fetchedItem) {
      console.log("fetched item: ", fetchedItem);

      setPopoverMessage(false);
    } else {
      setPopoverMessage(true);

      setTimeout(() => {
        setPopoverMessage(false);
      }, 3000);
    }
  };

  const popover = (
    <Popover id="popover-basic" style={styles.popover}>
      <Popover.Body style={styles.popover}>
        No items found. Try searching for something else...
      </Popover.Body>
    </Popover>
  );

  return (
    <div>
      <form className="form-inline" style={styles.form} onSubmit={handleSearch}>
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <OverlayTrigger
          trigger="click"
          placement="right"
          overlay={popover}
          show={popoverMessage}
          delay={3000}
          autohide
        >
          <button
            className="btn btn-outline-secondary my-2 my-sm-0"
            type="submit"
            style={styles.formButton}
          >
            Search
          </button>
        </OverlayTrigger>
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
  popover: {
    color: "rgb(226, 89, 55)",
    backgroundColor: "black",
  },
};
