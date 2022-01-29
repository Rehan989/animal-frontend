import React from 'react';
import Navbar from '../Navbar';

const Animal = () => {
    return <div>
        <Navbar />
        <div className='container mt-5'>
            <h2 className=''> Register Animal</h2>
            <form className='mt-3'>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="tag-number">Tag number:</span>
                    <input type="text" class="form-control" required={true} placeholder="Tag Number" aria-label="Full name" aria-describedby="tag-number" />
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="date">Date:</span>
                    <input type="date" class="form-control" required={true} placeholder="Tag Number" aria-label="Date" aria-describedby="date" />
                </div>
                <select class="form-select form-select mb-3" required={true} aria-label=".form-select-lg example">
                    <option selected>Species</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
                <select class="form-select form-select mb-3" required={true} aria-label=".form-select-sm example">
                    <option selected>Breed</option>
                    <option value="1">One</option>
                    <option value="2">two</option>
                    <option value="3">three</option>
                </select>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="age">Age:</span>
                    <input type="number" minLength={10} required={true} class="form-control" placeholder="Age" aria-label="age" aria-describedby="age" />
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="calvings">No of calvings:</span>
                    <input type="number" class="form-control" placeholder="Number of calvings" aria-label="calvings" aria-describedby="calvings" />
                </div>
                <button type="submit" class="btn btn-primary mt-5">Register</button>
            </form>
        </div>
    </div>;
};

export default Animal;
