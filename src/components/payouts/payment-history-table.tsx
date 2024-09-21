import filterIcon from "../../assets/png/caret-sort.png";
import { useAppSelector } from "../../app/hooks";
import { formatDateTime } from "../../util";

const PaymentHistoryTable = () => {
   const payment = useAppSelector((state) => state.payment);
  const transactions = payment?.allUserTransactions;
  const filteredTransactions = transactions?.filter((item: any) => item?.note === "Earning withdrawal");
 
  return (
    <div className="w-full bg-white py-6 px-3 flex flex-col">
      <h1 className="text-black font-bold  red-hat text-base lg:text-[19px]">
        Payment history
      </h1>
      <div className="w-full flex items-center mt-2 gap-3">
        {/* input */}
        <div className="w-4/12 max-w-[200px]">
          <input
            type="text"
            className="lg:min-w-[200px] h-[36px] outline-none flex items-center px-3 rounded-md border-[#E4E4E7] border input-shadow w-full placeholder:text-muted text-sm inter  "
            placeholder="Filter Transaction"
          />
        </div>
        {/* end of input */}

        {/* duration */}

        {/* end of duration */}
        {/* reset */}

        {/* new service */}

        {/* end of new service */}
      </div>
      <div className="w-full mt-5">
        <table className="w-full border border-border rounded-[4px]">
          <th className="w-full flex items-center h-[40px] border-b border-b-border px-2 gap-2 ">
            <td className="flex items-center gap-3 w-1/6 ">
              <input
                type="checkbox"
                name=""
                id=""
                className="accent-black  w-4 h-4 rounded-md "
              />
              <p className="text-muted text-sm inter font-medium">Date</p>
            </td>
            <td className="flex items-center gap-3 w-1/6 ">
              <p className="text-muted text-sm inter font-medium">Status</p>
              <span>
                <img src={filterIcon} alt="filter" />
              </span>
            </td>
            <td className=" flex items-center gap-3 w-2/6">
              <p className="text-muted text-sm inter font-medium">Narration</p>
              <span>
                <img src={filterIcon} alt="filter" />
              </span>
            </td>
            <td className=" flex items-center gap-3 w-1/6">
              <p className="text-muted text-sm inter font-medium">
                Payment Type
              </p>
              <span>
                <img src={filterIcon} alt="filter" />
              </span>
            </td>
            <td className=" flex items-center gap-3 w-1/6">
              <p className="text-muted text-sm inter font-medium">Amount</p>
              <span>
                <img src={filterIcon} alt="filter" />
              </span>
            </td>
          </th>
          <tbody className="w-full flex flex-col">
            {filteredTransactions?.map((item: any, index: number) => {
              return (
                <tr
                  key={index}
                  className=" flex items-center gap-2 px-2 border-b-border border-b last:border-none min-h-[68px] "
                >
                  <td className="w-1/6 flex items-center gap-3">
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
                        {formatDateTime(item?.updatedAt)?.date}
                      </h1>
                    </div>
                  </td>
                  <td className="w-1/6 flex items-center">
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
                  <td className="w-2/6 flex items-center  ">
                    <p className="text-foreground font-normal text-sm truncate inter">
                      {item?.note}
                    </p>
                  </td>
                  <td className="flex items-center w-1/6 ">
                    <p className=" text-[#EB5757] font-normal text-sm truncate inter ">
                      {item?.type}
                    </p>
                  </td>
                  <td className="w-1/6 flex items-center">
                    <p className=" text-foreground font-normal text-sm truncate inter ">
                      ₦ {item?.amount}
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

export default PaymentHistoryTable;
