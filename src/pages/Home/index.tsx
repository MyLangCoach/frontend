import React from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { NotificationIcon } from "../../assets";
import classIcon from "../../assets/icons/class.svg";
import expenseIcon from "../../assets/icons/expense.svg";
import tutorIcon from "../../assets/icons/tutors.svg";
import Overview from "../../components/home/overview";
import CallLogs from "../../components/home/call-logs";
import GuideTour from "../../components/home/guide-tour";
import UpcomingEvents from "../../components/home/upcoming-event";
import TopCoaches from "../../components/home/top-coaches";
const index = () => {
  return (
    <DashboardLayout current={1}>
      <div className="w-full flex flex-col">
        <div className="w-full flex items-center justify-between lg:mt-6">
          <p className="text-lg font-bold lg:text-2xl ">
            Daniella, welcome back
          </p>
          <span className="">
            <NotificationIcon />
          </span>
        </div>
        <Overview />
        <div className="w-full flex flex-col lg:flex-row gap-5">
          {/* start of left side */}
          <div className="w-full lg:w-2/3">
            <CallLogs />
            <GuideTour />
          </div>
          {/* end of the left side */}
          {/* right side */}
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            <UpcomingEvents />
            <TopCoaches />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default index;
