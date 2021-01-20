import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Row from "../../components/row/Row";
import AddColonyForm from "./AddColonyForm";
const Colony = () => {
  const [formData, setFormData] = useState({
    area: "",
    colonyId: "",
    id: "",
    owner: "",
    phoneNumber: "",
    plotNumber: "",
    price: "",
  });
  const [plots, setPlots] = useState([]);
  const { id } = useParams();
  const addPlot = () => {
    axios
      .post("http://localhost:3001/api/plots", {
        ...formData,
        colonyId: id,
        available: true,
      })
      .then((data) => {
        setFormData({
          area: "",
          colonyId: "",
          id: "",
          owner: "",
          phoneNumber: "",
          plotNumber: "",
          price: "",
        });
        axios
          .get(`http://localhost:3001/api/plots?id=${id}`)
          .then((data) => {
            setPlots(data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/plots?id=${id}`)
      .then((data) => {
        setPlots(data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div>
      <Link to="/">Colony list</Link>
      <div>
        <h1>Add plot</h1>
        <AddColonyForm
          formData={formData}
          setFormData={setFormData}
          addPlot={addPlot}
        ></AddColonyForm>
      </div>
      <h1>Plot List</h1>
      <Row
        cols={[
          "प्लॉट नंबर",
          "मालिक",
          "फ़ोन नंबर",
          "Area/क्षेत्र",
          "कीमत",
          "उपलब्ध",
        ]}
        heading
      ></Row>
      {plots.map((plot) => {
        return (
          <Row
            cols={[
              plot.plotNumber,
              plot.owner,
              plot.phoneNumber,
              plot.area,
              plot.price,
              "yes",
            ]}
          ></Row>
        );
      })}
    </div>
  );
};

export default Colony;
