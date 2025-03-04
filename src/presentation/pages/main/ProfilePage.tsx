import React, { useEffect, useState } from "react";
import { X, Edit  } from "lucide-react";
import { MdEdit } from "react-icons/md";
import { logout, getCategory } from "@/core/service";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "@/core/redux/slice/authSlice";
import { setCategories } from "@/core/redux/slice/categorySlice";
import { RootState } from "@/core/redux/store/store";
import { contactImg, LogoImage, pinImg, profileImg } from "@/assets";
import CVPreviewModal from "@/presentation/components/CVPreviewModal";
import DownloadDropdown from "@/presentation/components/DownloadDropdown";
import ShareCV from "@/presentation/components/ShareCV";
import DownloadDropdown from "../components/DownloadDropdown";
import ShareCV from "../components/ShareCV";
import Loader from "./Loader";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);


  const [deleteSkill, setDeleteSkill] = useState<{ name: string; tab: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  console.log(user, "jjjgg")
  console.log(categories, "catjjjgg")

  // const tabs :  string[] = user?.skills
  // ? Array.from(new Set(user.skills.map((skill: any) => skill.category)))
  // : [];

  const [activeTab, setActiveTab] = useState<string>(categories.length > 0 ? categories[0]._id : "");


  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categories.length > 0 && !activeTab) {
      setActiveTab(categories[0]._id);
    }
  }, [categories]);

  const fetchCategories = async () => {
    try {
      const response = await getCategory();
      if (response) {
        dispatch(setCategories(response.data));
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const groupedSkills: Record<string, any[]> = {};
  categories.forEach((category) => {
    groupedSkills[category._id] =
      user?.skills?.filter((skill: any) => skill.category_id === category._id) || [];
  });

    console.log("Updated grouped skills:", groupedSkills);
  } else {
    console.error("User skills or categories are missing!");
  }
  
  //handle Delete function
  const handleDeleteConfirm = async () => {
    if (!deleteSkill) return;
  
    try {
      // Call API to delete the skill 
      // const response = await fetch(`/api/skills/${deleteSkill.name}`, {
      //   method: "DELETE",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
  
      // if (!response.ok) {
      //   throw new Error("Failed to delete skill");
      // }
  
      // Fxn to update the UI by removing the deleted skill
      // dispatch(
      //   setCategories(
      //     categories.map((category) =>
      //       category.name === deleteSkill.tab
      //         ? {
      //             ...category,
      //             skills: category.skills.filter((skill: any) => skill.name !== deleteSkill.name),
      //           }
      //         : category
      //     )
      //   )
      // );
  
      setIsModalOpen(false); 
      setDeleteSkill(null); 
    } catch (error) {
      console.error("Error deleting skill:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response.status) {
        console.log(response.data);
      }
      dispatch(clearUser());
      navigate("/auth/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (!user) {
    return (
      <>
        <Loader />
      </>
    )
  }

  return (
    <div className="w-screen h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4 px-4 sm:px-8 md:px-16 py-4 bg-white flex-wrap">
        <img
          src={LogoImage}
          alt="Code Raccoon Logo"
          className="w-10 sm:w-12 md:w-24 max-w-[80px] md:max-w-[100px]"
        />
        <div className="flex items-center space-x-1 sm:space-x-4 flex-wrap">
          <button onClick={() => setIsPreviewOpen(true)} className="text-gray-500 hover:text-black flex items-center text-sm sm:text-base px-2 py-1 sm:px-4 sm:py-2">
            Preview
          </button>
          <DownloadDropdown user={user} />
          <ShareCV />
          {/* <button className="text-gray-500 hover:text-black flex items-center text-sm sm:text-base px-2 py-1 sm:px-4 sm:py-2">
            Download CV <ArrowDownToLine className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2" />
          </button> */}
          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-red-700 font-medium text-sm sm:text-base px-2 py-1 sm:px-4 sm:py-2"
          >
            Logout
          </button>
        </div>
        {/* CV Preview Popup */}
        <CVPreviewModal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} />
      </div>

      {/* Profile Section */}
      <div className="flex flex-col md:flex-row p-6 m-6 justify-between items-center relative">
        <div className="w-48 h-60 sm:w-56 sm:h-72 rounded-lg overflow-hidden border-4 border-white">
          <img
            src={user?.profile_picture || profileImg}
            alt="Profile"
            className="w-full h-full object-cover"
          />

        </div>
        <div className="ml-6 flex-1">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">{user?.first_name || "No Name"}{" "}{user?.last_name}</h2>
          <p className="text-base sm:text-lg text-green-600">Full Stack Engineer</p>
          <div className="mt-6 text-gray-700 space-y-5">
            <div>
              <p className="font-semibold flex items-center leading-[22.5px]">
                <img src={contactImg} alt="contact" className="mr-2 w-4 h-4" />{" "}
                Contact
              </p>
              <p className="text-gray-500 text-[14px]">
                {user?.email || "No email"}
              </p>
              <p className="text-gray-500 text-[14px]">
                {user?.phone_number || "No phone number"}
              </p>
            </div>
            <div className="mt-6">
              <p className="font-semibold flex items-center">
                <img src={pinImg} alt="address" className="mr-2 w-4 h-4" />{" "}
                Address
              </p>
              <p className="text-gray-500 text-[14px]">
                {user ? `${user.city}, ${user.country}` : "No address"}
              </p>
            </div>
          </div>

          <div className="hidden sm:flex c++0top-4 right-4 space-x-4">


            <Edit className="w-5 h-5 text-gray-600" />
            <button className="absolute top-4 left-1/3 bg-gray-200 p-2 rounded-full hover:bg-gray-300">
              <MdEdit className="w-5 h-5 text-gray-600 hover:text-gray-700" /></button>

            {/* Senior Level Badge */}
            <div className="absolute top-4 right-16 flex items-center text-blue-500 font-medium">
              <span className="ml-2">Senior Level</span>
            </div>

          </div>




        </div>
      </div>

      {/* Skills / Experience Section */}
      <div className="m-6">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-4 border-b pb-2">
          {categories.length > 0 ? (
            categories.map((tab) => (
              <button
                key={tab._id}
                onClick={() => setActiveTab(tab.name)}
                className={`px-3 py-2 font-semibold ${
                  activeTab === tab.name ? "border-b-2 border-black text-black" : "text-gray-400 border-gray-400"
                }`}
              >
                {tab.name}
              </button>
            ))
          ) : (
            <p className="text-gray-500">No categories available.</p>
          )}
        </div>

        {/* Skills List */}
        <div className="mt-4">
          {groupedSkills[activeTab] && groupedSkills[activeTab].length > 0 ? (
            groupedSkills[activeTab].map((skill: any, index: number) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 bg-white shadow-md rounded-lg my-2"
              >
                <span className="font-medium">{skill.skill_id?.name || "Unknown Skill"}</span>
                <div className="flex space-x-3">
                  <span className="text-gray-500">
                    {skill.months_of_experience} months
                  </span>
                  <button className="text-gray-600 hover:text-black">
                    <MdEdit className="w-5 h-5" />
                  </button>
                  <button className="text-gray-600 hover:text-black">
                    <X className="w-5 h-5" 
                     onClick={() => {
                    setDeleteSkill({ name: skill.name, tab: activeTab });
                    setIsModalOpen(true);
                  }}
                    />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 mt-4">
              No skills available for this category.
            </p>
          )}
        </div>
      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete <strong>{deleteSkill?.name}</strong>?</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;



