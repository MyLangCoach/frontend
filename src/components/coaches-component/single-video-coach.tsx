import { SetStateAction, useState } from "react";
import pic from "../../assets/png/pic.png";
import { StopWatch, VerifyIcon } from "../../assets";
import ar from "../../assets/png/ar.png";
import { UsersIcon, CapIcon, LanguageIcon } from "../../assets";
import { Button, OutlineBtn } from "../Button";
import { CoachDetails } from "../../util/types";
import ReUseModal from "../modal/Modal";
import Calendar from "./booking-calender";
import { useNavigate } from "react-router-dom";
interface SingleCardProps {
    item: any;
    onClick: any; 
}
const SingleVideoCard: React.FC<SingleCardProps> = ({ item, onClick }: any) => {
  const {
    bio,
    introVideo,
    costPerSession,
    languages,
    id,
    firstName,
      lastName,
    
  }: CoachDetails = item;
  const selectedLanguage = languages?.[0];
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <div
      className="w-full flex flex-col carding-shadow lg:w-full bg-white rounded-[8px] p-3"
      key={id}
    >
      <video
        src={item?.introVideo}
        controls
        className="lg:w-full  h-[200px] rounded-t-[8px] object-cover cursor-pointer"
      />
      <div className="w-full px-4 py-3 flex flex-col">
       
       
        <div className=" py-2 flex items-center w-full gap-4 ">
          <div className="w-1/2 flex-grow flex flex-col">
            <p className="text-black text-base  red-hat gap-2 flex items-center ">
            
              {costPerSession?.[0]?.sessionType ?? "0"} -min trial
            </p>
            <p className="text-black red-hat font-bold lg:text-xl text-base mt-1">
              #{costPerSession?.[0]?.amount ?? "0"}
            </p>
          </div>
          <div className="w-1/2 flex-grow flex flex-col">
            <p className="text-black text-base  red-hat gap-2 flex items-center ">
            
              {costPerSession?.[1]?.sessionType ?? "0"} -min trial
            </p>
            <p className="text-black red-hat font-bold lg:text-xl text-base mt-1">
              #{costPerSession?.[1]?.amount ?? "0"}
            </p>
          </div>
        </div>
        <div className="w-full mt-4 flex flex-col gap-3">
        
       
          <div className="w-full flex flex-col gap-4">
            <Button
              name="Book a lesson"
              className="min-w-full"
              onClick={() => setOpen(true)}
                      />
          </div>
                      <OutlineBtn onClick={onClick} name="View Offerings" className="min-w-full " height="h-9" />
        </div>
      </div>
      <ReUseModal
        open={open}
        setOpen={setOpen}
        width="sm:max-w-[630px] sm:w-full"
      >
        <Calendar item={item} setOpen={setOpen} />
      </ReUseModal>
    </div>
  );
};

export default SingleVideoCard;
