import axios from "axios";
import { IRole } from "../models/types";

export const getRoleList = async (token: string): Promise<IRole[]> => {
  try {
    const response = await axios.get(
      "${import.meta.env.VITE_URL_SERVER}/roles",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data ?? [];
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
    return [];
  }
};
