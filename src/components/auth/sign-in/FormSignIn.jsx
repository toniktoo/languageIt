import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
// import GoogleButton from 'react-google-button'; // optional
import { Formik } from 'formik';
import { Input } from 'antd';
import styles from '../FormAuth.module.css';
import { Link } from 'react-router-dom';
import { UserAddOutlined } from '@ant-design/icons';
import { FormInput } from '../../helpersComponents';
import { routes } from '../../../constants/routes';

const FormSignIn = () => {
  const firebase = useFirebase();
  const auth = useSelector((state) => state.firebase.auth);
  const history = useHistory();
  return (
    <div>
      <h1 className={styles.title}>Login</h1>
      <Formik
        initialValues={{
          email: 'toniktoo@gmail.com',
          password: 'Swimm1998er',
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
      <StyledFirebaseAuth
        uiConfig={{
          signInFlow: 'popup',
          signInSuccessUrl: '/signedIn',
          signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
          callbacks: {
            signInSuccessWithAuthResult: (authResult, redirectUrl) => {
              firebase.handleRedirectResult(authResult).then(() => {
                history.push(routes.trello);
              });
              return false;
            },
          },
        }}
        firebaseAuth={firebase.auth()}
      />
    </div>
  );
};

export default FormSignIn;
