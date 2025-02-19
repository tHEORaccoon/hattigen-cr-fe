

interface LivePreviewProps {
  formData: {
    personalInfo: { name: string; email: string };
    languages: string[];
    frameworks: { framework: string; experience: number }[];
    databases: string[];
    cloudPlatforms: string[];
    aiExperience: { aiExp: string; experience: number }[];
  };
}


const LivePreview = ({ formData }: LivePreviewProps) => {
    return (
      <div className="w-full max-w-2xl h-auto bg-white shadow-lg p-4 border border-black mt-8">
        <h2 className="text-lg font-bold mb-2">Live Preview</h2>
  
        <div className="mb-4">
          <h3 className="font-semibold">Personal Info</h3>
          <p>{formData.personalInfo.name}</p>
          <p>{formData.personalInfo.email}</p>
        </div>
  
        <div className="mb-4">
          <h3 className="font-semibold">Languages</h3>
          {formData.languages.map((lang, index) => (
            <p key={index}>{lang}</p>
          ))}
        </div>
  
        <div className="mb-4">
          <h3 className="font-semibold">Frameworks</h3>
          {formData.frameworks.map((framework, index) => (
            <div>
                <p key={index}>{framework.framework}</p>
                <p key={index}>{framework.experience}</p>
            </div>
          ))}
        </div>
  
        <div className="mb-4">
          <h3 className="font-semibold">Databases</h3>
          {formData.databases.map((db, index) => (
            <p key={index}>{db}</p>
          ))}
        </div>
  
        <div className="mb-4">
          <h3 className="font-semibold">Cloud Platforms</h3>
          {formData.cloudPlatforms.map((cloud, index) => (
            <p key={index}>{cloud}</p>
          ))}
        </div>
  
        <div className="mb-4">
          <h3 className="font-semibold">AI Experience</h3>
          {formData.aiExperience.map((ai, index) => (
            <p key={index}>
              {ai.aiExp} - {ai.experience} months
            </p>
          ))}
        </div>
      </div>
    );
  };
  
  export default LivePreview;
  