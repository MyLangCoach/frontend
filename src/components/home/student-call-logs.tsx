import { useState,useEffect } from "react";
import { Button } from "../Button";
import CreateNewServiceModal from "../live-classes/create-new-service-modal";
import { useAppDispatch,useAppSelector } from "../../app/hooks";
import { getAllSessionBookingStudent } from "../../features/offeringslice";
import LoadingComponent from "../Loaders/skeleton-loading";
import { formatDateTime } from "../../util";
const StudentCallLogs = () => {
    const dispatch = useAppDispatch();
    const offering = useAppSelector(state => state.offerings);
    useEffect(() => {
        dispatch(getAllSessionBookingStudent());
    }, [])
    const bookings = offering?.allBookingsSessionStudent;
    console.log(bookings);
  const [current, setCurrent] = useState(0);
    const [open, setOpen] = useState<boolean>(false);
    
    if (offering.fetchLoading) {
        return (
            <div className="w-full">
                        <LoadingComponent />
            </div>
        )
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
                <div className="flex flex-col gap-2 border-border border p-2 rounded-lg" key={index}>
                  <div className="flex items-center gap-2">
                    <p className="red-hat text-sm  text-muted">Note:</p>
                    <p>{item.note}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="red-hat text-sm  text-muted">Status:</p>
                    <p className="capitalize">{item.status}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="red-hat text-sm  text-muted">Book Type:</p>
                    <p className="capitalize">Session</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="red-hat text-sm  text-muted">
                      {" "}
                      Meeting Date:
                    </p>
                    <p className="capitalize">
                      {formatDateTime(item?.startDateTime).date}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="red-hat text-sm  text-muted">
                      {" "}
                      Meeting Time:
                    </p>
                    <p className="capitalize">
                      {formatDateTime(item?.startDateTime).time}
                    </p>
                      </div>
                      <span>
                          <Button name="Join Session" />
                      </span>
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

export default StudentCallLogs;
