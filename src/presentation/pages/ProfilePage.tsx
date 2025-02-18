// import React from "react";
// // import { FaDownload, FaEdit } from "react-icons/fa";
// import { ArrowDownToLine, Pencil } from "lucide-react";


// const ProfilePage: React.FC = () => {
//   return (
//     // <div className=" bg-gray-100 p-10 flex justify-center  h-screen w-full">
//       <div className="bg-white w-full p-6 rounded-lg shadow-md  ">
//         {/* Header */}
//         <div className="flex justify-between items-center border-b pb-4">
//           <h1 className="text-xl font-semibold">Profile</h1>
//           <div className="flex space-x-4">
//             <button className="text-gray-500 hover:text-black flex items-center">
//               Preview
//             </button>
//             <button className="text-gray-500 hover:text-black flex items-center">
//                Download CV <ArrowDownToLine className="mr-2" />
//             </button>
//             <button className="text-red-500">Logout</button>
//           </div>
//         </div>
        
//         {/* Profile Info */}
//         <div className="flex items-center mt-6 relative">
//           <img
//             src={profileImg}
//             alt="Profile"
//             className="w-24 h-24 rounded-full border"
//           />
//           <div className="ml-6 flex-1">
//             <h2 className="text-xl font-bold">Richard Agbekey</h2>
//             <p className="text-green-600 text-sm">Full Stack Engineer</p>
//             <div className="mt-2 text-gray-600 text-sm">
//               <p><strong>📧 Contact:</strong> richardagbekey@coderaccoon.com</p>
//               <p>+233 55 459 9987</p>
//               <p className="mt-2"><strong>📍 Address:</strong> North Logan, Accra, Ghana</p>
//             </div>
//           </div>
//           {/* Edit Icon Positioned */}
//           <Pencil className="absolute top-2 right-10 text-gray-500 cursor-pointer" />
//         </div>
        
//         {/* Right-side info */}
//         <div className="absolute top-20 right-10 text-blue-600 text-sm">Senior Level</div>

//         {/* Tabs */}
//         <div className="mt-6 border-b">
//           <ul className="flex space-x-6 text-gray-500 text-sm">
//             <li className="border-b-2 border-black pb-2 font-semibold">Programming Languages</li>
//             <li>Frameworks</li>
//             <li>Databases & ORM</li>
//             <li>Cloud Platforms</li>
//             <li>AI Experience</li>
//             <li>Mobile Environments</li>
//             <li>Skillsets</li>
//             <li>Tools</li>
//           </ul>
//         </div>
        
//         {/* Skills Section */}
//         <div className="mt-6">
//           <div className="flex justify-between py-2 border-b">
//             <span>Java</span>
//             <span className="text-gray-500">12 months</span>
//           </div>
//           <div className="flex justify-between py-2 border-b">
//             <span>Python</span>
//             <span className="text-gray-500">40 months</span>
//           </div>
//           <div className="flex justify-between py-2 border-b">
//             <span>JavaScript</span>
//             <span className="text-gray-500">36 months</span>
//           </div>
//           <div className="flex justify-between py-2 border-b">
//             <span>C++</span>
//             <span className="text-gray-500">42 months</span>
//           </div>
//         </div>
//       </div>
//     // </div>
//   );
// };

// export default ProfilePage;





// import React from "react";
// import { Edit, Download, LogOut, ArrowDownToLine } from "lucide-react";

// const Profile: React.FC = () => {
//   return (
//     <div className="w-screen h-screen bg-gray-100 flex flex-col">
//       {/* Top Navigation Bar */}
//       <div className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
//         <h1 className="text-lg font-semibold">Profile</h1>
//         <div className="flex items-center space-x-6">
//         <button className="text-gray-500 hover:text-black flex items-center">
//          Preview
//         </button>
//           <button className="text-gray-600 hover:text-black flex items-center">
//             Download CV  <ArrowDownToLine className="w-5 h-5 ml-2" />
//           </button>
//           <button className="text-red-500 hover:text-red-700 font-medium">Logout</button>
//         </div> 
//       </div>

//       {/* Main Profile Section */}
      
      
      
//     </div>
//   );
// };

// export default Profile;




import React from "react";
import { Edit,Trash2, Download, LogOut, ArrowDownToLine } from "lucide-react";
import LogoImage from "../../assets/logo.png"; 
import profileImg from "../../assets/profile-img.png"

const Profile: React.FC = () => {
  return (
    <div className="w-screen h-screen bg-gray-100 flex flex-col">
        {/* Header Section */}
    <div className=" flex justify-between items-center border-b pb-4 px-4 sm:px-8 md:px-16 py-4 bg-white  flex-wrap ">
      <img
        src={LogoImage}
        alt="Code Raccoon Logo"
        className="w-10 sm:w-12 md:w-24 max-w-[80px] md:max-w-[100px]"
      />
      <div className="flex items-center space-x-2 sm:space-x-4 flex-wrap">
        <button className="text-gray-500 hover:text-black flex items-center">
          Preview
        </button>
        <button className="text-gray-600 hover:text-black flex items-center">
          Download CV <ArrowDownToLine className="w-5 h-5 ml-2" />
        </button>
        <button className="text-red-500 hover:text-red-700 font-medium">
          Logout
        </button>
      </div>
    </div>

      
      {/* Main Profile Section */}
       {/* Profile Section */}
       <div className="flex flex-col md:flex-row bg-white shadow-md p-6 m-6 rounded-lg  justify-between items-center relative">
       <div className="w-40 h-52 sm:w-48 sm:h-60 rounded-lg overflow-hidden border-4 border-white shadow-md">
        <img 
          src={profileImg} 
          alt="Profile" 
          className="w-full h-full object-cover"
        />
      </div>


        {/* Profile Info */}
        <div className="ml-6 flex-1">
          <h2 className="text-3xl font-bold">Richard Agbekey</h2>
          <p className="text-green-600 text-lg">Full stack engineer</p>

          <div className="mt-4 text-gray-700 space-y-2">
            <p className="font-semibold flex items-center">📧 Contact</p>
            <p className="text-gray-500">richard.agbekey@codercacoon.com</p>
            <p className="text-gray-500">+233 55 450 9087</p>

            <p className="font-semibold flex items-center mt-3">📍 Address</p>
            <p className="text-gray-500">Suncity, North Legon, Accra, Ghana</p>
          </div>
        </div>
       
        {/* Action Buttons - Hide on small screens */}
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
        <div className="flex space-x-6 border-b pb-2 text-gray-400">
          <button className="font-semibold border-b-2 border-black text-black">Programming Languages</button>
          <button>Frameworks</button>
          <button>Databases & ORM</button>
          <button>Cloud Platforms</button>
          <button>AI Experience</button>
          <button>Mobile Environments</button>
          <button>Skillsets</button>
          <button>Tools</button>
        </div>

        {/* Skills List */}
        <div className="mt-4">
          {[ 
            { name: "Java", duration: "12 months" },
            { name: "Python", duration: "40 months" },
            { name: "JavaScript", duration: "36 months" },
            { name: "C++", duration: "42 months" },
          ].map((skill, index) => (
            <div 
              key={index} 
              className="grid grid-cols-3 p-3 bg-white shadow-md rounded-lg my-2"
            >
              <span className="font-medium">{skill.name}</span>
              <span className="text-gray-500">{skill.duration}</span>
              <div className="flex space-x-3">
                <button className="text-gray-600 hover:text-black">
                  <Edit className="w-5 h-5" />
                </button>
                <button className="text-red-500 hover:text-red-700">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
