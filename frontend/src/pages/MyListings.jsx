import React from "react";
import { UserContext } from "../contexts/UserContext";
import { useEffect, useContext } from "react";
import AuctionItemCard from "../components/AuctionItemCard";
import { useAuctionItem } from "../contexts/AuctionItemContext";

function MyListings() {
  const { getCurrentUser } = useContext(UserContext);


  useEffect(() => {
  
  }, []);

  return (
    <div className="pageWrapper" style={styles.pageWrapper}>
      <h4>My current listings</h4>
      <div className="itemsWrapper" style={styles.itemWrapper}>
        {getCurrentUser() && getCurrentUser().myAuctionItems.length > 0 ? (
          getCurrentUser().myAuctionItems.map((item) => (
            <AuctionItemCard props={item} />
          ))
        ) : (
          <p>There are no auctions at this moment :,(</p>
        )}
      </div>
    </div>
  );
}

export default MyListings;

const styles = {
  itemWrapper: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "5vw",
    padding: "5vh 2vw",
  },

  pageWrapper: {
    width: "100%",

    padding: "3vw",
    textAlign: "left",
    color: "rgb(226, 89, 55)",
  },
};
