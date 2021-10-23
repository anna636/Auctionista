import React from 'react'
import {useAuctionItem} from "../contexts/AuctionItemContext"

function Home() {

const {fetchAllAuctionItems} = useAuctionItem()
  return (
    <div>
      <button onClick={fetchAllAuctionItems}>fetch</button>
    </div>
  )
}

export default Home
