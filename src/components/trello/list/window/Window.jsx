import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import styles from './Window.module.css';
import { useFirestore } from 'react-redux-firebase';
import { useSelector } from 'react-redux';

export const Window = ({ card, handleCloseWindow }) => {
  const { cardTitle, id } = card;
  const firestore = useFirestore();
  const { uid } = useSelector((state) => state.firebase.auth);

  const handleDelteCard = () => {
    firestore
      .collection('users')
      .doc(uid)
      .collection('trello')
      .doc(id)
      .delete();
    handleCloseWindow();
  };

  return (
    <div className={styles.windowWrap}>
      <div className={styles.window}>
        <div>
          <h2>{cardTitle}</h2>
          <button onClick={handleDelteCard}>delete</button>
        </div>
        <div className={styles.exit} onClick={handleCloseWindow}>
          <CloseOutlined />
        </div>
      </div>
    </div>
  );
};
