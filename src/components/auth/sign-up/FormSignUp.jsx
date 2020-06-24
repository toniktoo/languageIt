import * as React from 'react';
import { Formik } from 'formik';
import { Input } from 'antd';
import styles from '../FormAuth.module.css';
import { Link } from 'react-router-dom';
import { UserAddOutlined } from '@ant-design/icons';
import { FormInput } from '../../helpersComponents';
import { routes } from '../../../constants/routes';

const FormSignUp = (props) => {
  return (
    <div>
      <h1 className={styles.title}>Registration</h1>
      <Formik
        initialValues={{
          email: 'toniktoo@mail.ru',
          password: 'Swimm1998er',
        }}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
        }}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className={styles.formAuth}>
            <hr className={styles.lineBottomTitle} />
            <label>Email</label>
            <FormInput
              name="email"
              component="input"
              placeholder="enter email..."
            />
            <label>Password</label>
            <FormInput
              name="password"
              type="password"
              component="input"
              placeholder="enter password..."
            />
            <div className={styles.btnsWrap}>
              <Input type="submit" value="Sign in" style={{ width: '100px' }} />
              <Link to={routes.signIn} className="linkWithImgRigth">
                <span>Login</span>
                <UserAddOutlined />
              </Link>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default FormSignUp;
