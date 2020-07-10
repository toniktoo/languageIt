import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { changePage } from '../../redux/actions';

import { Pagination } from 'antd';

const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PaginationComponent = ({
  fullVacancies,
  snippetVacancies,
  countVacansiesOnPage,
}) => {
  const dispatch = useDispatch();

  const onChange = (currentPage) => {
    dispatch(changePage({ currentPage }));
  };
  return (
    <>
      {fullVacancies.length !== 0 ? (
        <PaginationWrapper>
          <Pagination
            defaultCurrent={1}
            total={snippetVacancies.found}
            pageSize={countVacansiesOnPage}
            onChange={onChange}
          />
        </PaginationWrapper>
      ) : null}
    </>
  );
};
