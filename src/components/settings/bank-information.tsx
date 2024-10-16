import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ActionBtn, BigButton, Button, CapsuleBtn, OutlineBtn } from '../Button';
import ReUseModal from '../modal/Modal';
import { CancelX } from '../../assets';
import PrimarySelect from '../Selects/PrimarySelect';
import { getAllBanks, getAllUserBanks, resolveAccount, restoreDefault, saveUserBank } from '../../features/paymentslice';
import { Input } from '../Input';
import bankSamp from "../../assets/png/bank-samp.png";
import toast from 'react-hot-toast';
const bankList = [
  { name: "Damisa Musa", bankName: "Access bank", accNumber: "0058348286" },
  { name: "Damisa Musa", bankName: "Access bank", accNumber: "0058348286" },
  { name: "Damisa Musa", bankName: "Access bank", accNumber: "0058348286" },
];
const BankInformation = () => {
    const dispatch = useAppDispatch();
    const payment = useAppSelector(state => state.payment);
    const [openAddBank, setOpenAddBank] = useState<boolean>(false);
  const [openAddBankSuccess, setOpenAddBankSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
    const [selectedBank, setSelectedBank] = useState<any>({});
    const [accNo, setAccNo] = useState("");
  
  
 
    useEffect(() => {
        if (selectedBank?.code && accNo?.length === 10) {
            const data =  {
                  "accountNumber": accNo,
  bankCode: selectedBank?.code
            }
          dispatch(resolveAccount(data))
        }
        // if (payment?.saveUserBankSuccess) {
        //     setOpenAddBank(false);
           
        //     setAccNo("");
        //     dispatch(restoreDefault());
        //     setOpenAddBankSuccess(true);
        //       dispatch(getAllUserBanks());

        // }

        
    }, [accNo,selectedBank])
    
   
    const handleAddBank = async () => {
        const sentData = {
          accountNumber: accNo,
          accountName: payment?.resolveBankData?.account_name,
          bankName: selectedBank?.name,
          bankCode: selectedBank?.code,
        };
      const { payload } = await dispatch(saveUserBank(sentData));
      if (payload?.status === "success") {
        setLoading(false);
        setOpenAddBank(false);
        setOpenAddBankSuccess(true);
        dispatch(getAllUserBanks());
        setSelectedBank({});
        setAccNo("");
        dispatch(restoreDefault())
      }

    }
    
    

    

  return (
    <div className="w-full bg-white flex flex-col py-6 px-4 sm:px-6 xl:px-12 md:min-h-[550px] rounded-md">
      <h1 className="text-base md:text-[19px] red-hat font-bold ">
        Bank Information
      </h1>
      <p className="text-base leading-[24px] mt-3 ">
        Select a default bank to withdraw your money to
      </p>
      {payment?.allUserBanks?.length === 0 && (
        <div>
          <p className="text-muted dm-sans text-center lg:w-7/12 mx-auto mt-8 ">
            No Bank Added yet. Click on Add bank to add a new bank detail to you
            account
          </p>
        </div>
      )}
      {payment?.allUserBanks?.length > 0 && (
        <div className="w-full flex flex-col gap-3 mt-12">
          {payment?.allUserBanks?.map((item: any, index: number) => {
            return <SingleBank item={item} key={index} />;
          })}
        </div>
      )}

      <div className="flex mt-4">
        <CapsuleBtn name="Add bank" onClick={() => setOpenAddBank(true)} />
      </div>
      <ReUseModal open={openAddBank} setOpen={setOpenAddBank}>
        <div className="w-full flex flex-col ">
          <div className="w-full justify-between items-center flex">
            <p className="text-base font-bold lg:text-[19px]">Add Bank</p>
            <span onClick={() => setOpenAddBank(false)}>
              <CancelX />
            </span>
          </div>
          <div className="w-full mt-6 flex flex-col">
            <PrimarySelect
              data={payment?.allBanks}
              label="Choose bank"
              selected={selectedBank}
              setSelected={setSelectedBank}
            />
            <Input
              label={"Account number"}
              value={accNo}
              setValue={setAccNo}
              height="h-[36px] "
              className="mt-6"
            />
            <p className="red-hat mt-3 text-muted text-sm">
              {payment?.loading
                ? "Loading..."
                : payment?.resolveBankData?.account_name}
            </p>
            <div className="w-full grid grid-cols-2 mt-12 gap-3">
              <span>
                <OutlineBtn
                  name="Cancel"
                  onClick={() => {
                    dispatch(restoreDefault());
                    setSelectedBank({});
                    setAccNo("");
                    setOpenAddBank(false);
                  }}
                  className="w-full min-w-full"
                />
              </span>
              <span>
                <BigButton
                  className="w-full min-w-full"
                  name="Add bank"
                  onClick={handleAddBank}
                  loading={loading}
                />
              </span>
            </div>
          </div>
        </div>
      </ReUseModal>
      <ReUseModal open={openAddBankSuccess} setOpen={setOpenAddBankSuccess}>
        <div className="w-full flex flex-col ">
          <div className="w-full justify-between items-center flex">
            <p className="text-base font-bold lg:text-[19px]"></p>
            <span onClick={() => setOpenAddBankSuccess(false)}>
              <CancelX />
            </span>
          </div>
          <div className="w-full mt-0 flex flex-col items-center">
            <div className="w-auto mx-auto">
              <img src={bankSamp} alt="" className="w-[120px] h-[120px] " />
            </div>
            <h1 className="text-[32px] font-extrabold red-hat leading-[38px] mt-8">
              Bank added!
            </h1>
            <p className="text-[#707070] mt-6 text-center max-w-[345px]">
              You have added {selectedBank?.name} to your bank list
            </p>
            <div className="w-[345px] mx-auto mt-12">
              <BigButton
                name="Done"
                className="w-full min-w-full"
                onClick={() => {
                  setSelectedBank({});
                  setOpenAddBankSuccess(false);
                }}
              />
            </div>
          </div>
        </div>
      </ReUseModal>
    </div>
  );
}


export default BankInformation

const SingleBank = ({item}:{item:any}) => {
    return (
      <div className="w-full border border-border p-3 flex items-baseline justify-between bankcard-shadow rounded-md flex-col lg:flex-row">
        <div className="gap-3 flex items-center ">
          <span>
            <input type="radio" className="accent-primary w-5 h-5" />
          </span>
          <div className="flex flex-col">
            <p className=" red-hat font-semibold">{item?.accountName}</p>
            <p className=" text-[#838384] text-base">
              {item?.bankName}
            </p>
          </div>
        </div>
        <div className="flex">
          <p className="text-muted font-semibold ml-7 lg:ml-0">{item?.accountNumber}</p>
        </div>
      </div>
    );
}
