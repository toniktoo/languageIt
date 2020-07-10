import React from 'react';
import styled from 'styled-components';

import ReactHover from 'react-hover';
import { ModalVacancy } from './ModalVacancy';

const List = styled.ul`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0;
  margin-left: 40px;
`;

const ListItem = styled.div`
  &:not(:last-child) {
    margin-bottom: 4px;
  }
`;
const NavLinkWrapper = styled.div``;
const SubLinkWrapper = styled.div`
  width: 900px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const JobLink = styled.a`
  min-width: 600px;
  color: #c4ddef;
  font-size: 20px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CompanyLink = styled.a`
  color: #92b0e4;
  font-size: 14px;
  font-weight: 500;
`;

const SalaryText = styled.span`
  color: #92b0e4;
  font-weight: 600;
`;

export const ListVacancies = ({ fullVacancies }) => {
  const handleEmptyData = (data, arg) => (data && data[arg]) || null;

  const renderSalary = (salary) => {
    let res = '';
    const salaryFrom = handleEmptyData(salary, 'from');
    const salaryTo = handleEmptyData(salary, 'to');
    const salaryCurrency = handleEmptyData(salary, 'currency');
    if (salaryFrom) {
      res += `от ${salaryFrom} `;
    }
    if (salaryTo) {
      res += `до ${salaryTo} `;
    }
    if (salaryCurrency) {
      res += `${salaryCurrency}`;
    }
    return <SalaryText>{res}</SalaryText>;
  };

  const optionsModalHover = (index) => {
    return {
      followCursor: true,
      shiftX: 20,
      shiftY: -index * 40,
    };
  };
  return (
    <List>
      {fullVacancies.map((item, index) => (
        <ListItem key={item.id}>
          <ReactHover options={optionsModalHover(index)}>
            <ReactHover.Trigger type="trigger">
              <NavLinkWrapper>
                <JobLink
                  href={`https://spb.hh.ru/vacancy/${item.id}`}
                  target="_blank"
                >
                  {item.name}
                </JobLink>
                <SubLinkWrapper>
                  {renderSalary(item.salary)}
                  <CompanyLink
                    href={handleEmptyData(item.employer, 'alternate_url')}
                    target="_blank"
                  >
                    Company: {handleEmptyData(item.employer, 'name')}
                  </CompanyLink>
                </SubLinkWrapper>
              </NavLinkWrapper>
            </ReactHover.Trigger>
            <ReactHover.Hover type="hover">
              <ModalVacancy item={item} />
            </ReactHover.Hover>
          </ReactHover>
        </ListItem>
      ))}
    </List>
  );
};
