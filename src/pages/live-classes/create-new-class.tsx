import DashboardLayout from "../../layouts/DashboardLayout"
import backArrow from "../../assets/icons/back-arrow.svg"
import { useNavigate } from "react-router-dom"
import CreateClassHome from "../../components/live-classes/create-class-home";
const CreateClass = () => {
    const navigate = useNavigate();
  return (
    <DashboardLayout current={2}>
      <div className="w-full flex flex-col">
        <div className="w-full gap-4 flex items-center mt-6">
          <span className="cursor-pointer" onClick={() => navigate(-1)}>
            <img src={backArrow} alt="" />
          </span>
          <p className="text-sm inter text-[#828282] ">
                      Offering/ <span className=" font-medium text-[#050505] text-sm">
                          Create new offering
                      </span>
                      
                  </p>
                  
              </div>
              <div className="w-full mt-8">
                  <CreateClassHome />
              </div>
      </div>
    </DashboardLayout>
  );
}

export default CreateClass
