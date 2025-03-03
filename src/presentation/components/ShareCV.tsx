import { RootState } from "@/core/redux/store/store";
import { useState } from "react";
import { useSelector } from "react-redux";

const ShareCV = () => {
    const [copied, setCopied] = useState(false);
    const userCV = useSelector((state: RootState) => state.auth.user);
    
    const generateAndCopyLink = () => {
    // const userCV = useSelector((state: any) => state.cv);
    const encodedData = encodeURIComponent(JSON.stringify(userCV));
    const shareableLink = `${window.location.origin}/cv/${encodedData}`;
    setCopied(true);
    setInterval(() => {
      setCopied(false);    
    }, 5000);
  
    navigator.clipboard.writeText(shareableLink);
  };
  

  return (
    <div>
      <button
        onClick={generateAndCopyLink}
        className="text-gray-500 hover:text-black flex items-center text-sm sm:text-base px-2 py-1 sm:px-4 sm:py-2  border-gray-300 rounded-md"

      >
        {copied ? "Copied!" : "Share CV Link"}
      </button>
    </div>
  );
};

export default ShareCV;
