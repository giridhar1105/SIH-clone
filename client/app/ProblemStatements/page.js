"use client";

import React, { useState } from "react";
import Headerr from "../headerr/page"; // Ensure this path is correct

const allProblems = [
    { id: 1, statement: "Problem related to hardware", type: "Hardware" },
    { id: 2, statement: "Problem related to software", type: "Software" },
    { id: 3, statement: "Problem related to hardware", type: "Hardware" },
    { id: 4, statement: "Problem related to hardware", type: "Hardware" },
    { id: 5, statement: "Problem related to software", type: "Software" },
    { id: 6, statement: "Problem related to hardware", type: "Hardware" },
    { id: 7, statement: "Problem related to hardware", type: "Hardware" },
    { id: 8, statement: "Problem related to software", type: "Software" },
    { id: 9, statement: "Problem related to hardware", type: "Hardware" },
    { id: 10, statement: "Problem related to hardware", type: "Hardware" },
    { id: 11, statement: "Problem related to software", type: "Software" },
    { id: 12, statement: "Problem related to hardware", type: "Hardware" },
];

export default function ProblemStatements() {
    const [filteredProblems, setFilteredProblems] = useState(allProblems);

    const filterProblems = (type) => {
        const filtered = type === "All" ? allProblems : allProblems.filter(problem => problem.type === type);
        setFilteredProblems(filtered);
    };

    return (
        <div className="bg-black min-h-screen">
            <Headerr />
            <div className="pt-[100px]">
                <img 
                    src="https://pmstudycircle.com/wp-content/uploads/2023/11/problem-statements.png" 
                    alt="Problem Statements"
                    className="w-full h-[260px] object-cover -mt-[5px]"
                />
            </div>
            <div className="pt-5 text-center">
                <div className="mb-4">
                    <button 
                        className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 mr-2"
                        onClick={() => filterProblems("Software")}
                    >
                        Software
                    </button>
                    <button 
                        className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
                        onClick={() => filterProblems("Hardware")}
                    >
                        Hardware
                    </button>
                    <button 
                        className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 ml-2"
                        onClick={() => filterProblems("All")}
                    >
                        Show All
                    </button>
                </div>
                <table className="min-w-full bg-gray-800 text-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4">Sl No</th>
                            <th className="py-2 px-4">Problem Statement</th>
                            <th className="py-2 px-4">Type of Problem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProblems.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="py-2 px-4 text-center">No problems found</td>
                            </tr>
                        ) : (
                            filteredProblems.map((problem) => (
                                <tr key={problem.id}>
                                    <td className="py-2 px-4">{problem.id}</td>
                                    <td className="py-2 px-4">{problem.statement}</td>
                                    <td className="py-2 px-4">{problem.type}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
