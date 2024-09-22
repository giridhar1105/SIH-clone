import Headerr from "../headerr/page";

export default function Guidelines() {
    return (
        <div className="relative bg-black text-white min-h-screen">
            <Headerr />
            <div className="pt-20 grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center justify-center">
                    <img
                        src="https://redx.welingkar.org/sih2022/images/poster.jpg"
                        alt="Institution University"
                        className="mb-2 w-48 h-48 transition-transform transform hover:scale-110"
                    />
                    <h1 className="text-4xl mb-4">For Institution University</h1>
                    <button className="mt-2 px-4 py-2 bg-red-500 text-white rounded transition-transform transform hover:scale-105">
                        OPEN
                    </button>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <img
                        src="https://tse4.mm.bing.net/th?id=OIP.CeMjtpY03AGFbGejxLIAWwHaHa&pid=Api&P=0&h=180"
                        alt="Internal Hackathon Process"
                        className="mb-2 w-48 h-48 transition-transform transform hover:scale-110"
                    />
                    <h1 className="text-4xl mb-4">Internal Hackathon Process</h1>
                    <button className="mt-2 px-4 py-2 bg-red-500 text-white rounded transition-transform transform hover:scale-105">
                        OPEN
                    </button>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <img
                        src="https://i.ytimg.com/vi/a4_RX36T-Iw/hqdefault.jpg"
                        alt="Idea PPT"
                        className="mb-2 w-48 h-48 transition-transform transform hover:scale-110"
                    />
                    <h1 className="text-4xl mb-4">Idea PPT</h1>
                    <button className="mt-2 px-4 py-2 bg-red-500 text-white rounded transition-transform transform hover:scale-105">
                        OPEN
                    </button>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <img
                        src="https://tse4.mm.bing.net/th?id=OIP.jiQWorCX4VceztXpRbUTgwHaFj&pid=Api&P=0&h=180"
                        alt="Hackathon Timeline"
                        className="mb-2 w-48 h-48 transition-transform transform hover:scale-110"
                    />
                    <h1 className="text-4xl mb-4">Hackathon Timeline</h1>
                    <button className="mt-2 px-4 py-2 bg-red-500 text-white rounded transition-transform transform hover:scale-105">
                        OPEN
                    </button>
                </div>
            </div>
        </div>
    );
}
