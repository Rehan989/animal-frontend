import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardHome = (props) => {
    let navigate = useNavigate()
    const [doctorCreds, setdoctorCreds] = useState({ doctorName: "", doctorHostpitalName: "", doctorGender: "", doctorEmail: "", doctorPassword: "" })
    const [technicianCreds, settechnicianCreds] = useState({
        technicianAddress: "", technicianEducation: "", technicianVillageName: "", technicianTaluka: "",
        technicianDistrict: "", technicianDoctor: "", technicianDoctorId: "", technicianName: "", technicianGender: "", technicianEmail: "", technicianPassword: ""
    })
    const [ShowDoctors, setShowDoctors] = useState(false);
    const [Doctors, setDoctors] = useState([]);
    const [isAdmin, setisAdmin] = useState(false);
    const [DoctorSubmitButtonLoading, setDoctorSubmitButtonLoading] = useState(false);
    const [TechnicianSubmitButtonLoading, setTechnicianSubmitButtonLoading] = useState(false);

    async function handleDoctorCredsChange(e) {
        setdoctorCreds({ ...doctorCreds, [e.target.name]: e.target.value })
    }

    async function onTechnicianCredsChange(e) {
        settechnicianCreds({ ...technicianCreds, [e.target.name]: e.target.value })
    }

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
        if (response.status === 200)
            return true
        else {
            return false
        }
    }

    async function handleDoctorSignUpSubmit(e) {
        e.preventDefault();
        setDoctorSubmitButtonLoading(true);
        try {

            let userGender = "";
            switch (doctorCreds.doctorGender) {
                case "1":
                    userGender = "male"
                    break
                case "2":
                    userGender = "female"
                    break
                case "3":
                    userGender = "transgender"
                    console.log("youtube");
                    break
                default:
                    props.setshowAlert("Error", "Please select a gender")
                    return
            }
            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/auth/signup/doctor`, {
                "method": "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json',
                    'auth-token': `${localStorage.getItem('auth_token')}`
                },
                body: JSON.stringify({ name: doctorCreds.doctorName, hospitalName: doctorCreds.doctorHostpitalName, email: doctorCreds.doctorEmail, gender: userGender, password: doctorCreds.doctorPassword }),
            })
            const data = await response.json()
            if (data.success) {
                props.setshowAlert("Success", "Doctor Account created Successfully!")
                setdoctorCreds({ doctorName: "", doctorHostpitalName: "", doctorGender: "", doctorEmail: "", doctorPassword: "" })
                return
            }
            else {
                props.setshowAlert("Error", data.error)
                return
            }
        }
        catch (error) {
            console.log(error);
            props.setshowAlert("Error", "Internal Server Error")
        }
        finally {
            setDoctorSubmitButtonLoading(false)
        }
    }

    async function handleTechnicianSignupSubmit(e) {
        e.preventDefault();
        setTechnicianSubmitButtonLoading(true)
        try {
            let userGender = "";
            switch (technicianCreds.technicianGender) {
                case "1":
                    userGender = "male"
                    break
                case "2":
                    userGender = "female"
                    break
                case "3":
                    userGender = "transgender"
                    break
                default:
                    props.setshowAlert("Error", "Please select a gender")
                    return
            }
            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/auth/signup/technician`, {
                "method": "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json',
                    'auth-token': `${localStorage.getItem('auth_token')}`
                },
                body: JSON.stringify({ name: technicianCreds.technicianName, address: technicianCreds.technicianAddress, education: technicianCreds.technicianEducation, villageName: technicianCreds.technicianVillageName, taluka: technicianCreds.technicianTaluka, district: technicianCreds.technicianDistrict, doctor: technicianCreds.technicianDoctorId, email: technicianCreds.technicianEmail, password: technicianCreds.technicianPassword, gender: userGender }),
            })
            const data = await response.json()
            if (data.success) {
                props.setshowAlert("Success", `Technician user created Successfully!`)
                settechnicianCreds({
                    technicianAddress: "", technicianEducation: "", technicianVillageName: "", technicianTaluka: "",
                    technicianDistrict: "", technicianDoctor: "", technicianDoctorId: "", technicianName: "", technicianGender: "", technicianEmail: "", technicianPassword: ""
                })
                return
            }
            else {
                props.setshowAlert("Error", `${data.error}`)
                return
            }
        }
        catch (error) {
            console.log(error);
            props.setshowAlert("Error", "Internal Server Error")
        }
        finally {
            setTechnicianSubmitButtonLoading(false)
        }
    }

    async function SearchDoctors(name) {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/search/doctor?name=${name}`, {
                "method": "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json',
                    'auth-token': `${localStorage.getItem('auth_token')}`
                },
            })
            const data = await response.json()
            console.log(data);
            if (data.success) {
                setDoctors(data.doctors)
                if (data.doctors.length === 0) {
                    props.setshowAlert("Error", `Doctor with the name not found!`)
                    setShowDoctors(false)
                    return
                }
                setShowDoctors(true)
            }
            else {
                props.setshowAlert("Error", `${data.error}`)
                return
            }
        }
        catch (error) {
            console.log(error);
            props.setshowAlert("Error", "Internal Server Error")
        }
    }


    useEffect(() => {
        let admin = false;
        async function fetchData() {
            admin = await verifyAdminUser(localStorage.getItem('auth_token'))
            console.log(admin);
            setisAdmin(true)
        }
        if (localStorage.getItem('auth_token')) {
            fetchData()
        }
        else {
            navigate('/dashboard')
        }
    }, [isAdmin]);

    return (isAdmin) ? <div>
        <nav className="nav nav-pills my-3 mx-2 nav-fill">
            <a className="nav-link" data-bs-toggle="collapse" href="#doctorCollapse" role="button" aria-expanded="false" aria-controls="doctorCollapse">Add new doctor</a>
            <a className="nav-link" data-bs-toggle="collapse" href="#techncianCollapse" role="button" aria-expanded="false" aria-controls="techncianCollapse">Add new techncian</a>
            <a className="nav-link" href="/logout" role="button" >Logout</a>
        </nav>
        <div className='container'>
            {/* for doctor registration */}
            <div className="collapse mt-2" id="doctorCollapse">
                <div className="card card-body">
                    <h1>Add new doctor</h1>
                    <form onSubmit={handleDoctorSignUpSubmit}>
                        <div className="mb-3">
                            <label htmlFor="doctorName" className="form-label">Full name</label>
                            <input onChange={handleDoctorCredsChange} value={doctorCreds.doctorName} className="form-control" type="text" id="doctorName" name="doctorName" placeholder="Enter doctor's name" aria-label="doctorName" required minLength={3} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="doctorHostpitalName" className="form-label">Hostpital name</label>
                            <input onChange={handleDoctorCredsChange} value={doctorCreds.doctorHostpitalName} className="form-control" type="text" name="doctorHostpitalName" placeholder="Enter Hospital name" aria-label="doctorHostpitalName" required />
                        </div>
                        <select onChange={handleDoctorCredsChange} value={doctorCreds.doctorGender} className="form-select form-select mb-3" name="doctorGender" required={true} aria-label=".form-select example">
                            <option>Gender</option>
                            <option value="1">Male</option>
                            <option value="2">Female</option>
                            <option value="3">Transgender</option>
                        </select>
                        <div className="mb-3">
                            <label htmlFor="doctorEmail" className="form-label">Email address</label>
                            <input onChange={handleDoctorCredsChange} value={doctorCreds.doctorEmail} type="email" name="doctorEmail" className="form-control" id="doctorEmail" placeholder="name@example.com" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="doctorPassword" className="form-label">Password</label>
                            <input onChange={handleDoctorCredsChange} value={doctorCreds.doctorPassword} type="password" className="form-control" id="exampleFormControlInput1doctorPassword" name="doctorPassword" placeholder="password" required minLength={6} />
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={(DoctorSubmitButtonLoading) ? true : false}>{(DoctorSubmitButtonLoading) ? 'Submitting...' : 'Submit'}</button>
                    </form>
                </div>
            </div>
            {/* for technician registration */}
            <div className="collapse mt-2" id="techncianCollapse">
                <div className="card card-body">
                    <h1>Add new technician</h1>
                    <form onSubmit={handleTechnicianSignupSubmit}>
                        <div className="mb-3">
                            <label htmlFor="technicianName" className="form-label">Full name</label>
                            <input className="form-control" type="text" name="technicianName" placeholder="Enter Technician's name" aria-label="technicianName" required minLength={3} onChange={onTechnicianCredsChange} value={technicianCreds.technicianName} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="technicianAddress" className="form-label">Address</label>
                            <input className="form-control" type="text" name="technicianAddress" id="technicianAddress" placeholder="Address" aria-label="technicianAddress" required onChange={onTechnicianCredsChange} value={technicianCreds.technicianAddress} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="technicianEducation" className="form-label">Education</label>
                            <input className="form-control" type="text" name="technicianEducation" placeholder="Education" aria-label="technicianEducation" required onChange={onTechnicianCredsChange} value={technicianCreds.technicianEducation} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="technicianVillageName" className="form-label">Village name</label>
                            <input className="form-control" type="text" name="technicianVillageName" placeholder="Enter village name" aria-label="technicianVillageName" required onChange={onTechnicianCredsChange} value={technicianCreds.technicianVillageName} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="technicianTaluka" className="form-label">Taluka</label>
                            <input className="form-control" type="text" name="technicianTaluka" placeholder="Enter taluka name" aria-label="technicianTaluka" required onChange={onTechnicianCredsChange} value={technicianCreds.technicianTaluka} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="technicianDistrict" className="form-label">District</label>
                            <input className="form-control" type="text" name="technicianDistrict" placeholder="Enter district name" aria-label="technicianDistrict" required onChange={onTechnicianCredsChange} value={technicianCreds.technicianDistrict} />
                        </div>
                        <label htmlFor="technicianDoctor" className="form-label">Doctor</label>
                        <div className=" input-group mb-3">
                            <input className="form-control" type="text" name="technicianDoctor" placeholder="Enter doctor name" aria-label="technicianDoctor" onChange={onTechnicianCredsChange} value={technicianCreds.technicianDoctor} />
                            <button type='button' onClick={() => SearchDoctors(technicianCreds.technicianDoctor)} className='btn btn-primary'>Search</button>
                        </div>
                        {ShowDoctors ? <select className="form-select form-select mb-3" required={true} name="technicianDoctorId" aria-label=".form-select example" onChange={onTechnicianCredsChange} value={technicianCreds.technicianDoctorId}>
                            <option>Select a doctor</option>
                            {
                                Doctors.map(function (doctor) {
                                    return <option key={doctor.email} value={`${doctor.email}`}>{doctor.name}</option>
                                })
                            }
                        </select> : ""}
                        <select className="form-select form-select mb-3" required={true} name="technicianGender" aria-label=".form-select example" onChange={onTechnicianCredsChange} value={technicianCreds.technicianGender}>
                            <option>Gender</option>
                            <option value="1">Male</option>
                            <option value="2">Female</option>
                            <option value="3">Transgender</option>
                        </select>
                        <div className="mb-3">
                            <label htmlFor="technicianEmail" className="form-label">Email address</label>
                            <input type="email" name="technicianEmail" className="form-control" aria-label='technicianEmail' id="technicianEmail" placeholder="name@example.com" required onChange={onTechnicianCredsChange} value={technicianCreds.technicianEmail} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="technicianPassword" className="form-label">Password</label>
                            <input type="password" className="form-control" id="technicianPassword" name="technicianPassword" aria-label='technicianPassword' placeholder="password" required onChange={onTechnicianCredsChange} value={technicianCreds.technicianPassword} />
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={(TechnicianSubmitButtonLoading) ? true : false}>{(TechnicianSubmitButtonLoading) ? 'Submitting...' : 'Submit'}</button>
                    </form>
                </div>
            </div>
        </div>
    </div> : ''
};

export default DashboardHome;
