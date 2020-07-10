import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useFirestore } from 'react-redux-firebase';
import { changeExperience } from '../../redux/actions';

import { Button, Modal, Radio } from 'antd';

const WrapperItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const ModalSettings = ({ city, isOpenSettings, ...props }) => {
  const [isChangeCity, setIsChangeCity] = useState(false);
  const firestore = useFirestore();
  const { uid } = useSelector((state) => state.firebase.auth);

  const handleChangeCity = () => setIsChangeCity(!isChangeCity);

  const handleChangeCityFirestore = ({ type }) => {
    const changeCityFirestore = (city, areaId) => {
      firestore
        .collection('users')
        .doc(uid)
        .collection('headHunter')
        .doc('user-hh-data')
        .update({ city, areaId });
    };

    switch (type) {
      case 1: {
        changeCityFirestore('Москва', 1);
        break;
      }
      case 2: {
        changeCityFirestore('Санкт-Петербург', 2);
        break;
      }
      default: {
        changeCityFirestore('Москва', 1);
      }
    }
  };

  const toggleSettings = (e) => {
    setIsChangeCity(false);
    props.toggleSettings(e);
  };

  const renderInfoCity = () => {
    return (
      <>
        <h2 style={{ margin: 0 }}>Город поиска: {city} </h2>
        <Button onClick={handleChangeCity}>Изменить</Button>
      </>
    );
  };

  const renderChangeCity = () => {
    return (
      <>
        <div>
          <Button
            type="primary"
            onClick={() => {
              handleChangeCityFirestore({ type: 1 });
            }}
            style={{ marginRight: '8px' }}
          >
            Москва
          </Button>
          <Button
            type="primary"
            onClick={() => handleChangeCityFirestore({ type: 2 })}
          >
            Санкт-Петербург
          </Button>
        </div>
        <Button onClick={handleChangeCity}>Назад</Button>
      </>
    );
  };

  const experience = useSelector((state) => state.reducerJobs.experience);
  const dispatch = useDispatch();

  const onChangeExperience = (e) => {
    console.log(e);
    dispatch(changeExperience({ experience: e.target.value }));
  };

  const renderExperience = () => {
    return (
      <>
        <h2 style={{ margin: '0 16px 0 0' }}>Опыт: </h2>
        <Radio.Group
          onChange={onChangeExperience}
          value={experience}
          name="radiogroup"
          defaultValue={1}
        >
          <Radio value={1}>Не имеет значения</Radio>
          <Radio value={2}>Нет опыта</Radio>
          <Radio value={3}>От 1 года до 3 лет</Radio>
          <Radio value={4}>От 3 до 6 лет</Radio>
        </Radio.Group>
      </>
    );
  };

  return (
    <Modal
      title="Настройки"
      visible={isOpenSettings}
      centered={true}
      onOk={toggleSettings}
      onCancel={toggleSettings}
    >
      <WrapperItem>
        {isChangeCity ? renderChangeCity() : renderInfoCity()}
      </WrapperItem>

      <WrapperItem>{renderExperience()}</WrapperItem>
    </Modal>
  );
};
