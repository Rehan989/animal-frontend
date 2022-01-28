import React from 'react';
import Navbar from '../Navbar';

const SearchFarmer = () => {
  return <div>
    <Navbar />
    <div className='container mt-5'>
      <h1>
        Search Farmer
      </h1>

      <form>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Enter name of the farmer</span>
          <input type="text" className="form-control" placeholder="name" aria-label="Username" aria-describedby="basic-addon1" />
          <button type="submit" className="btn btn-primary">Search</button>
        </div>
      </form>

      <div>
        <div className='my-5'>
          <div class="card">
            <ul class="list-group list-group-flush">
              <button className='btn' type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample"><li class="list-group-item">name  - mobile number</li></button>
              <div class="collapse" id="collapseExample">
                <div class="card card-body">
                  <div>
                    Animal registered
                    <hr/>
                  </div>
                  <div class="row align-items-start">
                    <div className='col'>
                      Tag no
                    </div>
                    <div className='col'>
                      Date
                    </div>
                    <div className='col'>
                      Species
                    </div>
                    <div className='col'>
                      Breed
                    </div>
                    <div className='col'>
                      Age
                    </div>
                    <div className='col'>
                      No of Calvings
                    </div>
                  </div>
                  <hr/>
                </div>
              </div>
            </ul>
          </div>
        </div>

        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item"><button className="page-link" >Previous</button></li>
            <li className="page-item"><button className="page-link" >1</button></li>
            <li className="page-item"><button className="page-link" >2</button></li>
            <li className="page-item"><button className="page-link" >3</button></li>
            <li className="page-item"><button className="page-link" >Next</button></li>
          </ul>
        </nav>
      </div>
    </div>
  </div>;
};

export default SearchFarmer;
