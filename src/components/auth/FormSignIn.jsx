import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { useFirebase } from 'react-redux-firebase';
import * as yup from 'yup';

import Fade from 'react-reveal/Fade';
import { Formik } from 'formik';
import { UserAddOutlined } from '@ant-design/icons';
import { FirebaseAuth } from './FirebaseAuth';
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
  handlerError
} from './FormComponents';

export const FormSignIn = () => {
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
        <Title>Login</Title>
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
              .signInWithEmailAndPassword(email, password)
              .then((res) => history.push(routes.trello))
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
                <BtnSubmit type="submit">Sign In</BtnSubmit>
                <LinkSubmitWrap to={routes.signUp}>
                  <LinkSubmit>Registration</LinkSubmit>
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
