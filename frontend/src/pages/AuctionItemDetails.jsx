import React from "react";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useAuctionItem } from "../contexts/AuctionItemContext";
import { Button, Container, Col, Row, Card, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useBidContext } from "../contexts/BidContext";
import { UserContext } from "../contexts/UserContext"

function AuctionItemDetails() {
  const { id } = useParams();
  const { fetchAuctionItem } = useAuctionItem();
  const [auctionItem, setAuctionItem] = useState();
  const { postNewBid } = useBidContext();
  const [bid, setBid] = useState('');
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    getAuctionItem(id);
  }, [id]);

  // useEffect(() => {
  //   getBids(auctionItem);
  // }, [id])

  const getAuctionItem = async (auctionItemId) => {
    let fetchedItem = await fetchAuctionItem(auctionItemId);
    setAuctionItem(fetchedItem);
  };

  async function placeBid(e) {
    e.preventDefault();

    let newBid = {
      "amount": parseInt(bid),
      "time": null,
      "user_id": currentUser.id.toString(),
      "auctionItem": auctionItem,
      
    }
    let res = await postNewBid(newBid)
    console.log(res)
    
  }

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
                  <Form className="mx-5" onSubmit={placeBid}>
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id="tooltip-top">
                          The minimum bid that can be placed is:
                          (#currentBid*1.10)
                        </Tooltip>
                      }
                    >
                      <Form.Control size="sm" type="number" max="1000000" value={bid} onChange={e => setBid(e.target.value)}></Form.Control>
                    </OverlayTrigger>
                    <Button type="submit" variant="success" className="mt-2">
                      Place bid
                    </Button>
                  </Form>
                </Card.Body>
                <Card.Footer>Time left: (#timeLeft) </Card.Footer>
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
