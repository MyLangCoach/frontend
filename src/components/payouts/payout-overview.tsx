import React, { useEffect, useState } from "react";
import withdraw from "../../assets/png/withdraw.png"
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getAllUserBanks, restoreDefault, withdrawFund } from "../../features/paymentslice";
import { Input } from "../Input";
import { CancelX } from "../../assets";
import { OutlineBtn, BigButton } from "../Button";
import ReUseModal from "../modal/Modal";
import PrimarySelect from "../Selects/PrimarySelect";
import toast from "react-hot-toast";
import { getCurrentFormattedDate } from "../../util";
import { getUserProfile } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const PayoutOverview = () => {
      const dispatch = useAppDispatch();
  const payment = useAppSelector((state) => state.payment);
  const user = useAppSelector((state) => state.auth);
    const userRole = user?.userData?.role;
  const navigate = useNavigate();
  const [selectedBank, setSelectedBank] = useState<any>({});
  const [open, setOpen] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(0);

      useEffect(() => {
        dispatch(getAllUserBanks());
          dispatch(getUserProfile());
      }, []);
      const allBank = payment?.allUserBanks;
      const banksLength = payment?.allUserBanks?.length;
      const lastBankIndex = banksLength - 1;



  const handleWithdrawal = () => {
  const sentData = {
    withdrawalMethod: "BANK",
    
    bankId: selectedBank?.id,
    amount: Number(amount),
    };
    dispatch(withdrawFund(sentData));

  }
  
  useEffect(() => {
    if (payment?.withdrawalSuccess) { 
      setOpen(false);
      dispatch(restoreDefault());
      setAmount(0);
      setSelectedBank({});
      dispatch(getUserProfile());
      toast.success("Withdrawal Successful Check your Bank")
    }
  }, [payment?.withdrawalSuccess])
  
 
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-3 mt-8 lg:gap-4 gap-4 px-4 lg:px-0 ">
      {/* start of a pack */}

      {/* end of a session */}

      {/* start of a pack */}
      <div className="w-full bg-black pattern-bg flex flex-col justify-between py-4 px-6 rounded-[6px]  ">
        <div className="flex items-center justify-between">
          <h1 className="text-white red-had font-bold text-lg lg:text-2xl">
            ₦ { userRole === "COACH" ? user?.userData?.earnings : user?.userData?.spents}
          </h1>
          <p className="text-sm lg:text-base red-hat text-white font-normal">
            {getCurrentFormattedDate()}
          </p>
        </div>
        <div className="flex items-center justify-between -mt-3">
          <p className="font-bold text-white lg:text-[23px] text-lg leading-[27px]font-bold"></p>
          {userRole === "COACH" && (
            <span onClick={() => setOpen(true)}>
              <img src={withdraw} alt="witdraw" />
            </span>
          )}
        </div>
      </div>
      {/* end of a session */}
      <ReUseModal open={open} setOpen={setOpen}>
        <div className="w-full flex flex-col ">
          <div className="w-full justify-between items-center flex">
            <p className="text-base font-bold lg:text-[19px]">
              Withdraw Earnings
            </p>
            <span onClick={() => setOpen(false)}>
              <CancelX />
            </span>
          </div>
          <div className="w-full mt-6 flex flex-col">
            <PrimarySelect
              data={allBank}
              label="Select bank to withdraw to "
              selected={selectedBank}
              setSelected={setSelectedBank}
              mapKey="bankName"
            />
            <Input
              label={"Enter Amount to withdraw"}
              value={amount}
              setValue={setAmount}
              height="h-[36px]"
              type="number"
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
                    setAmount(0);
                    setOpen(false);
                  }}
                  className="w-full min-w-full"
                />
              </span>
              <span>
                {userRole === "COACH" && (
                  <BigButton
                    className="w-full min-w-full"
                    name="Withdraw"
                    onClick={handleWithdrawal}
                  />
                )}
              </span>
            </div>
          </div>
        </div>
      </ReUseModal>
    </div>
  );
};

export default PayoutOverview;
