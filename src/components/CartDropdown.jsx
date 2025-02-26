import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, addToCart } from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 320px;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  box-shadow: 0 4px 20px ${({ theme }) => theme.colors.shadow};
  border: 1px solid ${({ theme }) => theme.colors.border};
  z-index: 1000;
  padding: 1rem;
  animation: ${slideIn} 0.3s ease;
  transform-origin: top right;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 280px;
    right: -8px;
  }
`;

const CartItem = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.2s ease;
  border-radius: 8px;
  margin: 0 -8px;
  
  &:hover {
    background: ${({ theme }) => theme.colors.background};
    transform: translateX(4px);
  }

  &:last-child {
    border-bottom: none;
  }
`;

const ItemImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
  border-radius: 8px;
  background: white;
`;

const ItemInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const ItemTitle = styled.h4`
  font-size: 0.9rem;
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ItemPrice = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
`;

const ItemQuantity = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
  opacity: 0.8;
  transition: opacity 0.2s;

  ${CartItem}:hover & {
    opacity: 1;
  }
`;

const QuantityButton = styled.button`
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Quantity = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const TotalText = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const TotalAmount = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;

const CheckoutButton = styled.button`
  width: 100%;
  padding: 12px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  margin-top: 1rem;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: ${({ theme }) => theme.colors.gradient.primary};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadow};
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 2rem 0;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const CartDropdown = ({ onClose }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleRemove = (item) => {
    dispatch(removeFromCart(item));
  };

  const handleCheckout = () => {
    onClose();
    navigate('/cart');
  };

  return (
    <Dropdown>
      {items.length > 0 ? (
        <>
          {items.map((item, index) => (
            <CartItem key={item.id} index={index}>
              <ItemImage src={item.image} alt={item.title} />
              <ItemInfo>
                <ItemTitle>{item.title}</ItemTitle>
                <ItemPrice>${(item.price * item.quantity).toFixed(2)}</ItemPrice>
                <ItemQuantity>
                  <QuantityButton onClick={() => handleRemove(item)}>-</QuantityButton>
                  <Quantity>{item.quantity}</Quantity>
                  <QuantityButton onClick={() => dispatch(addToCart(item))}>+</QuantityButton>
                </ItemQuantity>
              </ItemInfo>
            </CartItem>
          ))}
          <Total>
            <TotalText>Total</TotalText>
            <TotalAmount>${total.toFixed(2)}</TotalAmount>
          </Total>
          <CheckoutButton onClick={handleCheckout}>
            View Cart & Checkout
          </CheckoutButton>
        </>
      ) : (
        <EmptyCart>Your cart is empty</EmptyCart>
      )}
    </Dropdown>
  );
};

export default CartDropdown; 