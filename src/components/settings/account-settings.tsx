import React, { useState, useEffect } from "react";
import { Input, Password } from "../Input";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {

  restoreDefault,
 
} from "../../features/auth/authSlice";
import LoadingComponent from "../Loaders/skeleton-loading";

const AccountSettings = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth);
  const email = user?.userData?.email;
  const payment = useAppSelector((state) => state.payment);

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

 const [errors, setErrors] = useState<string[]>([]);
 const [matchError, setMatchError] = useState("");

 const validatePassword = (password: string) => {
   const validationErrors: string[] = [];

   if (password.length < 8) {
     validationErrors.push("Password must be at least 8 characters long.");
   }
   if (!/[a-z]/.test(password)) {
     validationErrors.push(
       "Password must contain at least one lowercase letter."
     );
   }
   if (!/[A-Z]/.test(password)) {
     validationErrors.push(
       "Password must contain at least one uppercase letter."
     );
   }
   if (!/[0-9]/.test(password)) {
     validationErrors.push("Password must contain at least one number.");
   }
   if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
     validationErrors.push(
       "Password must contain at least one special character."
     );
   }

   return validationErrors;
 };

 const handlePasswordChange = (newPassword: string) => {
   setPassword(newPassword);

   const validationErrors = validatePassword(newPassword);
   setErrors(validationErrors);
 };

 const handleConfirmPasswordChange = (newConfirmPassword: string) => {
   setConfirm(newConfirmPassword);

   // Check if passwords match
   if (newConfirmPassword !== password) {
     setMatchError("Passwords do not match.");
   } else {
     setMatchError("");
   }
 };



  if (payment?.fetchLoading) {
    return (
      <div className="w-full">
        <LoadingComponent />
      </div>
    );
  }
  return (
    <div className="w-full flex flex-col bg-white ">
      <div className="px-4 lg:px-0 lg:w-11/12 mx-auto py-6">
        <h1 className="red-hat lg:text-[19px] font-semibold">Email Address</h1>
        <p className="mt-2 text-base red-hat">
          Used to sign in, for email receipts and product updates.
        </p>
        <div className=" px-3 py-[15px] flex items-center border border-[#E0E0E0] h-9 mt-2">
          {email}
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
              setValue={handlePasswordChange}
              label="Password"
            />
            {errors.length > 0 && (
              <ul style={{ color: "red" }}>
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            )}
            <Password
              value={confirm}
              setValue={handleConfirmPasswordChange}
              label="Confirm Password"
              className="mt-4"
            />
            {matchError && <p style={{ color: "red" }}>{matchError}</p>}
          </div>
          <div className="mt-6">
            <button className="bg-black h-[49px] w-auto cursor-pointer dm-sans min-w-[96px] text-white px-6 flex items-center rounded-[4px]  ">
              Save Changes
            </button>
          </div>

          {/* <div className="mt-6">
            <button
              className="bg-black h-[49px] w-auto cursor-pointer dm-sans min-w-[96px] text-white px-6 flex items-center rounded-[4px]  "
              onClick={() => dispatch(saveMyCard(""))}
            >
              {payment?.loading ? "Loading..." : "Save New Card"}
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
