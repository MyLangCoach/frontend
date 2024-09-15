import React from "react";
import { BlueCalenderIcon, BlueTimeIcon } from "../../assets";
import { formatDateTime, openInNewTab } from "../../util";
import { Button } from "../Button";

const CoachSessionCard = ({ item, index }: { item: any; index: number }) => {
  return (
    <div
      className="flex flex-col gap-2 border-border border  rounded-[4px]"
      key={index}
    >
      <div className="w-full min-h-[76px] flex lg:px-6 items-center gap-3 border-b border-b-border  ">
        <p className="red-hat text-foreground font-bold text-[23px] ">
          {item.note}
        </p>
        <span className="bg-[#FABC4E] px-[6px] h-7 flex items-center rounded-[4px] text-white min-w-fit">
          1:1 class
        </span>
      </div>
      <div className="w-full flex flex-col lg:px-6 pb-6">
        <div className="w-full mt-3 flex flex-wrap gap-6 items-center">
          <span className="flex items-center gap-[10px] w-2/12 min-w-fit ">
            <p className="text-muted text-sm dm-sans min-w-fit"> Name</p>
            <p className="text-sm dm-sans font-bold text-muted min-w-fit ">
              {item?.student.firstName ?? ""} {item?.student?.lastName ?? ""}
            </p>
          </span>
          <span className="flex items-center gap-[10px] w-2/12 min-w-fit ">
            <p className="text-muted text-sm dm-sans">Status</p>
            <p className="text-sm dm-sans font-bold text-muted">
              {item.status}
            </p>
          </span>
          <span className="flex items-center gap-[10px]  w-2/12 min-w-fit">
            <p className="text-muted text-sm dm-sans">Type</p>
            <p className="text-sm dm-sans font-bold text-muted">Session</p>
          </span>
          <span className="flex items-center gap-[10px]  min-w-fit ">
            <BlueCalenderIcon />
            <p className="text-sm dm-sans font-medium text-muted">
              {formatDateTime(item?.startDateTime)?.date}
            </p>
          </span>
          <span className="flex items-center gap-[10px]   min-w-fit">
            <BlueTimeIcon />
            <p className="text-sm dm-sans font-medium text-muted">
              {formatDateTime(item?.startDateTime)?.time}
            </p>
          </span>
        </div>
        {item?.meetingLink ? (
          <div className="w mt-7">
            <Button
              name="Join Session"
              onClick={() => openInNewTab(item.meetingLink)}
            />
          </div>
        ) : (
          <div className="w mt-7">
            <Button name="Waiting for payment" />
          </div>
        )}
      </div>
    </div>
  );
};

export default CoachSessionCard;
