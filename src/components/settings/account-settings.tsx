import React,{useState,useEffect} from 'react'
import {Input, Password} from '../Input';
import { useAppDispatch,useAppSelector } from '../../app/hooks';
import { getAllSavedCards, restoreDefault, saveMyCard } from '../../features/auth/authSlice';
import LoadingComponent from '../Loaders/skeleton-loading';
const AccountSettings = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(state => state.auth);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  useEffect(() => {
    dispatch(getAllSavedCards());
  }, [])
  

  useEffect(() => {
    if (auth.openCard) {
      dispatch(restoreDefault());
      const openNewTab = () => {
        
        const url = auth?.saveCardData?.authorization_url; // Replace with the URL you want to open
        window.open(url, "_blank", "noopener,noreferrer");
      }
      openNewTab();
    }
  }, [auth.saveCardData, ]);

console.log(auth?.allSavedCard)

  if (auth?.fetchLoading) {
    return (
      <div className='w-full'>
        <LoadingComponent />
      </div>
    )
  }
  return (
    <div className="w-full flex flex-col bg-white ">
      <div className="px-4 lg:px-0 lg:w-11/12 mx-auto py-6">
        <h1 className="red-hat lg:text-[19px] font-semibold">Email Address</h1>
        <p className="mt-2 text-base red-hat">
          Used to sign in, for email receipts and product updates.
        </p>
        <div className="mt-4">
          <Input
            value={email}
            setValue={setEmail}
            label="Your email"
            placeholder="your@email.com"
            height="h-9"
          />
        </div>
        <div className="mt-6">
          <button className="bg-black h-[49px] w-auto cursor-pointer dm-sans min-w-[96px] text-white px-6 flex items-center rounded-[4px]  ">
            Save Changes
          </button>
        </div>
        <div className="flex flex-col mt-10">
          <h1 className="red-hat lg:text-[19px] font-semibold">Password</h1>
          <p className="mt-2 text-base red-hat">
            Confirm your current password before setting a new one. 8 characters
            minimum
          </p>
          <div className="mt-4 flex flex-col">
            <Password
              value={password}
              setValue={setPassword}
              label="Password"
            />
            <Password
              value={confirm}
              setValue={setConfirm}
              label="Confirm Password"
            />
          </div>
          <div className="mt-6">
            <button className="bg-black h-[49px] w-auto cursor-pointer dm-sans min-w-[96px] text-white px-6 flex items-center rounded-[4px]  ">
              Save Changes
            </button>
          </div>

          <h1 className="red-hat lg:text-[19px] font-semibold mt-6">Cards</h1>
          {auth?.allSavedCard?.length > 0 && (
            <div className='flex flex-col'>
              
              {auth?.allSavedCard?.map((item: any, index: number) => {
                return (

                  <div
                  className="flex flex-col gap-2 border-border border p-2 rounded-lg"
                  key={index}
                  >
                      <div className="flex items-center gap-2">
                        <p className="red-hat text-sm  text-muted">Bank:</p>
                        <p>{item.bank}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="red-hat text-sm  text-muted">Brand:</p>
                        <p className="capitalize">{item.brand}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="red-hat text-sm  text-muted">
                          Exp year:
                        </p>
                        <p className="capitalize">{ item.exp_year}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="red-hat text-sm  text-muted">
                          Exp Month:
                        </p>
                        <p className="capitalize">{ item.exp_month}</p>
                      </div>
                   
                      <div className="flex items-center gap-2">
                        <p className="red-hat text-sm  text-muted">
                          {" "}
                          Last four:
                        </p>
                        <p className="capitalize">
                      {item?.last4}
                        </p>
                      </div>
                    
                    </div>
              )
                })}
            </div>
          )}
          <div className="mt-6">
            <button
              className="bg-black h-[49px] w-auto cursor-pointer dm-sans min-w-[96px] text-white px-6 flex items-center rounded-[4px]  "
              onClick={() => dispatch(saveMyCard(""))}
            >
              {auth?.loading ? "Loading..." : "Save New Card"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountSettings
