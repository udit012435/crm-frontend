import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { columns, EmployeeButton } from '../../utils/EmployeeHelper';
import DataTable from 'react-data-table-component';
import axios from 'axios';

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const fetchEmployees = async () => {
    setEmpLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/employee/`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.data.success) {
        let sno = 1;
        try {
          const data = response.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            dep_name: emp.department ? emp.department.dep_name : 'N/A', // Added null check
            name: emp.name, // <<<<<<< CHANGED THIS LINE
            dob: new Date(emp.dob).toLocaleDateString(),
            profileImage: emp.userId && emp.userId.profileImage ? // Added null checks for userId and profileImage
              <img style={{ borderRadius: "50px", width: "45%" }} className='img-fluid ' src={`http://localhost:5000/${emp.userId.profileImage}`} /> :
              <span>No Image</span>, // Fallback if no image
            action: (<EmployeeButton Id={emp._id} />),
          }));
          // console.log("yaha aaya +++++++>>>>>>>>>>", data); // Verify the transformed data
          setEmployees(data);
          setFilteredEmployees(data);
        } catch (error) {
          console.log("Error during data mapping: ", error); // More descriptive error message
        }
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      } else {
        console.error("Error fetching employees:", error); // Log generic network/other errors
        alert("An error occurred while fetching employees.");
      }
    } finally {
      setEmpLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleFilter = (e) => {
    const records = employees.filter((emp) => (
      emp.name && emp.name.toLowerCase().includes(e.target.value.toLowerCase()) // Added null check for emp.name
    ));
    setFilteredEmployees(records);
  };

  return (
    <div>
      <div>
        <h3 className='text-center'>Manage Employee</h3>
      </div>
      <br />
      <div className="row mb-5 ">
        <div className="col-md-6">
          <input
            className="form-control pe-5 ps-2"
            style={{ width: '60%', }} type="text"
            placeholder="Search by employee name"
            onChange={handleFilter}
          />
        </div>
        <div className="text-end col-md-6">
          <Link to="/admin-dashboard/add-employee" id="addDepart">Add New Employee</Link>
        </div>
      </div>
      <div>{empLoading ? <div>Loading...</div> :
        <div className="employeeDataTable">
          <DataTable columns={columns} data={filteredEmployees} pagination />
        </div>
      }</div>
    </div>
  );
};

export default List;