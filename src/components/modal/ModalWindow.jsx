import React from 'react';
import styled from 'styled-components';
import { useFirestore } from 'react-redux-firebase';
import { useSelector } from 'react-redux';

import { CloseOutlined } from '@ant-design/icons';

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
const Window = styled.div`
  position: relative;
  max-width: 1000px;
  width: 100%;
  height: 700px;
  background-color: #fff;
  border-radius: 3px;
  padding: 8px;
`;

const CloseWindow = styled.div`
  width: 25px;
  padding: 4px;
  border-radius: 3px;
  position: absolute;
  right: 8px;
  top: 8px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: #f4f5f7;
    color: #172b4d;
  }
`;

export const ModalWindow = ({ card, handleCloseWindow, isShow }) => {
  const firestore = useFirestore();
  const { uid } = useSelector((state) => state.firebase.auth);

  const handleDelteCard = () => {
    firestore
      .collection('users')
      .doc(uid)
      .collection('trello')
      .doc(card.id)
      .delete();
    handleCloseWindow();
  };

  return isShow ? (
    <Wrapper>
      <Window>
        <h1>Этот раздел в разработке!!!</h1>
        <div>
          <h2>{card.cardTitle}</h2>
          <button onClick={handleDelteCard}>delete</button>
        </div>
        <CloseWindow onClick={handleCloseWindow}>
          <CloseOutlined />
        </CloseWindow>
      </Window>
    </Wrapper>
  ) : null;
};
