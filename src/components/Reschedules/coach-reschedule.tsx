import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import LoadingComponent from '../Loaders/skeleton-loading';
import PrimarySelect from '../Selects/PrimarySelect';
import CoachSentRescheduleCard from '../coaches-component/coach-sent-reschedule-card';
import { it } from 'node:test';
import CoachReceivedRescheduleCard from '../coaches-component/coach-recieved-reschedule-card';
const CoachReschedules = () => {
    const offering = useAppSelector(state => state.offerings);
    const dispatch = useAppDispatch();
    const sentRequest = offering?.allReschedules?.initiatedRequests;
    const receivedRequest = offering?.allReschedules?.receivedRequests;
    const [selected, setSelected] = useState({name:"Received", value:1});

  
  return (
    <div className="w-full flex flex-col bg-white px-4 mt-6 rounded-md ">
      <div className="mt-6 max-w-[200px]">
        <PrimarySelect
          selected={selected}
          setSelected={setSelected}
          label="Select Reschedule  Type"
          data={[
            { name: "Sent Request", value: 0 },
            { name: "Received Request", value: 1 },
          ]}
          name="Select"
        />
      </div>
      <div className="mt-6">
        {selected?.value === 0 && (
          <>
            {sentRequest?.length === 0 ? (
              <div className="flex h-full items-center justify-center flex-col pb-8 ">
                <p className="red-hat font-bold text-black lg:max-w-[424px] lg:text-xl text-base text-center  ">
                  You do not have any sent request at the moment. 
                </p>
             
              
              </div>
            ) : (
                              <div className='flex flex-col bg-white py-4 rounded-sm'>
                                  {
                                      sentRequest?.map((item: any, index: number) => {
                                          return (
                                              <CoachSentRescheduleCard  item={item} index={index} key={index}/>
                                          )
                                      })
                                  }
              </div>
            )}
          </>
        )}
        {selected?.value === 1 && (
          <>
            {receivedRequest?.length === 0 ? (
              <div className="flex h-full items-center justify-center flex-col pb-8 ">
                <p className="red-hat font-bold text-black lg:max-w-[424px] lg:text-xl text-base text-center  ">
                  You do not have any received request at the moment. 
                </p>
              
              
              </div>
            ) : (
                              <div className='flex flex-col bg-white py-4 rounded-sm'>
                                  {
                                      receivedRequest?.map((item: any, index: number) => {
                                          return (
                                              <CoachReceivedRescheduleCard  item={item} index={index} key={index}/>
                                          )
                                      })
                                  }
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default CoachReschedules
