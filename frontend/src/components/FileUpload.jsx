import React, { useState } from "react";

function FileUpload() {
  const [preview, setPreview] = useState("");

  async function onFileLoad(e) {
    let files = e.target.files;

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

    setPreview(filePaths[0]);

    e.target.value = "";
  }

  return (
    <div>
      <input type="file" accept="image/*" multiple onChange={onFileLoad} />
      <img src={preview} alt="" />
    </div>
  );
}

export default FileUpload;
