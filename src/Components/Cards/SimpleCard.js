import React, { useEffect, useState } from 'react'

const SimpleCard = (props) => {

    const [Villages, setVillages] = useState({});
    const [VillagesLoading, setVillagesLoading] = useState(true);
    const [district, setDistrict] = useState("");
    const [taluka, setTaluka] = useState("");

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

    useEffect(() => {
        const fetchData = async () => {
            await fetchVillages();
        }
        fetchData();

    }, []);

    return (
        <div className="card mx-3 mb-3">
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                {/* villages list */}
                <div>
                    <form onSubmit={props.onSubmit}>
                        <h6>Select Villages</h6>
                        <div>
                            <select onChange={(e) => { setDistrict(e.target.value); setTaluka("") }
                            } className="form-select form-select mb-3 input-group-required-text" aria-label=".form-select-lg example">
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
                                <select value={props.detail.village} name="village" onChange={props.handleChange} className="form-select form-select mb-3 input-group-required-text" required={true} aria-label=".form-select-lg example">
                                    <option value={""}>Select Village</option>
                                    {
                                        Villages.villages[district][taluka].map(taluka => {
                                            return <option value={taluka} key={taluka}>
                                                {taluka}
                                            </option>
                                        })
                                    }
                                </select> : ''}
                        </div>
                        <div>
                            <div className="input-group mb-3">
                                <span className="input-group-text input-group-required-text" id="date">Period From:</span>
                                <input type="date" className="form-control" required={true} placeholder="Period from" aria-label="Date" aria-describedby="date" value={props.detail.periodFrom} name="periodFrom" onChange={props.handleChange} />

                                <span className="input-group-text input-group-required-text" id="date">Period to:</span>
                                <input type="date" className="form-control" required={true} placeholder="Period to" aria-label="Date" aria-describedby="date"
                                    value={props.detail.periodTo} name="periodTo" onChange={props.handleChange} />
                            </div>
                        </div>
                        <button type="submit" className="btn mt-3 btn-primary" disabled={(props.submitButtonLoading) ? true : false}>{(props.submitButtonLoading) ? 'Applying...' : 'Apply filters'}</button>
                    </form>
                </div>
                <div>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default SimpleCard