import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { AddIcon, EmptyEvent, LeftArrow, RightArrow } from "../../assets";
import { getAllCreatedOfferingCoach } from "../../features/offeringslice";
import LoadingComponent from "../Loaders/skeleton-loading";
import { currentMonth, formatDateTime } from "../../util";
import { useNavigate } from "react-router-dom";
const UpcomingEvents = () => {
 const offerings = useAppSelector((state) => state.offerings);
 const dispatch = useAppDispatch();
 useEffect(() => {
   dispatch(getAllCreatedOfferingCoach());
 }, []);

  const allOfferings = offerings?.allCreatedOfferingsCoach?.offerings;
  const filteredOfferings = allOfferings?.filter?.((item: any) => item?.type === "LIVE_GROUP");
  const navigate = useNavigate();

  if (offerings?.fetchLoading) {
    return (
      <div>
        <LoadingComponent />
      </div>
    );
  }
  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center justify-between">
        <h1 className="lg:text-2xl text-lg font-bold text-black ">
          Upcoming Events
        </h1>
        <span onClick={() => navigate("/create-new-class?type=LIVE_GROUP")}>
          <AddIcon />
        </span>
      </div>
      <div className="bg-white p-3 rounded-md w-full mt-3 flex flex-col ">
        <div className="flex items-center justify-between w-full ">
          <span className="arrow-shadows w-9 h-9  flex items-center justify-center cursor-pointer">
            <LeftArrow />
          </span>
          <h1 className="text-sm font-medium text-black inter">
            {currentMonth}
          </h1>
          <span className="arrow-shadows w-9 h-9  flex items-center justify-center cursor-pointer">
            <RightArrow />
          </span>
        </div>
        <div className="w-full flex flex-col gap-3 py-3 px-3 rounded-[4px] bg-[#F7F7F8] ">
          {/* <p className="lg:text-xl text-base font-bold red-hat text-[#333] ">
            Today
          </p> */}
          {filteredOfferings?.length === 0 && (
            <div className="w-full h-[136px] flex flex-col items-center justify-center">
              <span>
                <EmptyEvent />
              </span>
              <p className="text-center mt-3 text-sm red-hat font-semibold">
                No upcoming events!
              </p>
              <p className="text-center mt-3 text-xs red-hat text-[#838384] lg:max-w-[218px]">
                Sorry you don’t have any upcoming events yet. they will pile up
                here
              </p>
            </div>
          )}
          {/* start of a sechdule */}
          {filteredOfferings?.slice(0, 3)?.map((item: any, index: number) => (
            <div className="flex items-center justify-between" key={index}>
              <div className="gap-2 items-center flex  ">
                {index === 0 && (
                  <span className="bg-[#8FDCB2] w-2 min-w-2 h-2 min-h-2 rounded-full"></span>
                )}
                {index === 1 && (
                  <span className="bg-[#BE1A1A] w-2 min-w-2 h-2 min-h-2 rounded-full"></span>
                )}
                {index === 2 && (
                  <span className="bg-[#E7C160] w-2 min-w-2 h-2 min-h-2 rounded-full"></span>
                )}

                <h1 className="red-hat text-sm font-semibold">{item?.title}</h1>
              </div>
              <p className="text-sm font-medium red-hat">
                {formatDateTime(item?.liveDateTimes?.[0])?.time}
              </p>
            </div>
          ))}

          {/* end of a schedule */}
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;
