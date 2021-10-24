import React, { useState } from "react";

function FileUpload() {
  const [imgPaths, setImgPaths] = useState("");
  const [primaryImgIndex, setPrimaryImgIndex]=useState(0)

  async function onFileLoad(e) {
    let files = e.target.files;

    let formData = new FormData();
    for (let file of files) {
      formData.append("files", file, file.name);
    }

    if (files.length > 3) {
     alert("too many files")
      e.target.value = "";
      return
    }
    else {
       let res = await fetch("/api/upload", {
         method: "POST",
         body: formData,
       });

       let filePaths = await res.json();
       setImgPaths(filePaths);
       

       e.target.value = "";
    }

   
  }

  function getPrimaryImg(e) {
    e.stopPropagation();
    const primary = e.target.src.split('3000')[1]
    
    console.log(imgPaths)


    for (let img of imgPaths) {
      if (img === primary) {

        setPrimaryImgIndex(imgPaths.indexOf(img))
        console.log(imgPaths.indexOf(img));
      }
    }
    
  }

  return (
    <div>
      <input type="file" accept="image/*" multiple onChange={onFileLoad} />
      <p>Set the primary picture</p>
      <div className="imgWrapper" style={styles.imgWrapper}>
        {imgPaths.length > 0
          ? imgPaths.map((img) => (
              <>
                <div>
                  <img
                    src={img}
                    alt=""
                    style={primaryImgIndex == imgPaths.indexOf(img) ? styles.primaryImg : styles.notPrimaryImg}
                    onClick={getPrimaryImg}
                  />
                </div>
              </>
            ))
          : null}
      </div>
    </div>
  );
}

export default FileUpload;


const styles = {
  primaryImg: {
    width: "15vw",
    height: "25vh",
    boxShadow: "0px 0px 8px 2px RGB(104,0,255)",
  },

  notPrimaryImg: {
    width: "15vw",
    height: "25vh",
  },
  imgWrapper: {
    width: "100%",
    height: "25%",
    display: "flex",
    flexDirection: "row",
    gap: "4vw",
    justifyContent: "center",
  },
};