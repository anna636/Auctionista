import React, { useState } from "react";
import { useAuctionItem } from "../contexts/AuctionItemContext";

function FileUpload(props) {
  
  
  const [imgPaths, setImgPaths] = useState([]);
  const [primaryImgIndex, setPrimaryImgIndex]=useState(0)
  const { setPrimaryImgPath } = useAuctionItem()
  props.func(imgPaths, primaryImgIndex);

  async function onFileLoad(e) {
    setPrimaryImgIndex(0)
    let files = e.target.files;
    if (files.length > 3) {
      console.log("too mcuh!")
       e.target.value = "";
    }

    else {
      let formData = new FormData();
      for (let file of files) {
        formData.append("files", file, file.name);
      }

      let res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      let filePaths = await res.json();
      

      setImgPaths(filePaths);
      

      e.target.value = "";
      
     }
    
  }

  function setPrimaryImg(e) {
    e.stopPropagation()
    let choosenImg = e.target.src.split("3000")[1]
    let indexOfChoosenImg = imgPaths.indexOf(choosenImg)
    setPrimaryImgIndex(indexOfChoosenImg);
    setPrimaryImgPath(choosenImg)
  
  }

  return (
    <div>
      <input type="file" accept="image/*" multiple onChange={onFileLoad} />
      <div className="renderedImgs" style={styles.renderedImgs}>
        {imgPaths.length > 0 ? imgPaths.map((img) => <img src={img} onClick={setPrimaryImg}
        style={primaryImgIndex == imgPaths.indexOf(img) ? styles.primaryImg : styles.img}
        />) : null}
      </div>
    </div>
  );
}

export default FileUpload;

const styles = {
  img: {
    width: "10vw",
    height: "20vh",
    borderRadius: "10px",
  },

  renderedImgs: {
    display: "flex",
    flexDirection: "row",
    gap: "1vw",
    paddingTop: "2vh",
  },

  primaryImg: {
    boxShadow: "0px 0px 8px 2px RGB(104,0,255)",
    width: "10vw",
    height: "20vh",
    transform: "scale(1.1)",
    transition: "all .2s ease-in-out",
    borderRadius: "5px",
  },
};