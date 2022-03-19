import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import SimpleCard from './Cards/SimpleCard';

const Summary = (props) => {
    const [aiSummary, setaiSummary] = useState({});
    const [aiSummaryFilters, setaiSummaryFilters] = useState({
        village: "",
        periodFrom: "",
        periodTo: "",
    })

    const [aiSubmitButtonLoading, setaiSubmitButtonLoading] = useState(false)
    const [pdSubmitButtonLoading, setpdSubmitButtonLoading] = useState(false)
    const [calfBornSubmitButtonLoading, setcalfBornSubmitButtonLoading] = useState(false)

    const handleChange = (e) => {
        setaiSummaryFilters({ ...aiSummaryFilters, [e.target.name]: e.target.value });
    }

    const [pdSummary, setpdSummary] = useState({});
    const [pdSummaryFilters, setpdSummaryFilters] = useState({
        village: "",
        periodFrom: "",
        periodTo: "",
    })

    const handlePdFilterChange = (e) => {
        console.log(pdSummaryFilters)
        setpdSummaryFilters({ ...pdSummaryFilters, [e.target.name]: e.target.value });
    }

    const [calfBornSummary, setcalfBornSummary] = useState({});
    const [calfBornSummaryFilters, setcalfBornSummaryFilters] = useState({
        village: "",
        periodFrom: "",
        periodTo: "",
    })

    const handleCalfBornFilterChange = (e) => {
        setcalfBornSummaryFilters({ ...calfBornSummaryFilters, [e.target.name]: e.target.value });
    }

    async function getAiSummary() {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/summary/ai?village=${aiSummaryFilters.village}&periodfrom=${aiSummaryFilters.periodFrom}&periodto=${aiSummaryFilters.periodTo}`, {
                "method": "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json',
                    'auth-token': `${localStorage.getItem('auth_token')}`
                },
            })
            const data = await response.json()
            if (data.success) {
                setaiSummary(data);
            }
            else {
                props.setshowAlert("Error", data.error)
                return;
            }
        }
        catch (error) {
            console.log(error);
            props.setshowAlert("Error", "Internal Server Error")
        }
    }
    async function getPdSummary() {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/summary/pd?village=${pdSummaryFilters.village}&periodfrom=${pdSummaryFilters.periodFrom}&periodto=${pdSummaryFilters.periodTo}`, {
                "method": "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json',
                    'auth-token': `${localStorage.getItem('auth_token')}`
                },
            })
            const data = await response.json()
            if (data.success) {
                setpdSummary(data);
            }
            else {
                props.setshowAlert("Error", data.error)
                return;
            }
        }
        catch (error) {
            console.log(error);
            props.setshowAlert("Error", "Internal Server Error")
        }
    }
    async function getCalfBornSummary() {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/summary/calf-born?village=${calfBornSummaryFilters.village}&periodfrom=${calfBornSummaryFilters.periodFrom}&periodto=${calfBornSummaryFilters.periodTo}`, {
                "method": "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json',
                    'auth-token': `${localStorage.getItem('auth_token')}`
                },
            })
            const data = await response.json()
            if (data.success) {
                setcalfBornSummary(data);
            }
            else {
                props.setshowAlert("Error", data.error)
                return;
            }
        }
        catch (error) {
            console.log(error);
            props.setshowAlert("Error", "Internal Server Error")
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setaiSubmitButtonLoading(true)
        try {
            await getAiSummary();
        }
        catch (error) {
            console.log(error);
            props.setshowAlert("Error", "Internal Server Error")
        }
        finally {
            setaiSubmitButtonLoading(false)
        }
    }

    async function handlePdSubmit(e) {
        e.preventDefault();
        setpdSubmitButtonLoading(true)
        try {
            await getPdSummary();
        }
        catch (error) {
            console.log(error);
            props.setshowAlert("Error", "Internal Server Error")
        }
        finally {
            setpdSubmitButtonLoading(false)
        }
    }

    async function handleCalfBornSubmit(e) {
        e.preventDefault();
        setcalfBornSubmitButtonLoading(true)
        try {
            await getCalfBornSummary();
        }
        catch (error) {
            console.log(error);
            props.setshowAlert("Error", "Internal Server Error")
        }
        finally {
            setcalfBornSubmitButtonLoading(false)
        }
    }


    useEffect(() => {
        const fetchData = async () => {
            await getAiSummary();
            await getPdSummary();
            await getCalfBornSummary();
        }
        fetchData();
    }, [])


    return (
        <>
            <Navbar />
            <div className='container'>
                <div className='row'>
                    <SimpleCard title="No of AI registered" onSubmit={handleSubmit} handleChange={handleChange} detail={aiSummary} submitButtonLoading={aiSubmitButtonLoading}>
                        <hr />
                        <div className="row d-flex justfiy-content-center">
                            <div className='col-4'>
                                {`Fresh`}
                            </div>
                            <div className='col-4'>
                                {`Repeat R1`}
                            </div>
                            <div className='col-4'>
                                {`Repeat R2`}
                            </div>
                            <div className='col-4'>
                                <strong>{aiSummary.freshCounts}</strong>
                            </div>
                            <div className='col-4'>
                                <strong>{aiSummary.r1Counts}</strong>
                            </div>
                            <div className='col-4'>
                                <strong>{aiSummary.r2Counts}</strong>
                            </div>
                        </div>
                    </SimpleCard>
                    <SimpleCard title="No of PD registered" onSubmit={handlePdSubmit} handleChange={handlePdFilterChange} detail={pdSummary} submitButtonLoading={pdSubmitButtonLoading}>
                        <hr />
                        <div className="row d-flex justfiy-content-center">
                            <div className='col-6'>
                                {`Pregnant`}
                            </div>
                            <div className='col-6'>
                                {`Non-Pregnant`}
                            </div>
                            <div className='col-6'>
                                <strong>{pdSummary.pregnantCounts}</strong>
                            </div>
                            <div className='col-6'>
                                <strong>{pdSummary.nonPregnantCounts}</strong>
                            </div>
                        </div>
                    </SimpleCard>
                    <SimpleCard title="No of Calf Born registered" onSubmit={handleCalfBornSubmit} handleChange={handleCalfBornFilterChange} detail={calfBornSummary} submitButtonLoading={calfBornSubmitButtonLoading}>
                        <hr />
                        <div className="row d-flex justfiy-content-center">
                            <div className='col-6'>
                                {`Male`}
                            </div>
                            <div className='col-6'>
                                {`Female`}
                            </div>
                            <div className='col-6'>
                                <strong>{calfBornSummary.maleCounts}</strong>
                            </div>
                            <div className='col-6'>
                                <strong>{calfBornSummary.femaleCounts}</strong>
                            </div>
                        </div>
                    </SimpleCard>
                </div>
            </div>
        </>
    )
}

export default Summary