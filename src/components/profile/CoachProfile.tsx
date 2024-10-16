import { ChangeEvent, useEffect, useState } from "react";
import camera from "../../assets/icons/camera-icon.png";
import dp from "../../assets/png/dp.jpg";
import UrlInput, { Input } from "../Input";
import { BigButton, Button, CapsuleBtn, OutlineBtn } from "../Button";
import PrimarySelect from "../Selects/PrimarySelect";
import { Location } from "../../util/location";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getUserProfile,
  restoreDefault,
  updateUserProfile,
} from "../../features/auth/authSlice";
import LoadingComponent from "../Loaders/skeleton-loading";
import { Language, Qualification, UserProfileData } from "../../util/types";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import toast from "react-hot-toast";
import { storage } from "../../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { yearsArray } from "../../util/mockdata";
import { ProfileViewIcon } from "../../assets";
import ImageUpload from "../UploadFile/ImageUpload";
import VideoUpload from "../UploadFile/VideoUpload";
import { TiDelete } from "react-icons/ti";
const uploadEndpoint =
  "https://mylangcoach-api.onrender.com/api/v1/file-upload";
const CoachProfile = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  const userData: UserProfileData | undefined = user?.userData;

  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [profileUrl, setProfileUrl] = useState<string>("");
  const [languagesInterest, setLanguagesInterest] = useState<string[]>([]);
  const [newLanguage, setNewLanguage] = useState<string>("");
  const [showInput, setShowInput] = useState<boolean>(false);
  const [country, setCountry] = useState<any>("");
  const [desc, setDesc] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [socialMedia, setSocialMedia] = useState<string[]>([""]);
  const [fileUrl, setFileUrl] = useState("");
  const [userName, setUserName] = useState("")
  const [, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<Blob | MediaSource | any>();
  const [preview, setPreview] = useState("");
  const [success, setSuccess] = useState(false);
  const [qualification, setQualification] = useState<string>("");
  const [isOrg, setIsOrg] = useState<string>("");
  const [year, setYear] = useState<{ name: string; value: number }>({
    name: "",
    value: 0,
  });
  const [videoType, setVideoType] = useState(0);
  const [languages, setLanguages] = useState<Language[]>([
    { language: "", proficiency: "" },
  ]);

  console.log(userData)
  const [cost, setCost] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [prof, setProf] = useState<{ name: string }>({ name: "" });
  const [available, setAvailable] = useState("available");
  const handleAddLanguage = () => {
    if (newLanguage && !languagesInterest.includes(newLanguage.toLowerCase())) {
      setLanguagesInterest([...languagesInterest, newLanguage.toLowerCase()]);
      setNewLanguage("");
      setShowInput(false);
    }
  };

  const handleDeleteLanguage = (languageToDelete: string) => {
    setLanguagesInterest(languagesInterest.filter((language) => language !== languageToDelete));
  };
    const [sessionType, setSessionType] = useState<{ name: string; value: number }>({
      name: "",
      value: 0,
    });
    const [gender, setGender] = useState<{ name: string; value: string }>({
      name: "",
      value: "",
    });
    const [sessionTypeSecond, setSessionTypeSecond] = useState<{ name: string; value: number }>({
      name: "",
      value: 0,
    });
  const [sessionPrice, setSessionPrice] = useState<number>(0);
  const [sessionPriceSecond, setSessionPriceSecond] = useState<number>(0);

  const [qualifications, setQualifications] = useState<Qualification[]>([
    { name: "", issuing_org: "", year: 0 },
  ]);


  useEffect(() => {
    if (userData) {
      setFirstname(userData.firstName || "");
      setLastname(userData.lastName || "");
      setProfileUrl(userData.profileImage || ""); // assuming username exists in userData
      setCountry(userData.country || "");
      setDesc(userData.description || "");
      setBio(userData?.bio || "");
      setVideoUrl(userData?.introVideo || "");
      setUserName(userData?.username || "");
      setSocialMedia(userData.socials?.length === 0 ? [" "] : userData?.socials);
      setSessionPrice(userData?.costPerSession?.[0]?.amount);
      setSessionPriceSecond(userData?.costPerSession?.[1]?.amount);
      setQualifications(
        userData.qualifications?.length === 0  ? [{ name: "", issuing_org: "", year: 0 }] : userData?.qualifications
      ); // assuming single qualification
      setIsOrg(userData.qualifications?.[0]?.issuing_org || "");
      setYear({
        name: userData.qualifications?.[0]?.name || "",
        value: userData.qualifications?.[0]?.year || 0,
      });
      setGender({
        name: userData.gender || "",
        value: userData.gender || "",
      });
      setLanguages(
        userData.languages?.length === 0
          ? [{ language: "", proficiency: "" }]
          : userData?.languages
      );
      setLanguagesInterest(userData?.languageInterests || [])
      // setVideoUrl(userData.introVideo || "");
      setProf({ name: userData.profileImage || "" });
      setSessionType({
        name: userData?.costPerSession?.[0]?.sessionType,
        value: userData?.costPerSession?.[0]?.sessionType,
      });
      setSessionTypeSecond({
        name: userData?.costPerSession?.[1]?.sessionType,
        value: userData?.costPerSession?.[1]?.sessionType,
      });
    }
  }, [userData]);

  const addSocialMedia = () => {
    setSocialMedia([...socialMedia, ""]);

  };
 

  const handleSocialMediaChange = (index: number, value: string) => {
    const updatedSocialMedia = [...socialMedia];
    updatedSocialMedia[index] = value;
    setSocialMedia(updatedSocialMedia);
  };
  const addLanguage = () => {
  
    setLanguages([...languages, { language: "", proficiency: "" }]);
  };

  const handleLanguageChange = (
    index: number,
    key: keyof Language,
    value: string
  ) => {
    const updatedLanguages = [...languages];
    updatedLanguages[index][key] = value;
    setLanguages(updatedLanguages);
  };

  const addQualification = () => {
    setQualifications([
      ...qualifications,
      { name: "", issuing_org: "", year: 0 },
    ]);
  };

  const handleQualificationChange = (
    index: number,
    key: keyof Qualification,
    value: string | number
  ) => {
    const updatedQualifications = [...qualifications];
    updatedQualifications[index] = {
      ...updatedQualifications[index],
      [key]: value,
    };
    setQualifications(updatedQualifications);
  };
  const updateProfile = () => {
    const updatedProfile: UserProfileData = {
      firstName: firstname,
      lastName: lastname,
      description: desc,
      bio: bio,
      country: country?.name,
      socials: socialMedia,
      languages: languages,
      qualifications: qualifications,
      introVideo: videoUrl,
      gender:gender?.value,
      languageInterests:languagesInterest,
      costPerSession: [
        {
          sessionType:
            sessionType?.value ?? userData?.costPerSession?.[0]?.sessionType,
          amount: Number(sessionPrice),

          currency: "NGN",
        },
        {
          sessionType:
            sessionTypeSecond?.value ?? userData?.costPerSession?.[1]?.sessionType,
          amount: Number(sessionPriceSecond),

          currency: "NGN",
        },
      ],
    };

    // Dispatch the action to update the user profile
    dispatch(updateUserProfile(updatedProfile));
  };

  useEffect(() => {
    if (user?.updateProfileSuccess) {
      toast?.success("Profile Updated successfully");
      dispatch(restoreDefault())
      dispatch(getUserProfile());
      
   }
  }, [user?.updateProfileSuccess])
  
  const getFiles = (files: any) => {
    if (!files) return;
    setSelectedFile(files[0]);

    const objectUrl = URL?.createObjectURL(files[0]);
    setPreview(objectUrl);
  };

  const uploadFile = () => {
    // e.preventDefault();
    setLoading(true);
    const storageRef = ref(storage, `/files/${selectedFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      () => {
        setSuccess(false);
        setLoading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setFileUrl(url);

          setSuccess(true);
          setSelectedFile("");
          setLoading(false);

          toast.success("Image Upload Successful");
          dispatch(updateUserProfile({ profileImage: url }));
          // setPreview("");
        });
      }
    );
  };

  useEffect(() => {
    if (selectedFile) {
      uploadFile();
    }
  }, [selectedFile]); 
  
   const [image, setImage] = useState<File | null>(null);

   useEffect(() => {
     if (image) {
       handleImageUpload();
     }
     // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [image]);

   const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
     if (e.target.files && e.target.files[0]) {
       setImage(e.target.files[0]);
     }
   };

   const handleImageUpload = async () => {
     if (!image) return;

     setLoading(true);

     const formData = new FormData();
     formData.append("file", image);

     try {
       const response = await axios.post(uploadEndpoint, formData, {
         headers: {
           "Content-Type": "multipart/form-data",
           accept: "application/json",
         },
       });

       setLoading(false);
       if (response?.data?.url) {
         toast.success("Image Upload Successful");
         dispatch(updateUserProfile({ profileImage: response?.data?.url }));
       }
     } catch (error) {
       console.error("Error uploading image:", error);
       setLoading(false);
     }
   };
    
      const handleError = (e: any) => {
        e.target.onerror = null; // Prevent looping
        e.target.src = dp;
      };
console.log(userData)

  if (user?.fetchLoading) {
    return (
      <div className="px-6 ">
        <LoadingComponent />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col rounded-[4px] bg-white mt-4 px-4 lg:px-0">
      <div className="flex flex-col z-0">
        <div
          className="w-full rounded-t-[4px] mt-2 h-[150px] lg:h-[178px] bg-[#0E79FF] flex relative justify-center items-center z-10 blur-sm  "
          style={{
            backgroundImage: `url(${profileUrl})`,

            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        ></div>
        <div
          className="flex -mt-12 z-pro mx-auto lg:ml-12 border-[3px] items-center justify-center border-white relative"
          onError={handleError}
          style={{
            backgroundImage: `url(${profileUrl})`,

            height: "96px",
            width: "96px",
            borderRadius: "50%",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="flex relative cursor-pointer">
            <input
              type="file"
              name=""
              className="inset-0 opacity-0 absolute"
              id=""
              // onChange={(e) => getFiles(e.target.files)}
              onChange={handleImageChange}
            />
            <span>
              <img src={camera} alt="camera" />
            </span>
          </div>
        </div>
      </div>
      <div className="w-full mt-12 flex flex-col px-2 lg:px-6 lg:py-6 py-4">
        <div className="flex justify-between items-center mb-6">
          <p className="red-hat text-base sm:text-[19px] font-bold  ">
            Profile Information
          </p>
          <div
            className="flex w-fit rounded-[48px] border border-[#0E79FF] px-3 justify-center gap-[10px] h-[34px] items-center cursor-pointer"
            onClick={() => navigate(`/view-coach/${userData?.id}`)}
          >
            <span>
              <ProfileViewIcon />
            </span>
            <span className="text-xs font-medium dm-sans text-black ">
              View public profile
            </span>
          </div>
        </div>
        {/* start of an input */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <Input
              value={firstname}
              setValue={setFirstname}
              label="First name"
              height="h-[36px]"
            />
          </div>
          <div>
            <Input
              value={lastname}
              setValue={setLastname}
              label="Last name"
              height="h-[36px]"
            />
          </div>
        </div>
        {/* end of an input */}
        {/* start */}
        {/* <div className="w-full mt-4">
          <UrlInput
            preUrl="https://www.mylangcoach/"
            placeholder="geo"
            value={userName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUserName(e.target.value)
            }
            setValue={setUserName}
            label="Username"
          />
        </div> */}
        {/* end */}
        {/* start */}
        <div className="w-full mt-4 flex flex-col">
          <label className="text-xs text-foreground font-medium dm-sans mb-2">
            Short bio
          </label>
          <textarea
            id=""
            className="min-h-20 rounded-[4px] px-3 py-[15px] flex items-center border border-[#E0E0E0] outline-none placeholder:text-black placeholder:text-opacity-50 bg-transparent focus:bg-transparent placeholder:text-sm text-black text-sm "
            placeholder="type message here"
            value={bio}
            maxLength={250}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
        </div>
        {/* end */}
        {/* start */}
        <div className="w-full mt-4 flex flex-col">
          <label className="text-xs text-foreground font-medium dm-sans mb-2">
            Description
          </label>
          <textarea
            id=""
            className="min-h-20 rounded-[4px] px-3 py-[15px] flex items-center border border-[#E0E0E0] outline-none placeholder:text-black placeholder:text-opacity-50 bg-transparent focus:bg-transparent placeholder:text-sm text-black text-sm "
            placeholder="type message here"
            value={desc}
            maxLength={250}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        {/* end */}
        {/* start  */}
        <span className="mt-6">
          <PrimarySelect
            selected={country}
            setSelected={setCountry}
            label="Choose Country"
            data={Location}
            name={country}
          />
        </span>
        {/* end */}
        {/* start  */}
        <span className="mt-6">
          <PrimarySelect
            selected={gender}
            setSelected={setGender}
            label="Select Gender"
            data={[
              {name:"Male", value:"MALE"},
              {name:"Female", value:"FEMALE"},
              {name:"Others", value:"OTHERS"},
             
            ]}
            name={country}
          />
        </span>
        {/* end */}
        {/* start */}
        <div className="flex justify-between items-center mt-8">
          <h1 className="font-bold text-black red-hat lg:text-xl text-base ">
            Social media
          </h1>
          <CapsuleBtn name="Add social media" onClick={addSocialMedia} />
        </div>
        {/* end */}
        {/* start of inout */}

        <div className="w-full mt-4 flex flex-col gap-3">
          {socialMedia?.map((social: string, index: number) => (
            <UrlInput
              placeholder="www.facebook.com"
              value={social}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleSocialMediaChange(index, e.target.value)
              }
              label={`Account ${index + 1}`}
              key={index}
            />
          ))}
        </div>
        {/* end of input */}
        {/* start */}
        <div className="flex justify-between items-center mt-8">
          <h1 className="font-bold text-black red-hat lg:text-xl text-base ">
            Language
          </h1>
          <CapsuleBtn name="Add language" onClick={addLanguage} />
        </div>
        {/* end */}
        {/* start of an input */}
        {languages?.map((lang, index) => (
          <div
            key={index}
            className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4"
          >
            <div>
              <Input
                value={lang.language}
                setValue={(value: any) =>
                  handleLanguageChange(index, "language", value)
                }
                label="Language"
                height="h-[36px]"
                placeholder="French"
              />
            </div>
            <div>
              <PrimarySelect
                selected={{ name: lang.proficiency }}
                setSelected={(value: any) =>
                  handleLanguageChange(index, "proficiency", value.name)
                }
                label="Proficiency"
                data={[
                  { name: "A1 - A2" },
                  { name: "B1 - B2" },
                  { name: "C1 - C2" },
                ]}
                name="Select"
              />
            </div>
          </div>
        ))}
        {/* end of an input */}
        {/* start */}
        <div className="flex justify-between items-center mt-8">
          <h1 className="font-bold text-black red-hat lg:text-xl text-base ">
            Language Interests
          </h1>
          <CapsuleBtn name="Add language" onClick={() => setShowInput(true)} />
        </div>
        {/* end */}
        <div className="w-full flex gap-4 flex-wrap items-center mt-3">
          {languagesInterest?.map((language, index) => (
            <div
              key={index}
              className="flex justify-between items-center px-4 py-2 h-[34px] border border-[#0E79FF]  gap-4 rounded-[48px]  font-medium text-xs dm-sans text-black capitalize "
            >
              {language}
              <button
                onClick={() => handleDeleteLanguage(language)}
                className="   rounded"
              >
                <TiDelete className="text-red-500 text-xl" />
              </button>
            </div>
          ))}
        </div>
        {showInput && (
          <div className=" mt-6 w-full flex flex-col lg:flex-row lg:w-1/2 gap-4 lg:items-center">
            <Input
              type="text"
              value={newLanguage}
              // onChange={(e) => setNewLanguage(e.target.value)}
              label=""
              setValue={setNewLanguage}
              height="h-9"
              placeholder="Enter a language"
              // className="border border-gray-300 px-2 py-1 rounded w-full max-h-[34px]"
            />
            <button
              onClick={handleAddLanguage}
              className="bg-black text-white px-4 flex items-center rounded hover:bg-green-700   focus:outline-none outline-none h-[36px] min-w-max"
            >
              Add Now
            </button>
          </div>
        )}
        {/* start */}
        <div className="flex justify-between items-center mt-8">
          <h1 className="font-bold text-black red-hat lg:text-xl text-base ">
            Professional Qualification
          </h1>
          <CapsuleBtn name="Add Qualification" onClick={addQualification} />
        </div>
        {/* end */}
        {/* start of an input */}
        {qualifications?.map((qual, index) => (
          <div
            key={index}
            className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4"
          >
            <div>
              <Input
                value={qual.name}
                setValue={(value: string) =>
                  handleQualificationChange(index, "name", value)
                }
                label="Name of Qualification"
                height="h-[36px]"
                placeholder=""
              />
            </div>
            <div>
              <Input
                value={qual.issuing_org}
                setValue={(value: string) =>
                  handleQualificationChange(index, "issuing_org", value)
                }
                label="Issuing Organization"
                height="h-[36px]"
                placeholder=""
              />
            </div>
            <div>
              <PrimarySelect
                selected={{ name: qual.year.toString() }}
                setSelected={(value: any) =>
                  handleQualificationChange(index, "year", Number(value.name))
                }
                label="Year"
                data={yearsArray}
                name="Select"
              />
            </div>
          </div>
        ))}

        {/* end of an input */}
        {/* start */}
        <div className="flex justify-between items-center mt-8">
          <h1 className="font-bold text-black red-hat lg:text-xl text-base ">
            Hourly rate <span className="font-[300] ">(Maximum two)</span>
          </h1>
        </div>
        {/* end */}
        {/* start of an input */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4 items-end">
          <div>
            <PrimarySelect
              selected={sessionType}
              setSelected={setSessionType}
              label={"Duration"}
              name={userData?.costPerSession?.[0]?.sessionType || 0}
              data={[
                {
                  name: "30",
                  value: 30,
                },
                // {
                //   name: "60",
                //   value: 60,
                // },
              ]}
            />
          </div>
          <div>
            <Input
              value={sessionPrice}
              setValue={setSessionPrice}
              label="Price"
              height="h-[36px]"
              type="number"
            />
          </div>
          <div className="items-center flex gap-4 "></div>
        </div>
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4 items-end">
          <div>
            <PrimarySelect
              selected={sessionTypeSecond}
              setSelected={setSessionTypeSecond}
              label={"Duration"}
              name={userData?.costPerSession?.[1]?.sessionType || 0}
              data={[
                // {
                //   name: "30",
                //   value: 30,
                // },
                {
                  name: "60",
                  value: 60,
                },
              ]}
            />
          </div>
          <div>
            <Input
              value={sessionPriceSecond}
              setValue={setSessionPriceSecond}
              label="Price"
              height="h-[36px]"
              type="number"
            />
          </div>
          <div className="items-center flex gap-4 ">
            {/* <p className="text-black text-sm font-medium inter">
              Availability Status
            </p>
            <input
              type="checkbox"
              className="w-5 h-5"
              name=""
              id=""
              checked={available === "available"}
              onClick={() => {
                if (available === "available") {
                  setAvailable("");
                } else setAvailable("available");
              }}
            /> */}
          </div>
        </div>
        {/* end of an input */}
        {/* start */}
        <div className="flex flex-col start mt-8">
          <h1 className="font-bold text-black red-hat lg:text-xl text-base ">
            Intro video
          </h1>
          <p className="text-muted text ">
            Hint: Your intro video should be 30 seconds, use a good background
            in a well lit environment for a quality presentation that attracts
            more bookings.
          </p>
        </div>
        {/* end */}
        {/* start of inout */}
        <div className="w-full mt-0 flex flex-col">
          {/* <div className="w-full mt-4 lg:w-2/3 grid grid-cols-2 max-w-[435px] h-[36px] rounded-md p-1 bg-[#F4F4F5]">
            <div
              className={`${
                videoType === 0
                  ? "flex items-center h-full bg-white justify-center text-sm inter font-medium text-foreground  cursor-pointer"
                  : "flex items-center justify-center text-foreground text-sm inter cursor-pointer "
              }`}
              onClick={() => setVideoType(0)}
            >
              Use Url
            </div>
            <div
              onClick={() => setVideoType(1)}
              className={`${
                videoType === 1
                  ? "flex items-center h-full bg-white justify-center text-sm inter font-medium text-foreground  cursor-pointer"
                  : "flex items-center justify-center text-foreground text-sm inter cursor-pointer "
              }`}
            >
              Upload
            </div>
          </div> */}
          <div className="w-full mt-3">
            {/* {videoType === 0 && (
              <UrlInput
                placeholder="www.facebook.com"
                value={videoUrl}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setVideoUrl(e.target.value)
                }
                label="Video URL"
              />
            )} */}

            <VideoUpload imageUrl={videoUrl} setImageUrl={setVideoUrl} />
          </div>
        </div>
        {/* end of input */}
        <div className="flex gap-3 items-center mt-8">
          <span>
            <OutlineBtn name="Discard changes" />
          </span>
          <span>
            <BigButton name="Update Profile" onClick={updateProfile} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default CoachProfile;
