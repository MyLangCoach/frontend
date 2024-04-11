import { useState } from "react"
import DashboardLayout from "../../layouts/DashboardLayout"
import { NotificationIcon } from "../../assets";
import CallLogs from "../../components/home/call-logs";
import OfferingsTable from "../../components/live-classes/offerings-table";
import Tips from "../../components/live-classes/tips-tricks";

const LiveClasses = () => {
  return (
    <DashboardLayout current={2}>
      <div className="w-full flex flex-col">
        <div className="w-full flex items-center justify-between lg:mt-6">
          <p className="text-lg font-bold lg:text-2xl ">Live Classes</p>
          <span className="">
            <NotificationIcon />
          </span>
        </div>
        <div className="w-full flex flex-col lg:flex-row gap-5">
          {/* start of left side */}
          <div className="w-full lg:w-2/3 flex flex-col gap-6">
            <CallLogs />
           <OfferingsTable />
          </div>
          {/* end of the left side */}
          {/* right side */}
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
         <Tips />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default LiveClasses
