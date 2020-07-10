import React from 'react';
import styled from 'styled-components';
import {
  WarningOutlined,
  CloseOutlined,
  CheckOutlined,
} from '@ant-design/icons';

const Wrapper = styled.div`
  position: fixed;
  z-index: 15;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`;
const Modal = styled.div`
  position: absolute;
  top: calc(50% - 75px);
  left: calc(50% - 150px);
  width: 300px;
  height: 150px;
  background-color: #e6f7ff;
  border-radius: 3px;
  z-index: 16;
  padding: 16px;
`;
const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const Title = styled.h2`
  margin: 0 0 0 8px;
  font-weight: 700;
`;
const ActionBtnWrapper = styled.div`
  font-size: 30px;
  position: absolute;
  right: 16px;
  bottom: 16px;
  display: flex;
  flex-direction: row;
`;
const ActionBtn = styled.div`
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 3px;
  transition: 0.7s;

  &:hover {
    background-color: rgba(6, 32, 76, 0.306);
    color: #172b4d;
  }
`;

export const ModalAction = ({
  title,
  isShow,
  handleOk,
  handleCancel,
  children,
}) => {
  return isShow ? (
    <Wrapper>
      <Modal>
        <TitleWrapper>
          <WarningOutlined style={{ fontSize: 18 }} />
          <Title>{title}</Title>
        </TitleWrapper>
        {children}
        <ActionBtnWrapper>
          <ActionBtn onClick={handleCancel}>
            <CloseOutlined />
          </ActionBtn>
          <ActionBtn onClick={handleOk}>
            <CheckOutlined />
          </ActionBtn>
        </ActionBtnWrapper>
      </Modal>
    </Wrapper>
  ) : null;
};
