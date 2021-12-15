import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import ReactDOM from 'react-dom';
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableDataCell, CTableBody, CInputGroup, CFormInput ,CInputGroupText,CButton} from "@coreui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchLocations } from "../store/actionCreator/LocationsAction";
import ContentLoading from "../components/Loading";
import logo from '../assets/loading-buffering.gif'


export default function Locations() {
    const [inputs, setInputs] = useState({});
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
        dispatch(fetchLocations(payload));
        // setInputs({inputs : ''})
    }
    let navigate = useNavigate()
    const { locations, isLoading } = useSelector((state) => state.locationReducer);
    const dispatch = useDispatch();
    console.log(locations,'ini location');
    useEffect(() => {
      dispatch(fetchLocations());
    }, []);
    return (
        <div>
            <div>
        <h1 style={{marginBottom:20, fontFamily:'monospace'}}>Location Table</h1>
            <CButton onClick={()=>{
                navigate("/addLocation")
            }} className="btn btn-primary" style={{height:50}}>New Location</CButton>
            </div>
            <br/>
            <div>
                <CTable style={{backgroundColor:'white', borderRadius:10}}>
                    <CTableHead>
                        <CTableRow style={{height:70}}>
                            <CTableHeaderCell style={{textAlign:'center'}}  scope="col">No</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Name Location</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Address</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Type</CTableHeaderCell>
                    
                        </CTableRow>
                    </CTableHead>
                    { isLoading? <img src={logo} style={{marginLeft:'80%'}}/>:
                    <CTableBody>
                            {locations.map((location,i)=>{
                                return(
                                    <CTableRow key={location.id}>
                                    <CTableHeaderCell style={{textAlign:'center'}}  scope="row">{i+1}</CTableHeaderCell>
                                    <CTableDataCell>{location.name}</CTableDataCell>
                                    <CTableDataCell>{location.address}</CTableDataCell>
                                    <CTableDataCell>{location.type}</CTableDataCell>
                                </CTableRow>
                                )
                            })
                        }
                    </CTableBody>
                    }
                </CTable>
            </div>
        </div>
    )
}