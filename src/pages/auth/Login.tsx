import { useState } from "react";
import logo from "../../assets/png/lang-logo.png";
import signPic from "../../assets/png/sign-pic.png";
import { GoogleLogo } from "../../assets";
import { Input, Password } from "../../components/Input";
import Status from "../../components/dropdown/status-drop";
import PrimarySelect from "../../components/Selects/PrimarySelect";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [selected, setSelected] = useState<any>(null);

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
        <div className="w-full px-4 md:max-w-[345px] flex flex-col flow-hide h-screen ">
          <div className="mt-20">
            <img src={logo} alt="logo" className="w-[150px] h-auto" />
          </div>
          <div className="flex flex-col mt-12">
            <h1 className="text-2xl font-extrabold text-black red-hat">
              Login
            </h1>
            <button className="w-full h-[35px] mt-6 rounded-[50px] gap-[10px] py-[6px] pl-12 pr-6 flex items-center border border-[#E0E0E9] ">
              <span>
                <GoogleLogo />
              </span>
              <span className=" min-w-maxfont-medium text-xl inter text-[#1D1C2B] ">
                Sign in with Google
              </span>
            </button>
            <div className="flex items-center w-full gap-3 mt-6 ">
              <hr className="flex flex-grow bg-[#cdcdcd] h-[0.5px] " />
              <p className="dm-sans text-sm text-black">Or continue with</p>
              <hr className="flex flex-grow bg-[#cdcdcd] h-[0.5px] " />
            </div>
            <div className="flex flex-col mt-4 gap-y-4">
              <Input
                value={name}
                setValue={setName}
                label="Your email"
                placeholder="your@email.com"
              />
              <Password
                value={password}
                setValue={setPassword}
                label="Password"
              />
              <div className="w-full flex items-center gap-4">
                <input
                  type="checkbox"
                  className="accent-black w-[18px] h-[18px]"
                  id=""
                />
                <p className="dm-sans font-medium text-xs text-[#707070]  ">
                  I agree to{" "}
                  <span className="font-bold text-black mx-1">Terms</span>
                  and{" "}
                  <span className="font-bold mx-1 text-black">conditions</span>
                </p>
              </div>
              <div className="w-full  flex items-center justify-end mt-4">
                <button className="bg-black h-[49px] w-full justify-center xl:w-auto cursor-pointer dm-sans min-w-[96px] text-white px-6 flex items-center rounded-[4px]  ">
                  Sign In
                </button>
              </div>
              <div className="w-full flex items-center justify-center mb-20">
                <p className="text-sm text-black dm-sans">
                  Dont have an account?{" "}
                  <span
                    className=" cursor-pointer underline"
                    onClick={() => navigate("/register")}
                  >
                    Create one
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
