import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { fetchDepartments } from '../../utils/EmployeeHelper';
import axios from 'axios';

const Edit = () => {

    const [employee, setEmployee] = useState({
        name: "",
        maritalStatus: "",
        designation: "",
        department: "",
        salary: 0,

    });
    const [departments, setDepartments] = useState(null);
    //   const [formData, setFormData] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const fetchEmployee = async () => {
            // setDepLoading(true)
            try {
                const response = await axios.get(`http://localhost:5000/api/employee/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.data.success) {
                    const employee = response.data.employee
                    setEmployee((prev) => ({ ...prev, name: employee.userId.name,
                         maritalStatus: employee.maritalStatus,
                         designation: employee.designation,
                         salary: employee.salary,
                         department: employee.department
                         }))
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                }
            }
            // finally{
            //     setDepLoading(false)
            // }
        };
        fetchEmployee()
    }, []);

    useEffect(() => {
        const getDepartments = async () => {
            const departments = await fetchDepartments()
            setDepartments(departments)
        }
        getDepartments()
    }, []);

    const navigate = useNavigate();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prevData) => ({ ...prevData, [name]: value }))
    };
    const handleSubmit = async (e) => {
        e.preventDefault()

  

        try {
            const response = await axios.put(`http://localhost:5000/api/employee/${id}`, employee, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.data.success) {
                navigate("/admin-dashboard/employees"); // Redirect after successful submission
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
        <>{departments && employee ? (
            <div className="container d-flex justify-content-center align-items-center mt-5">
                <div className="card shadow mt-3 px-5 py-3" style={{ width: "70%" }}>
                    <div className="card-title"><h3>Edit Employee :</h3></div>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="name" >Name</label>
                                <input
                                    type="text"
                                    onChange={handleChange}
                                    value={employee.name}
                                    id='name'
                                    name="name"
                                    placeholder='Enter Name'
                                    className='form-control'
                                    
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="emp_marry_status">Marital Status</label>
                                <select name="maritalStatus" className='form-select'
                                    onChange={handleChange}
                                    value={employee.maritalStatus}
                                    id='maritalStatus' >
                                    <option value="">Select</option>
                                    <option value="single">Single</option>
                                    <option value="married">Married</option>
                                </select>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-4">
                                <label htmlFor="designation" >Designation</label>
                                <input
                                    type="text"
                                    onChange={handleChange}
                                    value={employee.designation}
                                    name="designation"
                                    id='designation'
                                    placeholder='Enter Name Designation'
                                    className='form-control'
                                    
                                />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="department" >Department</label>
                                <select 
                                name="department" 
                                className='form-select' 
                                onChange={handleChange} 
                                id='department' 
                                value={employee.department} 
                                >
                                    <option value="">Select</option>
                                    {departments.map(dep => (
                                        <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="salary" >Salary</label>
                                <input
                                    type="number"
                                    onChange={handleChange}
                                    value={employee.salary}
                                    name="salary"
                                    id='salary'
                                    placeholder="Enter the Salary"
                                    className='form-control'
                                    
                                />
                            </div>
                        </div>

                        {/* for submit */}
                        <div className="row mt-5 mb-3">
                            <div className="col-md-6">
                                < Link to="/admin-dashboard/employees" className="btn btn-danger mb-3 w-100 fw-bold">CANCEL</Link>
                            </div>
                            <div className="col-md-6">
                                <button type='submit' className='btn btn-success w-100 fw-bold'>SUBMIT</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        ) : <div>Loading...</div>}</>

    )
}

export default Edit;