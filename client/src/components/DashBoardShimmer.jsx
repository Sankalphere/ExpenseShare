import React from "react";

const DashboardShimmer = () => {
  return (
    <div>
      {/* Placeholder for header */}
      <div className="flex items-center justify-between  border-b-2 bg-gray-200 border-slate-300">
        <div>
          <div className="bg-gray-300 h-8 w-20 m-2 animate-pulse"></div>
        </div>
      </div>
      {/* Placeholder for main content */}
      <div className="animate-pulse">
        <div className="text-2xl border-b border-slate-300 mb-2 h-12"></div>
        <div className="flex pb-1 border-b border-slate-300 justify-evenly w-[500px] text-sm">
          <div className="flex flex-col items-center">
            <div className="h-6 bg-gray-300 w-24"></div>
            <div className="h-6 bg-gray-300 w-24"></div>
          </div>
          <div className="flex flex-col items-center border-l border-r px-10 border-slate-400">
            <div className="h-6 bg-gray-300 w-24"></div>
            <div className="h-6 bg-gray-300 w-24"></div>
          </div>
          <div className="flex flex-col items-center">
            <div className="h-6 bg-gray-300 w-24"></div>
            <div className="h-6 bg-gray-300 w-24"></div>
          </div>
        </div>
        <div className="flex mt-4 justify-evenly">
          <div className="w-3/6">
            <div className="h-6 bg-gray-300 w-full"></div>
            <div className="h-16 bg-gray-300 w-full"></div>
          </div>
          <div className="w-3/6">
            <div className="h-6 bg-gray-300 w-full"></div>
            <div className="h-16 bg-gray-300 w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardShimmer;
