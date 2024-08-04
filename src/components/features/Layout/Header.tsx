import { Box, Select } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Container } from '@/components/common/layouts/Container';
import { useAuth } from '@/provider/Auth';
import { getDynamicPath, RouterPath } from '@/routes/path';

export const Header = () => {
  const navigate = useNavigate();
  const authInfo = useAuth();
  const [selectedApi, setSelectedApi] = useState('');

  const API: { [key: string]: string } = {
    신예준: 'https://pnuece.pnu.app',
    원윤서: 'http://3.37.113.212:8080',
    이영준: '이영준',
    황수환: 'https://kakao-gift-api.shop',
  };

  const handleLogin = () => {
    navigate(getDynamicPath.login());
  };

  const handleApiChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const apiName = event.target.value;
    setSelectedApi(apiName);
    sessionStorage.setItem('BASE_URL', API[apiName]);
    window.location.reload();
  };

  return (
    <Wrapper>
      <Container flexDirection="row" alignItems="center" justifyContent="space-between">
        <Link to={RouterPath.home}>
          <Logo
            src="https://gift-s.kakaocdn.net/dn/gift/images/m640/pc_gift_logo.png"
            alt="카카오 선물하기 로고"
          />
        </Link>
        <RightWrapper>
          <Select
            width={180}
            placeholder="백엔드 API 선택"
            onChange={handleApiChange}
            value={selectedApi}
          >
            <option value="신예준">신예준</option>
            <option value="원윤서">원윤서</option>
            <option value="이영준">이영준</option>
            <option value="황수환">황수환</option>
          </Select>
          {authInfo ? (
            <Box display="flex" gap="15px">
              <LinkButton onClick={() => navigate(RouterPath.admin)}>관리자</LinkButton>
              <LinkButton onClick={() => navigate(RouterPath.myAccount)}>내 계정</LinkButton>
            </Box>
          ) : (
            <LinkButton onClick={handleLogin}>로그인</LinkButton>
          )}
        </RightWrapper>
      </Container>
    </Wrapper>
  );
};

export const HEADER_HEIGHT = '60px';

export const Wrapper = styled.header`
  position: fixed;
  z-index: 9999;
  width: 100%;
  max-width: 100vw;
  height: ${HEADER_HEIGHT};
  background-color: #fff;
  padding: 0 16px;
`;

const Logo = styled.img`
  height: ${HEADER_HEIGHT};
`;
const RightWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

const LinkButton = styled.p`
  align-items: center;
  font-size: 14px;
  color: #000;
  text-decoration: none;
  cursor: pointer;
`;
