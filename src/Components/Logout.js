import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Logout = () => {
    let navigate = useNavigate();
    if (localStorage.getItem('auth_token')) {
        localStorage.removeItem('auth_token')
    }
    useEffect(() => {
        navigate('/')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return <div></div>;
};

export default Logout;
