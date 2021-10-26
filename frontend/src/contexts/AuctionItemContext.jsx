import React from "react";
import { createContext, useContext, useState, useEffect } from "react";

const AuctionItemContext = createContext();

export const useAuctionItem = () => {
  return useContext(AuctionItemContext);
};

const AuctionItemProvider = (props) => {

  const [auctionItems, setAuctionItems] =useState([])

    useEffect(() => {
      fetchAllAuctionItems()
      
}, []);
  
  
  const fetchAllAuctionItems = async () => {
    const docs = [];
    let response=await fetch("/rest/auction-items")

    console.log("setting auctionItems")
    setAuctionItems(await response.json())
    
  };

  const values = {
    fetchAllAuctionItems,
    auctionItems
  };

  return (
    <AuctionItemContext.Provider value={values}>
      {props.children}
    </AuctionItemContext.Provider>
  );
};

export default AuctionItemProvider;
