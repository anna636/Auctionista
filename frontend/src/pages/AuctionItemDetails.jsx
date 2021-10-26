import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuctionItem } from "../contexts/AuctionItemContext";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

function AuctionItemDetails() {
  const { id } = useParams();
  const { fetchAuctionItem } = useAuctionItem();
  const [auctionItem, setAuctionItem] = useState();

  useEffect(() => {
    getAuctionItem(id);
  }, [id]);

  const getAuctionItem = async (auctionItemId) => {
    let fetchedItem = await fetchAuctionItem(auctionItemId);
    setAuctionItem(fetchedItem);
  };

  return (
    <div>
      {" "}
      {auctionItem && (
        <Container fluid className="p-3">
          <h1>Auction Item Details ID: {id}</h1>
          <Button>Test</Button>
          <h2>Auction item: {auctionItem.title}</h2>
        </Container>
      )}
    </div>
  );
}

export default AuctionItemDetails;
