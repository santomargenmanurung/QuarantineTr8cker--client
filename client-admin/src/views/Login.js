import { useState } from "react";
import { useNavigate } from "react-router";
import "../login.css";
import logo from "../assets/8quarantine.jpeg";
import { useSelector, useDispatch } from "react-redux";
import { setLogin } from "../store/actionCreator/HistoriesAction";
import Swal from "sweetalert2";

export default function LoginPage() {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({});
  const [isSubmit, setIsubmit] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    console.log(name);
    const value = event.target.value;
    console.log(value);

    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    return fetch("https://quarantine-tr8cker.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(inputs),
    })
      .then((res) => {
        if (res.ok) {
          Swal.fire({
            icon: "success",
            title: `Welcome `,
            showConfirmButton: false,
            timer: 3000,
          });
          return res.json();
        } else {
          throw new Error("Invalid email or password");
        }
      })
      .then((data) => {
        console.log(data);
        if (data.role !== "Admin") {
          throw new Error("Only role Admin can access CMS");
        } else {
          localStorage.setItem("access_token", data.access_token);
          dispatch(setLogin(true));
          navigate("/");
          window.location.reload();
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error,
        });
        console.log(error);
      });
  };
  return (
    <div className="container">
      <div>
        <img src={logo} className="myFlexedImage"></img>
      </div>
      <div>
        <h3 className="h2Cms">CMS LOGIN</h3>
      </div>
      <div>
        <form className="login" onSubmit={handleSubmit}>
          <input
            type="email"
            id="exampleInputEmail1"
            placeholder="Input Email"
            name="email"
            value={inputs.email || ""}
            onChange={handleChange}
          />
          <input
            type="password"
            id="exampleInputPassword1"
            placeholder="Input Password"
            name="password"
            value={inputs.password || ""}
            onChange={handleChange}
          />
          <button>Login</button>
        </form>
      </div>
    </div>
    // <div className="col-3" style={{justifyContent:"center", marginTop: "10vh",marginLeft: "40%"}}>
    //     <div className="card border-primary md-6 mb-3" style={{width: "25rem", height:"40vh"}}>
    //     <form onSubmit={handleSubmit}>
    //         <div className="mb-3">
    //             <label for="exampleInputEmail1" className="form-label">Email address</label>
    //
    //             <div id="emailHelp" className ="form-text">We'll never share your email with anyone else.</div>
    //         </div>
    //         <div className="mb-3">
    //             <label for="exampleInputPassword1" className="form-label">Password</label>

    //         </div>
    //         <button type="submit" className="btn btn-primary">Submit</button>
    //     </form>
    //     </div>
    // </div>
  );
}
