import React from "react";

interface INavButton {
  onClickButton: () => void;
  text: string;
}

const NavButton: React.FC<INavButton> = ({
  onClickButton = (): void => {},
  text,
}) => {
  return (
    <button
      aria-current="page"
      className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-stone-200 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
      type="button"
      onClick={onClickButton}
    >
      {text}
    </button>
  );
};

export default NavButton;
