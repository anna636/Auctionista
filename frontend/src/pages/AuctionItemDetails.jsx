import React from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

function AuctionItemDetails() {

  const { id } = useParams();

  return (
    <div>
      <Container fluid className="p-3">
        <h1>Auction Item Details ID: {id}</h1>
        <Button>Test</Button>
      </Container>
    </div>
  );
}

export default AuctionItemDetails;
