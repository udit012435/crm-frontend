import React from "react";

export const SummaryCard = ({ icon, text, number , color}) => {
    return (
        <div id="summaryBox" className="d-flex bg-white rounded px-0 ms-5" >
            <div className={`d-flex justify-content-center ${color} align-items-center  text-white px-4`} style={{ fontSize: '2rem'}}>
                {icon}
            </div>
            <div className="ps-3 py-1">
                <p className="fs-5 fw-semibold">{text}</p>
                <p className="fs-3 fw-bold mb-0">{number}</p>
            </div>
        </div>

    );
};