import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { getAllUserBanks } from '../../features/paymentslice';
import bankLogo from "../../assets/icons/bank-logo.svg"
import { OutlineBtn } from '../Button';
import { useNavigate } from 'react-router-dom';
const BankCard = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const payment = useAppSelector(state => state.payment);
    useEffect(() => {
        dispatch(getAllUserBanks());
      
    }, [])
    const allBank = payment?.allUserBanks;
    const banksLength = payment?.allUserBanks?.length;
    const lastBankIndex = banksLength - 1;

    const recentBank = allBank[lastBankIndex];
    
  
    
    
  return (
    <div className="w-full items-center flex  lg:p-6 justify-between bg-white mt-6  rounded-md flex-col lg:flex-row p-4 gap-4">
      <div className="w-fit flex items-center gap-3">
        <span>
          <img src={bankLogo} alt="logo" className="w-12 h-auto" />
        </span>
        {allBank?.length === 0 && (
          <p className="text-muted dm-sans text-sm">
            No Bank Added yet kindly do so by clicking on update bank details
            button.
          </p>
        )}
        {allBank?.length > 0 && (
          <div className="flex flex-col">
            <p className="red-hat font-semibold text-base leading-[20px] uppercase mb-2 ">
              {recentBank?.accountName}
            </p>

            <p className="red-hat flex flex-col">
              <span>{recentBank?.bankName}</span>
              {/* <span className='hidden md:flex'> - </span> */}
              <br className='lg:hidden' />
              <span>{recentBank?.accountNumber}</span>
            </p>
          </div>
        )}
      </div>
      <div className="w-fit">
        <OutlineBtn
          className="rounded-[48px] text-primary"
          height="h-[31px]"
          name="Update Account details"
          onClick={() => navigate("/settings")}
        />
      </div>
    </div>
  );
}

export default BankCard
