import React, { useEffect, useState } from "react";
import { useAppContext } from "../../../../context";
import axios from "axios";
import {
  Badge,
  Icon,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import { RiCloseLine, RiFlag2Line, RiPencilFill } from "@remixicon/react";
import { getRoleList } from "../../../../api/Api";
import { IRole, IUser } from "../../../../models/types";
import Button from "../../../../components/button";
import { ModalType } from "../../../../components/modal/Modal";

const Users: React.FC = () => {
  const { userData } = useAppContext();
  const [userList, setUserList] = useState<IUser[]>([]);
  const [roleList, setRoleList] = useState<IRole[]>([]);
  const [userSelected, setUserSelected] = useState<IUser>({});
  const [rolSelected, setRoleSelected] = useState<number | null>(null);
  const [modalShow, setModalShow] = useState<boolean>(false);

  const fetchData = async () => {
    getUserList();
    const roleList = await getRoleList(userData?.access_token);
    setRoleList(roleList);
  };

  useEffect(() => {
    fetchData(); // Invocar la función asíncrona
  }, []);

  const getUserList = async (): Promise<void> => {
    const token = userData?.access_token;
    try {
      const response = await axios.get("http://localhost:4000/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserList(response.data);
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };

  const handleUpdateRole = async (): Promise<void> => {
    const token = userData?.access_token;
    try {
      const response = await axios.put(
        `http://localhost:4000/update_user_role/${userSelected?.id}/${rolSelected}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data) setModalShow(true);
      getUserList();
      setUserSelected({});
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };

  const handleSelectUser = (user: IUser): void => {
    setUserSelected(user);
  };
  return (
    <>
      <ModalType
        isOpen={modalShow}
        onClose={() => setModalShow(false)}
        type="success"
        aditionalText="El usuario será notificado via correo electronico de la actualización de su rol y permisos."
      />
      <article className="flex flex-row items-center justify-center min-w-[900px] transition gap-7">
        <div
          className={`bg-white flex flex-col p-5 rounded-lg shadow-md w-[600px] transition-all`}
        >
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Lista de usuarios
          </h1>
          <Table>
            <TableHead>
              <TableRow className="bg-gray-50">
                <TableHeaderCell>Id</TableHeaderCell>
                <TableHeaderCell>Email </TableHeaderCell>
                <TableHeaderCell>Rol </TableHeaderCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {userList.map((user) => (
                <TableRow key={user?.id} className="hover:bg-gray-50">
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <div className="flex flex-row gap-2 items-center">
                      <Badge color="emerald" icon={RiFlag2Line}>
                        {user.role}
                      </Badge>
                      <Icon
                        icon={RiPencilFill}
                        variant="light"
                        size="md"
                        className="cursor-pointer "
                        onClick={() => handleSelectUser(user)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {userSelected?.id && (
          <aside
            className={`bg-white flex flex-col p-5  rounded-lg shadow-md ${
              userSelected?.id ? "w-[300px]" : "w-0"
            } transition-all gap-4 h-fit`}
          >
            <div className="flex items-center justify-end">
              <Icon
                icon={RiCloseLine}
                size="sm"
                className="cursor-pointer"
                onClick={() => {
                  setUserSelected({});
                }}
                color="gray"
              />
            </div>
            <h3 className="text-md font-semibold text-gray-800 text-center">
              Selecciona un rol para el usuario :{" "}
              <strong>{userSelected.email ?? ""}</strong>
            </h3>
            <Select
              defaultValue={
                String(
                  roleList?.find((role) => role?.name === userSelected?.role)
                    ?.id
                ) ?? ""
              }
              value={String(rolSelected)}
              onValueChange={(value) => setRoleSelected(parseInt(value))}
              className="text-gray-700"
              placeholder="Seleccione.."
            >
              {roleList?.map((role) => (
                <SelectItem
                  className="cursor-pointer "
                  key={role.id}
                  value={String(role.id)}
                >
                  {role.name}
                </SelectItem>
              ))}
            </Select>
            <Button
              classButton="font-bold py-2 px-4 rounded"
              text="Guardar"
              onClick={handleUpdateRole}
              type="button"
            />
          </aside>
        )}
      </article>
    </>
  );
};

export default Users;
