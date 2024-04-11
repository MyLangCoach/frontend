import React, { useState } from "react";
import camera from "../../assets/icons/camera-icon.png";
import dp from "../../assets/png/dp.jpg";
import UrlInput, { Input } from "../Input";
import { BigButton, Button, CapsuleBtn, OutlineBtn } from "../Button";
import PrimarySelect from "../Selects/PrimarySelect";
import { Location } from "../../util/location";

const UserProfile = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [country, setCountry] = useState("");
  const [desc, setDesc] = useState("");
  const [bio, setBio] = useState("");
  const [socialMedia, setSocialMedia] = useState("");
  const [qualification, setQualification] = useState("");
  const [isOgr, setIsOrg] = useState("");
  const [year, setYear] = useState({ name: "", value: "" });
  const [lang, setLang] = useState("");
  const [cost, setCost] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [prof, setProf] = useState({ name: ""})

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
            />
            <span>
              <img src={camera} alt="camera" />
            </span>
          </div>
        </div>
        <div
          className="flex -mt-12 z-pro mx-auto lg:ml-12 border-[3px] items-center justify-center border-white relative"
          style={{
            backgroundImage: `url(${dp})`,
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
        <div className="w-full mt-4">
          <UrlInput
            preUrl="https://www.mylangcoach/"
            placeholder="geo"
            value={username}
            setValue={setUsername}
            label="Username"
          />
        </div>
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
            name="Select Country"
          />
        </span>
        {/* end */}
        {/* start */}
        <div className="flex justify-between items-center mt-8">
          <h1 className="font-bold text-black red-hat lg:text-xl text-base ">
            Social media
          </h1>
          <CapsuleBtn
            name="Add social media"
            onClick={() => console.log("first")}
          />
        </div>
        {/* end */}
        {/* start of inout */}
        <div className="w-full mt-4">
          <UrlInput
            placeholder="www.facebook.com"
            value={socialMedia}
            setValue={setSocialMedia}
            label="Facebook"
          />
        </div>
        {/* end of input */}
        {/* start */}
        <div className="flex justify-between items-center mt-8">
          <h1 className="font-bold text-black red-hat lg:text-xl text-base ">
            Language
          </h1>
          <CapsuleBtn
            name="Add language"
            onClick={() => console.log("first")}
          />
        </div>
        {/* end */}
        {/* start of an input */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          <div>
            <Input
              value={lang}
              setValue={setLang}
              label="Language"
              height="h-[36px]"
              placeholder="French"
            />
          </div>
          <div>
            <PrimarySelect
              selected={prof}
              setSelected={setProf}
              label="Proficiency"
              data={[{ name: "Expert" }, { name: "Master" }]}
              name="Select"
            />
          </div>
        </div>
        {/* end of an input */}
        {/* start */}
        <div className="flex justify-between items-center mt-8">
          <h1 className="font-bold text-black red-hat lg:text-xl text-base ">
            Professional Qualification
          </h1>
          <CapsuleBtn
            name="Add Qualification"
            onClick={() => console.log("first")}
          />
        </div>
        {/* end */}
        {/* start of an input */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
          <div>
            <Input
              value={lang}
              setValue={setLang}
              label="Name of Qualification"
              height="h-[36px]"
              placeholder=""
            />
          </div>
          <div>
            <Input
              value={lang}
              setValue={setLang}
              label="Issuing Organization"
              height="h-[36px]"
              placeholder="French"
            />
          </div>
          <div>
            <PrimarySelect
              selected={year}
              setSelected={setYear}
              label="Year"
              data={[{ name: "1999" }, { name: "2000" }]}
              name="Select"
            />
          </div>
        </div>
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
            value={socialMedia}
            setValue={setSocialMedia}
            label="Video URL"
          />
        </div>
        {/* end of input */}
        <div className="flex gap-3 items-center mt-8">
          <span>
            <OutlineBtn name="Discard changes" />
          </span>
          <span>

          <BigButton name="Update Profile" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
