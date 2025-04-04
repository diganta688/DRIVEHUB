import React from 'react';

function SelectField({ label, name, value, onChange, options, error }) {
  return (
    <div className="">
      <label className="block text-xs font-semibold text-gray-700 mb-1">{label}</label>
      <select
      required
        name={name}
        value={value}
        onChange={onChange}
        className={`mt-1 block w-full px-4 py-2 rounded-lg text-sm border focus:outline-none focus:ring-2
          ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}`}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs m-0 mt-1">{error}</p>}
    </div>
  );
}

export default SelectField;
