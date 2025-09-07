import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";

// Method options for filtering
const filterMethods = {
    aeropress: 'Aeropress',
    drip_coffee: 'Drip Coffee',
    v60: 'V60'
};

export default function BrewLog() {
    const [brews, setBrews] = useState([]);
    const [filteredBrews, setFilteredBrews] = useState([]);
    const [selectMethod, setSelectMethod] = useState('All');

    // Fetch data from API
    useEffect(() => {

        fetch(`${process.env.REACT_APP_API_URL}`)
            .then(response => response.json())
            .then(data => {
                setBrews(data);
                document.title = `Brews: ${data.length}`
                setFilteredBrews(data); // Initialize filtered brews with all data
            })
            .catch(error => {
                console.error('Error fetching brews:', error);
                setBrews([]);
                setFilteredBrews([]);
            });
    }, []); // Remove filters from dependency to prevent infinite calls

    // Filter brews when selectMethod changes
    useEffect(() => {
        let filtered = brews;

        if (selectMethod !== 'All') {
            filtered = brews.filter(brew => brew.method === selectMethod);
        }

        setFilteredBrews(filtered);
    }, [brews, selectMethod]); // Add proper dependencies



    const clearFilters = () => {
        setSelectMethod('All');
    }

    return (
        <div className={"container py-3 py-md-5"}>
            <nav className={"row mb-3"}>
                <div className={"col-auto"}>
                    <h2>Brew Log</h2>
                </div>
                <div className={"col-auto ms-auto"}>
                    <Link to="/brews/add" className={"btn btn-secondary bg-dark"}>Add</Link>
                </div>
            </nav>

            <div className={"row mb-3"}>
                <div className={"col-auto"}>
                    <select
                        value={selectMethod}
                        onChange={(e) => setSelectMethod(e.target.value)}
                        className={"form-select"}
                        aria-label={"Filter by method"}
                    >
                        <option value={"All"}>All Methods</option>
                        {Object.entries(filterMethods).map(([key, value]) => (
                            <option key={key} value={key}>{value}</option>
                        ))}
                    </select>
                </div>
                {selectMethod !== 'All' && (
                    <div className={"col-auto"}>
                        <button
                            className={"btn btn-outline-secondary"}
                            onClick={clearFilters}
                        >
                            Clear Filter
                        </button>
                    </div>
                )}
            </div>

            <hr/>

            {Array.isArray(filteredBrews) && filteredBrews.map(brew => (
                <>
                    <div className={"row mb-3"}>
                        <div className={"col-md-2"}>
                            <strong>Rating:</strong> <small className={"text-muted"}>{brew.rating}/5</small>
                        </div>
                        <div className={"col-md-7"}>
                            <div className={"row"}>
                                <div className={"col-12"}>
                                    <h4 className={"mb-1"}>{brew.bean_name}</h4>
                                </div>
                            </div>
                            <div className={"row g-2 mb-3"}>
                                <div className={"col-4 text-center"}>
                                    <div className={"border border-dark rounded p-1"}>
                                        <p className={"mb-0"}>{filterMethods[brew.method] || brew.method}</p>
                                    </div>

                                </div>
                                <div className={"col-4 text-center"}>
                                    <div className={"border border-dark rounded p-1"}>
                                        <p className={"mb-0"}>🫘 {brew.coffee_grams}g</p>
                                    </div>

                                </div>
                                <div className={"col-4 text-center"}>
                                    <div className={"border border-dark rounded p-1"}>
                                        <p className={"mb-0"}>💧 {brew.water_grams}g</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className={"col-md-3 text-end"}>
                            <Link to={`/brews/${brew.id}/edit`} className={"btn btn-secondary"}>Edit</Link>
                        </div>
                    </div>
                    <hr/>
                </>
            ))}

            {filteredBrews.length === 0 && brews.length > 0 && (
                <div className={"row"}>
                    <div className={"col-12 text-center"}>
                        <p className={"text-muted"}>
                            No brews found.
                        </p>
                        <button
                            className={"btn btn-primary"}
                            onClick={clearFilters}
                        >
                            Show All Brews
                        </button>
                    </div>
                </div>
            )}

            {brews.length === 0 && (
                <div className={"row"}>
                    <div className={"col-12 text-center"}>
                        <p className={"text-muted"}>
                            No Brews Available. Click the 'Add' button to create new coffee brews
                        </p>
                    </div>
                </div>
            )}
        </div>
    );

}
