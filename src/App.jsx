import React, { useState } from 'react';
import { Provider } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import { store } from './store/store';
import Header from './components/Header.jsx';
import ProductList from './components/ProductList.jsx';
import ProductModal from './components/ProductModal.jsx';
import GlobalStyles from './styles/GlobalStyles';
import theme from './styles/theme';
import { CartProvider } from './context/CartContext';

const AppContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`;

const MainContent = styled.main`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 ${({ theme }) => theme.spacing.md};
  }
`;

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <CartProvider>
          <GlobalStyles />
          <AppContainer>
            <Header />
            <MainContent>
              <ProductList onProductClick={setSelectedProduct} />
              {selectedProduct && (
                <ProductModal 
                  product={selectedProduct} 
                  onClose={() => setSelectedProduct(null)} 
                />
              )}
            </MainContent>
          </AppContainer>
        </CartProvider>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
