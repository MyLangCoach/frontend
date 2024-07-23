import React, { SetStateAction, useEffect } from 'react'
import ReUseModal from './Modal';
import { CancelIcon } from '../../assets';
import defaultImage from "../../assets/png/default-offering.png"
import { ClassDetails } from '../../util/types';
import { formatDateTime } from '../../util';
interface viewProps {
    open: boolean;
    setOpen: React.Dispatch<SetStateAction<boolean>>;
    item: any;
    index: number;
}
const ViewOfferingModal = ({ open, setOpen, item, index }: viewProps) => {
    const details: ClassDetails = item;
     const handleError = (e: any) => {
       e.target.onerror = null; // Prevent looping
       e.target.src = defaultImage;
    };

    const handleClose = () => {
     
        setTimeout(() => {
            setOpen(false);
        }, 100);
  }
    
  return (
    <div className='w-fit' key={index}>
      <ReUseModal
        open={open}
        setOpen={setOpen}
        width="lg:w-full lg:max-w-[720px] max-h-[90vh] flow-hide "
      >
        <div className="w-full flex flex-col ">
          <div className="flex justify-end p-3 w-full">
                      <div
                          className=" cursor-pointer "
                          onClick={handleClose}
            >
              <CancelIcon />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="w-full">
              <img
                src={details?.coverImageUrl}
                alt=""
                onError={handleError}
                className="object-cover h-[270px] w-full "
              />
            </span>
            <h1 className="red-hat font-bold mt-6 lg:text-3xl ">
              {details?.title}
            </h1>
            <p className="text-muted mt-6">{details?.description}</p>
            <div className="w-full mt-12 grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* start  */}
              <div className="flex flex-col">
                <p className="text-muted text-sm">Class Type</p>
                <p className="lg:text-lg font-semibold text-base mt-2 capitalize">
                  {details?.type}
                </p>
              </div>
              {/* end */}
              {/* start  */}
              <div className="flex flex-col">
                <p className="text-muted text-sm">Number of Attendees</p>
                <p className="lg:text-lg font-semibold text-base mt-2 capitalize">
                  {details?.numOfAttendees ?? 1}
                </p>
              </div>
              {/* end */}
              {/* start  */}
              <div className="flex flex-col">
                <p className="text-muted text-sm">Class Date</p>
                <div className="flex flex-col gap-3">
                  {details?.liveDateTimes?.map((time: string) => (
                    <p className="lg:text-base text-sm mt-2 capitalize">
                      {" "}
                      {formatDateTime(time)?.date}{" "}
                    </p>
                  ))}
                </div>
              </div>
              {/* end */}
              {/* start  */}
              <div className="flex flex-col">
                <p className="text-muted text-sm">Attendance Type</p>
                <p className="lg:text-lg font-semibold text-base mt-2 capitalize">
                  {details?.attendantType ?? "-"}
                </p>
              </div>
              {/* end */}
              {/* start  */}
              <div className="flex flex-col">
                <p className="text-muted text-sm">Duration</p>
                <p className="lg:text-lg font-semibold text-base mt-2 capitalize">
                  {details?.duration ?? "-"}
                </p>
              </div>
              {/* end */}
              {/* start  */}
              <div className="flex flex-col">
                <p className="text-muted text-sm">Pricing</p>
                <p className="lg:text-lg font-semibold text-base mt-2 capitalize">
                  {details?.isFree ? "FREE" : "PAID"}
                </p>
              </div>
              {/* end */}
              {/* start  */}
              <div className="flex flex-col">
                <p className="text-muted text-sm">Cost</p>
                <p className="lg:text-lg font-semibold text-base mt-2 capitalize">
                  <span>{details?.cost?.currency}</span>
                  <span>{details?.cost?.amount}</span>
                </p>
              </div>
              {/* end */}
              {/* start  */}
              <div className="flex flex-col">
                <p className="text-muted text-sm">Redirect Url</p>
                <a className="lg:text-lg font-semibold text-base  mt-2 capitalize  cursor-pointer" href={details?.redirectLink} target='_blank'>
                  {details?.redirectLink ?? "-"}
                </a>
              </div>
              {/* end */}
              {/* start  */}
              <div className="flex flex-col">
                <p className="text-muted text-sm">Number of Registered Attendees</p>
                <p className="lg:text-lg font-semibold text-base mt-2 capitalize">
                  {details?.registeredAttendeesCount ?? "-"}
                </p>
              </div>
              {/* end */}
            </div>
          </div>
        </div>
      </ReUseModal>
    </div>
  );
}

export default ViewOfferingModal
