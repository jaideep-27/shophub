import React, { useState } from 'react';
import styled from 'styled-components';
import SearchBox from './SearchBox.jsx';
import { useCart } from '../context/CartContext';

const HeaderWrapper = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 2px 10px ${({ theme }) => theme.colors.shadow};
`;

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  padding: 1rem 2rem;
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: 1rem 1.5rem;
    gap: 1.5rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0.75rem 1rem;
    gap: 1rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0.5rem;
    gap: 0.5rem;
  }
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
  white-space: nowrap;
  font-weight: 700;
  letter-spacing: -0.5px;

  span {
    color: ${({ theme }) => theme.colors.text.primary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: 1.25rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.1rem;
  }
`;

const CartButton = styled.button`
  position: relative;
  background: none;
  border: none;
  font-size: 1.5rem;
  padding: 0.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
  transition: transform 0.2s;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.25rem;
    padding: 0.25rem;
  }
`;

const CartCount = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.accent};
  color: white;
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  transform: translate(25%, -25%);

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 0.7rem;
    padding: 0.2rem 0.4rem;
  }
`;

const Header = () => {
  const { cartCount } = useCart();

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <Logo>Shop<span>Hub</span></Logo>
        <SearchBox />
        <CartButton>
          🛒
          {cartCount > 0 && <CartCount>{cartCount}</CartCount>}
        </CartButton>
      </HeaderContainer>
    </HeaderWrapper>
  );
};

export default Header; 