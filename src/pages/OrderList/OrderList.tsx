import { Text } from '@chakra-ui/react';
import styled from 'styled-components';

import Order from '@/components/features/OrderList/Order';

export const OrderList = () => {
  return (
    <Wrapper>
      <Text>주문 내역</Text>
      <Order />
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
