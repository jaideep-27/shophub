import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Header from '../../../src/components/Header';
import ProductList from '../../../src/components/ProductList';
import ProductModal from '../../../src/components/ProductModal';

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <Provider store={store}>
      <div>
        <Header />
        <ProductList onProductClick={setSelectedProduct} />
        {selectedProduct && (
          <ProductModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
          />
        )}
      </div>
    </Provider>
  );
}

export default App; 