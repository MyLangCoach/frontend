import {useEffect, useState} from 'react'
import LiveClassInformation from './live-class-information';
import PriceAttendees from './price-and-attendees';
import LocationSettings from './location-and-settings';
import { Cost } from '../../util/types';
import { useAppDispatch,useAppSelector } from '../../app/hooks';
import { createOffering, restoreDefault } from '../../features/offeringslice';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
type OfferingData = {
  title: string;
  description: string;
  coverImageUrl: string;
  type: string | null;
  duration: number;
  isFree: boolean;
  languageTag: string;
  cost: Cost;
  questionAndAnswer: { question: string; answer: string }[];
  seriesCount: number;
  redirectLink: string;
  liveDateTimes?: any[]; // Use the appropriate type instead of `any[]`
  attendantType?: string; // Use the appropriate type
  numOfAttendees?: number;
};
const CreateClassHome = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type"); 

  const [current, setCurrent] = useState(1);
  const offering = useAppSelector(state => state.offerings);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [coverImageUrl, setCoverImageUrl] = useState<string>("");
  // const [type, setType] = useState<"ONE_TIME" | "RECURRING">("ONE_TIME");
  const [seriesCount, setSeriesCount] = useState({name:"Select", value:1})
    const [duration, setDuration] = useState<number>(30);
    const [costType, setCostType] = useState<"FREE" | "PAID" | any>("");
    const [cost, setCost] = useState<Cost>({ currency: "NGN", amount: 0 });
    const [attendantType, setAttendantType] = useState<"LIMITED" | "UNLIMITED">(
      "LIMITED"
    );
  const [datetime, setDatetime] = useState<string>("");

    const [liveDateTimes, setLiveDateTimes] = useState<string[]>([""]);
  const [numOfAttendees, setNumOfAttendees] = useState<number>(1);
  const [redirectUrl, setRedirectUrl] = useState<string>("example.com");

  const handleCreate = () => {
    const data: OfferingData = {
      title: title,
      description: description,
      coverImageUrl: coverImageUrl,
      type: type,
      duration: Number(duration),
      languageTag:"English",
      isFree: costType === "FREE" && cost?.amount === 0 ? true : false,
      cost: cost,

      questionAndAnswer: [
        {
          question: "How do you learn German?",
          answer: "By booking my German offering",
        },
      ],
      // numOfAttendees: Number(numOfAttendees),
      seriesCount:
        type === "LIVE_GROUP" ? liveDateTimes?.length : seriesCount?.value,
      redirectLink: redirectUrl,
    };
      if (type === "LIVE_GROUP") {
        data.liveDateTimes = liveDateTimes;
        data.attendantType = attendantType;
        data.numOfAttendees = Number(numOfAttendees);
    }
      if (type === "ONE_MONTHLY") {
    
        data.attendantType = attendantType;
        data.numOfAttendees = Number(numOfAttendees);
    }

    
  // console.log({data})
    dispatch(createOffering(data))

    

  }

// useEffect(() => {
//      const isFree = type === "ONE_TIME" ? "FREE" : "PAID";
//      setCostType(isFree);
// }, [])

  useEffect(() => {
  const isFree = type === "ONE_TIME" ? "FREE" : "PAID";
  setCostType(isFree);
    if (offering?.createOfferingSuccess) {
      toast.success("offering created successfully");
      dispatch(restoreDefault());
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
               Class information
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
        
          <span
            className={` w-[32px] min-w-[32px] max-w-[32px] min-h-[32px] h-[32px] max-h-[32px] flex items-center justify-center rounded-full text-white red-hat ${
              current >= 3 ? "bg-primary" : "bg-inactive"
            }`}
          >
            3
          </span>
         
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
        {current === 1 && (
          <LiveClassInformation
            setCurrent={setCurrent}
            setTitle={setTitle}
            title={title}
            setDescription={setDescription}
            description={description}
            coverImageUrl={coverImageUrl}
            duration={duration}
            dateTime={datetime}
            setCostType={setCostType}
            setCoverImageUrl={setCoverImageUrl}
            setDuration={setDuration}
            setDatetime={setDatetime}
            type={type}
            seriesCount={seriesCount}
            setSeriesCount={setSeriesCount}
            cost={cost}
            setCost={setCost}
            setLiveDateTimes={setLiveDateTimes}
            liveDateTimes={liveDateTimes}
          />
        )}
        {current === 2 && (
          <PriceAttendees
            setCurrent={setCurrent}
            cost={cost}
            setCost={setCost}
            attendantType={attendantType}
            setAttendantType={setAttendantType}
            numOfAttendees={numOfAttendees}
            setNumOfAttendees={setNumOfAttendees}
            setCostType={setCostType}
            type={type}
            handleCreate={handleCreate}
            loading={offering?.loading}
          />
        )}
        {current === 3 && (
          <LocationSettings
            setCurrent={setCurrent}
            handleCreate={handleCreate}
            loading={offering?.loading}
            redirectUrl={redirectUrl}
            setRedirectUrl={setRedirectUrl}
          />
        )}
      </div>
    </div>
  );
}

export default CreateClassHome
