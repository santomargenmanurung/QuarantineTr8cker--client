import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import axios from "axios";
export default function FormInput() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    console.log(inputs);
    console.log(localStorage.access_token);
    try {
      const posted = await axios.post(
        "https://quarantine-tr8cker.herokuapp.com/staffs",
        payload,
        {
          headers: {
            access_token: localStorage.access_token,
          },
        }
      );
      if (posted) {
        Swal.fire({
          icon: "success",
          title: `Success add new user `,
          showConfirmButton: false,
          timer: 3000,
        });
        console.log(posted);
        navigate("/user/userlists");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please input data",
      });
      console.log(error.response.data.message, "masuk error");
    }
    setIsubmit(true);
    // dispatch(addFood(inputs))
  };

  return (
    <div className="container" style={{ marginLeft: "29%" }}>
      {/* <div className="container">
            <h1>ADD NEW STAFF</h1>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <div className="row border" style={{ border: "1px" }}>
                        <div className="col-6 border">
                            <div className="form-group">
                                <label className="form-label">Enter Fullname:
                                </label>
                                <br />
                                <input
                                className="form-control"
                                    type="text"
                                    name="name"
                                    value={inputs.name || ""}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Enter Email
                                </label>
                                <br />
                                <input
                                className="form-control"
                                    type="email"
                                    name="email"
                                    value={inputs.email || ""}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Enter Password
                                </label>
                                <br />
                                <input
                                className="form-control"
                                    type="password"
                                    name="password"
                                    value={inputs.password || ""}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Enter PhoneNumber
                                </label>
                                <br />
                                <input
                                className="form-control"
                                    type="text"
                                    name="phoneNumber"
                                    value={inputs.phoneNumber || ""}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Select Role:
                                </label>
                                <br />
                                <select
                                    name="role"
                                    className="form-control"
                                value={inputs.role || "Chose One"} 
                                onChange={handleChange}>
                                    <option disabled value="Chose One">--chose one--</option>
                                    <option value="Admin">Admin</option>
                                    <option value="OfficeAirport">OfficeAirport</option>
                                    <option value="DriverWisma">DriverWisma</option>
                                    <option value="DriveHotel">DriveHotel</option>
                                    <option value="OfficerHotel">OfficerHotel</option>
                                    <option value="OfficerWisma">OfficerWisma</option>
                                    <option value="HealthOfficial">HealthOfficial</option>
                                    <option value="User">User</option>
                                    
                                </select>
                            </div>
                            <br />
                            <button type="submit" style={{marginLeft:5, marginBottom:20}} className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </fieldset>
            </form>
        </div> */}
      <form onSubmit={handleSubmit} style={{ width: "40%" }}>
        <div className="row border" style={{ border: "1px", padding:20, backgroundColor:'white', borderRadius:10}}>
          <h3 style={{color:'blue', marginTop:20, marginBottom:20, fontFamily: 'serif', fontSize:'2.5em'}}>Add Staff</h3>
          <div className="form-group mb-3">
            <label className="form-label">Enter Fullname:</label>
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
          <div className="form-group mb-3">
            <label>Enter Email</label>
            <br />
            <input
              className="form-control"
              style={{height:50}}
              type="email"
              name="email"
              value={inputs.email || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-3">
            <label className="form-label">Enter Password</label>
            <br />
            <input
              className="form-control"
              style={{height:50}}
              type="password"
              name="password"
              value={inputs.password || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-3">
            <label>Enter PhoneNumber</label>
            <br />
            <input
              className="form-control"
              style={{height:50}}
              type="text"
              name="phoneNumber"
              value={inputs.phoneNumber || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-3">
            <label className="form-label">Select Role:</label>
            <br />
            <select
              name="role"
              style={{height:50}}
              className="form-control"
              value={inputs.role || "Chose One"}
              onChange={handleChange}
            >
              <option disabled value="Chose One">
                --chose one--
              </option>
              <option value="Admin">Admin</option>
              <option value="OfficeAirport">Office Airport</option>
              <option value="DriverWisma">Driver Wisma</option>
              <option value="DriverHotel">Driver Hotel</option>
              <option value="OfficerHotel">Officer Hotel</option>
              <option value="OfficerWisma">Officer Wisma</option>
              <option value="HealthOfficial">Health Official</option>
              <option value="User">User</option>
            </select>
          </div>
          <button
            type="submit"
            style={{
              marginLeft: 13,
              marginBottom: 35,
              marginTop: 20,
              width: '95%',
              height: 50
            }}
            className="btn btn-primary"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
