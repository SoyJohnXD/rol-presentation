import React, { useEffect, useState } from "react";
import Navbar from "../../components/nav/Navbar";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context";
import Users from "./pages/users/Users";
import Roles from "./pages/roles/Roles";

export enum StepHome {
  HOME = 0,
  USERS = 1,
  ROLES = 2,
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { userData } = useAppContext();
  const [stepPage, setStepPage] = useState(StepHome.HOME);

  useEffect(() => {
    if (!JSON?.parse(localStorage?.getItem("user") ?? "{}")?.access_token)
      navigate("/login");
  }, []);

  const handleStep = (step: StepHome): void => {
    setStepPage(step);
  };

  return (
    <div>
      <Navbar
        role={userData?.role?.name ?? ""}
        stepPage={stepPage}
        handleStepPage={handleStep}
      />
      {stepPage === StepHome.HOME && (
        <div className="text-3xl text-white">
          ¡Bienvenido! - {userData?.email ?? ""}
          <p className="text-lg text-gray-300 text-center">
            Gestiona los <strong>usuarios</strong> o <strong>roles</strong>{" "}
            facilmente
          </p>
        </div>
      )}
      {stepPage === StepHome.USERS && <Users />}
      {stepPage === StepHome.ROLES && <Roles />}
    </div>
  );
};

export default Home;
