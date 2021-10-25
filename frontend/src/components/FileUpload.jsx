import React, { useState } from "react";

function FileUpload() {
  const [imgPaths, setImgPaths] = useState([]);

  async function onFileLoad(e) {
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
      console.log(filePaths);

      setImgPaths(filePaths);

      e.target.value = "";
     }
    
  }

  return (
    <div>
      <input type="file" accept="image/*" multiple onChange={onFileLoad} />
      <div className="renderedImgs" style={styles.renderedImgs}>
        {imgPaths.length > 0 ? imgPaths.map((img) => <img src={img} style={styles.img }/>) : null}
      </div>
    </div>
  );
}

export default FileUpload;

const styles = {
  img: {
    width: "10vw",
    height:"20vh"
    
  },

  renderedImgs: {
    display: "flex",
    flexDirection: "row",
    gap: "1vw",
   paddingTop:"2vh"
  }
}