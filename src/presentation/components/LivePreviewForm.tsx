import React, { useState } from "react";
import Header from "./Header";
interface CVPreviewProps {
    name: string;
    email: string;
    jobTitle: string;
    phone: string;
    address: string;
    bio: string;
    experience: { company: string; role: string; duration: string }[];
    education: { institution: string; degree: string; year: string }[];
    skills: string[];
  }

const LivePreviewForm: React.FC = () => {
  const [formData, setFormData] = useState<CVPreviewProps>({
    name: "",
    email: "",
    jobTitle: "",
    phone: "",
    address: "",
    bio: "",
    experience: [],
    education: [],
    skills: [],
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  }

  return (
    <div className="container mx-auto">

      <Header title="Let’s add your Databases" description="This is how your CV will look like after you add your databases." clicked={isEditing} onclick={handleEdit}/>
      <div className="flex flex-col md:flex-row gap-6 mt-6">
        {/* Form Section */}
        <div className="w-full md:w-1/2 bg-white p-4 shadow rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Enter Your Details</h2>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
          />
          <input
            type="text"
            name="jobTitle"
            placeholder="Job Title"
            value={formData.jobTitle}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
          />
          <textarea
            name="bio"
            placeholder="Short Bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Live Preview Section */}
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 border border-gray-300">
        {/* Header */}
        <div className="text-center border-b pb-4">
          <h1 className="text-2xl font-bold text-gray-800">{formData.name || "John Doe"}</h1>
          <p className="text-gray-600">{formData.jobTitle || "Software Engineer"}</p>
        </div>

        {/* Contact Info */}
        <div className="mt-4 text-sm text-gray-700">
          <p><strong>Email:</strong> {formData.email || "johndoe@example.com"}</p>
          <p><strong>Phone:</strong> {formData.phone || "+123 456 7890"}</p>
          <p><strong>Address:</strong> {formData.address || "123 Street, City, Country"}</p>
        </div>

        {/* Summary */}
        <div className="mt-4">
          <h2 className="text-lg font-semibold border-b pb-1">About Me</h2>
          <p className="text-gray-700">{formData.bio || "A motivated professional with experience in..."}</p>
        </div>

        {/* Experience */}
        <div className="mt-4">
          <h2 className="text-lg font-semibold border-b pb-1">Experience</h2>
          {formData.experience.length > 0 ? (
            formData.experience.map((exp, index) => (
              <div key={index} className="mt-2">
                <p className="font-semibold">{exp.company} - {exp.role}</p>
                <p className="text-sm text-gray-600">{exp.duration}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-700">No experience added.</p>
          )}
        </div>

        {/* Education */}
        <div className="mt-4">
          <h2 className="text-lg font-semibold border-b pb-1">Education</h2>
          {formData.education.length > 0 ? (
            formData.education.map((edu, index) => (
              <div key={index} className="mt-2">
                <p className="font-semibold">{edu.institution} - {edu.degree}</p>
                <p className="text-sm text-gray-600">{edu.year}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-700">No education details added.</p>
          )}
        </div>

        {/* Skills */}
        <div className="mt-4">
          <h2 className="text-lg font-semibold border-b pb-1">Skills</h2>
          {formData.skills.length > 0 ? (
            <ul className="list-disc list-inside text-gray-700">
              {formData.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-700">No skills added.</p>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default LivePreviewForm;
