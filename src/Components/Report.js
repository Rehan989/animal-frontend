import React from 'react';
import Navbar from './Navbar'

const Report = () => {
  return <div>
    <Navbar />
    <div className='container'>
      <h1 className='my-3'>Generate report</h1>
      <form>
        <select className="form-select mb-3" aria-label="Default select example">
          <option selected>Report name</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
        <select className="form-select mb-3" aria-label="Default select example">
          <option selected>Village name</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
        <div className="input-group mb-3">
          <span className="input-group-text" id="date">Period From:</span>
          <input type="date" className="form-control" required={true} placeholder="Tag Number" aria-label="Date" aria-describedby="date" />
          <span className="input-group-text" id="date">Period to:</span>
          <input type="date" className="form-control" required={true} placeholder="Tag Number" aria-label="Date" aria-describedby="date" />
        </div>
        <button type='submit' className='btn btn-primary'>
          Generate Report
        </button>
      </form>
    </div>
  </div>;
};

export default Report;
