import React from "react";
import withdraw from "../../assets/png/withdraw.png"

const PayoutOverview = () => {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-3 mt-8 lg:gap-4 gap-4 px-4 lg:px-0 ">
      {/* start of a pack */}
      <div className="w-full bg-white pattern-bg flex  flex-col p-6 rounded-[6px] gap-3">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-black red-had font-semibold text-sm lg:text-base">
            Previous Payout
          </h1>
          <p className="text-sm lg:text-base red-hat text-black font-normal">
            12 Mar, 2023
          </p>
        </div>
        <p className="font-bold text-black lg:text-[23px] text-lg leading-[27px]font-bold">
          $111,000
        </p>
      </div>
      {/* end of a session */}
      {/* start of a pack */}
      <div className="w-full bg-white pattern-bg flex  flex-col p-6 rounded-[6px] gap-3">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-black red-had font-semibold text-sm lg:text-base">
            Next Payout
          </h1>
          <p className="text-sm lg:text-base red-hat text-black font-normal">
            12 Mar, 2023
          </p>
        </div>
        <p className="font-bold text-black lg:text-[23px] text-lg leading-[27px]font-bold">
          $200,000
        </p>
      </div>
      {/* end of a session */}

      {/* start of a pack */}
      <div className="w-full bg-black pattern-bg flex flex-col justify-between py-4 px-6 rounded-[6px]  ">
        <div className="flex items-center justify-between">
          <h1 className="text-white red-had font-bold text-lg lg:text-2xl">
            $5,000
          </h1>
          <p className="text-sm lg:text-base red-hat text-white font-normal">
            Est. 12 Mar, 2024
          </p>
        </div>
        <div className="flex items-center justify-between -mt-3">
          <p className="font-bold text-white lg:text-[23px] text-lg leading-[27px]font-bold">
            $200,000
          </p>
          <span>
            <img src={withdraw} alt="witdraw" />
          </span>
        </div>
      </div>
      {/* end of a session */}
    </div>
  );
};

export default PayoutOverview;
