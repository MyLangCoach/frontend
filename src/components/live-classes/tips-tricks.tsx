import React from 'react'
import tipsIcon from "../../assets/png/tips-icon.png"
import {  LightCancel } from '../../assets'
const Tips = () => {
  return (
      <div className="w-full bg-white rounded-md  border border-border p-6 relative mt-16 overflow-y-hidden ">
          <div className="w-9/12 min-w-9/12 rounded-[40px]  z-0 tip-gradient h-[119px] absolute top-[-80px] left-0 right-0  mx-auto "></div>
      <div className="flex justify-between items-center">
        <img src={tipsIcon} alt="tips" />

        <span>
          <LightCancel />
        </span>
      </div>
      <h1 className="text-foreground font-semibold lg:text-lg inter text-sm leading-[30px] mt-6 ">
        Tips and tricks
      </h1>
      <p className="text-xs lg:text-sm text-muted ">
        Here are some tips and tricks to make sure classes and meetings don’t
        clash.
          </p>
          <div className="flex flex-col mt-6 gap-2">
              <p className='text-primary text-sm inter underline cursor-pointer'>
                  Link 1
              </p>
              <p className='text-primary text-sm inter underline cursor-pointer'>
                  Link 2
              </p>
              <p className='text-primary text-sm inter underline cursor-pointer'>
                  Link 3
              </p>
          </div>
    </div>
  );
}

export default Tips
