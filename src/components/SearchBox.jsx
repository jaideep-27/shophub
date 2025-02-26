import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, fetchProductsByCategory, fetchProducts } from '../store/productsSlice';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 0 1rem;

  @media (max-width: 768px) {
    margin: 0 0.5rem;
    max-width: none;
  }
`;

const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 2.5rem;
  border: 2px solid ${props => props.isOpen ? '#3498db' : '#e1e1e1'};
  border-radius: 12px;
  font-size: 1rem;
  background-color: white;
  transition: all 0.3s ease;
  box-shadow: ${props => props.isOpen ? '0 4px 20px rgba(52, 152, 219, 0.1)' : 'none'};

  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 4px 20px rgba(52, 152, 219, 0.1);
  }

  &::placeholder {
    color: #95a5a6;
  }

  @media (max-width: 768px) {
    padding: 0.6rem 2.5rem;
    font-size: 0.9rem;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.isOpen ? '#3498db' : '#95a5a6'};
  transition: color 0.3s ease;
`;

const ClearButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #95a5a6;
  padding: 4px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background-color: #f0f2f5;
    color: #e74c3c;
  }
`;

const DropdownList = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-height: 300px;
  overflow-y: auto;
  display: ${props => props.isOpen ? 'block' : 'none'};
  animation: ${fadeIn} 0.3s ease;
  border: 1px solid #e1e1e1;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 4px;
  }
`;

const CategoryOption = styled.div`
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #2c3e50;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 3px;
    background-color: #3498db;
    transform: scaleY(0);
    transition: transform 0.3s ease;
  }

  &:hover {
    background-color: #f8fafb;
    padding-left: 1.5rem;

    &:before {
      transform: scaleY(1);
    }
  }

  ${props => props.isSelected && `
    background-color: #ebf5fe;
    color: #3498db;
    font-weight: 500;
    padding-left: 1.5rem;

    &:before {
      transform: scaleY(1);
    }
  `}

  &:first-child {
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }

  &:last-child {
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
  }

  @media (max-width: 768px) {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }
`;

const NoResults = styled.div`
  padding: 1rem;
  text-align: center;
  color: #95a5a6;
  font-size: 0.9rem;
`;

const SearchBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const containerRef = useRef(null);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.products.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSearchTerm(category ? category.charAt(0).toUpperCase() + category.slice(1) : '');
    setIsOpen(false);
    
    if (!category) {
      dispatch(fetchProducts());
    } else {
      dispatch(fetchProductsByCategory(category));
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSelectedCategory('');
    dispatch(fetchProducts());
  };

  const filteredCategories = categories.filter(category => 
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SearchContainer ref={containerRef}>
      <SearchWrapper>
        <SearchIcon isOpen={isOpen}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </SearchIcon>
        <SearchInput
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={handleInputFocus}
          isOpen={isOpen}
        />
        {searchTerm && (
          <ClearButton onClick={clearSearch}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </ClearButton>
        )}
      </SearchWrapper>
      <DropdownList isOpen={isOpen}>
        <CategoryOption 
          onClick={() => handleCategorySelect('')}
          isSelected={selectedCategory === ''}
        >
          All Categories
        </CategoryOption>
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <CategoryOption
              key={category}
              onClick={() => handleCategorySelect(category)}
              isSelected={selectedCategory === category}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </CategoryOption>
          ))
        ) : (
          <NoResults>No categories found</NoResults>
        )}
      </DropdownList>
    </SearchContainer>
  );
};

export default SearchBox; 