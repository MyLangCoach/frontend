import { useState } from 'react';
import { ClassDetails } from '../../util/types';
import pic from "../../assets/png/face-woman.png";
import { DollarIcon } from '../../assets';
import ReUseModal from '../modal/Modal';
import OfferingCalendar from './offering-booking';
const OfferingCard = ({ item }:{item:ClassDetails}) => {
 
  const userPic = pic;
    const handleError = (e:any) => {
      e.target.onerror = null; // Prevent looping
      e.target.src = pic;
    };
  const [open, setOpen] = useState<boolean>(false);
  

  return (
    <div
      className="w-full flex flex-col offering-shadow rounded-md cursor-pointer"
      onClick={() => setOpen(true)}
      key={item?.id}
    >
      <img
        src={item?.coverImageUrl}
        onError={handleError}
        alt=""
        className=" rounded-md w-full h-[240px] object-cover "
      />
      <div className="flex flex-col p-[18px] bg-white ">
        <h1 className="font-bold text-lg red-hat">{item?.title}</h1>
        <p className="text-base red-hat mt-6">{item?.description}</p>
        <div className="w-full flex items-center gap-4 mt-6 border-t  border-t-border pt-3">
          <div className="flex gap-3  items-center">
            <span>
              <DollarIcon />
            </span>
            <p className="text-muted font-medium dm-sams">Free</p>
          </div>
          <div className="flex gap-3 items-center ">
            <span>
              <DollarIcon />
            </span>
            <p className="text-muted font-medium dm-sams">
              {item?.duration ?? "45 mins"}
            </p>
          </div>
          <div className="flex gap-3 items-center ">
            <span>
              <DollarIcon />
            </span>
            <p className="text-muted font-medium dm-sams">Video Call</p>
          </div>
        </div>
      </div>
      <ReUseModal
        open={open}
        setOpen={setOpen}
        width="sm:max-w-[630px] sm:w-full"
      >
        <OfferingCalendar item={item} setOpen={setOpen} />
      </ReUseModal>
    </div>
  );
}

export default OfferingCard
