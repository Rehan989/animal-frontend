import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';

const BullSemen = (props) => {
  const [creds, setCreds] = useState({
    bullNo: "",
    date: "",
    species: "",
    breed: "",
    bullId: "",
    noOfDoses: "",
  });

  const [Species, setSpecies] = useState([]);
  const [SpeciesLoading, setSpeciesLoading] = useState(true);
  const [submitButtonLoading, setsubmitButtonLoading] = useState(false);

  const onChange = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  }

  const handleBullSemenAccountRegistration = async (e) => {
    e.preventDefault();
    setsubmitButtonLoading(true)
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/register/bullsemen/`, {
        "method": "POST",
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json',
          'auth-token': `${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify({
          ...creds
        }),
      })
      if (response.status === 204) {
        props.setshowAlert("Success", 'Bull semen data Created Successfully!')
        setCreds({
          bullNo: "",
          date: "",
          species: "",
          breed: "",
          bullId: "",
          noOfDoses: "",
        })
        return
      }
      const data = await response.json();
      if (Array.isArray(data.errors)) {
        props.setshowAlert("Error", data.errors[0].msg)
        return
      }
      if (data.error) {
        props.setshowAlert("Error", data.error)
        return
      }
    }
    catch (error) {
      console.log(error);
      props.setshowAlert("Error", "Internal Server Error")
    }
    finally {
      setsubmitButtonLoading(false);
    }
  }

  const fetchAnimalSpecies = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/get/species/`, {
      "method": "GET",
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json'
      }
    })
    const data = await response.json()
    setSpecies(data);
    setSpeciesLoading(false);
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchAnimalSpecies();
    }
    fetchData();

  }, []);

  return <div>
    <Navbar />
    <div className='container mt-5'>
      <h2 className=''> Create Bull Semen Account</h2>
      <form className='mt-3' onSubmit={handleBullSemenAccountRegistration}>
        <div className="input-group mb-3">
          <span className="input-group-text" id="bull-number">Bull no:</span>
          <input type="text" className="form-control" onChange={onChange} name="bullNo" value={creds.bullNo} required={true} placeholder="Bull Number" aria-label="Bull Number" aria-describedby="bull-number" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="bull-id">Bull id:</span>
          <input type="text" name="bullId" value={creds.bullId} onChange={onChange} className="form-control" required={true} placeholder="Bull Id" aria-label="Bull Id" aria-describedby="bull-id" />
        </div>
        <select className="form-select form-select mb-3" required={true} aria-label=".form-select-lg example" name="species" value={creds.species} onChange={onChange}>
          <option value="">Species</option>
          {
            (!SpeciesLoading) ?
              Object.keys(Species.species).map(species => {
                return <option value={species} key={species} >
                  {species}
                </option>
              })
              :
              ''
          }
        </select>
        {(creds.species !== "") ?
          <select className="form-select form-select mb-3" required={true} aria-label=".form-select-sm example" name="breed" value={creds.breed} onChange={onChange}>
            <option value="">Breed</option>
            {
              (!SpeciesLoading) ?
                Species.species[creds.species].map(breed => {
                  return <option value={breed} key={breed} >
                    {breed}
                  </option>
                })
                :
                ''
            }
          </select>
          : ''}
        <div className="input-group mb-3">
          <span className="input-group-text" id="date">Date:</span>
          <input type="date" className="form-control" required={true} placeholder="Tag Number" aria-label="Date" aria-describedby="date" name="date" value={creds.date}
            onChange={onChange} />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="no-of-doses">No of Doses:</span>
          <input type="text" className="form-control" required={true} placeholder="Number of doses" aria-label="no-of-doses" aria-describedby="no-of-doses" name="noOfDoses" value={creds.noOfDoses}
            onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-primary" disabled={(submitButtonLoading) ? true : false}>{(submitButtonLoading) ? 'Saving...' : 'Save'}</button>
      </form>
    </div>
  </div>;
};

export default BullSemen;
