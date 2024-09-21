import DashboardLayout from "../../layouts/DashboardLayout";
import { NotificationIcon } from "../../assets";
import Overview from "../../components/home/overview";
import CallLogs from "../../components/home/call-logs";
import GuideTour from "../../components/home/guide-tour";
import UpcomingEvents from "../../components/home/upcoming-event";
import TopCoaches from "../../components/home/top-coaches";
import { useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import StudentCallLogs from "../../components/home/student-call-logs";
import toast from "react-hot-toast";
const Home = () => {
  const user = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.token?.length === 0) {
      navigate("/login")
    }
  }, [])
    const userRole = user?.userData?.role;
   useEffect(() => {
     if (userRole === "STUDENT" && user?.redirectUrl) {
       navigate(user?.redirectUrl);
     }
     if ( userRole === "COACH" && user?.userData?.costPerSession === null ) {
       toast.success("Please complete your profile");
       navigate("/profile")
     }
   }, [user?.redirectUrl, navigate]);

  
  return (
    <DashboardLayout current={1}>
      <div className="w-full flex flex-col">
        <div className="w-full flex items-center justify-between lg:mt-6">
          <p className="text-lg font-bold lg:text-2xl ">
            {user?.userData?.firstName + " " + user?.userData?.lastName} ,
            welcome back
          </p>
          <span className="">
            <NotificationIcon />
          </span>
        </div>
        <Overview />
        <div className="w-full flex flex-col lg:flex-row gap-5">
          {/* start of left side */}
          <div className="w-full lg:w-2/3">
            {userRole === "STUDENT"
             ? (<StudentCallLogs />) : (<CallLogs />)
            }
        
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

export default Home;
