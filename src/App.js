import React from 'react';
import styled from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';

import { FormSignIn } from './components/auth/FormSignIn';
import { Home } from './components/Home';
import { AboutSite } from './components/AboutSite';
import { AboutMe } from './components/AboutMe';
import { ExampleAppsPage } from './components/ExampleAppsPage';
import { FormSignUp } from './components/auth/FormSignUp';
import { routes } from './constants/routes';
import { ProfileUser } from './components/profile';
import { Trello } from './components/trello/Trello';
import { HeadHunter } from './components/headhunter/HeadHunter';
import { PrivateRoute } from './components/routes/PrivateRoute';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #2b4162;
  background-image: linear-gradient(315deg, #2b4162 0%, #12100e 74%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;
`;

const App = () => {
  return (
    <Wrapper>
      <Switch>
        <Route path={routes.home} exact component={Home} />
        <Route path={routes.aboutSite} component={AboutSite} />
        <Route path={routes.aboutMe} component={AboutMe} />
        <Route path={routes.exampleAppsPage} component={ExampleAppsPage} />
        <Route path={routes.signIn} component={FormSignIn} />
        <Route path={routes.signUp} component={FormSignUp} />
        <PrivateRoute path={routes.trello} children={<Trello />} />
        <PrivateRoute path={routes.headhunter} children={<HeadHunter />} />
        <PrivateRoute path={routes.profileUser} children={<ProfileUser />} />
        <Redirect to={routes.home} />
      </Switch>
    </Wrapper>
  );
};

export default App;
