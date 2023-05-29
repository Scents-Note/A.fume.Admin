import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export const Login: React.FC = (props) => {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();

  const router = useRouter();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    // event.preventDefault();
    // // TODO: JWT 토큰을 받아오는 백엔드 로직 추가하기
    router.push("/main");
  };

  return (
    <form
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onSubmit={handleLogin}
    >
      <div
        style={{
          display: "flex",
          width: "700px",
          height: "130px",
          gap: "60px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <label style={{ width: "120px", textAlign: "center" }}>
              아이디
            </label>
            <input
              style={{ width: "200px" }}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <label style={{ width: "120px", textAlign: "center" }}>
              비밀번호
            </label>
            <input
              style={{ width: "200px" }}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <input
          style={{ width: "130px", height: "130px" }}
          type="submit"
          value="로그인"
        />
      </div>
    </form>
  );
};

export default Login;
