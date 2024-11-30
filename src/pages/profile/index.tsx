import { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import UserProfile from "../../components/profile/UserProfile";
import CoachSchedule from "../../components/profile/UserAvailability";
import { useAppSelector } from "../../app/hooks";
import CoachProfile from "../../components/profile/CoachProfile";

const Profile = () => {
    const user = useAppSelector((state) => state.auth);
  const [openProfile, setOpenProfile] = useState(true);
  const isStudent = user?.userData?.role === "STUDENT" ? true : false ;

  return (
    <DashboardLayout current={6}>
      <div className="w-full flex flex-col lg:px-4">
        {/* tabs session */}
        <div className="w-full mt-6 flex gap-4 items-center justify-between lg:justify-start px-4 lg:px-0">
          <div
            className={
              openProfile === true
                ? "bg-white flex items-center justify-center h-[28px] text-[#09090B] text-sm font-medium lg:min-w-[152px] px-6  cursor-pointer inter w-1/2 lg:w-auto "
                : "text-muted flex items-center justify-center h-[28px] cursor-pointer font-medium inter lg:min-w-[152px] px-6 w-1/2 lg:w-auto  "
            }
            onClick={() => setOpenProfile(true)}
          >
            My profile
          </div>
          {/* {!isStudent && (
            <div
              className={
                openProfile === false
                  ? "bg-white flex items-center justify-center h-[28px] text-[#09090B] px-6 text-sm font-medium lg:min-w-[152px]  cursor-pointer inter w-1/2 lg:w-auto "
                  : "text-muted flex items-center justify-center h-[28px] cursor-pointer font-medium inter lg:min-w-[152px] px-6 w-1/2 lg:w-auto "
              }
              onClick={() => setOpenProfile(false)}
            >
              My availability
            </div>
          )} */}
        </div>

        {/* end of tabs session */}
        {openProfile && isStudent && <UserProfile />}
        {openProfile && !isStudent && <CoachProfile />}
        {!openProfile && !isStudent && <CoachSchedule />}
      </div>
    </DashboardLayout>
  );
};

export default Profile;
