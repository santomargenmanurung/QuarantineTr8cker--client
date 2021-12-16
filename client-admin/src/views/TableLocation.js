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
        <a style={{marginBottom:20, fontFamily:'monospace', fontSize:'2.5em'}}>Locations Table</a>
            <CButton onClick={()=>{
                navigate("/addLocation")
            }} className="btn btn-primary" style={{height:40, marginLeft:20, marginBottom:15}}>Add Location</CButton>
            </div>
            <br/>
            <div>
            { isLoading? <img src={logo} style={{ marginLeft: '40%', marginTop:'10%' }}/>: (
                <CTable style={{backgroundColor:'white', borderRadius:10}}>
                    <CTableHead>
                        <CTableRow style={{height:70, verticalAlign:'middle'}}>
                            <CTableHeaderCell style={{textAlign:'center', width: 100, fontSize:'1.3em'}}  scope="col">No</CTableHeaderCell>
                            <CTableHeaderCell style={{fontSize:'1.3em'}} scope="col">Name Location</CTableHeaderCell>
                            <CTableHeaderCell style={{fontSize:'1.3em'}} scope="col">Address</CTableHeaderCell>
                            <CTableHeaderCell style={{fontSize:'1.3em'}} scope="col">Type</CTableHeaderCell>
                    
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                            {locations.map((location,i)=>{
                                return(
                                    <CTableRow key={location.id}style={{height:50}} >
                                    <CTableHeaderCell style={{textAlign:'center'}}  scope="row">{i+1}</CTableHeaderCell>
                                    <CTableDataCell>{location.name}</CTableDataCell>
                                    <CTableDataCell>{location.address}</CTableDataCell>
                                    <CTableDataCell>{location.type}</CTableDataCell>
                                </CTableRow>
                                )
                            })
                        }
                    </CTableBody>
                </CTable>
            )}
            </div>
        </div>
    )
}