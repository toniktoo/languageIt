import React, { useState } from 'react';
import { Input } from 'antd';
import { uniqueId } from 'lodash';
import { useSelector } from 'react-redux';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import styles from '../Trello.module.css';
import { useFirestore } from 'react-redux-firebase';

export const ComponentAddList = () => {
  const firestore = useFirestore();
  const { uid } = useSelector((state) => state.firebase.auth);

  const [isAddCol, setIsAddCol] = useState(false);
  const [cardTitle, setCardTitle] = useState('');
  const [colTitle, setColTitle] = useState('');

  const handleAddCol = () => setIsAddCol(!isAddCol);
  const onChangeCol = (e) => setColTitle(e.target.value);
  const onChangeCard = (e) => setCardTitle(e.target.value);

  const handleSubmitAddCol = (event) => {
    event.preventDefault();
    firestore
      .collection('users')
      .doc(uid)
      .collection('trello')
      .doc('lists')
      .set(
        {
          [uniqueId()]: colTitle,
        },
        { merge: true }
      );
    firestore.collection('users').doc(uid).collection('trello').add({
      cardId: uniqueId(),
      cardTitle: cardTitle,
      list: colTitle,
    });
    setCardTitle('');
    setColTitle('');
    setIsAddCol(false);
  };

  return (
    <div className={styles.listAddWrap}>
      <div className={styles.listAdd}>
        {isAddCol ? (
          <form className={styles.formAdd} onSubmit={handleSubmitAddCol}>
            <Input
              placeholder="Заголовок для этого списка"
              allowClear
              onChange={onChangeCol}
              value={colTitle}
              style={{ borderRadius: '3px', width: '100%' }}
            />
            <Input
              placeholder="Заголовок для новой карточки"
              allowClear
              onChange={onChangeCard}
              value={cardTitle}
              style={{ borderRadius: '3px', width: '100%', marginTop: '4px' }}
            />
            <div className={styles.formBtnsWrap}>
              <Input
                type="submit"
                value="Добавить список"
                style={{ width: '150px', cursor: 'pointer' }}
              />
              <div className={styles.formBtnDelete} onClick={handleAddCol}>
                <CloseOutlined />
              </div>
            </div>
          </form>
        ) : (
          <div className={styles.listAddContent} onClick={handleAddCol}>
            <PlusOutlined />
            <span className={styles.listAddTitle}>
              Добавить еще один список
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
