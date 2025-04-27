import { useState } from 'react';
import { ActivityIndicator } from 'react-native';

import {
  Button,
  Cart,
  Categories,
  Header,
  Menu,
  TableModal,
} from '../components';

import { CartItem, Product } from '../types';

import {
  CategoriesContainer,
  CenteredContainer,
  Container,
  Footer,
  FooterContainer,
  MenuContainer,
} from './styles';

export function Main() {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleTableSelection(table: string) {
    setSelectedTable(table);
  }

  function handleOrderReset() {
    setSelectedTable('');
    setCartItems([]);
  }

  function incrementCartItem(product: Product) {
    if (!selectedTable) {
      setIsTableModalVisible(true);
    }

    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex(
        (item) => item.product._id === product._id
      );

      if (itemIndex < 0) {
        return prevState.concat({ product, quantity: 1 });
      }

      const newCartItems = [...prevState];
      const itemToModify = newCartItems[itemIndex];

      newCartItems[itemIndex] = {
        ...itemToModify,
        quantity: itemToModify.quantity + 1,
      };

      return newCartItems;
    });
  }

  function decreaseCartItem(product: Product) {
    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex(
        (item) => item.product._id === product._id
      );

      const newCartItems = [...prevState];
      const itemToModify = prevState[itemIndex];

      if (itemToModify.quantity === 1) {
        newCartItems.splice(itemIndex, 1);
        return newCartItems;
      }

      newCartItems[itemIndex] = {
        ...itemToModify,
        quantity: itemToModify.quantity - 1,
      };

      return newCartItems;
    });
  }

  return (
    <>
      <Container>
        <Header
          selectedTable={selectedTable}
          onOrderCancellation={handleOrderReset}
        />
        {isLoading && (
          <CenteredContainer>
            <ActivityIndicator color="#d73035" size="large" />
          </CenteredContainer>
        )}
        {!isLoading && (
          <>
            <CategoriesContainer>
              <Categories />
            </CategoriesContainer>
            <MenuContainer>
              <Menu onAddToCart={incrementCartItem} />
            </MenuContainer>
          </>
        )}
      </Container>
      <Footer>
        <FooterContainer>
          {!selectedTable && (
            <Button
              onPress={() => setIsTableModalVisible(true)}
              disabled={isLoading}
            >
              Novo pedido
            </Button>
          )}
          {selectedTable && (
            <Cart
              cartItems={cartItems}
              onAddToCart={incrementCartItem}
              onDecreaseFromCart={decreaseCartItem}
              onConfirmOrder={handleOrderReset}
            />
          )}
        </FooterContainer>
      </Footer>
      <TableModal
        isVisible={isTableModalVisible}
        onClose={() => setIsTableModalVisible(false)}
        onSave={handleTableSelection}
      />
    </>
  );
}
