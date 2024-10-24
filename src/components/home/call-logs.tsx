import { useEffect, useState } from "react";
import { Button } from "../Button";
import CreateNewServiceModal from "../live-classes/create-new-service-modal";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getAllBookedOfferingCoach, getAllReschedules, getAllSessionBookingCoach } from "../../features/offeringslice";
import LoadingComponent from "../Loaders/skeleton-loading";
import CoachSessionCard from "../coaches-component/coach-session-card";
import CoachOfferingCard from "../coaches-component/coach-offering-card";
import CoachReschedules from "../Reschedules/coach-reschedule";

const CallLogs = () => {
 
  const dispatch = useAppDispatch();
  const offering = useAppSelector((state) => state.offerings);
  
  useEffect(() => {
    dispatch(getAllSessionBookingCoach());
    dispatch(getAllBookedOfferingCoach());
    dispatch(getAllReschedules());
  }, []);
  const bookings = offering?.allBookingsSessionCoach;
  const offeringsList = offering?.allBookedOfferingCoach;


  const [currentSession, setCurrentSession] = useState(1);
  const [currentOffering, setCurrentOffering] = useState(1);
  const [present, setPresent] = useState(0);

  const currentTime = new Date(); // current user's date and time

  const [pastAppointmentsBooking, setPastAppointmentsBooking] = useState([]);
  const [upcomingAppointmentsBooking, setUpcomingAppointmentsBooking] = useState([]);
  const [pastOfferingBooking, setPastOfferingBooking] = useState([]);
  const [upcomingOfferingBooking, setUpcomingOfferingBooking] = useState([]);

  // Iterate over the appointments array

  
  const [open, setOpen] = useState<boolean>(false);
  
  useEffect(() => {
    if (bookings) {
      const currentTime = new Date();
      const past: any = [];
      const upcoming: any = [];

      bookings.forEach((item: any) => {
        const startDateTime = new Date(item.startDateTime);
        const endDateTime = new Date(item.endDateTime);

        if (endDateTime < currentTime) {
          past.push(item); // Add to past appointments
        } else if (startDateTime >= currentTime) {
          upcoming.push(item); // Add to upcoming appointments
        }
      });

      // Sort upcoming appointments by startDateTime in ascending order (closest first)
      upcoming.sort((a: any, b: any) => {
        return (
          new Date(a.startDateTime).getTime() -
          new Date(b.startDateTime).getTime()
        );
      });

      // Update state
      setPastAppointmentsBooking(past);
      setUpcomingAppointmentsBooking(upcoming);
    }
    if (offeringsList) {
      const currentTime = new Date();
      const past: any = [];
      const upcoming: any = [];

      offeringsList.forEach((item: any) => {
        const startDateTime = new Date(item.startDateTime);
        const endDateTime = new Date(item.endDateTime);

        if (endDateTime < currentTime) {
          past.push(item); // Add to past appointments
        } else if (startDateTime >= currentTime) {
          upcoming.push(item); // Add to upcoming appointments
        }
      });

      // Sort upcoming appointments by startDateTime in ascending order (closest first)
      upcoming.sort((a: any, b: any) => {
        return (
          new Date(a.startDateTime).getTime() -
          new Date(b.startDateTime).getTime()
        );
      });

      // Update state
      setPastOfferingBooking(past);
      setUpcomingOfferingBooking(upcoming);
    }

  }, [bookings,offeringsList]);



    if (offering.fetchLoading) {
      return (
        <div className="w-full">
          <LoadingComponent />
        </div>
      );
    }

  return (
    <div className="w-full flex flex-col mt-6 px-4 ">
      <div className="w-full flex items-center mb-6 gap-4">
        <p
          className={`cursor-pointer red-hat text-base ${
            present === 0
              ? "font-bold text-[#09090B] red-hat border-b-primary border-b  pb-1"
              : "pb-1 text-[#09090B] "
          } `}
          onClick={() => setPresent(0)}
        >
          Offerings
        </p>
        <p
          className={`cursor-pointer red-hat text-base ${
            present === 1
              ? "font-bold text-[#09090B] red-hat border-b-primary border-b  pb-1"
              : "pb-1 text-muted "
          } `}
          onClick={() => setPresent(1)}
        >
          Sessions
        </p>
      </div>
      {/* tabs session */}
      {present === 0 && (
        <div className="w-full flex gap-4 items-center flex-wrap justify-between  lg:justify-start px-4 lg:px-0">
          <div
            className={
              currentOffering === 1
                ? "bg-white px-4 flex items-center justify-center h-[28px] text-[#09090B] text-sm font-medium lg:min-w-[152px]  cursor-pointer inter  "
                : "text-muted flex items-center justify-center h-[28px] cursor-pointer font-medium inter lg:min-w-[152px]  "
            }
            onClick={() => setCurrentOffering(1)}
          >
            Upcoming calls
          </div>
          <div
            className={
              currentOffering === 3
                ? "bg-white flex px-4 items-center justify-center h-[28px] text-[#09090B] text-sm font-medium lg:min-w-[152px]  cursor-pointer inter  "
                : "text-muted flex items-center justify-center h-[28px] cursor-pointer font-medium inter lg:min-w-[152px]  "
            }
            onClick={() => setCurrentOffering(3)}
          >
            Reschedule
          </div>
          <div
            className={
              currentOffering === 2
                ? "bg-white flex px-4 items-center justify-center h-[28px] text-[#09090B] text-sm font-medium lg:min-w-[152px]  cursor-pointer inter  "
                : "text-muted flex items-center justify-center h-[28px] cursor-pointer font-medium inter lg:min-w-[152px]  "
            }
            onClick={() => setCurrentOffering(2)}
          >
            Past calls
          </div>
          <div
            className={
              currentOffering === 0
                ? "bg-white flex items-center justify-center h-[28px] text-[#09090B] text-sm font-medium px-4 lg:min-w-[152px]  cursor-pointer inter  "
                : "text-muted flex items-center justify-center h-[28px] cursor-pointer font-medium inter lg:min-w-[152px]  "
            }
            onClick={() => setCurrentOffering(0)}
          >
            All
          </div>
        </div>
      )}
      {present === 1 && (
        <div className="w-full flex gap-4 items-center flex-wrap justify-between lg:justify-start px-4 lg:px-0">
          <div
            className={
              currentSession === 1
                ? "bg-white px-4 flex items-center justify-center h-[28px] text-[#09090B] text-sm font-medium lg:min-w-[152px]  cursor-pointer inter  "
                : "text-muted flex items-center justify-center h-[28px] cursor-pointer font-medium inter lg:min-w-[152px]  "
            }
            onClick={() => setCurrentSession(1)}
          >
            Upcoming calls
          </div>
          <div
            className={
              currentSession === 2
                ? "bg-white px-4 flex items-center justify-center h-[28px] text-[#09090B] text-sm font-medium lg:min-w-[152px]  cursor-pointer inter  "
                : "text-muted flex items-center justify-center h-[28px] cursor-pointer font-medium inter lg:min-w-[152px]  "
            }
            onClick={() => setCurrentSession(2)}
          >
            Past calls
          </div>
          <div
            className={
              currentSession === 3
                ? "bg-white px-4 flex items-center justify-center h-[28px] text-[#09090B] text-sm font-medium lg:min-w-[152px]  cursor-pointer inter  "
                : "text-muted flex items-center justify-center h-[28px] cursor-pointer font-medium inter lg:min-w-[152px]  "
            }
            onClick={() => setCurrentSession(3)}
          >
            Reschedule
          </div>
          <div
            className={
              currentSession === 0
                ? "bg-white px-4 flex items-center justify-center h-[28px] text-[#09090B] text-sm font-medium lg:min-w-[152px]  cursor-pointer inter  "
                : "text-muted flex items-center justify-center h-[28px] cursor-pointer font-medium inter lg:min-w-[152px]  "
            }
            onClick={() => setCurrentSession(0)}
          >
            All
          </div>
        </div>
      )}

      {/* end of tabs offerings */}
      {present === 0 && (
        <div className="w-full">
          {currentOffering === 0 && (
            <div className="w-full mt-4 bg-white min-h-[234px] flex flex-col gap-4 rounded-md">
              {offeringsList.length > 0 ? (
                <div className="w-full flex flex-col px-4 py-4   ">
                  {offeringsList?.map((item: any, index: number) => (
                    <CoachOfferingCard item={item} index={index} />
                  ))}
                </div>
              ) : (
                <div className="flex h-full items-center justify-center flex-col min-h-[234px]">
                  <p className="red-hat font-bold text-black lg:max-w-[424px] lg:text-xl text-base text-center  ">
                    You do not have any classes at the moment, Create a new
                    group class or private class to get started
                  </p>
                  <Button
                    name="Create new  class"
                    className="mt-5 mx-auto"
                    onClick={() => setOpen(true)}
                  />
                </div>
              )}
            </div>
          )}
          {currentOffering === 1 && (
            <div className="w-full mt-4 bg-white min-h-[234px] flex flex-col items-center justify-center rounded-md gap-4">
              {upcomingOfferingBooking.length > 0 ? (
                <div className="w-full flex flex-col px-4 py-4 gap-4">
                  {upcomingOfferingBooking?.map((item: any, index: number) => (
                    <CoachOfferingCard item={item} index={index} />
                  ))}
                </div>
              ) : (
                <div className="flex h-full items-center justify-center flex-col ">
                  <p className="red-hat font-bold text-black lg:max-w-[424px] lg:text-xl text-base text-center  ">
                    You do not have any Upcoming classes at the moment
                  </p>
                  <Button
                    name="Create new  class"
                    className="mt-5 mx-auto"
                    onClick={() => setOpen(true)}
                  />
                </div>
              )}
            </div>
          )}
          {currentOffering === 2 && (
            <div className="w-full mt-4 bg-white min-h-[234px] flex flex-col items-center justify-center rounded-md ">
              {pastOfferingBooking.length > 0 ? (
                <div className="w-full flex flex-col px-4 py-4 gap-4">
                  {pastOfferingBooking?.map((item: any, index: number) => (
                    <CoachOfferingCard item={item} index={index} />
                  ))}
                </div>
              ) : (
                <div className="flex h-full items-center justify-center flex-col ">
                  <p className="red-hat font-bold text-black lg:max-w-[424px] lg:text-xl text-base text-center  ">
                    You do not have any classes at the moment, Create a new
                    group class or private class to get started
                  </p>
                  <Button
                    name="Create new  class"
                    className="mt-5 mx-auto"
                    onClick={() => setOpen(true)}
                  />
                </div>
              )}
            </div>
          )}
          {currentOffering === 3 && <CoachReschedules />}
        </div>
      )}
      {/* end of a offerings */}
      {/* end of tabs session */}
      {present === 1 && (
        <div className="w-full">
          {currentSession === 0 && (
            <div className="w-full mt-4 bg-white min-h-[234px] flex flex-col  rounded-md">
              {bookings.length > 0 ? (
                <div className="w-full flex flex-col px-4 py-4 gap-4">
                  {bookings?.map((item: any, index: number) => (
                    <CoachSessionCard item={item} index={index} />
                  ))}
                </div>
              ) : (
                <div className="flex h-full items-center justify-center flex-col min-h-[234px]">
                  <p className="red-hat font-bold text-black lg:max-w-[424px] lg:text-xl text-base text-center  ">
                    You do not have any classes at the moment, Create a new
                    group class or private class to get started
                  </p>
                  <Button
                    name="create new  class"
                    className="mt-5 mx-auto"
                    onClick={() => setOpen(true)}
                  />
                </div>
              )}
            </div>
          )}
          {currentSession === 1 && (
            <div className="w-full mt-4 bg-white min-h-[234px] flex flex-col  rounded-md">
              {upcomingAppointmentsBooking.length > 0 ? (
                <div className="w-full flex flex-col px-4 py-4 gap-4">
                  {upcomingAppointmentsBooking?.map(
                    (item: any, index: number) => (
                      <CoachSessionCard item={item} index={index} />
                    )
                  )}
                </div>
              ) : (
                <div className="w-full mt-4 bg-white min-h-[234px] flex flex-col items-center justify-center rounded-md">
                  <p className="red-hat font-bold text-black lg:max-w-[424px] lg:text-xl text-base text-center ">
                    You do not have any upcoming calls.
                  </p>
                </div>
              )}
            </div>
          )}
          {currentSession === 2 && (
            <div className="w-full mt-4 bg-white min-h-[234px] flex flex-col  rounded-md">
              {pastAppointmentsBooking.length > 0 ? (
                <div className="w-full flex flex-col px-4 py-4">
                  {pastAppointmentsBooking?.map((item: any, index: number) => (
                    <CoachSessionCard item={item} index={index} />
                  ))}
                </div>
              ) : (
                <div className="w-full mt-4 bg-white min-h-[234px] flex flex-col items-center justify-center rounded-md">
                  <p className="red-hat font-bold text-black lg:max-w-[424px] lg:text-xl text-base text-center ">
                    You do not have any past calls.
                  </p>
                  <Button name="create new  class" className="mt-5 mx-auto" />
                </div>
              )}
            </div>
          )}
          {currentSession === 3 && <CoachReschedules />}
        </div>
      )}
      {/* end of a session */}
      <CreateNewServiceModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default CallLogs;
