import React from 'react';
import styled from 'styled-components';
import { GithubOutlined, MailOutlined } from '@ant-design/icons';
import LightSpeed from 'react-reveal/LightSpeed';

import { BurgerButton } from './BurgerButton';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  padding: 10em;
  overflow: hidden;
`;

const Name = styled.h2`
  color: #fff;
  font-weight: 800;
`;

const Title = styled.h2`
  max-width: 1000px;
  margin: 50px 0 40px 0;
  width: 100%;
  color: #e64268;
  font-weight: 600;
  font-size: 60px;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  transition: 1s;

  &:hover {
    color: #65a7f3;
    transition: 1s;
    cursor: pointer;
  }

  & * {
    margin: 0;
  }
`;

const Ul = styled.ul`
  display: flex;
  padding: 0;
`;

const Li = styled.li`
  list-style: none;
  &:not(:last-child) {
    margin-right: 16px;
  }
`;

const NavLink = styled.a`
  color: #6d6d6d;
  font-weight: 800;
  display: flex;
  align-items: center;

  & *:not(:last-child) {
    margin-right: 4px;
  }
`;

export const Home = () => {
  return (
    <Wrapper>
      <BurgerButton />
      <Name>Nikita Tolmachev</Name>

      <LightSpeed left cascade>
        <Title>
          <p>Design and creation of sites.</p>
          <p>Create web apps in react js and react-native.</p>
          <p>Creating a Landing Page.</p>
        </Title>
      </LightSpeed>

      <Ul>
        <Li>
          <NavLink href="">
            <MailOutlined />
            <span>Email</span>
          </NavLink>
        </Li>
        <Li>
          <NavLink href="">
            <GithubOutlined />
            <span>Github</span>
          </NavLink>
        </Li>
      </Ul>
    </Wrapper>
  );
};

/*  <h2>
        Здравствуйте. Меня зовут Виталий Гнатковский, и я являюсь автором этого
        сайта. Я занимаюсь версткой, дизайном и созданием шаблонов для
        WordPress. У вас есть свой блог на WordPress или только хотите его
        создать, тогда вы попали в нужное место. Если вы сами создаете что-то,
        то на этом сайте найдете много полезной информации по WordPress, веб
        дизайну и других вопросах. Если Вас интересует какой-то вопрос по сайту
        или вы хотите заказать у меня услугу – быстро и не дорого, свяжитесь со
        мной любым удобным для вас способом.
      </h2>
      <span>
        Ключ от базы данных предоставлен в коде, но там нет ничего ценного, так
        что вы не найдете ничего там.
      </span> */
// Design and creation of sites. Create web apps in react js and react-native. Creating a Landing Page.

//   c099e6
//   6d6d6d
