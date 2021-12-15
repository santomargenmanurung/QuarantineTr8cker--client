import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
// import { addFood } from "../store/actionCreator/action";
import axios, { Axios } from "axios";
import Swal from "sweetalert2";

export default function FormInput() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const [isSubmit, setIsubmit] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    console.log(name);
    const value = event.target.value;
    console.log(value);

    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    console.log(inputs);
    event.preventDefault();
    let payload = inputs;
    console.log(localStorage.access_token);
    try {
      const posted = await axios.post(
        "https://quarantine-tr8cker.herokuapp.com/locations",
        payload,
        {
          headers: {
            access_token: localStorage.access_token,
          },
        }
      );
      if (posted) {
        console.log(posted);
        navigate("/locations");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please input data",
      });
      console.log(error, "masuk error");
    }
    setIsubmit(true);
    // dispatch(addFood(inputs))
  };

  return (
    <div className="container" style={{ marginLeft: "29%", marginTop:30 }}>
      <form onSubmit={handleSubmit} style={{ width: "40%" }}>
        <div
          className="row border"
          style={{
            border: "1px",
            padding: 20,
            backgroundColor: "white",
            borderRadius: 10,
          }}
        >
          <h3 style={{ color: "blue", marginTop: 20, marginBottom: 20 }}>
            Add Location
          </h3>
          <div className="form-group mb-3">
            <div className="form-group">
              <label className="form-label"> Location Name:</label>
              <br />
              <input
              className="form-control"
              style={{height:50}}
                type="text"
                name="name"
                value={inputs.name || ""}
                onChange={handleChange}
              />
            </div>
            <br/>
            <div className="form-group">
              <label>Address</label>
              <br />
              <input
              className="form-control"
              style={{height:50}}
                type="text"
                name="address"
                value={inputs.address || ""}
                onChange={handleChange}
              />
            </div>
            <br/>
            <div className="form-group">
              <label className="form-label">Select Type:</label>
              <br />
              <select
              className="form-control"
              style={{height:50}}
                name="type"
                value={inputs.type || "Chose One"}
                onChange={handleChange}
              >
                <option disabled value="Chose One">
                  --chose one--
                </option>
                <option value="Wisma">Wisma</option>
                <option value="Hotel">Hotel</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            style={{
              marginLeft: 13,
              marginBottom: 35,
              marginTop: 20,
              width: "95%",
              height: 50,
            }}
            className="btn btn-primary"
          >
            Submit
          </button>
        </div>
      </form>
    </div>

    // <div>
    // <div className="container">
    //     <h1>ADD NEW LOCATON</h1>
    //     <form onSubmit={handleSubmit}>
    //         <fieldset>
    //             <div className="row border" style={{ border: "1px" }}>
    //                 <div className="col-6 border">
    // <div className="form-group">
    //     <label className="form-label"> Location Name:
    //     </label>
    //     <br />
    //     <input
    //         type="text"
    //         name="name"
    //         value={inputs.name || ""}
    //         onChange={handleChange}
    //     />
    // </div>
    // <div className="form-group">
    //     <label>Address
    //     </label>
    //     <br />
    //     <input
    //         type="text"
    //         name="address"
    //         value={inputs.address || ""}
    //         onChange={handleChange}
    //     />
    // </div>

    // <div className="form-group">
    //     <label className="form-label">Select Type:
    //     </label>
    //     <br />
    //     <select
    //         name="type"

    //     value={inputs.type || "Chose One"}
    //     onChange={handleChange}>
    //         <option disabled value="Chose One">--chose one--</option>
    //         <option value="Wisma">Wisma</option>
    //         <option value="Hotel">Hotel</option>
    //     </select>
    // </div>
    //                     <br />
    //                     <input type="submit" />
    //                 </div>
    //             </div>
    //         </fieldset>
    //     </form>
    // </div>
    // </div>
  );
}
