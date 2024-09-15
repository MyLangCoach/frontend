import React from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import { NotificationIcon, StudentLogoIcon } from '../../assets';

import TopStudents from '../../components/students/top-student';
import StudentList from '../../components/students/student-list-table';
import ProperTeachingTools from '../../components/students/proper-teaching-tool';
import { useAppSelector } from '../../app/hooks';
const CoachStudent = () => {
  const auth = useAppSelector((state) => state.auth);
  console.log(auth?.allMyStudent);
  return (
    <DashboardLayout current={5}>
      <div className="w-full flex flex-col">
        <div className="w-full flex items-center justify-between lg:mt-6">
          <p className="text-lg font-bold lg:text-2xl ">Students</p>
          <span className="">
            <NotificationIcon />
          </span>
        </div>
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 mt-8 lg:gap-4 gap-4 px-4 lg:px-0 mb-6 ">
          {/* start of a pack */}
          <div className="w-full bg-primaryyellow pattern-bg flex items-center p-6 rounded-[6px] gap-4">
            <span>
              <StudentLogoIcon />
            </span>
            <div className="flex flex-col gap-1">
              <h1 className="text-black red-had font-bold text-lg lg:text-2xl">
                {auth?.allMyStudent?.length}
              </h1>
              <p className="text-sm lg:text-base red-hat text-black font-normal">
                Total Students
              </p>
            </div>
          </div>
          {/* end of a session */}
        </div>
        <div className="w-full flex flex-col lg:flex-row gap-5">
          {/* start of left side */}
          <div className="w-full 2xl:w-10/12 ">
            <StudentList />
            {/* <CallLogs />
            <GuideTour /> */}
          </div>
          {/* end of the left side */}
          {/* right side */}
          <div className="w-full 2xl:w-2/12 hidden 2xl:flex  flex-col gap-6">
            {/* <TopStudents /> */}
            <ProperTeachingTools />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default CoachStudent
