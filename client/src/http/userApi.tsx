import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (
  email: string,
  password: string,
  role: string
) => {
  const { data } = await $host.post("api/user/registration", {
    email,
    password,
    role,
  });
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const login = async (email: string, password: string) => {
  const { data } = await $host.post("api/user/login", { email, password });
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const check = async () => {
  const { data } = await $authHost.get("api/user/auth");
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const fetchUsers = async () => {
  const { data } = await $host.get("api/user");
  return data;
};

export const updateUserRole = async (id: string, role: any) => {
  const { data } = await $host.put(`api/user/${id}`, role);
  return data;
};

export const deleteOneUser = async (id: string | any) => {
  await $host.delete("api/user/" + id, id);
};
