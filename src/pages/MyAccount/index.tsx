import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/common/Button';
import { Spacing } from '@/components/common/layouts/Spacing';
import { useAuth } from '@/provider/Auth';
import { RouterPath } from '@/routes/path';
import { authSessionStorage } from '@/utils/storage';

export const MyAccountPage = () => {
  const authInfo = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    authSessionStorage.set(undefined);
    localStorage.removeItem('token');

    const redirectURL = `${window.location.origin}${RouterPath.home}`;
    window.location.replace(redirectURL);
  };


  return (
    <Wrapper>
      {authInfo?.name}님 안녕하세요! <Spacing height={64} />
      <Box display="flex" gap="20px" mb="70px">
        <Button
          size="large"
          theme="lightGray"
          style={{
            width: '200px',
          }}
          onClick={() => navigate(RouterPath.wishList)}
        >
          위시 리스트
        </Button>
        <Button
          size="large"
          theme="lightGray"
          style={{
            width: '200px',
          }}
          onClick={() => navigate(RouterPath.orderList)}

        >
          주문 내역
        </Button>
      </Box>
      <Button
        size="small"
        theme="darkGray"
        onClick={handleLogout}
        style={{
          maxWidth: '200px',
        }}
      >
        로그아웃
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 80px 0 120px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 36px;
`;
