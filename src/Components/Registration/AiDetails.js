import React, { useState } from 'react';
import Navbar from '../Navbar';

const AiDetails = (props) => {
    const [creds, setCreds] = useState({
        bullId: "",
        date: "",
        freshReports: "",
        tagNo: "",
        animalTagNo: ""
    });
    const [submitButtonLoading, setsubmitButtonLoading] = useState(false);

    const onChange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value });
    }

    const handleAiDetailsSubmit = async (e) => {
        e.preventDefault()
        setsubmitButtonLoading(true)
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/register/aidetails/`, {
                "method": "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json',
                    'auth-token': `${localStorage.getItem('auth_token')}`
                },
                body: JSON.stringify({ ...creds }),
            })
            if (response.status === 204) {
                props.setshowAlert("Success", 'Ai details created!')
                setCreds({
                    bullId: "",
                    date: "",
                    freshReports: "",
                    tagNo: "",
                    animalTagNo: ""
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
            <h2 className=''> AI Details</h2>
            <form className='mt-3' onSubmit={handleAiDetailsSubmit}>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="tag-number">Animal tag number:</span>
                    <input type="text" className="form-control" required={true} placeholder="Animal Tag number" aria-label="Bull Id" aria-describedby="tag-number" name="animalTagNo" value={creds.animalTagNo} onChange={onChange} />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="tag-number">Tag number:</span>
                    <input type="text" className="form-control" required={true} placeholder="Tag number" aria-label="tag-number" aria-describedby="tag-number" name="tagNo" value={creds.tagNo} onChange={onChange} />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="date">Date:</span>
                    <input type="date" className="form-control" required={true} placeholder="Tag Number" aria-label="Date" aria-describedby="date" name="date" value={creds.date} onChange={onChange} />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="bull-id">Bull id:</span>
                    <input type="text" className="form-control" required={true} placeholder="Bull Id" aria-label="Bull Id" aria-describedby="bull-id" name="bullId" value={creds.bullId} onChange={onChange} />
                </div>
                <select className="form-select form-select mb-3" required={true} aria-label=".form-select-lg example" name="freshReports" value={creds.freshReports} onChange={onChange} >
                    <option value="">Fresh Reports</option>
                    <option value="fresh">Fresh</option>
                    <option value="repeat-r1">Repeat R1</option>
                    <option value="repeat-r1">Repeat R2</option>
                </select>
                <button type="submit" className="btn btn-primary" disabled={(submitButtonLoading) ? true : false}>{(submitButtonLoading) ? 'Saving...' : 'Save'}</button>
            </form>
        </div>
    </div>;
};

export default AiDetails;
