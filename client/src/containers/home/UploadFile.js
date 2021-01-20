import axios from "axios";
import { useState } from "react";

const UploadFile = ({ id, setState }) => {
  const [file, setFile] = useState(null);
  const uploadFile = () => {
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post(`http://localhost:3001/api/colonies/map?id=${id}`, formData)
      .then((data) => {
        axios
          .get("http://localhost:3001/api/colonies")
          .then((data) => {
            setState(data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      <input
        type="file"
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
      />
      <button onClick={uploadFile}>Upload</button>
    </>
  );
};

export default UploadFile;
