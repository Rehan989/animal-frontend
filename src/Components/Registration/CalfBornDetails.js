import React, { useState } from 'react';
import Navbar from '../Navbar';

const CalfBornDetails = (props) => {
    const [tagNo, settagNo] = useState("");
    const [creds, setCreds] = useState({
        animalTagNo: "",
        calfBornDate: "",
        aiDate: "",
        gender: "",
        easeOfCalvings: "",
        tagNo: "",
        gestationDays: "",
        villageName: "",
        ownerName: "",
        breed: "",
        species: "",
        freshReports: "",
    })
    const [submitButtonLoading, setsubmitButtonLoading] = useState(false);

    const onChange = (e) => {
        if (e.target.name === "calfBornDate" && creds.aiDate !== "") {
            console.log(e.target.name);
            console.log(creds);
            let aiDate = new Date(creds.aiDate.substring(0, 10));
            let gestationDays = new Date(e.target.value);
            setCreds({ ...creds, gestationDays: (gestationDays.getTime() - aiDate.getTime()) / (1000 * 3600 * 24), [e.target.name]: e.target.value });
        }
        else {
            setCreds({ ...creds, [e.target.name]: e.target.value });
        }
    }

    const fetchAiDetails = async (tagno) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/search/aidetails?tagno=${tagno}`, {
                "method": "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json',
                    'auth-token': `${localStorage.getItem('auth_token')}`
                },
            })
            const data = await response.json()
            if (data.success) {
                if (!data.aidetails) {
                    props.setshowAlert("Error", "No ai details with the bull account is registered!");
                    return false
                }
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

    const searchAnimal = async (tagno) => {
        try {
            setCreds({ ...creds, animalTagNo: tagno });
            console.log(tagno)

            let aidetails = await fetchAiDetails(tagno);
            console.log(aidetails)
            if (!aidetails) {
                return
            }

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
                console.log(aidetails)
                setCreds({
                    ...creds,
                    animalTagNo: tagno,
                    breed: data.animals.breed, species: data.animals.species, freshReports: aidetails.freshReports, aiDate: aidetails.date.substring(0, 10),
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

    const handleCalfBornDetailsRegistration = async (e) => {
        e.preventDefault();
        setsubmitButtonLoading(true)
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/register/calf-details/`, {
                "method": "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json',
                    'auth-token': `${localStorage.getItem('auth_token')}`
                },
                body: JSON.stringify({
                    ...creds
                }),
            })
            if (response.status === 204) {
                props.setshowAlert("Success", 'Calf born details Created Successfully!')
                setCreds({
                    animalTagNo: "",
                    calfBornDate: "",
                    gender: "",
                    easeOfCalvings: "",
                    tagNo: "",
                    gestationDays: "",
                    villageName: "",
                    ownerName: "",
                    breed: "",
                    species: "",
                    freshReports: "",
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
        finally {
            setsubmitButtonLoading(false);
        }
    }



    return <div>
        <Navbar />
        <div className='container mt-5'>
            <h2 className=''> Register Calf Born Details</h2>
            <form onSubmit={handleCalfBornDetailsRegistration} className='mt-3'>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="tag-number">Tag number:</span>
                    <input type="number" className="form-control" required={true} placeholder="Enter animal Tag Number" aria-label="Tag Number" aria-describedby="tag-number" value={tagNo} onChange={(e) => settagNo(e.target.value)} />
                    <button onClick={() => searchAnimal(tagNo)} type='button' className='btn btn-primary'>Search</button>
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
                    <span className="input-group-text" id="date">Calf Born Date:</span>
                    <input type="date" className="form-control" required={true} placeholder="Calf Born Date" aria-label="calf-born-date" aria-describedby="calf-born-date" name="calfBornDate" value={creds.calfBornDate} onChange={onChange} />
                </div>
                <select className="form-select form-select mb-3" required={true} aria-label=".form-select example" name="gender" value={creds.gender} onChange={onChange} >
                    <option value="">Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="transgender">Transgender</option>
                </select>
                <select className="form-select form-select mb-3" required={true} aria-label=".form-select-lg example" name="easeOfCalvings" value={creds.easeOfCalvings} onChange={onChange}>
                    <option value="">Ease of Calving</option>
                    <option value="Normal">Normal</option>
                    <option value="Dystokia">Dystokia</option>
                </select>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="tag-number">Tag number:</span>
                    <input type="text" className="form-control" required={true} placeholder="Tag Number" aria-label="tag-number" aria-describedby="tag-number" name="tagNo" value={creds.tagNo} onChange={onChange} />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="gestation-days">Gestation Days:</span>
                    <input type="text" className="form-control" required={true} placeholder="Automatic (Calf born date-recent-ai date)" aria-label="gestation-days" aria-describedby="gestation-days" name="gestationDays" value={creds.gestationDays} disabled />
                </div>
                <button type="submit" className="btn btn-primary my-3" disabled={(submitButtonLoading) ? true : false}>{(submitButtonLoading) ? 'Saving...' : 'Save'}</button>
            </form>
        </div>
    </div>;
};

export default CalfBornDetails;
