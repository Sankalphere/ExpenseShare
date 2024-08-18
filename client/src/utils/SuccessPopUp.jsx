import { useEffect } from "react";
const SuccessPopup = ({ message, setShowSuccessPopup }) => {
  useEffect(() => {
    console.log("Transaction made successfully");
    const timeout = setTimeout(() => {
      // Hide the success popup after 3 seconds
      setShowSuccessPopup(false);
    }, 3000);

    // Clean up the timeout when component unmounts or when the state changes
    return () => clearTimeout(timeout);
  }, []);

  console.log("Transaction made successfully");
  return (
    <div className="success-popup">
      <div className="success-message">{message}</div>
    </div>
  );
};

export default SuccessPopup;
