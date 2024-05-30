import  { useEffect, useState } from "react";
import camera from "../../assets/icons/camera-icon.png";
import dp from "../../assets/png/dp.jpg";
import UrlInput, { Input } from "../Input";
import { BigButton, Button, CapsuleBtn, OutlineBtn } from "../Button";
import PrimarySelect from "../Selects/PrimarySelect";
import { Location } from "../../util/location";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getUserProfile,updateUserProfile } from "../../features/auth/authSlice";
import LoadingComponent from "../Loaders/skeleton-loading";
import { Language,Qualification,UserProfileData } from "../../util/types";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import toast from "react-hot-toast";
import { storage } from "../../firebase";
const UserProfile = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth);
  useEffect(() => {
    dispatch(getUserProfile());
  }, []);
  
  const userData: UserProfileData | undefined = user?.userData;

  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [profileUrl, setProfileUrl] = useState<string>("");
  
  const [country, setCountry] = useState<any>("");
  const [desc, setDesc] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [socialMedia, setSocialMedia] = useState<string[]>([""]);
  const [fileUrl, setFileUrl] = useState("");
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
  const [languages, setLanguages] = useState<Language[]>([
    { language: "", proficiency: "" },
  ]);
  const [cost, setCost] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [prof, setProf] = useState<{ name: string }>({ name: "" });
    const [qualifications, setQualifications] = useState<Qualification[]>([
      { name: "", issuing_org: "", year: 0 },
    ]);
  console.log(userData)
  useEffect(() => {
    if (userData) {
      setFirstname(userData.firstName || "");
      setLastname(userData.lastName || "");
      setProfileUrl(userData.profileImage || ""); // assuming username exists in userData
      setCountry(userData.country || "");
      setDesc(userData.description || "");
      setBio(userData.bio || "");
      setSocialMedia(userData.socials || [""]);
         setQualifications(
           userData.qualifications || [{ name: "", issuing_org: "", year: 0 }]
         );// assuming single qualification
      setIsOrg(userData.qualifications?.[0]?.issuing_org || "");
      setYear({
        name: userData.qualifications?.[0]?.name || "",
        value: userData.qualifications?.[0]?.year || 0,
      });
      setLanguages(userData.languages || [{ language: "", proficiency: "" }]);
      setVideoUrl(userData.introVideo || "");
      setProf({ name: userData.profileImage || "" });
    }
  }, [userData]);

    const addSocialMedia = () => {
      setSocialMedia([...socialMedia, ""]);
    };

    const handleSocialMediaChange = (index:number, value:string) => {
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
   };

   // Dispatch the action to update the user profile
   dispatch(updateUserProfile(updatedProfile));
 };


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
        // setPreview("");
      });
    }
  );
};


useEffect(() => {
  if (selectedFile) {

    uploadFile()
  }
}, [selectedFile])
  useEffect(() => {
    if (fileUrl) {
      const data = {
        profileImage: fileUrl,
        firstName: firstname,
        lastName: lastname,
        description: desc,
        bio: bio,
        country: country?.name,
        socials: socialMedia,
        languages: languages,
        qualifications: qualifications,
        introVideo: videoUrl,
      };
         dispatch(updateUserProfile(data));
    }
  }, [fileUrl])
  
  console.log(fileUrl);


  if (user?.fetchLoading) {
    return (
      <div className="px-6 ">
        <LoadingComponent />
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col rounded-[4px] bg-white mt-4 px-4 lg:px-0">
      <div className="flex flex-col z-0">
        <div className="w-full rounded-t-[4px] mt-2 h-[150px] lg:h-[178px] bg-[#0E79FF] flex relative justify-center items-center z-10  ">
          <div className="flex relative">
            <input
              type="file"
              name=""
              className="inset-0 opacity-0 absolute"
              id=""
              // onChange={(e) => getFiles(e.target.files)}
            />
            <span>
              <img src={camera} alt="camera" />
            </span>
          </div>
        </div>
        <div
          className="flex -mt-12 z-pro mx-auto lg:ml-12 border-[3px] items-center justify-center border-white relative"
          style={{
            backgroundImage: `url(${profileUrl ? profileUrl  : dp})`,

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
              onChange={(e) => getFiles(e.target.files)}
            />
            <span>
              <img src={camera} alt="camera" />
            </span>
          </div>
        </div>
      </div>
      <div className="w-full mt-12 flex flex-col px-2 lg:px-6 lg:py-6 py-4">
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
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
            setValue={setUsername}
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
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
        </div>
        {/* end */}
        {/* start */}
        <div className="w-full mt-4 flex flex-col">
          <label className="text-xs text-foreground font-medium dm-sans mb-2">
            Short Description
          </label>
          <textarea
            id=""
            className="min-h-20 rounded-[4px] px-3 py-[15px] flex items-center border border-[#E0E0E0] outline-none placeholder:text-black placeholder:text-opacity-50 bg-transparent focus:bg-transparent placeholder:text-sm text-black text-sm "
            placeholder="type message here"
            value={desc}
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
          {socialMedia.map((social: string, index: number) => (
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
        {languages.map((lang, index) => (
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
                data={[{ name: "Expert" }, { name: "Master" }]}
                name="Select"
              />
            </div>
          </div>
        ))}
        {/* end of an input */}
        {/* start */}
        <div className="flex justify-between items-center mt-8">
          <h1 className="font-bold text-black red-hat lg:text-xl text-base ">
            Professional Qualification
          </h1>
          <CapsuleBtn name="Add Qualification" onClick={addQualification} />
        </div>
        {/* end */}
        {/* start of an input */}
        {qualifications.map((qual, index) => (
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
                data={[
                  { name: "1999" },
                  { name: "2000" },
                  { name: "2001" },
                  // Add more years as needed
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
            Offering <span className="font-[300] ">(Maximum two)</span>
          </h1>
          <CapsuleBtn
            name="Add Offering"
            onClick={() => console.log("first")}
          />
        </div>
        {/* end */}
        {/* start of an input */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          <div>
            <Input
              value={firstname}
              setValue={setFirstname}
              label="Language"
              height="h-[36px]"
            />
          </div>
          <div>
            <Input
              value={lastname}
              setValue={setLastname}
              label="Cost per 45mins"
              height="h-[36px]"
            />
          </div>
        </div>
        {/* end of an input */}
        {/* start */}
        <div className="flex justify-between items-center mt-8">
          <h1 className="font-bold text-black red-hat lg:text-xl text-base ">
            Intro video
          </h1>
        </div>
        {/* end */}
        {/* start of inout */}
        <div className="w-full mt-4">
          <UrlInput
            placeholder="www.facebook.com"
            value={videoUrl}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setVideoUrl(e.target.value)
            }
            label="Video URL"
          />
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

export default UserProfile;
