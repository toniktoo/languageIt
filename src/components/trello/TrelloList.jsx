import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useFirestore } from 'react-redux-firebase';

import { ComponentAddCard } from './ComponentAddCard';
import { DeleteOutlined } from '@ant-design/icons';
import { ModalAction } from '../modal/ModalAction';
import { ModalWindow } from '../modal/ModalWindow';

const Wrapper = styled.div`
  width: 272px;
  height: 100%;
  box-sizing: border-box;
  display: inline-block;
  vertical-align: top;
  white-space: nowrap;
  margin-right: 8px;
`;
const List = styled.div`
  background-color: #ebecf0;
  border-radius: 3px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-height: 100%;
  position: relative;
  white-space: normal;
`;
const Header = styled.div`
  padding: 8px;
  position: relative;
  height: 60px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;
const HeaderTitle = styled.h2`
  background: transparent;
  border-radius: 3px;
  box-shadow: none;
  font-weight: 600;
  min-height: 20px;
  max-height: 256px;
  margin: 0;
  max-width: 235px;
`;
const BtnDelete = styled.div`
  display: ${({ hovered }) => (hovered ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  width: 30px;
  height: 24px;
  font-size: 18px;
  cursor: pointer;
  transform: 2s;

  &:hover {
    background-color: rgba(7, 23, 51, 0.08);
    color: #172b4d;
  }
`;
const Cards = styled.div`
  overflow-x: hidden;
  margin: 0 4px;
  padding: 0 4px;
  z-index: 1;
  min-height: 0;
`;
const Card = styled.p`
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
  cursor: pointer;
  display: flex;
  margin-bottom: 8px;
  padding: 6px 8px 6px;
  font-weight: 600;
  color: #5e6c84;
  align-items: center;
`;

export const TrelloList = ({ title, cards }) => {
  const [isModalShow, setIsModalShow] = useState(false);
  const [isWindowShow, setIsWindowShow] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);
  const { uid } = useSelector((state) => state.firebase.auth);
  const firestore = useFirestore();

  const handleModalConfirm = () => setIsModalShow(!isModalShow);
  const [hoveredList, setHoveredList] = useState(false);

  const handleOpenWindow = (card) => {
    setCurrentCard(card);
    setIsWindowShow(true);
  };

  const handleCloseWindow = () => setIsWindowShow(false);

  const handleDeleteCol = () => {
    let idCards = [];
    cards.map((card) => {
      return idCards.push(card.id);
    });

    for (let id of idCards) {
      firestore
        .collection('users')
        .doc(uid)
        .collection('trello')
        .doc(id)
        .delete();

      var lists = firestore
        .collection('users')
        .doc(uid)
        .collection('trello')
        .doc('lists');

      lists.update({
        [title]: null,
      });
    }
  };

  const renderCards = () => {
    return (
      cards &&
      cards.map((card, index) => (
        <Card key={index} onClick={() => handleOpenWindow(card)}>
          {card.cardTitle}
        </Card>
      ))
    );
  };

  return (
    <Wrapper
      onMouseEnter={() => setHoveredList(true)}
      onMouseLeave={() => setHoveredList(false)}
    >
      <List>
        <Header>
          <HeaderTitle>
            {title.length < 40 ? title : `${title.substr(0, 40)}...`}
          </HeaderTitle>
          <BtnDelete onClick={handleModalConfirm} hovered={hoveredList}>
            <DeleteOutlined style={{ fontSize: 18 }} />
          </BtnDelete>
        </Header>
        <Cards>{renderCards()}</Cards>
        <ComponentAddCard listTitle={title} hovered={hoveredList} />
      </List>
      <ModalAction
        handleOk={handleDeleteCol}
        handleCancel={handleModalConfirm}
        title="Удалить список?"
        isShow={isModalShow}
      />
      <ModalWindow
        card={currentCard}
        handleCloseWindow={handleCloseWindow}
        isShow={isWindowShow}
      />
    </Wrapper>
  );
};
