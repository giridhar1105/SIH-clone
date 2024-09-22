import Headerr from "../headerr/page";
import Fotter from "../fotter/page";

export default function Homep() {
    return (
        <div className="bg-black min-h-screen">
            <Headerr />
            <main className="pt-16 flex flex-col items-center">
                <div className="flex">
                    <img 
                        src="https://indiaeducationdiary.in/wp-content/uploads/2023/12/SIH-2023-1024x576.jpg" 
                        alt="Description of first image" 
                        className="h-[500px] w-screen object-cover"
                    />
                </div>
                <div className="mt-10 w-full flex justify-center">
                    <div className="bg-purple-300 h-[150px] w-[90%] max-w-[1200px] grid grid-cols-4 gap-4 p-4">
                        <div className="flex flex-col items-center">
                            <h1 className="text-center text-xl font-bold">For Institution University</h1>
                            <div className="flex flex-col mt-2 space-y-2">
                                <button className="bg-blue-500 text-white px-8 py-3 rounded-full transition-transform transform hover:scale-105 hover:bg-blue-600">
                                    OPEN
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <h1 className="text-center text-xl font-bold">Internal Hackathon Process</h1>
                            <div className="flex flex-col mt-2 space-y-2">
                                <button className="bg-blue-500 text-white px-8 py-3 rounded-full transition-transform transform hover:scale-105 hover:bg-blue-600">
                                    OPEN
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <h1 className="text-center text-xl font-bold">Idea PPT</h1>
                            <div className="flex flex-col mt-2 space-y-2">
                                <button className="bg-blue-500 text-white px-8 py-3 rounded-full transition-transform transform hover:scale-105 hover:bg-blue-600">
                                    OPEN 
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <h1 className="text-center text-xl font-bold">Hackathon Timeline</h1>
                            <div className="flex flex-col mt-2 space-y-2">
                                <button className="bg-blue-500 text-white px-8 py-3 rounded-full transition-transform transform hover:scale-105 hover:bg-blue-600">
                                    OPEN
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-8 w-full flex justify-center">
                    <div className="w-[90%] max-w-[1200px]">
                        <h1 className="text-3xl font-bold text-white text-center">WHAT IS SIH?</h1>
                        <p className="mt-4 text-lg text-white text-center">
                            Smart India Hackathon (SIH) is a premier nationwide initiative designed to engage students in solving some of the most pressing challenges faced in everyday life. Launched to foster a culture of innovation and practical problem-solving, SIH provides a dynamic platform for students to develop and showcase their creative solutions to real-world problems. By encouraging participants to think critically and innovatively, the hackathon aims to bridge the gap between academic knowledge and practical application.

                            Since its inception, SIH has garnered significant success in promoting out-of-the-box thinking among young minds, particularly engineering students from across India. Each edition has built on the previous one, refining its approach and expanding its impact. The hackathon not only offers students an opportunity to showcase their skills but also encourages collaboration with industry experts, government agencies, and other stakeholders.
                        </p>
                    </div>
                </div>
            </main>
          <Fotter />
        </div>
    );
}
