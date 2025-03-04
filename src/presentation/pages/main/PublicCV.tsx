import { RootState } from "@/core/redux/store/store";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const PublicCV = () => {
    const { encodedData } = useParams(); // Get encoded CV data from the URL
    const navigate = useNavigate();
    const userCV = useSelector((state: RootState) => state.auth.user);
    const [cvData, setCVData] = useState(userCV);
  
    useEffect(() => {
      const authToken = localStorage.getItem("auth_token");
  
      if (!authToken) {
        navigate("/auth/login"); // Redirect if user is not logged in
        return;
      }
  
      try {
        const decodedCV = JSON.parse(decodeURIComponent(encodedData || ""));
        setCVData(decodedCV);
      } catch (error) {
        console.error("Invalid CV data", error);
      }
    }, [encodedData, navigate]);
  
    if (!cvData) return <p>Loading CV...</p>;
  
    return (
      <div>
        <h1>{cvData.first_name} {cvData.last_name}'s CV</h1>
        <p>Email: {cvData.email}</p>
        <p>Phone: {cvData.phone_number}</p>
        <h2>Skills</h2>
        <ul>
          {cvData.skills.map((skill: any, index: number) => (
            <li key={index}>{skill.title} ({skill.experience} years)</li>
          ))}
        </ul>
      </div>
    );
  };

export default PublicCV;
