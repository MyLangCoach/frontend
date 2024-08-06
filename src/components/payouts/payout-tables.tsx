import { useState } from 'react';
import TransactionsTable from './transactions-table';
import PaymentHistoryTable from './payment-history-table';

const PayoutTables = () => {
  const [current, setCurrent] = useState(0);

  return (
    <div className="w-full flex flex-col mt-10">
      {/* tabs session */}
      <div className="w-full flex gap-4 items-center justify-between lg:justify-start px-4 lg:px-0 mb-4">
     
        <div
          className={
            current === 0
              ? "bg-white flex items-center justify-center h-[28px] text-[#09090B] text-sm font-medium lg:min-w-[152px]  cursor-pointer inter  "
              : "text-muted flex items-center justify-center h-[28px] cursor-pointer font-medium inter lg:min-w-[152px]  "
          }
          onClick={() => setCurrent(0)}
        >
          Transactions 
        </div>
        <div
          className={
            current === 1
              ? "bg-white flex items-center justify-center h-[28px] text-[#09090B] text-sm font-medium lg:min-w-[152px]  cursor-pointer inter  "
              : "text-muted flex items-center justify-center h-[28px] cursor-pointer font-medium inter lg:min-w-[152px]  "
          }
          onClick={() => setCurrent(1)}
        >
          Payment History
        </div>
      </div>

          {/* end of tabs session */}
          {current === 0 && <TransactionsTable />}
          {current === 1 && <PaymentHistoryTable />}
    </div>
  );
}

export default PayoutTables
