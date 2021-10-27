import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuctionItem } from "../contexts/AuctionItemContext";
import { Button, Container, Col, Row, Card, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import Counter from "../components/Counter"


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
      {!auctionItem && <h1>Auction item not found</h1>}
      {auctionItem && (
        <Container className="p-5" fluid>
          <Row>
            <Col>
              <h2>{auctionItem.title}</h2>
              <p>{auctionItem.description}</p>
              <Card>
                <Card.Title className="mt-3">Highest bid: (#currentBid) </Card.Title>
                <Card.Body>
                  <Form className="mx-5">
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id="tooltip-top">
                          The minimum bid that can be placed is:
                          (#currentBid*1.10)
                        </Tooltip>
                      }
                    >
                      <Form.Control size="sm" type="number"></Form.Control>
                    </OverlayTrigger>
                    <Button variant="success" className="mt-1">
                      Place bid
                    </Button>
                  </Form>
                </Card.Body>
                <Card.Footer>Time left: <Counter dateFrom={auctionItem.deadline}></Counter> </Card.Footer>
              </Card>
            </Col>
            <Col>
              <h2>Image</h2>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default AuctionItemDetails;
