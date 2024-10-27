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
    <div className="gap-4 flex items-center">
      <label>Date:</label>
      <input
        type="date"
        className="border border-black p-2"
        value={date}
        onChange={handleDateChange}
      />
      <label>Time:</label>
      <input
        type="time"

        value={time}
      
        className="border border-black p-2"
        onChange={handleTimeChange}
      />
    </div>
  );
}

export default Testing
