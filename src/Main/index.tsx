import { useState } from 'react';

import { Button, Categories, Header, Menu, TableModal } from '../components';

import {
  CategoriesContainer,
  Container,
  Footer,
  FooterContainer,
  MenuContainer,
} from './styles';

export function Main() {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('13');

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
