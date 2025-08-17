import React from "react";
import { useAuth } from "../context/authContext";
import { AdminSideBar } from "../components/dashboard/AdminSideBar";
import { Navbar } from "../components/dashboard/Navbar";
import { AdminSummary } from "../components/dashboard/AdminSummary";
import { Outlet } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {

    return (
        <div className="d-flex w-100">
            <div >
                <AdminSideBar />
            </div>
            <div className="flex-grow-1 overflow-auto">
                    <Navbar />
                <div className="container-fluid">
                    {/* Navbar or top content */}
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard
