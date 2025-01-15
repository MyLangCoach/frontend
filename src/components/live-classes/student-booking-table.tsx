import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { CancelIcon, Plus, PlusCircle } from "../../assets";
import filterIcon from "../../assets/png/caret-sort.png";
import { OfferingsDummy } from "../../util/mockdata";
import CreateNewServiceModal from "./create-new-service-modal";
import {
  getAllOfferingBookingStudent,
  getAllOfferings,
  getAllSessionBookingStudent,
} from "../../features/offeringslice";
import LoadingComponent from "../Loaders/skeleton-loading";
import { formatDateTime } from "../../util";
import { Link } from "react-router-dom";
import { Button } from "../Button";
import { payForOffering, payForSession, restoreDefault } from "../../features/paymentslice";
const StudentBookingTable = () => {
  const offering = useAppSelector((state) => state.offerings);
  const dispatch = useAppDispatch();
  useEffect(() => {
    //   dispatch(getAllOfferingBookingStudent());
         dispatch(getAllSessionBookingStudent());
    //  dispatch(getAllOfferings());
  }, []);

  const bookings = offering?.allBookingsSessionStudent;

  


  if (offering?.fetchLoading) {
    return (
      <div>
        <LoadingComponent />
      </div>
    );
  }

  return (
    <div className="w-full bg-white py-6 px-3 flex flex-col">
      <h1 className="text-black font-bold  red-hat text-base lg:text-[19px]">
         Session Bookings
      </h1>
      <div className="w-full flex items-center mt-2 gap-3">
        {/* input */}
        <div className="w-4/12">
          <input
            type="text"
            className="lg:min-w-[200px] h-[36px] outline-none flex items-center px-3 rounded-md border-[#E4E4E7] border input-shadow w-full placeholder:text-muted text-sm inter  "
            placeholder="Filter Classes"
          />
        </div>
        {/* end of input */}

      </div>
      <div className="w-full mt-5 flow-hide-x">
        <table className="w-full border border-border rounded-[4px] table-fixed min-w-max">
          <th className="w-full grid grid-cols-5 h-[40px] border-b border-b-border px-2 ">
            <td className="flex items-center gap-3 w-full ">
              <input
                type="checkbox"
                name=""
                id=""
                className="accent-black  w-4 h-4 rounded-md "
              />
              <p className="text-muted text-sm inter font-medium">Name</p>
            </td>
            <td className="flex items-center gap-3 w-full ">
              <p className="text-muted text-sm inter font-medium">
                Payment Status
              </p>
              <span>
                <img src={filterIcon} alt="filter" />
              </span>
            </td>
            <td className=" flex items-center gap-3 w-full">
              <p className="text-muted text-sm inter font-medium">Duration</p>
              <span>
                <img src={filterIcon} alt="filter" />
              </span>
            </td>
            <td className=" flex items-center gap-3 w-full">
              <p className="text-muted text-sm inter font-medium">
                Meeting Time
              </p>
              <span>
                <img src={filterIcon} alt="filter" />
              </span>
            </td>
            <td className=" flex items-center gap-3 w-full justify-center">
              <p className="text-muted text-sm inter font-medium">Action</p>
              <span>
                <img src={filterIcon} alt="filter" />
              </span>
            </td>
          </th>
          <tbody className="w-full flex flex-col">
            {bookings?.map((item: any, index: number) => {
              return <SingleRow item={item} index={index} key={index} />;
            })}
          </tbody>
        </table>
      </div>
      {/* <CreateNewServiceModal open={open} setOpen={setOpen} /> */}
    </div>
  );
};

export default StudentBookingTable;

const SingleRow = ({ item, index }: { item: any; index: number }) => {
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
    <tr
      key={index}
      className="grid grid-cols-5 px-2 border-b-border border-b last:border-none min-h-[68px] "
    >
      <td className="w-full flex items-center gap-3">
        <span>
          <input
            type="checkbox"
            name=""
            id=""
            className="accent-black  w-4 h-4 rounded-md "
          />
        </span>
        <div className="flex flex-col gap-[10px]">
          <h1 className="text-foreground font-normal text-sm truncate inter capitalize max-w-[200px] ">
            {item?.note}
          </h1>
          <p className=" rounded-[4px] px-[6px] bg-lemonGreen text-xs inter text-foreground py-[2px] w-fit ">
            {item?.status}
          </p>
        </div>
      </td>
      <td className="w-full flex items-center justify-center">
        <p className="text-foreground font-normal text-sm truncate inter">
          {item?.paymentConfirmed && item?.transactionReference && "Paid"}
          {item?.isFree === true && "Free"}
          {item?.paymentConfirmed === false &&
             
            "Not Paid"}
        </p>
      </td>
      <td className="w-full flex flex-col gap-[10px] justify-center">
        <p className="text-foreground font-normal text-sm truncate inter">
          {item?.duration === 30 ? "30 MINS" : "60 MINS"}
        </p>
        <p className=" rounded-[4px] px-[6px] bg-fadeBG text-xs inter text-foreground py-[2px] w-fit ">
          {item?.type}
        </p>
      </td>
      <td className="w-full flex flex-col gap-[10px] justify-center">
        <p className="text-foreground font-normal text-sm truncate inter">
          {formatDateTime(item?.startDateTime)?.date},{" "}
          {formatDateTime(item?.startDateTime)?.time}
        </p>
        <p className=" rounded-[4px] px-[6px] bg-fadeBG text-xs inter text-foreground py-[2px] w-fit ">
          {formatDateTime(item?.endDateTime)?.date},{" "}
          {formatDateTime(item?.endDateTime)?.time}
        </p>
      </td>
      <td className="w-full flex items-center justify-center">
        {item?.meetingLink && item?.paymentConfirmed && item?.status !== "ENDED" && (
          <Link
            to={item?.meetingLink}
            className="items-center hover:bg-[#0E79FF] transition duration-500  bg-black rounded-[4px] text-white px-3 w-fit h-[32px] text-xs dm-sans flex  justify-center"
          >
            Join Call
          </Link>
        )}
        {!item?.meetingLink &&
          !item?.paymentConfirmed &&
          item?.transactionReference && (
            <Button name="Retry Payment" onClick={handlePayment} />
          )}
        {!item?.meetingLink &&
          item?.transactionReference &&
          item?.paymentConfirmed &&
          item?.status !== "ENDED" && <Button name="Processing..." />}
        {!item?.meetingLink && !item?.transactionReference && (
          <Button name="Make Payment" onClick={handlePayment} />
        )}
        {item?.status === "ENDED" && <Button name="ENDED" />}
      </td>
    </tr>
  );
};
