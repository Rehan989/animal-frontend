import React, { useState } from 'react';
import Navbar from '../Navbar';

const SearchFarmer = (props) => {
  const [farmerName, setFarmerName] = useState("");
  const [farmers, setFarmers] = useState([]);
  const [showFarmers, setshowFarmers] = useState(false);
  const [showAnimals, setshowAnimals] = useState(false);
  const [showDataNotFound, setshowDataNotFound] = useState(false);

  const fetchAnimals = async (farmerId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/search/animals/${farmerId}/`, {
        "method": "GET",
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json',
          'auth-token': `${localStorage.getItem('auth_token')}`
        },
      })
      const data = await response.json()
      if (data.success) {
        return data.animals
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
  }

  const searchFarmer = async (e) => {
    e.preventDefault()
    try {
      if (farmerName.length <= 3) {
        props.setshowAlert("Error", "Search query must be greater than 3 characters")
        return
      }
      const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/search/farmer/${farmerName}/`, {
        "method": "GET",
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json',
          'auth-token': `${localStorage.getItem('auth_token')}`
        },
      })
      const data = await response.json()
      if (data.success) {
        // data.farmers.map(farmer => {
        //   farmer.animals.map(async (animalId) => {
        //     let animal = await fetchAnimal(animalId);
        //     farmer.animals[farmer.animals.indexOf(animalId)] = animal;
        //     return;
        //   })
        //   return;
        // })

        await data.farmers.map(async (farmer) => {
          let farmerAnimals = await fetchAnimals(farmer.mobileNo);
          farmer.animals = farmerAnimals;
          setshowAnimals(true)
        })
        setFarmers(data.farmers)
        if (data.farmers.length === 0) {
          setshowDataNotFound(true)
          props.setshowAlert("Error", `No Farmers found with the matching name!`)
          return
        }
        setshowDataNotFound(false)
        setshowFarmers(true)
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
  }

  return <div>
    <Navbar />
    <div className='container mt-5'>
      <h1>
        Search Farmer
      </h1>

      <form onSubmit={searchFarmer}>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Enter name of the farmer</span>
          <input value={farmerName} onChange={(e) => setFarmerName(e.target.value)} type="text" className="form-control" placeholder="name" aria-label="Username" aria-describedby="basic-addon1" />
          <button type="submit" className="btn btn-primary">Search</button>
        </div>
      </form>

      <div>
        <div className='my-5'>
          {showFarmers ?
            farmers.map(farmer => {
              return <div key={`${farmer.mobileNo}`} className="card my-3">
                <ul className="list-group list-group-flush">
                  <button className='btn' type="button" data-bs-toggle="collapse" data-bs-target={`#${farmer.name}${farmer.mobileNo}`} aria-expanded="false" aria-controls={`$${farmer.name}${farmer.mobileNo}`}><li className="list-group-item">{farmer.name}  - {farmer.mobileNo}</li></button>
                  <div className="collapse" id={`${farmer.name}${farmer.mobileNo}`}>
                    <div className="card card-body">
                      <div>
                        Animal registered
                      </div>
                      {(farmer.animals.length !== 0 && showAnimals) ?
                        farmer.animals.map(animal => {
                          if (animal._id)
                            return <div key={`${animal._id}`}>
                              <div className="row align-items-start">
                                <div className='col'>
                                  {animal.tagNo}
                                </div>
                                <div className='col'>
                                  {animal.date}
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
                              <hr />
                            </div>
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
