import { useRef, useState } from "react";
import { CalenderIcon, EyeSlash } from "../../assets";
interface dateProps {
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
  height?: string;
}
export const Input = ({
  className,
  label,
  value,
  setValue,
  type,
  placeholder,
  height
  
}: {
  className?: string;
  label: string;
  value: any;
  setValue: any;
  placeholder?: string;
    type?: string;
    height?:string
  
}) => {
  return (
    <div className={`w-full flex flex-col  ${className}`}>
      <label className="text-xs text-foreground font-medium dm-sans mb-2">
        {label}
      </label>
      <input
        type={type ? type : "text"}
        className={`  rounded-[4px] px-3 py-[15px] flex items-center border border-[#E0E0E0] outline-none placeholder:text-black placeholder:text-opacity-50 bg-transparent focus:bg-transparent placeholder:text-sm text-black text-sm  ${height ? height : "h-[46px"} ` }
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};
export const Password = ({
  className,
  label,
  value,
  setValue,
  
}: {
  className?: string;
  label: string;
  value: any;
  setValue: any;

}) => {
  const [show, setShow] = useState(false);
  return (
    <div className={`w-full flex flex-col  ${className}`}>
      <label className="text-xs text-[#707070] font-medium dm-sans mb-2">
        {label}
      </label>
      <div className=" h-[46px] rounded-[4px] px-3 py-[15px] flex items-center border border-[#E0E0E0]">
        <input
          type={show ? "text" : "password"}
          className="  flex items-center bg-transparent focus:bg-transparent flex-grow border-none outline-none   placeholder:text-black placeholder:text-opacity-50 placeholder:text-sm text-black text-sm  "
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
          }
          placeholder="**********"
        />
        <span>
          {show ? (
            <span className="cursor-pointer" onClick={() => setShow(!show)}>
              <EyeSlash />{" "}
            </span>
          ) : (
            <span className="cursor-pointer" onClick={() => setShow(!show)}>
              {" "}
              <EyeSlash />{" "}
            </span>
          )}
        </span>
      </div>
    </div>
  );
};


export default function UrlInput({
  className,
  label,
  value,
  setValue,
  type,
  placeholder,
  preUrl,
  onChange,
}: {
  className?: string;
  label: string;
  value: any;
  setValue?: any;
  placeholder?: string;
  type?: string;
  preUrl?: string;
  onChange: any;
}) {
  return (
    <div className="w-full">
      <label
        htmlFor="company-website"
        className="block text-xs text-foreground font-medium dm-sans"
      >
        {label && label}
      </label>
      <div className="mt-1 flex rounded-md shadow-sm">
        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
          {preUrl ? preUrl : "https://"}
        </span>
        <input
          type="text"
          name="company-website"
          id="company-website"
          className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-[#E0E0E0] sm:text-sm "
          placeholder={placeholder}
          value={value}
        onChange={onChange}
        />
      </div>
    </div>
  );
}


export const DateInput = ({
  date,
  setDate,
  className,
  height,
}: dateProps) => {
  const inputRef = useRef<any>(null);
  const onCalenderIconClick = () => {
    if (inputRef?.current) {
      inputRef.current.focus();
      inputRef?.current?.showPicker();
    }
  };
  return (
    <div
      className={`relative outline-none rounded-[5px] border border-border flex  items-center px-4  w-full      ${className} ${
        height ? height : "h-[36px]"
      }`}
    >
      <input
        type="date"
        name="date"
        className=" opacity-0  "
        value={date}
        onChange={(e: any) => setDate(e.target?.value)}
        ref={inputRef}
      />
      <div className="flex items-center  justify-between w-full px-3 absolute inset-0">
        <p
          className={` text-sm  ${
            date ? "text-foreground" : "text-[#71717A]"
          }`}
        >
          {date ? date : "Select Date"}
        </p>
        <span className="cursor-pointer" onClick={onCalenderIconClick}>
          <CalenderIcon />
        </span>
      </div>
    </div>
  );
};

