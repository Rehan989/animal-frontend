import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = (props) => {
    let navigate = useNavigate();
    async function verifyUser(auth_token, userType) {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/auth/user/${userType}`, {
                "method": "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json',
                    'auth-token':`${auth_token}`
                },
            })
            const data = await response.json()
            if(!data.email){
                localStorage.removeItem('auth_token')
                localStorage.removeItem('user_type')
                navigate('/')
                props.setshowAlert("Error", "Invalid credentials!")
                return
            }
            if(data.user_type==='admin'){
                navigate('/dashboard')
            }
        }
        catch (error) {
            navigate('/')
            console.log(error);
            props.setshowAlert("Error", "Internal Server Error")
        }
    }

    useEffect(() => {
        if(localStorage.getItem('user_type')==='admin'){
            navigate('/dashboard')
        }
        if (localStorage.getItem('auth_token') && localStorage.getItem('user_type')) 
        {
            verifyUser(localStorage.getItem('auth_token') ,localStorage.getItem('user_type'))
        }
        else{
            navigate('/')
        }
        
    }, []);

    return <div>
        <nav className="nav mt-3 mx-5 nav-pills nav-fill">
            {
            (!localStorage.getItem('user_type')==='doctor')?
            <>
            <a className="nav-link" aria-current="page" href="/search/farmer">Search Farmer</a>
            <a className="nav-link" href="/register/farmer">Register Farmer</a>
            <a className="nav-link" href="/register/animal">Register Animal</a>
            <a className="nav-link" href="/register/pd">Register PD</a>
            <a className="nav-link" href="/register/bullsemen">Register BullSemen</a>
            <a className="nav-link" href="/register/aidetails">AI Details</a>
            <a className="nav-link" href="/register/calfdetails">Calf Details</a>
            </>
            :''}
            <a className="nav-link" href="/report">Report</a>
            <a className="nav-link" href="/logout" role="button" >Logout</a>
        </nav>
    </div>;
};

export default Navbar;
