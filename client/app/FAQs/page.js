"use client"

import { useState } from "react";
import Headerr from "../headerr/page";
import Fotter from "../fotter/page";

export default function FAQs() {
    // State to manage expanded FAQs
    const [expanded, setExpanded] = useState({});

    // Toggle the expansion of a specific FAQ
    const toggleExpand = (index) => {
        setExpanded((prev) => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    // FAQ data for General and Terms sections
    const faqs = [
        {
            question: "What is the Smart India Hackathon?",
            answer: "Smart India Hackathon is an initiative by the Government of India aimed at addressing pressing problems faced by government departments and private organizations through innovative solutions developed by students."
        },
        {
            question: "When did the Smart India Hackathon start?",
            answer: "Smart India Hackathon started in 2017 with only a software chapter. In 2018 the hardware chapter was introduced. Four successful editions have been completed namely SIH2017, SIH 2018, SIH 2019, SIH 2022, SIH 2023. Due to COVID-19 SIH2020 was cancelled. Now Smart India Hackathon is at its 7th edition."
        },
        {
            question: "Who can submit problem statements in this hackathon?",
            answer: "Problem statements can be submitted by different central government ministries, departments, state government ministries/ departments, PSUs, private bodies & NGOs."
        },
        {
            question: "Can an individual in India, such as someone working in a private company, pose a challenge or submit a problem statement? What are the financial implications?",
            answer: "No individual is allowed to pose challenges otherwise. However, if an individual is registered as a proprietor firm then he may submit problem statements in the name of his firm. An amount of Rs 1.95 Lakh for Software and Rs. 3 Lakh for Hardware per problem statement shall be given by the organisation posing the challenges. In addition to this amount, registration fee of Rs 25000/- per company is applicable. Registration fee is only applicable for private companies, PSU, MSME, NGO etc. There is no registration fee for government departments/ministries/attached offices of ministries."
        },
        {
            question: "Can University or Institute Submit PS Under SIH 2024?",
            answer: "No, University/institutes cannot submit PS under SIH 2024. However, they can nominate students from their institute to participate in this hackathon or nominate themselves as nodal centers to organize and support in this hackathon."
        },
        {
            question: "Can a student from distance/part time Education Program Participate in SIH 2024?",
            answer: "If an individual is registered as a proprietor firm then he may submit problem statements in the name of his firm. No individual is allowed to pose challenges otherwise."
        }
    ];

    const termsFaqs = [
        {
            question: "Who can Participate in SIH 2024?",
            answer: "[Answer goes here]"
        },
        {
            question: "What is the criteria of Team Formation?",
            answer: "[Answer goes here]"
        },
        {
            question: "What is the role of the College Single Point of Contact (SPOC)?",
            answer: "[Answer goes here]"
        },
        {
            question: "I am a student of Higher Education Institutes (HEIs) pursuing PhD. Can I participate?",
            answer: "[Answer goes here]"
        },
        {
            question: "I am pursuing distance/part-time and currently engaged as a working professional. Can I participate?",
            answer: "[Answer goes here]"
        },
        {
            question: "What is the prize money of the winning team?",
            answer: "[Answer goes here]"
        },
        {
            question: "When can I submit the idea against the problem statement?",
            answer: "[Answer goes here]"
        },
        {
            question: "Will this hackathon be organised digitally or in-person mode?",
            answer: "[Answer goes here]"
        },
        {
            question: "What about mentors or how many mentors can be nominated? And what is the minimum requirement for a mentor to mentor a team in a hackathon?",
            answer: "[Answer goes here]"
        },
        {
            question: "The internal hackathon needs to be organised on which date & what will be the process for organising internal hackathon?",
            answer: "[Answer goes here]"
        },
        {
            question: "Is it mandatory for colleges/institutes to organise Intra college hackathon?",
            answer: "[Answer goes here]"
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Fixed Header */}
            <div className="fixed top-0 left-0 w-full bg-black z-50 text-red-500">
                <Headerr />
            </div>

            {/* Content */}
            <div className="pt-20"> {/* Add padding-top to account for the fixed header */}
                {/* General FAQ Section */}
                <div className="flex flex-col items-center mt-16">
                    <h1 className="text-5xl font-bold text-red-500 text-center mb-10">General FAQ</h1>
                </div>
                <div className="px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
                    {faqs.map((item, index) => (
                        <div key={index} className="mb-10">
                            <div className="flex items-center mb-4">
                                <h2 className="text-2xl font-semibold text-red-600 flex-1">
                                    Q. {index + 1}. {item.question}
                                </h2>
                                <button
                                    className="text-red-600 flex-shrink-0"
                                    onClick={() => toggleExpand(index)}
                                >
                                    <i className={`fas fa-chevron-${expanded[index] ? 'up' : 'down'}`}></i>
                                </button>
                            </div>
                            {expanded[index] && (
                                <p className="text-lg text-gray-300">{item.answer}</p>
                            )}
                        </div>
                    ))}
                </div>

                {/* Terms FAQ Section */}
                <div className="flex flex-col items-center mt-16">
                    <h1 className="text-5xl font-bold text-red-500 text-center mb-10">FAQ on Terms</h1>
                </div>
                <div className="px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
                    {termsFaqs.map((item, index) => (
                        <div key={index} className="mb-10">
                            <div className="flex items-center mb-4">
                                <h2 className="text-2xl font-semibold text-red-600 flex-1">
                                    Q. {index + 1}. {item.question}
                                </h2>
                                <button
                                    className="text-red-600 flex-shrink-0"
                                    onClick={() => toggleExpand(index + faqs.length)}
                                >
                                    <i className={`fas fa-chevron-${expanded[index + faqs.length] ? 'up' : 'down'}`}></i>
                                </button>
                            </div>
                            {expanded[index + faqs.length] && (
                                <p className="text-lg text-gray-300">{item.answer}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <Fotter />
        </div>
    );
}
