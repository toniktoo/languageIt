import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import styles from './Trello.module.css';
import { ComponentAddList } from './componentAddList';
import { TitleContent } from '../helpersComponents';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { groupBy, omitBy } from 'lodash';
import { TrelloList } from './list/TrelloList';

const Trello = () => {
  const { uid } = useSelector((state) => state.firebase.auth);
  const [trelloList, setTrelloList] = useState([]);
  useFirestoreConnect(
    uid
      ? [
          {
            collection: 'users',
            doc: uid,
            subcollections: [
              {
                collection: 'trello',
              },
            ],
            storeAs: 'lists',
          },
        ]
      : null
  );

  /* ПОЛУЧАЕМ ОБЬЕКТ МАССИВОВ СО СПИСКОМ ЛИСТОВ И КАРТОЧЕК */
  const objTrelloList = useSelector((state) => state.firestore.ordered.lists);

  useEffect(() => {
    if (objTrelloList) {
      /* УБИРАЕМ ИЗ ОБЬЕКТА МАССИВ С НАЗВАНИЯМИ ЛИСТОВ */
      const listWithoutTitles = omitBy(
        objTrelloList,
        (list) => list.id === 'lists'
      );
      /* ГРУППИРУЕМ ОБЬЕКТЫ ПО ЛИСТАМ */
      const gpoupLists = groupBy(listWithoutTitles, (list) => list.list);
      setTrelloList(Object.entries(gpoupLists));
    }
  }, [objTrelloList]);

  return (
    <>
      {!objTrelloList ? (
        <Spin size="large" />
      ) : (
        <div className={styles.trello}>
          <TitleContent title="Trello" />
          <div className={styles.board}>
            {trelloList.map((list, index) => (
              <TrelloList
                key={list[0] + index}
                title={list[0]}
                cards={list[1]}
              />
            ))}
            <ComponentAddList />
          </div>
        </div>
      )}
    </>
  );
};

export default Trello;
