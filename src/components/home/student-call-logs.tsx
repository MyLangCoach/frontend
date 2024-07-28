import { useState,useEffect } from "react";
import { Button } from "../Button";
import { Link, useNavigate } from "react-router-dom";
import CreateNewServiceModal from "../live-classes/create-new-service-modal";
import { useAppDispatch,useAppSelector } from "../../app/hooks";
import { getAllSessionBookingStudent } from "../../features/offeringslice";
import LoadingComponent from "../Loaders/skeleton-loading";
import { formatDateTime } from "../../util";
import { BlueCalenderIcon, BlueTimeIcon } from "../../assets";
import { payForSession, restoreDefault } from "../../features/paymentslice";
const StudentCallLogs = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
    const offering = useAppSelector(state => state.offerings);
    useEffect(() => {
        dispatch(getAllSessionBookingStudent());
    }, [])
    const bookings = offering?.allBookingsSessionStudent;

  const [current, setCurrent] = useState(0);
  const [open, setOpen] = useState<boolean>(false);
  console.log(bookings)
    
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
      {/* <p className="capitalize">
        {item?.student.firstName ?? ""} {item?.student?.lastName ?? ""}
      </p> */}
      {/* end of tabs session */}
      {current === 0 && (
        <div className="w-full mt-4 bg-white min-h-[234px] flex flex-col  rounded-md">
          {bookings.length > 0 ? (
            <div className="w-full flex flex-col px-4 py-4">
              {bookings?.map((item: any, index: number) => (
              <SingleRow item={item} index={index} />
              ))}
            </div>
          ) : (
            <div className="flex h-full items-center justify-center flex-col min-h-[234px]">
              <p className="red-hat font-bold text-black lg:max-w-[424px] lg:text-xl text-base text-center ">
                You do not have any classes at the moment, You can proceed to book a coaching session or offerings to continue
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

export const SingleRow = ({ item, index }: { item: any, index: number }) => {
   const dispatch = useAppDispatch();
   const payment = useAppSelector((state) => state.payment);

   const handlePayment = () => {
     const data = {
       bookingId: item?.id,
       paymentMethod: "TRANSFER",
     };
     console.log({ data });
     dispatch(payForSession(data));
   };

   useEffect(() => {
     if (
       payment?.sessionPaymentSuccess &&
       payment?.sessionPaymentResp?.authorization_url
     ) {
       window.open(payment?.sessionPaymentResp?.authorization_url, "_blank");
       setTimeout(() => {
         dispatch(restoreDefault());
       }, 3000);
     }
   }, [payment?.sessionPaymentSuccess]);

  return (
    <div
      className="flex flex-col gap-2 border-border border  rounded-[4px]"
      key={index}
    >
      <div className="w-full min-h-[76px] flex lg:px-6 items-center gap-3 border-b border-b-border  ">
        <p className="red-hat text-foreground font-bold text-[23px]">
          {item.note}
        </p>
        <span className="bg-[#FABC4E] px-[6px] h-7 flex items-center rounded-[4px] text-white">
          1:1 class
        </span>
      </div>
      <div className="w-full flex flex-col lg:px-6 pb-6">
        <div className="w-full mt-3 flex wrap gap-6 items-center">
          <span className="flex items-center gap-[10px] ">
            <p className="text-muted text-sm dm-sans">Status</p>
            <p className="text-sm dm-sans font-bold text-muted">
              {item.status}
            </p>
          </span>
          <span className="flex items-center gap-[10px] ">
            <p className="text-muted text-sm dm-sans">Book type</p>
            <p className="text-sm dm-sans font-bold text-muted">Session</p>
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
        </div>
        <div className=" mt-7">
          {item?.meetingLink && item?.transactionReference && (
            <Link
              to={item?.meetingLink}
              className="items-center hover:bg-[#0E79FF] transition duration-500  bg-black rounded-[4px] text-white px-3 w-fit h-[32px] text-xs dm-sans flex  justify-center"
            >
              Join Call
            </Link>
          )}
          {!item?.meetingLink && item?.transactionReference && (
            <Button name="Processing..." />
          )}
          {!item?.meetingLink && !item?.transactionReference && (
            <Button name="Make Payment" onClick={handlePayment} />
          )}

       
          {/* <Button name="Join Session" /> */}
        </div>
      </div>
    </div>
  ); 
}