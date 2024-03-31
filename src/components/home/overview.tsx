import classIcon from "../../assets/icons/class.svg";
import expenseIcon from "../../assets/icons/expense.svg";
import tutorIcon from "../../assets/icons/tutors.svg";
const Overview = () => {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-3 mt-8 lg:gap-4 gap-4 px-4 lg:px-0 ">
      {/* start of a pack */}
      <div className="w-full bg-primary pattern-bg flex items-center p-6 rounded-[6px] gap-4">
        <span>
          <img src={classIcon} alt="clas" className="w-fit h-auto" />
        </span>
        <div className="flex flex-col gap-1">
          <h1 className="text-white red-had font-bold text-lg lg:text-2xl">
            13
          </h1>
          <p className="text-sm lg:text-base red-hat text-white font-normal">
            Total Classes
          </p>
        </div>
      </div>
      {/* end of a session */}
      {/* start of a pack */}
      <div className="w-full bg-primaryyellow pattern-bg flex items-center p-6 rounded-[6px] gap-4">
        <span>
          <img src={tutorIcon} alt="clas" className="w-fit h-auto" />
        </span>
        <div className="flex flex-col gap-1">
          <h1 className="text-black red-had font-bold text-lg lg:text-2xl">
            13
          </h1>
          <p className="text-sm lg:text-base red-hat text-black font-normal">
            Total Tutors
          </p>
        </div>
      </div>
      {/* end of a session */}
      {/* start of a pack */}
      <div className="w-full bg-black pattern-bg flex items-center p-6 rounded-[6px] gap-4">
        <span>
          <img src={expenseIcon} alt="clas" className="w-fit h-auto" />
        </span>
        <div className="flex flex-col gap-1">
          <h1 className="text-white red-had font-bold text-lg lg:text-2xl">
            $5,000
          </h1>
          <p className="text-sm lg:text-base red-hat text-white font-normal">
            Total Expenditure
          </p>
        </div>
      </div>
      {/* end of a session */}
    </div>
  );
};

export default Overview;
