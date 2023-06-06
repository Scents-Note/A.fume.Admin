import { Login } from "@/api/Login";
import { ERROR_LOGIN_1 } from "@/common/message/message";
import { TextField, Button, FormHelperText } from "@mui/material";
import axios from "axios";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export const HomePage: React.FC = (props) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username.length === 0 || password.length === 0)
      setErrorMessage(ERROR_LOGIN_1);
    else {
      setErrorMessage(null);
      // TODO: JWT 토큰을 받아오는 백엔드 로직 추가하기
      const response = axios.post("/api/admin/login", { username, password });
      console.log(response);
      // router.push("/main");
    }
  };

  return (
    <form
      className="w-full h-full flex flex-col gap-20 items-center justify-center"
      onSubmit={handleLogin}
    >
      <div className="flex w-700 h-200 gap-60 justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-40">
          <TextField
            className="w-200"
            size="small"
            label="아이디"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            className="w-200"
            size="small"
            label="비밀번호"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button
          className="w-120 h-120"
          type="submit"
          variant="contained"
          color="primary"
        >
          로그인
        </Button>
      </div>
      <FormHelperText error={errorMessage !== null}>
        {errorMessage}
      </FormHelperText>
    </form>
  );
};

export default HomePage;
