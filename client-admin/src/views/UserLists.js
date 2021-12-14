import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import ReactDOM from 'react-dom';
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableDataCell, CTableBody, CInputGroup, CFormInput, CInputGroupText,CButton } from "@coreui/react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchUser } from "../store/actionCreator/UserAction";
import ContentLoading from "../components/Loading";

export default function UserLists() {
    const [inputs, setInputs] = useState({});
    const dispatch= useDispatch()
    const {users, isLoading} = useSelector((state)=>
        state.userReducer
    )

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
        console.log(payload, 'payloooad');
        dispatch(fetchUser(payload));
        // setInputs({inputs : ''})
    }
    useEffect(()=>{
        dispatch(fetchUser())
    },[])
    console.log(users);
    let navigate = useNavigate()
    return (
        <div>
            <div>
          
            <form onSubmit={handleSubmit}>
                    <input
                        placeholder="search by role"
                        type="text"
                        name="role"
                        value={inputs.role || ""}
                        onChange={handleChange}
                    />
                    <input type="submit" placeholder="search by role" />
                </form >

            </div>
            <div>
                <CTable striped>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell scope="col">No</CTableHeaderCell>
                            <CTableHeaderCell scope="col">User</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Role</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {isLoading?<ContentLoading/>:users.map((user, i)=>{
                            if(user.role !== "User"){
                                return(
                                    <CTableRow key={user.id}>
                                    <CTableHeaderCell scope="row">{i+1}</CTableHeaderCell>
                                    <CTableDataCell>{user.email}</CTableDataCell>
                                    <CTableDataCell>{user.role}</CTableDataCell>
                                    <CTableDataCell> <CButton onClick={() => { navigate(`/user/editUser/${user.id}`)
                                    }} color="secondary">Edit</CButton>  
                                    </CTableDataCell>
                                </CTableRow> 
                                )
                            }
                        })}
                    </CTableBody>
                </CTable>
            </div>
        </div>
    )
                     
}