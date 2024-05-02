import React, { useEffect, useState } from "react";
import { useAppContext } from "../../../../context";
import {
  Badge,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import { getRoleList } from "../../../../api/Api";
import { IRole } from "../../../../models/types";
import { ModalCustom, ModalType } from "../../../../components/modal/Modal";
import {
  RiCloseCircleLine,
  RiDeleteBin2Line,
  RiErrorWarningFill,
  RiPencilFill,
} from "@remixicon/react";
import Button from "../../../../components/button";
import Input from "../../../../components/input";
import axios from "axios";

export interface IRoleForm {
  description?: string;
  id?: number;
  name?: string;
  permision?: string;
}

enum ROLES_TRANSVERSALES {
  ADMIN = 1,
  EMPLOYE = 2,
}

const Roles: React.FC = () => {
  const { userData } = useAppContext();
  const [roleList, setRoleList] = useState<IRole[]>([]);
  const [rolSelected, setRoleSelected] = useState<number>();
  const [form, setForm] = useState<IRoleForm>({});
  const [permissionsForm, setPermissionsForm] = useState<string[]>([]);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [confirmModalShow, setConfirmModalShow] = useState<boolean>(false);
  const [validate, setValidate] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [roleToDelete, setRoleToDelete] = useState<number | null>(null);

  const fetchData = async () => {
    const roleList = await getRoleList(userData?.access_token);
    setRoleList(roleList);
  };

  const setEditrole = (role: IRole) => {
    setIsEdit(true);
    setForm({ ...role });
    setRoleSelected(role.id);
    setPermissionsForm(role.permissions);
  };

  useEffect(() => {
    fetchData(); // Invocar la función asíncrona
  }, []);

  useEffect(() => {
    if (validate && validateFields()) setValidate(false);
  }, [form, permissionsForm]);

  const handleFormField = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>): void => {
    setForm({ ...form, [name]: value });
  };

  const cleanform = (): void => {
    setForm({});
    setPermissionsForm([]);
  };

  const validateFields = (): boolean => {
    return Boolean(form.name && form.description && permissionsForm.length > 0);
  };

  const handleCancelUpdate = (): void => {
    cleanform();
    setIsEdit(false);
  };

  const handleDeleteRole = async (): Promise<void> => {
    const token = userData?.access_token;
    const formToSend = {
      ...form,
      permissions: JSON.stringify(permissionsForm),
    };
    delete formToSend.permision;
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_URL_SERVER}/roles/${roleToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data) setModalShow(true);
      fetchData();
      handleCancelUpdate();
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };

  const handleCancelDelete = async (): Promise<void> => {
    setRoleToDelete(null);
    setConfirmModalShow(false);
  };

  const handleUpdateRole = async (): Promise<void> => {
    if (!validateFields()) {
      setValidate(true);
      return;
    }
    const token = userData?.access_token;
    const formToSend = {
      ...form,
      permissions: JSON.stringify(permissionsForm),
    };
    delete formToSend.permision;
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_URL_SERVER}/roles/${rolSelected}`,
        formToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data) setModalShow(true);
      fetchData();
      cleanform();
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };

  const handleCreateRole = async (): Promise<void> => {
    if (!validateFields()) {
      setValidate(true);
      return;
    }
    const token = userData?.access_token;
    const formToSend = {
      ...form,
      permissions: JSON.stringify(permissionsForm),
    };
    delete formToSend.permision;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL_SERVER}/roles`,
        formToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data) setModalShow(true);
      fetchData();
      cleanform();
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };

  const handleOpenConfirmModal = (id: number): void => {
    setRoleToDelete(id);
    setConfirmModalShow(true);
  };

  const handlePermissionsInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = event.target;
    const trimmedValue = value.trim();

    if (trimmedValue.endsWith(",") && trimmedValue.length > 1) {
      const newPermission = trimmedValue.slice(0, -1);
      if (!permissionsForm.includes(newPermission)) {
        setPermissionsForm([...permissionsForm, newPermission]);
        setForm({ ...form, permision: "" });
      } else {
        setForm({ ...form, permision: "" });
      }
    } else {
      setForm({ ...form, permision: trimmedValue });
    }
  };

  const handleRemovePermission = (indexToRemove: number): void => {
    setPermissionsForm(
      permissionsForm.filter((_, index) => index !== indexToRemove)
    );
  };

  const roleIstranversal = (role: number) => {
    return (
      role === ROLES_TRANSVERSALES.ADMIN || role === ROLES_TRANSVERSALES.EMPLOYE
    );
  };

  return (
    <>
      <ModalType
        isOpen={modalShow}
        onClose={() => setModalShow(false)}
        type="success"
      />
      <ModalCustom
        isOpen={confirmModalShow}
        onClose={() => setConfirmModalShow(false)}
      >
        <div className="flex flex-col gap-2 justify-center items-center">
          <Icon size="xl" icon={RiErrorWarningFill} color="red" />
          <h3 className="text-lg font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
            Eliminacion de Rol
          </h3>
          <p className="mt-2 leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            Esta seguro que desea eliminar el rol
            {roleList?.find((rol) => rol.id === roleToDelete)?.name}?
          </p>
          <div className="flex flex-row gap-2">
            <Button
              classButton="!bg-red-500 hover:bg-red-700 text-white font-bold !py-2 px-4 rounded"
              text="Eliminar"
              onClick={handleDeleteRole}
              type="button"
            />
            <Button
              classButton="bg-neutral-500 hover:bg-neutral-700 text-white font-bold !py-2 px-4 rounded"
              text="Cancelar"
              onClick={handleCancelDelete}
              type="button"
            />
          </div>
        </div>
      </ModalCustom>
      <article className="flex flex-row items-center justify-center w-full transition gap-7">
        <div
          className={`bg-white flex flex-col p-5 rounded-lg shadow-md w-[800px] transition-all`}
        >
          <h1 className="text-2xl  text-gray-800 mb-4 text-center font-bold">
            Listado de Roles y permisos
          </h1>
          <Table>
            <TableHead>
              <TableRow className="bg-gray-50">
                <TableHeaderCell>Id</TableHeaderCell>
                <TableHeaderCell>Nombre </TableHeaderCell>
                <TableHeaderCell>Descripcion </TableHeaderCell>
                <TableHeaderCell>Permisos </TableHeaderCell>
                <TableHeaderCell>Acciones </TableHeaderCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {roleList.map((role) => (
                <TableRow key={role?.id} className="hover:bg-gray-50">
                  <TableCell>{role.id}</TableCell>
                  <TableCell>{role.name}</TableCell>
                  <TableCell>{role.description}</TableCell>
                  <TableCell>
                    <div className="flex flex-row gap-2 flex-wrap items-center">
                      {role.permissions.map((permission, index: number) => (
                        <Badge
                          key={`${index}-${role.id}`}
                          color="neutral"
                          size="sm"
                        >
                          {permission}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-row gap-2">
                      <Icon
                        icon={RiPencilFill}
                        variant="shadow"
                        size="md"
                        color={roleIstranversal(role.id) ? "gray" : "blue"}
                        className={
                          roleIstranversal(role.id) ? "" : "cursor-pointer"
                        }
                        onClick={() => {
                          if (!roleIstranversal(role.id)) setEditrole(role);
                        }}
                      />
                      <Icon
                        icon={RiDeleteBin2Line}
                        variant="shadow"
                        color={roleIstranversal(role.id) ? "gray" : "red"}
                        size="md"
                        className={
                          roleIstranversal(role.id) ? "" : "cursor-pointer"
                        }
                        onClick={() => {
                          if (!roleIstranversal(role.id))
                            handleOpenConfirmModal(role.id);
                        }}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <aside
          className={`bg-white flex flex-col p-5 px-8 max-w-[389px] w-[389px]  rounded-lg shadow-md  transition-all gap-4 h-fit`}
        >
          <h3 className="text-xl font-bold text-gray-800 text-center">
            {isEdit ? "Edite el rol seleccionado" : "Creacion de roles"}
          </h3>
          <Input
            type="text"
            label="Nombre"
            name="name"
            value={form.name ?? ""}
            onChange={handleFormField}
            clasesInput={validate && !form.name ? "!border-red-500" : ""}
          />
          <Input
            type="text"
            label="Descripcion"
            name="description"
            value={form.description ?? ""}
            onChange={handleFormField}
            clasesInput={validate && !form.description ? "!border-red-500" : ""}
          />
          <Input
            type="text"
            label="Permisos"
            name="permision"
            value={form.permision ?? ""}
            onChange={handlePermissionsInput}
            clasesInput={
              validate && !permissionsForm.length ? "!border-red-500" : ""
            }
          />
          <div className="flex flex-row gap-2 flex-wrap items-center">
            <span className="text-xs text-neutral-400">Permisos: </span>
            {permissionsForm.map((permission, index: number) => (
              <Badge key={`${index}-permision`} color="green" size="xs">
                <div className="flex w-full flex-row gap-[2px] flex-wrap justify-center items-center">
                  {permission}
                  <Icon
                    icon={RiCloseCircleLine}
                    className="p-0 cursor-pointer"
                    size="xs"
                    color="green"
                    onClick={() => {
                      handleRemovePermission(index);
                    }}
                  />
                </div>
              </Badge>
            ))}
          </div>
          {validate && (
            <span className="text-xs text-red-500">*Campos obligatorios</span>
          )}
          {isEdit ? (
            <div className="flex flex-row gap-2">
              <Button
                classButton="text-white font-bold py-2 px-4 rounded"
                text="Actualizar"
                onClick={handleUpdateRole}
                type="button"
              />
              <Button
                classButton="bg-neutral-500 hover:bg-neutral-700 text-white font-bold py-2 px-4 rounded"
                text="Cancelar"
                onClick={handleCancelUpdate}
                type="button"
              />
            </div>
          ) : (
            <Button
              classButton="text-white font-bold py-2 px-4 rounded"
              text="Guardar"
              onClick={handleCreateRole}
              type="button"
            />
          )}
        </aside>
      </article>
    </>
  );
};

export default Roles;
