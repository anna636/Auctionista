
import React, { useEffect, useState } from "react";
import { useAuctionItem } from "../contexts/AuctionItemContext";
import AuctionItemCard from "../components/AuctionItemCard";
import { useHistory } from "react-router-dom";

function PaginatedList() {
  const { auctionItems, fetchAllAuctionItems } = useAuctionItem();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const itemsToShow = auctionItems.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(auctionItems.length / itemsPerPage);

  function nextPage() {
    if (currentPage < Math.ceil(auctionItems.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  }


  function prevPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage-1)
    }
  }

  useEffect(() => {
  
    fetchAllAuctionItems();


  }, []);



  return (
    <div style={styles.wrapper}>
      <div className="listWrapper" style={styles.listWrapper}>
        {auctionItems && auctionItems.length > 0 ? (
          itemsToShow.map((item) => (
            <AuctionItemCard props={item} style={styles.item} />
          ))
        ) : (
          <p>There are no auctions at this moment :,(</p>
        )}
      </div>
      <div className="pages" style={styles.pagesWrapper}>
        <div>
          <button
            onClick={prevPage}
            style={styles.pagesBtn}
            className="pagesBtn"
          >
            Previous
          </button>
        </div>
        <div>
          <p style={styles.text}>
            {currentPage} out of {totalPages}
          </p>
        </div>
        <div>
          <button
            onClick={nextPage}
            style={styles.pagesBtn}
            className="pagesBtn"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaginatedList




const styles = {
  listWrapper: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "5vw",
    padding: "0 5vw",
  },

  text: {
    fontWeight: "bold",
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  pagesBtn: {
    fontSize: "1.2em",
    border: "none",
    backgroundColor: "black",
    opacity: "0.8",
    color: "white",
    padding: "2vh",
    borderRadius: "10px",
    cursor: "pointer",
    border: "2px solid black",
  },
  pagesWrapper: {
    display: "grid",
    width: "50%",
    gridTemplateColumns: "30% 40% 30%",
    padding: "5vh 0 10vh 0",
    alignItems: "center",
    fontSize: "1.1em",
    textAlign: "center",
    justifyContent:"center"
  },
};