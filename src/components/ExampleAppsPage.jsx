import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Flip from 'react-reveal/Flip';

import { BtnBack } from './BtnBack';
import { routes } from '../constants/routes/';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const AppList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
`;

const AppItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;

  &:not(:last-child) {
    margin-right: 16px;
  }
`;

const App = styled(Link)`
  color: #6d6d6d;
  font-size: 30px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${({ color }) => color};
  }

  & *:not(:last-child) {
    margin-right: 8px;
  }
`;

const colorRed = '#e64268';
const colorBlue = '#65a7f3';

const arrayApps = [
  { id: 0, name: 'Trello', path: routes.trello, color: colorBlue },
  { id: 1, name: 'HeadHunter', path: routes.headhunter, color: colorRed },
  { id: 2, name: 'Aviasales', path: routes.aviasales, color: colorBlue },
];

export const ExampleAppsPage = () => {
  return (
    <Wrapper>
      <BtnBack />
      <AppList>
        {arrayApps.map((app) => (
          <AppItem key={app.id}>
            <Flip left>
              <App to={app.path} color={app.color}>
                {app.name}
              </App>
            </Flip>
          </AppItem>
        ))}
      </AppList>
    </Wrapper>
  );
};
