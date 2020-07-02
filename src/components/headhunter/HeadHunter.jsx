import React from 'react';
import styles from './HeadHunter.module.css';
import { FormSearch } from './FormSearch';
import { Spin, List, Pagination } from 'antd';
import { TitleContent } from '../helpersComponents';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';

export const HeadHunter = () => {
  const { uid } = useSelector((state) => state.firebase.auth);

  /* name  */

  /* Получаем данные пользователя ( город, часто использ. теги и т.д. ) */
  useFirestoreConnect(
    uid && {
      collection: `users/${uid}/headHunter`,
      storeAs: 'userdata',
    }
  );

  const userData = useSelector((state) => state.firestore.data.userdata);
  let jobs = useSelector((state) => state.reducerJobs.jobs);
  console.log(jobs);

  return (
    <>
      {!userData ? (
        <Spin size="large" />
      ) : (
        <div className={styles.hh}>
          <TitleContent title="HeadHunter" />
          <div className={styles.header}>
            <FormSearch />
            <h1 className={styles.headerTitle}>
              {userData && userData['user-hh-data'].city}: Найдено вакансий 100
            </h1>
          </div>
          <div className={styles.content}>
            {jobs && (
              <>
                <div className={styles.lists}>
                  <List
                    size="small"
                    bordered
                    style={{ width: '100%' }}
                    dataSource={jobs}
                    renderItem={(item) => (
                      <List.Item key={item.id}>
                        <div className={styles.listItem}>
                          <span>{item.name}</span>
                          <span>
                            {item.salary && item.salary.from} -
                            {item.salary && item.salary.to}{' '}
                            {item.salary && item.salary.currency}
                          </span>
                        </div>  
                      </List.Item>
                    )}
                  />
                  <List
                    size="small"
                    bordered
                    style={{ width: '100%' }}
                    dataSource={jobs}
                    renderItem={(item) => (
                      <List.Item key={item.id}>{item.name}</List.Item>
                    )}
                  />
                </div>
                <div className={styles.paginationWrap}>
                  <Pagination defaultCurrent={6} total={500} />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};
