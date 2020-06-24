import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { uniqueId } from 'lodash';
import { Input } from 'antd';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import styles from '../../Trello.module.css';
import { useFirestore } from 'react-redux-firebase';

const ComponentAddCard = ({ listTitle }) => {
  const firestore = useFirestore();
  const { uid } = useSelector((state) => state.firebase.auth);

  const [isAddCard, setIsAddCard] = useState(false);
  const [cardTitle, setCardTitle] = useState('');

  const handleAddCard = () => setIsAddCard(!isAddCard);
  const onChange = (e) => setCardTitle(e.target.value);

  const handleSubmitAddCard = (event) => {
    event.preventDefault();
    firestore.collection('users').doc(uid).collection('trello').add({
      cardId: uniqueId(),
      cardTitle: cardTitle,
      list: listTitle,
    });
    setCardTitle('');
    setIsAddCard(false);
  };

  return (
    <div className={styles.listAdd}>
      {isAddCard ? (
        <form className={styles.formAdd} onSubmit={handleSubmitAddCard}>
          <Input
            placeholder="Заголовок для этой карточки"
            allowClear
            onChange={onChange}
            value={cardTitle}
            style={{ borderRadius: '3px', width: '100%' }}
          />
          <div className={styles.formBtnsWrap}>
            <Input
              type="submit"
              value="Добавить карточку"
              style={{ width: '150px', cursor: 'pointer' }}
            />
            <div className={styles.formBtnDelete} onClick={handleAddCard}>
              <CloseOutlined />
            </div>
          </div>
        </form>
      ) : (
        <div className={styles.listAddContent} onClick={handleAddCard}>
          <PlusOutlined />
          <span className={styles.listAddTitle}>
            Добавить еще одну карточку
          </span>
        </div>
      )}
    </div>
  );
};

export default ComponentAddCard;
