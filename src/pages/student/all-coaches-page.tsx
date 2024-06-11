import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getAllCoaches, getAllStudent } from '../../features/auth/authSlice';
import DashboardLayout from '../../layouts/DashboardLayout';
import { SearchIconA, SearchFilter, NotificationIcon } from '../../assets';
import LoadingComponent from '../../components/Loaders/skeleton-loading';
import SingleCoachCard from '../../components/coaches-component/single-coach-card';

const AllCoaches = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(state => state.auth);
  

  useEffect(() => {
    dispatch(getAllCoaches());
    dispatch(getAllStudent());

  }, []);

  if (auth?.fetchLoading) {
    return (
      <div className='p-8'>
        <LoadingComponent />
      </div>
    )
  }
    
  return (
    <DashboardLayout current={5}>
      <div className="w-full flex flex-col py-6 lg:px-12 px-4 gap-12 ">
        <div className="w-full flex items-center justify-between">
          <div className="flex gap-[10px] w-auto items-center">
            <div className="flex gap-[10px]  border-border border-[0.5px] items-center px-[10px] bg-white h-[40px] rounded-[4px] lg:w-5/12 lg:min-w-[389px] flex-grow  ">
              <span>
                <SearchIconA />
              </span>
              <input type="text" className="flex-grow" />
            </div>
            <span>
              <SearchFilter />
            </span>
          </div>
          <span>
            <NotificationIcon />
          </span>
        </div>
        <div className="flex flex-col gap-6 ">
          <h1 className="text-base  md:text-xl text-black font-bold red-hat">
            Based on your language preference
          </h1>
          <div className="w-full grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {
              auth?.allCoaches?.map((item: any, index: any) => {
                return (
                  <SingleCoachCard key={index} item={item} /> 
                )
              })
            }
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AllCoaches
