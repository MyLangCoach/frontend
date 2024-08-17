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
  respondToReschedule,
  getAllReschedules,
} from "../../features/offeringslice";
import { payForOffering } from "../../features/paymentslice";
import { formatDateTime } from "../../util";
import { Button, ActionBtn } from "../Button";
import { DateTimeInput, Input } from "../Input";
import ReUseModal from "../modal/Modal";

const CoachReceivedRescheduleCard = ({ item, index }: { item: any; index: number }) => {
  const dispatch = useAppDispatch();
  console.log({item})
  const payment = useAppSelector((state) => state.payment);
  const offering = useAppSelector((state) => state.offerings);
  const [openReschedule, setOpenReschedule] = useState(false);
  const [date, setDate] = useState<string>("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const [activeReschule, setActiveReschedule] = useState<boolean>(false);



    
  const handleReject = async () => {
    setLoading(true);
      if (note) {
        const sentdata = {
          id: item?.id,
          data: {
            note: note,
            response: "REJECTED",
          },
        };

        const { payload } = await dispatch(respondToReschedule(sentdata));
        if (payload?.status === "success") {
          setOpenReschedule(false);
          setLoading(false);
          dispatch(getAllReschedules());
          toast.success("Rejected Successfully")
        }
        else {
          setLoading(false);
        }
      } else {
        toast.error("All Field   must be provided");
      }
}


  const handleAcceptReschedule = async () => {
    setLoading(true);
      const sentdata = {
        id: item?.id,
        data: {
          note: "I have Accepted",
          response: "ACCEPTED",
        },
      };

    const {payload} = await  dispatch(respondToReschedule(sentdata));
     if (payload?.status === "success") {
      
       setLoading(false);
       toast.success("Accepted Reschedule Request Successfully");
       dispatch(getAllReschedules());
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
        className=" w-full flex flex-col gap-2 border-border border  rounded-[4px]"
        key={index}
      >
        <div className="w-full min-h-[76px] flex lg:px-6 items-center gap-3 border-b border-b-border  ">
          <p className="red-hat text-foreground font-bold text-[23px]">
            Reschedule Request
          </p>
        </div>
        <div className="w-full flex flex-col  pb-6">
          <div className="w-full flex justify-between px-6 items-center">
            <p className="text-sm dm-sans w-full lg:w-1/2 font-medium text-muted px-6">
              <span className="font-bold mr-2">Note:</span>
              {item?.initiatorNote}
            </p>
            <div className="w-1/2 justify-end mt-3 flex-wrap flex  gap-6 items-center">
              <span className="font-bold mr-2"> Date:</span>
              <span className="flex items-center gap-[10px] min-w-max ">
                <BlueCalenderIcon />
                <p className="text-sm dm-sans font-medium text-muted">
                  {formatDateTime(item?.proposedDate)?.date}
                </p>
              </span>
              <span className="flex items-center gap-[10px] min-w-max ">
                <BlueTimeIcon />
                <p className="text-sm dm-sans font-medium text-muted">
                  {formatDateTime(item?.proposedDate)?.time}
                </p>
              </span>
            </div>
          </div>

          <div className=" mt-7  border-t border-t-border pt-4 px-6 ">
            {/* <Button name="Join Session" /> */}
            {item?.status === "PENDING" && (
              <div className="flex items-center gap-[16px]">
                <span>
                  <ActionBtn name="Accept" onClick={handleAcceptReschedule} />
                </span>
                <span>
                  <ActionBtn
                    name="Reject"
                    onClick={() => setOpenReschedule(true)}
                  />
                </span>
              </div>
            )}
            {item?.status !== "PENDING" && (
              <div className="flex items-center gap-[16px]">
                <p className="text-base dm-sans font-medium text-muted">
               You Have Already Responded to this request
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

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
            Reason for Rejecting
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

          <div className="w-full mt-6">
            <Button
              name={offering?.loading ? "Loading..." : "Confirm Rescheduling"}
              height="h-[49px]"
              className={`flex-grow min-w-full ${
                !note && "opacity-40 cursor-not-allowed"
              }`}
              onClick={handleReject}
              disabled={!note}
            />
          </div>
        </div>
      </ReUseModal>
    </>
  );
};

export default CoachReceivedRescheduleCard;
