import { useState, useEffect } from "react";
import { ActionBtn, Button } from "../Button";
import { Link, useNavigate } from "react-router-dom";
import CreateNewServiceModal from "../live-classes/create-new-service-modal";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  bookNextSession,
  getAllOfferingBookingStudent,
  getAllReschedules, getAvailability,
  rescheduleOffering
} from "../../features/offeringslice";
import LoadingComponent from "../Loaders/skeleton-loading";
import { formatDateTime } from "../../util";
import {
  BlueCalenderIcon,
  BlueStopWatch,
  BlueTimeIcon,
  BlueVideoIcon,
  CancelX,
  DollarIcon,
  PaddedArrow, WaterGlass
} from "../../assets";
import {
  payForOffering, restoreDefault
} from "../../features/paymentslice";
import toast from "react-hot-toast";

import { DateTimeInput, Input } from "../Input";
import ReUseModal from "../modal/Modal";
import CoachReschedules from "../Reschedules/coach-reschedule";
const StudentCallLogs = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const offering = useAppSelector((state) => state.offerings);
  useEffect(() => {
    dispatch(getAllOfferingBookingStudent());
    dispatch(getAllReschedules());
  }, []);
  useEffect(() => {
    if (offering?.nextSessionBookingSuccess) {
      toast.success("Next Session Booked Successfully");
      dispatch(getAllOfferingBookingStudent());
    }
    if (offering.rescheduleSuccess) {
      dispatch(restoreDefault());
      toast.success("Offering rescheduled");
    }
  }, [offering?.nextSessionBookingSuccess, offering?.rescheduleSuccess]);

  const [pastOfferingBooking, setPastOfferingBooking] = useState([]);
  const [upcomingOfferingBooking, setUpcomingOfferingBooking] = useState([]);
  const [current, setCurrent] = useState(0);

  const allOfferings = offering?.allBookedOfferingsStudent;
  useEffect(() => {
    
    if (allOfferings) {
      const currentTime = new Date();
      const past: any = [];
      const upcoming: any = [];

      allOfferings?.forEach((item: any) => {
        const startDateTime = new Date(item.startDateTime);
        const endDateTime = new Date(item.endDateTime);

        if (endDateTime < currentTime) {
          past.push(item); // Add to past appointments
        } else if (startDateTime >= currentTime) {
          upcoming.push(item); // Add to upcoming appointments
        }
      });

      // Sort upcoming appointments by startDateTime in ascending order (closest first)
      upcoming?.sort((a: any, b: any) => {
        return (
          new Date(a.startDateTime).getTime() -
          new Date(b.startDateTime).getTime()
        );
      });

      // Update state
      setPastOfferingBooking(past);
      setUpcomingOfferingBooking(upcoming);
    }
  }, [ allOfferings]);



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
        <div
          className={
            current === 3
              ? "bg-white flex items-center justify-center h-[28px] text-[#09090B] text-sm font-medium lg:min-w-[152px]  cursor-pointer inter  "
              : "text-muted flex items-center justify-center h-[28px] cursor-pointer font-medium inter lg:min-w-[152px]  "
          }
          onClick={() => setCurrent(3)}
        >
          Reschedule
        </div>
      </div>
      {/* <p className="capitalize">
        {item?.student.firstName ?? ""} {item?.student?.lastName ?? ""}
      </p> */}
      {/* end of tabs session */}
      {current === 0 && (
        <div className="w-full mt-4 bg-white min-h-[234px] flex flex-col  rounded-md">
          {allOfferings.length > 0 ? (
            <div className="w-full flex flex-col px-4 py-4 gap-5">
              {allOfferings?.map((item: any, index: number) => (
                <SingleRow item={item} index={index} key={index} />
              ))}
            </div>
          ) : (
            <div className="flex h-full items-center justify-center flex-col min-h-[234px]">
              <p className="red-hat font-bold text-black lg:max-w-[424px] lg:text-xl text-base text-center ">
                You do not have any classes at the moment, You can proceed to
                book a coaching session or offerings to continue
              </p>
              <Button
                name="Book a Coach Session"
                className="mt-5 mx-auto"
                onClick={() => navigate("/coaches")}
              />
            </div>
          )}
        </div>
      )}
      {current === 1 && (
        <div className="w-full mt-4 bg-white min-h-[234px] flex flex-col items-center justify-center rounded-md">
          {upcomingOfferingBooking.length > 0 ? (
            <div className="w-full flex flex-col px-4 py-4 gap-5">
              {upcomingOfferingBooking?.map((item: any, index: number) => (
                <SingleRow item={item} index={index} key={index} />
              ))}
            </div>
          ) : (
            <div className="flex h-full items-center justify-center flex-col min-h-[234px]">
              <p className="red-hat font-bold text-black lg:max-w-[424px] lg:text-xl text-base text-center ">
                You do not have any upcoming classes at the moment, You can
                proceed to book a coaching session or offerings to continue
              </p>
              <Button
                name="Book a Coach Session"
                className="mt-5 mx-auto"
                onClick={() => navigate("/coaches")}
              />
            </div>
          )}
        </div>
      )}
      {current === 2 && (
        <div className="w-full mt-4 bg-white min-h-[234px] flex flex-col items-center justify-center rounded-md">
          {pastOfferingBooking.length > 0 ? (
            <div className="w-full flex flex-col px-4 py-4 gap-5">
              {pastOfferingBooking?.map((item: any, index: number) => (
                <SingleRow item={item} index={index} key={index} />
              ))}
            </div>
          ) : (
            <div className="flex h-full items-center justify-center flex-col min-h-[234px]">
              <p className="red-hat font-bold text-black lg:max-w-[424px] lg:text-xl text-base text-center ">
                You do not have any past classes at the moment, You can proceed to
                book a coaching session or offerings to continue
              </p>
              <Button
                name="Book a Coach Session"
                className="mt-5 mx-auto"
                onClick={() => navigate("/coaches")}
              />
            </div>
          )}
        </div>
      )}
      {current === 3 && <CoachReschedules />}
   
    </div>
  );
};

