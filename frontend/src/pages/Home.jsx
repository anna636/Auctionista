import React from 'react'
import {useAuctionItem} from "../contexts/AuctionItemContext"

function Home() {

const {fetchAllAuctionItems} = useAuctionItem()
  return (
    <div className="homeWrapper">
      <div className="homeImg">
        <img
          src="https://images.unsplash.com/photo-1607603638553-6d54f6b4f668?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1503&q=80"
          alt=""
          style={styles.stockImg}
        />
        <img
          style={styles.text}
          src="https://www.coolgenerator.com/Data/Textdesign/202110/f2bbfa196417e52664c56938ca47c4e7.png"
          alt=""
        />
      </div>
      <button onClick={fetchAllAuctionItems}>fetch</button>
    </div>
  );
}

export default Home

const styles = {
  stockImg: {
    height: "80vh",
    width:"100%"
  },
  text: {
    position: "absolute",
    top: "40vh",
    left:"10vh"
  }
}
