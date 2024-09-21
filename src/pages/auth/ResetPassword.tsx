import { useEffect, useState } from "react";
import logo from "../../assets/icons/lang-logo.svg";
import signPic from "../../assets/png/sign-pic.png";
import { Input, Password } from "../../components/Input";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loginUser } from "../../features/auth/authSlice";
import toast from "react-hot-toast";
import resetPic from "../../assets/icons/reset-success.svg";
const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const [name, setName] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email && password) {
      dispatch(loginUser({ email, password }));
    } else {
      toast.error("All fields must be filled");
    }
  };

 

  return (
    <div className="w-full flex flex-col xl:flex-row ">
      <div className="w-full hidden xl:flex xl:w-1/2 bg-[#fcfcff] h-screen justify-center items-center overflow-hidden">
        <span>
          <img
            src={signPic}
            alt="sign pic"
            className="w-auto max-w-[554px]  h-auto"
          />
        </span>
      </div>
      <div className="w-full xl:w-1/2 flex items-center justify-center flow-hide h-screen">
        {isSuccess ? (
          <div className="flex flex-col justify-center items-center">
            <img src={resetPic} alt="reset" className="mb-12" />
            <h1 className="text-2xl font-extrabold text-black red-hat">
              Password reset successful!
            </h1>
            <p className="text-muted mt-6">
              Kindly proceed to login
            </p>
            <button
              className="bg-black h-[49px] w-auto cursor-pointer dm-sans min-w-[96px] text-white px-6 flex items-center rounded-[4px] mt-6  "
              onClick={() => navigate("/login")}
            >
              Go back to Login
            </button>
          </div>
        ) : (
          <div className="w-full px-4 md:max-w-[345px] flex flex-col flow-hide h-screen ">
            <div className="mt-20">
              <img src={logo} alt="logo" className="w-[150px] h-auto" />
            </div>
            <div className="flex flex-col mt-12">
              <h1 className="text-2xl font-extrabold text-black red-hat">
                Password reset
              </h1>
              <p className="text-base lg:text-lg dm-sans text-muted  mt-4 mb-4">
                Enter your new password to get access to your account.
              </p>
              <div className="flex flex-col mt-4 gap-y-4">
                <Password
                  value={password}
                  setValue={setPassword}
                  label="Password"
                />

                <div className="w-full  flex items-center justify-end mt-4">
                  <button
                    className="bg-black h-[49px] w-full justify-center xl:w-auto cursor-pointer dm-sans min-w-[96px] text-white px-6 flex items-center rounded-[4px] "
                    onClick={handleLogin}
                  >
                    {auth?.loading ? "Loading..." : "Continue"}
                  </button>
                </div>
                <div className="w-full flex items-center justify-center mb-20">
                  <p className="text-sm text-black dm-sans">
                    Have an account?{" "}
                    <span
                      className=" cursor-pointer underline"
                      onClick={() => navigate("/login")}
                    >
                      Login
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
