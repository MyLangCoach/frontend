import { useState,useEffect } from 'react'
import { useAppDispatch,useAppSelector } from '../../app/hooks';
import { CancelIcon, CancelX, Plus, PlusCircle,  } from '../../assets';
import filterIcon from "../../assets/png/caret-sort.png";
import { OfferingsDummy } from '../../util/mockdata';
import CreateNewServiceModal from './create-new-service-modal';
import { bookCoachOffering, getAllBookedOfferingCoach, getAllCreatedOfferingCoach, getAllOfferings } from '../../features/offeringslice';
import LoadingComponent from '../Loaders/skeleton-loading';
import { formatDateTime } from '../../util';
import ViewOfferingModal from '../modal/view-offering-modal';

import toast from 'react-hot-toast';
import { Button } from '../Button';
import { DateTimeInput, Input } from "../Input";
import ReUseModal from '../modal/Modal';
const OfferingsTable = () => {
  const offerings = useAppSelector(state => state.offerings);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllCreatedOfferingCoach())
  }, [])
  
  const allOfferings = offerings?.allCreatedOfferingsCoach?.offerings;
  console.log(allOfferings);

  const [open, setOpen] = useState(false);

  if (offerings?.fetchLoading) {
    return (
      <div>
        <LoadingComponent />
      </div>
    )
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
        <div className="w-3/12 min-w-fit rounded-md h-[36px] px-4 flex justify-center items-center gap-2 border border-[#E4E4E7] cursor-pointer" onClick={() => setOpen(true)}>
          <span>
            <Plus />
          </span>
          <span className="text-foreground text-sm inter font-medium">
            Add new service
          </span>
        </div>
        {/* end of new service */}
      </div>
      <div className="w-full mt-5">
        <table className="w-full border border-border rounded-[4px]">
          <thead className="w-full grid grid-cols-5 h-[40px] border-b border-b-border px-2 ">
            <th className="flex items-center gap-3 w-full ">
              <input
                type="checkbox"
                name=""
                id=""
                className="accent-black  w-4 h-4 rounded-md "
              />
              <p className="text-muted text-sm inter font-medium">Name</p>
            </th>
            <th className="flex items-center gap-3 w-full ">
              <p className="text-muted text-sm inter font-medium">Price</p>
              <span>
                <img src={filterIcon} alt="filter" />
              </span>
            </th>
            <th className=" flex items-center gap-3 w-full">
              <p className="text-muted text-sm inter font-medium">Duration</p>
              <span>
                <img src={filterIcon} alt="filter" />
              </span>
            </th>
            <th className=" flex items-center gap-3 w-full">
              <p className="text-muted text-sm inter font-medium">Class Time</p>
              <span>
                <img src={filterIcon} alt="filter" />
              </span>
            </th>
            <th className=" flex items-center gap-3 w-full">
              <p className="text-muted text-sm inter font-medium">Actions</p>
              <span>
                <img src={filterIcon} alt="filter" />
              </span>
            </th>
          </thead>
          <tbody className="w-full flex flex-col">
            {allOfferings?.map((item: any, index: number) => {
              return (

                <SingleRow item={item} index={index} key={index} />
              )
            })}
          </tbody>
        </table>
      </div>
      <CreateNewServiceModal open={open} setOpen={setOpen} />
    </div>
  );
}

export default OfferingsTable


const SingleRow = ({item, index} : any) => {
  const [open, setOpen] = useState(false);
  const [openReschedule, setOpenReschedule] = useState(false);
  const [note, setNote] = useState("");
  const dispatch = useAppDispatch();
  const offering = useAppSelector(state => state.offerings);
  const [date, setDate] = useState<string>("");
  const [active, setActive] = useState<boolean>(false)
    const handleReschedule = () => {
 
        if (active) {
          const sentdata = {
            id: item?.id,
            data: {
              note: note,
            proposedDateTime:date
            },
          };

          dispatch(bookCoachOffering(sentdata));
        } else {
          toast.error("All Field   must be provided");
        }
      
    };
    return (
      <tr
        key={index}
        className="grid grid-cols-5 px-2 border-b-border border-b last:border-none min-h-[68px] cursor-pointer "
      >
        <td
          className="w-full flex items-center gap-3"
          onClick={() => setOpen(true)}
        >
          <span>
            <input
              type="checkbox"
              name=""
              id=""
              className="accent-black  w-4 h-4 rounded-md "
            />
          </span>
          <div
            className="flex flex-col gap-[10px]  w-full overflow-x-hidden"
            onClick={() => setOpen(true)}
          >
            <h1 className="text-foreground font-normal  text-sm truncate inter">
              {item?.title}
            </h1>
            <p className=" rounded-[4px] px-[6px] bg-lemonGreen text-xs inter text-foreground py-[2px] w-fit ">
              Active
            </p>
          </div>
        </td>
        <td
          className="w-full flex items-center  "
          onClick={() => setOpen(true)}
        >
          <p className="text-foreground font-normal text-sm truncate inter pl-5 min-w-max">
            {item?.costType === "FREE" ? "FREE" : item?.cost?.amount}
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
        <td
          className="w-full flex flex-col gap-[10px] justify-center"
          onClick={() => setOpen(true)}
        >
          {item?.liveDateTimes?.length > 0 ? (
            <div className="flex flex-col gap-[10px] justify-center">
              <p className="text-foreground font-normal text-sm truncate inter">
                {formatDateTime(item?.liveDateTimes?.[0])?.date}
              </p>
              <p className=" rounded-[4px] px-[6px] bg-fadeBG text-xs inter text-foreground py-[2px] w-fit ">
                {formatDateTime(item?.liveDateTimes?.[0])?.time}
              </p>
            </div>
          ) : (
            <p className="text-foreground font-normal text-sm truncate inter">
              Any Time
            </p>
          )}
        </td>
        <td className="w-full flex items-center gap-[10px] justify-start">
          {/* <p className="text-foreground font-normal text-sm truncate inter">
            {item?.numOfAttendees}
          </p> */}
          {
            item?.type === "LIVE_GROUP" && (
              <Button name="Reschedule" onClick={() => setOpenReschedule(true)} />

            )
          }
          <Button
            className="min-w-max"
            name="Feedbacks"
            onClick={() => setOpenReschedule(true)}
          />
        </td>
        <ViewOfferingModal
          open={open}
          setOpen={setOpen}
          item={item}
          index={index}
        />
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
              Select Proposed Date and time
            </p>
            <div className="flex flex-col gap-3">
              <DateTimeInput
                key={index}
                dateTime={date}
                setDateTime={setDate}
              />
            </div>
            <div className="w-full mt-6">
              <Button
                name={offering?.loading ? "Loading..." : "Book Now"}
                height="h-[49px]"
                className={`flex-grow min-w-full ${
                  !active && "opacity-40 cursor-not-allowed"
                }`}
                onClick={handleReschedule}
                disabled={!active}
              />
            </div>
          </div>
        </ReUseModal>
      </tr>
    );
}