import React from "react";
import SideBar from "../components/EmployeeDashboard/SideBar";
import { Navbar } from "../components/dashboard/Navbar";
import { Outlet } from "react-router-dom";

export const EmployeeDashboard = () => {
    
    return(
        <div className="d-flex w-100 " id="dashboardEmp">
            <div >
                <SideBar />
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