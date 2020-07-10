import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestore } from 'react-redux-firebase';
import queries from '../../api/hh/';
import { uniq } from 'lodash';
import {
  fetchSnippetVacanciesRequest,
  fetchSnippetVacanciesSuccess,
  fetchSnippetVacanciesFailure,
  fetchFullVacanciesRequest,
  fetchFullVacanciesSuccess,
  fetchFullVacanciesFailure,
} from '../../redux/actions';

import { Formik } from 'formik';
import { Tag } from 'antd';
import { FormInput } from '../helpers';
import { ModalSettings } from './ModalSettings';

const FormComponent = styled.form``;
const InputWrapper = styled.div`
  display: flex;
  width: 500px;
  align-items: center;
  margin-bottom: 4px;
`;
const ActionButton = styled.button`
  width: 100px;
  color: #6d6d6d;
  font-size: 20px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  transition: 0.7s;
  outline: none;

  &:hover {
    color: #65a7f3;
  }

  & *:not(:last-child) {
    margin-right: 8px;
  }
`;

const TagsWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const TagsTitle = styled.h3`
  color: #358ff1;
  margin: 0 8px 0 0;
`;

export const FormSearch = ({
  uid,
  city,
  areaId,
  tags,
  countVacansiesOnPage,
}) => {
  const [isOpenSettings, setisOpenSettings] = useState(false);
  const [infoBlock, setInfoBlock] = useState({});
  const dispatch = useDispatch();
  const firestore = useFirestore();

  const updateTagFirestore = (tags) => {
    firestore
      .collection('users')
      .doc(uid)
      .collection('headHunter')
      .doc('user-hh-data')
      .update({ tags });
  };

  const handleDeleteTag = (currnetTag) => {
    updateTagFirestore([...tags.filter((tag) => tag !== currnetTag)]);
  };

  const setTagFirestore = (textSearch) => {
    /* Если тегов больше 3 . то удаляем самый последний добавленный */
    if (tags.length === 3) {
      updateTagFirestore(
        uniq([...tags.filter((tag, index) => index !== 0), textSearch])
      );
      return;
    }
    textSearch !== '' && updateTagFirestore(uniq([...tags, textSearch]));
  };

  const onChangeForm = (setFieldValue, tag) => {
    setFieldValue('textSearch', tag);
  };

  const toggleSettings = (e) => {
    e.preventDefault();
    setisOpenSettings(!isOpenSettings);
  };

  const fetchFullVacancies = async () => {
    dispatch(fetchFullVacanciesRequest({ isLoadingJobs: false }));
    try {
      let arrayIds = [];
      /* Получаем все id вакансий из краткого описания вакансий (snippetVacancies) */
      await snippetVacancies.items.forEach((item) => arrayIds.push(item.id));

      const fullVacancies = [];
      /* Отправляем запрос по каждой id чтобы получить описане полной вакансии */
      await arrayIds.forEach(async (id, index) => {
        const vacancy = await queries.getVacancy({ id });
        await fullVacancies.push(vacancy);
        if (index === arrayIds.length - 1) {
          dispatch(
            fetchFullVacanciesSuccess({ fullVacancies, isLoadingJobs: true })
          );
        }
      });
    } catch (err) {
      dispatch(fetchFullVacanciesFailure({ isLoadingJobs: true }));
    }
  };

  /* Опыт работы */
  const experience = useSelector((state) => state.reducerJobs.experience);
  const currentPage = useSelector((state) => state.reducerJobs.currentPage);

  const validateExperience = (experience) => {
    switch (experience) {
      case 1:
        return '';
      case 2:
        return 'noExperience';
      case 3:
        return 'between1And3';
      case 4:
        return 'between3And6';
      default:
        return '';
    }
  };

  const fetchSnippetVacancies = async (textSearch, areaId) => {
    dispatch(fetchSnippetVacanciesRequest({ isLoadingJobs: false }));
    try {
      /* Получаем краткое описание вакансий */
      const snippetVacancies = await queries.getVacancies({
        textSearch,
        areaId,
        countVacancies: countVacansiesOnPage,
        currentPage: currentPage,
        experience: validateExperience(experience),
      });
      dispatch(
        fetchSnippetVacanciesSuccess({ snippetVacancies, isLoadingJobs: true })
      );
    } catch (err) {
      dispatch(fetchSnippetVacanciesFailure({ isLoadingJobs: true }));
    }
  };

  let snippetVacancies = useSelector(
    (state) => state.reducerJobs.snippetVacancies
  );
  /* Когда получаем краткое описане вакансии, сразу делаем запрос за полным описанием */
  useEffect(() => {
    snippetVacancies.length !== 0 && fetchFullVacancies();
  }, [snippetVacancies]);

  useEffect(() => {
    fetchSnippetVacancies(infoBlock.textSearch, infoBlock.areaId);
  }, [currentPage]);

  return (
    <Formik
      initialValues={{
        textSearch: '',
      }}
      onSubmit={({ textSearch }) => {
        fetchSnippetVacancies(textSearch, areaId);
        // Записываем инфо запроса в блок "Информация поиска"
        setInfoBlock({ textSearch, areaId });
        // Отправляем текст очередного запроса в бд
        setTagFirestore(textSearch);
      }}
    >
      {({ handleSubmit, setFieldValue }) => (
        <FormComponent onSubmit={handleSubmit}>
          <InputWrapper>
            <FormInput
              name="textSearch"
              component="input"
              placeholder="Ключевые слова..."
            />
            <ActionButton type="submit">Найти</ActionButton>
            <ActionButton onClick={toggleSettings}>Настройки</ActionButton>
          </InputWrapper>

          <ModalSettings
            city={city}
            isOpenSettings={isOpenSettings}
            toggleSettings={toggleSettings}
          />

          <TagsWrapper>
            <TagsTitle>Вы искали:</TagsTitle>
            {tags &&
              tags.map((tag) => (
                <Tag
                  style={{ cursor: 'pointer' }}
                  key={tag}
                  closable
                  onClick={() => onChangeForm(setFieldValue, tag)}
                  onClose={() => handleDeleteTag(tag)}
                  color="processing"
                >
                  {tag.length > 10 ? tag.slice(0, 10) + '...' : tag}
                </Tag>
              ))}
          </TagsWrapper>
        </FormComponent>
      )}
    </Formik>
  );
};
