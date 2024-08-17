import {
    BlueCalenderIcon,
    BlueTimeIcon
} from "../../assets";
import { formatDateTime } from "../../util";

const CoachSentRescheduleCard = ({
  item,
  index,
}: {
  item: any;
  index: number;
}) => {
  
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
                <p className="text-base dm-sans font-medium text-muted">
                Waiting for response
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

    
    </>
  );
};

export default CoachSentRescheduleCard;
