import React from "react";
import { createContext, useContext, useState, useEffect } from "react";

const AuctionItemContext = createContext();

export const useAuctionItem = () => {
  return useContext(AuctionItemContext);
};

const AuctionItemProvider = (props) => {
  const [auctionItems, setAuctionItems] = useState([]);
  const [primaryImgPath, setPrimaryImgPath] = useState("");
  const [imgPaths, setImgPaths] = useState([]);

  useEffect(() => {
      fetchItemsInBatch(0, 1);
    
      }, []);
 

  const fetchItemsInBatch = async (offsetValue, id) => {
    let response = await fetch("/rest/auction-items/batch/" + offsetValue+"/"+id)
    let items = await response.json();

    if (auctionItems.length === 0) {
      setAuctionItems(items);
    } else {
      console.log("fetching when not 0")
      setAuctionItems([...auctionItems,...items])
    }

   
  }

  const fetchAuctionItem = async (id) => {
    let res = await fetch("/rest/auction-items/" + id);
    try {
      let fetchedItem = await res.json();
      return fetchedItem;
    } catch {
      console.log("No item found");
    }
  };

  const fetchAuctionItemByTitle = async (userInput) => {
    let res = await fetch("/api/auction-items/search?title=" + userInput);
    try {
      let fetchedItems = await res.json();
      setAuctionItems(fetchedItems)
      return fetchedItems;
    } catch {
      console.log(res.statusText);
    }
  };

  const postNewAuctionItem = async (itemToPost) => {
    let response = await fetch("/rest/auction-items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(itemToPost),
    });
    console.log(await response.json());
    return response;
  };

  const values = {
    postNewAuctionItem,
    auctionItems,
    setPrimaryImgPath,
    setImgPaths,
    fetchAuctionItem,
    fetchItemsInBatch,
    fetchAuctionItemByTitle,
    setAuctionItems
  };

  return (
    <AuctionItemContext.Provider value={values}>
      {props.children}
    </AuctionItemContext.Provider>
  );
};

export default AuctionItemProvider;
