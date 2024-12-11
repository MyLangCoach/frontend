import React, { useEffect, useState, useRef } from "react";
import ContainerLayout from "../../layouts/ContainerLayout";
import banner from "../../assets/png/face-woman.png";
import pic from "../../assets/png/user-pic-1.png";
import ar from "../../assets/png/ar.png";
import { CapIcon, LanguageIcon, UsersIcon, VerifyIcon } from "../../assets";
import { Button } from "../../components/Button";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import SingleCoachCard from "../../components/coaches-component/single-coach-card";
import {
  getAllCoaches,
  getSingleUserDetail,
  resetRedirect,
} from "../../features/auth/authSlice";
import { getSingleCoachOffering } from "../../features/offeringslice";
import { useParams } from "react-router-dom";
import LoadingComponent from "../../components/Loaders/skeleton-loading";
import { ClassDetails, CoachDetails } from "../../util/types";
import OfferingCard from "../../components/coaches-component/offering-card";
import SingleVideoCard from "../../components/coaches-component/single-video-coach";
import CoachSessionCalendar from "../../components/coaches-component/coach-session-calender";
import { Link } from "react-router-dom";
interface SocialMedia {
  platform: string;
  link: string;
}

const ViewSingleCoachPage = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const offering = useAppSelector((state) => state.offerings);
  const [isOffering, setIsOffering] = useState(false);
  const [present, setPresent] = useState<number>(0);
  const id = useParams();
  const userId = id.id;
   const aboutRef = useRef<HTMLDivElement>(null);
   const scheduleRef = useRef<HTMLDivElement>(null);
   const qualificationRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // dispatch(getAllCoaches());
    dispatch(getSingleCoachOffering({ id: id?.id }));
    dispatch(resetRedirect());
    dispatch(getSingleUserDetail(userId));
    // dispatch(getAllStudent());
  }, []);

  const handleError = (e: any) => {
    e.target.onerror = null; // Prevent looping
    e.target.src = pic;
  };

  function extractPlatformName(links: string[]): SocialMedia[] {
    const socialMediaPlatforms: SocialMedia[] = [];

    links?.forEach((link) => {
      if (link?.includes("linkedin")) {
        socialMediaPlatforms?.push({ platform: "LinkedIn", link });
      } else if (link?.includes("facebook")) {
        socialMediaPlatforms?.push({ platform: "Facebook", link });
      } else if (link?.includes("twitter")) {
        socialMediaPlatforms.push({ platform: "Twitter", link });
      } else if (link?.includes("instagram")) {
        socialMediaPlatforms?.push({ platform: "Instagram", link });
      } else if (link?.includes("youtube")) {
        socialMediaPlatforms?.push({ platform: "YouTube", link });
      } else {
        socialMediaPlatforms?.push({ platform: "Unknown", link });
      }
    });

    return socialMediaPlatforms;
  }

  const allOfferings: ClassDetails[] = offering?.singleCoachOffering;

  const coachDetail  : CoachDetails = auth?.singleUserProfile;

  const recentOfferings: ClassDetails[] = auth?.singleUserProfile?.offerings?.slice(0,1); 

  // console.log(coachDetail)
  const socialMedia = extractPlatformName(coachDetail?.socials);
  console.log(socialMedia);
    const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
      ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  if (auth?.fetchLoading || offering?.fetchLoading) {
    return (
      <div className="w-full">
        <ContainerLayout>
          <LoadingComponent />
        </ContainerLayout>
      </div>
    );
  }
  return (
    <div className="w-full flex flex-col relative overflow-x-hidden">
      {/* start of banner side */}
      <div
        className="w-full h-[400px] flow-hide blur-md relative "
        style={{
          background: `url(${coachDetail?.profileImage ?? banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <ContainerLayout>
        <div className="w-full flex items-end h-[380px] pb-4 absolute z-pro top-0  ">
          <img
            src={coachDetail?.profileImage}
            onError={handleError}
            alt="pics"
            className="border border-white rounded-full w-[126px] h-[126px] object-cover"
          />
        </div>
      </ContainerLayout>

      {/* end of the banner side */}
      <ContainerLayout>
        <div className="w-full flex flex-col gap-6 xl:flex-row">
          {/* profile detail */}
          <div className="w-full lg:w-2/3 flex flex-col">
            <div className="flex flex-col w-full">
              <div className="flex items-center mt-4 gap-3">
                <h1 className="text-xl lg:text-[28px] font-bold red-hat uppercase">
                  {coachDetail?.firstName} {coachDetail?.lastName}
                </h1>

                <span>
                  <VerifyIcon />
                </span>
              </div>
              <p className="max-w-[644px] text-sm red-hat">
                {coachDetail?.bio}
              </p>
              <div className="w-full mt-4 flex flex-col gap-3">
                <div className="flex items-center gap-[6px]">
                  <span>
                    <CapIcon />
                  </span>
                  <p className="text-muted  text-sm capitalize">
                    {coachDetail?.languages?.[0]?.language}
                  </p>
                </div>
                <div className="gap-4 flex items-center ">
                  <div className="flex items-center gap-[6px]">
                    <span>
                      <UsersIcon />
                    </span>
                    <p className="text-muted  text-sm">20 Student</p>
                  </div>

                  <div className="flex items-center gap-[6px] ">
                    <span className="bg-muted w-[5px] h-[5px] rounded-full"></span>
                    <p className="text-muted  text-sm">
                      {allOfferings?.length} Classes
                    </p>
                  </div>
                </div>
                <div className="w-full gap-3 items-center flex ">
                  <span>
                    <LanguageIcon />
                  </span>
                  <div className="text-muted  text-sm flex items-center gap-2">
                    {coachDetail?.languages?.slice(0, 2)?.map((lang: any) => (
                      <p className="text-muted text-sm capitalize">
                        {lang?.language} {`(${lang.proficiency})`}{" "}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full mt-8 flex gap-5 lg:flex-row flex-col">
              <div className="w-full flex flex-row lg:flex-col items-center lg:items-start gap-3 lg:w-3/12">
                <h1
                  className={`text-xl  red-hat cursor-pointer ${
                    present !== 0
                      ? "text-muted text-base"
                      : "text-black font-bold text-xl"
                  }`}
                  onClick={() => {
                    scrollToSection(aboutRef);
                    setPresent(0);
                  }}
                >
                  About
                </h1>
                <h1
                  className={`text-xl  red-hat cursor-pointer ${
                    present !== 1
                      ? "text-muted text-base"
                      : "text-black font-bold text-xl"
                  }`}
                  onClick={() => {
                    scrollToSection(scheduleRef);
                    setPresent(1);
                  }}
                >
                  Schedule
                </h1>
                <h1
                  className={`text-xl  red-hat cursor-pointer ${
                    present !== 2
                      ? "text-muted text-base"
                      : "text-black font-bold text-xl"
                  }`}
                  onClick={() => {
                    scrollToSection(qualificationRef);
                    setPresent(2);
                  }}
                >
                  Qualification
                </h1>
                <h1
                  className={`text-xl  red-hat cursor-pointer ${
                    present !== 3
                      ? "text-muted text-base"
                      : "text-black font-bold text-xl"
                  }`}
                  onClick={() => {
                    setPresent(3);
                  }}
                >
                  Offerings
                </h1>
              </div>
              {present === 3 ? (
                <div className="flex flex-col w-full ">
                  <h1 className="text-xl font-bold red-hat mb-6">
                    Coach Offerings
                  </h1>
                  <div className="w-full grid grid-cols-1 gap-8 lg:grid-cols-1   ">
                    {allOfferings?.map((item, index) => (
                      <div className=" w-full  " key={index}>
                        <OfferingCard item={item} key={index} />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="w-full lg:w-9/12 flex flex-col flow-hide lg:h-screen">
                  <h1 className="text-xl font-bold red-hat" ref={aboutRef}>
                    About the coach
                  </h1>

                  <p className="text-base red-hat leading-[27px]">
                    {coachDetail?.description}
                  </p>

                  <h1 className="text-xl font-bold red-hat mt-12">Schedule</h1>
                  <div className="w-full" ref={scheduleRef}>
                    <CoachSessionCalendar item={coachDetail} />
                  </div>

                  {coachDetail?.qualifications?.length > 0 && (
                    <h1 className="text-xl font-bold red-hat mt-12">
                      Qualification
                    </h1>
                  )}
                  <div
                    className="w-full flex flex-col mt-4 gap-3"
                    ref={qualificationRef}
                  >
                    {coachDetail?.qualifications?.map(
                      (item: any, index: number) => {
                        return (
                          <div className="w-full flex flex-col" key={index}>
                            <div className="flex items-center gap-[6px]">
                              <span>
                                <CapIcon />
                              </span>
                              <p className="text-black  text-lg capitalize font-bold">
                                {item?.name}
                              </p>
                            </div>
                            <p className="text-sm red-hat lg:text-lg ml-5 ">
                              {item?.issuing_org}
                            </p>
                            <p className="text-sm red-hat lg:text-lg ml-5 ">
                              {item?.year}
                            </p>
                          </div>
                        );
                      }
                    )}
                  </div>
                  <h1 className="text-xl font-bold red-hat mt-6 ml-5">
                    Social Handles
                    </h1>
                    <div className="w-full flex flex-col ml-5">

                    {
                      socialMedia?.map((item) => (
                        <div>
                          <Link to={item?.link} target="_blank" rel="no referrer" className="text-primary capitalize" >
                          {item?.platform}
                          </Link>
                        </div>
                      ))
                    }
                    </div>

                  {/* <h1 className="text-xl font-bold red-hat mt-12">
                    Similar Coaches
                  </h1>

                  <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-4 mt-6">
                    {auth?.allCoaches?.map((item: any, index: any) => {
                      return <SingleCoachCard key={index} item={item} />;
                    })}
                  </div> */}
                </div>
              )}
            </div>
          </div>
          {/* end of profile detail */}

          {/* offering  */}
          <div className="w-full lg:w-1/3 flex flex-col">
            <div className="flex mt-6 w-full">
              <SingleVideoCard
                item={coachDetail}
                onClick={() => setPresent(3)}
              />
            </div>
            {!isOffering && (
              <div className="flex flex-col mt-4">
                <h1 className="text-xl font-bold red-hat mb-4 ">
                  Recent Offerings
                </h1>
                <div className="flex flex-col gap-5 w-full">
                  {recentOfferings?.map((item, index) => (
                    <OfferingCard item={item} key={index} />
                  ))}
                </div>
              </div>
            )}
          </div>
          {/* side offering */}
        </div>
      </ContainerLayout>
    </div>
  );
};

export default ViewSingleCoachPage;
