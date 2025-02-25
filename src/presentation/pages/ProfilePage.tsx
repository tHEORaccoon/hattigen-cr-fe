import React, { useState } from "react";
import { Edit, Trash2, ArrowDownToLine } from "lucide-react";
import LogoImage from "../../assets/logo.png";
import profileImg from "../../assets/profile-img.png";
import { logout } from "@/core/service";

const tabs = [
  "Programming Languages",
  "Frameworks",
  "Databases & ORM",
  "Cloud Platforms",
  "AI Experience",
  "Mobile Environments",
  "Skillsets",
  "Tools",
];

const tabContent: Record<string, { name: string; duration: string }[]> = {
  "Programming Languages": [
    { name: "Java", duration: "12 months" },
    { name: "Python", duration: "40 months" },
    { name: "JavaScript", duration: "36 months" },
    { name: "C++", duration: "42 months" },
  ],
  Frameworks: [
    { name: "React", duration: "24 months" },
    { name: "Next.js", duration: "18 months" },
    { name: "Django", duration: "30 months" },
  ],
  "Databases & ORM": [
    { name: "PostgreSQL", duration: "36 months" },
    { name: "MongoDB", duration: "24 months" },
  ],
  "Cloud Platforms": [{ name: "AWS", duration: "20 months" }],
  "AI Experience": [{ name: "TensorFlow", duration: "12 months" }],
  "Mobile Environments": [{ name: "React Native", duration: "15 months" }],
  Skillsets: [{ name: "Problem Solving", duration: "N/A" }],
  Tools: [{ name: "Docker", duration: "14 months" }],
};

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0]); 
  // const navigate = useNavigate(); // Get the navigate function

  const handleLogout = async () => {
    try {
      await logout(); // Backend should clear cookies
      window.location.href = "/login"; // Redirect to login
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-100 flex flex-col">
      {/* Header Section */}
      <div className="flex justify-between items-center border-b pb-4 px-4 sm:px-8 md:px-16 py-4 bg-white flex-wrap">
        <img
          src={LogoImage}
          alt="Code Raccoon Logo"
          className="w-10 sm:w-12 md:w-24 max-w-[80px] md:max-w-[100px]"
        />
         <div className="flex items-center space-x-1 sm:space-x-4 flex-wrap">
          <button className="text-gray-500 hover:text-black flex items-center text-sm sm:text-base px-2 py-1 sm:px-4 sm:py-2">
            Preview
          </button>
          <button className="text-gray-600 hover:text-black flex items-center text-sm sm:text-base px-2 py-1 sm:px-4 sm:py-2">
            Download CV <ArrowDownToLine className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2" />
          </button>
          <button onClick={handleLogout} className="text-red-500 hover:text-red-700 font-medium text-sm sm:text-base px-2 py-1 sm:px-4 sm:py-2">
            Logout
          </button>
        </div>
      </div>

      {/* Profile Section */}
      <div className="flex flex-col md:flex-row bg-white shadow-md p-6 m-6 rounded-lg justify-between items-center relative">
        <div className="w-48 h-60 sm:w-56 sm:h-72 rounded-lg overflow-hidden border-4 border-white shadow-md">
          <img src={profileImg} alt="Profile" className="w-full h-full object-cover" />
        </div>
        <div className="ml-6 flex-1">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">Richard Agbekey</h2>
          <p className=" text-base sm:text-lg text-green-600">Full stack engineer</p>

          <div className="mt-6 text-gray-700 space-y-5">
            <div>
              <p className="font-semibold flex items-center">📧 Contact</p>
              <p className="text-gray-500">richard.agbekey@codercacoon.com</p>
              <p className="text-gray-500">+233 55 450 9087</p>
            </div>

            <div className="mt-6">
              <p className="font-semibold flex items-center">📍 Address</p>
              <p className="text-gray-500">Suncity, North Legon, Accra, Ghana</p>
            </div>
          </div>
        </div>
        <div className="hidden sm:flex c++0top-4 right-4 space-x-4">
      {/* Edit Button */}
      <button className="absolute top-4 left-1/3 bg-gray-100 p-2 rounded-full hover:bg-gray-200">
        <Edit className="w-5 h-5 text-gray-600" />
      </button>

      {/* Senior Level Badge */}
      <div className="absolute top-4 right-16 flex items-center text-blue-500 font-medium">
        <span className="ml-2">Senior Level</span>
      </div>
    </div>

      </div>
      {/* Experience Section */}
      <div className="m-6">
        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-4 border-b pb-2 text-gray-400">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`font-semibold px-3 py-2 ${
                activeTab === tab ? "border-b-2 border-black text-black" : "text-gray-400"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-4">
          {tabContent[activeTab]?.length ? (
            tabContent[activeTab].map((skill, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 bg-white shadow-md rounded-lg my-2 text-gray-700"
              >
                <span className="font-medium">{skill.name}</span>

                {/* Duration & Actions */}
                <div className="flex space-x-3">
                  <span className="text-gray-500 md:mr-16 mr-4">{skill.duration}</span>
                  <button className="text-gray-600 hover:text-black">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 mt-4">No data available for this category.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;


