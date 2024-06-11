import {useState} from 'react'
import pic from "../../assets/png/pic.png" 
import { VerifyIcon } from '../../assets'
import ar from "../../assets/png/ar.png"
const SingleCoachCard = ({item} : any) => {
  return (
    <div className='w-full flex flex-col lg:w-[257px]'>
          <img src={pic} alt="" className='lg:w-[257px] h-[200px] rounded-t-[8px] object-cover' />
          <div className="w-full px-4 py-3 flex flex-col">
              <div className="flex gap-3 items-center">
                  
              <h1 className='text-base lg:text-xl font-bold red-hat'>
              Gabriela H 
                  </h1> 
                  <img src={ar} alt="ar" />
                  <span>
                      <VerifyIcon />
                  </span>
              </div>
          </div>
    </div>
  )
}

export default SingleCoachCard
