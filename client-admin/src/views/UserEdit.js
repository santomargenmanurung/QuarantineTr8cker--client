import { useSelector, useDispatch } from 'react-redux'
import ReactDOM from 'react-dom';
import { useParams, useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import { baseUrl } from '../store/helper/url';
import axios from 'axios';

export default function UserEdit() {
    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [inputs, setInputs] = useState({
        name:"",
        email:"",
        phoneNumber:"",
        status:"",
        role:""
    });
    const [isSubmit, setIsubmit] = useState(false);


    const handleChange = (event) => {
        const name = event.target.name;
        // console.log(name);
        const value = event.target.value;
        // console.log(value);
        
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = async (event) => {
        console.log(inputs);
        event.preventDefault();
        let payload = inputs
        console.log(localStorage.access_token);
        try {
            const posted =  await axios.put(`https://quarantine-tr8cker.herokuapp.com/staffs/${params.id}`,
           payload,{
             headers: {
                 access_token: localStorage.access_token,
               }
             })
            if(posted){
                console.log(posted);
                navigate('/user/userLists')
            }
        } catch (error) {
            console.log(error.response.data.message, 'masuk error');
        }
        setIsubmit(true)
        // dispatch(addFood(inputs))
    }

    useEffect(() => {
        fetch(`${baseUrl}/users/${params.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            access_token: localStorage.access_token,
          }
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json();
          })
          .then((data) => {
            setInputs({
                name:data.name,
                email:data.email,
                phoneNumber:data.phoneNumber,
                status:data.status,
                role:data.role
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);
    return (
        <div>
         <h1>Edit Page</h1>
         <div>
        <div className="container">
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <div className="row border" style={{ border: "1px" }}>
                        <div className="col-6 border">
                            <div className="form-group">
                                <label className="form-label"> Fullname
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
                                <label> Email
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
                                <label> PhoneNumber
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
                                    <option value="OfficerAirport">OfficerAirport</option>
                                    <option value="DriverWisma">DriverWisma</option>
                                    <option value="DriveHotel">DriveHotel</option>
                                    <option value="OfficerHotel">OfficerHotel</option>
                                    <option value="OfficerWisma">OfficerWisma</option>
                                    <option value="HealthOfficial">HealthOfficial</option>
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
        </div>
    )
}