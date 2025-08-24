import { useState } from "react";
import { useEffect } from "react"
import { columns, LeaveButtons } from "../../utils/LeaveHelper";
import DataTable from "react-data-table-component";
import axios from "axios";
import { BASE_URL } from "../../config";



const Table = () => {

  const [leaves, setLeaves] = useState(null);
  const [filteredLeaves, setFilteredLeaves] = useState(null);

  const fetchLeaves = async () => {
    try {
      const response = await axios.get(`${BASE_URL}leave`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.data.success) {

        let sno = 1;
        const data = response.data.leaves.map((leave) => ({
          _id: leave._id,
          sno: sno++,
          employeeId: leave.employeeId.employeeId,
          name: leave.employeeId.userId.name,
          leaveType: leave.leaveType,
          department: leave.employeeId.department.dep_name,
          days:
            new Date(leave.endDate).getDate() - new Date(leave.startDate).getDate(),
          status: leave.status,
          action: (<LeaveButtons Id={leave._id} />),
        }));
        setLeaves(data)
        setFilteredLeaves(data)
        // console.log("Leaves data: ", leaves)

        // setFilteredEmployees(data)
        // setFilteredDepartments(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  }

  useEffect(() => {
    fetchLeaves()
  }, []);

  const handleFilter = (e) => {
    const data = leaves.filter(leave => leave.employeeId.toLowerCase().includes(e.target.value.toLowerCase()));
    setFilteredLeaves(data);
  }
  
  const filterByButton = (status) => {
    const data = leaves.filter(leave => leave.status.toLowerCase().includes(status.toLowerCase()));
    setFilteredLeaves(data);
  }

  return (
    <div>
      {filteredLeaves ? (
        <div>
          <div>
            <h3 className='text-center'>Manage Leaves</h3>
          </div>
          <br />
          <div className="row mb-5 ">
            <div className="col-md-6">
              <input
                className="form-control pe-5 ps-2"
                style={{ width: '60%', }} type="text"
                placeholder="Search by employee I'd"
                onChange={handleFilter}
              />
            </div>
            <div className="text-end col-md-6" id='btn'>
              <button className='me-2'
                onClick={()=> filterByButton("Pending")}
              >Pending</button>
              <button className='me-2'
                onClick={()=> filterByButton("Approved")}
              >Approved</button>
              <button className='me-2'
                onClick={()=> filterByButton("Rejected")}
              >Rejected</button>
            </div>
          </div>
          <div className="dataTable">
            <DataTable columns={columns} data={filteredLeaves} pagination />
          </div>
        </div>
      ) : <div>Loading....</div>}
    </div>
  )
}

export default Table;