import {useEffect, useState} from 'react'
import { DateInput, DateTimeInput, Input } from '../Input'

import PrimarySelect from '../Selects/PrimarySelect';
import { OutlineBtn, BigButton } from '../Button';
import { useNavigate } from 'react-router-dom';
import ImageUpload from '../UploadFile/ImageUpload';
const LiveClassInformation = ({ setCurrent,setTitle,setDescription,setCoverImageUrl,setDatetime,title,description,coverImageUrl,dateTime,duration,setDuration,type }: any) => {
    const navigate = useNavigate();
    // const [name, setName] = useState<string>("");
    const [desc, setDesc] = useState<string>("");
    // const [date, setDate] = useState<string>("");
    const [image, setImage] = useState<any>("");
    const [classType, setClassType] = useState(0);
      const [time, setTime] = useState({ name: "30mins", value:30 });
    useEffect(() => {
      setDuration(time.value)
    }, [time])
    
console.log(coverImageUrl) 

  return (
    <div className="w-full flex flex-col">
      <h1 className="text-black text-base lg:text-xl font-bold red-hat">
        Live Class Information
      </h1>
      <div className="w-full flex flex-col mt-4">
        <div className="w-full">
          <Input
            label={"Live class name"}
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
            value={description}
          ></textarea>
        </div>
        {/* end */}
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
          <ImageUpload imageUrl={coverImageUrl} setImageUrl={ setCoverImageUrl}
            />
        </div>
        {/* end */}
        <div className="w-full mt-4 lg:w-2/3 grid grid-cols-2 max-w-[435px] h-[36px] rounded-md p-1 bg-[#F4F4F5]">
          <div
            className={`${
              classType === 0
                ? "flex items-center h-full bg-white justify-center text-sm inter font-medium text-foreground  cursor-pointer"
                : "flex items-center justify-center text-foreground text-sm inter cursor-pointer "
            }`}
          >
            Single class
          </div>
          <div
            className={`${
              classType === 1
                ? "flex items-center h-full bg-white justify-center text-sm inter font-medium text-foreground  cursor-pointer"
                : "flex items-center justify-center text-foreground text-sm inter cursor-pointer "
            }`}
          >
            Class series
          </div>
        </div>
        {/* end of class tab */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 mt-4 gap-4 ">
        
          <div className="w-full flex flex-col">
            <label className="text-xs text-foreground font-medium dm-sans mb-2">
              Class Date & Time
            </label>
            <DateTimeInput dateTime={dateTime} setDateTime={setDatetime} />
          </div>
          <div>
            <PrimarySelect
              selected={time}
              setSelected={setTime}
              label="Class time"
              data={[
                { name: "30 mins", value: 30 },
                { name: "1 hour", value: 60 },
              ]}
              name="Select"
            />
          </div>
        </div>
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
            <BigButton name="Continue" onClick={() => setCurrent(2)} />
          </span>
        </div>
      </div>
    </div>
  );
}

export default LiveClassInformation
