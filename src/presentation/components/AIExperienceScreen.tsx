import { useState } from "react";
import Header from "./Header"
import CheckButton from "../../assets/check.svg"
import Rectagle from "../../assets/Rectangle.png"

interface AIScreenScreenProps {
    aiExp: string;
    experience: number;
}

const AIScreen = () => {
      const [formData, setFormData] = useState<AIScreenScreenProps>({
        aiExp: "",
        experience: 0,
      });
    
      const [isEditing, setIsEditing] = useState(false);
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleEdit = () => {
        setIsEditing(!isEditing);
      }

  return (
    <div className="container mx-auto ">
      <Header title={"Let’s add your AI experience"} description={"Include frameworks you are experienced in and the number if months you have experience in them."} clicked={isEditing} onclick={handleEdit}/>

        <div className="flex flex-col md:flex-row gap-[121px] mt-20">
            <div className="flex gap-20 w-1/2 justify-center">
                {/* Form Section */}
                <div className="flex flex-col w-[500px]">
                    <label htmlFor="aiExp" className="mb-2">AI Experience</label>
                    <input
                        type="text"
                        name="aiExp"
                        placeholder="Find AI Experience"
                        value={formData.aiExp}
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
                    <button type="button" className="w-10 h-10 flex items-center justify-center bg-green-600 rounded-full border shadow-slate-700">
                        <img src={CheckButton} alt=""  className="w-4 h-4"/>
                    </button>
                </div>
            </div>
            <div className="w-full max-w-2xl h-[400px] bg-white shadow-lg pt-2 px-2 border border-black">
                <div className="w-full">
                    <img src={Rectagle} alt="" className="w-full" />
                </div>
                <div className="w-full h-20 bg-white flex items-center justify-center">
                    <p>{formData.aiExp}</p>
                </div>
                <div className="w-full h-20 bg-white flex items-center justify-center">
                    <p>{formData.experience}</p>
                </div>
            </div>
    </div>
    </div>
  )
}

export default AIScreen
