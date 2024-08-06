import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { getAllUserBanks } from '../../features/paymentslice';
import bankLogo from "../../assets/icons/bank-logo.svg"
import { OutlineBtn } from '../Button';
const BankCard = () => {
    const dispatch = useAppDispatch();
    const payment = useAppSelector(state => state.payment);
    useEffect(() => {
        dispatch(getAllUserBanks());
      
    }, [])
    const allBank = payment?.allUserBanks;
    const banksLength = payment?.allUserBanks?.length;
    const lastBankIndex = banksLength - 1;

    const recentBank = allBank[lastBankIndex];
  
    
    
  return (
    <div className='w-full items-center flex  lg:p-6 justify-between bg-white mt-6  rounded-md'>
          <div className="w-fit flex items-center gap-3">
              <span>
                  <img src={bankLogo} alt="logo" className='w-12 h-auto'  />
              </span>
              <div className="flex flex-col">
                  <p className='red-hat font-semibold text-base leading-[20px] uppercase mb-2 '>
                      {recentBank?.accountName}
                  </p>
                  
                  <p className='red-hat'>
                      <span>
                          {recentBank?.bankName}
                      </span>
                      <span> - </span>
                      <span>
                          {recentBank?.accountNumber}
                      </span>
                    
                  </p>
              </div>
      </div>
          <div className="w-fit">
              <OutlineBtn className='rounded-[48px] text-primary' height='h-[31px]' name='Update Account details' />
      </div>
    </div>
  )
}

export default BankCard
