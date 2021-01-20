import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Row from "../../components/row/Row";
import UploadFile from "./UploadFile";

const Home = () => {
  const [state, setState] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    details: "",
  });
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/colonies")
      .then((data) => {
        setState(data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <div className="App">
      <h1>Add colony</h1>
      <input
        type="text"
        value={formData.name}
        placeholder="कॉलोनी का नाम"
        onChange={(e) => {
          setFormData({ ...formData, name: e.target.value });
        }}
      />
      <br />
      <input
        type="text"
        value={formData.details}
        placeholder="विस्तार"
        onChange={(e) => {
          setFormData({ ...formData, details: e.target.value });
        }}
      />
      <br />
      <button
        onClick={() => {
          axios
            .post("http://localhost:3001/api/colonies/", { ...formData })
            .then((data) => {
              axios.get("http://localhost:3001/api/colonies").then((data) => {
                setState(data.data);
                setFormData({
                  name: "",
                  details: "",
                });
              });
            })
            .catch((e) => {
              console.log(e);
            });
        }}
      >
        Add
      </button>
      <h1>Colony List</h1>
      <Row
        cols={["कॉलोनी का नाम", "विस्तार", "नक्शा", "प्लॉट देखें"]}
        heading
      ></Row>
      {state.map((colony) => {
        return (
          <Row
            cols={[
              colony.name,
              colony.details,
              colony.map ? (
                <a href={`http://localhost:3001/maps/${colony.map}`}>
                  <img
                    src={`http://localhost:3001/maps/${colony.map}`}
                    height="60px"
                    width="100px"
                    alt={colony.map}
                  />
                </a>
              ) : (
                <>
                  <UploadFile id={colony.id} setState={setState}></UploadFile>
                </>
              ),
              <Link to={`/colony/${colony.id}`}>
                <button>Open</button>
              </Link>,
            ]}
          ></Row>
        );
      })}
    </div>
  );
};

export default Home;
