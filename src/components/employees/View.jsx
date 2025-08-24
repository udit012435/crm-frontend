import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom'

import { BASE_URL } from '../../config';

const View = () => {

    const {id} = useParams();
    const [employee, setEmployee] = useState(null)

     useEffect(() => {
            const fetchEmployee = async () => {
                // setDepLoading(true)
                try {
                    const response = await axios.get(`${BASE_URL}employee/${id}`, {
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                   
                    if (response.data.success) {
                        setEmployee(response.data.employee)
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
    
            fetchEmployee();
        }, []);

  return (
    <>{employee ? (
    <div>
        {/* <div>
            <img src={`http://localhost:5000/${employee.userId.profileImage}`} alt="" />
        </div> */}
        <div className="container d-flex justify-content-center " >
            <div className="card p-3 mt-4 " style={{width: "45rem", }} id='viewCard'>
                {/* <div className='text-end me-3'><Link id='viewClose' to="/admin-dashboard/employees">X</Link></div> */}
                <h3 className='text-center text-light'>Employee Details</h3>
                <div className="row">
                    <div className="col-md-6">
                        <div >
                            <img className='img-fluid pb-3 ps-3' style={{borderRadius: "100%"}} src={`https://crm-server-2-248k.onrender.com/${employee.userId.profileImage}`} alt="" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card-body mt-5 ms-3">
                             <h5 className="card-title"><b>Name : </b>{employee.userId.name.toUpperCase()}</h5>
                             <p className="card-text"><b>Employee ID:</b> {employee.employeeId}</p>
                             <p className="card-text"><b>DOB : </b>{new Date(employee.dob).toLocaleDateString()}</p>
                             <p className="card-text"><b>Gender :</b> {employee.gender.toUpperCase()}</p>
                             <p className="card-text"><b>Department :</b> {employee.department.dep_name.toUpperCase()}</p>
                             <p className="card-text"><b>Marital Status :</b> {employee.maritalStatus.toUpperCase()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    ): <div>Loading...</div>}</>
    
  )
}

export default View