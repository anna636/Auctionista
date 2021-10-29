import React from "react";
import Counter from "../components/Counter"
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useAuctionItem } from "../contexts/AuctionItemContext";
import {
  Button,
  Container,
  Col,
  Row,
  Card,
  Form,
  OverlayTrigger,
  Tooltip,
  Spinner,
} from "react-bootstrap";
import { useBidContext } from "../contexts/BidContext";
import { UserContext } from "../contexts/UserContext";
import CustomModal from "../components/CustomModal";
import { render } from "react-dom";

function AuctionItemDetails() {
  const { id } = useParams();
  const { fetchAuctionItem, auctionItems, fetchItemsInBatch } =
    useAuctionItem();
  const [auctionItem, setAuctionItem] = useState();
  const { postNewBid } = useBidContext();
  const [bid, setBid] = useState("");
  const { currentUser } = useContext(UserContext);
  const [myProp, setMyProp] = useState({});
  const [highestBid, setHighestBid] = useState();

  useEffect(() => {
    getAuctionItem(id);
  }, [id, highestBid]);

  const getAuctionItem = async (auctionItemId) => {
    let fetchedItem = await fetchAuctionItem(auctionItemId);
    setAuctionItem(fetchedItem);
  };

  async function placeBid(e) {
    e.preventDefault();

    if (currentUser === null || currentUser === undefined) {
              setMyProp({
                show: true,
                text: "You must log in to place a bid",
              });
      return
    }

    if (checkBid) {
      let newBid = {
        amount: parseInt(bid),
        time: new Date(),
        user_id: currentUser.id.toString(),
        auctionItem: auctionItem,
      };

      let res = await postNewBid(newBid);
      console.log(res);
      if (res.status === 200) {
        setHighestBid(bid);
        setMyProp({
          show: true,
          text: "Bid placed!"
        });
        setBid("");
        
      }
    } else {
      console.log("Bid too low");
    }
  }

  function checkBid() {
    return bid >= auctionItem.minimumBid ? true : false;
  }

  const pull_data = (data) => {
    console.log(data);
    if (data === false) {
      setMyProp({
        show: false,
        text: "",
      });
    }
  };

  return (
    <div>
      {!auctionItem && (
        <Spinner animation="border" role="status" className="mt-5">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {auctionItem && (
        <Container className="p-5" fluid>
          <Row>
            <Col>
              <h2>{auctionItem.title}</h2>
              <p>{auctionItem.description}</p>
              <Card>
                <Card.Title className="mt-3">
                  Highest bid: {auctionItem.startPrice}{" "}
                  <span>
                    <i class="bi bi-currency-bitcoin"></i>{" "}
                  </span>
                </Card.Title>
                <Card.Body>
                  <Form className="mx-5" onSubmit={placeBid}>
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id="tooltip-top">
                          The minimum bid that can be placed is:{" "}
                          <strong>{auctionItem.minimumBid}</strong>{" "}
                          <span>
                            <i class="bi bi-currency-bitcoin"></i>{" "}
                          </span>
                        </Tooltip>
                      }
                    >
                      <Form.Control
                        size="sm"
                        type="number"
                        max="1000000"
                        min={auctionItem.minimumBid}
                        value={bid}
                        onChange={(e) => setBid(e.target.value)}
                      ></Form.Control>
                    </OverlayTrigger>
                    <Button type="submit" variant="success" className="mt-2">
                      Place bid
                    </Button>
                  </Form>
                  {myProp.show === true && (
                    <div style={{ color: "green" }} className="mt-2">
                      <strong> Your bid: {highestBid} </strong>
                      <span>
                        <i class="bi bi-currency-bitcoin"></i>{" "}
                      </span>
                    </div>
                  )}
                </Card.Body>
                <Card.Footer><div>
                  <Counter dateFrom={auctionItem.deadline}></Counter>
                </div> </Card.Footer>
              </Card>
            </Col>
            <Col>
              <img src={auctionItem.images} alt="" />
            </Col>
          </Row>
          <CustomModal prop={myProp} func={pull_data} />
        </Container>
      )}
    </div>
  );
}

export default AuctionItemDetails;
