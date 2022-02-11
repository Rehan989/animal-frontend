import React, { useState } from 'react';
import Navbar from '../Navbar'

const PDRegistration = (props) => {
    const [tagNo, settagNo] = useState("");
    const [animal, setanimal] = useState("");
    const [creds, setCreds] = useState({
        animalTagNo: "",
        date: "",
        pdResult: "",
        breed: "",
        age: "",
        doctorName: ""
    });

    const searchAnimal = async (tagno) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/search/animals?tagno=${tagno}`, {
                "method": "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json',
                    'auth-token': `${localStorage.getItem('auth_token')}`
                },
            })
            const data = await response.json()
            if (data.success) {
                setanimal(data.animals)
                if (!data.animals) {
                    props.setshowAlert("Error", "No bull found with the specific tag Number")
                }
                console.log(data.animals)
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
            <h2 className=''> Register PD Details</h2>
            <form className='mt-3'>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="tag-number">Tag number:</span>
                    <input type="number" className="form-control" required={true} placeholder="Enter bull Tag Number" aria-label="Tag Number" aria-describedby="tag-number" value={tagNo} onChange={(e) => settagNo(e.target.value)} />
                    <button onClick={() => searchAnimal(tagNo)} type='button' className='btn btn-primary'>Search</button>
                </div>
                <div>
                    {(animal !== "") ?
                        <div className='my-5'>
                            <div className="card">
                                <ul className="list-group list-group-flush">
                                    <button className='btn' type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample"><li className="list-group-item">name  - mobile number</li></button>
                                    <div className="collapse" id="collapseExample">
                                        <div className="card card-body">
                                            <div>
                                                Animal Details
                                                <hr />
                                            </div>
                                            <div className="row align-items-start">
                                                <div className='col'>
                                                    AI Date
                                                </div>
                                                <div className='col'>
                                                    Bull no/Bull id
                                                </div>
                                                <div className='col'>
                                                    Village Name
                                                </div>
                                                <div className='col'>
                                                    Owner name
                                                </div>
                                                <div className='col'>
                                                    Species
                                                </div>
                                                <div className='col'>
                                                    Breed
                                                </div>
                                                <div className='col'>
                                                    Fresh/Repeat
                                                </div>
                                            </div>
                                            <hr />
                                        </div>
                                    </div>
                                </ul>
                            </div>
                        </div> : ''}
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="date">PD Date:</span>
                    <input type="date" className="form-control" required={true} placeholder="Tag Number" aria-label="Date" aria-describedby="date" />
                </div>
                <select className="form-select form-select mb-3" required={true} aria-label=".form-select-lg example">
                    <option selected>PD Result</option>
                    <option value="1">Pregnant</option>
                    <option value="2">Non Pregnant</option>
                </select>
                <select className="form-select form-select mb-3" required={true} aria-label=".form-select-sm example">
                    <option selected>Breed</option>
                    <option value="1">One</option>
                    <option value="2">two</option>
                    <option value="3">three</option>
                </select>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="calvings">VD USER ID:</span>
                    <input type="text" className="form-control" placeholder="Doctor's name" aria-label="doctors-name" aria-describedby="doctors-name" />
                </div>
                <button type="submit" className="btn btn-primary mt-5">Register</button>
            </form>
        </div>
    </div>;
};

export default PDRegistration;
