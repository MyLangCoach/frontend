import { useState } from "react";
import ContainerLayout from "../../layouts/ContainerLayout";
import logo from "../../assets/png/lang-logo.png";
import PrimarySelect from "../../components/Selects/PrimarySelect";
import pic from "../../assets/png/pic.png";
import { StopWatch, VerifyIcon } from "../../assets";
import ar from "../../assets/png/ar.png";
import calenderClock from "../../assets/icons/calendar-clock.svg";
import { Input } from "../../components/Input";
import pay from "../../assets/png/paystack.png";
import flutter from "../../assets/png/flutterwave.png";
import PaystackPayment from "../../components/paystack";

const PaymentPage = () => {
  const [selectedLang, setSelectedLang] = useState<any>({});
  return (
    <ContainerLayout>
      <div className="w-full flex flex-col  min-h-screen h-full">
        <div className="w-full justify-between mt-12 items-start flex">
          <div className="">
            <img src={logo} alt="logo" className="w-[193px] h-auto" />
          </div>
          <span>
            <PrimarySelect
              label={""}
              selected={selectedLang}
              setSelected={setSelectedLang}
              data={undefined}
              name="English"
            />
          </span>
        </div>
        <div className="w-full mx-auto  grid grid-cols-1 lg:grid-cols-2 lg:max-w-[768px] mt-12  ">
          {/* left side */}
          <div className="w-full flex flex-col rounded-[6px] border-border border p-3 lg:p-6">
            {/* head session */}
            <div className="flex items-start gap-3 pb-3 border-b-border1 border-b">
              <div>
                <img
                  src={pic}
                  alt=""
                  className="w-[56px] h-[56px] rounded-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="flex items-center gap-[10px]">
                  <p className="font-bold red-hat capitalize"> Gabriel H.</p>
                  <img src={ar} alt="ar" />
                  <span>
                    <VerifyIcon />
                  </span>
                </span>
                <p className="text-sm text-subTopic dm-sans"> English coach</p>
              </div>
            </div>
            {/* end of head session */}
            {/* duration sesc */}
            <div className="w-full flex justify-between items-center mt-6 pb-6 border-b border-b-border">
              <h2 className="text-sm lg:text-base font-bold red-hat">
                Time/ duration
              </h2>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name=""
                  id=""
                  checked
                  className="accent-black w-5 h-5 "
                />
                <p className="text-sm lg:text-base font-medium inter">30 min</p>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name=""
                  id=""
                  className="accent-black w-5 h-5 "
                />
                <p className="text-sm lg:text-base font-medium inter">60 min</p>
              </div>
            </div>
            {/* end of duration sec */}
            <div className="w-full mt-6 flex pb-6 border-b border-b-border items-start gap-4">
              <span className="">
                <img src={calenderClock} alt="cel" />
              </span>

              <div className="flex flex-col">
                <p className="text-sm lg:text-base red-hat font-medium">
                  Saturday, 27 January at 04:00 pm
                </p>
                <p className="text-sm text-muted">
                  Time is based on your location
                </p>
              </div>
            </div>
            {/* end of timing */}

            {/* start of order */}
            <div className="w-full mt-6 pb-6 border-b border-b-border flex flex-col gap-3">
              <h1 className="text-base lg:text-xl font-bold red-hat">
                Your Order
              </h1>
              <div className="w-full flex items-center justify-between">
                <p className="text-muted red-hat">30-mins</p>
                <p className="text-sm lg:text-base font-bold red-hat">
                  #13,000.00
                </p>
              </div>
              <div className="w-full flex items-center justify-between">
                <p className="text-muted red-hat">Processing</p>
                <p className="text-sm lg:text-base font-bold red-hat">
                  #130.00
                </p>
              </div>
            </div>

            {/* end of order */}
            {/* start of total */}
            <div className="w-full flex flex-col mt-6">
              <div className="w-full flex items-center justify-between">
                <p className="text-muted red-hat">Total</p>
                <p className="text-sm lg:text-base font-bold red-hat">
                  #13,100.00
                </p>
              </div>
              <p className="red-hat text-sm lg:text-base font-medium mt-6 mb-3">
                Have a promo code?{" "}
                <span className="text-sm text-muted ml-1">(optional)</span>
              </p>
              <Input
                label={""}
                value={undefined}
                setValue={undefined}
                placeholder="Enter Promo code"
                height="h-[36px]"
              />
            </div>
            {/* end of total */}
          </div>
          {/* right side */}
          <div className="w-full lg:p-6 flex flex-col">
            <h1 className="text-xl font-bold red-hat mb-6">Pay with</h1>
            <div className="w-full h-[56px] flex items-center bg-[#F4F4F5] rounded-[8px] mb-2 px-6 gap-2">
              <span className="">
                <input
                  type="radio"
                  name=""
                  id=""
                  checked
                  className="w-4 h-4 accent-black"
                />
              </span>
              <img src={pay} alt="" />
              <p className="red-hat font-medium text-sm lg:text-base ">
                Paystack
              </p>
            </div>
            <div className="w-full h-[56px] flex items-center bg-[#F4F4F5] rounded-[8px] mb-2 px-6 gap-2">
              <span className="">
                <input
                  type="radio"
                  name=""
                  id=""
                  className="w-4 h-4 accent-black"
                />
              </span>
              <img src={flutter} alt="" />
              <p className="red-hat font-medium text-sm lg:text-base ">
                FlutterWave{" "}
                <span className="text-muted text-xs">(Coming Soon)</span>
              </p>
            </div>
            <div className="w-full h-[56px] flex items-center bg-[#F4F4F5] rounded-[8px] mb-2 px-6 gap-2">
              <span className="">
                <input
                  type="radio"
                  name=""
                  id=""
                  className="w-4 h-4 accent-black"
                />
              </span>
              <img src={flutter} alt="" />
              <p className="red-hat font-medium text-sm lg:text-base ">
                Stripe <span className="text-muted text-xs">(Coming Soon)</span>
              </p>
            </div>
            <PaystackPayment />
          </div>
        </div>
      </div>
    </ContainerLayout>
  );
};

export default PaymentPage;
