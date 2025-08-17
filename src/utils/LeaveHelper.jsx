import { useNavigate } from "react-router-dom";
import { FaEye } from 'react-icons/fa';

export const columns = [
    {
        name: "S. NO.",
        selector: (row) => row.sno,
        width: "70px",

    },
    {
        name: "Emp ID",
        selector: (row) => row.employeeId,
        sortable: true,
        width: "150px",
    },
    {
        name: "NAME",
        selector: (row) => row.name,
        width: "150px",
    },
    {
        name: "LEAVE TYPE",
        selector: (row) => row.leaveType,
        width: "150px",
    },
    {
        name: "DEPARTMENT",
        selector: (row) => row.department,
        width: "150px",
    },
    {
        name: "DAYS",
        selector: (row) => row.days,
        width: "120px",
    },
    {
        name: "STATUS",
        selector: (row) => row.status,
        width: "130px",
    },
    {
        name: "ACTION",
        selector: (row) => row.action,
        // center: true,
        width: "150px",
    },

];

export const LeaveButtons = ({Id}) => {
    const navigate = useNavigate();

    const handleView = (id) =>{
        navigate(`/admin-dashboard/leaves/${id}`);
    };

    return(
        <button 
            className="btn btn-primary"
            style={{padding:"2px 15px"}}
            onClick={()=> handleView(Id)}
        ><FaEye/></button>
    );
};