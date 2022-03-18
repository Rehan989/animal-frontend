import React, { useState } from 'react';
import Navbar from '../Navbar';

const SearchFarmer = (props) => {
  const [creds, setCreds] = useState({ inputValue: "" });
  const [farmers, setFarmers] = useState([]);
  const [showData, setShowData] = useState(false);
  const [showDataNotFound, setshowDataNotFound] = useState(false);
  const [searchButtonLoading, setsearchButtonLoading] = useState(false);
  const [searchType, setSearchType] = useState("Search By");

  const handleChange = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value })
  }

  const searchFarmer = async (e) => {
    e.preventDefault();
    setsearchButtonLoading(true)
    try {
      let query = "name";
      if (searchType.toLowerCase() === "farmername") {
        query = "name";
      }
      else if (searchType.toLowerCase() === "animaltagno")
        query = "animaltagno"
      else {
        props.setshowAlert("Error", `Please select the search type!`)
        return
      }

      const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/search/farmer?${query}=${creds.inputValue}`, {
        "method": "GET",
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json',
          'auth-token': `${localStorage.getItem('auth_token')}`
        },
      })
      const data = await response.json()
      if (data.success) {
        setFarmers(data.farmers)
        if (data.farmers.length === 0) {
          setshowDataNotFound(true)
          props.setshowAlert("Error", `No Farmers found with the matching name!`)
          return
        }
        setshowDataNotFound(false)
        setShowData(true)
      }
      else {
        props.setshowAlert("Error", `${data.error}`)
        return
      }
    }
    catch (error) {
      console.log(error);
      props.setshowAlert("Error", "Internal Server Error")
    }
    finally {
      setsearchButtonLoading(false)
    }
  }


  return <div>
    <Navbar />
    <div className='container mt-5'>
      <h1>
        Search Farmer
      </h1>
      <form onSubmit={searchFarmer}>
        <div className="input-group mb-3">
          {/* search by field */}
          <div className="dropdown">
            <button className="btn btn-primary dropdown-toggle" type="button" id="searchby" data-bs-toggle="dropdown" aria-expanded="false">
              {searchType}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
              <li><button className="dropdown-item" type="button" onClick={() => setSearchType("FarmerName")}>Farmer's Name</button></li>
              <li><button className="dropdown-item" type="button" onClick={() => setSearchType("AnimalTagNo")}>Animal's Tag Number</button></li>
            </ul>
          </div>
          <input name="inputValue" value={creds.inputValue} onChange={handleChange} type="text" className="form-control" placeholder={searchType} aria-label="Username" aria-describedby="basic-addon1" />


          <button type="submit" className="btn btn-primary" disabled={(searchButtonLoading) ? true : false}>{(searchButtonLoading) ? 'Submitting...' : 'Submit'}</button>
        </div>
      </form>

      <div>
        <div className='my-5'>
          {showData ?
            farmers.map(farmer => {
              return <div key={`${farmer.mobileNo}`} className="card my-3">
                <ul className="list-group list-group-flush">
                  <button className='btn' type="button" data-bs-toggle="collapse" data-bs-target={`#${farmer.name.replaceAll(' ', '-')}${farmer.mobileNo}`} aria-expanded="false" aria-controls={`$${farmer.name.replaceAll(' ', '-')}${farmer.mobileNo}`}><li className="list-group-item">{farmer.name}  - {farmer.mobileNo}</li></button>
                  <div className="collapse" id={`${farmer.name.replaceAll(' ', '-')}${farmer.mobileNo}`}>
                    <div className="card card-body">
                      <div>
                        <strong>Name</strong>: {farmer.name}<br />
                        <strong>Addhar card number</strong>: {farmer.addhar}<br />
                        <strong>Ration card number</strong>: {farmer.rationCard}<br />
                        <strong>Village</strong>: {farmer.village}<br />
                        <strong>Gender</strong>: {farmer.sex}<br />
                        <strong>Phone Number</strong>: {farmer.mobileNo}<br />
                        <hr />
                      </div>
                      <div>
                        Animal registered
                        <hr />
                      </div>
                      {(farmer.animals.length !== 0) ?
                        farmer.animals.map(animal => {

                          if (animal._id)
                            return <React.Fragment key={`${animal._id}`}>
                              <div>
                                <div className="row align-items-start">
                                  <div className='col'>
                                    {animal.tagNo}
                                  </div>
                                  <div className='col'>
                                    {animal.date.substring(0, 10)}
                                  </div>
                                  <div className='col'>
                                    {animal.species}
                                  </div>
                                  <div className='col'>
                                    {animal.breed}
                                  </div>
                                  <div className='col'>
                                    {animal.age}
                                  </div>
                                  <div className='col'>
                                    {animal.noOfCalvings}
                                  </div>
                                </div>
                                <div className='d-flex justify-content-center column mt-2'>
                                  <div className=''>
                                    <a href={`/register/aidetails?animal=${animal.tagNo}`} type="button" className="btn btn-sm mx-3 btn-outline-primary">FILL AI</a>
                                  </div>
                                  <div className=''>
                                    <a href={`/register/pd?animal=${animal.tagNo}`} type="button" className="btn btn-sm mx-3 btn-outline-primary">FILL PD</a>
                                  </div>
                                  <div className=''>
                                    <a href={`/register/calfdetails?animal=${animal.tagNo}`} type="button" className="btn btn-sm mx-3 btn-outline-primary">FILL CALF BORN</a>
                                  </div>
                                </div>
                                <hr />
                              </div>
                            </React.Fragment>
                          else
                            return ""
                        }) : <h3>No Animals registered</h3>}
                    </div>
                  </div>
                </ul>
              </div>
            })
            : ''}

          {showDataNotFound ? <h1>No data found!</h1> : ''}
        </div>
      </div>
    </div>
  </div>;
};

export default SearchFarmer;
