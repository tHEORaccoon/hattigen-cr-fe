import React from "react";
import CheckButton from "../../assets/check.svg"
import Rectagle from "../../assets/Rectangle.png"
interface FormFieldProps {
  formData: Record<string, any>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fields: { name: string; label: string; type: string }[];
  className?: string;
}

const FormField: React.FC<FormFieldProps> = ({ formData, handleChange, fields ,className}) => {
  return (
    <div className="flex flex-col md:flex-row gap-[121px] mt-20">
      <div className="flex gap-20 w-1/2 justify-center">
        {/* Form Inputs */}
        {fields.map((field) => (
          <div key={field.name} className="flex flex-col w-[500px]">
            <label htmlFor={field.name} className="mb-2">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              placeholder={`Enter ${field.label}`}
              value={formData[field.name] || ""}
              onChange={handleChange}
              className={`w-full p-2 border rounded mb-3${className}`}
            />
          </div>
        ))}
        <div className="w-16 h-10 shadow-2xl rounded-full flex items-center justify-center bg-green-600 relative top-8">
            <button type="button" className="w-10 h-10 flex items-center justify-center bg-green-600 rounded-full border shadow-slate-700">
                <img src={CheckButton} alt=""  className="w-4 h-4"/>
            </button>
        </div>
      </div>

      {/* Live Preview */}
      <div className="w-full max-w-2xl h-[400px] bg-white shadow-lg pt-2 px-2 border border-black">
         <div className="w-full">
            <img src={Rectagle} alt="" className="w-full" />
        </div>
        <div className="w-full h-20 bg-white flex items-center justify-center">
          {fields.map((field) => (
            <>
            <p key={field.name}></p>
            <p>{formData[field.name]}</p>      
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormField;
