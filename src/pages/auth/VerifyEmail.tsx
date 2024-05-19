import { useEffect,useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { AppDispatch } from "../../app/store";
import signPic from "../../assets/png/sign-pic.png";
import { verifyUserEmail } from "../../features/auth/authSlice";
import AuthLayout from "../../layouts/AuthLayout";
import logo from "../../assets/png/lang-logo.png";
import { ErrorMail, SuccessMail } from "../../assets";
const VerifyEmail = () => {
  const authUser = useAppSelector((state) => state.auth);

  const navigate = useNavigate();
  const [success, setSuccess] = useState(true);

  // useEffect(() => {
  //   if (authUser.verifiedStatus) {
  //     toast.success("Account Verified!");
  //     navigate("/login", { replace: true });
  //   }
  // }, [authUser.verifiedStatus]);

  // const [searchParams] = useSearchParams();
  // const verifyToken = searchParams.get("token");

  // const handleVerifyBTN = () => {
  //   dispatch(verifyUserEmail(`token=${verifyToken}`));
  // };

  return (
    <div className="w-full bg-white flex h-screen items-center justify-center">
      {success ? (
        <div className="verify-shadow flex flex-col md:max-w-[441px] w-full py-12">
          <div className="w-10/12 flex flex-col mx-auto">
            <div>
              <img src={logo} alt="logo" className="w-[109px] h-auto" />
            </div>
            <div className="mt-8  flex justify-center">
              <SuccessMail />
            </div>
            <h1 className="mt-6 red-hat font-bold text-black mx-auto max-w-[345px] text-[32px] text-center">
              Your email has been verified!
            </h1>
            <p className="text-muted text-base md:text-lg mx-auto max-w-[317px] mt-3 text-center dm-sans ">
              Your email has been successfully verified! Click on login to
              continue.
            </p>
            <div className="mt-8">
              <button className="bg-black text-[#faf8f0] font-medium h-[55px] max-w-[345px] w-full rounded-[4px] cursor-pointer red-hat " onClick={() => navigate("/login")}>
                Go back to login
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="verify-shadow flex flex-col md:max-w-[441px] w-full py-12">
          <div className="w-10/12 flex flex-col mx-auto">
            <div>
              <img src={logo} alt="logo" className="w-[109px] h-auto" />
            </div>
            <div className="mt-8  flex justify-center">
              <ErrorMail />
            </div>
            <h1 className="mt-6 red-hat font-bold text-black mx-auto max-w-[345px] text-[32px] text-center">
              Verification Link expired
            </h1>
            <p className="text-muted text-base md:text-lg mx-auto max-w-[317px] mt-3 text-center dm-sans ">
              Sorry your verification link has expired, try again.
            </p>
            <div className="mt-8">
              <button className="bg-black text-[#faf8f0] font-medium h-[55px] max-w-[345px] w-full rounded-[4px] cursor-pointer red-hat  ">
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
