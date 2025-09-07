import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Method options for selection
const filterMethods = {
    aeropress: 'Aeropress',
    drip_coffee: 'Drip Coffee',
    v60: 'V60'
};

export default function AddBrew() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        bean_name: '',
        method: 'aeropress',
        coffee_grams: '',
        water_grams: '',
        rating: '',
        tasting_notes: '',
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((f) => ({ ...f, [name]: value }));
    };

    document.title = 'Add Brew';

    const handleSubmit = (e) => {
        e.preventDefault();

        const formatData = {
            bean_name: formData.bean_name,
            method: formData.method,
            coffee_grams: parseFloat(formData.coffee_grams),
            water_grams: parseFloat(formData.water_grams),
            rating: parseInt(formData.rating),
            tasting_notes: formData.tasting_notes,
        }

        fetch(`${process.env.REACT_APP_API_URL}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formatData),
        })
            .then((response) => response.json())
            .then(() => navigate("/"));
    };

    return (
        <div className={"container py-3"}>
            <form onSubmit={handleSubmit}>
                <div className={"row mb-3"}>
                    <div className={"col-auto"}>
                        <h2>Add a Brew</h2>
                    </div>
                    <div className={"col-auto ms-auto"}>
                        <button className={"btn btn-secondary bg-dark"} onClick={() => navigate("/")}>Back</button>
                    </div>
                </div>

                <div className={"row g-3 mb-4"}>

                    <div className={"mb-3"}>
                        <label>Beans</label><br/>
                        <input type="text" name="bean_name" value={formData.bean_name} onChange={handleChange} required/>
                        <br/>
                    </div>

                    <div className={"col-auto mb-3"}>
                        <label>Method</label><br/>
                        <select
                            onChange={handleChange}
                            className={"form-select"}
                            name={"method"}
                            required
                        >
                            {Object.entries(filterMethods).map(([key, value]) => (
                                <option key={key} value={key}>{value}</option>
                            ))}
                        </select>

                    </div>

                    <div className={"mb-3"}>
                        <div className={"row"}>
                            <div className={"col-auto"}>
                                <label>Coffee grams</label><br/>
                                <input type="number" name="coffee_grams" value={formData.coffee_grams} onChange={handleChange} required/>
                                <br/>
                            </div>
                            <div className={"col-auto"}>
                                <label>Water grams</label><br/>
                                <input type="number" name="water_grams" value={formData.water_grams} onChange={handleChange} required/>
                                <br/>
                            </div>
                        </div>
                    </div>

                    <div className={"mb-3"}>
                        <label>Rating (out of 5)</label><br/>
                        <input type="number" name="rating" value={formData.rating} min={0} max={5} onChange={handleChange} required/>
                        <br/>
                    </div>

                    <div className={"mb-3"}>
                        <label>Tasting notes</label><br/>
                        <textarea name="tasting_notes" value={formData.tasting_notes} onChange={handleChange} required/>
                        <br/>
                    </div>

                    <div className={"row d-flex mt-3"}>
                        <div className={"col-auto"}>
                            <button type={"submit"} className={"btn btn-secondary bg-dark"}>Save</button>
                        </div>
                    </div>

                </div>
            </form>
        </div>
    );

}
