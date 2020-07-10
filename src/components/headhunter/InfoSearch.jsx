import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  max-width: 350px;
  margin-top: 40px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const TitleInfo = styled.h2`
  color: #358ff1;
  font-size: 18px;
  font-weight: 600;
  text-decoration: underline;
`;
const TextInfo = styled.h3`
  color: #629fe2;
  font-weight: 600;
`;

const validateExperience = (experience) => {
  switch (experience) {
    case 1:
      return 'Не имеет значения';
    case 2:
      return 'Нет опыта';
    case 3:
      return 'От 1 года до 3 лет';
    case 4:
      return 'От 3 до 6 лет';
    default:
      return 'Не имеет значения';
  }
};

export const InfoSearch = ({ city, experience, snippetVacancies }) => {
  return (
    <Wrapper>
      <TitleInfo>Информация поиска:</TitleInfo>
      <TextInfo>Найдено вакансий: {snippetVacancies.found}</TextInfo>
      <TextInfo>Город: {city}</TextInfo>
      <TextInfo>Опыт работы: {validateExperience(experience)}</TextInfo>
    </Wrapper>
  );
};
