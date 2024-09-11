import React from "react";
import logo from "../../assets/icons/lang-logo.svg";
import msg from "../../assets/icons/payment-error.svg";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
const PaymentError = () => {
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
          Payment failed!
        </h2>

        <p className="text-gray-600 text-center mb-12 dm-sans sm:text-lg">
          Your payment transaction has been declined. Kindly contact your bank
          for further assistance or try again.
        </p>

        <Button
          name="Go back to login"
          height="h-[55px] "
          className="min-w-full"
            onClick={() => navigate("/login")}
        />
      </div>
    </div>
  );
};

export default PaymentError;
