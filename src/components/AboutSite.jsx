import React from 'react';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';

import AboutSiteSlider from './AboutSiteSlider';
import { BtnBack } from './BtnBack';

const Wrapper = styled.div`
  height: 100vh;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 36px 0 18px 0;
`;

const Title = styled.h1`
  color: #c7274c;
  font-weight: 800;
  font-size: 40px;
  margin: 0;
`;

const Content = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContentTextFirst = styled.p`
  max-width: 1320px;
  justify-content: center;
  text-align: center;
  font-weight: 700;
  font-size: 20px;
  color: #6d6d6d;
  margin: 0;
`;

const ContentTextSecond = styled.p`
  max-width: 1320px;
  justify-content: center;
  text-align: center;
  font-weight: 700;
  font-size: 16px;
  color: #6d6d6d;
  margin: 0 0 60px 0;
`;

const ContentTextThird = styled.p`
  max-width: 1320px;
  justify-content: center;
  text-align: center;
  font-weight: 500;
  font-size: 20px;
  color: #6d6d6d;
`;

const TitleSliderWrap = styled.div`
  max-width: 100vw;
  width: 100%;
  color: #c7274c;
  font-weight: 800;
  margin: 60px 0 0 0;
`;

const TitleSlider = styled.h2`
  max-width: 100vw;
  width: 100%;
  color: #c7274c;
  font-weight: 600;
  margin: 0;
`;

const ContainerSlider = styled.div`
  width: 100%;
`;

const TEXT_FIRST = `Проект создан для личного пользования и демонстрирования навыков. Приложение включает в себя несколько отдельно взятых уже готовых и
известеных сайтов c использованием бесплатных API интегрированных с
моими идеями.`;

const TEXT_SECOND = `В этом проекте специльно использованы различные подходы и технологии для реализации конкретных задач. Например: (style-in-js в одном
приложении, а в другом sass, в одном redux, а в другом context и т.д.)`;

const TEXT_THIRD = `У вас есть свой проект на React или только хотите его создать, тогда вы попали в нужное место. Если вы сами создаете что-то, то возможно найдете полезную информации по JS, TS, React, веб дизайну и других
вопросах. Если Вас интересует какой-то вопрос по сайту или вы хотите
заказать у меня услугу – быстро и не дорого, свяжитесь со мной любым
удобным для вас способом.`;

export const AboutSite = () => {
  return (
    <Fade>
      <Wrapper>
        <BtnBack />
        <Header>
          <Title>Добро пожаловать</Title>
        </Header>
        <Content>
          <ContentTextFirst>{TEXT_FIRST}</ContentTextFirst>
          <TitleSliderWrap>
            <TitleSlider>На данный момент функционал проекта:</TitleSlider>
            <ContainerSlider>
              <AboutSiteSlider />
            </ContainerSlider>
          </TitleSliderWrap>
          <ContentTextSecond>
            {TEXT_SECOND}
            <span style={{ color: '#65a7f3', textDecoration: 'underline' }}>
              {' '}
              Это сделанно только для демонстрации навыков.
            </span>
          </ContentTextSecond>
          <ContentTextThird>{TEXT_THIRD}</ContentTextThird>
        </Content>
      </Wrapper>
    </Fade>
  );
};
