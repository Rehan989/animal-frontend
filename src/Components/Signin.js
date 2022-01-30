import React from 'react';
import { useState } from 'react';
const Signin = () => {
    const [SignInCreds, setSignInCreds] = useState({ email: "", password: "", userType: "" })

    const onChange = (e) => {
        setSignInCreds({ ...SignInCreds, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (SignInCreds.userType === "0") {
            console.log("Please provide userType");
            return
        }
        let user = (SignInCreds.userType === "1") ? "doctor" : "technician";
        const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/auth/login/${user}`, {
            "method": "POST",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify({...SignInCreds}),
        })
        const data = await response.json()
        console.log(data);
    }

    return <div>
        <div className="text-center">
            <div className='container'>
                <div className='position-absolute top-50 start-50 translate-middle'>
                    <h1 className='mb-5'>Welcome</h1>
                    <form action='/register/farmer' onSubmit={handleSubmit}>
                        <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" name='userType' onChange={onChange} defaultValue={"0"} required>
                            <option value={"0"}>Who are you?</option>
                            <option value="1">Doctor</option>
                            <option value="2">Technician</option>
                        </select>
                        <div className="form-floating mb-3">
                            <input type="email" name="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={onChange} value={SignInCreds.email} required />
                            <label htmlFor="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" name="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={onChange} value={SignInCreds.password} required />
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                        <button type="submit" className="btn mt-3 btn-primary">Login</button>
                    </form>
                </div>
            </div>
        </div>
    </div>;
};

export default Signin;
