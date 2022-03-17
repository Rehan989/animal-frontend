import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';

const Farmer = (props) => {
    const [Villages, setVillages] = useState({});
    const [VillagesLoading, setVillagesLoading] = useState(true);
    const [district, setDistrict] = useState("");
    const [taluka, setTaluka] = useState("");
    const [creds, setCreds] = useState({
        name: "",
        village: "",
        phone: "",
        rationCard: "",
        addhar: "",
        gender: ""
    });
    const [submitButtonLoading, setsubmitButtonLoading] = useState(false)

    const onChange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value });
    }

    const fetchVillages = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/get/villages/`, {
                "method": "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json'
                }
            })
            const data = await response.json()
            setVillages(data);
            setVillagesLoading(false);
        }
        catch (error) {
            console.log(error);
            props.setshowAlert("Error", "Internal Server Error")
            return
        }
    }

    const registerFarmer = async (e) => {
        e.preventDefault()
        setsubmitButtonLoading(true);
        try {
            let userGender = "";
            switch (creds.gender) {
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

            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/register/farmer/`, {
                "method": "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json',
                    'auth-token': `${localStorage.getItem('auth_token')}`
                },
                body: JSON.stringify({
                    name: creds.name,
                    village: creds.village,
                    sex: userGender,
                    mobileNo: creds.phone,
                    rationCard: creds.rationCard,
                    addhar: creds.addhar
                }),
            })
            if (response.status === 204) {
                props.setshowAlert("Success", 'Farmer User Created Successfully!')
                setCreds({
                    name: "",
                    village: "",
                    phone: "",
                    rationCard: "",
                    addhar: "",
                    gender: ""
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
            setsubmitButtonLoading(false)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await fetchVillages();
        }
        fetchData();

    }, []);

    return <div>
        <Navbar />
        <div className='container mt-5'>
            <h2 className=''> Register Farmer</h2>
            <form onSubmit={registerFarmer} className='mt-3'>
                <div className="input-group mb-3">
                    <span className="input-group-text input-group-required-text" id="name">Name: </span>
                    <input type="text" name="name" className="form-control" required={true} placeholder="Full name" aria-label="Full name" aria-describedby="name" minLength={3} value={creds.name} onChange={onChange} />
                </div>
                <select onChange={(e) => { setDistrict(e.target.value); setTaluka("") }
                } className="form-select form-select mb-3 input-group-required-text" required={true} aria-label=".form-select-lg example">
                    <option value={""}>Select District</option>
                    {
                        (!VillagesLoading) ?

                            Object.keys(Villages.villages).map(district => {
                                return <option value={district} key={district} >
                                    {district}
                                </option>
                            })
                            :
                            ''
                    }

                </select>
                {(!VillagesLoading && district !== "") ?
                    <select onChange={(e) => setTaluka(e.target.value)
                    } className="form-select form-select mb-3 input-group-required-text" required={true} aria-label=".form-select-lg example">
                        <option value={""}>Select Taluka</option>
                        {
                            Object.keys(Villages.villages[district]).map(taluka => {
                                return <option value={taluka} key={taluka}>
                                    {taluka}
                                </option>
                            })
                        }
                    </select> : ''}
                {(!VillagesLoading && taluka !== "") ?
                    <select value={creds.village} name="village" onChange={onChange} className="form-select form-select mb-3 input-group-required-text" required={true} aria-label=".form-select-lg example">
                        <option value={""}>Select Village</option>
                        {
                            Villages.villages[district][taluka].map(taluka => {
                                return <option value={taluka} key={taluka}>
                                    {taluka}
                                </option>
                            })
                        }
                    </select> : ''}
                <div className="input-group mb-3">
                    <span className="input-group-text input-group-required-text" id="phone-number">Phone:</span>
                    <input value={creds.phone} onChange={onChange} type="number" minLength={10} required={true} name="phone" className="form-control" placeholder="Phone Number" aria-label="Phone Number" aria-describedby="phone-number" />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="ration-card">Ration Card:</span>
                    <input value={creds.rationCard} onChange={onChange}
                        name="rationCard" type="number" className="form-control" placeholder="Ration Card Number" aria-label="Ration Card" aria-describedby="ration-card" />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="addhar-card">Addhar:</span>
                    <input type="number" onChange={onChange} value={creds.addhar} name="addhar" className="form-control" placeholder="Addhar Card Number" aria-label="addhar-card" aria-describedby="addhar-card" />
                </div>
                <select name="gender" value={creds.gender} onChange={onChange} className="form-select form-select mb-3 input-group-required-text input-group-required-text">
                    <option cla value="">Gender</option>
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                    <option value="3">Transgender</option>
                </select>
                <button type="submit" className="btn mt-3 btn-primary" disabled={(submitButtonLoading) ? true : false}>{(submitButtonLoading) ? 'Submitting...' : 'Submit'}</button>
            </form>
        </div>
    </div >;
};

export default Farmer;
