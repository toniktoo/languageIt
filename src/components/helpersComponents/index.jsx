import React from 'react';
import { Divider } from 'antd';
import { ErrorMessage } from 'formik';
import { Input } from 'formik-antd';

const renderError = (msg) => <span className="errorMsg">{msg}</span>;

export const FormInput = ({ name, ...props }) => (
  <div className="formInputWrap">
    <Input name={name} {...props} className="formInput" />
    <ErrorMessage name={name} className="formInputError">
      {(msg) => renderError(msg)}
    </ErrorMessage>
  </div>
);

export const TitleContent = ({ title }) => (
  <Divider orientation="left" style={{ color: '#333', fontWeight: 'bold' }}>
    {title}
  </Divider>
);
