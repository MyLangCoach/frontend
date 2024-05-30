import {useEffect, useState} from 'react'
import LiveClassInformation from './live-class-information';
import PriceAttendees from './price-and-attendees';
import LocationSettings from './location-and-settings';
import { Cost } from '../../util/types';
import { useAppDispatch,useAppSelector } from '../../app/hooks';
import { createOffering } from '../../features/offeringslice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const CreateClassHome = () => {
  const [current, setCurrent] = useState(1);
  const offering = useAppSelector(state => state.offerings);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [coverImageUrl, setCoverImageUrl] = useState<string>("");
    const [type, setType] = useState<"ONE_TIME" | "RECURRING">("ONE_TIME");
    const [duration, setDuration] = useState<number>(30);
    const [costType, setCostType] = useState<"FREE" | "PAID">("FREE");
    const [cost, setCost] = useState<Cost>({ currency: "NGN", amount: 1200 });
    const [attendantType, setAttendantType] = useState<"LIMITED" | "UNLIMITED">(
      "LIMITED"
    );
    const [datetime, setDatetime] = useState<string>("");
    const [numOfAttendees, setNumOfAttendees] = useState<number>(0);

  const handleCreate = () => {
    const data = {
      title: title,
      description: description,
      coverImageUrl: coverImageUrl,
      type: type,
      duration: Number(duration),
      costType: costType,
      cost: cost,
      attendantType: attendantType,
    
      numOfAttendees: Number(numOfAttendees),
    };

    dispatch(createOffering(data))
    

  }

  useEffect(() => {
    if (offering?.createOfferingSuccess) {
      toast.success("offering created successfully");
      navigate("/live-classes")
    }
  }, [offering?.createOfferingSuccess])
  

  return (
    <div className="w-full flex   bg-white rounded-md lg:p-12 flex-col lg:flex-row">
      <div className="w-full lg:w-1/3 flex flex-col">
        {/* start of tab mode */}
        <div className="w-full flex items-start gap-5">
          {/* number side */}
          <span className="bg-primary w-[32px] min-w-[32px] max-w-[32px] min-h-[32px] h-[32px] max-h-[32px] flex items-center justify-center rounded-full text-white red-hat">
            1
          </span>
          {/* text side */}
          <div className="flex flex-col">
            <p className="text-sm lg:text-base font-semibold red-hat text-black">
              Live class information
            </p>

            <p className="text-xs lg:text-sm  red-hat text-black">
              Step Description
            </p>
            <p></p>
          </div>
        </div>
        {/* end of a single tab */}
        {/* start of a line */}
        <div className="w-[2px] h-[41px] ml-4 mt-[-12px] bg-primary"></div>
        {/* end of a line */}
        {/* start of tab mode */}
        <div className="w-full flex items-start gap-5">
          {/* number side */}
          <span
            className={` w-[32px] min-w-[32px] max-w-[32px] min-h-[32px] h-[32px] max-h-[32px] flex items-center justify-center rounded-full text-white red-hat ${
              current >= 2 ? "bg-primary" : "bg-inactive"
            }`}
          >
            2
          </span>
          {/* text side */}
          <div className="flex flex-col">
            <p className="text-sm lg:text-base font-semibold red-hat text-black">
              Price and Attendees
            </p>

            <p className="text-xs lg:text-sm  red-hat text-black">
              Step Description
            </p>
            <p></p>
          </div>
        </div>
        {/* end of a single tab */}
        {/* start of a line */}
        <div
          className={`w-[2px] h-[41px] ml-4 mt-[-12px] ${
            current >= 2 ? "bg-primary" : "bg-inactive"
          }`}
        ></div>
        {/* end of a line */}
        {/* start of tab mode */}
        <div className="w-full flex items-start gap-5">
          {/* number side */}
          <span
            className={` w-[32px] min-w-[32px] max-w-[32px] min-h-[32px] h-[32px] max-h-[32px] flex items-center justify-center rounded-full text-white red-hat ${
              current >= 3 ? "bg-primary" : "bg-inactive"
            }`}
          >
            3
          </span>
          {/* text side */}
          <div className="flex flex-col">
            <p className="text-sm lg:text-base font-semibold red-hat text-black">
              Location and Settings
            </p>

            <p className="text-xs lg:text-sm  red-hat text-black">
              Step Description
            </p>
            <p></p>
          </div>
        </div>
        {/* end of a single tab */}

        {/* end of tab mode */}
      </div>
          <div className="w-full lg:w-2/3">
        {current === 1 && <LiveClassInformation setCurrent={setCurrent} setTitle={setTitle} title={title}
          setDescription={setDescription} description={description}
          coverImageUrl={coverImageUrl} 
          duration={duration}
          dateTime={datetime}
          setCoverImageUrl={setCoverImageUrl} setDuration={setDuration} setDatetime={setDatetime} />}
              {  current === 2 && <PriceAttendees setCurrent={setCurrent}  cost={cost}
  setCost={setCost}
  attendantType={attendantType}
  setAttendantType={setAttendantType}
  numOfAttendees={numOfAttendees}
  setNumOfAttendees={setNumOfAttendees} setCostType={setCostType} setType={setType}  />}
        {current === 3 && <LocationSettings setCurrent={setCurrent} handleCreate={handleCreate} loading={offering?.loading} />}
        
      </div>
    </div>
  );
}

export default CreateClassHome
