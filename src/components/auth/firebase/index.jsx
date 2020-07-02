import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useFirebase } from 'react-redux-firebase';
import { routes } from '../../../constants/routes';
import { useHistory } from 'react-router-dom';

export const FirebaseAuth = () => {
  const firebase = useFirebase();
  const history = useHistory();

  return (
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
  );
};
