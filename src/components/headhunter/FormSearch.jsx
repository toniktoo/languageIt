import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { Input, Tag, Modal } from 'antd';
import styles from './HeadHunter.module.css';
import { FormInput } from '../helpersComponents';
import {
  fetchJobsRequest,
  fetchJobsSuccess,
  fetchJobsFailure,
} from '../../redux/actions';
import queries from '../../api/hh/';

export const FormSearch = () => {
  const [tags, setTags] = useState(['react', 'vue', 'angular']);
  const [isOpenSettings, setisOpenSettings] = useState(false);
  const dispatch = useDispatch();

  const deleteTag = (currnetTag) => {
    setTags([...tags.filter((tag) => tag !== currnetTag)]);
  };

  const onChangeForm = (setFieldValue, tag) => {
    setFieldValue('word', tag);
  };

  const toggleSettings = (e) => {
    e.preventDefault();
    setisOpenSettings(!isOpenSettings);
  };

  const fetchJobs = async () => {
    dispatch(fetchJobsRequest());
    try {
      const res = await queries.getVacancies();
      dispatch(fetchJobsSuccess({ jobs: res.items }));
    } catch (err) {
      dispatch(fetchJobsFailure());
    }
  };

  return (
    <Formik
      initialValues={{
        word: '',
      }}
      onSubmit={(values) => {
        fetchJobs();
        console.log(1);
      }}
    >
      {({ handleSubmit, setFieldValue }) => (
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formInput}>
            <FormInput
              name="word"
              allowClear={true}
              component="input"
              placeholder="Ключевые слова..."
            />
            <Input type="submit" value="Поиск" style={{ width: '100px' }} />
            <div className={styles.settingsBtnWrap}>
              <Input
                type="submit"
                value="Настройки"
                style={{ width: '100px' }}
                onClick={toggleSettings}
              />
            </div>
          </div>
          <Modal
            title="Настройки"
            visible={isOpenSettings}
            centered={true}
            onOk={toggleSettings}
            onCancel={toggleSettings}
          >
            <FormInput
              name="city"
              allowClear={true}
              component="input"
              placeholder="Ключевые слова..."
            />
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
          <div>
            {tags.map((tag) => (
              <Tag
                key={tag}
                closable
                onClick={() => onChangeForm(setFieldValue, tag)}
                onClose={() => deleteTag(tag)}
                color="processing"
              >
                {tag}
              </Tag>
            ))}
          </div>
        </form>
      )}
    </Formik>
  );
};
