import React from 'react';


function Payment() {
    return ( <>
    <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  checked={accepted}
                  onChange={handleCheckboxChange}
                  className="mt-1"
                  required
                />
                <label htmlFor="acceptTerms" className="text-sm">
                  <span className="text-red-600 mx-1">*</span>I have read and
                  agree to the terms and conditions.
                </label>
              </div>

              <p className="text-sm text-gray-500 italic">
                Note: These terms are governed by Indian law. Disputes will be
                resolved under jurisdiction of [Your City] courts.
              </p>
    
    </> );
}

export default Payment;