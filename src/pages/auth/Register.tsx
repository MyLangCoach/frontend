import { useEffect, useState } from "react";
import logo from "../../assets/icons/lang-logo.svg";
import signPic from "../../assets/png/sign-pic.png";
import { GoogleLogo } from "../../assets";
import { Input, Password } from "../../components/Input";
import { useAppDispatch,useAppSelector } from "../../app/hooks";
import PrimarySelect from "../../components/Selects/PrimarySelect";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, restoreDefault } from "../../features/auth/authSlice";
import toast from "react-hot-toast";
import { websiteUrl } from "../../util/endpoints";
const Register = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(state => state.auth);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
  const [selected, setSelected] = useState<any>(null);
  const [success, setSuccess] = useState(false);

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


  const handleRegister = () => {
    if (firstName && email && password && lastName && selected) { 

      if (password === confirm) {
        
        const data = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          role: selected?.name.toUpperCase(),
        };
        dispatch(registerUser(data));
      }
      else {
        toast.error("Password must match")
      }
  
     
    }
    else {
      toast.error("All fields must be filled ")
    }
  }
  useEffect(() => {
    if (auth?.registerSuccess) {
      setSuccess(true);
      dispatch(restoreDefault())
    }
  }, [auth?.registerSuccess])
  

  return (
    <div className="w-full flex flex-col xl:flex-row lg:h-screen  flow-hide ">
      <div className="w-full hidden xl:flex xl:w-1/2 bg-[#fcfcff]  justify-center items-center h-screen ">
        <Link to={websiteUrl}>
          <img
            src={signPic}
            alt="sign pic"
            className="w-auto max-w-[554px]  h-auto"
          />
        </Link>
      </div>
      <div className="w-full xl:w-1/2 flex items-center justify-center   ">
        {success ? (
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-2xl font-extrabold text-black red-hat">
              Account Created Successfully
            </h1>
            <p className="text-muted mt-3">
              Kindly check your email box and click on the link there to get
              verified
            </p>
            <button
              className="bg-black h-[49px] w-auto cursor-pointer dm-sans min-w-[96px] text-white px-6 flex items-center rounded-[4px] mt-6  "
              onClick={() => navigate("/login")}
            >
              Proceed to Login
            </button>
          </div>
        ) : (
          <div className="h-screen overflow-y-scroll w-full  flex justify-center">
            <div className="w-full px-4 md:max-w-[345px] flex flex-col  h-full ">
              <Link
                to={"https://my-lang-website-daniekeys-projects.vercel.app/"}
                className="mt-10"
              >
                <img src={logo} alt="logo" className="w-[150px] h-auto" />
              </Link>
              <div className="flex flex-col mt-12">
                <h1 className="text-2xl font-extrabold text-black red-hat">
                  Create a new account
                </h1>
                {/* <button className="w-full h-[35px] mt-6 rounded-[50px] gap-[10px] py-[6px] pl-12 pr-6 flex items-center border border-[#E0E0E9] ">
                <span>
                  <GoogleLogo />
                </span>
                <span className="font-medium min-w-max text-xl inter text-[#1D1C2B] ">
                  Sign up with Google
                </span>
              </button> */}
                {/* <div className="flex items-center w-full gap-3 mt-6 ">
                <hr className="flex flex-grow bg-[#cdcdcd] h-[0.5px] " />
                <p className="dm-sans text-sm text-black">Or continue with</p>
                <hr className="flex flex-grow bg-[#cdcdcd] h-[0.5px] " />
              </div> */}
                <div className="flex flex-col mt-4 gap-y-4">
                  <Input
                    value={firstName}
                    setValue={setFirstName}
                    label="First name"
                  />
                  <Input
                    value={lastName}
                    setValue={setLastName}
                    label="Last name"
                  />
                  <Input
                    value={email}
                    setValue={setEmail}
                    label="Your email"
                    placeholder="your@email.com"
                  />
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
                  <span className="h-20">
                    <PrimarySelect
                      selected={selected}
                      setSelected={setSelected}
                      label="Choose personality"
                      data={[{ name: "Student" }, { name: "Coach" }]}
                      name="Select "
                    />
                  </span>
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
                      <span className="font-bold mx-1 text-black">
                        conditions
                      </span>
                    </p>
                  </div>
                  <div className="w-full  flex items-center justify-end mt-4">
                    <button
                      className="bg-black h-[49px] w-auto cursor-pointer dm-sans min-w-[96px] text-white px-6 flex items-center rounded-[4px]  "
                      onClick={handleRegister}
                      disabled={auth?.loading}
                    >
                      {auth?.loading ? "Loading..." : "Sign up"}
                    </button>
                  </div>
                  <div className="w-full flex items-center justify-center mb-20">
                    <p className="text-sm text-black dm-sans">
                      Already have an account?{" "}
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
