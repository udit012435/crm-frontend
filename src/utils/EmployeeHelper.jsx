import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Tooltip } from 'react-tooltip';

export const columns = [
    {
        name: "S. NO.",
        selector: (row) => row.sno,
        width: "70px",

    },
    {
        name: "NAME",
        selector: (row) => row.name,
        sortable: true,
        width: "150px"
    },
    {
        name: "IMAGE",
        selector: (row) => row.profileImage,
        width: "130px"
    },
    {
        name: "DEPARTMENT",
        selector: (row) => row.dep_name,
        width: "130px"
    },
    {
        name: "DOB",
        selector: (row) => row.dob,
        sortable: true,
        width: "100px"
    },
    {
        name: "ACTION",
        selector: (row) => row.action,
        // center: true,
    },

];

export const fetchDepartments = async () => {
    let departments
    try {
        const response = await axios.get(`http://localhost:5000/api/department/`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (response.data.success) {
            departments = response.data.departments
        }
    } catch (error) {
        if (error.response && !error.response.data.success) {
            alert(error.response.data.error);
        }
    }
    return departments
};

export const EmployeeButton = ({ Id }) => {
    const navigate = useNavigate();

    return (
        <div>
            <button 
                title="View employee" 
                className=" btn btn-primary" 
                style={{padding:"2px 15px"}}
                onClick={() => navigate(`/admin-dashboard/employees/${Id}`)}>
                <i className ="bi bi-eye-fill"></i>
            </button>

            <button 
                title= "Edit emplyee data" 
                className=" ms-2 btn btn-info" 
                style={{padding:"2px 15px"}}
                onClick={() => navigate(`/admin-dashboard/employees/edit/${Id}`)}
            ><i className ="bi bi-pencil-square text-light"></i>
            </button>

            <button 
                title= "View Leaves" 
                className=" ms-2 btn btn-danger" 
                style={{padding:"2px 15px"}}
                onClick={() => navigate(`/admin-dashboard/employees/leaves/${Id}`)}
            ><i className ="bi bi-box-arrow-right"></i>
            </button>
        </div>
    )
}