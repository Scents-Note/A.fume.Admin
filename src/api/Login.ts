import axios from "axios";

export const Login = async (email: string, password: string) => {
  try {
    const response = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/login`, {
      email,
      password,
    });

    return response;
  } catch (error: any) {
    throw error;
  }
};
