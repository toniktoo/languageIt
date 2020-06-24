import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from '../Trello.module.css';
import ComponentAddCard from './componentAddCard/index';
import { DeleteOutlined } from '@ant-design/icons';
import { useFirestore } from 'react-redux-firebase';
import { ModalAction } from '../../modal/modalAction/index';
import { Window } from './window/Window';

export const TrelloList = ({ title, cards }) => {
  const [isModalShow, setIsModalShow] = useState(false);
  const [isWindowShow, setIsWindowShow] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);
  const { uid } = useSelector((state) => state.firebase.auth);
  const firestore = useFirestore();

  const handleModalConfirm = () => setIsModalShow(!isModalShow);

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
  return (
    <div className={styles.list}>
      <div className={styles.listContent}>
        <div className={styles.listHeader}>
          <h2 className={styles.listHeaderTitle}>
            {title.length < 40 ? title : `${title.substr(0, 40)}...`}
          </h2>
          <div onClick={handleModalConfirm} className={styles.formBtnDelete}>
            <DeleteOutlined style={{ fontSize: 18 }} />
          </div>
        </div>
        <div className={styles.listCards}>
          {cards &&
            cards.map((card, index) => (
              <p
                className={styles.listCard}
                key={index}
                onClick={() => handleOpenWindow(card)}
              >
                {card.cardTitle}
              </p>
            ))}
        </div>
        <ComponentAddCard listTitle={title} />
      </div>
      {isModalShow ? (
        <ModalAction
          handleOk={handleDeleteCol}
          handleCancel={handleModalConfirm}
          title="Удалить список?"
        />
      ) : null}
      {isWindowShow ? (
        <Window card={currentCard} handleCloseWindow={handleCloseWindow} />
      ) : (
        ''
      )}
    </div>
  );
};
