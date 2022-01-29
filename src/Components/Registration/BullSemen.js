import React from 'react';
import Navbar from '../Navbar';

const BullSemen = () => {
  return <div>
    <Navbar />
    <div className='container mt-5'>
      <h2 className=''> Create Bull Semen Account</h2>
      <form className='mt-3'>
        <div class="input-group mb-3">
          <span class="input-group-text" id="bull-number">Bull no:</span>
          <input type="text" class="form-control" required={true} placeholder="Bull Number" aria-label="Bull Number" aria-describedby="bull-number" />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="bull-id">Bull id:</span>
          <input type="text" class="form-control" required={true} placeholder="Bull Id" aria-label="Bull Id" aria-describedby="bull-id" />
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
          <span class="input-group-text" id="date">Date:</span>
          <input type="date" class="form-control" required={true} placeholder="Tag Number" aria-label="Date" aria-describedby="date" />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="no-of-doses">No of Doses:</span>
          <input type="text" class="form-control" required={true} placeholder="Number of doses" aria-label="no-of-doses" aria-describedby="no-of-doses" />
        </div>
        <button type="submit" class="btn btn-primary mt-5">Save</button>
      </form>
    </div>
  </div>;
};

export default BullSemen;
