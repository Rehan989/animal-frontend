import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Signin = (props) => {
    let navigate = useNavigate()
    const [SignInCreds, setSignInCreds] = useState({ email: "", password: "", userType: "0" })
    const [signinButtonLoading, setsigninButtonLoading] = useState(false)

    const onChange = (e) => {
        setSignInCreds({ ...SignInCreds, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setsigninButtonLoading(true);
        try {
            if (SignInCreds.userType === "0") {
                props.setshowAlert("Error", "Please provide user type!")
                return
            }
            let user = (SignInCreds.userType === "1") ? "doctor" : "technician";
            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/auth/login/${user}`, {
                "method": "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ ...SignInCreds }),
            })
            const data = await response.json()
            if (data.success) {
                localStorage.setItem("auth_token", data.authtoken)
                localStorage.setItem("user_type", data.user_type)
                props.setshowAlert("Success", "Login Successful")
                if (localStorage.getItem('auth_token') && localStorage.getItem('user_type') === 'technician') {
                    navigate('/search/farmer/')
                }
                if (localStorage.getItem('auth_token') && localStorage.getItem('user_type') === 'doctor') {
                    navigate('/report')
                }
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
            setsigninButtonLoading(false)
        }
    }

    useEffect(() => {
        if (localStorage.getItem('auth_token') && localStorage.getItem('user_type') === 'technician') {
            navigate('/search/farmer/')
        }
        if (localStorage.getItem('auth_token') && localStorage.getItem('user_type') === 'doctor') {
            navigate('/report')
        }
    }, []);


    return <div>
        <div className="text-center">
            <div className='container'>
                <div className='position-absolute top-50 start-50 translate-middle'>
                    <h1 className='mb-5'>Welcome</h1>
                    <form action='/register/farmer' onSubmit={handleSubmit}>
                        <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" name='userType' onChange={onChange} required>
                            <option defaultValue value="0">Who are you?</option>
                            <option value="1">Veterinary Dispensary</option>
                            <option value="2">AI Technician</option>
                        </select>
                        <div className="form-floating mb-3">
                            <input type="email" name="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={onChange} value={SignInCreds.email} required />
                            <label htmlFor="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" name="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={onChange} value={SignInCreds.password} required />
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                        <button type="submit" className="btn mt-3 btn-primary" disabled={(signinButtonLoading) ? true : false}>{(signinButtonLoading) ? 'Submitting...' : 'Submit'}</button>
                    </form>
                </div>
            </div>
        </div>
    </div>;
};

export default Signin;
