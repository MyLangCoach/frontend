import { useState } from "react";
import { CancelIcon, Plus, PlusCircle } from "../../assets";
import filterIcon from "../../assets/png/caret-sort.png";
import { transactionDummy } from "../../util/mockdata";

const TransactionsTable = () => {
 
  return (
    <div className="w-full bg-white py-6 px-3 flex flex-col">
      <h1 className="text-black font-bold  red-hat text-base lg:text-[19px]">
        Transactions
      </h1>
      <div className="w-full flex items-center mt-2 gap-3">
        {/* input */}
        <div className="w-4/12 max-w-[200px]">
          <input
            type="text"
            className="lg:min-w-[200px] h-[36px] outline-none flex items-center px-3 rounded-md border-[#E4E4E7] border input-shadow w-full placeholder:text-muted text-sm inter  "
            placeholder="Filter Classes"
          />
        </div>
        {/* end of input */}

        {/* duration */}
        <div className="w-fit  h-[36px] flex items-center rounded-md border-dotted border border-[#E4E4E7] px-3 justify-center gap-2 ">
          <div className="flex items-center gap-3 border-r border-r-[#e4e4e7] pr-3">
            <span>
              <PlusCircle />
            </span>
            <p className="text-sm font-medium inter text-[#18181B] ">
              Duration
            </p>
          </div>
          <div className="flex bg-[#F4F4F5] px-1 py-[2px] rounded-sm gap-[10px] text-xs text-[#09090B] ">
            3 Selected
          </div>
        </div>
        {/* end of duration */}
        {/* reset */}
        <div className="w-fit px-4 gap-3 flex items-center h-[36px] justify-center cursor-pointer">
          <span className="text-foreground text-sm inter font-medium">
            Reset
          </span>
          <CancelIcon />
        </div>
        {/* end reset */}
        {/* new service */}
    
        {/* end of new service */}
      </div>
      <div className="w-full mt-5">
        <table className="w-full border border-border rounded-[4px]">
          <th className="w-full grid grid-cols-5 h-[40px] border-b border-b-border px-2 ">
            <td className="flex items-center gap-3 w-full ">
              <input
                type="checkbox"
                name=""
                id=""
                className="accent-black  w-4 h-4 rounded-md "
              />
              <p className="text-muted text-sm inter font-medium">Date</p>
            </td>
            <td className="flex items-center gap-3 w-full ">
              <p className="text-muted text-sm inter font-medium">Status</p>
              <span>
                <img src={filterIcon} alt="filter" />
              </span>
            </td>
            <td className=" flex items-center gap-3 w-full">
              <p className="text-muted text-sm inter font-medium">Fees</p>
              <span>
                <img src={filterIcon} alt="filter" />
              </span>
            </td>
            <td className=" flex items-center gap-3 w-full">
              <p className="text-muted text-sm inter font-medium">Charges</p>
              <span>
                <img src={filterIcon} alt="filter" />
              </span>
            </td>
            <td className=" flex items-center gap-3 w-full">
              <p className="text-muted text-sm inter font-medium">Total</p>
              <span>
                <img src={filterIcon} alt="filter" />
              </span>
            </td>
          </th>
          <tbody className="w-full flex flex-col">
            {transactionDummy?.map((item, index) => {
              return (
                <tr
                  key={index}
                  className="grid grid-cols-5 px-2 border-b-border border-b last:border-none min-h-[68px] "
                >
                  <td className="w-full flex items-center gap-3">
                    <span>
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        className="accent-black  w-4 h-4 rounded-md "
                      />
                    </span>
                    <div className="flex flex-col gap-[10px]">
                      <h1 className="text-foreground font-normal text-sm truncate inter">
                        {item?.date}
                      </h1>
                    </div>
                  </td>
                  <td className="w-full flex items-center">
                    <p
                      className={`text-foreground capitalize font-normal text-sm truncate inter ${
                        item?.status === "pending"
                          ? "px-[6px] py-[2px] bg-[#FEEDD0]"
                          : "px-[6px] py-[2px] bg-[#D0FEE0]"
                      }`}
                    >
                      {item?.status}
                    </p>
                  </td>
                  <td className="w-full flex items-center gap-[10px] ">
                    <p className="text-foreground font-normal text-sm truncate inter">
                      {item?.fees}
                    </p>
                  </td>
                  <td className="flex items-center">
                    <p className=" text-[#EB5757] font-normal text-sm truncate inter ">
                      {item?.charges}
                    </p>
                  </td>
                  <td className="flex items-center">
                    <p className=" text-foreground font-normal text-sm truncate inter ">
                      {item?.total}
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
  
    </div>
  );
};

export default TransactionsTable;
