import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { CancelIcon, Plus, PlusCircle } from "../../assets";
import filterIcon from "../../assets/png/caret-sort.png";
import { OfferingsDummy } from "../../util/mockdata";
import CreateNewServiceModal from "./create-new-service-modal";
import { getAllOfferingBookingStudent, getAllOfferings } from "../../features/offeringslice";
import LoadingComponent from "../Loaders/skeleton-loading";
import { formatDateTime } from "../../util";
import { Link } from "react-router-dom";
import { Button } from "../Button";
import { payForOffering, restoreDefault } from "../../features/paymentslice";
const StudentOfferingsTable = () => {
  const offerings = useAppSelector((state) => state.offerings);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllOfferingBookingStudent());
    //  dispatch(getAllOfferings());
  }, []);

  const allOfferings = offerings?.allBookedOfferingsStudent;
  console.log(allOfferings);

  const [open, setOpen] = useState(false);

 
  if (offerings?.fetchLoading) {
    return (
      <div>
        <LoadingComponent />
      </div>
    );
  }


  return (
    <div className="w-full bg-white py-6 px-3 flex flex-col">
      <h1 className="text-black font-bold  red-hat text-base lg:text-[19px]">
        Offerings
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

        {/* duration */}
        {/* <div className="w-3/12 h-[36px] flex items-center rounded-md border-dotted border border-[#E4E4E7] px-3 justify-center gap-2 ">
          <div className="flex items-center gap-3 border-r border-r-[#e4e4e7] pr-3">
            <span>
              <PlusCircle />
            </span>
            <p className="text-sm font-medium inter text-[#18181B] ">
              Duration
            </p>
          </div>
          <div className="flex bg-[#F4F4F5] px-1 py-[2px] rounded-sm gap-[10px] text-xs text-[#09090B] ">
            3 Selected
          </div>
        </div> */}
        {/* end of duration */}
        {/* reset */}
        {/* <div className="w-2/12 gap-3 flex items-center h-[36px] justify-center cursor-pointer">
          <span className="text-foreground text-sm inter font-medium">
            Reset
          </span>
          <CancelIcon />
        </div> */}
        {/* end reset */}
        {/* new service */}
    
        {/* end of new service */}
      </div>
      <div className="w-full mt-5">
        <table className="w-full border border-border rounded-[4px]">
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
              <p className="text-muted text-sm inter font-medium">Payment Status</p>
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
              <p className="text-muted text-sm inter font-medium">Meeting Time</p>
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
            {allOfferings?.map((item: any, index: number) => {
              return (
              <SingleRow item={item} index={index} key={index} />
              );
            })}
          </tbody>
        </table>
      </div>
      <CreateNewServiceModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default StudentOfferingsTable;

const SingleRow = ({ item, index }: { item: any, index: number }) => {
  const dispatch = useAppDispatch();
  const payment = useAppSelector(state => state.payment);

  const handlePayment = () => {
    const data = {
      seriesId: item?.seriesId,
      paymentMethod:"TRANSFER"
    }
    console.log({ data });
    dispatch(payForOffering(data))
  }

  useEffect(() => {
    if (payment?.offeringPaymentSuccess && payment?.offeringPaymentResp?.authorization_url) {
      
      window.open(payment?.offeringPaymentResp?.authorization_url, "_blank");
      setTimeout(() => {
        
        dispatch(restoreDefault());
      }, 3000);
    }
  }, [payment?.offeringPaymentSuccess])
  
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
          <h1 className="text-foreground font-normal text-sm truncate inter capitalize">
            {item?.offeringTitle}
          </h1>
          <p className=" rounded-[4px] px-[6px] bg-lemonGreen text-xs inter text-foreground py-[2px] w-fit ">
            {item?.status}
          </p>
        </div>
      </td>
      <td className="w-full flex items-center">
        <p className="text-foreground font-normal text-sm truncate inter">
          {item?.paymentConfirmed && item?.isFree === false && "Paid"}
          {item?.isFree === true && "Free"}
          {item?.paymentConfirmed === false &&
            item?.isFree === false &&
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
        {item?.meetingLink ? (
          <Link
            to={item?.meetingLink}
            className="items-center hover:bg-[#0E79FF] transition duration-500  bg-black rounded-[4px] text-white px-3 w-fit h-[32px] text-xs dm-sans flex  justify-center"
          >
            Join Call
          </Link>
        ) : (
          <Button name="Make Payment" onClick={handlePayment} />
        )}
      </td>
    </tr>
  );
}
