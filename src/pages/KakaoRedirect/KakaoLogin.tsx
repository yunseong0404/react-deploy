import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { BASE_URL } from "@/api/instance";
import { authSessionStorage } from "@/utils/storage";

export const KakaoLogin = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/oauth/kakao/code`)
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
