import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { InfoSearch } from './InfoSearch';
import { FormSearch } from './FormSearch';

const Wrapper = styled.div`
  width: 500px;
`;

export const InfoSidebar = ({
  uid,
  countVacansiesOnPage,
  snippetVacancies,
}) => {
  const dataFirestore = useSelector((state) => state.firestore.data.userdata);
  let city = dataFirestore && dataFirestore['user-hh-data'].city;
  let areaId = dataFirestore && dataFirestore['user-hh-data'].areaId;
  let tags = dataFirestore && dataFirestore['user-hh-data'].tags;

  const experience = useSelector((state) => state.reducerJobs.experience);

  return (
    <Wrapper>
      <FormSearch
        uid={uid}
        city={city}
        areaId={areaId}
        tags={tags}
        countVacansiesOnPage={countVacansiesOnPage}
      />
      <InfoSearch
        experience={experience}
        city={city}
        snippetVacancies={snippetVacancies}
      />
    </Wrapper>
  );
};
