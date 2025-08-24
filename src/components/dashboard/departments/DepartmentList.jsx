import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from 'react-data-table-component'
import { columns, DepartmentButton } from "../../../utils/DepartmentHelper";
import axios from "axios";
import { BASE_URL } from "../../../config";


export const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);
    const [depLoading, setDepLoading] = useState(false);
    const [filteredDepartments, setFilteredDepartments] = useState([]);

    const onDepartmentDelete = () => {
        fetchDepartments()
    }
    
    const fetchDepartments = async () => {
         setDepLoading(true)
         try {
             const response = await axios.get(`${BASE_URL}department/`, {
                 headers: {
                     "Authorization": `Bearer ${localStorage.getItem('token')}`
                 }
             });
             if (response.data.success) {
                 let sno = 1;
                 const data = response.data.departments.map((dep) => ({
                     _id: dep._id,
                     sno: sno++,
                     dep_name: dep.dep_name,
                     description: dep.description,
                     action: (<DepartmentButton Id={dep._id} onDepartmentDelete={onDepartmentDelete}/>),
                 }));
                 setDepartments(data);
                 setFilteredDepartments(data);
             }
         } catch (error) {
             if (error.response && !error.response.data.success) {
                 alert(error.response.data.error);
             } 
         } finally{
             setDepLoading(false)
         }
     };

    useEffect(() => {
        fetchDepartments();
    }, []);

    const filterDepartments = (e) => {
        const records = departments.filter((dep) => dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()))
        setFilteredDepartments(records)
    }

    return(
    <>{depLoading ? <div>Loading...</div> : 

    <div>
        <div>
            <h3 className="text-center">Manage Department</h3>
        </div>
        <br />
        <div className="row mb-5">
            <div className="col-md-6">
                <input onChange={filterDepartments} className="form-control pe-5 ps-2" style={{width:'60%',}} type="text" placeholder="Search by dep. name" />
            </div>
            <div className="text-end col-md-6">
            < Link to="/admin-dashboard/add-department" id="addDepart">Add New Department</Link>
            </div>
        </div>
        <div className="departmentTable">
            <DataTable columns={columns} data={filteredDepartments} pagination/>
        </div>
    </div>
    }</>
    );
};