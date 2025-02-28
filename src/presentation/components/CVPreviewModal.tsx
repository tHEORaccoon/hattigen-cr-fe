import React from "react";
import { X } from "lucide-react";

interface CVPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CVPreviewModal: React.FC<CVPreviewModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Modal Container */}
      <div className="bg-white w-11/12 md:w-3/4 lg:w-1/2 p-6 rounded-lg shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Header */}
        <h2 className="text-xl font-semibold text-center mb-4">CV Preview</h2>

        {/* Preview Content */}
        <div className="border p-4 rounded-md bg-gray-100 h-96 overflow-y-auto">
        <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
      {/* Header Section */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">RICHARD AGBEKEY</h2>
        <p className="text-gray-600">Full Stack Engineer</p>
        <p className="text-gray-500">📧 richard.agbekey@codercacoon.com | 📞 +233 55 450 9087</p>
        <p className="text-gray-500">📍 Suncity, North Legon, Accra, Ghana</p>
      </div>

      {/* Professional Summary */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold">🔹 PROFESSIONAL SUMMARY</h3>
        <p className="text-gray-700">
          Results-driven Full Stack Engineer with expertise in JavaScript, React, Node.js, and cloud platforms.
          Passionate about building scalable web applications, optimizing performance, and improving user experience.
          Adept at working in agile teams to deliver high-quality solutions.
        </p>
      </div>

      {/* Work Experience */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold">🔹 WORK EXPERIENCE</h3>

        <div className="mt-4">
          <h4 className="font-medium">Software Engineer</h4>
          <p className="text-gray-500">📍 Tech Company | 🗓 Jan 2022 - Present</p>
          <ul className="list-disc list-inside text-gray-700">
            <li>Developed and maintained React applications for web platforms.</li>
            <li>Integrated REST APIs, optimized frontend performance, and enhanced UI/UX.</li>
            <li>Collaborated with backend engineers to improve API efficiency and scalability.</li>
            <li>Implemented state management solutions using Redux Toolkit.</li>
          </ul>
        </div>

        <div className="mt-4">
          <h4 className="font-medium">Junior Developer</h4>
          <p className="text-gray-500">📍 Startup XYZ | 🗓 Jul 2020 - Dec 2021</p>
          <ul className="list-disc list-inside text-gray-700">
            <li>Built responsive web applications using React and TypeScript.</li>
            <li>Assisted in database management using PostgreSQL and MongoDB.</li>
            <li>Contributed to code reviews, debugging, and testing processes.</li>
          </ul>
        </div>
      </div>

      {/* Skills */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold">🔹 SKILLS</h3>
        <p className="text-gray-700"><strong>💻 Programming Languages:</strong> JavaScript, TypeScript, Python, Java</p>
        <p className="text-gray-700"><strong>⚙ Frameworks & Libraries:</strong> React, Next.js, Django, Express.js</p>
        <p className="text-gray-700"><strong>🗄 Databases & ORM:</strong> PostgreSQL, MongoDB, Prisma</p>
        <p className="text-gray-700"><strong>☁ Cloud Platforms:</strong> AWS, Firebase</p>
        <p className="text-gray-700"><strong>🛠 Tools & DevOps:</strong> Docker, Git, CI/CD, Webpack</p>
      </div>

      {/* Education */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold">🔹 EDUCATION</h3>
        <p className="text-gray-700"><strong>🎓 Bachelor’s in Computer Science</strong></p>
        <p className="text-gray-500">📍 University of Ghana | 🗓 2018 - 2022</p>
      </div>

      {/* Certifications */}
      <div>
        <h3 className="text-lg font-semibold">🔹 CERTIFICATIONS</h3>
        <p className="text-gray-700">🏅 AWS Certified Developer – Associate</p>
        <p className="text-gray-700">🏅 React Developer Certification</p>
      </div>
    </div>
        </div>
      </div>
    </div>
  );
};

export default CVPreviewModal;
