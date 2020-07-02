import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { useFirebase } from 'react-redux-firebase';
// import GoogleButton from 'react-google-button'; // optional
import { Formik } from 'formik';
import { Input } from 'antd';
import styles from '../FormAuth.module.css';
import { Link } from 'react-router-dom';
import { UserAddOutlined } from '@ant-design/icons';
import { FormInput } from '../../helpersComponents';
import { routes } from '../../../constants/routes';
import { FirebaseAuth } from '../firebase';

const FormSignIn = () => {
  const firebase = useFirebase();
  const history = useHistory();
  return (
    <div>
      <h1 className={styles.title}>Login</h1>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={(values) => {
          const { email, password } = values;
          firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(history.push('/'))
            .catch((err) => console.log(`EEEEERRRO ${err}`));
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
              <Link to={routes.signUp} className="linkWithImgRigth">
                <span>Registration</span>
                <UserAddOutlined />
              </Link>
            </div>
          </form>
        )}
      </Formik>
      <FirebaseAuth />
    </div>
  );
};

export default FormSignIn;
