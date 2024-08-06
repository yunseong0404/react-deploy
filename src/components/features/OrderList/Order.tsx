import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { BASE_URL } from '@/api/instance';
import { Image } from '@/components/common/Image';
import { Spacing } from '@/components/common/layouts/Spacing';
import { LabelText } from '@/components/features/Order/OrderForm/Common/LabelText';

type OrderList = {
  id: number;
  orderDateTime: string;
  optionId: number;
  quantity: number;
  message: string;
};

export default function Order() {
  const [orders, setOrders] = useState<OrderList[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.get(`${BASE_URL}/api/orders`, {
        params: {
          page: 0,
          size: 10,
          sort: 'orderDateTime,desc',
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(response.data);
    } catch (err) {
      console.log('주문 내역을 불러오는 데 실패했습니다.');
    }
  };

  return (
    <Wrapper>
      <Spacing />
      {orders.map((order) => (
        <OrderWrapper key={order.id}>
          <LabelText>{order.orderDateTime}</LabelText>
          <OrderInfoWrapper>
            <OrderInfoImage>
              <Image src="" width={150} ratio="square" />
            </OrderInfoImage>
            <OrderInfoTextWrapper>
              <OrderInfoTextTitle>옵션 번호: {order.optionId}</OrderInfoTextTitle>
              <OrderInfoTextTitle>수량: {order.quantity}</OrderInfoTextTitle>
              <OrderInfoTextTitle>주문 메시지: {order.message}</OrderInfoTextTitle>
            </OrderInfoTextWrapper>
          </OrderInfoWrapper>
        </OrderWrapper>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 50%;
  padding: 16px;
`;

const OrderWrapper = styled.div`
  width: 100%;
  padding: 20px 16px 16px;
  border-radius: 8px;
  border: 1px solid #ededed;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.02);
`;

const OrderInfoWrapper = styled.div`
  display: flex;
  height: 150px;
`;

const OrderInfoTextWrapper = styled.div`
  padding-left: 8px;
`;

const OrderInfoTextTitle = styled.p`
  font-size: 22px;
  font-weight: 400;
  margin-top: 3px;
  color: #222;
  overflow: hidden;
  font-weight: 400;
`;

const OrderInfoImage = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  overflow: hidden;
`;
