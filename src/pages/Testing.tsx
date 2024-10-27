import React,{useState} from 'react'
import PaystackPayment from '../components/paystack';
import Calendar from '../components/coaches-component/booking-calender';
import pic from "../assets/png/pic.png"; 
import { CoachDetails } from '../util/types';
import ReUseModal from '../components/modal/Modal';



const Testing = () => {
const [dateTime, setDateTime] = useState("");
  return (
    <div className='p-4'>
      <h2>THIS IS TESTING</h2>

      <div className='flex flex-col gap-4'>
        <h1>Select Date and Time</h1>
        <DateTimeInput onChange={setDateTime} />
        <p>Selected DateTime: {dateTime}</p>
      </div>
    </div>
  );
}



function DateTimeInput({ onChange } :any) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleDateChange = (e:any) => {
    setDate(e.target.value);
    onChange(`${e.target.value}T${time}`);
  };

  const handleTimeChange = (e:any) => {
    setTime(e.target.value);
    onChange(`${date}T${e.target.value}`);
  };

  return (
    <div className="gap-6 md:flex-row flex-col  flex md:items-center">
      <div className="flex items-center gap-3">

      <label className="red-hat text-base">Date:</label>
      <input
        type="date"
        className="border rounded-[5px]  border-border p-2 h-9"
        value={date}
        onChange={handleDateChange}
        />
      </div>
      <div className="flex items-center gap-3">

      <label>Time:</label>
      <input
        type="time"
        value={time}
        className="border rounded-[5px] p-2 border-border h-9"
        onChange={handleTimeChange}
        />
        </div>
    </div>
  );
}

export default Testing
