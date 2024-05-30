import { useState,useEffect } from 'react'
import { useAppDispatch,useAppSelector } from '../../app/hooks';
import { CancelIcon, Plus, PlusCircle,  } from '../../assets';
import filterIcon from "../../assets/png/caret-sort.png";
import { OfferingsDummy } from '../../util/mockdata';
import CreateNewServiceModal from './create-new-service-modal';
import { getAllOfferings } from '../../features/offeringslice';
import LoadingComponent from '../Loaders/skeleton-loading';
const OfferingsTable = () => {
  const offerings = useAppSelector(state => state.offerings);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllOfferings())
  }, [])
  

  const allOfferings = offerings?.allOfferings?.offerings;
  console.log(allOfferings)
  const [open, setOpen] = useState(false);

  if (offerings?.fetchLoading) {
    return (
      <div>
        <LoadingComponent />
      </div>
    )
  }
  
  return (
    <div className="w-full bg-white py-6 px-3 flex flex-col">
      <h1 className="text-black font-bold  red-hat text-base lg:text-[19px]">
        Offerings
      </h1>
      <div className="w-full flex items-center mt-2 gap-3">
        {/* input */}
        <div className="w-4/12">
          <input
            type="text"
            className="lg:min-w-[200px] h-[36px] outline-none flex items-center px-3 rounded-md border-[#E4E4E7] border input-shadow w-full placeholder:text-muted text-sm inter  "
            placeholder="Filter Classes"
          />
        </div>
        {/* end of input */}

        {/* duration */}
        {/* <div className="w-3/12 h-[36px] flex items-center rounded-md border-dotted border border-[#E4E4E7] px-3 justify-center gap-2 ">
          <div className="flex items-center gap-3 border-r border-r-[#e4e4e7] pr-3">
            <span>
              <PlusCircle />
            </span>
            <p className="text-sm font-medium inter text-[#18181B] ">
              Duration
            </p>
          </div>
          <div className="flex bg-[#F4F4F5] px-1 py-[2px] rounded-sm gap-[10px] text-xs text-[#09090B] ">
            3 Selected
          </div>
        </div> */}
        {/* end of duration */}
        {/* reset */}
        {/* <div className="w-2/12 gap-3 flex items-center h-[36px] justify-center cursor-pointer">
          <span className="text-foreground text-sm inter font-medium">
            Reset
          </span>
          <CancelIcon />
        </div> */}
        {/* end reset */}
        {/* new service */}
        <div className="w-3/12 rounded-md h-[36px] px-4 flex justify-center items-center gap-2 border border-[#E4E4E7] cursor-pointer" onClick={() => setOpen(true)}>
          <span>
            <Plus />
          </span>
          <span className="text-foreground text-sm inter font-medium">
            Add new service
          </span>
        </div>
        {/* end of new service */}
      </div>
      <div className="w-full mt-5">
        <table className="w-full border border-border rounded-[4px]">
          <th className="w-full grid grid-cols-3 h-[40px] border-b border-b-border px-2 ">
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
              <p className="text-muted text-sm inter font-medium">Price</p>
              <span>
                <img src={filterIcon} alt="filter" />
              </span>
            </td>
            <td className=" flex items-center gap-3 w-full">
              <p className="text-muted text-sm inter font-medium">Duration</p>
              <span>
                <img src={filterIcon} alt="filter" />
              </span>
            </td>
          </th>
          <tbody className="w-full flex flex-col">
            {allOfferings?.map((item:any, index:number) => {
              return (
                <tr
                  key={index}
                  className="grid grid-cols-3 px-2 border-b-border border-b last:border-none min-h-[68px] "
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
                        {item?.title}
                      </h1>
                      <p className=" rounded-[4px] px-[6px] bg-lemonGreen text-xs inter text-foreground py-[2px] w-fit ">
                        Active
                      </p>
                    </div>
                  </td>
                  <td className="w-full flex items-center">
                    <p className="text-foreground font-normal text-sm truncate inter">
                      {item?.costType === "FREE" ? "FREE" : item?.cost?.amount}
                    </p>
                  </td>
                  <td className="w-full flex flex-col gap-[10px] justify-center">
                    <p className="text-foreground font-normal text-sm truncate inter">
                      {item?.duration === 30 ? "30 MINS":"60 MINS"}
                    </p>
                    <p className=" rounded-[4px] px-[6px] bg-fadeBG text-xs inter text-foreground py-[2px] w-fit ">
                      {item?.type}
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <CreateNewServiceModal open={open} setOpen={setOpen} />
    </div>
  );
}

export default OfferingsTable
