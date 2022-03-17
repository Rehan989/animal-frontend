import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';

const Animal = (props) => {
    const [SpeciesLoading, setSpeciesLoading] = useState(true);
    const [showFarmer, setshowFarmer] = useState(false);
    const [farmers, setFarmers] = useState([]);
    const [Species, setSpecies] = useState([]);
    const [creds, setCreds] = useState({
        tagNumber: "",
        date: "",
        species: "",
        breed: "",
        age: "",
        noOfCalvings: "",
        farmerId: "",
        farmerName: ""
    });
    const [submitButtonLoading, setsubmitButtonLoading] = useState(false);

    const onChange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value });
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

    const searchFarmer = async (e) => {
        try {
            if (creds.farmerName.length <= 3) {
                props.setshowAlert("Error", "Search query must be greater than 3 characters")
                return
            }
            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/search/farmer?name=${creds.farmerName}`, {
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
                    props.setshowAlert("Error", `No Farmers found with the matching name!`)
                    setshowFarmer(false)
                    return
                }
                setshowFarmer(true)
            }
            else {
                props.setshowAlert("Error", `${data.error}`)
                setshowFarmer(false)
                return
            }
        }
        catch (error) {
            console.log(error);
            setshowFarmer(false)
            props.setshowAlert("Error", "Internal Server Error")
        }
    }

    const handleAnimalRegister = async (e) => {
        e.preventDefault()
        setsubmitButtonLoading(true)
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/register/animal/`, {
                "method": "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json',
                    'auth-token': `${localStorage.getItem('auth_token')}`
                },
                body: JSON.stringify({
                    tagNo: creds.tagNumber,
                    farmerId: creds.farmerId,
                    species: creds.species,
                    breed: creds.breed,
                    age: creds.age,
                    noOfCalvings: creds.noOfCalvings
                }),
            })
            if (response.status === 204) {
                props.setshowAlert("Success", 'Animal data Created Successfully!')
                setCreds({
                    tagNumber: "",
                    date: "",
                    species: "",
                    breed: "",
                    age: "",
                    noOfCalvings: "",
                    farmerId: "",
                    farmerName: ""
                })
                return
            }
            const data = await response.json();
            if (Array.isArray(data.errors)) {
                props.setshowAlert("Error", data.errors[0])
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

    useEffect(() => {
        const fetchData = async () => {
            await fetchAnimalSpecies();
        }
        fetchData();

    }, []);

    return <div>
        <Navbar />
        <div className='container mt-5'>
            <h2 className=''> Register Animal</h2>
            <form onSubmit={handleAnimalRegister} className='mt-3'>
                <div className="input-group mb-3">
                    <span className="input-group-text input-group-required-text" id="famerName">Farmer name:</span>
                    <input type="text" className="form-control" required={true} placeholder="Farmer Name" aria-label="Farmer name" aria-describedby="farmerName" name="farmerName" value={creds.farmerName} onChange={onChange} />
                    <button type="button" className='btn btn-primary' onClick={searchFarmer}>Search Farmer</button>
                </div>
                {(showFarmer) ?
                    <select className="form-select form-select mb-3 input-group-required-text" required={true} name="farmerId" value={creds.farmerId} onChange={onChange} aria-label=".form-select example">
                        <option>Select a Farmer</option>
                        {
                            farmers.map(function (farmer) {
                                return <option key={farmer.mobileNo} value={`${farmer.mobileNo}`}>{farmer.name} - {farmer.mobileNo}</option>
                            })
                        }
                    </select> : ''}
                <div className="input-group mb-3">
                    <span className="input-group-text input-group-required-text" id="tag-number">Tag number:</span>
                    <input type="text" className="form-control" required={true} placeholder="Tag Number" aria-label="Full name" aria-describedby="tag-number" name="tagNumber" value={creds.tagNumber} onChange={onChange} />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text input-group-required-text" id="date">Date:</span>
                    <input type="date" className="form-control" required={true} placeholder="Tag Number" aria-label="Date" aria-describedby="date" name="date" value={creds.date} onChange={onChange} />
                </div>
                <select className="form-select form-select mb-3 input-group-required-text" required={true} aria-label=".form-select-lg example" name="species" value={creds.species} onChange={onChange}>
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
                    <select className="form-select form-select mb-3 input-group-required-text" required={true} aria-label=".form-select-sm example" name="breed" value={creds.breed} onChange={onChange}>
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
                    <span className="input-group-text input-group-required-text" id="age">Age:</span>
                    <input type="number" minLength={10} required={true} className="form-control" placeholder="Age" aria-label="age" aria-describedby="age" name="age" value={creds.age} onChange={onChange} />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text input-group-required-text" id="calvings">No of calvings:</span>
                    <input type="number" className="form-control" placeholder="Number of calvings" aria-label="calvings" aria-describedby="calvings" required={true} name="noOfCalvings" value={creds.noOfCalvings} onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary input-group-required-text" disabled={(submitButtonLoading) ? true : false}>{(submitButtonLoading) ? 'Submitting...' : 'Submit'}</button>
            </form>
        </div>
    </div>;
};

export default Animal;
