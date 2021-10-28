import React, { useEffect, useState } from 'react'
import { useAuctionItem } from "../contexts/AuctionItemContext"
import AuctionItemCard from '../components/AuctionItemCard';
import { useHistory } from "react-router-dom";
import PaginatedList from '../components/PaginatedList';


function Home() {

  const history = useHistory();
  

  const [offsetY, setOffsetY] = useState(0)
  const handleScroll = () => setOffsetY(window.pageYOffset);

  const { auctionItems, fetchAllAuctionItems } = useAuctionItem();
  

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    fetchAllAuctionItems()
    return () => window.removeEventListener("scroll", handleScroll)
  },[])


  

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
      
    <PaginatedList/>
     
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
    padding:"0 5vw"
  },
  homeWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "10vh",
  },
  item: {
    
  },
};
