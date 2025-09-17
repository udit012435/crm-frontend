import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'
// import { BASE_URL } from '../../config';


const Detail = () => {

    const { id } = useParams();
    const [leave, setLeave] = useState(null);
    const navigate = useNavigate();

    const fetchLeave = async () => {
        // setDepLoading(true)
        try {
            const response = await axios.get(`https://crm-server-4.onrender.com/api/leave/detail/${id}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.data.success) {
                setLeave(response.data.leave)
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
    useEffect(() => {

        fetchLeave();
    }, []);

    const changeStatus = async(id, status) => {
        try {
            const response = await axios.put(`https://crm-server-4.onrender.com/api/leave/${id}`,{status},
                {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
                }
            );

            if (response.data.success) {
                navigate('/admin-dashboard/leaves')
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
        }
    }

    return (
        <>{leave ? (
            <div>
                {/* <div>
            <img src={`http://localhost:5000/${employee.userId.profileImage}`} alt="" />
        </div> */}
                <div className="container d-flex justify-content-center " >
                    <div className="card p-3 mt-4 " style={{ width: "55rem", }} id='viewCard'>
                        {/* <div className='text-end me-3'><Link id='viewClose' to="/admin-dashboard/employees">X</Link></div> */}
                        <div className="row">
                            <div className="col-md-6">
                                <div className='mt-3'>
                                    <img className='img-fluid pb-3 ps-3 ' style={{ width:"70%", borderRadius:"30px"}} src={`https://crm-server-4.onrender.com/api/${leave.employeeId.userId.profileImage}`} alt="" />
                                    <h3 className=" ms-5 ps-1 fw-bold">{leave.employeeId.name.toUpperCase()}</h3>
                                </div>
                            </div>
                            <div className="col-md-6 ">
                                <div className="card-body mt-5  ">
                                            
                                    <div className="row">
                                        <div className="col-md-6">
                                            <p className="card-text"><b>Employee ID:</b> {leave.employeeId.employeeId}</p>
                                            <p className="card-text"><b>DOB : </b>{new Date(leave.employeeId.dob).toLocaleDateString()}</p>
                                            <p className="card-text"><b>Gender :</b> {leave.employeeId.gender.toUpperCase()}</p>
                                            <p className="card-text"><b>Department :</b> {leave.employeeId.department.dep_name}</p>
                                            <p className="card-text"><b>Marital Status :</b> {leave.employeeId.maritalStatus.toUpperCase()}</p>
                                        </div>
                                        <div className="col-md-6">
                                            <p className="card-text"><b>Leave Type :</b> {leave.leaveType.toUpperCase()}</p>
                                            <p className="card-text"><b>Leave Reason :</b> {leave.reason.toUpperCase()}</p>
                                            <p className="card-text"><b>Leave Duration :</b> {new Date(leave.startDate).toLocaleDateString()} to {new Date(leave.endDate).toLocaleDateString()}</p>
                                            <div className="card-text">
                                                <b>
                                                    {leave.status === "Pending" ? "Action:" : "Status:"}
                                                </b>
                                                {leave.status === "Pending" ? (
                                                    <div className='d-flex gap-3 mt-1'>
                                                        <div>
                                                            <button 
                                                            className='btn btn-success' 
                                                            style={{padding:"5px 10px"}}
                                                            onClick={() => changeStatus(leave._id, "Approved")}
                                                            >Approve</button>
                                                        </div>
                                                        <div>
                                                            <button 
                                                            className='btn btn-danger' 
                                                            style={{padding:"5px 10px"}}
                                                            onClick={() => changeStatus(leave._id, "Rejected")}
                                                            >Reject</button>
                                                        </div>
                                                    </div>
                                                ):<p> {leave.status.toUpperCase()}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) : <div>Loading...</div>}</>

    )
}

export default Detail;