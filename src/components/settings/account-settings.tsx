import React,{useState} from 'react'
import {Input, Password} from '../Input';

const AccountSettings = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
     const [confirm, setConfirm] = useState("");
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
        </div>
      </div>
    </div>
  );
}

export default AccountSettings
