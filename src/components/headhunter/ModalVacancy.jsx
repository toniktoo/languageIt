import React from 'react';
import styled from 'styled-components';
import { formatDistanceToNow } from 'date-fns';

const Wrapper = styled.div`
  z-index: 10;
  background-color: #fff;
  border-radius: 3px;
  padding: 4px;
  font-size: 14px;
  -webkit-line-clamp: 30; /* Число отображаемых строк */
  display: -webkit-box; /* Включаем флексбоксы */
  -webkit-box-orient: vertical; /* Вертикальная ориентация */
  overflow: hidden; /* Обрезаем всё за пределами блока */
  max-height: 700px;
`;

const renderTimePublished = (time) => {
  return `${formatDistanceToNow(new Date(time))} назад. `;
};

const renderExperience = (experience) => {
  return `Требуемый опыт работы: ${experience}.  `;
};

export const ModalVacancy = ({ item }) => {
  return (
    <Wrapper>
      <span>
        Вакансия опубликована {renderTimePublished(item.published_at)}
      </span>
      <span>{renderExperience(item.experience.name)}</span>
      <hr />
      <div
        dangerouslySetInnerHTML={{
          __html: item.description,
        }}
      ></div>
    </Wrapper>
  );
};
