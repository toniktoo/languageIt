import React from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFirebase, isLoaded, isEmpty } from 'react-redux-firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
// import GoogleButton from 'react-google-button'; // optional

function SignIn() {
  const firebase = useFirebase();
  const auth = useSelector((state) => state.firebase.auth);
  const history = useHistory();
  return (
    <div>
      <StyledFirebaseAuth
        uiConfig={{
          signInFlow: 'popup',
          signInSuccessUrl: '/signedIn',
          signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
          callbacks: {
            signInSuccessWithAuthResult: (authResult, redirectUrl) => {
              firebase.handleRedirectResult(authResult).then(() => {
                history.push('/todos');
              });
              return false;
            },
          },
        }}
        firebaseAuth={firebase.auth()}
      />
      <div>
        <h2>Auth</h2>
        {!isLoaded(auth) ? (
          <span>Loading...</span>
        ) : isEmpty(auth) ? (
          <span>Not Authed</span>
        ) : (
          <Redirect to="/todos" />
        )}
      </div>
      <button onClick={() => firebase.logout()}>logout</button>
    </div>
  );
}

export default SignIn;
