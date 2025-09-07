import React, {useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";

const filterMethods = {
    'aeropress': 'Aeropress',
    'drip_coffee': 'Drip Coffee',
    'v60': 'V60'
};

export default function EditBrew() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        bean_name: '',
        method: '',
        coffee_grams: '',
        water_grams: '',
        rating: '',
        tasting_notes: '',
    });

    useEffect(() => {
        document.title = 'Edit Brew';
        fetch(`${process.env.REACT_APP_API_URL}${id}/`)
            .then((response) => response.json())
            .then((data) => {setFormData(data); console.log("=>",data)});
    }, [id]);

    if (!formData) return <p>Loading Edit Form...</p>

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((f) => ({ ...f, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}${id}/`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData),
        })
            .then(() => navigate("/"))
    };

    const handleDelete = () => {
        let confirm = window.confirm("Do you want to remove this brew permanently?");

        if (confirm){
            fetch(`${process.env.REACT_APP_API_URL}${id}/`, {
                method: 'DELETE',
            }).then(() => navigate("/"));
        }
    };

    return (
        <div className={"container py-3"}>
            <form onSubmit={handleSubmit}>
                <div className={"row mb-3 g-3"}>
                    <div className={"col-auto"}>
                        <h2>Edit a Brew</h2>
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
                            value={formData.method}
                            name={"method"}
                            onChange={handleChange}
                            className={"form-select"}
                            required
                        >
                            <option value="">Select a method</option>
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
                            <button className={"btn btn-danger"} type={"button"} onClick={handleDelete}>Delete</button>
                        </div>
                        <div className={"col-auto"}>
                            <button className={"btn btn-secondary bg-dark"} type={"submit"}>Save</button>
                        </div>
                    </div>

                </div>
            </form>
        </div>
    )

}
