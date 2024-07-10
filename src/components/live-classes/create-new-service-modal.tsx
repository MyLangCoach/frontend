import { Dispatch,  SetStateAction, useState } from 'react'
import ReUseModal from '../modal/Modal';
import { LightCancel, MontlyIcon } from '../../assets';
import call from "../../assets/icons/call-icon.svg";
import bundle from "../../assets/icons/bundle-icon.svg"
import { Button, OutlineBtn } from '../Button';
import { useNavigate } from 'react-router-dom';
interface NewServiceProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
 
}
const CreateNewServiceModal = ({ open, setOpen }: NewServiceProps) => {
  const [selected, setSelected] = useState<number>(0);
  const navigate = useNavigate();
  return (
    <div>
      <ReUseModal
        open={open}
        width="sm:max-w-md lg:max-w-[718px] lg:min-w-[718px]   sm:w-full"
        setOpen={setOpen}
      >
        <div className="w-full flex flex-col">
          <div className="flex justify-end w-full">
            <span className="cursor-pointer" onClick={() => setOpen(false)}>
              <LightCancel />
            </span>
          </div>
          <div className="w-full lg:w-11/12 mx-auto flex flex-col">
            <h2 className="lg:text-[19px] text-base red-hat font-bold text-black lg:leading-[23px]">
              Create a New Service
            </h2>
            <p className="mt-6 red-hat lg:text-base text-sm text-black">
              Create a new 1:1 call service, choose between a one off call or a
              bundle of calls with your customers.
            </p>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 w-full gap-4">
              {/* start */}
              <div
                onClick={() => setSelected(1)}
                className={`w-full hover:border-[1.5px]  hover:border-primary border border-border rounded-[8px] flex flex-col gap-4 p-4 lg:p-6 cursor-pointer ${
                  selected === 1
                    ? "border-[1.5px] border-primary"
                    : "border border-border"
                }`}
              >
                <span>
                  <img src={call} alt="call" />
                </span>
                <h1 className="text-foreground inter font-semibold lg:text-lg text-base ">
                  1:1 Session
                </h1>
                <p className="text-sm text-muted inter">
                  One time one to one class with your student, perfect for
                  initial consultations.
                </p>
              </div>
              {/* end */}
              {/* start */}
              <div
                onClick={() => setSelected(2)}
                className={`w-full hover:border-[1.5px] hover:border-primary border border-border rounded-[8px] flex flex-col gap-4 p-4 lg:p-6 cursor-pointer ${
                  selected === 2
                    ? "border-[1.5px] border-primary"
                    : "border border-border"
                }`}
              >
                <span>
                  <MontlyIcon />
                </span>
                <h1 className="text-foreground inter font-semibold lg:text-lg text-base ">
                  1:1 Monthly
                </h1>
                <p className="text-sm text-muted inter">
                  One to one call with your student, perfect for monthly
                  engagements.
                </p>
              </div>
              {/* end */}
              {/* start */}
              <div
                onClick={() => setSelected(3)}
                className={`w-full hover:border-[1.5px] hover:border-primary border border-border rounded-[8px] flex flex-col gap-4 p-4 lg:p-6 cursor-pointer ${
                  selected === 3
                    ? "border-[1.5px] border-primary"
                    : "border border-border"
                }`}
              >
                <span>
                  <img src={bundle} alt="call" />
                </span>
                <h1 className="text-foreground inter font-semibold lg:text-lg text-base ">
                  Life group class
                </h1>
                <p className="text-sm text-muted inter">
                  Limited or Unlimited live group classes with students, perfect
                  for running sessions and masterclass.
                </p>
              </div>
              {/* end */}
            </div>
            <div className="flex justify-end mt-8 gap-4 items-center">
              <OutlineBtn
                name="Cancel"
                className="min-w-[107px]"
                onClick={() => setOpen(false)}
              />

              <Button
                name="Continue"
                height="h-[49px]"
                className="min-w-[107px]"
                onClick={() => {
                  selected === 1 && navigate("/create-new-class?type=ONE_TIME");
                  selected === 2 && navigate("/create-new-class?type=ONE_MONTHLY");
                  selected === 3 && navigate("/create-new-class?type=LIVE_GROUP");
                 
                }}
              />
            </div>
          </div>
        </div>
      </ReUseModal>
    </div>
  );
}

export default CreateNewServiceModal
