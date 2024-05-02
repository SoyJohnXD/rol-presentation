import React, { useEffect, useState } from "react";
import Input from "../../components/input";
import { ButtonGradient } from "../../components/button/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (JSON?.parse(localStorage?.getItem("user") ?? "{}")?.access_token) {
      navigate("/");
    }
  });

  const [form, setForm] = useState({ email: "", password: "" });
  const [errorLogin, setErrorLogin] = useState(false);

  const handleFormField = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>): void => {
    setForm({ ...form, [name]: value });
  };

  const handleLogin = async () => {
    try {
      const { email, password } = form;
      const { data } = await axios.post("http://localhost:4000/login", {
        email,
        password,
      });
      localStorage.setItem("user", JSON.stringify(data));
      setErrorLogin(false);
      navigate("/");
    } catch (error) {
      setErrorLogin(true);
    }
  };

  return (
    <div className="w-[400px]">
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-white">Inicia Sesion</h1>
        <p className="mt-2 text-gray-500">Ingresa con tus credenciales</p>
      </div>
      <div className="mt-5">
        <Input
          type="email"
          name="email"
          value={form.email}
          placeholder="Correo electronico"
          label="Correo electronico"
          onChange={handleFormField}
        />
        <Input
          type="password"
          name="password"
          value={form.password}
          placeholder="Contraseña"
          label="Contraseña"
          onChange={handleFormField}
        />
        <div className="my-6">
          <ButtonGradient type="button" text="Acceder" onClick={handleLogin} />
        </div>
        {errorLogin && (
          <p className="text-red-600 text-md text-center">
            *Error al inciar sesion, verifique los datos de ingreso
          </p>
        )}
        <p className="text-center text-sm text-gray-500">
          Aun no tienes una cuenta? &nbsp;
          <Link
            to="/register"
            className="font-semibold text-gray-500 hover:underline focus:text-gray-800 focus:outline-none"
          >
            Registrate!
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
