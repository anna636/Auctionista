import React from "react";
import { createContext, useContext, useState } from "react";

const AuctionItemContext = createContext();

export const useAuctionItem = () => {
  return useContext(AuctionItemContext);
};

const AuctionItemProvider = (props) => {
  const fetchAllAuctionItems = async () => {
    const docs = [];
    let response=await fetch("/rest/auctionItems")

    console.log(await response.json())
  };

  const values = {
    fetchAllAuctionItems,
  };

  return (
    <AuctionItemContext.Provider value={values}>
      {props.children}
    </AuctionItemContext.Provider>
  );
};

export default AuctionItemProvider;
