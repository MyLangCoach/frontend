import React from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import { NotificationIcon } from '../../assets';

import PayoutOverview from '../../components/payouts/payout-overview';
import PayoutTables from '../../components/payouts/payout-tables';

const Payouts = () => {
  return (
    <DashboardLayout current={7}>
      <div className="w-full flex flex-col">
        <div className="w-full flex items-center justify-between lg:mt-6">
          <p className="text-lg font-bold lg:text-2xl ">
            Payouts
          </p>
          <span className="">
            <NotificationIcon />
          </span>
        </div>
        <PayoutOverview />
        <div className="w-full flex flex-col lg:flex-row gap-5">
         <PayoutTables />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Payouts
