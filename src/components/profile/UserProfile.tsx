import  { ChangeEvent, useEffect, useState } from "react";
import camera from "../../assets/icons/camera-icon.png";
import dp from "../../assets/png/dp.jpg";
import UrlInput, { Input } from "../Input";
import { BigButton, CapsuleBtn, OutlineBtn } from "../Button";
import PrimarySelect from "../Selects/PrimarySelect";
import { Location } from "../../util/location";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getUserProfile,restoreDefault,updateUserProfile } from "../../features/auth/authSlice";
import LoadingComponent from "../Loaders/skeleton-loading";
import { UserProfileData } from "../../util/types";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { TiDelete } from "react-icons/ti";
import toast from "react-hot-toast";
import { storage } from "../../firebase";
import axios from "axios";
const uploadEndpoint = "https://mylangcoach-api.onrender.com/api/v1/file-upload";
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
  const [languageList, setLanguageList] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);
const [languages, setLanguages] = useState<string[]>(["english", "french"]);
const [newLanguage, setNewLanguage] = useState<string>("");
const [showInput, setShowInput] = useState<boolean>(false);

const handleAddLanguage = () => {
  if (newLanguage && !languages.includes(newLanguage.toLowerCase())) {
    setLanguages([...languages, newLanguage.toLowerCase()]);
    setNewLanguage("");
    setShowInput(false);
  }
};

const handleDeleteLanguage = (languageToDelete: string) => {
  setLanguages(languages.filter((language) => language !== languageToDelete));
};


  useEffect(() => {
    if (userData) {
      setFirstname(userData.firstName || "");
      setLastname(userData.lastName || "");
      setProfileUrl(userData.profileImage || ""); // assuming username exists in userData
      setCountry(userData.country || "");
      setDesc(userData.description || "");
      setBio(userData.bio || "");
      setSocialMedia(userData.socials?.length === 0 ? [""] : userData?.socials);
      setLanguages(userData.languageInterests || []);
  
   
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

 const updateProfile = () => {
   const updatedProfile = {
     firstName: firstname,
     lastName: lastname,
     description: desc,
     bio: bio,
     country: country?.name,
     socials: socialMedia,
     languageInterests:languages
   
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
         dispatch(updateUserProfile({profileImage:url})); 
        // setPreview("");
      });
    }
  );
}; 

  
  useEffect(() => {
    if (user.updateProfileSuccess) { 
      toast.success("Profile Updated Successfully");
      dispatch(restoreDefault());
       dispatch(getUserProfile());
  }
  }, [user?.updateProfileSuccess])  
  


  
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
           "accept": "application/json"
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
    console.log(languages)


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
            backgroundImage: `url(${profileUrl ? profileUrl : dp})`,

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
              accept="image/*"
              id=""
              onChange={handleImageChange}
              // onChange={(e) => getFiles(e.target.files)}
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
            Language Preferences
          </h1>
          <CapsuleBtn name="Add language" onClick={() => setShowInput(true)} />
        </div>
        {/* end */}
        <div className="w-full flex gap-4 flex-wrap items-center mt-3">
          {languages?.map((language, index) => (
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
