import React from 'react';
import Navbar from '../Navbar'

const PDRegistration = () => {
    return <div>
        <Navbar />
        <div className='container mt-5'>
            <h2 className=''> Register PD Details</h2>
            <form className='mt-3'>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="tag-number">Tag number:</span>
                    <input type="text" class="form-control" required={true} placeholder="Tag Number" aria-label="Full name" aria-describedby="tag-number" />
                    <button type='button' className='btn btn-primary'>Search</button>
                </div>
                <div>
                    <div className='my-5'>
                        <div class="card">
                            <ul class="list-group list-group-flush">
                                <button className='btn' type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample"><li class="list-group-item">name  - mobile number</li></button>
                                <div class="collapse" id="collapseExample">
                                    <div class="card card-body">
                                        <div>
                                            Animal Details
                                            <hr />
                                        </div>
                                        <div class="row align-items-start">
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
                <div class="input-group mb-3">
                    <span class="input-group-text" id="date">PD Date:</span>
                    <input type="date" class="form-control" required={true} placeholder="Tag Number" aria-label="Date" aria-describedby="date" />
                </div>
                <select class="form-select form-select mb-3" required={true} aria-label=".form-select-lg example">
                    <option selected>PD Result</option>
                    <option value="1">Pregnant</option>
                    <option value="2">Non Pregnant</option>
                </select>
                <select class="form-select form-select mb-3" required={true} aria-label=".form-select-sm example">
                    <option selected>Breed</option>
                    <option value="1">One</option>
                    <option value="2">two</option>
                    <option value="3">three</option>
                </select>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="calvings">VD USER ID:</span>
                    <input type="text" class="form-control" placeholder="Doctor's name" aria-label="doctors-name" aria-describedby="doctors-name" />
                </div>
                <button type="submit" class="btn btn-primary mt-5">Register</button>
            </form>
        </div>
    </div>;
};

export default PDRegistration;