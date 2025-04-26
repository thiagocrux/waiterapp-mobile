import { useState } from 'react';

import {
  Button,
  Cart,
  Categories,
  Header,
  Menu,
  TableModal,
} from '../components';

import { CartItem } from '../types';

import {
  CategoriesContainer,
  Container,
  Footer,
  FooterContainer,
  MenuContainer,
} from './styles';

export function Main() {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([
    // {
    //   quantity: 1,
    //   product: products[0],
    // },
    // {
    //   quantity: 2,
    //   product: products[1],
    // },
  ]);

  function handleTableSaving(table: string) {
    setSelectedTable(table);
  }

  function handleOrderCancellation() {
    setSelectedTable('');
  }

  return (
    <>
      <Container>
        <Header
          selectedTable={selectedTable}
          onOrderCancellation={handleOrderCancellation}
        />
        <CategoriesContainer>
          <Categories />
        </CategoriesContainer>
        <MenuContainer>
          <Menu />
        </MenuContainer>
      </Container>
      <Footer>
        <FooterContainer>
          {!selectedTable && (
            <Button onPress={() => setIsTableModalVisible(true)}>
              Novo pedido
            </Button>
          )}
          {selectedTable && <Cart cartItems={cartItems} />}
        </FooterContainer>
      </Footer>
      <TableModal
        isVisible={isTableModalVisible}
        onClose={() => setIsTableModalVisible(false)}
        onSave={handleTableSaving}
      />
    </>
  );
}
