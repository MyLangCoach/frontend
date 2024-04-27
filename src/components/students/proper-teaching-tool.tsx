import React from 'react'
import { WhiteCancel } from '../../assets'
const ProperTeachingTools = () => {
  return (
    <div className="w-full flex bg-primary px-4 py-3  flex-col h-[227px] rounded-[6px] ">
      <div className="w-full flex items-center justify-between">
        <p className="text-white font-bold text-base leading-[23px] red-hat lg:text-[19px]">
          proper teaching rules
        </p>
        <span>
          <WhiteCancel />
        </span>
      </div>
      <p className="red-hat text-white mt-4">
        Watch a video guide on how to be a proper tutor and keep to our rules.
          </p>
          <button className='h-[30px] mt-8 w-fit text-white rounded-[6px] border-[0.5px] border-white px-3 watch-shadow dm-sans font-medium text-sm '>
              Watch video
          </button>
    </div>
  );
}

export default ProperTeachingTools
