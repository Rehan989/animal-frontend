import React, { useState } from 'react';
import Navbar from '../Navbar';
import { useSearchParams } from "react-router-dom";

const AiDetails = (props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [creds, setCreds] = useState({
        bullId: "",
        date: "",
        freshReports: "",
        animalTagNo: "",
    });
    const [submitButtonLoading, setsubmitButtonLoading] = useState(false);
    const [bullAccounts, setBullAccounts] = useState([])
    const [showBullAccounts, setShowBullAccounts] = useState(false)

    const onChange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value });
    }

    const fetchBullAccounts = async () => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/search/bull/`, {
            "method": "GET",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json',
                'auth-token': `${localStorage.getItem('auth_token')}`
            }
        })
        const data = await response.json()
        setBullAccounts(data.bullAccounts);
        setShowBullAccounts(true);
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

    React.useEffect(() => {
        const fetchData = async () => {
            await fetchBullAccounts();
        }
        fetchData();

        let animalTagNo = searchParams.get('animal');
        if (animalTagNo) {
            setCreds({ ...creds, animalTagNo: animalTagNo })
        }


    }, []);

    return <div>
        <Navbar />
        <div className='container mt-5'>
            <h2 className=''> AI Details</h2>
            <form className='mt-3' onSubmit={handleAiDetailsSubmit}>
                <div className="input-group mb-3">
                    <span className="input-group-text input-group-required-text" id="tag-number">Animal Tag number:</span>
                    <input type="text" className="form-control" required={true} placeholder="Tag number" aria-label="tag-number" aria-describedby="tag-number" name="animalTagNo" value={creds.animalTagNo} onChange={onChange} />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text input-group-required-text" id="date">Date:</span>
                    <input type="date" className="form-control" required={true} placeholder="Tag Number" aria-label="Date" aria-describedby="date" name="date" value={creds.date} onChange={onChange} />
                </div>
                {(showBullAccounts) ?
                    <select className="form-select form-select mb-3 input-group-required-text" required={true} name="bullId" value={creds.bullId} onChange={onChange} aria-label=".form-select example">
                        <option value={""}>Select Bull Account</option>
                        {
                            bullAccounts.map(function (bull) {
                                return <option key={bull.bullId} value={`${bull.bullId}`}>{bull.bullId}</option>
                            })
                        }
                    </select> : ''}
                <select className="form-select form-select mb-3 input-group-required-text" required={true} aria-label=".form-select-lg example" name="freshReports" value={creds.freshReports} onChange={onChange} >
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
