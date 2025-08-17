// import React from "react";

import { useNavigate } from "react-router-dom"
import axios from "axios";

export const columns = [
    {
        name: "S. No.", 
        selector: (row) => row.sno,
       
    },
    {
        name: "Department Name",
        selector: (row) => row.dep_name
    },
    {
        name: "Description",
        selector: (row) => row.description, // Add description column
    },
    {
        name: "Action",
        selector: (row) => row.action
    },

]

export const DepartmentButton = ({Id, onDepartmentDelete}) => {
    const navigate = useNavigate()
    const handleDelete = async(id) => {
        const confirm = window.confirm("Do you want to delete the department?")
        if(confirm) {

            try {
                
                const response = await axios.delete(`http://localhost:5000/api/department/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.data.success) {
                    onDepartmentDelete()
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                } 
            }
        }          

    };
    return(
        <div>
            <button className="pt-1 pb-1 btn btn-success" 
            onClick={() => navigate(`/admin-dashboard/department/${Id}`)}>Edit</button>
            <button className="pt-1 pb-1 ms-2 btn btn-danger" 
            onClick={() =>  handleDelete(Id)}>Delete</button>
        </div>
    )
}