import React from "react";
// import { SummaryCard } from "./SummaryCard";
import { FaBuilding, FaUsers, FaFileAlt, FaHourglassHalf, FaCheckCircle ,FaTimesCircle } from "react-icons/fa";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../config";

export const AdminSummary = () => {
    const [summary, setSummary] = useState(null);

    const fetchSummary = async () => {
        try {
            const summary = await axios.get(`https://crm-server-4.onrender.com/api/dashboard/summary`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
            // console.log(summary)
            setSummary(summary.data)
        } catch (error) {
            if (error.response) {
                alert(error.response.data.error)
            }
            console.log(error.message)
        }
    }

    useEffect(() => {
        fetchSummary()
    }, []);

    if (!summary) {
        return <div>Loading....</div>
    }

    return (
        <div className="m-2">
            <h3 className="fw-bold">Dashboard Overview</h3>
            <div className="row g-4 mt-5">
                <div className="col-md-4">
                    {/* <SummaryCard icon={<FaUsers />} text="Total Employees" number={summary.totalEmployees} color="bg-primary" /> */}
                    <div className="card" style={{ border: '1px solid black' }}>
                        <div className="row">
                            <div className="col-md-5" >
                                <div className="d-flex justify-content-center align-items-center  text-white h-100 py-3" style={{ background: "linear-gradient( to bottom right, rgb(26, 146, 167), rgb(0, 35, 80), rgb(26, 146, 167))" }}>
                                    <FaUsers style={{ fontSize: "50px" }} />
                                </div>
                            </div>
                            <div className="col-md-7">
                                <div className="mt-2 text-center">
                                    <h5>Total Employees</h5>
                                    <p style={{ fontSize: "30px", fontWeight: "500" }}>{summary.totalEmployees}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    {/* <SummaryCard icon={<FaBuilding />} text="Total Departments" number={summary.totalDepartments} color="bg-warning" /> */}
                    <div className="card" style={{ border: '1px solid black' }}>
                        <div className="row">
                            <div className="col-md-5" >
                                <div className="d-flex justify-content-center align-items-center  text-white h-100 py-3" style={{ background: "linear-gradient( to bottom right, #EF88AD, #670D2F, #EF88AD)" }}>
                                    <FaBuilding style={{ fontSize: "50px" }} />
                                </div>
                            </div>
                            <div className="col-md-7">
                                <div className="mt-2 text-center">
                                    <h5>Total Departments</h5>
                                    <p style={{ fontSize: "30px", fontWeight: "500" }}>{summary.totalDepartments}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    {/* <SummaryCard icon={<FaSignOutAlt />} text="Total Applied Leaves" number={summary.leaveSummary.total} color="bg-danger" /> */}
                    <div className="card" style={{ border: '1px solid black' }}>
                        <div className="row">
                            <div className="col-md-5" >
                                <div className="d-flex justify-content-center align-items-center  text-white h-100 py-3" style={{ background: "linear-gradient( to bottom right, #FB9E3A, #EA2F14, #FB9E3A)" }}>
                                    <FaFileAlt className="img-fluid" style={{ fontSize: "50px" }} />
                                </div>
                            </div>
                            <div className="col-md-7">
                                <div className="mt-2 text-center">
                                    <h5>Total Applied Leaves</h5>
                                    <p style={{ fontSize: "30px", fontWeight: "500" }}>{summary.leaveSummary.total}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row g-4 mt-1 mb-4">
                <div className="col-md-4">
                    {/* <SummaryCard icon={<FaSignOutAlt />} text="Pending Leaves" number={summary.leaveSummary.pending} color="bg-black" /> */}
                    <div className="card" style={{ border: '1px solid black' }}>
                        <div className="row">
                            <div className="col-md-5" >
                                <div className="d-flex justify-content-center align-items-center  text-white h-100 py-3" style={{ background: "linear-gradient( to bottom right,rgb(255, 251, 0),rgb(95, 97, 0),rgb(255, 251, 0)" }}>
                                    <FaHourglassHalf   style={{ fontSize: "50px" }} />
                                </div>
                            </div>
                            <div className="col-md-7">
                                <div className="mt-2 text-center">
                                    <h5>Pending Leaves</h5>
                                    <p style={{ fontSize: "30px", fontWeight: "500" }}>{summary.leaveSummary.pending}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    {/* <SummaryCard icon={<FaSignOutAlt />} text="Approved Leaves" number={summary.leaveSummary.approved} color="bg-danger" /> */}
                    <div className="card" style={{ border: '1px solid black' }}>
                        <div className="row">
                            <div className="col-md-5" >
                                <div className="d-flex justify-content-center align-items-center  text-white h-100 py-3" style={{ background: "linear-gradient( to bottom right,rgb(21, 182, 0),rgb(11, 83, 17),rgb(21, 182, 0)" }}>
                                    <FaCheckCircle    style={{ fontSize: "50px" }} />
                                </div>
                            </div>
                            <div className="col-md-7">
                                <div className="mt-2 text-center">
                                    <h5>Approved Leaves</h5>
                                    <p style={{ fontSize: "30px", fontWeight: "500" }}>{summary.leaveSummary.approved}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    {/* <SummaryCard icon={<FaSignOutAlt />} text="Rejected Leaves" number={summary.leaveSummary.rejected} color="bg-danger" /> */}
                    <div className="card" style={{ border: '1px solid black' }}>
                        <div className="row">
                            <div className="col-md-5" >
                                <div className="d-flex justify-content-center align-items-center  text-white h-100 py-3" style={{ background: "linear-gradient( to bottom right,rgb(255, 0, 0),rgb(138, 0, 0),rgb(255, 0, 0)" }}>
                                    <FaTimesCircle    style={{ fontSize: "50px" }} />
                                </div>
                            </div>
                            <div className="col-md-7">
                                <div className="mt-2 text-center">
                                    <h5>Rejected Leaves</h5>
                                    <p style={{ fontSize: "30px", fontWeight: "500" }}>{summary.leaveSummary.rejected}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
