import {useState} from 'react'
import Radio from '../Radio';
import { Input } from '../Input';
import { BigButton, CapsuleBtn, OutlineBtn } from '../Button';

const PriceAttendees = ({ setCurrent }: any) => {
    const [free, setFree] = useState(true);
    const [limited, setLimited] = useState(true);
    const [price, setPrice] = useState("");
    const [population, setPopulation] = useState("");

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
          <Input label={"Class price"} value={price} setValue={setPrice} height='h-9' />
        </div>
        <div className="w-full mt-4">
          <CapsuleBtn name="Currency" />
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
        <div className="w-full mt-4">
          <Input
            label={"Attendees"}
            value={population}
                      setValue={setPopulation}
                      height='h-9'
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
}

export default PriceAttendees
