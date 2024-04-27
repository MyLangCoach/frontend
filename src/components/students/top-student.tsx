import { StarOne, StarThree, StarTwo } from "../../assets";
import avatar from "../../assets/png/Avatar.png";
const TopStudents = () => {
  return (
    <div className="w-full flex flex-col rounded-md bg-white p-4 ">
      <p className="lg:text-xl text-base font-bold red-hat text-[#333] ">
        Today
      </p>
      {/* start of an item */}
      <div className="mt-6 w-full rounded-md px-3 py-2 border border-[#E4E4E7] flex items-center justify-between  ">
        <div className="flex items-center gap-3">
          <img
            src={avatar}
            alt="avart"
            className="w-[40px] h-[40px] rounded-full "
          />
          <div className="flex flex-col">
            <h1 className="font-semibold text-base lg:text-xl inter ">
              Godspower E.
            </h1>
            <p className="text-muted text-xs  lg:text-sm ">
              Attendance rate: 98%
            </p>
          </div>
        </div>
        <div className="flex">
          <span>
            <StarOne />
          </span>
        </div>
      </div>
      {/* end of an item */}
      {/* start of an item */}
      <div className="mt-4 w-full rounded-md px-3 py-2 border border-[#E4E4E7] flex items-center justify-between  ">
        <div className="flex items-center gap-3">
          <img
            src={avatar}
            alt="avart"
            className="w-[40px] h-[40px] rounded-full "
          />
          <div className="flex flex-col">
            <h1 className="font-semibold text-base lg:text-xl inter ">
              Godspower E.
            </h1>
            <p className="text-muted text-xs  lg:text-sm ">
              Attendance rate: 98%
            </p>
          </div>
        </div>
        <div className="flex">
          <span>
            <StarTwo />
          </span>
        </div>
      </div>
      {/* end of an item */}
      {/* start of an item */}
      <div className="mt-4 w-full rounded-md px-3 py-2 border border-[#E4E4E7] flex items-center justify-between  ">
        <div className="flex items-center gap-3">
          <img
            src={avatar}
            alt="avart"
            className="w-[40px] h-[40px] rounded-full "
          />
          <div className="flex flex-col">
            <h1 className="font-semibold text-base lg:text-xl inter ">
              Godspower E.
            </h1>
            <p className="text-muted text-xs  lg:text-sm ">
              Attendance rate: 98%
            </p>
          </div>
        </div>
        <div className="flex">
          <span>
            <StarThree />
          </span>
        </div>
      </div>
      {/* end of an item */}
    </div>
  );
};

export default TopStudents;
