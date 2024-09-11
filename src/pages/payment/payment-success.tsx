import React from "react";
import logo from "../../assets/icons/lang-logo.svg";
import msg from "../../assets/png/success-gif.gif";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
const PaymentSuccess = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen h-full flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full sm:w-[441px] flex flex-col bg-white verify-shadow p-6 sm:p-12 rounded-lg">
        <span className=" w-full my-6">
          <img src={logo} alt="logo" className="w-[150px] h-auto" />
        </span>
        <span className="mx-auto w-fit ">
          <img src={msg} alt="logo" className="w-[120px] h-auto" />
        </span>
        <h2 className="text-2xl sm:text-[32px] red-hat font-bold text-center mb-6 sm:leading-[39px]">
          Payment successful!
        </h2>

        <p className="text-gray-600 text-center mb-12 dm-sans sm:text-lg">
          Your payment is successful ! Click on Proceed to continue.
        </p>

        <Button
          name="Proceed "
          height="h-[55px] "
          className="min-w-full"
            onClick={() => navigate("/login")}
        />
      </div>
    </div>
  );
};

export default PaymentSuccess;
