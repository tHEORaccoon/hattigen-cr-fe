import useFetchUserAndRedirect from "../../core/hooks/useFetchUserAndRedirect"; // Import the hook

const AuthCallback = () => {
  useFetchUserAndRedirect(); // Automatically fetches user and redirects

  return <p>Redirecting...</p>; // Show a loader while processing
};

export default AuthCallback;
