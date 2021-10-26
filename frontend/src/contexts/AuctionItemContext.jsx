import React from "react";
import { createContext, useContext, useState, useEffect } from "react";

const AuctionItemContext = createContext();

export const useAuctionItem = () => {
  return useContext(AuctionItemContext);
};

const AuctionItemProvider = (props) => {

  const [auctionItems, setAuctionItems] = useState([])

    useEffect(() => {
      fetchAllAuctionItems()
      
}, []);
  
  
  const fetchAllAuctionItems = async () => {
    const docs = [];
    let response=await fetch("/rest/auction-items")

    console.log("setting auctionItems")
    setAuctionItems(await response.json())
    
  };

  const fetchAuctionItem = async (id) => {
    let res = await fetch("/rest/auction-items/" + id)
    console.log("From fetchAuctionItem: ", res)
    return res.json()
  }

  const values = {
    fetchAllAuctionItems,
    auctionItems,
    fetchAuctionItem

  };

  return (
    <AuctionItemContext.Provider value={values}>
      {props.children}
    </AuctionItemContext.Provider>
  );
};

export default AuctionItemProvider;
