import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useDispatch } from 'react-redux';
import { useCart } from '../context/CartContext';
import Toast from './Toast';

const fadeInUp = keyframes`
  from { 
    opacity: 0;
    transform: translateY(15px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 16px;
  box-shadow: 0 4px 20px ${({ theme }) => theme.colors.shadow};
  padding: ${({ theme }) => theme.spacing.md};
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  animation: ${fadeInUp} 0.6s ease backwards;
  animation-delay: ${props => props.index * 0.1}s;
  border: 1px solid ${({ theme }) => theme.colors.border};

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 30px ${({ theme }) => theme.colors.shadow};
  }
`;

const ImageContainer = styled.div`
  position: relative;
  padding-top: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  overflow: hidden;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.2) 50%,
      transparent 100%
    );
    background-size: 200% 100%;
    animation: ${shimmer} 1.5s infinite;
    z-index: 1;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  ${Card}:hover &::before {
    opacity: 1;
  }
`;

const ProductImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: ${({ theme }) => theme.spacing.md};
  transition: transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
  mix-blend-mode: multiply;
  background: white;

  ${Card}:hover & {
    transform: scale(1.08);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: ${({ theme }) => theme.spacing.sm};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.xs};
  }
`;

const Badge = styled.span`
  position: absolute;
  top: ${({ theme }) => theme.spacing.sm};
  right: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.gradient.primary};
  color: ${({ theme }) => theme.colors.text.light};
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.2);
`;

const ProductTitle = styled.h3`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.5;
  flex-grow: 1;
  font-weight: 500;
  transition: color 0.3s ease;

  ${Card}:hover & {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: 0.9rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 0.85rem;
    -webkit-line-clamp: 2;
  }
`;

const ProductInfo = styled.div`
  margin-top: ${({ theme }) => theme.spacing.sm};
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Price = styled.p`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
  line-height: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: 1rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 0.9rem;
  }
`;

const OriginalPrice = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-decoration: line-through;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

const Stars = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

const Star = styled.span`
  color: ${props => props.filled ? '#FFA41C' : '#DDD'};
`;

const RatingCount = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.85rem;
`;

const AddToCartButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px;
  font-weight: 600;
  font-size: 0.9rem;
  width: 100%;
  transition: all 0.3s ease;
  margin-top: ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  &:hover {
    background: ${({ theme }) => theme.colors.gradient.primary};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadow};
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const PriceTag = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
`;

const DiscountBadge = styled.span`
  background: ${({ theme }) => theme.colors.error}15;
  color: ${({ theme }) => theme.colors.error};
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 600;
`;

const StarRating = ({ rating }) => {
  return (
    <Stars>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} filled={star <= Math.round(rating)}>
          ★
        </Star>
      ))}
    </Stars>
  );
};

const ProductCard = ({ product, onClick, index }) => {
  const { addToCart } = useCart();
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const hasDiscount = product.price < 100;
  const originalPrice = hasDiscount ? (product.price * 1.2).toFixed(2) : null;
  const discount = hasDiscount ? Math.round((1 - product.price / (product.price * 1.2)) * 100) : null;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <>
      <Card onClick={onClick} index={index}>
        <ImageContainer>
          <ProductImage src={product.image} alt={product.title} loading="lazy" />
          {discount && <Badge>{discount}% OFF</Badge>}
        </ImageContainer>
        <ProductTitle>{product.title}</ProductTitle>
        
        <RatingContainer>
          <StarRating rating={product.rating?.rate || 0} />
          <RatingCount>({product.rating?.count || 0})</RatingCount>
        </RatingContainer>

        <ProductInfo>
          <PriceContainer>
            <PriceTag>
              <Price>${product.price.toFixed(2)}</Price>
              {hasDiscount && <DiscountBadge>{discount}% off</DiscountBadge>}
            </PriceTag>
            {hasDiscount && <OriginalPrice>${originalPrice}</OriginalPrice>}
          </PriceContainer>
        </ProductInfo>

        <AddToCartButton onClick={handleAddToCart}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Add to Cart
        </AddToCartButton>
      </Card>
      {showToast && (
        <Toast message={`${product.title.slice(0, 20)}... added to cart!`} />
      )}
    </>
  );
};

export default ProductCard; 