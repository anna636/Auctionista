import { useState, useContext } from "react";
import FileUpload from "../components/FileUpload";
import { useAuctionItem } from "../contexts/AuctionItemContext";
import TooltipHelp from "../components/TooltipHelp";
import { UserContext } from "../contexts/UserContext";

import CustomModal from "../components/CustomModal";

function CreateNewListing() {
  const { postNewAuctionItem } = useAuctionItem();
  const { getCurrentUser, currentUser } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [reservationPrice, setReservationPrice] = useState(0);
  const [startPrice, setStartPrice] = useState(0);
  const [imgString, setImgString] = useState("");
  const [indexOfPrimaryImg, setIndexOfPrimaryImg] = useState(0);
  const [myProp, setMyProp] = useState({});

  function isNumber(n) {
    return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
  }

  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    result.setHours(result.getHours());
    return result;
  }

  const pull_data = (data) => {
    console.log(data);
    if (data === false) {
      setMyProp({
        show: false,
      });
    }
  };

  const getChildData = (imgPaths, indexOfPrimaryImg) => {
    //console.log("img paths are" + imgPaths + "and index of primary img is " + indexOfPrimaryImg);
    setIndexOfPrimaryImg(indexOfPrimaryImg);
    let arrayOfStrings = [];
    for (let path of imgPaths) {
      let pathToSave = path;
      arrayOfStrings.push(pathToSave);
    }
    setImgString(arrayOfStrings.toString());
  };

  async function postNewItem() {


    if (
      !isNumber(reservationPrice) ||
      !isNumber(startPrice) ||
      title === "" ||
      description === "" ||
      !reservationPrice > 0 || imgString.split(",")[0]==="" || reservationPrice < 0 || startPrice < 0
    )
    {
      setMyProp({ show: true, text: "Invalid data, please try again" });
  
      
   
    }
    
    else {
      const itemToPost = {
        title: title,
        description: description,
        reservationPrice: reservationPrice,
        startPrice: startPrice,
        deadline: addDays(new Date(), 3),
        images: imgString,
        primaryImgIndex: indexOfPrimaryImg,
        sold: false,
        minimumBid: Math.round((110 / 100) * startPrice),
        owner: {
          id: getCurrentUser().id,
          fullName: getCurrentUser().fullName,
          username: getCurrentUser().username,
          email: getCurrentUser().email,
        },
      };

      let res = await postNewAuctionItem(itemToPost);

      if (res.status === 200) {
        setTitle("");
        setDescription("");
        setReservationPrice(0);
        setStartPrice(0);

        setMyProp({
          show: true,
          colour: "green",
          text: "Your item has been published",
          footerText:
            "Our little team of developer chickens is grateful for using our website 🎉",
        });
      } else {
        setMyProp({
          show: true,
          text: "Something went wrong, try again later",
        });
      }
    }
  }

  return (
    <div className="newListingWrapper" style={styles.wrapper}>
      <div className="form" style={styles.form}>
        <div className="tooltipWrapper" style={styles.tooltipWrapper}>
          <TooltipHelp />
        </div>
        <div className="inputs" style={styles.inputs}>
          <div style={styles.inputInside} className="inputInside">
            <label htmlFor="">Title</label>
            <input
              type="text"
              style={styles.input}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxlength="60"
            />
          </div>

          <div style={styles.inputInside} className="inputInside">
            <label htmlFor="">Reservation price</label>
            <input
              type="number"
              style={styles.input}
              value={reservationPrice}
              onChange={(e) => setReservationPrice(e.target.value)}
            />
          </div>

          <div style={styles.inputInside} className="inputInside">
            <label htmlFor="">Start price</label>
            <input
              type="number"
              style={styles.input}
              value={startPrice}
              onChange={(e) => setStartPrice(e.target.value)}
            />
          </div>

          <div style={styles.inputInside} className="inputInside">
            <label htmlFor="">Upload images and choose primary picture</label>

            <FileUpload func={getChildData} />
          </div>
          <div style={styles.inputInside} className="inputInside">
            <label htmlFor="">Description</label>
            <textarea
              name="description"
              id=""
              cols="30"
              rows="5"
              style={styles.textArea}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxlength="500"
            ></textarea>
          </div>
        </div>
        <div className="submitBtn">
          <button
            className="postNewListing"
            style={styles.btn}
            onClick={postNewItem}
          >
            Post
          </button>
        </div>
      </div>
      <div className="coolImg">
        <img
          src="https://images.pexels.com/photos/10105932/pexels-photo-10105932.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt=""
          style={styles.coolImg}
        />
        <div className="textIngImg" style={styles.textInImg}>
          <p> Moo may represent an idea, but only the cow knows</p>
          <p>
            <span>- Mason Cooley </span>
          </p>
        </div>
      </div>
      <CustomModal prop={myProp} func={pull_data} />
    </div>
  );
}

export default CreateNewListing;

const styles = {
  wrapper: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "80% 20%",
  },
  coolImg: {
    width:"100%",
    height: "980px",
  },

  textInImg: {
    textAlign: "left",
    position: "absolute",
    top: "1vh",
    padding: "5vh 5vh 0 1vh",
    color: "white",
   fontFamily: "Georgia, serif"
  },
  form: {
    width: "100%",
    backgroundColor: "rgb(226, 89, 55)",
    display: "flex",
    flexDirection: "column",
    padding: "2vh 5vw 2vh 5vw",
    gap: "15vh",
  },
  inputs: {
    backgroundColor: "rgb(226, 89, 55)",
    borderRaidus: "30%",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    gap: "8vh",
    color: "white",
  },

  input: {
    borderWidth: "0 0 1px 0" /* top right bottom left */,
    borderStyle: "none none solid none",
    borderColor: "#f00 #0f0 white #ff0",
    backgroundColor: "rgb(226, 89, 55)",
    color: "white",
    width: "100%",
  },

  inputInside: {
    display: "grid",
    gridTemplateColumns: "15vw 35vw",
    gap: "2vh",
    justifyContent: "center",
    width: "100%",
    textAlign: "left",
    fontSize: "1.1em",
  },

  textArea: {
    borderRaidus: "20%",
    border: "none",
  },
  btn: {
    border: "none",
    borderRadius: "10px",
    padding: "0.5vw",
    fontSize: "1.2em",
    backgroundColor: "black",
    color: "white",
    width: "10vw",
  },
  tooltipWrapper: {
    height: "2vh",
    display: "flex",
    alignItems: "left",
  },
};
