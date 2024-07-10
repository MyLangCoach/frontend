import { useEffect, useState } from "react";
import { Button } from "../Button";
import CreateNewServiceModal from "../live-classes/create-new-service-modal";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getAllSessionBookingCoach, getAllSessionBookingStudent } from "../../features/offeringslice";
import LoadingComponent from "../Loaders/skeleton-loading";
import { formatDateTime, openInNewTab } from "../../util";
import { BlueCalenderIcon, BlueTimeIcon } from "../../assets";

const CallLogs = () => {
 
    const dispatch = useAppDispatch();
    const offering = useAppSelector((state) => state.offerings);
    useEffect(() => {
      dispatch(getAllSessionBookingCoach());
    }, []);
    const bookings = offering?.allBookingsSessionCoach;

    const [current, setCurrent] = useState(0);
    const [open, setOpen] = useState<boolean>(false);

    if (offering.fetchLoading) {
      return (
        <div className="w-full">
          <LoadingComponent />
        </div>
      );
    }

  return (
    <div className="w-full flex flex-col mt-6">
      {/* tabs session */}
      <div className="w-full flex gap-4 items-center justify-between lg:justify-start px-4 lg:px-0">
        <div
          className={
            current === 0
              ? "bg-white flex items-center justify-center h-[28px] text-[#09090B] text-sm font-medium lg:min-w-[152px]  cursor-pointer inter  "
              : "text-muted flex items-center justify-center h-[28px] cursor-pointer font-medium inter lg:min-w-[152px]  "
          }
          onClick={() => setCurrent(0)}
        >
          All
        </div>
        <div
          className={
            current === 1
              ? "bg-white flex items-center justify-center h-[28px] text-[#09090B] text-sm font-medium lg:min-w-[152px]  cursor-pointer inter  "
              : "text-muted flex items-center justify-center h-[28px] cursor-pointer font-medium inter lg:min-w-[152px]  "
          }
          onClick={() => setCurrent(1)}
        >
          Upcoming calls
        </div>
        <div
          className={
            current === 2
              ? "bg-white flex items-center justify-center h-[28px] text-[#09090B] text-sm font-medium lg:min-w-[152px]  cursor-pointer inter  "
              : "text-muted flex items-center justify-center h-[28px] cursor-pointer font-medium inter lg:min-w-[152px]  "
          }
          onClick={() => setCurrent(2)}
        >
          Past calls
        </div>
      </div>

      {/* end of tabs session */}
      {current === 0 && (
        <div className="w-full mt-4 bg-white min-h-[234px] flex flex-col  rounded-md">
          {bookings.length > 0 ? (
            <div className="w-full flex flex-col px-4 py-4">
              {bookings?.map((item: any, index: number) => (
                <div className="w-full flex flex-col px-4 py-4">
                  {bookings?.map((item: any, index: number) => (
                    <div
                      className="flex flex-col gap-2 border-border border  rounded-[4px]"
                      key={index}
                    >
                      <div className="w-full min-h-[76px] flex lg:px-6 items-center gap-3 border-b border-b-border  ">
                        <p className="red-hat text-foreground font-bold text-[23px] ">
                          {item.note}
                        </p>
                        <span className="bg-[#FABC4E] px-[6px] h-7 flex items-center rounded-[4px] text-white min-w-fit">
                          1:1 class
                        </span>
                      </div>
                      <div className="w-full flex flex-col lg:px-6 pb-6">
                        <div className="w-full mt-3 flex flex-wrap gap-6 items-center">
                          <span className="flex items-center gap-[10px] w-2/12 min-w-fit ">
                            <p className="text-muted text-sm dm-sans min-w-fit">
                              Student Name
                            </p>
                            <p className="text-sm dm-sans font-bold text-muted min-w-fit ">
                              {item?.student.firstName ?? ""}{" "}
                              {item?.student?.lastName ?? ""}
                            </p>
                          </span>
                          <span className="flex items-center gap-[10px] w-2/12 min-w-fit ">
                            <p className="text-muted text-sm dm-sans">Status</p>
                            <p className="text-sm dm-sans font-bold text-muted">
                              {item.status}
                            </p>
                          </span>
                          <span className="flex items-center gap-[10px]  w-2/12 min-w-fit">
                            <p className="text-muted text-sm dm-sans">
                              Book type
                            </p>
                            <p className="text-sm dm-sans font-bold text-muted">
                              Session
                            </p>
                          </span>
                          <span className="flex items-center gap-[10px]  min-w-fit ">
                            <BlueCalenderIcon />
                            <p className="text-sm dm-sans font-medium text-muted">
                              {formatDateTime(item?.startDateTime)?.date}
                            </p>
                          </span>
                          <span className="flex items-center gap-[10px]   min-w-fit">
                            <BlueTimeIcon />
                            <p className="text-sm dm-sans font-medium text-muted">
                              {formatDateTime(item?.startDateTime)?.time}
                            </p>
                          </span>
                        </div>
                        {item?.meetingLink ? (
                          <div className="w mt-7">
                            <Button name="Join Session" onClick={() => openInNewTab(item.meetingLink)}  />
                          </div>
                        ) : (
                          <div className="w mt-7">
                            <Button name="Make Payment" />
                          </div>
                        )}
                      
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-full items-center justify-center flex-col">
              <p className="red-hat font-bold text-black lg:max-w-[424px] lg:text-xl text-base text-center ">
                You do not have any classes at the moment, Create a new group
                class or private class to get started
              </p>
              <Button
                name="Connect new live class"
                className="mt-5 mx-auto"
                onClick={() => setOpen(true)}
              />
            </div>
          )}
        </div>
      )}
      {current === 1 && (
        <div className="w-full mt-4 bg-white min-h-[234px] flex flex-col items-center justify-center rounded-md">
          <p className="red-hat font-bold text-black lg:max-w-[424px] lg:text-xl text-base text-center ">
            You do not have any upcoming calls.
          </p>
          <Button name="Connect new live class" className="mt-5 mx-auto" />
        </div>
      )}
      {current === 2 && (
        <div className="w-full mt-4 bg-white min-h-[234px] flex flex-col items-center justify-center rounded-md">
          <p className="red-hat font-bold text-black lg:max-w-[424px] lg:text-xl text-base text-center ">
            You do not have any past calls.
          </p>
          <Button name="Connect new live class" className="mt-5 mx-auto" />
        </div>
      )}
      <CreateNewServiceModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default CallLogs;
