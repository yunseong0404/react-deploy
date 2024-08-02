import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { authSessionStorage } from "@/utils/storage";

export const KakaoLogin = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    axios
      .get('https://pnuece.pnu.app/api/oauth/kakao/code')
      .then((response) => {
        const { kakaoToken } = response.data.token;
        console.log('login');

        localStorage.setItem('token', kakaoToken);
        authSessionStorage.set(kakaoToken);

        navigate("/home");
      })
      .catch((error) => {
        console.error('Kakao Login failed:', error);
      });
  }, [navigate]);

  return (
    <div>
      카카오 로그인
    </div>
  )
}
