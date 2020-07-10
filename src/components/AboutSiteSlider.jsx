import React from 'react';
import styled from 'styled-components';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/swiper.scss';

const Slide = styled.div`
  background-color: #1b2845;
  background-image: linear-gradient(315deg, #1b2845 0%, #274060 74%);

  color: #000;
  width: 25vw;
  height: 300px;
`;

export default () => {
  return (
    <Swiper
      slidesPerView={4}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>
        <Slide>На чем сделан проект</Slide>
      </SwiperSlide>
      <SwiperSlide>
        <Slide>trello</Slide>
      </SwiperSlide>
      <SwiperSlide>
        <Slide>hh.ru</Slide>
      </SwiperSlide>
      <SwiperSlide>
        <Slide>aviasales</Slide>
      </SwiperSlide>
      <SwiperSlide>
        <Slide>
          Что в планах добавить: заменить firebase на ноду, добавить чат
          websockets
        </Slide>
      </SwiperSlide>
    </Swiper>
  );
};
