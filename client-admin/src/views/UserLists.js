import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import ReactDOM from 'react-dom';
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableDataCell, CTableBody, CInputGroup, CFormInput, CInputGroupText,CButton } from "@coreui/react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchUser } from "../store/actionCreator/UserAction";
export default function UserLists() {
    const dispatch= useDispatch()
    const {users} = useSelector((state)=>
        state.userReducer
    )
    useEffect(()=>{
        dispatch(fetchUser())
    },[])
    console.log(users);
    let navigate = useNavigate()
    return (
        <div>
            <div>
                <CInputGroup className="mb-3">
                    <CFormInput placeholder="Search by username.." aria-label="Recipient's username" aria-describedby="basic-addon2" />
                    <CInputGroupText id="basic-addon2">search</CInputGroupText>
                </CInputGroup>
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
                        {users.map((user, i)=>{
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