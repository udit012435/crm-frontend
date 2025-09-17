import React, { useState } from 'react'
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { BASE_URL } from '../../config';

const AddLeave = () => {
    const { user } = useAuth();
    const [leave, setLeave] = useState({
        userId: user._id,
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setLeave((prevState) => ({ ...prevState, [name]: value }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`https://crm-server-4.onrender.com/api/leave/add`,leave,
                 {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.data.success) {
                navigate(`/employee-dashboard/leaves/${user._id}`)
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
        }
    }

    return (
        <div className='container d-flex justify-content-center mt-5' >
            <div className="box shadow px-5 py-3 " style={{ width: "70%", background: "rgb(224, 224, 224)", border: "2px solid gray", borderRadius: "8px" }}>
                <h3>Request For Leave:</h3>
                <form className='mt-4' onSubmit={handleSubmit}>
                    <div>
                        <div className='mb-3'>
                            <label htmlFor="leaveType" style={{ fontWeight: "500" }}>Leave Type</label>
                            <select name="leaveType" id="leaveType" className='form-select' onChange={handleChange} required>
                                <option value="">Select</option>
                                <option value="Sick Leave">Sick Leave</option>
                                <option value="Casual Leave">Casual Leave</option>
                                <option value="Annual Leave">Annual Leave</option>
                            </select>
                        </div>
                        <div className="row">
                            <div className='col-md-6 mb-3'>
                                <label htmlFor="startDate" style={{ fontWeight: "500" }}>From This Date</label>
                                <input
                                    type="date"
                                    name='startDate'
                                    className='form-control'
                                    id='startDate'
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='col-md-6 mb-3'>
                                <label htmlFor="endtDate" style={{ fontWeight: "500" }}>To This Date</label>
                                <input
                                    type="date"
                                    name='endDate'
                                    className='form-control'
                                    id='endDate'
                                    onChange={handleChange}
                                    required
                                />
                                <br />
                            </div>

                        </div>
                        <div>
                            <label htmlFor="endtDate" style={{ fontWeight: "500" }}>Description</label>
                            <textarea
                                name='reason'
                                placeholder='Reason'
                                className='form-control'
                                id='reason'
                                onChange={handleChange}
                                required
                            ></textarea>
                            <br />
                        </div>
                        <div>
                            <button className='btn btn-primary ' style={{ width: '35%', fontWeight: "500" }} type='submit'>SUBMIT</button>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default AddLeave;