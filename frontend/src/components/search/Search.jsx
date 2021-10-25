import React, { useState } from "react";
import { useAuctionItem } from "../../contexts/AuctionItemContext";

const Search = () => {
  const { addIsInList } = useAuctionItem();
  const [userInput, setUserInput] = useState();
  const { auctionItems } = useAuctionItem();

  function handleSearch(event) {
    event.preventDefault();
    filterAuctionItems();
    // setUserInput("");
  }

  function filterAuctionItems() {
    const filteredAuctionItems = [];
    for (let i = 0; i < auctionItems.length; i++) {
      let auctionItemTitle = auctionItems[i].title.toLowerCase();
      // word array 1 och word array 2 som i foodharvester
      if (auctionItemTitle === userInput) {
        filteredAuctionItems.push(auctionItems[i]);
      }
    }
    console.log(filteredAuctionItems)
  }

  return (
    <div>
      <form class="form-inline" style={styles.form} onSubmit={handleSearch}>
        <input
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
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
