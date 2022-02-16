import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar'

const PDRegistration = (props) => {
    const [tagNo, settagNo] = useState("");

    const [creds, setCreds] = useState({
        animalTagNo: "",
        bullId: "",
        villageName: "",
        ownerName: "",
        aiDate: "",
        breed: "",
        species: "",
        freshReports: "",
        pdDate: "",
        pdResult: "",
        pregnancyDays: "",
        doctorName: "",
        tagNo: ""
    });

    const onChange = (e) => {
        if (e.target.name === "pdDate" && creds.aiDate !== "") {
            let aiDate = new Date(creds.aiDate);
            let pdDate = new Date(e.target.value);
            setCreds({ ...creds, pregnancyDays: (pdDate.getTime() - aiDate.getTime()) / (1000 * 3600 * 24), [e.target.name]: e.target.value });
        } else {
            setCreds({ ...creds, [e.target.name]: e.target.value });
        }
    }

    const fetchAiDetails = async (bullid) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/search/aidetails?bullid=${bullid}`, {
                "method": "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json',
                    'auth-token': `${localStorage.getItem('auth_token')}`
                },
            })
            const data = await response.json()
            if (data.success) {
                return data.aidetails
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

    const fetchFarmer = async (farmerPhoneNumber) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/search/farmer?phone=${farmerPhoneNumber}`, {
                "method": "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json',
                    'auth-token': `${localStorage.getItem('auth_token')}`
                },
            })
            const data = await response.json()
            if (data.success) {
                return data.farmerUser
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

    const fetchTechnician = async (auth_token, userType) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/auth/user/${userType}`, {
                "method": "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json',
                    'auth-token': `${auth_token}`
                },
            })
            const data = await response.json()
            if (data.email) {
                return data
            }
            props.setshowAlert("Error", "Invalid credentials!")
            return
        }
        catch (error) {
            console.log(error);
            props.setshowAlert("Error", "Internal Server Error")
        }
    }

    const fetchDoctor = async (doctor_id) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/search/doctor?email=${doctor_id}`, {
                "method": "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json',
                    'auth-token': `${localStorage.getItem('auth_token')}`
                },
            })
            const data = await response.json()
            if (data.success) {
                return data.doctor
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

    const searchAnimal = async (tagno) => {
        try {
            setCreds({ ...creds, animalTagNo: tagNo });

            let aidetails = await fetchAiDetails(tagno);

            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/search/animals?tagno=${tagno}`, {
                "method": "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json',
                    'auth-token': `${localStorage.getItem('auth_token')}`
                },
            })
            const data = await response.json()
            if (data.success && data.animals) {
                let farmerDetails = await fetchFarmer(data.animals.farmerId);
                let techncianUser = await fetchTechnician(localStorage.getItem('auth_token'), localStorage.getItem('user_type'))
                let doctorDetails = await fetchDoctor(techncianUser.doctor);
                setCreds({
                    ...creds,
                    animalTagNo: tagno,
                    breed: data.animals.breed, species: data.animals.species, freshReports: aidetails.freshReports, bullId: aidetails.bullId, aiDate: aidetails.date.substring(0, 10),
                    villageName: farmerDetails.village, ownerName: farmerDetails.name, doctorName: doctorDetails.name
                });
                if (!data.animals) {
                    props.setshowAlert("Error", "No bull found with the specific tag Number")
                }
            }
            else if (!data.animals) {
                props.setshowAlert("Error", `No details found with the corresponding tag number!`)
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

    const registerPD = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/register/pd/`, {
                "method": "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json',
                    'auth-token': `${localStorage.getItem('auth_token')}`
                },
                body: JSON.stringify({ ...creds }),
            })
            if (response.status === 204) {
                props.setshowAlert("Success", 'PD details created!')
                setCreds({
                    animalTagNo: "",
                    tagNo: "",
                    bullId: "",
                    villageName: "",
                    ownerName: "",
                    aiDate: "",
                    breed: "",
                    species: "",
                    freshReports: "",
                    pdDate: "",
                    pdResult: "",
                    pregnancyDays: "",
                    doctorName: "",
                })
                return
            }
            const data = await response.json();
            if (Array.isArray(data.errors)) {
                props.setshowAlert("Error", data.errors[0])
                return
            }
            if (data.error) {
                props.setshowAlert("Error", data.error)
                return
            }
        }
        catch (error) {
            console.log(error);
            props.setshowAlert("Error", "Internal Server Error")
        }
    }


    return <div>
        <Navbar />
        <div className='container mt-5'>
            <h2 className=''> Register PD Details</h2>
            <form onSubmit={registerPD} className='mt-3'>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="tag-number">Tag number of animal:</span>
                    <input type="number" className="form-control" required={true} placeholder="Enter bull Tag Number" aria-label="Tag Number" aria-describedby="tag-number" value={tagNo} onChange={(e) => settagNo(e.target.value)} />
                    <button onClick={() => searchAnimal(tagNo)} type='button' className='btn btn-primary'>Search</button>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="tag-number">Bull ID:</span>
                    <input type="number" className="form-control" required={true} placeholder="Enter bull id" aria-label="Bull id" aria-describedby="bull-id" value={creds.bullId} name="bullId" disabled />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="tag-number">Village name:</span>
                    <input type="text" className="form-control" required={true} placeholder="Enter Village name" aria-label="village name" aria-describedby="village-name" value={creds.villageName} name="villageName" disabled />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="tag-number">Owner name:</span>
                    <input type="text" className="form-control" required={true} placeholder="Enter Owner name" aria-label="Owner name" aria-describedby="owner-name" value={creds.ownerName} name="ownerName" disabled />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="date">AI Date:</span>
                    <input type="date" className="form-control" required={true} placeholder="ai-date" aria-label="ai-date" aria-describedby="ai-date" value={creds.aiDate} name="aiDate" disabled />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="species">Species:</span>
                    <input type="text" className="form-control" required={true} placeholder="species" aria-label="species" aria-describedby="species" value={creds.species} name="species" disabled />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="breed">Breed:</span>
                    <input type="text" className="form-control" required={true} placeholder="breed" aria-label="breed" aria-describedby="breed" value={creds.breed} name="breed" disabled />
                </div>
                <select className="form-select form-select mb-3" required={true} aria-label=".form-select-lg example" name="freshReports" value={creds.freshReports} disabled>
                    <option value="">Fresh Reports</option>
                    <option value="fresh">Fresh</option>
                    <option value="repeat-r1">Repeat R1</option>
                    <option value="repeat-r1">Repeat R2</option>
                </select>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="tagNumber">Tag number:</span>
                    <input type="number" className="form-control" required={true} placeholder="Enter bull id" aria-label="tag-number" aria-describedby="tag-number" value={creds.tagNo} name="tagNo" onChange={onChange} />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="date">PD Date:</span>
                    <input type="date" className="form-control" required={true} placeholder="PD date" aria-label="Date" aria-describedby="date" onChange={onChange} value={creds.pdDate} name="pdDate" />
                </div>
                <select className="form-select form-select mb-3" required={true} aria-label=".form-select-lg example" value={creds.pdResult} name="pdResult" onChange={onChange}>
                    <option value="">PD Result</option>
                    <option value="pregnant">Pregnant</option>
                    <option value="non-pregnant">Non Pregnant</option>
                </select>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="tag-number">PD days:</span>
                    <input type="number" className="form-control" required={true} placeholder="Pd days" aria-label="pd days" aria-describedby="pd-days" value={creds.pregnancyDays} name="pregnancyDays" disabled />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="calvings">VD USER ID:</span>
                    <input type="text" className="form-control" placeholder="Doctor's name" aria-label="doctors-name" aria-describedby="doctors-name" name="doctorName" value={creds.doctorName} disabled />
                </div>
                <button type="submit" className="btn btn-primary mt-5">Register</button>
            </form>
        </div>
    </div>;
};

export default PDRegistration;
