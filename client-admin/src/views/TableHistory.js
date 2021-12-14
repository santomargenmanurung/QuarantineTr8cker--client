import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import ReactDOM from 'react-dom';
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableDataCell, CTableBody, CInputGroup, CFormInput, CInputGroupText } from "@coreui/react";
import { fetchHistories } from "../store/actionCreator/HistoriesAction";
import { useEffect } from "react";
import Swal from "sweetalert2";
import logo from '../assets/8quarantine.jpeg'
import ContentLoading from "../components/Loading";
export default function LogHistory() {
    const [inputs, setInputs] = useState({});
    const [isSubmit, setIsubmit] = useState(false);
    const { histories, isLoading } = useSelector((state) => state.historiesReducer);
    const dispatch = useDispatch();
console.log(isLoading,'ini loading');
console.log(histories,'ini histores');


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
        dispatch(fetchHistories(payload));
        // setInputs({inputs : ''})
    }
    useEffect(() => {
        dispatch(fetchHistories());
    }, []);


    function date(input) {
        return (`${input.toLocaleString('id-ID').split('T')[0]}, @${input.split('T')[1].slice(0, 8)}`)
    }
    return (
        <div>
            <div>

                <form onSubmit={handleSubmit}>
                    <input
                        placeholder="search by email"
                        type="text"
                        name="email"
                        value={inputs.email || ""}
                        onChange={handleChange}
                    />
                    <input type="submit" placeholder="search by email" />
                </form >

            </div>
            <div>
                <CTable striped>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell scope="col">No</CTableHeaderCell>
                            <CTableHeaderCell scope="col">User</CTableHeaderCell>
                            <CTableHeaderCell scope="col">UpdatedBy</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Updated On</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {isLoading?<ContentLoading/>:histories.map((history, i) => {
                                return (
                                    <CTableRow key={history.id}>
                                        <CTableHeaderCell scope="row">{i + 1}</CTableHeaderCell>
                                        <CTableDataCell>{history.updatedUser?.email}</CTableDataCell>
                                        <CTableDataCell>{history.updater?.email}</CTableDataCell>
                                        <CTableDataCell>{history.description}</CTableDataCell>
                                        <CTableDataCell>{date(history.createdAt)}</CTableDataCell>

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