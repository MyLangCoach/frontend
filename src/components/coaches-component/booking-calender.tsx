import React, { SetStateAction, useState } from "react";
import {
  format,
  addWeeks,
  subWeeks,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
} from "date-fns";
import { CoachDetails } from "../../util/types";
import { CancelX, NextIcon, PrevIcon, VerifyIcon } from "../../assets";
import ar from "../../assets/png/ar.png";
import pic from "../../assets/png/pic.png"; 
import { Button, OutlineBtn } from "../Button";
import { useNavigate } from "react-router-dom";

interface CalendarProps {
    note: string;
    item: CoachDetails
    setOpen:React.Dispatch<SetStateAction<boolean>>
}

const Calendar: React.FC<CalendarProps> = ({ note, item, setOpen }) => {
  const navigate = useNavigate();
      const {
        bio,
        profileImage,
        costPerSession,
        languages,
        id,
        firstName,
        lastName,
    }: CoachDetails = item;
      const selectedLanguage = languages?.[0];
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [duration, setDuration] = useState(30); // 30 minutes or 60 minutes
  const startOfCurrentWeek = startOfWeek(currentWeek, { weekStartsOn: 1 });
  const endOfCurrentWeek = endOfWeek(currentWeek, { weekStartsOn: 1 });
  const daysOfWeek = eachDayOfInterval({
    start: startOfCurrentWeek,
    end: endOfCurrentWeek,
  });

  const times = (interval: number) => {
    const start = new Date(currentWeek.setHours(8, 0, 0, 0));
    const end = new Date(currentWeek.setHours(20, 0, 0, 0));
    const timeSlots = [];

    while (start <= end) {
      timeSlots.push(new Date(start));
      start.setMinutes(start.getMinutes() + interval);
    }

    return timeSlots;
  };

  const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(Number(event.target.value));
  };

  const handleWeekChange = (direction: "prev" | "next") => {
    setCurrentWeek(
      direction === "next" ? addWeeks(currentWeek, 1) : subWeeks(currentWeek, 1)
    );
  };

  const handleTimeClick = (time: Date) => {
    const bookTime = time.toISOString();
    const payload = { note, bookTime };
    console.log(payload);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="w-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl red-hat font-bold">Book a session</h2>
          <span className="cursor-point" onClick={() => setOpen(false)}>
            <CancelX />
          </span>
        </div>
        <div className="flex items-start gap-3 pb-3 border-b-border1 border-b">
          <div>
            <img
              src={profileImage ?? pic}
              alt=""
              className="w-9 h-9 rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="flex items-center gap-[10px]">
              <p className="font-bold red-hat capitalize">
                {" "}
                {firstName} {lastName}
              </p>
              <img src={ar} alt="ar" />
              <span>
                <VerifyIcon />
              </span>
            </span>
            <p className="text-sm text-subTopic dm-sans">
              {" "}
              {selectedLanguage?.language ?? ""} Tutor
            </p>
          </div>
        </div>
        <div className="flex gap-6 mt-6 mb-6">
          <p className="text-sm lg:text-base font-bold red-hat ">Choose time</p>
          <label className="flex items-center">
            <input
              type="radio"
              name="duration"
              value={30}
              checked={duration === 30}
              onChange={handleDurationChange}
              className="mr-2 accent-black w-5 h-5"
            />
            30 mins
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="duration"
              value={60}
              checked={duration === 60}
              onChange={handleDurationChange}
              className="mr-2 accent-black w-5 h-5"
            />
            60 mins
          </label>
        </div>
      </div>
      <div className="flex flex-col mb-4 w-full border-border border rounded-[6px] p-3">
        <div className="flex items-center justify-between ">
          <span onClick={() => handleWeekChange("prev")}>
            <PrevIcon />
          </span>
          <p className="font-semibold">
            {format(startOfCurrentWeek, "MMMM d")} -{" "}
            {format(endOfCurrentWeek, "MMMM d")}
          </p>
          <span onClick={() => handleWeekChange("next")}>
            <NextIcon />
          </span>
        </div>
        <div className=" mt-6 max-h-[428px] flow-hide">
          <div className="flex justify-center ">
            {daysOfWeek.map((day) => (
              <div key={day.toISOString()} className="text-center mx-2">
                <h3 className="font-semibold mb-2 text-sm">
                  {format(day, "EEEE").substring(0, 3)}
                </h3>
                {times(duration).map((time) => (
                  <button
                    key={time.toISOString()}
                    onClick={() => handleTimeClick(time)}
                    className="block underline mb-2 red-hat font-bold  text-black text-sm"
                  >
                    {format(time, "HH:mm")}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between w-full gap-3">
        <OutlineBtn
          name="Cancel"
          onClick={() => setOpen(false)}
                  height="h-[49px]"
                  className="flex-grow"
        />
        <Button name="Continue to payment" height="h-[49px]" className="flex-grow" onClick={() => navigate("/payment")} />
      </div>
    </div>
  );
};

export default Calendar;
