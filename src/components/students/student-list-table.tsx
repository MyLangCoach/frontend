import {useEffect} from 'react'
import filterIcon from "../../assets/png/caret-sort.png";
import { PlusCircle, CancelIcon, ExportIcon, OptionsIcon } from '../../assets';
import { transactionDummy, studentDummy } from '../../util/mockdata';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import LoadingComponent from '../Loaders/skeleton-loading';
import { getAllMyStudent } from '../../features/auth/authSlice';
const StudentList = () => {

  const dispatch = useAppDispatch();
  const auth = useAppSelector(state => state.auth);

useEffect(() => {
  dispatch(getAllMyStudent());
}, [])

  if (auth?.fetchLoading) {
    return (
      <div>
        <LoadingComponent />
      </div>
    )
  }
  return (
    <div className="w-full bg-white py-6 px-3 flex flex-col">
      <h1 className="text-black font-bold  red-hat text-base lg:text-[19px]">
        All Students ({auth?.allMyStudent?.length})
      </h1>
      <div className="w-full flex items-center mt-2 gap-3">
        {/* input */}
        <div className="w-full lg:w-4/12 max-w-[400px]">
          <input
            type="text"
            className="lg:min-w-[200px] h-[36px] outline-none flex items-center px-3  rounded-md border-[#E4E4E7] border input-shadow w-full placeholder:text-muted text-sm inter  "
            placeholder="Filter student"
          />
        </div>
        {/* end of input */}

        {/* new service */}

        {/* end of new service */}
      </div>
      <div className="w-full mt-5 flow-hide-x">
        <table className="w-full table-fixed min-w-max border border-border rounded-[4px]">
          <th className="w-full grid grid-cols-5 h-[40px] border-b border-b-border px-2 ">
            <td className="flex items-center gap-3 w-full ">
              <input
                type="checkbox"
                name=""
                id=""
                className="accent-black  w-4 h-4 rounded-md "
              />
              <p className="text-muted text-sm inter font-medium">Name</p>
            </td>
            <td className="flex items-center gap-3 w-full ">
              <p className="text-muted text-sm inter font-medium">Email</p>
              <span>
                <img src={filterIcon} alt="filter" />
              </span>
            </td>
            <td className=" flex items-center gap-3 w-full">
              <p className="text-muted text-sm inter font-medium">Gender</p>
              <span>
                <img src={filterIcon} alt="filter" />
              </span>
            </td>
            <td className=" flex items-center gap-3 w-full">
              <p className="text-muted text-sm inter font-medium">
                Language Interests
              </p>
              <span>
                <img src={filterIcon} alt="filter" />
              </span>
            </td>
            <td className=" flex items-center gap-3 w-full">
              <p className="text-muted text-sm inter font-medium"></p>
            </td>
          </th>
          <tbody className="w-full flex flex-col">
            {auth?.allMyStudent?.map((item: any, index: number) => {
              return (
                <tr
                  key={index}
                  className="grid grid-cols-5 px-2 border-b-border border-b last:border-none min-h-[68px] "
                >
                  <td className="w-full flex items-center gap-3">
                    <span>
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        className="accent-black  w-4 h-4 rounded-md "
                      />
                    </span>
                    <div className="flex flex-col gap-[10px]">
                      <h1 className="text-foreground font-normal text-sm truncate inter">
                        {item?.firstName} <span>{item?.lastName} </span>
                      </h1>
                    </div>
                  </td>
                  <td className="w-full flex items-center">
                    <p
                      className={`text-foreground  capitalize font-normal text-sm truncate inter `}
                    >
                      {item?.email}
                    </p>
                  </td>
                  <td className="w-full flex items-center gap-[10px] ">
                    <p className="text-foreground font-normal text-sm truncate inter">
                      {item?.gender}
                    </p>
                  </td>
                  <td className="flex items-center">
                    {item?.languageInterests?.map(
                      (lang: any, index: number) => (
                        <p
                          className=" text-foreground font-normal text-sm truncate inter "
                          key={index}
                        >
                          {lang}
                        </p>
                      )
                    )}
                  </td>
                  <td className="flex items-center">
                    <span>
                      <OptionsIcon />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentList
