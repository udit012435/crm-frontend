import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../config";

const EditDepartment = () => {
    const {id} = useParams();
    const [department, setDepartment] = useState([])
    const [depLoading, setDepLoading] = useState(false)
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchDepartments = async () => {
            setDepLoading(true)
            try {
                const response = await axios.get(`${BASE_URL}department/${id}`, {
                    headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.data.success) {
                    setDepartment(response.data.department)
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                } 
            } finally{
                setDepLoading(false)
            }
        };

        fetchDepartments();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment({ ...department, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${BASE_URL}department/${id}`, department, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.data.success) {
                navigate("/admin-dashboard/departments"); // Redirect after successful submission
            }
        } catch (error) {
            // Improved error handling
            if (error.response && error.response.data.error) {
                alert(`Error: ${error.response.data.error}`);
            } else {
                alert("An unexpected error occurred. Please try again.");
            }
        }
    }

    return (
<>{depLoading ? <div>Loading...</div> :
    <div>
        <div className="container py-3" style={{ maxWidth: '500px', background: "rgb(227, 227, 227)", borderRadius: '5px', marginTop: '6rem', height: '30rem' }}>
            <div className="px-4 py-2">
                <h3 className="mb-4">Edit Department</h3>
                <form onSubmit={handleSubmit}>
                    {/* Department Name */}
                    <div className="mb-3">
                        <label htmlFor="dep_name" className="form-label">Department Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="dep_name"
                            name="dep_name" // Added name attribute to bind to state
                            placeholder="Enter Department Name"
                            value={department.dep_name} // Bind value to state
                            onChange={handleChange}
                        />
                    </div>

                    {/* Description */}
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea
                            className="form-control"
                            id="description"
                            name="description" // Added name attribute to bind to state
                            rows="4"
                            placeholder="Add Description"
                            value={department.description} // Bind value to state
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    {/* <button type="submit" className="btn btn-primary mt-5 w-100 fw-bold">UPDATE DEPARTMENT</button> */}
                    <div className="row">
                        <div className="col-md-6">
                            {/* <button type="submit" className="btn btn-primary mt-5 w-100 fw-bold">ADD DEPARTMENT</button> */}
                            < Link to="/admin-dashboard/departments" className="btn btn-danger mt-3 w-100 fw-bold">CANCEL</Link>
                        </div>
                        <div className="col-md-6">
                            {/* Submit Button */}
                            <button type="submit" className="btn btn-primary mt-3 w-100 fw-bold">UPDATE DEPARTMENT</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    }</>
    );
};

export default EditDepartment;
