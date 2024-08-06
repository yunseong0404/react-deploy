import { Box, Divider } from '@chakra-ui/react';
import styled from '@emotion/styled';
import axios from 'axios';
import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { BASE_URL } from '@/api/instance';
import KAKAO_LOGO from '@/assets/kakao_logo.svg';
import { Button } from '@/components/common/Button';
import { UnderlineTextField } from '@/components/common/Form/Input/UnderlineTextField';
import { Spacing } from '@/components/common/layouts/Spacing';
import { breakpoints } from '@/styles/variants';
import { authSessionStorage } from '@/utils/storage';

export const LoginPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [queryParams] = useSearchParams();

  const handleConfirm = () => {
    if (!id || !password) {
      alert('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    axios
      .post(`${BASE_URL}/api/members/login`, {
        email: id,
        password: password,
      })
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem('token', token);
        authSessionStorage.set({ token, id });
        const redirectUrl = queryParams.get('redirect') ?? `${window.location.origin}/`;
        return window.location.replace(redirectUrl);
      })
      .catch((error) => {
        console.error('Login failed:', error);
        alert('로그인에 실패했습니다.');
        return;
      });
  };

  //kakao login
  const handleKakaoLogin = () => {

    axios
      .get(`${BASE_URL}/api/oauth/kakao/code`)
      .then((response) => {
        const kakaoToken = response.data.token;

        localStorage.setItem('token', kakaoToken);
        authSessionStorage.set(kakaoToken);
        return window.location.replace('/home');
      })
      .catch((error) => {
        console.error('Kakao Login failed:', error);
      });
  };

  //kakao sign-up
  const handleKakaoSignup = () => {
    axios
      .get(`${BASE_URL}/api/oauth/kakao/url`)
      .then((response) => {
        const kakaoURL = response.data.url;
        console.log(kakaoURL);

        return (window.location.href = kakaoURL);
      })
      .catch((error) => {
        console.error('Kakao Login failed:', error);
      });
  };

  return (
    <Wrapper>
      <Logo src={KAKAO_LOGO} alt="카카고 CI" />
      <FormWrapper>
        <UnderlineTextField placeholder="이름" value={id} onChange={(e) => setId(e.target.value)} />
        <Spacing />
        <UnderlineTextField
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Spacing
          height={{
            initial: 40,
            sm: 60,
          }}
        />
        <Button onClick={handleConfirm}>로그인</Button>
        <Spacing
          height={{
            initial: 20,
          }}
        />
        <Button onClick={handleKakaoLogin}>카카오 로그인</Button>

        <Divider mt="30px" orientation="horizontal" />
        <Box mt="20px" onClick={handleKakaoSignup}>
          카카오 회원가입
        </Box>
        <Link to="/signup">
          <Box mt="15px">회원가입</Box>
        </Link>
      </FormWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Logo = styled.img`
  width: 88px;
  color: #333;
`;

const FormWrapper = styled.article`
  width: 100%;
  max-width: 580px;
  padding: 16px;
  display: flex;
  flex-direction: column;

  align-items: center;

  @media screen and (min-width: ${breakpoints.sm}) {
    border: 1px solid rgba(0, 0, 0, 0.12);
    padding: 60px 52px;
  }
`;
