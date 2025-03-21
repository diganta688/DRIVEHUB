import React from "react";
import { UserPlus } from "lucide-react";

function SubmitBtn({ isSubmit, error, passValidationError, EmailValidator, phoneError }) {
  const isDisabled = isSubmit || error || passValidationError || EmailValidator || phoneError;

  return (
    <button
      type="submit"
      disabled={isDisabled}
      style={{ borderRadius: "10px" }}
      className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isSubmit ? (
        "Loading..."
      ) : (
        <>
          <UserPlus className="w-5 h-5" />
          <span style={{ marginLeft: "0.5rem" }}>Sign Up</span>
        </>
      )}
    </button>
  );
}

export default SubmitBtn;
