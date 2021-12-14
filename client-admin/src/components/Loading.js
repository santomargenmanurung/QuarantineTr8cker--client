import logo from '../assets/8quarantine.jpeg'
import { CContainer,CRow,CCol } from '@coreui/react'
export default function ContentLoading() {
    return (
        <CContainer>
            <CRow>
                <CCol xl="auto"></CCol>
                <CCol xl={6} style={{marginLeft:350,marginTop:100}}>
                <img src={logo} style={{width:180,height:180,borderRadius:100}}></img>
            <h1>Loading...</h1> 

                </CCol>
                <CCol xl="auto"></CCol>
            </CRow>
        </CContainer>
    )
}