import axios from 'axios';

export const Login = async (email: string, password: string) => {
  try {
    const response = await axios.post('/api/admin/login', { email, password });
    return response;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
