import { AddIcon, LeftArrow, RightArrow } from "../../assets";

const UpcomingEvents = () => {
  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center justify-between">
        <h1 className="lg:text-2xl text-lg font-bold text-black ">
          Upcoming Events
        </h1>
        <span>
          <AddIcon />
        </span>
      </div>
      <div className="bg-white p-3 rounded-md w-full mt-3 flex flex-col ">
        <div className="flex items-center justify-between w-full ">
          <span className="arrow-shadows w-9 h-9  flex items-center justify-center cursor-pointer">
            <LeftArrow />
          </span>
          <h1 className="text-sm font-medium text-black inter">January</h1>
          <span className="arrow-shadows w-9 h-9  flex items-center justify-center cursor-pointer">
            <RightArrow />
          </span>
        </div>
        <div className="w-full flex flex-col gap-3 py-3 px-3 rounded-[4px] bg-[#F7F7F8] ">
          <p className="lg:text-xl text-base font-bold red-hat text-[#333] ">
            Today
                  </p>
                  
          {/* start of a sechdule */}
          <div className="flex items-center justify-between">
            <div className="gap-2 items-center flex  ">
              <span className="bg-[#8FDCB2] w-2 min-w-2 h-2 min-h-2 rounded-full"></span>
              <h1 className="red-hat text-sm font-semibold">
                Daily meet and greet with Neo
              </h1>
            </div>
            <p className="text-sm font-medium red-hat">08:00</p>
          </div>
          {/* end of a schedule */}
          {/* start of a sechdule */}
          <div className="flex items-center justify-between">
            <div className="gap-2 items-center flex ">
              <span className="bg-[#BE1A1A] w-2 min-w-2 h-2 min-h-2 rounded-full"></span>
              <h1 className="red-hat text-sm font-semibold">
                First meet with Holland
              </h1>
            </div>
            <p className="text-sm font-medium red-hat">09:00</p>
          </div>
          {/* end of a schedule */}
          {/* start of a sechdule */}
          <div className="flex items-center justify-between">
            <div className="gap-2 items-center flex ">
              <span className="bg-[#E7C160] w-2 min-w-2 h-2 min-h-2 rounded-full"></span>
              <h1 className="red-hat text-sm font-semibold">
                Class with Sasha
              </h1>
            </div>
            <p className="text-sm font-medium red-hat">08:00</p>
          </div>
          {/* end of a schedule */}
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;
