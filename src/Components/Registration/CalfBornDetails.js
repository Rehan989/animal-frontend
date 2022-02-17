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
        bullId: "",
        villageName: "",
        ownerName: "",
        breed: "",
        species: "",
        freshReports: "",
        pdDate: ""
    })

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
                return data.aidetails.date
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

    const fetchPDDetails = async (tagNo) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/search/pdDetails/${tagNo}`, {
                "method": "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json',
                    'auth-token': `${localStorage.getItem('auth_token')}`
                },
            })
            const data = await response.json();
            if (data.success && data.pregnancyDetails) {
                let aiDate = await fetchAiDetails(data.pregnancyDetails.animalTagNo);
                if (!aiDate) {
                    return
                }
                setCreds({
                    ...creds,
                    animalTagNo: tagNo,
                    aiDate: aiDate,
                    breed: data.pregnancyDetails.breed,
                    species: data.pregnancyDetails.species,
                    freshReports: data.pregnancyDetails.freshReports,
                    bullId: data.pregnancyDetails.bullId,
                    villageName: data.pregnancyDetails.villageName,
                    ownerName: data.pregnancyDetails.ownerName,
                    pdDate: data.pregnancyDetails.date.substring(0, 10)
                });
            }
            else if (!data.pregnancyDetails) {
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
                    bullId: "",
                    villageName: "",
                    ownerName: "",
                    breed: "",
                    species: "",
                    freshReports: "",
                    pdDate: ""
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
            <h2 className=''> Register Calf Born Details</h2>
            <form onSubmit={handleCalfBornDetailsRegistration} className='mt-3'>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="tag-number">Tag number:</span>
                    <input type="number" className="form-control" required={true} placeholder="Enter Pd details Tag Number" aria-label="Tag Number" aria-describedby="tag-number" value={tagNo} onChange={(e) => settagNo(e.target.value)} />
                    <button onClick={() => fetchPDDetails(tagNo)} type='button' className='btn btn-primary'>Search</button>
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
                    <span className="input-group-text" id="date">PD Date:</span>
                    <input type="date" className="form-control" required={true} placeholder="PD date" aria-label="Date" aria-describedby="date" onChange={onChange} value={creds.pdDate} name="pdDate" disabled />
                </div>
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
                <button type="submit" className="btn btn-primary mt-5">Save</button>
            </form>
        </div>
    </div>;
};

export default CalfBornDetails;
