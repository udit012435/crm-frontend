import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fetchDepartments } from '../../utils/EmployeeHelper';
import axios from 'axios';
import { BASE_URL } from '../../config';

const AddEmployee = () => {
  
  const [departments , setDepartments] = useState([]);
  const [formData, setFormData] = useState({});

  useEffect(()=>{
    const getDepartments = async() => {
      const departments = await fetchDepartments()
      setDepartments(departments)
    } 
    getDepartments()
  }, []);

  const navigate = useNavigate(); 


  const handleChange = (e) => {
    const {name, value, files} = e.target;
    if(name==="image"){
      setFormData((prevData)=>({...prevData, [name] : files[0]}))
    }else{
      setFormData((prevData)=>({...prevData, [name] : value}))
    }
  };
  const handleSubmit = async(e) => {
    e.preventDefault()

    const formDataObj = new FormData()
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key])
    })

    try {
                const response = await axios.post(`${BASE_URL}employee/add`, formDataObj, {
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
    <>
      <div className="container">
        <div className="card shadow mt-3 p-3 mb-3" style={{backgroundColor:"rgba(197, 197, 197, 1)"}}>
          <div className="card-title"><h3>Add Employee :</h3></div>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-4">
                <label htmlFor="name" >Name</label>
                <input
                  type="text"
                  onChange={handleChange}
                  id='name'
                  name="name"
                  placeholder='Enter Name'
                  className='form-control'
                  required
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="email" >Email I'd</label>
                <input
                  type="text"
                  onChange={handleChange}
                  id='email'
                  name="email"
                  placeholder="Enter Email I'd"
                  className='form-control'
                  required
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="employeeId" >Employee I'd</label>
                <input
                  type="text"
                  onChange={handleChange}
                  id='employeeId'
                  name="employeeId"
                  placeholder="Enter Employee I'd"
                  className='form-control'
                  required
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-4">
                <label htmlFor="dob" >Date Of Birth</label>
                <input
                  type="date"
                  onChange={handleChange}
                  id='dob'
                  name="dob"
                  className='form-control'
                  required
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="gender" >Gender</label>
                <select name="gender" className="form-select" onChange={handleChange} id='gender' required>
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="col-md-4">
                <label htmlFor="emp_marry_status">Marital Status</label>
                <select name="maritalStatus" className='form-select' onChange={handleChange} id='maritalStatus' required>
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
                  name="designation"
                  id='designation'
                  placeholder='Enter Name Designation'
                  className='form-control'
                  required
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="department" >Department</label>
                <select name="department" className='form-select' onChange={handleChange} id='department' required>
                  <option value="">Select</option>
                  {departments.map(dep => (
                    <option  key={dep._id} value={dep._id}>{dep.dep_name}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <label htmlFor="salary" >Salary</label>
                <input
                  type="number"
                  onChange={handleChange}
                  name="salary"
                  id='salary'
                  placeholder="Enter the Salary"
                  className='form-control'
                  required
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-4">
                <label htmlFor="password">Set Password</label>
                <input type="text"
                  onChange={handleChange}
                  name='password'
                  id='password'
                  placeholder='********'
                  className='form-control'
                  required
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="role">Role</label>
                <select name="role" className='form-select' onChange={handleChange} id='role'>
                  <option value="">Select</option>
                  <option value="admin">Admin</option>
                  <option value="employee">Employee</option>
                </select>
              </div>
              <div className="col-md-4">
                <label htmlFor="image">Upload Image</label>
                <input type="file"
                onChange={handleChange}
                  name="image"
                  placeholder='Upload Image'
                  accept='image/*'
                  id='image'
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

    </>
  )
}

export default AddEmployee