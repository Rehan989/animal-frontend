import React from 'react';
import Navbar from '../Navbar';

const Farmer = () => {
    return <div>
        <Navbar />
        <div className='container mt-5'>
            <h2 className=''> Register Farmer</h2>
            <form className='mt-3'>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="name">Name:</span>
                    <input type="text" className="form-control" required={true} placeholder="Full name" aria-label="Full name" aria-describedby="name" />
                </div>
                <select className="form-select form-select mb-3" required={true} aria-label=".form-select-lg example">
                    <option selected>Village</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="phone-number">Phone:</span>
                    <input type="number" minLength={10} required={true} className="form-control" placeholder="Phone Number" aria-label="Phone Number" aria-describedby="phone-number" />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="ration-card">Ration Card:</span>
                    <input type="number" className="form-control" placeholder="Ration Card Number" aria-label="Ration Card" aria-describedby="ration-card" />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="addhar-card">Addhar:</span>
                    <input type="number" className="form-control" placeholder="Addhar Card Number" aria-label="addhar-card" aria-describedby="addhar-card" />
                </div>
                <select className="form-select form-select-sm" required={true} aria-label=".form-select-sm example">
                    <option selected>Gender</option>
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                    <option value="3">Transgender</option>
                </select>
                <button type="submit" className="btn btn-primary mt-5">Register</button>
            </form>
        </div>
    </div>;
};

export default Farmer;
