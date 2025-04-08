import React from "react";

function Buttons({
  input,
  userSignupDisplayContent,
  setUserSignupDisplayContent,
  handleSubmit,
  ageError,
  emailError,
  error,
  phoneError,
  passValidationError,
}) {
  const isBasicInfoFilled = () => {
    const { name, email, phone, dob, password, confirmPassword } = input;
    return (
      name.trim() &&
      email.trim() &&
      phone.trim() &&
      dob &&
      password &&
      confirmPassword
    );
  };
  const isLocationInfoFilled = () => {
    const { address, city, state, zipCode, country } = input;
    return (
      address.trim() &&
      city.trim() &&
      state.trim() &&
      zipCode.trim() &&
      country.trim()
    );
  };
  const LicenceUpload = () => {
    const { licenseImage, licenseExpiryDate } = input;
    return licenseExpiryDate.trim() && licenseImage;
  };

  return (
    <>
      {userSignupDisplayContent === 1 && (
        <button
          onClick={() => setUserSignupDisplayContent(2)}
          disabled={!isBasicInfoFilled()}
          className="w-full flex items-center justify-center rounded-lg bg-blue-600 py-3 text-white transition-all hover:bg-blue-700 disabled:bg-blue-400"
          style={{ borderRadius: "10px", marginBottom: "1rem" }}
        >
          Next
        </button>
      )}

      {userSignupDisplayContent === 2 && (
        <div className="flex justify-between gap-4 my-3">
          <button
            onClick={() => setUserSignupDisplayContent(1)}
            className="w-full flex items-center justify-center rounded-lg bg-gray-500 py-3 text-white transition-all hover:bg-gray-700"
            style={{ borderRadius: "10px", marginBottom: "1rem" }}
          >
            Previous
          </button>
          <button
            disabled={!isLocationInfoFilled()}
            onClick={() => setUserSignupDisplayContent(3)}
            className="w-full flex items-center justify-center rounded-lg bg-blue-600 py-3 text-white transition-all hover:bg-blue-700 disabled:bg-blue-400"
            style={{ borderRadius: "10px", marginBottom: "1rem" }}
          >
            Next
          </button>
        </div>
      )}

      {userSignupDisplayContent === 3 && (
        <div className="flex justify-between gap-4 my-3">
          <button
            onClick={() => setUserSignupDisplayContent(2)}
            className="w-full flex items-center justify-center rounded-lg bg-gray-500 py-3 text-white transition-all hover:bg-gray-700 "
            style={{ borderRadius: "10px", marginBottom: "1rem" }}
          >
            Previous
          </button>
          <button
            onClick={handleSubmit}
            type="submit"
            disabled={
              !LicenceUpload() ||
              !!ageError ||
              passValidationError ||
              error ||
              phoneError ||
              emailError
            }
            className="w-full flex items-center justify-center rounded-lg bg-blue-600 py-3 text-white transition-all hover:bg-blue-700 disabled:bg-blue-400"
            style={{ borderRadius: "10px", marginBottom: "1rem" }}
          >
            Sign Up
          </button>
        </div>
      )}
    </>
  );
}

export default Buttons;
