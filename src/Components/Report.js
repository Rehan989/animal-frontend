import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { saveAs } from 'file-saver';

const Report = (props) => {
  const [Villages, setVillages] = useState({});
  const [VillagesLoading, setVillagesLoading] = useState(true);
  const [district, setDistrict] = useState("");
  const [taluka, setTaluka] = useState("");
  const [creds, setCreds] = useState({
    reportType: "",
    village: "",
    periodFrom: "",
    periodTo: ""
  });

  const onChange = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  }

  const fetchVillages = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/get/villages/`, {
        "method": "GET",
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json'
        }
      })
      const data = await response.json()
      setVillages(data);
      setVillagesLoading(false);
    }
    catch (error) {
      console.log(error);
      props.setshowAlert("Error", "Internal Server Error")
      return
    }
  }

  const generateReport = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/report/${localStorage.getItem('user_type')}/${creds.reportType}/`, {
        "method": "POST",
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json',
          'auth-token': `${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify({
          ...creds
        })
      })
      const data = await response.json();
      let blob = new Blob([`${data.report_csv.header}`, `${data.report_csv.body}`], { type: "text/csv;charset=utf-8" })
      saveAs(blob, "data.csv");
    }
    catch (error) {
      console.log(error);
      props.setshowAlert("Error", "Internal Server Error")
      return
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchVillages();
    }
    fetchData();

  }, []);

  return (
    <div>
      <Navbar />
      <div className='container'>
        <h1 className='my-3'>Generate report</h1>
        <form onSubmit={generateReport}>
          <select required className="form-select mb-3" aria-label="Default select example" value={creds.reportType} onChange={onChange} name="reportType">
            <option value="">Report name</option>
            <option value="ai">AI report</option>
            <option value="pd">PD report</option>
            <option value="calf-born">Calf-born Report</option>
          </select>
          <select onChange={(e) => { setDistrict(e.target.value); setTaluka("") }
          } className="form-select form-select mb-3" required={true} aria-label=".form-select-lg example">
            <option value={""}>Select District</option>
            {
              (!VillagesLoading) ?

                Object.keys(Villages.villages).map(district => {
                  return <option value={district} key={district} >
                    {district}
                  </option>
                })
                :
                ''
            }
          </select>
          {(!VillagesLoading && district !== "") ?
            <select onChange={(e) => setTaluka(e.target.value)
            } className="form-select form-select mb-3" required={true} aria-label=".form-select-lg example">
              <option value={""}>Select Taluka</option>
              {
                Object.keys(Villages.villages[district]).map(taluka => {
                  return <option value={taluka} key={taluka}>
                    {taluka}
                  </option>
                })
              }
            </select> : ''}
          {(!VillagesLoading && taluka !== "") ?
            <select value={creds.village} name="village" onChange={onChange} className="form-select form-select mb-3" required={true} aria-label=".form-select-lg example">
              <option value={""}>Select Village</option>
              {
                Villages.villages[district][taluka].map(taluka => {
                  return <option value={taluka} key={taluka}>
                    {taluka}
                  </option>
                })
              }
            </select> : ''}
          <div className="input-group mb-3">
            <span className="input-group-text" id="date">Period From:</span>
            <input type="date" className="form-control" required={true} placeholder="Period from" aria-label="Date" aria-describedby="date" value={creds.periodFrom} name="periodFrom" onChange={onChange} />

            <span className="input-group-text" id="date">Period to:</span>
            <input type="date" className="form-control" required={true} placeholder="Period to" aria-label="Date" aria-describedby="date"
              value={creds.periodTo} name="periodTo" onChange={onChange} />
          </div>
          <button type='submit' className='btn btn-primary'>
            Generate Report
          </button>
        </form>
      </div>
    </div>)
}

export default Report