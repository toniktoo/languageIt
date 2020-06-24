import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './styles.css';
import 'firebase/auth';
import 'firebase/firestore';
import firebase from 'firebase/app';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import { rootReducer } from './redux/reducer';
import { BrowserRouter } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './App';

const firebaseConfig = {
  apiKey: 'AIzaSyAWNIM8nrFOhi7qozG3S0dehaBKYf16Tm8',
  authDomain: 'platform-language-it.firebaseapp.com',
  databaseURL: 'https://platform-language-it.firebaseio.com',
  projectId: 'platform-language-it',
  storageBucket: 'platform-language-it.appspot.com',
  messagingSenderId: '1055986147969',
  appId: '1:1055986147969:web:53783638b5fd509a986380',
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

const initialState = {};
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware())
);

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

const rootElement = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  rootElement
);
