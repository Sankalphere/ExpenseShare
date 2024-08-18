const TransactionLoading = () => {
  return (
    <div className="flex flex-col-reverse">
      {[...Array(10)].map((_, index) => (
        <div
          key={index}
          className="flex bg-white shadow-md transition-colors group duration-300 ease-in-out hover:bg-slate-100 cursor-pointer border-b-[1px] m-1 p-1"
        >
          <div className="flex flex-col items-center w-[80px] mr-3">
            <div className="h-[20px] w-[40px] bg-gray-200 mb-1"></div>
            <div className="h-[20px] w-[60px] bg-gray-200"></div>
          </div>
          <div className="flex justify-end w-[500px]">
            <div className="flex">
              <div className="mr-10 flex flex-col items-center">
                <div className="h-[20px] w-[60px] bg-gray-200 mb-1"></div>
                <div className="h-[20px] w-[40px] bg-gray-200"></div>
              </div>
              <div className="flex flex-col items-center">
                <div className="h-[20px] w-[60px] bg-gray-200 mb-1"></div>
                <div className="h-[20px] w-[40px] bg-gray-200"></div>
              </div>
              <div>
                <div className="ml-4 p-1 invisible group-hover:visible text-red-800">
                  {/* X */}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionLoading;
