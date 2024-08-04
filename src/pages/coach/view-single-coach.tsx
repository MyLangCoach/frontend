import React, { useEffect, useState } from "react";
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
import { ClassDetails } from "../../util/types";
import OfferingCard from "../../components/coaches-component/offering-card";

const ViewSingleCoachPage = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const offering = useAppSelector((state) => state.offerings);
  const [isOffering, setIsOffering] = useState(false);
  const id = useParams();
  const userId = id.id;
  useEffect(() => {
    dispatch(getAllCoaches());
    dispatch(getSingleCoachOffering({ id: id?.id }));
    dispatch(resetRedirect());
    dispatch(getSingleUserDetail(userId));
    // dispatch(getAllStudent());
  }, []);
  const handleError = (e: any) => {
    e.target.onerror = null; // Prevent looping
    e.target.src = pic;
  };

  const allOfferings: ClassDetails[] = offering?.singleCoachOffering;

  const coachDetail = auth?.singleUserProfile?.[0];
  const recentOfferings: ClassDetails[] = auth?.singleUserProfile?.[1];

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
    <div className="w-full flex flex-col">
      {/* start of banner side */}
      <div
        className="w-full h-[400px] flow-hide "
        style={{
          background: `url(${banner})`,
          backgroundSize: "cover",
        }}
      >
        <ContainerLayout>
          <div className="w-full flex items-end h-[380px] pb-4  ">
            <img
              src={coachDetail?.profileImage}
              onError={handleError}
              alt="pics"
              className="border border-white rounded-full w-[126px] h-[126px] object-cover"
            />
          </div>
        </ContainerLayout>
      </div>

      {/* end of the banner side */}
      <ContainerLayout>
        <div className="w-full flex flex-col gap-6 xl:flex-row">
          {/* profile detail */}
          <div className="w-2/3 flex flex-col">
            <div className="flex flex-col w-full">
              <div className="flex items-center mt-4 gap-3">
                <h1 className="text-[28px] font-bold red-hat uppercase">
                  {coachDetail?.firstName} {coachDetail?.lastName}
                </h1>
                <img src={ar} alt="ar" />
                <span>
                  <VerifyIcon />
                </span>
              </div>
              <p className="max-w-[644px] text-sm red-hat">
                {coachDetail?.description}
              </p>
              <div className="w-full mt-4 flex flex-col gap-3">
                <div className="flex items-center gap-[6px]">
                  <span>
                    <CapIcon />
                  </span>
                  <p className="text-muted  text-sm">
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
                      {allOfferings?.length} Lessons
                    </p>
                  </div>
                </div>
                <div className="w-full gap-3 items-center flex ">
                  <span>
                    <LanguageIcon />
                  </span>
                  <div className="text-muted  text-sm flex items-center gap-2">
                    {coachDetail?.languages?.slice(0, 2)?.map((lang: any) => (
                      <p className="text-muted text-sm">
                        {lang?.language} {`(${lang.proficiency})`}{" "}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full mt-8 flex gap-5">
              <div className="w-3/12">
                <h1
                  className={`text-xl  red-hat cursor-pointer ${
                    isOffering
                      ? "text-muted text-base"
                      : "text-black font-bold text-xl"
                  }`}
                  onClick={() => setIsOffering(false)}
                >
                  About
                </h1>
                <h1
                  className={`text-base mt-3 cursor-pointer red-hat  ${
                    isOffering
                      ? "text-black font-bold text-xl"
                      : "text-muted text-base"
                  }`}
                  onClick={() => setIsOffering(true)}
                >
                  Offerings
                </h1>
              </div>
              {isOffering ? (
                <div className="flex flex-col ">
                  <h1 className="text-xl font-bold red-hat mb-6">
                    Coach Offerings
                  </h1>
                  <div className="flex flex-col gap-8">
                    {allOfferings?.map((item, index) => (
                      <div className="flex items-center " key={index}>
                        <OfferingCard item={item} key={index} />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="w-9/12 flex flex-col">
                  <h1 className="text-xl font-bold red-hat">About the coach</h1>

                  <p className="text-base red-hat leading-[27px]">
                    {coachDetail?.bio}
                  </p>
                  <h1 className="text-xl font-bold red-hat mt-12">
                    Similar Coaches
                  </h1>

                  <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-4 mt-6">
                    {auth?.allCoaches?.map((item: any, index: any) => {
                      return <SingleCoachCard key={index} item={item} />;
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* end of profile detail */}

          {/* offering  */}
          <div className="w-1/3 flex flex-col">
            {!isOffering && (
              <div className="flex flex-col mt-4">
                <h1 className="text-xl font-bold red-hat mb-4 ">
                  Recent Offerings
                </h1>
                <div className="flex flex-col gap-5">
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
