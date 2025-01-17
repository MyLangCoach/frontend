import { useState, useEffect } from "react";
import { ActionBtn, Button } from "../Button";
import { Link, useNavigate } from "react-router-dom";
import CreateNewServiceModal from "../live-classes/create-new-service-modal";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  bookNextSession,
  getAllOfferingBookingStudent,
  getAllReschedules,
  getAllSessionBookingStudent,
  getAvailability,
  rescheduleOffering,
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
  PaddedArrow,
  WaterGlass,
} from "../../assets";
import { payForOffering, restoreDefault } from "../../features/paymentslice";
import toast from "react-hot-toast";

import { DateTimeInput, Input } from "../Input";
import ReUseModal from "../modal/Modal";
import CoachReschedules from "../Reschedules/coach-reschedule";
import CoachSessionCard from "../coaches-component/coach-session-card";
import StudentSessionCard from "../students/student-session-card";
const StudentCallLogs = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
const [currentSession, setCurrentSession] = useState(1);
const [currentOffering, setCurrentOffering] = useState(1);
  const [present, setPresent] = useState(0);
   const [pastAppointmentsBooking, setPastAppointmentsBooking] = useState([]);
   const [upcomingAppointmentsBooking, setUpcomingAppointmentsBooking] =
     useState([]);
   const [pastOfferingBooking, setPastOfferingBooking] = useState([]);
   const [upcomingOfferingBooking, setUpcomingOfferingBooking] = useState([]);
  const offering = useAppSelector((state) => state.offerings);
  useEffect(() => {
    dispatch(getAllOfferingBookingStudent());
      dispatch(getAllSessionBookingStudent());
    dispatch(getAllReschedules());
  }, []);
  useEffect(() => {
    if (offering?.nextSessionBookingSuccess) {
      toast.success("Next Session Booked Successfully");
      dispatch(getAllOfferingBookingStudent());
    }
    if (offering.rescheduleSuccess) {
      dispatch(restoreDefault());
      toast.success("Reschedule request sent successfully");
    }
  }, [offering?.nextSessionBookingSuccess, offering?.rescheduleSuccess]);

 

  const allOfferings = offering?.allBookedOfferingsStudent;
    const bookings = offering?.allBookingsSessionStudent;
  useEffect(() => {
    if (bookings) {
      const currentTime = new Date();
      const past: any = [];
      const upcoming: any = [];

      bookings.forEach((item: any) => {
        const startDateTime = new Date(item.startDateTime);
        const endDateTime = new Date(item.endDateTime);

        if (endDateTime < currentTime) {
          past.push(item); // Add to past appointments
        } else if (startDateTime >= currentTime) {
          upcoming.push(item); // Add to upcoming appointments
        }
      });

      // Sort upcoming appointments by startDateTime in ascending order (closest first)
      upcoming.sort((a: any, b: any) => {
        return (
          new Date(a.startDateTime).getTime() -
          new Date(b.startDateTime).getTime()
        );
      });

      // Update state
      setPastAppointmentsBooking(past);
      setUpcomingAppointmentsBooking(upcoming);
    }
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
  }, [allOfferings, bookings]);
  console.log(bookings)

  if (offering.fetchLoading) {
    return (
      <div className="w-full">
        <LoadingComponent />
      </div>
    );
  }
  return (
    <div className="w-full flex flex-col mt-6">
      <div className="w-full flex items-center mb-6 gap-4">
        <p
          className={`cursor-pointer red-hat text-base ${
            present === 0
              ? "font-bold text-[#09090B] red-hat border-b-primary border-b  pb-1"
              : "pb-1 text-[#09090B] "
          } `}
          onClick={() => setPresent(0)}
        >
          Offerings
        </p>
        <p
          className={`cursor-pointer red-hat text-base ${
            present === 1
              ? "font-bold text-[#09090B] red-hat border-b-primary border-b  pb-1"
              : "pb-1 text-muted "
          } `}
          onClick={() => setPresent(1)}
        >
          Sessions
        </p>
      </div>
      {/* tabs session */}
      {present === 0 && (
        <div className="w-full flex gap-4 items-center flex-wrap justify-between  lg:justify-start px-4 lg:px-0">
          <div
            className={
              currentOffering === 1
                ? "bg-white px-4 flex items-center justify-center h-[28px] text-[#09090B] text-sm font-medium lg:min-w-[152px]  cursor-pointer inter  "
                : "text-muted flex items-center justify-center h-[28px] cursor-pointer font-medium inter lg:min-w-[152px]  "
            }
            onClick={() => setCurrentOffering(1)}
          >
            Upcoming calls
          </div>
          <div
            className={
              currentOffering === 3
                ? "bg-white flex px-4 items-center justify-center h-[28px] text-[#09090B] text-sm font-medium lg:min-w-[152px]  cursor-pointer inter  "
                : "text-muted flex items-center justify-center h-[28px] cursor-pointer font-medium inter lg:min-w-[152px]  "
            }
            onClick={() => setCurrentOffering(3)}
          >
            Reschedule
          </div>
          <div
            className={
              currentOffering === 2
                ? "bg-white flex px-4 items-center justify-center h-[28px] text-[#09090B] text-sm font-medium lg:min-w-[152px]  cursor-pointer inter  "
                : "text-muted flex items-center justify-center h-[28px] cursor-pointer font-medium inter lg:min-w-[152px]  "
            }
            onClick={() => setCurrentOffering(2)}
          >
            Past calls
          </div>
          <div
            className={
              currentOffering === 0
                ? "bg-white flex items-center justify-center h-[28px] text-[#09090B] text-sm font-medium px-4 lg:min-w-[152px]  cursor-pointer inter  "
                : "text-muted flex items-center justify-center h-[28px] cursor-pointer font-medium inter lg:min-w-[152px]  "
            }
            onClick={() => setCurrentOffering(0)}
          >
            All
          </div>
        </div>
      )}
      {present === 1 && (
        <div className="w-full flex gap-4 items-center flex-wrap justify-between lg:justify-start px-4 lg:px-0">
          <div
            className={
              currentSession === 1
                ? "bg-white px-4 flex items-center justify-center h-[28px] text-[#09090B] text-sm font-medium lg:min-w-[152px]  cursor-pointer inter  "
                : "text-muted flex items-center justify-center h-[28px] cursor-pointer font-medium inter lg:min-w-[152px]  "
            }
            onClick={() => setCurrentSession(1)}
          >
            Upcoming calls
          </div>
          <div
            className={
              currentSession === 2
                ? "bg-white px-4 flex items-center justify-center h-[28px] text-[#09090B] text-sm font-medium lg:min-w-[152px]  cursor-pointer inter  "
                : "text-muted flex items-center justify-center h-[28px] cursor-pointer font-medium inter lg:min-w-[152px]  "
            }
            onClick={() => setCurrentSession(2)}
          >
            Past calls
          </div>
          <div
            className={
              currentSession === 3
                ? "bg-white px-4 flex items-center justify-center h-[28px] text-[#09090B] text-sm font-medium lg:min-w-[152px]  cursor-pointer inter  "
                : "text-muted flex items-center justify-center h-[28px] cursor-pointer font-medium inter lg:min-w-[152px]  "
            }
            onClick={() => setCurrentSession(3)}
          >
            Reschedule
          </div>
          <div
            className={
              currentSession === 0
                ? "bg-white px-4 flex items-center justify-center h-[28px] text-[#09090B] text-sm font-medium lg:min-w-[152px]  cursor-pointer inter  "
                : "text-muted flex items-center justify-center h-[28px] cursor-pointer font-medium inter lg:min-w-[152px]  "
            }
            onClick={() => setCurrentSession(0)}
          >
            All
          </div>
        </div>
      )}

      {/* end of tabs offerings */}
      {present === 0 && (
        <div>
          {currentOffering === 0 && (
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
                    You do not have any classes at the moment. You can proceed
                    to book a coaching session or explore other offerings to
                    continue.
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
          {currentOffering === 1 && (
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
                    You do not have any upcoming classes at the moment. You can
                    proceed to book a coaching session or explore other
                    offerings to continue.
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
          {currentOffering === 2 && (
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
                    You do not have any past classes at the moment. You can
                    proceed to book a coaching session or explore other
                    offerings to continue.
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
          {currentOffering === 3 && <CoachReschedules />}
        </div>
      )}
      {present === 1 && (
        <div className="w-full">
          {currentSession === 0 && (
            <div className="w-full mt-4 bg-white min-h-[234px] flex flex-col  rounded-md">
              {bookings.length > 0 ? (
                <div className="w-full flex flex-col px-4 py-4 gap-4">
                  {bookings?.map((item: any, index: number) => (
                    <StudentSessionCard item={item} index={index} />
                  ))}
                </div>
              ) : (
                <div className="flex h-full items-center justify-center flex-col min-h-[234px]">
                  <p className="red-hat font-bold text-black lg:max-w-[424px] lg:text-xl text-base text-center  ">
                    You do not have any session calls yet. You can proceed to book a coaching session or explore other offerings to continue.
                  </p>
                
                </div>
              )}
            </div>
          )}
          {currentSession === 1 && (
            <div className="w-full mt-4 bg-white min-h-[234px] flex flex-col  rounded-md">
              {upcomingAppointmentsBooking.length > 0 ? (
                <div className="w-full flex flex-col px-4 py-4 gap-4">
                  {upcomingAppointmentsBooking?.map(
                    (item: any, index: number) => (
                      <StudentSessionCard item={item} index={index} />
                    )
                  )}
                </div>
              ) : (
                <div className="w-full mt-4 bg-white min-h-[234px] flex flex-col items-center justify-center rounded-md">
                  <p className="red-hat font-bold text-black lg:max-w-[424px] lg:text-xl text-base text-center ">
                    You do not have any upcoming calls.
                  </p>
                </div>
              )}
            </div>
          )}
          {currentSession === 2 && (
            <div className="w-full mt-4 bg-white min-h-[234px] flex flex-col  rounded-md">
              {pastAppointmentsBooking.length > 0 ? (
                <div className="w-full flex flex-col px-4 py-4">
                  {pastAppointmentsBooking?.map((item: any, index: number) => (
                    <StudentSessionCard item={item} index={index} />
                  ))}
                </div>
              ) : (
                <div className="w-full mt-4 bg-white min-h-[234px] flex flex-col items-center justify-center rounded-md">
                  <p className="red-hat font-bold text-black lg:max-w-[424px] lg:text-xl text-base text-center ">
                    You do not have any past calls.
                  </p>
                  <Button name="create new  class" className="mt-5 mx-auto" />
                </div>
              )}
            </div>
          )}
          {currentSession === 3 && <CoachReschedules />}
        </div>
      )}
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
  const [note, setNote] = useState("I want to learn");
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
    if (isAvailable) {
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
    if (isFilled) {
      setActive(true);
    } else {
      setActive(false);
    }
    if (date) {
      setActiveReschedule(true);
    }
  }, [liveDateTimes, date]);
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
          note: note ?? "I want to learn ",
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
        <div className="flex items-start lg:items-center lg:flex-row  justify-between border-b border-b-border p-4">
          <div className="w-full min-h-[76px] flex lg:px-6 lg:items-center gap-3 px-4 lg:flex-row flex-col    ">
            <p className="red-hat text-foreground font-bold text-base lg:text-[23px]">
              {item.offeringTitle}
            </p>
            <span className="bg-[#FABC4E] px-[6px] h-7 flex items-center rounded-[4px] text-white w-fit lg:w-auto">
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
        <div className="w-full flex flex-col lg:px-6 pb-6 p-4">
          <div className="w-full mt-3 flex flex-wrap gap-6 items-center">
            <div className="flex items-center gap-[10px] min-w-max ">
              <span>
                <p className="text-primary ">₦</p>
              </span>
              <p className="text-muted font-medium dm-sams">
                {item?.isFree ? "FREE" : item?.cost?.amount}
              </p>
            </div>
            <span className="flex items-center gap-[10px] min-w-max ">
              <p className="text-muted text-sm dm-sans">Type</p>
              <p className="text-sm dm-sans font-bold text-muted">Offering</p>
            </span>
            <span className="flex items-center gap-[10px] min-w-max ">
              <BlueCalenderIcon />
              <p className="text-sm dm-sans font-medium text-muted">
                {formatDateTime(item?.startDateTime)?.date}
              </p>
            </span>
            <span className="flex items-center gap-[10px] min-w-max ">
              <BlueTimeIcon />
              <p className="text-sm dm-sans font-medium text-muted">
                {formatDateTime(item?.startDateTime)?.time}
              </p>
            </span>
            <span className="flex items-center gap-[10px] min-w-max ">
              <BlueStopWatch />
              <p className="text-sm dm-sans font-medium text-muted">
                {item?.duration === 30 ? "30 MINS" : "60 MINS"}
              </p>
            </span>
            <span className="flex items-center gap-[10px] min-w-max ">
              <BlueVideoIcon />
              <p className="text-sm dm-sans font-medium text-muted">
                Video Call
              </p>
            </span>
          </div>
          <div className=" mt-7 flex items-center gap-[10px]   flex-wrap">
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

            {item?.nextSession && (
              <span className="flex items-center gap-[10px]">
                <ActionBtn
                  name="Book next session"
                  onClick={() => setOpenMonthly(true)}
                />
                <PaddedArrow />
              </span>
            )}
            {item?.offeringType !== "LIVE_GROUP" && (
              <ActionBtn
                name="Reschedule call"
                onClick={() => setOpenReschedule(true)}
              />
            )}
            <span></span>
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
