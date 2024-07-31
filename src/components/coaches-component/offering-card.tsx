import { useEffect, useState } from 'react';
import { ClassDetails } from '../../util/types';
import pic from "../../assets/png/face-woman.png";
import { BlueTimeIcon, BlueVideoIcon, CancelX, DollarIcon, YellowCalender, YellowCap } from '../../assets';
import ReUseModal from '../modal/Modal';
import OfferingCalendar from './offering-booking';
import { DateTimeInput, Input } from "../Input";
import { store } from '../../app/store';
import toast from 'react-hot-toast';
import { resetRedirect, saveRedirectUrl } from '../../features/auth/authSlice';
import { bookCoachOffering, restoreDefault } from '../../features/offeringslice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../Button';
const OfferingCard = ({ item }:{item:ClassDetails}) => {
     const authenticated = store.getState().auth?.token;
  const userPic = pic;
    const handleError = (e:any) => {
      e.target.onerror = null; // Prevent looping
      e.target.src = pic;
  };
    const urlId = useParams();
  const dispatch = useAppDispatch();
    const navigate = useNavigate();
   const offering = useAppSelector((state) => state.offerings);
  const [open, setOpen] = useState<boolean>(false);

  const [openLive, setOpenLive] = useState(false);
  const [openMonthly, setOpenMonthly] = useState(false);
  const [note, setNote] = useState("");
  
  const handleBookLiveClass = () => {
    if (authenticated) {
      if (note) {
        const sentdata = {
          id: item?.id,
          data: {
            note: note,
            bookTimes: [],
          },
        };

        dispatch(bookCoachOffering(sentdata));
      } else {
        toast.error("Note  must be provided");
      }
    } else {
      dispatch(saveRedirectUrl(`/view-coach/${urlId?.id}`));
      navigate("/login");
    }
  };
  const [active, setActive] = useState(false);
  const verifyItems = (time:string) => {
   return time.split("")?.length > 2
  }

  
  const handleBookMonthly = () => {
    
   
    if (authenticated) {
      if (active) {
        const sentdata = {
          id: item?.id,
          data: {
            note: note,
            bookTimes: liveDateTimes?.filter((item:string) => item?.length > 0),
          },
        };

        dispatch(bookCoachOffering(sentdata));
      } else {
        toast.error("All Field   must be provided");
      }
    } else {
      dispatch(saveRedirectUrl(`/view-coach/${urlId?.id}`));
      navigate("/login");
    }
  };

  const handleCloseLive = () => {
    setTimeout(() => {
      setOpenLive(false);
      setOpenMonthly(false);
    }, 50);
  }
    useEffect(() => {
      if (offering.bookCoachOfferingSuccess) {
        toast.success(
          "You have successfully booked this coach offering with the coach"
        );
        dispatch(restoreDefault());
        dispatch(resetRedirect());
        navigate("/student/live-classes");
        setOpenLive(false);
        setOpenMonthly(false);
        setOpen(false);
      }
    }, [offering?.bookCoachOfferingSuccess]);
  
  const [liveDateTimes, setLiveDateTimes] = useState<string[]>([" "]
  );


  // Update a specific date-time value
  const updateDateTime = (index: number, newDateTime: string) => {
    const updatedDateTimes = [...liveDateTimes];
    updatedDateTimes[index] = newDateTime;
    setLiveDateTimes(updatedDateTimes);
  };
    useEffect(() => {
      const isFilled = liveDateTimes?.some(verifyItems);
     
      if (isFilled && note) {
        setActive(true);
      } else {
        setActive(false);
      }
    }, [note, liveDateTimes]);
  
  return (
    <div
      className="w-full flex flex-col offering-shadow rounded-md cursor-pointer"
      key={item?.id}
      onClick={() => {
        if (item?.type === "ONE_TIME") {
          setOpen(true);
        }
        if (item?.type === "ONE_MONTHLY" && item?.seriesCount === 1) {
          setOpen(true);
        }
        if (item?.type === "ONE_MONTHLY" && item?.seriesCount > 1) {
          setOpenMonthly(true);
        }
        if (item?.type === "LIVE_GROUP") {
          setOpenLive(true);
        }
      }}
    >
      <img
        src={item?.coverImageUrl}
        onError={handleError}
        alt=""
        className=" rounded-md w-full h-[240px] object-cover "
      />
      <div className="flex flex-col p-[18px] bg-white ">
        <h1 className="font-bold text-lg red-hat capitalize">{item?.title}</h1>
        <p className="text-base red-hat mt-6">{item?.description}</p>
        {/* <p className="text-base red-hat mt-6">
          {item?.type === "LIVE_GROUP" && "LIVE GROUP"}
          {item?.type === "ONE_MONTHLY" && "ONE MONTHLY"}
          {item?.type === "ONE_TIME" && "ONE TIME"}
        </p> */}

        <div className="w-full flex items-center mt-6 justify-between">
          <span className="flex items-center gap-2">
            <YellowCap />
            <p className="text-muted dm-sans ">
              {item?.seriesCount}  {`Class${item?.seriesCount > 1 ? "es":""}`} Offered
            </p>
          </span>
          <span className="flex items-center gap-2">
            <YellowCalender />
            <p className="text-muted dm-sans ">
              {item?.type === "LIVE_GROUP" && "LIVE GROUP"}
              {item?.type === "ONE_MONTHLY" && "ONE MONTHLY"}
              {item?.type === "ONE_TIME" && "ONE TIME"}
            </p>
          </span>
        </div>

        <div className="w-full flex items-center gap-4 mt-6 border-t  border-t-border pt-3">
          <div className="flex gap-3  items-center">
            <span>
              <DollarIcon />
            </span>
            <p className="text-muted font-medium dm-sams">
              {item?.isFree ? "FREE" : item?.cost?.amount}
            </p>
          </div>

          <div className="flex gap-3 items-center ">
            <span>
              <BlueTimeIcon />
            </span>
            <p className="text-muted font-medium dm-sams">
              {item?.duration ?? "45 mins"}
            </p>
          </div>
          <div className="flex gap-3 items-center ">
            <span>
              <BlueVideoIcon />
            </span>
            <p className="text-muted font-medium dm-sams">Video Call</p>
          </div>
        </div>
      </div>
      <ReUseModal
        open={open}
        setOpen={setOpen}
        width="sm:max-w-[630px] sm:w-full"
      >
        <OfferingCalendar item={item} setOpen={setOpen} />
      </ReUseModal>
      <ReUseModal open={openLive} setOpen={setOpenLive}>
        <div className="w-full flex flex-col">
          <div className="flex justify-end mb-3">
            <button className="cursor-pointer" onClick={handleCloseLive}>
              <CancelX />
            </button>
          </div>
          <h1 className="text-xl font-bold red-hat mb-4 ">
            Live Group Booking
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
          <div className="w-full">
            <Button
              name={offering?.loading ? "Loading..." : "Book Now"}
              height="h-[49px]"
              className={`flex-grow ${
                !note && "opacity-40 cursor-not-allowed"
              }`}
              onClick={handleBookLiveClass}
              disabled={!note}
            />
          </div>
        </div>
      </ReUseModal>
      <ReUseModal open={openMonthly} setOpen={setOpenMonthly}>
        <div className="w-full flex flex-col">
          <div className="flex justify-end mb-3">
            <button className="cursor-pointer" onClick={handleCloseLive}>
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
              onClick={handleBookMonthly}
              disabled={!active}
            />
          </div>
        </div>
      </ReUseModal>
    </div>
  );
}

export default OfferingCard
