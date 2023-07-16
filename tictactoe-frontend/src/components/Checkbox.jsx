import { useState } from 'react';
import { MdCheck } from 'react-icons/md';

function Checkbox({ label, state }) {
  const [checked, setChecked] = state;

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <label className="flex items-center justify-center space-x-2 cursor-pointer">
      <input
        type="checkbox"
        className="hidden"
        checked={checked}
        onChange={handleChange}
      />
      <div
        className={`w-6 h-6 border-2 border-sand-yellow-bright rounded cursor-pointer ${
          checked ? 'bg-sand-yellow-bright' : ''
        } hover:border-sand-yellow-bright hover:outline-sand-yellow-bright transition-colors duration-200`}
      >
        {checked && (
          <MdCheck className="text-white w-4 h-4 mx-auto my-auto" />
        )}
      </div>
      <span>{label}</span>
    </label>
  );
}

export default Checkbox;