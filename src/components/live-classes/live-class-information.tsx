import {useEffect, useState} from 'react'
import { DateTimeInput, Input } from '../Input'

import PrimarySelect from '../Selects/PrimarySelect';
import { OutlineBtn, BigButton, CapsuleBtn } from '../Button';
import { useLocation, useNavigate } from 'react-router-dom';
import ImageUpload from '../UploadFile/ImageUpload';
const LiveClassInformation = ({ setCurrent,setTitle,setDescription,setCoverImageUrl,setDatetime,title,description,coverImageUrl,dateTime,duration,setDuration,type, seriesCount,setSeriesCount, cost, setCost, liveDateTimes,setLiveDateTimes, setCostType, handleCreate, langTag, setLangTag, loading }: any) => {
  const navigate = useNavigate();
    const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

    const _type = queryParams.get("type"); 
    // const [name, setName] = useState<string>("");
    const [desc, setDesc] = useState<string>("");
    // const [date, setDate] = useState<string>("");
    const [image, setImage] = useState<any>("");
    const [classType, setClassType] = useState(0);
  const [time, setTime] = useState({ name: "30mins", value: 30 });
    const [price, setPrice] = useState<number>(0);
    useEffect(() => {
      setDuration(time.value)
    }, [time]) 
  
  
  
  useEffect(() => {
  if (_type === "ONE_MONTHLY") {

      setCost({ currency: "NGN", amount: Number(price) });
    }
    if (Number(price) === 0 && _type === "ONE_MONTHLY") {
      setCostType( "FREE")
    }
  }, [price, seriesCount]);
    const addNewTime = () => {
      setLiveDateTimes([...liveDateTimes, ""]);
    };

    // Update a specific date-time value
    const updateDateTime = (index: number, newDateTime: string) => {
      const updatedDateTimes = [...liveDateTimes];
      updatedDateTimes[index] = newDateTime;
      setLiveDateTimes(updatedDateTimes);
    };

  return (
    <div className="w-full flex flex-col ">
      <h1 className="text-black text-base lg:text-xl font-bold red-hat">
        Class Information
      </h1>
      <div className="w-full flex flex-col mt-4">
        <div className="w-full">
          <Input
            label={" Class name"}
            height="h-9"
            value={title}
            setValue={setTitle}
          />
        </div>
        {/* start */}
        <div className="w-full mt-4 flex flex-col">
          <label className="text-xs text-foreground font-medium dm-sans mb-2">
            Description
          </label>
          <textarea
            id=""
            className="min-h-20 rounded-[4px] px-3 py-[15px] flex items-center border border-[#E0E0E0] outline-none placeholder:text-black placeholder:text-opacity-50 bg-transparent focus:bg-transparent placeholder:text-sm text-black text-sm "
            placeholder="type message here"
            onChange={(e) => setDescription(e.target.value)}
            maxLength={250}
            value={description}
          ></textarea>
        </div>
        {/* end */}
        <div className="w-full mt-6">
          <Input
            label={"Language Tag"}
            height="h-9"
            value={langTag}
            setValue={setLangTag}
          />
        </div>
        {/* start */}
        <div className="w-full mt-4 flex flex-col">
          <label className="text-xs text-foreground font-medium dm-sans mb-2">
            Cover Image
          </label>
          {/* <textarea
            id=""
            className="min-h-20 rounded-[4px] px-3 py-[15px] flex items-center border border-[#E0E0E0] outline-none placeholder:text-black placeholder:text-opacity-50 bg-transparent focus:bg-transparent placeholder:text-sm text-black text-sm "
            placeholder="type message here"
            onChange={(e) => setCoverImageUrl(e.target.value)}
            value={coverImageUrl}
          ></textarea> */}
          <ImageUpload
            imageUrl={coverImageUrl}
            setImageUrl={setCoverImageUrl}
          />
        </div>
        {/* end */}
        {_type === "ONE_TIME" && (
          <div className="mt-6">
            <PrimarySelect
              selected={time}
              setSelected={setTime}
              label="Class Duration"
              data={[
                { name: "30 mins", value: 30 },
                { name: "60 mins", value: 60 },
              ]}
              name="Select"
            />
          </div>
        )}
        {_type === "ONE_MONTHLY" && (
          <div className="mt-6 flex-col">
            {/* <PrimarySelect
              selected={time}
              setSelected={setTime}
              label="Class Duration"
              data={[
                { name: "30 mins", value: 30 },
                { name: "60 mins", value: 60 },
              ]}
              name="Select"
            /> */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-3 mt-4 gap-4 ">
              <div>
                <PrimarySelect
                  selected={seriesCount}
                  setSelected={setSeriesCount}
                  label="Classes per month"
                  data={[
                    { name: "single class", value: 1 },
                    { name: "4 classes", value: 4 },
                    { name: "8 classes", value: 8 },
                    { name: "12 classes", value: 12 },
                  ]}
                  name="Select"
                />
              </div>
              <div>
                <PrimarySelect
                  selected={time}
                  setSelected={setTime}
                  label="Duration"
                  data={[
                    { name: "30 mins", value: 30 },
                    { name: "1 hour", value: 60 },
                  ]}
                  name="Select"
                />
              </div>
              <div>
                <Input
                  label={"Cost"}
                  height="h-9"
                  value={price}
                  setValue={setPrice}
                  type="number"
                />
              </div>
            </div>
          </div>
        )}
        {_type === "LIVE_GROUP" && (
          <div className="mt-6">
            <PrimarySelect
              selected={time}
              setSelected={setTime}
              label="Class Duration"
              data={[
                { name: "30 mins", value: 30 },
                { name: "60 mins", value: 60 },
              ]}
              name="Select"
            />
          </div>
        )}

        {_type === "LIVE_GROUP" && (
          <div className="w-full flex flex-col">
            <div className=" mt-6   w-fit">
              {/* <div
                className={`${
                  classType === 1
                    ? "flex items-center h-full bg-white justify-center text-sm inter font-medium text-foreground  cursor-pointer"
                    : "flex items-center justify-center text-foreground text-sm inter cursor-pointer "
                }`}
              >
                Single class
              </div> */}
              <div
                className={`${
                  classType === 0
                    ? "flex items-center h-full bg-white justify-center text-sm inter font-medium text-foreground  cursor-pointer"
                    : "flex items-center justify-center text-foreground text-sm inter cursor-pointer "
                }`}
              >
                Class series
              </div>
            </div>
            <div className="flex flex-col mt-6 gap-4">
              {liveDateTimes.map((dateTime: string, index: number) => (
                <DateTimeInput
                  key={index}
                  dateTime={dateTime}
                  setDateTime={(newDateTime) =>
                    updateDateTime(index, newDateTime)
                  }
                />
              ))}
            </div>
            <div className="w-fit mt-6">
              <CapsuleBtn name=" Add a session" onClick={addNewTime} />
            </div>
          </div>
        )}

        {/* <div className="w-full flex flex-col">
          <label className="text-xs text-foreground font-medium dm-sans mb-2">
            Class Date & Time
          </label>
          <DateTimeInput dateTime={dateTime} setDateTime={setDatetime} />
        </div> */}
        {/* <div className="w-full mt-4">
          <PrimarySelect
            selected={duration}
            setSelected={setDuration}
            label="Class duration"
            data={[{ name: "30 mins" }, { name: "1 hour" }]}
            name="Select"
          />
        </div> */}

        <div className="flex gap-3 items-center mt-8 justify-end">
          <span>
            <OutlineBtn name="Discard changes" onClick={() => navigate(-1)} />
          </span>
          <span>
            <BigButton
              name="Continue"
              loading={loading}
              disabled={loading}
              altText='Loading'
              onClick={() => {
                if (_type === "ONE_MONTHLY") {
                  handleCreate();
                } else {
                  setCurrent(2);
                }
              }}
            />
          </span>
        </div>
      </div>
    </div>
  );
}

export default LiveClassInformation
