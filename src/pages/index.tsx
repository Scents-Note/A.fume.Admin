import { Cancel } from '@mui/icons-material';
import { TextField, Button, IconButton, InputAdornment } from '@mui/material';
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import axios from 'axios';

import { EXPIRED_TIME_FOR_LOGIN_TOKEN } from '@/common/constants/constants';
import { Login } from '@/common/api/Login';
import { Logo } from '@/components/icons/icons';
import { Layout } from '@/components/icons/pages/Layout';

export const HomePage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();

  const isDisabledLogin = useMemo(
    () => email.length === 0 && password.length === 0,
    [email, password],
  );

  useEffect(() => {
    const loginToken = localStorage.getItem('token');

    if (loginToken !== null && loginToken !== undefined) {
      const loginData = JSON.parse(loginToken);

      if (loginData.expired < Date.now()) {
        localStorage.removeItem('token');
      } else {
        router.replace('/main/perfume');
      }
    }
    // @ESLINT_DISABLED useRouter는 내부적으로 리렌더링을 최적화 하고 있음.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setErrorMessage(null);
      const response = await Login(email, password);

      axios.defaults.headers.common[
        'x-access-token'
      ] = `Bearer ${response.data.token}`;

      const loginData = JSON.stringify({
        token: response.data.token,
        expired: Date.now() + EXPIRED_TIME_FOR_LOGIN_TOKEN,
      });
      localStorage.setItem('token', loginData);

      router.push('/main/perfume');
      // @ESLINT_DISABLED catch문에서 error는 any 타입이나 unknown을 사용할 것을 강요하고 있음.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <Layout>
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
                      <IconButton onClick={() => setEmail('')}>
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
                      <IconButton onClick={() => setPassword('')}>
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
    </Layout>
  );
};

export default HomePage;
