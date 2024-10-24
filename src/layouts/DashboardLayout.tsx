import { useState } from "react";
import HeadNav from "../components/general/headnav";
import Sidebar from "../components/general/sidebar";
import { MenuIcon } from "../assets";
import moblogo from "../assets/icons/lang-logo.svg"
import SlideSidebar from "../components/SideOverlay/SlideSideBar";
interface dashboard {
  children?: any;

  current: number;
}
const DashboardLayout = ({ children, current }: dashboard) => {
  const [open, setOpen] = useState(false);

  return (
    <>
    <div className="w-full flex flex-col">
   
      <div className="w-full h-screen bg-[#f6f6f6] relative   md:flex  ">
        <div className="hidden xl:flex xl:w-3/12 xl:max-w-[266px]  ">
          <Sidebar current={current} />
        </div>

        <div className=" w-full xl:w-9/12 flex flex-col flex-grow relative h-full flow-hide  ">
          {/* <HeadNav /> */}
          <div className="lg:hidden flex items-center w-full justify-between py-4 px-4 ">
            <span>
              <img src={moblogo} alt="logo" className="w-[100px] h-auto" />
            </span>
            <span onClick={() => setOpen(!open)}>
              <MenuIcon />
            </span>
          </div>

          <div className="w-full  flow-hide lg:px-12 ">{children}</div>
        </div>
      </div>
      </div>
      <SlideSidebar open={open} setOpen={setOpen} current={current} />
    </>
  );
};

export default DashboardLayout;
