import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Bounce from 'react-reveal/Bounce';

import { HomeMenu } from './HomeMenu';

const StyledBurger = styled.div`
  position: absolute;
  top: 36px;
  left: 36px;
  z-index: 10;
  display: flex;
  justify-content: space-around;
  flex-flow: column nowrap;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  overflow-x: hidden !important;

  div {
    width: 2rem;
    height: 0.25rem;
    background-color: ${({ open }) => (open ? '#65a7f3' : '#e64268')};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;
    &:nth-child(1) {
      transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0)')};
    }
    &:nth-child(2) {
      transform: ${({ open }) => (open ? 'translateX(100%)' : 'translateX(0)')};
      opacity: ${({ open }) => (open ? 0 : 1)};
    }
    &:nth-child(3) {
      transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }

  &:hover * {
    background-color: #65a7f3;
  }
`;

const WrapperMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 500px;
  height: 100%;
`;

export const BurgerButton = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <StyledBurger open={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </StyledBurger>
      <WrapperMenu>
        <Bounce right when={open}>
          <HomeMenu />
        </Bounce>
      </WrapperMenu>
    </>
  );
};
