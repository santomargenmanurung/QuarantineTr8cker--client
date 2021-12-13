import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import ReactDOM from 'react-dom';
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableDataCell, CTableBody, CInputGroup, CFormInput ,CInputGroupText} from "@coreui/react";
import { fetchHistories } from "../store/actionCreator/HistoriesAction";
import { useEffect } from "react";

export default function LogHistory() {
    const { histories, isLoading } = useSelector((state) => state.historiesReducer);
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(fetchHistories());
    }, []);

    function date(input){
        return (`${new Date(input).toLocaleDateString('id-ID')}, @${input.split('T')[1].slice(0,8)}`)
    }
    return (
        <div>
            <div>
                <CInputGroup className="mb-3">
                    <CFormInput placeholder="Search by user email or staff email" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                    <CInputGroupText id="basic-addon2">search</CInputGroupText>
                </CInputGroup>
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
                       {
                           histories.map((history,i)=>{
                               return(
                                <CTableRow key={history.id}>
                                <CTableHeaderCell scope="row">{i+1}</CTableHeaderCell>
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