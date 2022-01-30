import React from 'react';
import Navbar from '../Navbar';

const AiDetails = () => {
    return <div>
        <Navbar />
        <div className='container mt-5'>
            <h2 className=''> AI Details</h2>
            <form className='mt-3'>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="date">Date:</span>
                    <input type="date" className="form-control" required={true} placeholder="Tag Number" aria-label="Date" aria-describedby="date" />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="bull-number">Bull no:</span>
                    <input type="text" className="form-control" required={true} placeholder="Bull Number" aria-label="Bull Number" aria-describedby="bull-number" />
                    <button type="button" className='btn btn-primary'>Search Bull Semen</button>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="bull-id">Bull id:</span>
                    <input type="text" className="form-control" required={true} placeholder="Bull Id" aria-label="Bull Id" aria-describedby="bull-id" />
                    <button type="button" className='btn btn-primary'>Search Bull Semen</button>
                </div>
                <select className="form-select form-select mb-3" required={true} aria-label=".form-select-lg example">
                    <option selected>Fresh Reports</option>
                    <option value="1">Fresh</option>
                    <option value="2">Repeat R1</option>
                    <option value="3">Repeat R2</option>
                </select>
                <button type="submit" className="btn btn-primary mt-5">Save</button>
            </form>
        </div>
    </div>;
};

export default AiDetails;
