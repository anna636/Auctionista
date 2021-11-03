import React, { useEffect, useState } from "react";
import { useAuctionItem } from "../contexts/AuctionItemContext";
import AuctionItemCard from "../components/AuctionItemCard";

function Home() {
  const [offsetY, setOffsetY] = useState(0);
  const [currentItemsLength, setCurrentItemsLength] = useState(6);
  const { auctionItems, fetchItemsInBatch } =
    useAuctionItem();
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function loadMore() {
    fetchItemsInBatch(auctionItems.length);
    setCurrentItemsLength(auctionItems.length);
  }

  return (
    <div className="homeWrapper" style={styles.homeWrapper}>
      <div className="homeImg">
        <img
          src="https://www.visitcairngorms.com/wp-content/uploads/2020/07/Highland-Cow-gimp-comp-visitscotland_38723920242.jpg"
          alt=""
          style={styles.stockImg}
        />
        <div style={{ transform: `translateY(${offsetY * -0.8}px)` }}>
          <h1 style={styles.text}>Livestock Auction</h1>
          {/* <img
            style={styles.text}
            src="https://www.coolgenerator.com/Data/Textdesign/202110/f2bbfa196417e52664c56938ca47c4e7.png"
            alt=""
            className="livestockAuction"
          /> */}
        </div>
      </div>

      <div className="listWrapper" style={styles.listWrapper}>
        {auctionItems && auctionItems.length > 0 ? (
          auctionItems.map((item, index) => (
            <AuctionItemCard props={item} style={styles.item} key={index} />
          ))
        ) : (
          <p>There are no auctions at this moment :,(</p>
        )}
      </div>
      <button
        onClick={loadMore}
        className="loadMoreBtn"
        style={styles.loadMoreBtn}
      >
        Load more
      </button>
    </div>
  );
}

export default Home;

const styles = {
  stockImg: {
    objectFit: "cover",
    height: "80vh",
    width: "100%",
  },
  text: {
    color: "white",
    fontFamily: "Montserrat, sans-serif",
    position: "absolute",
    top: "-40vh",
    left: "10vh",
  },
  listWrapper: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "5vw",
    padding: "0 5vw",
  },
  homeWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "10vh",
    paddingBottom: "10vh",
    backgroundColor: "#2d2319",
  },
  loadMoreBtn: {
    width: "10vw",
    fontSize: "1.3em",
    backgroundColor: "black",
    color: "white",
    border: "2px solid black",
    borderRadius: "5px",
    marginLeft: "44vw",
  },
};
