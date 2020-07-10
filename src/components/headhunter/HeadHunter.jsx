import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';

import Fade from 'react-reveal/Fade';
import { AuthIsLoaded, DataIsLoaded } from '../Loaders';
import { HeaderApp } from '../HeaderApp';
import { ListVacancies } from './ListVacancies';
import { InfoSidebar } from './InfoSidebar';
import { PaginationComponent } from './PaginationComponent';

const Wraper = styled.div`
  width: 100vw;
  height: 100vh;
  color: #172b4d;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  padding: 8px 16px 0 16px;
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 70px);
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Content = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
`;

export const HeadHunter = () => {
  const { uid } = useSelector((state) => state.firebase.auth);
  const [countVacansiesOnPage] = useState(16);

  /* Коннектимся к бд при монтировании */
  useFirestoreConnect(
    uid && {
      collection: `users/${uid}/headHunter`,
      storeAs: 'userdata',
    }
  );

  let fullVacancies = useSelector((state) => state.reducerJobs.fullVacancies);
  let isLoadingJobs = useSelector((state) => state.reducerJobs.isLoadingJobs);
  let snippetVacancies = useSelector(
    (state) => state.reducerJobs.snippetVacancies
  );

  return (
    <AuthIsLoaded>
      <Fade>
        <Wraper>
          <HeaderApp title="HeadHunter" />
          <ContentWrapper>
            <Content>
              <InfoSidebar
                uid={uid}
                countVacansiesOnPage={countVacansiesOnPage}
                snippetVacancies={snippetVacancies}
              />
              <DataIsLoaded data={isLoadingJobs}>
                <ListVacancies fullVacancies={fullVacancies} />
              </DataIsLoaded>
            </Content>
            <PaginationComponent
              fullVacancies={fullVacancies}
              snippetVacancies={snippetVacancies}
              countVacansiesOnPage={countVacansiesOnPage}
            />
          </ContentWrapper>
        </Wraper>
      </Fade>
    </AuthIsLoaded>
  );
};
