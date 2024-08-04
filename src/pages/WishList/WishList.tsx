import { Text } from '@chakra-ui/react';
import styled from 'styled-components';

import InterestList from '@/components/features/WishList/InterestList';

export const WishList = () => {
  return (
    <Wrapper>
      <Text fontWeight={700} fontSize="50px">
        위시 리스트
      </Text>
      <InterestList />
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
