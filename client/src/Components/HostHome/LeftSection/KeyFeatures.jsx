import React from 'react';

function KeyFeatures({ label, name, checked, onChange }) {
  return (
    <label className="checkcontainer my-2">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
      />
      <div className="checkmark"></div>
      <span className="ml-2 text-sm text-gray-700">{label}</span>
    </label>
  );
}

export default KeyFeatures;
