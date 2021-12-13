import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import ReactDOM from 'react-dom';
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableDataCell, CTableBody, CInputGroup, CFormInput ,CInputGroupText,CButton} from "@coreui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchLocations } from "../store/actionCreator/LocationsAction";
export default function Locations() {
    let navigate = useNavigate()
    const { locations, isLoading } = useSelector((state) => state.locationReducer);
    const dispatch = useDispatch();
    console.log(locations,'ini location');
    useEffect(() => {
      dispatch(fetchLocations());
    }, []);
    return (
        <div>
            <CInputGroup className="mb-3">
                    <CFormInput placeholder="Search by name location.." aria-label="Recipient's username" aria-describedby="basic-addon2" />
                    <CInputGroupText id="basic-addon2">search</CInputGroupText>
                </CInputGroup>
            <div>
            <CButton onClick={()=>{
                navigate("/addLocation")
            }} color="secondary">Add New Location</CButton>
            </div>
            <div>
                <CTable striped>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell scope="col">No</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Name Location</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Address</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Type</CTableHeaderCell>
                    
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {
                            locations.map((location,i)=>{
                                return(
                                    <CTableRow key={location.id}>
                                    <CTableHeaderCell scope="row">{i+1}</CTableHeaderCell>
                                    <CTableDataCell>{location.name}</CTableDataCell>
                                    <CTableDataCell>{location.address}</CTableDataCell>
                                    <CTableDataCell>{location.type}</CTableDataCell>
                                </CTableRow>
                                )
                            })
                        }
                    </CTableBody>
                </CTable>
            </div>
        </div>
    )
}