import { useState } from "react";
import ReactDOM from 'react-dom';
import { useNavigate } from "react-router";

export default function LoginPage() {

    const [inputs, setInputs] = useState({});
    const [isSubmit, setIsubmit] = useState(false);
    const navigate = useNavigate()

    const handleChange = (event) => {
        const name = event.target.name;
        console.log(name);
        const value = event.target.value;
        console.log(value);
        
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        return fetch('https://thewartegh8.herokuapp.com/login',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify(inputs)
        })
        .then((res)=>{
            if(res.ok){
                return res.json()
            }else{
                return new Error('Something wrong')
            }
        })
        .then((data)=>{
            console.log(data);
            localStorage.setItem("access_token", data.access_token)
            navigate('/')
           })
           .catch ((error) =>{
             console.log(error);
           })
    }
    return (
        <div className="col-3" style={{justifyContent:"center", marginTop: "10vh",marginLeft: "40%"}}>
            <div className="card border-primary md-6 mb-3" style={{width: "25rem", height:"40vh"}}>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name="email"
                      value={inputs.email || ""}
                      onChange={handleChange}/>
                    <div id="emailHelp" className ="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1"
                    name="password"
                    value={inputs.password || ""}
                    onChange={handleChange}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            </div>
        </div>
    )
}