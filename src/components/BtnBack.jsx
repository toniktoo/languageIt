import React from 'react';
import styled from 'styled-components';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

export const Button = styled.div`
  position: absolute;
  top: 36px;
  left: 36px;
  font-size: 30px;
  cursor: pointer;

  &:hover * {
    color: #65a7f3;
  }
`;

export const BtnBack = () => {
  const history = useHistory();
  return (
    <Button onClick={() => history.goBack()}>
      <ArrowLeftOutlined style={{ color: '#6d6d6d' }} />
    </Button>
  );
};
