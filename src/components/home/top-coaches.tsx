import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { EmptyStudent, StarOne, StarThree, StarTwo } from "../../assets";
import avatar from "../../assets/png/Avatar.png"
import { getAllMyStudent } from "../../features/auth/authSlice";
import LoadingComponent from "../Loaders/skeleton-loading";
const TopCoaches = () => {
  
     const dispatch = useAppDispatch();
     const auth = useAppSelector((state) => state.auth);

     useEffect(() => {
       dispatch(getAllMyStudent());
     }, []);
  const topstudents = auth?.allMyStudent;
  console.log(topstudents)
    if (auth?.fetchLoading) {
      return (
        <div>
          <LoadingComponent />
        </div>
      );
  }
  
  return (
    <div className="w-full flex flex-col rounded-md bg-white p-4 ">
      <p className="lg:text-xl text-base font-bold red-hat text-[#333] ">
        Top Students
      </p>
      {topstudents?.length === 0 && (
        <div className="w-full h-[136px] flex flex-col items-center justify-center">
          <span>
            <EmptyStudent />
          </span>
          <p className="text-center mt-3 text-sm red-hat font-semibold">
            No top students yet!
          </p>
          <p className="text-center mt-3 text-xs red-hat text-[#838384] lg:max-w-[218px]">
            Sorry you don’t have any top students yet. they will pile up here.
          </p>
        </div>
      )}
      {topstudents?.slice(0.3)?.map((item: any, index: number) => (
        <div className="mt-6 w-full rounded-md px-3 py-2 border border-[#E4E4E7] flex items-center justify-between gap-2  ">
          <div className="flex items-center gap-3 w-9/12 flex-grow">
            <img
              src={item?.profileImage ?? avatar}
              alt="avart"
              className="w-[40px] h-[40px] rounded-full "
            />
            <div className="flex flex-col">
              <h1 className="font-medium text-base lg:text-lg inter truncate ">
                {item?.firstName} {item?.lastName}
              </h1>
            
            </div>
          </div>
          {index === 0 && (
            <div className="flex px-2 w-3/12">
              <span>
                <StarOne />
              </span>
            </div>
          )}
          {index === 1 && (
            <div className="flex px-2">
              <span>
                <StarTwo />
              </span>
            </div>
          )}
          {index === 2 && (
            <div className="flex px-2">
              <span>
                <StarThree />
              </span>
            </div>
          )}
        </div>
      ))}
      {/* start of an item */}

      {/* end of an item */}
    </div>
  );
};

export default TopCoaches;
