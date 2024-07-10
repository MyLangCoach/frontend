import { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { NotificationIcon } from "../../assets";
import CallLogs from "../../components/home/call-logs";
import OfferingsTable from "../../components/live-classes/offerings-table";
import Tips from "../../components/live-classes/tips-tricks";
import StudentCallLogs from "../../components/home/student-call-logs";
import StudentOfferingsTable from "../../components/live-classes/student-offerings-table";

const StudentLiveClasses = () => {
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
          <div className="w-full 2xl:w-10/12 flex flex-col gap-6">
            <StudentCallLogs />
            <StudentOfferingsTable />
          </div>
          {/* end of the left side */}
          {/* right side */}
          <div className="w-full 2xl:w-2/12  flex-col gap-6 hidden 2xl:flex">
            <Tips />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentLiveClasses;
