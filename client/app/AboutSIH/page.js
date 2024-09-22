"use client"

import Headerr from "../headerr/page";

export default function AboutSIH() {
    return (
        <div className="bg-black">
            <Headerr />
            <div className="relative flex flex-col justify-center items-center min-h-screen">
                <h1 className="text-4xl font-bold text-center text-red-500 mt-20">
                    SIH Process Flow and Timeline
                </h1>
                <img 
                    src="https://miro.medium.com/v2/resize:fit:1358/1*oa3pFlIDMDf0DXYxahUdJA.png" 
                    alt="Description of the image" 
                    className="mt-10 w-full md:w-4/5 lg:w-3/4 xl:w-2/3" // Image sizing
                />
                <h1 className="text-red-500 text-4xl font-bold text-center mt-10">
                    Why SIH is Important for Government and Corporate Departments
                </h1>
            </div>
        </div>
    );
}
