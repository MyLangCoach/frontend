import {useEffect, useState} from 'react'
import Radio from '../Radio';
import { Input } from '../Input';
import { BigButton, CapsuleBtn, OutlineBtn } from '../Button';
import PrimarySelect from '../Selects/PrimarySelect';

const PriceAttendees = ({
  setCurrent,
  cost,
  setCost,
  attendantType,
  setAttendantType,
  numOfAttendees,
  setNumOfAttendees,
  setCostType,setType
}: any) => {
  const [free, setFree] = useState(true);
  const [limited, setLimited] = useState(true);
  const [price, setPrice] = useState<number>(0);
  const [population, setPopulation] = useState("");
  const [classType,setClassType] = useState({name:"ONE TIME",value:"ONE_TIME"})
  useEffect(() => {
    if (free) {
      setCostType("FREE")
    }
    else setCostType("PAID")
    if (limited) {
      setAttendantType("LIMITED")
    }
    else {
       setAttendantType("UNLIMITED");
    }
  }, [free,attendantType])
  useEffect(() => {
  setCost({currency:"NGN", amount:price})
  }, [price])

  useEffect(() => {
    setType(classType?.value)
  }, [classType])
  

  return (
    <div className="w-full flex flex-col">
      <h1 className="text-black text-base lg:text-xl font-bold red-hat">
        Price and Attendees
      </h1>
      <div className="w-full mt-4 flex flex-col">
        <label className="text-sm text-foreground font-medium dm-sans mb-2">
          Cost
        </label>
        <div className="flex items-center gap-10">
          <span className="flex gap-2 items-center">
            <Radio active={free} onClick={() => setFree(!free)} />
            <p className="text-sm text-foreground font-medium dm-sans"> Free</p>
          </span>
          <span className="flex gap-2 items-center">
            <Radio active={!free} onClick={() => setFree(!free)} />
            <p className="text-sm text-foreground font-medium dm-sans"> Paid</p>
          </span>
        </div>
        <div className="w-full mt-4">
          <Input
            label={"Class price (NGN)"}
            value={price}
            setValue={setPrice}
            height="h-9"
            type="number"
          />
        </div>

        <div className="w-full mt-4 flex flex-col">
          <label className="text-sm text-foreground font-medium dm-sans mb-2">
            Number of Attendees
          </label>
          <div className="flex items-center gap-10">
            <span className="flex gap-2 items-center">
              <Radio active={limited} onClick={() => setLimited(!limited)} />
              <p className="text-sm text-foreground font-medium dm-sans">
                {" "}
                Limited{" "}
              </p>
            </span>
            <span className="flex gap-2 items-center">
              <Radio active={!limited} onClick={() => setLimited(!limited)} />
              <p className="text-sm text-foreground font-medium dm-sans">
                {" "}
                Unlimited
              </p>
            </span>
          </div>
        </div>
        <div className="w-full mt-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Input
            label={"Attendees"}
            value={numOfAttendees}
            setValue={setNumOfAttendees}
            height="h-9"
            type="number"
          />
          <PrimarySelect
            selected={classType}
            setSelected={setClassType}
            label="Class time"
            data={[
              { name: "ONE TIME", value: "ONE_TIME" },
              { name: "RECURRING", value: "RECURRING" },
            ]}
            name="Select"
          />
        </div>
        <div className="flex gap-3 items-center mt-8 justify-end">
          <span>
            <OutlineBtn name="Discard changes" onClick={() => setCurrent(1)} />
          </span>
          <span>
            <BigButton name="Continue" onClick={() => setCurrent(3)} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default PriceAttendees
