import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  ReadOutlined,
  UserOutlined,
  SolutionOutlined,
  BarsOutlined,
  TeamOutlined,
} from '@ant-design/icons';

import { routes } from '../constants/routes/';

const Ul = styled.ul`
  position: fixed;
  top: 0;
  right: 200px;
  z-index: 5;
  padding: 3.5rem 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const NavLink = styled(Link)`
  color: #6d6d6d;
  font-size: 20px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;

  & *:not(:last-child) {
    margin-right: 8px;
  }
`;

export const HomeMenu = ({ open }) => {
  return (
    <Ul>
      <NavLink to={routes.aboutSite}>
        <ReadOutlined />
        <span>About Site</span>
      </NavLink>
      <NavLink to={routes.aboutMe}>
        <UserOutlined />
        <span>About Me</span>
      </NavLink>
      <NavLink to={routes.aboutMe}>
        <SolutionOutlined />
        <span>Portfolio</span>
      </NavLink>
      <NavLink to={routes.exampleAppsPage}>
        <BarsOutlined />
        <span> Example apps</span>
      </NavLink>
      <NavLink to={routes.aboutMe}>
        <TeamOutlined />
        <span>Contacts</span>
      </NavLink>
    </Ul>
  );
};

