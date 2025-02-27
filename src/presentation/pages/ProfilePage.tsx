import React, { useEffect, useState } from "react";
import { X, ArrowDownToLine } from "lucide-react";
import { MdEdit } from "react-icons/md";
import LogoImage from "../../assets/logo.png";
import profileImg from "../../assets/profile-img.png";
import pinImg from "../../assets/pin 1.svg";
import contactImg from "../../assets/contact 1.svg";
import { logout, getCategory } from "@/core/service";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "@/core/redux/slice/authSlice";
import CVPreviewModal from "../components/CVPreviewModal";
import { setCategories } from "@/core/redux/slice/categorySlice";
import { RootState } from "@/core/redux/store/store";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const categories = useSelector((state: RootState) => state.category.categories);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  console.log(user,"eee")
  const [activeTab, setActiveTab] = useState("")

// Check its type



  console.log(activeTab,"tabtab")

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      console.log(categories[0],'JJ')
      setActiveTab(categories[0].name); // Set the first category as active
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

  // **Group user's skills by category ID**
  const groupedSkills: Record<string, any[]> = {};
  categories.forEach((category) => {
    groupedSkills[category.id] =
      user?.skills?.filter((skill: any) => skill.category_id === category.id) || [];
  });

  console.log(groupedSkills,"ss")


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
          <button className="text-gray-500 hover:text-black flex items-center text-sm sm:text-base px-2 py-1 sm:px-4 sm:py-2">
            Download CV <ArrowDownToLine className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2" />
          </button>
          <button onClick={handleLogout} className="text-red-500 hover:text-red-700 font-medium text-sm sm:text-base px-2 py-1 sm:px-4 sm:py-2">
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
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">{user?.first_name || "No Name"}</h2>
          <p className="text-base sm:text-lg text-green-600">Full Stack Engineer</p>
          <div className="mt-6 text-gray-700 space-y-5">
            <div>
              <p className="font-semibold flex items-center leading-[22.5px]">
                <img src={contactImg} alt="contact" className="mr-2 w-4 h-4" /> Contact
              </p>
              <p className="text-gray-500 text-[14px]">{user?.email || "No email"}</p>
              <p className="text-gray-500 text-[14px]">{user?.phone_number || "No phone number"}</p>
            </div>
            <div className="mt-6">
              <p className="font-semibold flex items-center">
                <img src={pinImg} alt="address" className="mr-2 w-4 h-4" /> Address
              </p>
              <p className="text-gray-500 text-[14px]">{user ? `${user.city}, ${user.country}` : "No address"}</p>
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
                key={tab.id}
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
          {activeTab && groupedSkills[activeTab]?.length > 0 ? (
            groupedSkills[activeTab].map((skill: any, index: number) => (
              <div key={index} className="flex justify-between items-center p-3 bg-white shadow-md rounded-lg my-2">
                <span className="font-medium">{skill.name}</span>
                <div className="flex space-x-3">
                  <span className="text-gray-500">{skill.months_of_experience} months</span>
                  <button className="text-gray-600 hover:text-black">
                    <MdEdit className="w-5 h-5" />
                  </button>
                  <button className="text-gray-600 hover:text-black">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 mt-4">No skills available for this category.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
