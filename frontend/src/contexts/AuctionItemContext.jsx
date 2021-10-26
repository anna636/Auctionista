import React from "react";
import { createContext, useContext, useState, useEffect } from "react";

const AuctionItemContext = createContext();

export const useAuctionItem = () => {
  return useContext(AuctionItemContext);
};

const AuctionItemProvider = (props) => {

  const [auctionItems, setAuctionItems] = useState([])
  const [primaryImgPath, setPrimaryImgPath] = useState("")
  const [imgPaths, setImgPaths]=useState([])

   
  const fetchAllAuctionItems = async () => {
    
    let response=await fetch("/rest/auction-items")

    
    setAuctionItems(await response.json())
    
  };

  const postNewAuctionItem = async (itemToPost) => {
    let response = await fetch("/rest/auction-items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(itemToPost),
    });
   console.log(await response.json())
    return response
   
  }

  const values = {
    postNewAuctionItem,
    auctionItems,
    setPrimaryImgPath,
    setImgPaths,
    fetchAllAuctionItems,
  };

  return (
    <AuctionItemContext.Provider value={values}>
      {props.children}
    </AuctionItemContext.Provider>
  );
};

export default AuctionItemProvider;
