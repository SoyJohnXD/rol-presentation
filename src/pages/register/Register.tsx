import React, { useEffect, useState } from "react";
import Input from "../../components/input";
import { ButtonGradient } from "../../components/button/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/");
  }, []);

  useEffect(() => {
    validateSamePassword();
  }, [form]);

  const handleFormField = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>): void => {
    setForm({ ...form, [name]: value });
  };

  const validateSamePassword = (): boolean => {
    setErrorPassword(!(form.password === form.confirmPassword));
    return form.password === form.confirmPassword;
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (errorPassword) return;
    try {
      const { email, password } = form;
      await axios.post(`${import.meta.env.VITE_URL_SERVER}/register`, {
        email,
        password,
      });
      setSuccess(true);
      setError(false);
    } catch (error) {
      setError(true);
      setSuccess(false);
    }
  };

  return (
    <div className="w-[400px]">
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-white">Registrate ahora!</h1>
        <p className="mt-2 text-gray-500">
          Al registrarse tendra permisos de empleado, contacte al administrador.
        </p>
      </div>
      <div className="mt-5">
        <form autoComplete="none" onSubmit={handleRegister}>
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
          <Input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            placeholder="Confirmar contraseña"
            label="Confirmar contraseña"
            onChange={handleFormField}
          />
          {errorPassword && (
            <p className="text-red-600 text-sm text-left">
              *Las contraseñas no coinciden
            </p>
          )}
          <div className="my-6">
            <ButtonGradient
              type="submit"
              text="Acceder"
              onClick={(): void => {}}
            />
          </div>
        </form>
        {error && (
          <p className="text-red-600 text-md text-center">
            *Error al registrar el usuario,verifique sus datos
          </p>
        )}
        {success && (
          <p className="text-green-600 text-md text-center">
            Usuario registrado exitosamente!
          </p>
        )}
        <p className="text-center text-sm text-gray-500">
          Ya tienes una cuenta? &nbsp;
          <Link
            to="/login"
            className="font-semibold text-gray-500 hover:underline focus:text-gray-800 focus:outline-none"
          >
            Inicia sesion!
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Register;
