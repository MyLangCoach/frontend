import React,{useState} from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { NotificationIcon } from "../../assets";
import { current } from "@reduxjs/toolkit";
import AccountSettings from "../../components/settings/account-settings";



const SettingsPage = () => {
    const [present, setPresent] = useState(0);

  return (
    <DashboardLayout current={8}>
      <div className="w-full flex flex-col">
        <div className="w-full flex items-center justify-between lg:mt-6">
          <p className="text-lg font-bold lg:text-2xl ">Settings Page</p>
          <span className="">
            <NotificationIcon />
          </span>
              </div>
              <div className="w-full flex items-start lg:flex-row flex-col mt-8">
                  <div className="w-full lg:w-3/12 flex flex-col">
                      <button className={`h-[36px] min-w-[140px] cursor-pointer flex items-center w-fit rounded-[6px] p-2 gap-2  ${present === 0 ? "bg-white" : "bg-transparent"}`}>
                          Account Settings
                      </button>
                      <button className={`h-[36px] min-w-[140px] cursor-pointer flex items-center rounded-[6px] p-2 gap-2 w-fit  ${present === 1 ? "bg-white" : "bg-transparent"}`}>
                          Calender
                      </button>
                      <button className={`h-[36px] min-w-[140px] cursor-pointer w-fit flex items-center rounded-[6px] p-2 gap-2  ${present === 2 ? "bg-white" : "bg-transparent"}`}>
                          Notification
                      </button>
                  </div>
                  <div className="w-full lg:w-9/12">
                      {present === 0 && <AccountSettings />}
                  </div>
              </div>
       
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
