import { Medal } from "lucide-react";

const MarketingPage = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex items-center justify-center flex-col">
        <div className="mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full
        uppercase"> 
            <Medal className="h-6 w-6 mr-2" />
            No.1 Task Management App
        </div>
        <h1 className="text-3xl md:text-6xl text-center text-neutral-800 m-6"> 
            Frello Helps team move
        </h1>
        <div className="text-3xl md:text-6xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 p-2 rounded-b-md pb-4 w-fit">
            work forward.
        </div>
      </div>
      <div className="text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto">
        Collaborate , Manage Projects and Reach new Productivity Peaks. From high rises to the Home Office, the way your team works is unique - accomplish it all with Frello.
      </div>
    </div>
  );
};

export default MarketingPage;

