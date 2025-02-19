import React from "react";

interface InputFieldProps {
  label: string;
  name: string;
  type: "text" | "number" | "email" | "password" | "textarea" | "select" | "checkbox" | "radio" | "file";
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  options?: { value: string; label: string }[]; // For select, radio
  checked?: boolean; // For checkbox & radio
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, type, value, onChange, options, checked, placeholder, required, disabled }) => {
  return (
    <div className="flex flex-col w-[500px] mb-4">
      <label htmlFor={name} className="mb-2 font-medium">{label}</label>
      
      {/* Text, Number, Email, Password */}
      {["text", "number", "email", "password"].includes(type) && (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
            disabled={disabled}
         className="w-full p-2 border rounded mb-3"
        />
      )}

      {/* Textarea */}
      {type === "textarea" && (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
            disabled={disabled}
          className="w-full p-2 border rounded h-24"
        />
      )}

      {/* Select Dropdown */}
      {type === "select" && options && (
        <select name={name} value={value} onChange={onChange} required={required} className="w-full p-2 border rounded">
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}

      {/* Checkbox */}
      {type === "checkbox" && (
        <div className="flex items-center gap-2">
          <input type="checkbox" name={name} checked={checked} onChange={onChange} className="w-5 h-5" />
          <span>{label}</span>
        </div>
      )}

      {/* Radio Buttons */}
      {type === "radio" && options && (
        <div className="flex flex-col">
          {options.map((option) => (
            <label key={option.value} className="flex items-center gap-2">
              <input type="radio" name={name} value={option.value} checked={value === option.value} onChange={onChange} />
              {option.label}
            </label>
          ))}
        </div>
      )}

      {/* File Upload */}
      {type === "file" && (
        <input type="file" name={name} onChange={onChange} required={required} className="w-full p-2 border rounded" />
      )}
    </div>
  );
};

export default InputField;
