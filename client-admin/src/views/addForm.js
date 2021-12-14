import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import ReactDOM from 'react-dom';
import { useNavigate } from "react-router-dom";

import axios from "axios";
export default function FormInput() {
  const dispatch = useDispatch()
const navigate = useNavigate()
    const [inputs, setInputs] = useState({});
    const [isSubmit, setIsubmit] = useState(false);


    const handleChange = (event) => {
        const name = event.target.name;
        console.log(name);
        const value = event.target.value;
        console.log(value);
        
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = async (event) => {
        console.log(inputs);
        event.preventDefault();
        let payload = inputs
        console.log(localStorage.access_token);
        try {
            const posted =  await axios.post('https://quarantine-tr8cker.herokuapp.com/staffs',
           payload,{
             headers: {
                 access_token: localStorage.access_token,
               }
             })
            if(posted){
                console.log(posted);
                navigate('/user/userlists')
            }
        } catch (error) {
            console.log(error.response.data.message, 'masuk error');
        }
        setIsubmit(true)
        // dispatch(addFood(inputs))
    }

    return (
        <div>
        <div className="container">
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
                            <input type="submit" />

                        </div>
                    </div>
                </fieldset>
            </form>
        </div>
        </div>
    )
}