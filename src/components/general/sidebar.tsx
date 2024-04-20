import { useNavigate } from 'react-router-dom';
import { HomeIcon, MicIcon, CatIcon, MessageIcon, StudentIcon, ProfileIcon, RecieptIcon, SettingsIcon } from '../../assets';
import logo from "../../assets/png/lang-logo.png";
import sampPic from "../../assets/png/samp-pic.png"
const styles = {
  active: "flex h-[36px] items-center gap-2 px-4 py-2 bg-[#f4f4f5] rounded-[4px] mb-2  ",
  inActive: "flex h-[36px] items-center gap-2 px-4 py-2 mb-2 cursor-pointer",
};
const Sidebar = ({ current }: { current: number }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full fixed top-0 left-0 bottom-0 h-screen flex flex-col max-w-[266px]    bg-white flow-hide   ">
      <div className="w-full flex flex-col items-center relative px-4 ">
        <div className="mt-12 flex start">
          <div className="">
            <img src={logo} alt="logo" className="w-[193px] h-auto" />
          </div>
        </div>
        <div className="flex flex-col w-full mt-8">
          <h1 className="text-lg font-semibold inter text-[#09090B] mb-2 pl-4 ">
            Menu
          </h1>
          <div
            className={current === 1 ? styles.active : styles.inActive}
            onClick={() => navigate("/")}
          >
            <HomeIcon />
            <p className="text-black text-sm font-medium inter">Home</p>
          </div>
          <div
            className={current === 2 ? styles.active : styles.inActive}
            onClick={() => navigate("/live-classes")}
          >
            <MicIcon />
            <p className="text-black text-sm font-medium inter">My Classes</p>
          </div>
          <div
            className={
              current === 100
                ? styles.active
                : `${styles.inActive} opacity-20 cursor-not-allowed`
            }
            onClick={() => navigate("/")}
          >
            <CatIcon />
            <p className="text-black text-sm font-medium inter">Categories</p>
          </div>
          <div
            className={
              current === 201
                ? styles.active
                : `${styles.inActive} opacity-20 cursor-not-allowed`
            }
            onClick={() => navigate("/")}
          >
            <MessageIcon />
            <p className="text-black text-sm font-medium inter">Messages</p>
          </div>
          <div
            className={current === 5 ? styles.active : styles.inActive}
            onClick={() => navigate("/")}
          >
            <StudentIcon />
            <p className="text-black text-sm font-medium inter">Students</p>
          </div>

          <h1 className="text-lg font-semibold inter text-[#09090B] mb-2 pl-4 mt-6 ">
            My Account
          </h1>
          <div
            className={current === 6 ? styles.active : styles.inActive}
            onClick={() => navigate("/profile")}
          >
            <ProfileIcon />
            <p className="text-black text-sm font-medium inter">Profile</p>
          </div>
          <div
            className={current === 7 ? styles.active : styles.inActive}
            onClick={() => navigate("/payouts")}
          >
            <RecieptIcon />
            <p className="text-black text-sm font-medium inter">Earnings</p>
          </div>
          <div
            className={current === 8 ? styles.active : styles.inActive}
            onClick={() => navigate("/settings")}
          >
            <SettingsIcon />
            <p className="text-black text-sm font-medium inter">Settings</p>
          </div>
        </div>
      </div>
      <div className="px-4 mt-4 xl:px-8 border-t-[#e4e4e7] h-[90px] flex items-center border-t border-b border-b-[#e4e4e7] ">
        <div className="flex item-center gap-2">
          <span>
            <img src={sampPic} alt="sample" className="w-8 h-8 rounded-[4px]" />
          </span>
          <div className="flex flex-col">
            <h1 className="inter font-medium text-[#17191C] text-sm ">Ibrahim.M</h1>
            <p className='text-xs font-normal text-[#707070] underline cursor-pointer'>View profile</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar
