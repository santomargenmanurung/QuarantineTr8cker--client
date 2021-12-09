import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import ReactDOM from 'react-dom';
// import { addFood } from "../store/actionCreator/action";
import _ from "lodash"

export default function FormInput() {
  const dispatch = useDispatch()

    const [inputs, setInputs] = useState({});
    const [isSubmit, setIsubmit] = useState(false);


    const handleChange = (event) => {
        const name = event.target.name;
        // console.log(name);
        const value = event.target.value;
        // console.log(value);
        
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        console.log(inputs.ingridients);
        event.preventDefault();
        if(!_.isEmpty(inputs.ingridients)){
            inputs.ingridients = inputs.ingridients.split(",").map((value)=>{
                return value.trim() 
            })
            console.log(inputs.ingridients);
        }
        setIsubmit(true)
        // dispatch(addFood(inputs))
    }

    return (
        <div>
        <div className="container">
            <h1>ADD NEW USER</h1>
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
                                    name="phone"
                                    value={inputs.phone || ""}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Select Role:
                                </label>
                                <br />
                                <select
                                    name="category"
                                
                                value={inputs.category || "Chose One"} 
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
                            <input type="submit" disabled={isSubmit}/>

                        </div>
                    </div>
                </fieldset>
            </form>
        </div>
        </div>
    )
}