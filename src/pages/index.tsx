import { Login } from "@/common/api/Login";
import { EXPIRED_TIME_FOR_LOGIN_TOKEN } from "@/common/constants/constants";
import { Logo } from "@/components/icons/icons";
import { Cancel } from "@mui/icons-material";
import { TextField, Button, IconButton, InputAdornment } from "@mui/material";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useMemo, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export const HomePage: React.FC = (props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();

  const isDisabledLogin = useMemo(
    () => email.length === 0 && password.length === 0,
    [email, password]
  );

  useEffect(() => {
    const loginToken = localStorage.getItem("token");

    if (loginToken !== null && loginToken !== undefined) {
      const loginData = JSON.parse(loginToken);

      if (loginData.expired < Date.now()) {
        localStorage.removeItem("token");
      } else {
        router.replace("/main");
      }
    }
  }, []);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setErrorMessage(null);
      // TODO: JWT 토큰을 받아오는 백엔드 로직 추가하기
      const response = await Login(email, password);

      const loginData = JSON.stringify({
        token: response.data.token,
        expired: Date.now() + EXPIRED_TIME_FOR_LOGIN_TOKEN,
      });
      localStorage.setItem("token", loginData);

      router.push("/main");
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center bg-login-background">
      <div className="w-600 h-500 flex justify-center items-center rounded-4 shadow-paper bg-white">
        <form
          className="w-full h-full flex flex-col items-center justify-center"
          onSubmit={handleLogin}
        >
          <Logo className="mb-8" />
          <div className="mb-50 select-none">관리자 페이지</div>
          <div className="flex flex-col gap-20">
            <TextField
              className="w-500"
              size="small"
              label="어드민 계정"
              value={email}
              error={errorMessage !== null}
              InputProps={{
                endAdornment: email && (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setEmail("")}>
                      <Cancel />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              className="w-500"
              size="small"
              label="비밀번호"
              type="password"
              value={password}
              error={errorMessage !== null}
              helperText={errorMessage}
              InputProps={{
                endAdornment: password && (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setPassword("")}>
                      <Cancel />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              className="w-500"
              disabled={isDisabledLogin}
              type="submit"
              size="large"
              variant="contained"
              color="primary"
            >
              로그인
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
