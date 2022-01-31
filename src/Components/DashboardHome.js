import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardHome = () => {
    let navigate = useNavigate()
    async function verifyAdminUser(auth_token) {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/auth/user/admin`, {
            "method": "POST",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json',
                'auth-token': `${auth_token}`
            },
        })
        let data = await response.json();
        console.log(data);
        if (response.status === "200")
            return true
        return false
    }
    useEffect(() => {
        if (localStorage.getItem('auth_token')) {
            if (!verifyAdminUser(localStorage.getItem('auth_token'))) {
                navigate('/')
            }
        }
        else {
            navigate('/')
        }
    }, []);

    return <div>
        <nav className="nav nav-pills my-3 mx-2 nav-fill">
            <a className="nav-link" data-bs-toggle="collapse" href="#doctorCollapse" role="button" aria-expanded="false" aria-controls="doctorCollapse">Add new doctor</a>
            <a className="nav-link" data-bs-toggle="collapse" href="#techncianCollapse" role="button" aria-expanded="false" aria-controls="techncianCollapse">Add new techncian</a>
            <a className="nav-link" href="/" role="button" >Logout</a>
        </nav>
        <div className='container'>
            {/* for doctor registration */}
            <div className="collapse mt-2" id="doctorCollapse">
                <div className="card card-body">
                    <h1>Add new doctor</h1>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Full name</label>
                            <input className="form-control" type="text" name="name" placeholder="Enter doctor's name" aria-label="name" required minLength={true} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="hostpitalName" className="form-label">Hostpital name</label>
                            <input className="form-control" type="text" name="hostpitalName" placeholder="Enter Hospital name" aria-label="hostpitalName" required />
                        </div>
                        <select className="form-select form-select mb-3" required={true} aria-label=".form-select example">
                            <option selected>Gender</option>
                            <option value="1">Male</option>
                            <option value="2">Female</option>
                            <option value="3">Transgender</option>
                        </select>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                            <input type="email" name="email" className="form-control" id="name" placeholder="name@example.com" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleFormControlInput1" name="password" placeholder="password" required />
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
            {/* for technician registration */}
            <div className="collapse mt-2" id="techncianCollapse">
                <div className="card card-body">
                    <h1>Add new technician</h1>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Full name</label>
                            <input className="form-control" type="text" name="name" placeholder="Enter doctor's name" aria-label="name" required minLength={true} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Address</label>
                            <input className="form-control" type="text" name="address" placeholder="Address" aria-label="address" required minLength={true} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="education" className="form-label">Education</label>
                            <input className="form-control" type="text" name="education" placeholder="Address" aria-label="education" required minLength={true} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="villageName" className="form-label">Village name</label>
                            <input className="form-control" type="text" name="villageName" placeholder="Enter village name" aria-label="villageName" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="taluka" className="form-label">Taluka</label>
                            <input className="form-control" type="text" name="taluka" placeholder="Enter taluka name" aria-label="taluka" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="district" className="form-label">District</label>
                            <input className="form-control" type="text" name="district" placeholder="Enter district name" aria-label="district" required />
                        </div>
                        <label htmlFor="doctor" className="form-label">Doctor</label>
                        <div className=" input-group mb-3">
                            <input className="form-control" type="text" name="doctor" placeholder="Enter doctor name" aria-label="doctor" required />
                            <button type='button' className='btn btn-primary'>Search</button>
                        </div>
                        <select className="form-select form-select mb-3" required={true} aria-label=".form-select example">
                            <option selected>Gender</option>
                            <option value="1">Male</option>
                            <option value="2">Female</option>
                            <option value="3">Transgender</option>
                        </select>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                            <input type="email" name="email" className="form-control" id="name" placeholder="name@example.com" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleFormControlInput1" name="password" placeholder="password" required />
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>;
};

export default DashboardHome;
