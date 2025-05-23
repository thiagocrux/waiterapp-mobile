import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import {
  Button,
  Cart,
  Categories,
  Empty,
  Header,
  Menu,
  TableModal,
  Text,
} from '../components';

import { CartItem, Category, Product } from '../types';
import { api } from '../utils';

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
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  useEffect(() => {
    Promise.all([api.get('/categories'), api.get('/products')]).then(
      ([categoriesResponse, productsResponse]) => {
        setCategories(categoriesResponse.data);
        setProducts(productsResponse.data);
        setIsLoading(false);
      }
    );
  }, []);

  async function handleCategorySelection(categoryId: string) {
    const route = categoryId
      ? `/categories/${categoryId}/products`
      : '/products';

    setIsLoadingProducts(true);
    const { data } = await api.get(route);
    setProducts(data);
    setIsLoadingProducts(false);
  }

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
              <Categories
                categories={categories}
                onSelectCategory={handleCategorySelection}
              />
            </CategoriesContainer>
            {isLoadingProducts ? (
              <CenteredContainer>
                <ActivityIndicator color="#d73035" size="large" />
              </CenteredContainer>
            ) : (
              <>
                {products.length > 0 ? (
                  <MenuContainer>
                    <Menu onAddToCart={incrementCartItem} products={products} />
                  </MenuContainer>
                ) : (
                  <CenteredContainer>
                    <Empty />
                    <Text color="#666" style={{ marginTop: 24 }}>
                      Nenhum produto foi encontrado!
                    </Text>
                  </CenteredContainer>
                )}
              </>
            )}
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
              selectedTable={selectedTable}
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
