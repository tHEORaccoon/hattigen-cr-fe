import { useState } from "react";
import Header from "./Header"
import CheckButton from "../../assets/check.svg"
import Rectagle from "../../assets/Rectangle.png"
import Delete from "../../assets/delete.svg";

interface FrameworkScreenProps {
    framework: string;
    experience: number;
}

const FrameworkScreen = () => {
      const [formData, setFormData] = useState<FrameworkScreenProps>({
        framework: "",
        experience: 1,
      });
    
        const [isEditing, setIsEditing] = useState(false);
        const [frameworks, setFrameworks] = useState<FrameworkScreenProps[]>([]);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
          
            setFormData((prev) => ({
              ...prev,
              [name]: name === "experience" 
                ? (value === "" ? "" : Math.max(1, Number(value)))  // Ensure min 1
                : value,
            }));
          };
          
          

        const handleEdit = () => {
            setIsEditing((prev) => !prev); // Toggle edit mode
        };

        const handleAddFramework = () => {
            if (formData.framework.trim() && formData.experience >= 1) {
            setFrameworks([...frameworks, formData]);
            setFormData({ framework: "", experience: 0 }); // Reset input fields
            }
        };

        const handleDeleteframework = (index: number) => {
            setFrameworks(frameworks.filter((_, i) => i !== index));
        };

  return (
    <div className="container mx-auto">
    <Header
      title="Let’s add your frameworks"
      description="Include your full name and at least one way for employers to reach you."
      clicked={isEditing}
      onclick={handleEdit} // Toggle edit mode
    />

    <div className="flex flex-col md:flex-row gap-[121px] mt-20">
      <div className="flex flex-col w-1/2">
        <div className="flex gap-20 justify-between">
          <div className="flex flex-col w-[500px]">
            <label htmlFor="framework" className="mb-2">Framework</label>
            <input
              type="text"
              name="framework"
              placeholder="Find a framework"
              value={formData.framework}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
            />
          </div>
          <div className="flex flex-col w-[500px]">
            <label htmlFor="experience" className="mb-2">Months of Experience</label>
            <input
              type="number"
              name="experience"
              placeholder="Experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
            />
          </div>
          <div className="w-16 h-10 shadow-2xl rounded-full flex items-center justify-center bg-green-600 relative top-8">
            <button
              type="button"
              onClick={handleAddFramework}
              className="w-10 h-10 flex items-center justify-center bg-green-600 rounded-full border shadow-slate-700"
            >
              <img src={CheckButton} alt="" className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Display Added Languages as Chips */}
        <div className="flex flex-wrap gap-2 mt-5">
            {frameworks.map((fram, index) => (
              <div
                key={index}
                className={`relative bg-blue-200 text-blue-700 px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300 ${
                  isEditing ? "animate-wiggle" : ""
                }`}
              >
                <span>{fram.framework}</span>
                <span className="text-sm text-gray-600">{fram.experience}</span>

                {isEditing && (
                  <button
                    onClick={() => handleDeleteframework(index)}
                    className="absolute right-1 top-1/4 -translate-y-1/2 translate-x-1/2 w-4 h-4 flex items-center justify-center bg-gray-400 text-white rounded-full shadow-md hover:bg-red-600 transition"
                  >
                    <img src={Delete} alt="delete-icon" className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

      </div>

      {/* Live Preview Section */}
      <div className="w-full max-w-2xl h-[400px] bg-white shadow-lg pt-2 px-2 border border-black">
        <div className="w-full">
          <img src={Rectagle} alt="" className="w-full" />
        </div>
        <div className="w-full h-20 bg-white flex flex-col justify-center mt-20">
          <h2>Framework</h2>
          {frameworks.map((fram, index) => (
            <div key={index} className="flex items-center gap-2">
              <span>{fram.framework}</span>
              <span className="text-sm text-gray-600">{fram.experience}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Custom Wiggle Animation */}
    <style>
      {`
        @keyframes wiggle {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(4deg); }
          50% { transform: rotate(-4deg); }
          75% { transform: rotate(4deg); }
          100% { transform: rotate(0deg); }
        }

        .animate-wiggle {
          animation: wiggle 0.3s infinite ease-in-out;
        }
      `}
    </style>
  </div>
  )
}

export default FrameworkScreen
