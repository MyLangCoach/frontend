import React, { useEffect } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import { NotificationIcon } from '../../assets';

import PayoutOverview from '../../components/payouts/payout-overview';
import PayoutTables from '../../components/payouts/payout-tables';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import BankCard from '../../components/payouts/bank-card';
import { getAllUserTransactions } from '../../features/paymentslice';

const Payouts = () => {
  const user = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const userRole = user?.userData?.role;
  useEffect(() => {
    dispatch(getAllUserTransactions());
  }, [])
  
  return (
    <DashboardLayout current={7}>
      <div className="w-full flex flex-col">
        <div className="w-full flex items-center justify-between lg:mt-6 px-4 lg:px-0 mt-4 ">
          <p className="text-lg font-bold lg:text-2xl ">
            {userRole === "COACH" ? "Payouts" : "Expenditure"}
            
          </p>
          <span className="">
            <NotificationIcon />
          </span>
        </div>
        {userRole === "COACH" && <BankCard />}
        <PayoutOverview />
        <div className="w-full flex flex-col lg:flex-row gap-5">
          <PayoutTables />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Payouts