export default StudentCallLogs;

export const SingleRow = ({ item, index }: { item: any; index: number }) => {
  const dispatch = useAppDispatch();
  const payment = useAppSelector((state) => state.payment);
  const offering = useAppSelector((state) => state.offerings);
  const [openReschedule, setOpenReschedule] = useState(false);
  const [date, setDate] = useState<string>("");
  const [note, setNote] = useState("");
  const [liveDateTimes, setLiveDateTimes] = useState<string[]>([" "]);
  const [activeReschule, setActiveReschedule] = useState<boolean>(false);
    const [message, setMessage] = useState("");
    const [isAvailable, setIsAvailable] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
  const handlePayment = () => {
    const data = {
      seriesId: item?.seriesId,
      paymentMethod: "TRANSFER",
    };
    console.log({ data });
    dispatch(payForOffering(data));
  };

  useEffect(() => {
    if (
      payment?.offeringPaymentSuccess &&
      payment?.offeringPaymentResp?.authorization_url
    ) {
      window.open(payment?.offeringPaymentResp?.authorization_url, "_blank");
      setTimeout(() => {
        dispatch(restoreDefault());
      }, 3000);
    }
    if (offering?.nextSessionBookingSuccess) {
      setOpenMonthly(false);

      dispatch(restoreDefault());
    }
  }, [payment?.offeringPaymentSuccess, offering?.nextSessionBookingSuccess]);

  // Update a specific date-time value
  const updateDateTime = (index: number, newDateTime: string) => {
    const updatedDateTimes = [...liveDateTimes];
    updatedDateTimes[index] = newDateTime;
    setLiveDateTimes(updatedDateTimes);
  };
  const handleBookNextSession = () => {

    if (note && isAvailable) {
      const sentdata = {
        id: item?.seriesId,
        data: {
          note: note,
          bookTimes: liveDateTimes,
        },
      };

      dispatch(bookNextSession(sentdata));
    } else {
      toast.error("Note  must be provided");
    }
  };
  const handleChecKAvailability = async () => {
    setLoading(true);
    const data = {
      id: item?.coachId,
      date: liveDateTimes[0],
    };
    const { payload } = await dispatch(getAvailability(data));
    if (payload?.status === "success") {
      setMessage("Coach  is available");
      setIsAvailable(true);
      setLoading(false);
    } else {
      setMessage("Coach is not available at this time");
      setLoading(false);
      setIsAvailable(false);
    }
  };
  
  const [active, setActive] = useState(false);
  const verifyItems = (time: string) => {
    return time.split("")?.length > 2;
  };
  const [openMonthly, setOpenMonthly] = useState(false);
  useEffect(() => {
    const isFilled = liveDateTimes?.some(verifyItems);
    if (isFilled) {
      handleChecKAvailability();
    }
    if (isFilled && note ) {
      setActive(true);
    } else {
      setActive(false);
    }
    if (note && date) {
      setActiveReschedule(true);
    }
  }, [note, liveDateTimes, date]);
  const handleCloseMonthly = () => {
    setTimeout(() => {
      setOpenMonthly(false);
    }, 50);
  };

  const handleReschedule = () => {
    if (activeReschule) {
      const sentdata = {
        id: item?.id,
        data: {
          note: note,
          proposedDateTime: date,
        },
      };

      dispatch(rescheduleOffering(sentdata));
    } else {
      toast.error("All Field   must be provided");
    }
  };
  useEffect(() => {
    if (offering.rescheduleSuccess) {
      setOpenReschedule(false);
    }
  }, [offering?.rescheduleSuccess]);

  return (
    <>
      <div
        className="flex flex-col gap-2 border-border border  rounded-[4px]"
        key={index}
      >
        <div className="flex items-center justify-between border-b border-b-border">
          <div className="w-full min-h-[76px] flex lg:px-6 items-center gap-3   ">
            <p className="red-hat text-foreground font-bold text-[23px]">
              {item.offeringTitle}
            </p>
            <span className="bg-[#FABC4E] px-[6px] h-7 flex items-center rounded-[4px] text-white">
              {item?.offeringType === "ONE_TIME" && "1:1 class"}
              {item?.offeringType === "ONE_MONTHLY" && "1:1 Monthly"}
              {item?.offeringType === "LIVE_GROUP" && "Live Group"}
            </span>
          </div>
          {item?.offeringType === "ONE_MONTHLY" && (
            <div className="flex items-center min-w-max gap-2 pr-6">
              <span className="">
                <WaterGlass />
              </span>
              <p className="dm-sans text-muted font-medium text-sm">
                {Number(item?.sessionCount - item?.bookedSessions)} sessions
                left
              </p>
            </div>
          )}
        </div>
        <div className="w-full flex flex-col lg:px-6 pb-6">
          <div className="w-full mt-3 flex wrap gap-6 items-center">
            <div className="flex items-center gap-[10px] ">
              <span>
                <DollarIcon />
              </span>
              <p className="text-muted font-medium dm-sams">
                {item?.isFree ? "FREE" : item?.cost?.amount}
              </p>
            </div>
            <span className="flex items-center gap-[10px] ">
              <p className="text-muted text-sm dm-sans">Type</p>
              <p className="text-sm dm-sans font-bold text-muted">Offering</p>
            </span>
            <span className="flex items-center gap-[10px] ">
              <BlueCalenderIcon />
              <p className="text-sm dm-sans font-medium text-muted">
                {formatDateTime(item?.startDateTime)?.date}
              </p>
            </span>
            <span className="flex items-center gap-[10px] ">
              <BlueTimeIcon />
              <p className="text-sm dm-sans font-medium text-muted">
                {formatDateTime(item?.startDateTime)?.time}
              </p>
            </span>
            <span className="flex items-center gap-[10px] ">
              <BlueStopWatch />
              <p className="text-sm dm-sans font-medium text-muted">
                {item?.duration === 30 ? "30 MINS" : "60 MINS"}
              </p>
            </span>
            <span className="flex items-center gap-[10px] ">
              <BlueVideoIcon />
              <p className="text-sm dm-sans font-medium text-muted">
                Video Call
              </p>
            </span>
          </div>
          <div className=" mt-7 flex items-center gap-[10px] ">
            {item?.meetingLink &&
              item?.paymentConfirmed &&
              item?.isFree === false && (
                <Link
                  to={item?.meetingLink}
                  className="items-center hover:bg-[#0E79FF] transition duration-500  bg-black rounded-[4px] text-white px-3 w-fit h-[32px] text-xs dm-sans flex  justify-center"
                >
                  Join Class
                </Link>
              )}
            {item?.meetingLink &&
              !item?.transactionReference &&
              item?.isFree === false && (
                <Link
                  to={item?.meetingLink}
                  className="items-center hover:bg-[#0E79FF] transition duration-500  bg-black rounded-[4px] text-white px-3 w-fit h-[32px] text-xs dm-sans flex  justify-center"
                >
                  Join Class
                </Link>
              )}

            {item?.isFree === true && (
              <Link
                to={item?.meetingLink}
                className="items-center hover:bg-[#0E79FF] transition duration-500  bg-black rounded-[4px] text-white px-3 w-fit h-[32px] text-xs dm-sans flex  justify-center"
              >
                Join Class
              </Link>
            )}
            {!item?.meetingLink &&
              item?.paymentConfirmed &&
              item?.isFree === false && <Button name="Processing..." />}
            {!item?.meetingLink &&
              !item?.paymentConfirmed &&
              item?.isFree === false && (
                <Button name="Make Payment" onClick={handlePayment} />
              )}

            {/* <Button name="Join Session" /> */}
            <span>
              <ActionBtn name="View details" />
            </span>
            {item?.offeringType !== "LIVE_GROUP" && (
              <ActionBtn
                name="Reschedule call"
                onClick={() => setOpenReschedule(true)}
              />
            )}
            <span></span>
            {item?.nextSession && (
              <span className="flex items-center gap-[10px]">
                <ActionBtn
                  name="Book next session"
                  onClick={() => setOpenMonthly(true)}
                />
                <PaddedArrow />
              </span>
            )}
          </div>
        </div>
      </div>
      <ReUseModal open={openMonthly} setOpen={setOpenMonthly}>
        <div className="w-full flex flex-col">
          <div className="flex justify-end mb-3">
            <button className="cursor-pointer" onClick={handleCloseMonthly}>
              <CancelX />
            </button>
          </div>
          <h1 className="text-xl font-bold red-hat mb-4 ">
            Next Session Booking
          </h1>
          <div className="mb-4">
            <Input
              label={"Add A Session Note"}
              placeholder="Enter Note..."
              value={note}
              setValue={setNote}
              // onChange={(e: any) => setNote(e.target.value)}
            />
          </div>
          <p className="text-muted text-xs dm-sans mb-4">
            Select Date and time
          </p>
          <div className="flex flex-col gap-3">
            {liveDateTimes.map((dateTime, index) => (
              <DateTimeInput
                key={index}
                dateTime={dateTime}
                setDateTime={(newDateTime) =>
                  updateDateTime(index, newDateTime)
                }
              />
            ))}
          </div>
          {isAvailable && loading === false && (
            <p className="text-muted text-sm mt-4">Coach is Available</p>
          )}
          {!isAvailable && loading === false && message && (
            <p className=" text-sm mt-4 text-red-700">Not Available</p>
          )}
          {!isAvailable && loading && (
            <p className=" text-sm mt-4 text-muted">Loading ...</p>
          )}
          <div className="w-full mt-6">
            <Button
              name={offering?.loading ? "Loading..." : "Book Now"}
              height="h-[49px]"
              className={`flex-grow min-w-full ${
                !active && "opacity-40 cursor-not-allowed"
              }`}
              onClick={handleBookNextSession}
              disabled={!active}
            />
          </div>
        </div>
      </ReUseModal>
      <ReUseModal open={openReschedule} setOpen={setOpenReschedule}>
        <div className="w-full flex flex-col">
          <div className="flex justify-end mb-3">
            <button
              className="cursor-pointer"
              onClick={() => setOpenReschedule(false)}
            >
              <CancelX />
            </button>
          </div>
          <h1 className="text-xl font-bold red-hat mb-4 ">
            Reschedule this call
          </h1>
          <div className="mb-4">
            <Input
              label={"Add A Session Note"}
              placeholder="Enter Note..."
              value={note}
              setValue={setNote}
              // onChange={(e: any) => setNote(e.target.value)}
            />
          </div>
          <p className="text-muted text-xs dm-sans mb-4">
            Select Proposed Date and time
          </p>
          <div className="flex flex-col gap-3">
            <DateTimeInput key={index} dateTime={date} setDateTime={setDate} />
          </div>
          <div className="w-full mt-6">
            <Button
              name={offering?.loading ? "Loading..." : "Confirm Rescheduling"}
              height="h-[49px]"
              className={`flex-grow min-w-full ${
                !activeReschule && "opacity-40 cursor-not-allowed"
              }`}
              onClick={handleReschedule}
              disabled={!activeReschule}
            />
          </div>
        </div>
      </ReUseModal>
    </>
  );
};
