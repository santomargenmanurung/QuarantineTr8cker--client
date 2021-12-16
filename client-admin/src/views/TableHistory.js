import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactDOM from "react-dom";
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CTableBody,
  CInputGroup,
  CFormInput,
  CInputGroupText,
} from "@coreui/react";
import { fetchHistories } from "../store/actionCreator/HistoriesAction";
import { useEffect } from "react";
import Swal from "sweetalert2";
import logo from "../assets/loading-buffering.gif";
import ContentLoading from "../components/Loading";
export default function LogHistory() {
  const [inputs, setInputs] = useState({});
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(1);
  const [isSubmit, setIsubmit] = useState(false);
  const { histories, isLoading, totalItems } = useSelector(
    (state) => state.historiesReducer
  );
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const name = event.target.name;
    console.log(name);
    const value = event.target.value;
    console.log(value);
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let payload = inputs;
    if (inputs?.email === "") {
      payload = undefined;
    }
    dispatch(fetchHistories(payload));
    // setInputs({inputs : ''})
  };
  const handleNext = async (e) => {
    const limit = 10;
    if (page === limit) {
      setPage(page + 0);
    } else {
      setPage(page + 1);
      const payload = {};
      payload.page = page;
      dispatch(fetchHistories(payload));
    }
  };
  const handlePrev = async (e) => {
    if (page === 0) {
      setPage(page - 0);
    } else {
      setPage(page - 1);
      const payload = {};
      payload.page = page;
      dispatch(fetchHistories(payload));
    }
  };
  useEffect(() => {
    dispatch(fetchHistories());
  }, []);

  function date(input) {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const date = new Date(input);
    return `${date.toLocaleDateString("id-ID", options)}`;
    // return (`${input.toLocaleString('id-ID').split('T')[0]}, @${input.split('T')[1].slice(0, 8)}`)
  }
  return (
    <>
      <div>
        <h1 style={{ marginBottom: 20, fontFamily: "monospace" }}>
          History Table
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            style={{ width: 300, height: 35, borderRadius: 5, padding: 10 }}
            placeholder="search by email"
            type="text"
            name="email"
            value={inputs.email || ""}
            onChange={handleChange}
          />
          <input
            style={{ width: 300, height: 35, borderRadius: 5, padding:10, marginLeft:10 }}
            placeholder="search by email Staff"
            type="text"
            name="emailUpdater"
            value={inputs.emailUpdater || ""}
            onChange={handleChange}
          />
          <button
            type="submit"
            style={{ marginLeft: 10, fontSize:14, marginBottom:5}}
            className="btn btn-primary"
          >
            Submit
          </button>
          {/* <button
            type="submit"
            style={{ marginLeft: 5 }}
            className="btn btn-primary"
          >
            Submit
          </button> */}
        </form>
      </div>
      <div>
        <div>
        {isLoading ? (
              <img src={logo} style={{ marginLeft: '40%', marginTop:'10%' }} />
            ) : (
          <CTable
            style={{
              backgroundColor: "white",
              borderRadius: 10,
              marginTop: 20,
            }}
          >
            <CTableHead>
              <CTableRow style={{ height: 70, verticalAlign:'middle' }}>
                <CTableHeaderCell
                  scope="col"
                  style={{ textAlign: "center", width: 100, fontSize:'1.3em'}}
                >
                  No
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{fontSize:'1.3em'}}>User</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{fontSize:'1.3em'}}>UpdatedBy</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ width: 640, fontSize:'1.3em' }}>
                  Description
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ width: 190, fontSize:'1.3em' }}>
                  Updated On
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
              <CTableBody>
                {histories.map((history, i) => {
                  return (
                    <CTableRow key={history.id}>
                      <CTableHeaderCell
                        style={{ textAlign: "center" }}
                        scope="row"
                      >
                        {i + (1 + page * 10)}
                      </CTableHeaderCell>
                      <CTableDataCell>
                        {history.updatedUser?.email}
                      </CTableDataCell>
                      <CTableDataCell>{history.updater?.email}</CTableDataCell>
                      <CTableDataCell>{history.description}</CTableDataCell>
                      <CTableDataCell>{date(history.createdAt)}</CTableDataCell>
                    </CTableRow>
                  );
                })}
                <CTableRow style={{height:80, position:'relative', verticalAlign:'inline'}}>
                  <CTableHeaderCell></CTableHeaderCell>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell style={{ fontFamily:'monospace', verticalAlign:'middle', fontSize:'1.1em'}}>Showing {(1 + page * 10)} to {(histories.length + page * 10)} from {totalItems} data</CTableDataCell>
                  <CTableDataCell style={{verticalAlign:'middle' }}>
                      <button
                        onClick={handlePrev}
                        type="button"
                        style={{ marginLeft: 3, width:80}}
                        className="btn btn-primary"
                      >
                        Prev
                      </button>
                      <button
                        onClick={handleNext}
                        type="button"
                        style={{ marginLeft: 5, width:80 }}
                        className="btn btn-primary"
                      >
                        Next
                      </button>
                  </CTableDataCell>
                </CTableRow>
              </CTableBody>
          </CTable>
            )}
        </div>
      </div>
    </>
  );
}
