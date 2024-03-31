
import { CancelIcon, MicIcon, PhoneIcon } from '../../assets'
import woman from "../../assets/png/smile-woman.png"
const GuideTour = () => {
  return (
    <div className="w-full bg-white rounded-md min-h-[225px] h-fit  flex flex-col mt-4">
      <div className="w-full flex items-center px-4 justify-between pt-5">
        <h1 className="lg:text-3xl text-lg font-bold red-hat ">
          Take a Guided Tour
        </h1>
        <span>
          <CancelIcon />
        </span>
      </div>
      <div className="w-full px-4 pt-4 flex flex-col lg:flex-row lg:items-start lg:justify-between mt-3 ">
        <div className="flex flex-col w-full lg:w-1/2">
          <p className="max-w-[347px] text-sm lg:text-base red-hat">
            Watch a video guide on how to start attending classes and choosing
            tutors.
          </p>

          <div className="flex gap-4 items-center mt-5">
                      <div className="border-[0.5px] h-[30px] flex items-center justify-center px-3 rounded-[4px] border-opacity-50 gap-3 border-[#0E79FF] ">
                          <span><PhoneIcon /></span>
                          <p className='text-sm font-medium cursor-pointer dm-sans '>1:1 Calls</p>
            </div>
                      <div className="border-[0.5px] h-[30px] flex items-center justify-center px-3 rounded-[4px] border-opacity-50 gap-3 border-[#0E79FF] ">
                          <span><MicIcon /></span>
                          <p className='text-sm font-medium cursor-pointer dm-sans '>Live events</p>
            </div>
          </div>
              </div>
              <div className="w-full lg:w-1/2 flex justify-end relative">
                  <img src={woman} alt="" className='w-auto h-[200px]' />
              </div>
      </div>
    </div>
  );
}

export default GuideTour
