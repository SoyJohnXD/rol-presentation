import React from "react";

interface IInput {
  type: string;
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  clasesInput?: string;
  clasesContainer?: string;
  clasesLabel?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<IInput> = ({
  type,
  label,
  name,
  value,
  placeholder = "",
  clasesContainer = "",
  clasesInput = "",
  clasesLabel = "",
  onChange = (): void => {},
}) => {
  return (
    <div className={`relative mt-6 ${clasesContainer}`}>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`peer  px-2 mt-1 w-full border-b-2 border-gray-300 rounded-sm py-2 placeholder:text-transparent placeholder:px-2 focus:border-gray-500 focus:outline-none ${clasesInput}`}
      />
      <label
        className={`pointer-events-none  py-2 absolute top-[-6px] left-0 origin-left -translate-y-1/2 transform text-sm text-gray-300 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:px-2 peer-placeholder-shown:text-gray-500 peer-focus:top-[-6px] peer-focus:pl-0 peer-focus:text-sm peer-focus:text-white ${clasesLabel}`}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
