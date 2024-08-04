import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import {
  IconButton,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useNumberInput,
} from '@chakra-ui/react';
import styled from '@emotion/styled';

import type { ProductOptionsData } from '@/types';

type Props = {
  selectedOption: ProductOptionsData | null;
  setSelectedOption: React.Dispatch<React.SetStateAction<ProductOptionsData | null>>;
  productName: string;
  options: ProductOptionsData[];
  minValues?: number;
  count: string;
  onChange: (value: string) => void;
};

export const CountOptionItem = ({
  selectedOption,
  setSelectedOption,
  productName,
  options,
  minValues = 1,
  count,
  onChange,
}: Props) => {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    step: 1,
    min: minValues,
    max: selectedOption?.quantity,
    defaultValue: count,
    onChange: (valueAsString) => {
      onChange(valueAsString);
    },
  });

  const increment = getIncrementButtonProps();
  const decrement = getDecrementButtonProps();
  const input = getInputProps();

  const handleChange = (value: string) => {
    const optionData = options.find((option) => option.id.toString() === value);
    setSelectedOption(optionData || null);
  };

  return (
    <>
      {selectedOption ? (
        <Wrapper>
          <Title>{productName}</Title>
          <Text mt="5px">옵션: {selectedOption.name}</Text>
          <InputWrapper>
            <IconButton {...decrement} aria-label="수량 1개 감소" icon={<MinusIcon />} />
            <Input {...input} />
            <IconButton {...increment} aria-label="수량 1개 추가" icon={<AddIcon />} />
          </InputWrapper>
          <Text mt="5px">최대 구매제한 {selectedOption.quantity}개</Text>
        </Wrapper>
      ) : (
        <Wrapper>
          <RadioGroup onChange={handleChange}>
            <Text mb="10px" fontWeight={700}>
              옵션 선택
            </Text>
            <Stack>
              {options.map((option) => (
                <Radio key={option.id} value={option.id.toString()}>
                  {option.name}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 12px 14px 16px;
  border: 1px solid #ededed;
  border-radius: 2px;
`;

const Title = styled.p`
  font-weight: 700;
  line-height: 22px;
  color: #111;
  word-wrap: break-word;
  word-break: break-all;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 8px;
  gap: 8px;
`;
