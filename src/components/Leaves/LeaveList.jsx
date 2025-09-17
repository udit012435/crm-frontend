import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/authContext';
// import { BASE_URL } from '../../config';

const LeaveList = () => {
  const [leaves, setLeaves] = useState(null);
  const [leaveLoading, setLeaveLoading] = useState(false);
  let sno = 1;
  const {id} = useParams();
  const {user} = useAuth();
  
  const fetchLeaves = async () => {
     setLeaveLoading(true)
    try {
        const response = await axios.get(`https://crm-server-4.onrender.com/api/leave/${id}/${user.role}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          },
      });
      if(response.data.success){
        setLeaves(response.data.leaves)
      }
    }catch(error){
      if(error.response && !error.response.data.success){
        alert(error.message);
      }
    }finally{
      setLeaveLoading(false)
    }
  };

  useEffect(()=>{
    fetchLeaves();
  }, [])

  if(!leaves){
    return <div>Loading...</div>
  }

  return (
     <>{leaveLoading ? <div>Loading...</div> : 
    <div>
      <div>
        <h3 className='text-center'>Manage Leaves</h3>
      </div>
      <br />
      <div className="row mb-5 ">
        <div className="col-md-6">
    
        </div>
        {user.role === "employee" && (
          <div className="text-end col-md-6 ">
            < Link to="/employee-dashboard/add-leave" id="addDepart">Add Leave</Link>
          </div>
        )}
      </div>
      <div className='container' id='leaveTable'>
        <table className='w-100 '>
          <thead style={{background:"rgb(216, 216, 216)",border:"1px solid black"}}>
            <tr>
              <th style={{padding:"10px 20px"}}>S.No.</th>
              <th>Leave Type</th>
              <th>From</th>
              <th>To</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
           <tbody>
          {leaves.map((leave) =>(
            <tr
            key={leave._id}
            style={{border:"1px solid black"}}
            className='text-muted'
            >
              <td className='text-dark' style={{padding:"10px 20px"}}>{sno++}</td>
              <td>{leave.leaveType}</td>
              <td>{new Date(leave.startDate).toLocaleDateString()}</td>
              <td>{new Date(leave.endDate).toLocaleDateString()}</td>
              <td>{leave.reason}</td>
              <td>{leave.status}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
    }</>
  )
}

export default LeaveList;