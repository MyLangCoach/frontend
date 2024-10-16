import {SetStateAction, useState} from 'react'
import pic from "../../assets/png/pic.png" 
import { StopWatch, VerifyIcon } from '../../assets'
import ar from "../../assets/png/ar.png"
import { UsersIcon,CapIcon,LanguageIcon } from '../../assets'
import { Button } from '../Button'
import { CoachDetails } from '../../util/types'
import ReUseModal from '../modal/Modal'
import Calendar from './booking-calender'
import { useNavigate } from 'react-router-dom'
interface SingleCardProps {
  item:any
}
const SingleCoachCard: React.FC<SingleCardProps> = ({ item }: any) => {
  const { bio, profileImage, costPerSession, languages, id,firstName,lastName } : CoachDetails = item;
  const selectedLanguage = languages?.[0]
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <div
      className="w-full flex flex-col carding-shadow lg:w-[257px] bg-white rounded-[8px]"
      key={id}
    >
      <img
        src={item?.profileImage ?? pic}
        alt=""
        className="lg:w-full  h-[200px] rounded-t-[8px] object-cover cursor-pointer"
        onClick={() => navigate(`/view-coach/${id}`)}
      />
      <div className="w-full px-4 py-3 flex flex-col">
        <div className="flex gap-3 items-center">
          <h1 className="text-base lg:text-xl font-bold red-hat capitalize truncate">
            {firstName} {lastName}
          </h1>

          <span>
            <VerifyIcon />
          </span>
        </div>
        <p className="mt-2 red-hat text-black text-sm leading-[24px] lg:text-base truncate">
          {bio ?? "Nil"}
        </p>
        <div className="border-t-border border-b-border border-y py-2 flex items-center w-full gap-4 ">
          <div className="w-1/2 flex-grow flex flex-col">
            <p className="text-muted text-xs  red-hat gap-2 flex items-center ">
              <span>
                <StopWatch />
              </span>
              {costPerSession?.[0]?.sessionType ?? "0"} -min
            </p>
            <p className="text-black red-hat font-bold lg:text-xl text-base mt-1">
              ₦{costPerSession?.[0]?.amount ?? "0"}
            </p>
          </div>
          <div className="w-1/2 flex-grow flex flex-col">
            <p className="text-muted text-xs  red-hat gap-2 flex items-center ">
              <span>
                <StopWatch />
              </span>
              {costPerSession?.[1]?.sessionType ?? "0"} -min
            </p>
            <p className="text-black red-hat font-bold lg:text-xl text-base mt-1">
              ₦{costPerSession?.[1]?.amount ?? "0"}
            </p>
          </div>
        </div>
        <div className="w-full mt-4 flex flex-col gap-3">
          <div className="flex items-center gap-[6px]">
            <span>
              <CapIcon />
            </span>
            <p className="text-muted  text-sm capitalize">
              {item?.coachLanguage?.[0]?.language}
            </p>
          </div>
          {/* <div className="gap-4 flex items-center ">
            <div className="flex items-center gap-[6px]">
              <span>
                <UsersIcon />4
              </span>
              <p className="text-muted  text-sm">20 Student</p>
            </div>

            <div className="flex items-center gap-[6px] ">
              <span className="bg-muted w-[5px] h-[5px] rounded-full"></span>
              <p className="text-muted  text-sm">32 Classes</p>
            </div>
          </div> */}
          {/* <div className="w-full gap-3 items-center flex ">
            <span>
              <LanguageIcon />
            </span>
            <p className="text-muted  text-sm">
              {selectedLanguage?.language ?? "Nil"}
              {`  (${selectedLanguage?.proficiency ?? ""})`}
            </p>
          </div> */}
          <div className="w-full">
            <Button
              name="Book a session"
              className="min-w-full"
              onClick={() => setOpen(true)}
            />
          </div>
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
}

export default SingleCoachCard
