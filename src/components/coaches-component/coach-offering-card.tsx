import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  DollarIcon,
  BlueCalenderIcon,
  BlueTimeIcon,
  BlueStopWatch,
  BlueVideoIcon,
  PaddedArrow,
  CancelX,
} from "../../assets";
import {
  restoreDefault,
  bookNextSession,
  rescheduleOffering,
  getAllBookedOfferingCoach,
} from "../../features/offeringslice";
import { payForOffering } from "../../features/paymentslice";
import { formatDateTime } from "../../util";
import { Button, ActionBtn } from "../Button";
import { DateTimeInput, Input } from "../Input";
import ReUseModal from "../modal/Modal";

const CoachOfferingCard = ({ item, index }: { item: any; index: number }) => {
  const dispatch = useAppDispatch();
  const payment = useAppSelector((state) => state.payment);
  const offering = useAppSelector((state) => state.offerings);
  const [openReschedule, setOpenReschedule] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [date, setDate] = useState<string>("");
  const [note, setNote] = useState("");
  const [liveDateTimes, setLiveDateTimes] = useState<string[]>([" "]);
  const [activeReschule, setActiveReschedule] = useState<boolean>(false);
  const handlePayment = async () => {
    const data = {
      seriesId: item?.seriesId,
      paymentMethod: "TRANSFER",
    };
    console.log({ data });
    dispatch(payForOffering(data));
  };

  useEffect(() => {
    // if (
    //   payment?.offeringPaymentSuccess &&
    //   payment?.offeringPaymentResp?.authorization_url
    // ) {
    //   window.open(payment?.offeringPaymentResp?.authorization_url, "_blank");
    //   setTimeout(() => {
    //     dispatch(restoreDefault());
    //   }, 3000);
    // }
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
    const sentdata = {
      id: item?.seriesId,
      data: {
        note: note ?? "I want to learn ",
        bookTimes: liveDateTimes,
      },
    };

    dispatch(bookNextSession(sentdata));
  };

  const [active, setActive] = useState(false);
  const verifyItems = (time: string) => {
    return time.split("")?.length > 2;
  };
  const [openMonthly, setOpenMonthly] = useState(false);
  useEffect(() => {
    const isFilled = liveDateTimes?.some(verifyItems);

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

  const handleReschedule = async () => {
    setLoading(true);
    if (activeReschule) {
      const sentdata = {
        id: item?.id,
        data: {
          note: note ?? "I want to learn ",
          proposedDateTime: date,
        },
      };

      const { payload } = await dispatch(rescheduleOffering(sentdata));
      if (payload?.status === "success") {
        setLoading(false);
        toast.success("Reschedule request sent successfully");
        setOpenReschedule(false);
        dispatch(getAllBookedOfferingCoach());
      } else {
        setLoading(false);
      }
    } else {
      toast.error("All Field   must be provided");
    }
  };

  return (
    <>
      <div
        className="flex flex-col gap-2 border-border border   rounded-[4px]"
        key={index}
      >
        <div className="w-full min-h-[76px] flex lg:px-6 lg:items-center gap-3 border-b p-4  lg:py-0 border-b-border flex-col lg:flex-row ">
          <p className="red-hat  text-foreground font-bold text-[23px]">
            {item.offeringTitle}
          </p>
          <span className="bg-[#FABC4E] px-[6px] h-7 flex items-center rounded-[4px] text-white w-fit">
            {item?.offeringType === "ONE_TIME" && "1:1 class"}
            {item?.offeringType === "ONE_MONTHLY" && "1:1 Monthly"}
            {item?.offeringType === "LIVE_GROUP" && "Live Group"}
          </span>
        </div>
        <div className="w-full flex flex-col p-4 lg:px-6 pb-6">
          <div className="w-full mt-3 flex-wrap flex  gap-6 items-center">
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
            <span className="flex items-center gap-[10px] min-w-max">
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
          <div className=" mt-7 flex items-center gap-[10px] flex-wrap ">
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
              item?.isFree === false &&
              item?.offeringType !== "LIVE_GROUP" && (
                <Button name="Waiting Payment" />
              )}

            {/* <Button name="Join Session" /> */}

            {item?.offeringType !== "LIVE_GROUP" && (
              <ActionBtn
                name="Reschedule call"
                onClick={() => setOpenReschedule(true)}
              />
            )}
            <span></span>
            {/* {item?.nextSession && (
              <span className="flex items-center gap-[10px]">
                <ActionBtn
                  name="Book next session"
                  onClick={() => setOpenMonthly(true)}
                />
                <PaddedArrow />
              </span>
            )} */}
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
            Monthly Series Booking
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
          <h1 className="text-xl font-bold red-hat mb-4 ">Reschedule Call</h1>
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

export default CoachOfferingCard;
