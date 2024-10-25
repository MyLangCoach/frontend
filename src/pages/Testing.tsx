import React,{useState} from 'react'
import PaystackPayment from '../components/paystack';
import Calendar from '../components/coaches-component/booking-calender';
import pic from "../assets/png/pic.png"; 
import { CoachDetails } from '../util/types';
import ReUseModal from '../components/modal/Modal';

const item : CoachDetails = {
  bio: "shas",
  profileImage: pic,
  id: 0,
  email: 'dano@email.com',
  firstName: 'daniel',
  lastName: '',
  username: null,
  gender: null,
  slug: null,
  description: '',
  role: '',
  country: '',
  socials: [],
  languages: [],
  emailVerified: false,
  accountSetupCompleted: false,
  lastSignin: '',
  languageInterests: [],
  status: '',
  qualifications: [],
  introVideo: '',

  createdAt: '',
  updatedAt: '',
  costPerSession: { amount: 200,
  currency: "",
  sessionType: 4,}
}

const Testing = () => {
  const [openModal, setOpenModal] = useState(true);
  const [open, setOpen] = useState(true);
  return (
    <div>
      <h2>
        THIS IS TESTING 
      </h2>
      <div className="w-full flex  gap-8 flex-col p-8">

      <input type="date" className='w-[200px]' />
      <input type="time" className='w-[200px]' />
      </div>
      <div>
        {/* <h1>Paystack Payment Integration</h1>
        <PaystackPayment /> */}
      </div>
     
    </div>
  );
}

export default Testing
