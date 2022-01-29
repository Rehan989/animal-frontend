import React from 'react';

const Navbar = (props) => {
    return <div>
        <nav className="nav mt-3 mx-5 nav-pills nav-fill">
            <a className="nav-link" aria-current="page" href="/search/farmer">Search Farmer</a>
            <a className="nav-link" href="/register/farmer">Register Farmer</a>
            <a className="nav-link" href="/register/animal">Register Animal</a>
            <a className="nav-link" href="/register/pd">Register PD</a>
            <a className="nav-link" href="/register/bullsemen">Register BullSemen</a>
            <a className="nav-link" href="/register/aidetails">AI Details</a>
            <a className="nav-link" href="/register/calfdetails">Calf Details</a>
            <a className="nav-link" href="/report">Report</a>
        </nav>
    </div>;
};

export default Navbar;
