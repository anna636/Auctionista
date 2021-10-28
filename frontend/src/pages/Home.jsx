import React, { useEffect, useState } from 'react'
import { useAuctionItem } from "../contexts/AuctionItemContext"
import AuctionItemCard from '../components/AuctionItemCard';
import { useHistory } from "react-router-dom";


function Home() {

  const history = useHistory();
 

  const [offsetY, setOffsetY] = useState(0)
  const [currentItemsLength, setCurrentItemsLength] = useState(2)
  
const { auctionItems, fetchAllAuctionItems, fetchItemsInBatch } =useAuctionItem();
  const handleScroll = () => setOffsetY(window.pageYOffset);


  
  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  

  function loadMore() {
    fetchItemsInBatch(auctionItems.length)
    setCurrentItemsLength(auctionItems.length)
  }
 

  return (
    <div className="homeWrapper" style={styles.homeWrapper}>
      <div className="homeImg">
        <img
          src="https://images.unsplash.com/photo-1607603638553-6d54f6b4f668?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1503&q=80"
          alt=""
          style={styles.stockImg}
        />
        <div style={{ transform: `translateY(${offsetY * -0.8}px)` }}>
          <img
            style={styles.text}
            src="https://www.coolgenerator.com/Data/Textdesign/202110/f2bbfa196417e52664c56938ca47c4e7.png"
            alt=""
            className="livestockAuction"
          />
        </div>
        
      </div>

      <div className="listWrapper" style={styles.listWrapper}>
        {auctionItems && auctionItems.length > 0 ? (
          auctionItems.map((item) => (
            <AuctionItemCard props={item} style={styles.item} />
          ))
        ) : (
          <p>There are no auctions at this moment :,(</p>
        )}
      </div>
      <button onClick={loadMore} className="loadMoreBtn" style={styles.loadMoreBtn}>
       Load more
      </button>
    </div>
  );
}

export default Home

const styles = {
  stockImg: {
    height: "80vh",
    width: "100%",
  },
  text: {
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
    paddingBottom:"10vh"

  },
  loadMoreBtn: {
    width: "10vw",
    fontSize: "1.3em",
    backgroundColor: "black",
    color:"white",
    border: "2px solid black",
    borderRadius: "5px",
    marginLeft:"44vw"
    
  }
};
