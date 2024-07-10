import React from 'react'
import logo from "../../assets/icons/lang-logo.svg"
import msg from "../../assets/icons/verify-box.svg"
import { Button } from '../../components/Button';
import { useNavigate } from 'react-router-dom';
const VerifyEmailSuccess = () => {
    const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen h-full flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full sm:w-[441px] flex flex-col bg-white verify-shadow p-6 sm:p-12 rounded-lg">
        <span className=" w-full">
          <img src={logo} alt="logo" className="w-[105px] h-auto" />
        </span>
        <span className="mx-auto w-fit mt-16 mb-6">
          <img src={msg} alt="logo" className="w-[72px] h-auto" />
        </span>
        <h2 className="text-2xl sm:text-[32px] red-hat font-bold text-center mb-6 sm:leading-[39px]">
          Your email has been verified!
        </h2>

        <p className="text-gray-600 text-center mb-12 dm-sans sm:text-lg">
          Your email has been successfully verified! Click on login to continue.
        </p>

        {/* <button className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition duration-200">
          Go to Login
        </button> */}
              <Button name='Go back to login' height='h-[55px] ' className='min-w-full' onClick={() => navigate("/login")}  />
      </div>
    </div>
  );
}

export default VerifyEmailSuccess
