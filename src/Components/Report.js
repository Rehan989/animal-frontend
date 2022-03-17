import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { saveAs } from 'file-saver';
import { useNavigate } from 'react-router-dom';

const Report = (props) => {
  let navigate = useNavigate();
  const [Villages, setVillages] = useState({});
  const [VillagesLoading, setVillagesLoading] = useState(true);
  const [district, setDistrict] = useState("");
  const [taluka, setTaluka] = useState("");
  const [user, setUser] = useState({ name: "" })
  const [creds, setCreds] = useState({
    reportType: "",
    village: "",
    periodFrom: "",
    periodTo: ""
  });
  const [submitButtonLoading, setsubmitButtonLoading] = useState(false);

  const onChange = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  }

  async function fetchTechnician(auth_token, userType) {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/auth/user/${userType}`, {
        "method": "POST",
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json',
          'auth-token': `${auth_token}`
        },
      })
      const data = await response.json()
      if (!data.email) {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('user_type')
        navigate('/')
        props.setshowAlert("Error", "Invalid credentials!")
        return
      }
      if (data.email) {
        setUser(data)
      }
      if (data.user_type === 'admin') {
        navigate('/dashboard')
      }
    }
    catch (error) {
      navigate('/');
      localStorage.clear()
      console.log(error);
      props.setshowAlert("Error", "Internal Server Error")
    }
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
    e.preventDefault();
    setsubmitButtonLoading(true)
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
      saveAs(blob, `${creds.reportType}_${user.name}_${creds.periodFrom}-${creds.periodTo}.csv`);
    }
    catch (error) {
      console.log(error);
      props.setshowAlert("Error", "Internal Server Error")
      return
    }
    finally {
      setsubmitButtonLoading(false)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchVillages();
      await fetchTechnician(localStorage.getItem('auth_token'), localStorage.getItem('user_type'));
    }
    fetchData();

  }, []);

  return (
    <div>
      <Navbar />
      <div className='container'>
        <h1 className='my-3'>Generate report</h1>
        <form onSubmit={generateReport}>
          <select required className="form-select mb-3 input-group-required-text" aria-label="Default select example" value={creds.reportType} onChange={onChange} name="reportType">
            <option value="">Report name</option>
            <option value="ai">AI report</option>
            <option value="pd">PD report</option>
            <option value="calf-born">Calf-born Report</option>
          </select>
          <select onChange={(e) => { setDistrict(e.target.value); setTaluka("") }
          } className="form-select form-select mb-3 input-group-required-text" aria-label=".form-select-lg example">
            <option value={""}>All villages</option>
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
            } className="form-select form-select mb-3 input-group-required-text" required={true} aria-label=".form-select-lg example">
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
            <select value={creds.village} name="village" onChange={onChange} className="form-select form-select mb-3 input-group-required-text" required={true} aria-label=".form-select-lg example">
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
            <span className="input-group-text input-group-required-text" id="date">Period From:</span>
            <input type="date" className="form-control" required={true} placeholder="Period from" aria-label="Date" aria-describedby="date" value={creds.periodFrom} name="periodFrom" onChange={onChange} />

            <span className="input-group-text input-group-required-text" id="date">Period to:</span>
            <input type="date" className="form-control" required={true} placeholder="Period to" aria-label="Date" aria-describedby="date"
              value={creds.periodTo} name="periodTo" onChange={onChange} />
          </div>
          <button type="submit" className="btn mt-3 btn-primary" disabled={(submitButtonLoading) ? true : false}>{(submitButtonLoading) ? 'Generating...' : 'Generate Report'}</button>
        </form>
      </div>
    </div>)
}

export default Report