import React from 'react';
import Navbar from '../Navbar';

const CalfBornDetails = () => {
    return <div>
        <Navbar />
        <div className='container mt-5'>
            <h2 className=''> Register Calf Born Details</h2>
            <form className='mt-3'>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="tag-number">Tag number:</span>
                    <input type="text" className="form-control" required={true} placeholder="Tag Number" aria-label="Full name" aria-describedby="tag-number" />
                    <button type='button' className='btn btn-primary'>Search</button>
                </div>
                <div>
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
                    </div>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="date">Calf Born Date:</span>
                    <input type="date" className="form-control" required={true} placeholder="Calf Born Date" aria-label="calf-born-date" aria-describedby="calf-born-date" />
                </div>
                <select className="form-select form-select mb-3" required={true} aria-label=".form-select example">
                    <option selected>Gender</option>
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                    <option value="3">Transgender</option>
                </select>
                <select className="form-select form-select mb-3" required={true} aria-label=".form-select-lg example">
                    <option selected>Ease of Calving</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                </select>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="tag-number">Tag number:</span>
                    <input type="text" className="form-control" required={true} placeholder="Tag Number" aria-label="tag-number" aria-describedby="tag-number" />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="gestation-days">Gestation Days:</span>
                    <input type="text" className="form-control" required={true} placeholder="Automatic (Calf born date-recent-ai date)" aria-label="gestation-days" aria-describedby="gestation-days" />
                </div>
                <button type="submit" className="btn btn-primary mt-5">Save</button>
            </form>
        </div>
    </div>;
};

export default CalfBornDetails;
