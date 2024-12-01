import React, { SetStateAction, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { CoachDetails } from "../../util/types";
import { CancelX, NextIcon, PrevIcon, VerifyIcon } from "../../assets";
import ar from "../../assets/png/ar.png";
import pic from "../../assets/png/pic.png";
import { Button, OutlineBtn } from "../Button";
import { store } from "../../app/store";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment-timezone";
import { Input } from "../Input";
import {
  createFirstBookingWithCoach,
  getAvailability,
  restoreDefault,
} from "../../features/offeringslice";
import toast from "react-hot-toast";
import {
  payForSession,
  restoreDefault as restorer,
} from "../../features/paymentslice";
import { saveRedirectUrl } from "../../features/auth/authSlice";

interface CalendarProps {
  // note: string;
  item: CoachDetails | any;

}

const CoachSessionCalendar: React.FC<CalendarProps> = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const offering = useAppSelector((state) => state.offerings);
  const authenticated = store.getState().auth?.token;
  const handleError = (e: any) => {
    e.target.onerror = null; // Prevent looping
    e.target.src = pic;
  };
  const {
    bio,
    profileImage,
    costPerSession,
    languages,
    id,
    firstName,
    lastName,
  } = item;

  const selectedLanguage = languages?.[0];
  const urlId = useParams();
  const [note, setNote] = useState("I love to learn");
  const [selectedTime, setSelectedTime] = useState("");
  const [active, setActive] = useState(false);
  const [pickedTime, setPickedTime] = useState<string>("");
  const [pickedDay, setPickedDay] = useState<string>("");
  const [sessionId, setSessionId] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [bookingId, setBookingId] = useState<string>("");
  const [pickedDate, setPickedDate] = useState<moment.Moment | null>(null);
  const [currentWeek, setCurrentWeek] = useState(moment().tz("Africa/Lagos")); // Set the timezone to WAT
  const [isAvailable, setIsAvailable] = useState(false);
  const [duration, setDuration] = useState(30); // 30 minutes or 60 minutes
  const startOfCurrentWeek = currentWeek.clone().startOf("isoWeek");
  const endOfCurrentWeek = currentWeek.clone().endOf("isoWeek");

  const daysOfWeek = Array.from({ length: 7 }, (_, i) =>
    startOfCurrentWeek.clone().add(i, "days")
  );

  const times = (interval: number) => {
    const start = currentWeek
      .clone()
      .set({ hour: 8, minute: 0, second: 0, millisecond: 0 });
    const end = currentWeek
      .clone()
      .set({ hour: 20, minute: 0, second: 0, millisecond: 0 });
    const timeSlots = [];

    while (start <= end) {
      timeSlots.push(start.clone());
      start.add(interval, "minutes");
    }

    return timeSlots;
  };

  const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(Number(event.target.value));
  };

  const handleWeekChange = (direction: "prev" | "next") => {
    setCurrentWeek(
      direction === "next"
        ? currentWeek.clone().add(1, "weeks")
        : currentWeek.clone().subtract(1, "weeks")
    );
  };

  useEffect(() => {
    if (selectedTime && isAvailable) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [selectedTime, isAvailable]);

  useEffect(() => {
    const id = costPerSession?.find(
      (item: any) => item?.sessionType === duration
    );

    setSessionId(id?.id);
  }, [duration]);
  const handleChecKAvailability = async () => {
    setLoading(true);
    const data = {
      id: id,
      date: selectedTime,
    };
    const { payload } = await dispatch(getAvailability(data));
    if (payload?.status === "success") {
      toast.success(" Coach is Available");
      setIsAvailable(true);
      setLoading(false);
    } else {
      // toast.error("Selected time is  Not Available, kindly pick another time");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedTime) {
      handleChecKAvailability();
    }
  }, [selectedTime]);

  const handleTimeClick = (day: moment.Moment, time: moment.Moment) => {
    const selectedDateTime = day
      .clone()
      .set({
        hour: time.hour(),
        minute: time.minute(),
        second: 0,
        millisecond: 0,
      })
      .tz("Africa/Lagos");
    const bookTime = selectedDateTime.format(); // Convert to WAT and then to ISO string
    setSelectedTime(bookTime);
    setPickedTime(time.tz("Africa/Lagos").format());
    setPickedDay(day.tz("Africa/Lagos").format());
    setPickedDate(selectedDateTime);
    const payload = { note, bookTime };
  };

  const handleBook = async () => {
    if (authenticated) {
      if (active) {
        const sentdata = {
          coachId: sessionId,
          data: {
            note: note ?? "I want to learn ",
            bookTime: selectedTime,
          },
        };

        const { payload } = await dispatch(
          createFirstBookingWithCoach(sentdata)
        );
        if (payload) {
          toast.success("Booking Successful");

          dispatch(restoreDefault());
          handlePayment(payload?.data?.id);
        
        }
      } else {
        toast.error("Note and time must be provided");
      }
    } else {
      dispatch(saveRedirectUrl(`/view-coach/${urlId?.id}`));
      navigate("/login");
    }
  };

  // useEffect(() => {
  //   if (offering.createBookingSessionSuccess) {
  //     toast.success("You have successfully booked a session with the coach");
  //     dispatch(restoreDefault());
  //     setOpen(false);
  //   }
  // }, [offering?.createBookingSessionSuccess]);
  const payment = useAppSelector((state) => state.payment);

  const handlePayment = async (bookingId: any) => {
    console.log("first", bookingId);
    const data = {
      bookingId: bookingId,
      paymentMethod: "TRANSFER",
    };
    console.log({ data });
    const { payload } = await dispatch(payForSession(data));
    if (payload?.status === "success") {
      window.open(payload?.data?.authorization_url, "_blank");
    }
  };

  //  useEffect(() => {
  //    if (
  //      payment?.sessionPaymentSuccess &&
  //      payment?.sessionPaymentResp?.authorization_url
  //    ) {
  //      window.open(payment?.sessionPaymentResp?.authorization_url, "_blank");

  //        dispatch(restorer());

  //    }
  //  }, [payment?.sessionPaymentSuccess]);

  return (
    <div className="flex flex-col items-center mt-2  flow-hide">
      <div className="w-full flex flex-col">
       
      
              
        <div className="flex gap-6 mt-2 mb-2">
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
        {/* <div className="w-full mb-4">
          <Input
            label={"Add A Session Note"}
            placeholder="Enter Note..."
            value={note}
            setValue={setNote}
          />
        </div> */}
      </div>
      <div className="flex flex-col mb-4 w-full  mt-3 ">
        <div className="flex items-center justify-between ">
          <span onClick={() => handleWeekChange("prev")}>
            <PrevIcon />
          </span>
          <p className="font-semibold">
            {startOfCurrentWeek.format("MMMM D")} -{" "}
            {endOfCurrentWeek.format("MMMM D")}
          </p>
          <span onClick={() => handleWeekChange("next")}>
            <NextIcon />
          </span>
        </div>
        <div className=" mt-6  flow-hide flow-hide-x">
          <div className="flex lg:justify-center  min-w-max  ">
            {daysOfWeek.map((day) => (
              <div key={day.toISOString()} className="text-center mx-2">
                <h3 className="font-semibold mb-2 text-sm">
                  {day.format("dddd")}
                </h3>
                {times(duration).map((time) => (
                  <button
                    key={time.toISOString()}
                    onClick={() => {
                      handleTimeClick(day, time);
                      setPickedTime(time.toISOString());
                      setPickedDay(day.toISOString());
                    }}
                    className={`block underline mb-2 red-hat font-bold   text-sm ${
                      pickedTime === time?.toISOString() &&
                      pickedDay === day.toISOString()
                        ? "bg-primary text-white rounded-sm px-2 "
                        : "text-black"
                    } `}
                  >
                    {time.tz("Africa/Lagos").format("HH:mm")}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between w-full gap-3">
        {/* <OutlineBtn
          name="Cancel"
          height="h-[49px]"
          className="flex-grow"
        /> */}
            
                  
        <Button
          name={offering?.loading ? "Loading..." : "Book Now"}
          height="h-[49px]"
          className={`flex-grow ${!active && "opacity-40 cursor-not-allowed"}`}
          onClick={handleBook}
          disabled={!active}
          />
          
      </div>
    </div>
  );
};

export default CoachSessionCalendar;
