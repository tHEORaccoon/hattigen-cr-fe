import { useState } from "react";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import { Document, Packer, Paragraph, TextRun } from "docx";

const DownloadDropdown = ({ user }: { user: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text("User CV", 20, 20);

    doc.setFont("helvetica", "normal");
    doc.text(`Name: ${user?.first_name} ${user?.last_name}`, 20, 40);
    doc.text(`Email: ${user?.email}`, 20, 50);
    doc.text(`Phone: ${user?.phone_number}`, 20, 60);

    doc.text("Skills:", 20, 80);
    user?.skills.forEach((skill: any, index: number) => {
      doc.text(`- ${skill.title} (${skill.experience} years)`, 25, 90 + index * 10);
    });

    doc.save("CV.pdf");
  };

  const downloadDOCX = () => {
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({ children: [new TextRun({ text: "User CV", bold: true, size: 32 })] }),
            new Paragraph(`Name: ${user?.first_name} ${user?.last_name}`),
            new Paragraph(`Email: ${user?.email}`),
            new Paragraph(`Phone: ${user?.phone_number}`),
            new Paragraph(" "),
            new Paragraph("Skills:"),
            ...user?.skills.map(
              (skill: any) => new Paragraph(`- ${skill.title} (${skill.experience} years)`)
            ),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "CV.docx");
    });
  };

  const handleDownload = (format: string) => {
    setIsOpen(false);
    if (format === "pdf") {
      downloadPDF();
    } else if (format === "docx") {
      downloadDOCX();
    }
  };

  return (
    <div className="relative inline-block">
      {/* Dropdown toggle button */}
      <button
        onClick={toggleDropdown}
        className="text-gray-500 hover:text-black flex items-center text-sm sm:text-base px-2 py-1 sm:px-4 sm:py-2  border-gray-300 rounded-md"
      >
        Download CV ⬇
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <button
            onClick={() => handleDownload("docx")}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Download as DOCX
          </button>
          <button
            onClick={() => handleDownload("pdf")}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Download as PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default DownloadDropdown;
