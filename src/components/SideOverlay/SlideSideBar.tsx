/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { HomeIcon, MicIcon, CatIcon, MessageIcon, StudentIcon, ProfileIcon, RecieptIcon, SettingsIcon } from "../../assets";

import sampPic from "../../assets/png/samp-pic.png";
import mobLogo from "../../assets/icons/lang-logo.svg";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { clearState } from "../../features/offeringslice";
const styles = {
  active: "flex h-[36px] items-center gap-2 px-4 py-2 bg-[#f4f4f5] rounded-[4px] mb-2  ",
  inActive: "flex h-[36px] items-center gap-2 px-4 py-2 mb-2 cursor-pointer",
};

export default function SlideSidebar({current,open,setOpen} : any) {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth);
    const handleLogout = () => {
      dispatch(clearState());
      navigate("/login");
  };
    const userRole = user?.userData?.role;

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden"
        onClose={setOpen}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Dialog.Overlay className="absolute inset-0" />

          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="pointer-events-auto w-screen max-w-[266px]">
                <div className="w-full fixed top-0 left-0 bottom-0 h-screen flex flex-col    bg-white flow-hide   ">
                  <div className="w-full flex flex-col items-center relative px-4 ">
                    <div className="mt-6 flex start w-full">
                      <div className="flex items-center justify-between w-full">
                        <img
                          src={mobLogo}
                          alt="logo"
                          className="w-[120px] h-auto"
                        />
                        <span
                          className="cursor-pointer"
                          onClick={() => setOpen(false)}
                        >
                          <FaTimes />
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col w-full mt-8">
                      <h1 className="text-lg font-semibold inter text-[#09090B] mb-2 pl-4 ">
                        Menu
                      </h1>
                      <div
                        className={
                          current === 1 ? styles.active : styles.inActive
                        }
                        onClick={() => navigate("/")}
                      >
                        <HomeIcon />
                        <p className="text-black text-sm font-medium inter">
                          Home
                        </p>
                      </div>
                      <div
                        className={
                          current === 2 ? styles.active : styles.inActive
                        }
                        onClick={() => navigate("/student/live-classes")}
                      >
                        <MicIcon />
                        <p className="text-black text-sm font-medium inter">
                          My Classes
                        </p>
                      </div>
                      {userRole === "STUDENT" ? (
                        <div
                          className={
                            current === 5 ? styles.active : styles.inActive
                          }
                          onClick={() => navigate("/coaches")}
                        >
                          <StudentIcon />
                          <p className="text-black text-sm font-medium inter">
                            Coaches
                          </p>
                        </div>
                      ) : (
                        <div
                          className={
                            current === 5 ? styles.active : styles.inActive
                          }
                          onClick={() => navigate("/students")}
                        >
                          <StudentIcon />
                          <p className="text-black text-sm font-medium inter">
                            Students
                          </p>
                        </div>
                      )}
                      <div
                        className={
                          current === 100
                            ? styles.active
                            : `${styles.inActive} opacity-0 cursor-not-allowed`
                        }
                        onClick={() => navigate("/")}
                      >
                        <CatIcon />
                        <p className="text-black text-sm font-medium inter">
                          Categories
                        </p>
                      </div>
                      <div
                        className={
                          current === 201
                            ? styles.active
                            : `${styles.inActive} opacity-0 cursor-not-allowed`
                        }
                        onClick={() => navigate("/")}
                      >
                        <MessageIcon />
                        <p className="text-black text-sm font-medium inter">
                          Messages
                        </p>
                      </div>

                      <h1 className="text-lg font-semibold inter text-[#09090B] mb-2 pl-4 mt-6 ">
                        My Account
                      </h1>
                      <div
                        className={
                          current === 6 ? styles.active : styles.inActive
                        }
                        onClick={() => navigate("/")}
                      >
                        <ProfileIcon />
                        <p className="text-black text-sm font-medium inter">
                          Profile
                        </p>
                      </div>
                      {userRole === "STUDENT" ? (
                        <div
                          className={
                            current === 7 ? styles.active : styles.inActive
                          }
                          onClick={() => navigate("/payouts")}
                        >
                          <RecieptIcon />
                          <p className="text-black text-sm font-medium inter">
                            Expenditure
                          </p>
                        </div>
                      ) : (
                        <div
                          className={
                            current === 7 ? styles.active : styles.inActive
                          }
                          onClick={() => navigate("/payouts")}
                        >
                          <RecieptIcon />
                          <p className="text-black text-sm font-medium inter">
                            Earnings
                          </p>
                        </div>
                      )}
                      <div
                        className={
                          current === 8 ? styles.active : styles.inActive
                        }
                        onClick={() => navigate("/settings")}
                      >
                        <SettingsIcon />
                        <p className="text-black text-sm font-medium inter">
                          Settings
                        </p>
                      </div>
                      <div
                        className={
                          current === 9 ? styles.active : styles.inActive
                        }
                        onClick={handleLogout}
                      >
                        <SettingsIcon />
                        <p className="text-black text-sm font-medium inter">
                          Logout
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 mt-4 xl:px-8 border-t-[#e4e4e7] h-[90px] flex items-center border-t border-b border-b-[#e4e4e7] ">
                    <div className="flex item-center gap-2">
                      <span>
                        <img
                          src={sampPic}
                          alt="sample"
                          className="w-8 h-8 rounded-[4px]"
                        />
                      </span>
                      <div className="flex flex-col">
                        <h1 className="inter font-medium text-[#17191C] text-sm capitalize ">
                          {user?.userData?.firstName +
                            " " +
                            user?.userData?.lastName}
                        </h1>
                        <p
                          className="text-xs font-normal text-[#707070] underline cursor-pointer"
                          onClick={() => navigate("/profile")}
                        >
                          View profile
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
