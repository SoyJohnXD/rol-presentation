import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../assets/icon.png";
import { StepHome } from "../../pages/home/Home";
import NavButton from "./components/nav-button/NavButton";

interface INavbar {
  role: string;
  stepPage: StepHome;
  handleStepPage: (stepPage: StepHome) => void;
}

const Navbar: React.FC<INavbar> = ({ role, handleStepPage }) => {
  const navigate = useNavigate();

  const handleCloseSesion = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-500 bg-gray-800/80 py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
      <div className="px-4">
        <div className="flex items-center justify-between">
          <div className="flex shrink-0">
            <a
              aria-current="page"
              className="flex items-center"
              onClick={() => handleStepPage(StepHome.HOME)}
            >
              <img className="w-14 scale-150 translate-y-2" src={Icon} alt="" />
              <p className="sr-only">Mantenimiento Roles</p>
            </a>
          </div>
          <div className="hidden md:flex md:items-center md:justify-center md:gap-5">
            <NavButton
              onClickButton={() => handleStepPage(StepHome.HOME)}
              text="Home"
            />
            <NavButton
              onClickButton={() => handleStepPage(StepHome.USERS)}
              text="Usuarios"
            />
            <NavButton
              onClickButton={() => handleStepPage(StepHome.ROLES)}
              text="Roles y permisos"
            />
          </div>
          <div className="flex items-center justify-end gap-3">
            <span className="hidden items-center gap-1 justify-center rounded-xl bg-white/5 px-3 py-2 text-sm font-semibold text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 sm:inline-flex">
              <span className="rounded-[100%] w-[8px] bg-green-500 h-[8px]"></span>
              {role ?? ""}
            </span>
            <button
              className="inline-flex items-center justify-center rounded-xl bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-purple-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              type="button"
              onClick={handleCloseSesion}
            >
              Cerrar sesion
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
