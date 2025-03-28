import React from 'react';
function TextAreaField({ label, name, value, onChange }) {
    return ( <div>
        <label className="block text-sm font-semibold text-gray-700">{label}</label>
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows={3}
          className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition-all duration-200"
          required
        />
      </div> );
}

export default TextAreaField;