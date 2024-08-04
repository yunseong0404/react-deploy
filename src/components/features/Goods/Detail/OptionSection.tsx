import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';
import axios from 'axios';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  type ProductDetailRequestParams,
  useGetProductDetail,
} from '@/api/hooks/useGetProductDetail';
import { useGetProductOptions } from '@/api/hooks/useGetProductOptions';
import { BASE_URL } from '@/api/instance';
import { Button } from '@/components/common/Button';
import { useAuth } from '@/provider/Auth';
import { getDynamicPath, RouterPath } from '@/routes/path';
import type { ProductOptionsData } from '@/types';
import { orderHistorySessionStorage } from '@/utils/storage';

import { CountOptionItem } from './OptionItem/CountOptionItem';

type Props = ProductDetailRequestParams;

export const OptionSection = ({ productId }: Props) => {
  const { data: detail } = useGetProductDetail({ productId });
  const { data: options } = useGetProductOptions({ productId });

  const [selectedOption, setSelectedOption] = useState<ProductOptionsData | null>(null);
  const [countAsString, setCountAsString] = useState('1');
  const [isRegistration, setIsRegistration] = useState(false);

  const totalPrice = useMemo(() => {
    return detail.price * Number(countAsString);
  }, [detail, countAsString]);

  const navigate = useNavigate();
  const authInfo = useAuth();

  //선물하기
  const handleClick = () => {
    if (!authInfo) {
      const isConfirm = window.confirm(
        '로그인이 필요한 메뉴입니다.\n로그인 페이지로 이동하시겠습니까?',
      );

      if (!isConfirm) return;
      return navigate(getDynamicPath.login());
    } else if (!selectedOption) {
      alert('옵션을 선택해 주세요.');

      return;
    }

    orderHistorySessionStorage.set({
      optionName: selectedOption.name,
      optionId: selectedOption.id,
      productName: detail.name,
      imageUrl: detail.imageUrl,
      productId: parseInt(productId),
      quantity: parseInt(countAsString),
    });

    navigate(RouterPath.order);
  };

  //관심 상품 등록
  const handleRegistration = async () => {
    const token = localStorage.getItem('token');

    if (!selectedOption) {
      alert('옵션을 선택해 주세요');
      return;
    }

    axios
      .post(
        `${BASE_URL}/api/wishes`,
        {
          optionId: selectedOption?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .then((response) => {
        console.log(response.data);
        setIsRegistration(true);
        alert('관심 등록 완료');
      })
      .catch((error) => {
        console.error('관심 등록 실패:', error);
        alert('관심 등록에 실패했습니다.');
      });
  };

  return (
    <Wrapper>
      <TopWrapper>
        <CountOptionItem
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          productName={detail.name}
          options={options}
          count={countAsString}
          onChange={setCountAsString}
        />
        <Box mt="15px"> </Box>
        <Button theme="outline" size="large" onClick={handleRegistration} disabled={isRegistration}>
          {isRegistration ? '관심등록 완료' : '관심등록 추가'}
        </Button>
      </TopWrapper>
      <BottomWrapper>
        <PricingWrapper>
          총 결제 금액 <span>{totalPrice}원</span>
        </PricingWrapper>
        <Button theme="black" size="large" onClick={handleClick}>
          나에게 선물하기
        </Button>
      </BottomWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 30px 12px 30px 30px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BottomWrapper = styled.div`
  padding: 12px 0 0;
`;

const TopWrapper = styled.div`
  padding: 12px 0 0;
`;

const PricingWrapper = styled.div`
  margin-bottom: 20px;
  padding: 18px 20px;
  border-radius: 4px;
  background-color: #f5f5f5;
  display: flex;
  justify-content: space-between;

  font-size: 14px;
  font-weight: 700;
  line-height: 14px;
  color: #111;

  & span {
    font-size: 20px;
    letter-spacing: -0.02em;
  }
`;
