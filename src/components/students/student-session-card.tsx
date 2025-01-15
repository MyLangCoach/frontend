import React, { useEffect } from "react";
import { BlueCalenderIcon, BlueTimeIcon } from "../../assets";
import { formatDateTime, openInNewTab } from "../../util";
import { Button } from "../Button";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { payForSession, restoreDefault as restorePayment } from "../../features/paymentslice";

const StudentSessionCard = ({ item, index }: { item: any; index: number }) => {
     const dispatch = useAppDispatch();
      const payment = useAppSelector((state) => state.payment);
    
      const handlePayment = () => {
        const data = {
          bookingId: item?.id,
          paymentMethod: "TRANSFER",
        };
      
        dispatch(payForSession(data));
      };
    
      useEffect(() => {
        if (
          payment?.sessionPaymentSuccess &&
          payment?.sessionPaymentResp?.authorization_url
        ) {
          window.open(payment?.sessionPaymentResp?.authorization_url, "_blank");
          setTimeout(() => {
            dispatch(restorePayment());
          }, 3000);
        }
      }, [payment?.sessionPaymentSuccess]);
  return (
    <div
      className="flex flex-col gap-2 border-border border  rounded-[4px]"
      key={index}
    >
      <div className="w-full min-h-[76px] flex lg:px-6 p-4 flex-col lg:items-center gap-3 border-b border-b-border  lg:flex-row ">
        <p className="red-hat text-foreground font-bold text-[23px]  ">
          {item.note}
        </p>
        <span className="bg-[#FABC4E] px-[6px] h-7 flex items-center rounded-[4px] text-white min-w-fit w-fit">
          1:1 class
        </span>
      </div>
      <div className="w-full flex flex-col lg:px-6 pb-6">
        <div className="w-full mt-3 flex flex-wrap gap-6 items-center p-4 lg:p-0">
          <span className="flex items-center gap-[10px] w-2/12 min-w-fit ">
            <p className="text-muted text-sm dm-sans min-w-fit"> Name</p>
            <p className="text-sm dm-sans font-bold text-muted min-w-fit ">
              {item?.student.firstName ?? ""} {item?.student?.lastName ?? ""}
            </p>
          </span>
          <span className="flex items-center gap-[10px] w-2/12 min-w-fit ">
            <p className="text-muted text-sm dm-sans">Status</p>
            <p className="text-sm dm-sans font-bold text-muted">
              {item.status}
            </p>
          </span>
          <span className="flex items-center gap-[10px]  w-2/12 min-w-fit">
            <p className="text-muted text-sm dm-sans">Type</p>
            <p className="text-sm dm-sans font-bold text-muted">Session</p>
          </span>
          <span className="flex items-center gap-[10px]  min-w-fit ">
            <BlueCalenderIcon />
            <p className="text-sm dm-sans font-medium text-muted">
              {formatDateTime(item?.startDateTime)?.date}
            </p>
          </span>
          <span className="flex items-center gap-[10px]   min-w-fit">
            <BlueTimeIcon />
            <p className="text-sm dm-sans font-medium text-muted">
              {formatDateTime(item?.startDateTime)?.time}
            </p>
          </span>
              </div>
               {item?.meetingLink && item?.paymentConfirmed && item?.status !== "ENDED" && (
                        <Link
                          to={item?.meetingLink}
                          className="items-center hover:bg-[#0E79FF] transition duration-500  bg-black rounded-[4px] text-white px-3 w-fit h-[32px] text-xs dm-sans flex  justify-center mt-7"
                        >
                          Join Call
                        </Link>
                      )}
                      {!item?.meetingLink &&
                        !item?.paymentConfirmed &&
                        item?.transactionReference && (
                          <Button name="Retry Payment" onClick={handlePayment} className="mt-7" />
                        )}
                      {!item?.meetingLink &&
                        item?.transactionReference &&
                        item?.paymentConfirmed &&
                        item?.status !== "ENDED" && <Button name="Processing..." />}
                      {!item?.meetingLink && !item?.transactionReference && (
                        <Button name="Make Payment" onClick={handlePayment} className="mt-7" />
                      )}
                      {item?.status === "ENDED" && <Button name="ENDED" className="mt-7" />}
        {/* {item?.meetingLink ? (
          <div className="px-4 mt-3 lg:mt-7">
            <Button
              name="Join Session"
              onClick={() => openInNewTab(item.meetingLink)}
            />
          </div>
        ) : (
          <div className="w mt-7">
            <Button name="Waiting for payment" />
          </div>
        )} */}
              
      </div>
    </div>
  );
};

export default StudentSessionCard;
