import React from 'react';
import { useFirebase } from 'react-redux-firebase';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';

import Fade from 'react-reveal/Fade';
import { Formik } from 'formik';
import { FirebaseAuth } from './FirebaseAuth';
import { UserAddOutlined } from '@ant-design/icons';
import { BtnBack } from '../BtnBack';
import { routes } from '../../constants/routes';
import { FormInput } from '../helpers';
import {
  Wrapper,
  Title,
  FormAuht,
  ContainerBtnSubmit,
  BtnSubmit,
  LinkSubmitWrap,
  LinkSubmit,
  handlerError,
} from './FormComponents';

export const FormSignUp = (props) => {
  const firebase = useFirebase();
  const history = useHistory();

  const schema = yup.object().shape({
    email: yup.string().email('Not correct email').required('Enter email'),
    password: yup.string().required('Enter password'),
  });

  return (
    <Fade>
      <Wrapper>
        <BtnBack />
        <Title>Registration</Title>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={() => schema}
          onSubmit={(values, { setFieldError }) => {
            const { email, password } = values;
            firebase
              .auth()
              .createUserWithEmailAndPassword(email, password)
              .then((res) => history.push(routes.home))
              .catch((error) => {
                handlerError(error, setFieldError);
              });
          }}
        >
          {({ handleSubmit }) => (
            <FormAuht onSubmit={handleSubmit}>
              <FormInput
                name="email"
                component="input"
                placeholder="enter email..."
              />
              <FormInput
                name="password"
                type="password"
                component="input"
                placeholder="enter password..."
              />
              <ContainerBtnSubmit>
                <BtnSubmit>Sign Up</BtnSubmit>
                <LinkSubmitWrap to={routes.signIn}>
                  <LinkSubmit>Login</LinkSubmit>
                  <UserAddOutlined />
                </LinkSubmitWrap>
              </ContainerBtnSubmit>
            </FormAuht>
          )}
        </Formik>
        <FirebaseAuth />
      </Wrapper>
    </Fade>
  );
};
