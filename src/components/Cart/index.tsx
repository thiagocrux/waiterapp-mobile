import { FlatList, TouchableOpacity } from 'react-native';

import {
  Button,
  MinusCircle,
  OrderConfirmedModal,
  PlusCircle,
  Text,
} from '../../components';
import { CartItem, Product } from '../../types';

import { formatCurrency } from '../../utils';

import { useState } from 'react';
import {
  Actions,
  Image,
  Item,
  ProductContainer,
  ProductDetails,
  QuantityContainer,
  Summary,
  TotalContainer,
} from './styles';

interface CartProps {
  cartItems: CartItem[];
  onAddToCart: (product: Product) => void;
  onDecreaseFromCart: (product: Product) => void;
  onConfirmOrder: () => void;
}

export function Cart({
  cartItems,
  onAddToCart,
  onDecreaseFromCart,
  onConfirmOrder,
}: CartProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const cartHasItems = cartItems.length > 0;

  function getTotalPrice() {
    return cartItems.reduce((total, cartItem) => {
      return total + cartItem.product.price * cartItem.quantity;
    }, 0);
  }

  function handleOrderConfirmation() {
    setIsModalVisible(true);
  }

  function handleOk() {
    onConfirmOrder();
    setIsModalVisible(false);
  }

  return (
    <>
      <OrderConfirmedModal isVisible={isModalVisible} onOk={handleOk} />
      {cartHasItems && (
        <FlatList
          data={cartItems}
          keyExtractor={(cartItem) => cartItem.product._id}
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 20, maxHeight: 150 }}
          renderItem={({ item: cartItem }) => (
            <Item>
              <ProductContainer>
                <Image
                  source={{ uri: 'https://i.ibb.co/8nPZLXPC/afebda533a14.png' }}
                />
                <QuantityContainer>
                  <Text size={14} color="#666">
                    {cartItem.quantity}x
                  </Text>
                </QuantityContainer>
                <ProductDetails>
                  <Text size={14} weight="600">
                    {cartItem.product.name}
                  </Text>

                  <Text size={14} color="#666">
                    {formatCurrency(cartItem.product.price)}
                  </Text>
                </ProductDetails>
              </ProductContainer>
              <Actions>
                <TouchableOpacity
                  onPress={() => onDecreaseFromCart(cartItem.product)}
                >
                  <MinusCircle />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onAddToCart(cartItem.product)}>
                  <PlusCircle />
                </TouchableOpacity>
              </Actions>
            </Item>
          )}
        />
      )}
      <Summary>
        <TotalContainer>
          {cartHasItems ? (
            <>
              <Text color="#666">Total</Text>
              <Text size={20} weight="600">
                {formatCurrency(getTotalPrice())}
              </Text>
            </>
          ) : (
            <Text color="#999">Seu carrinho está vazio!</Text>
          )}
        </TotalContainer>
        <Button
          disabled={!cartHasItems}
          isLoading={isLoading}
          onPress={handleOrderConfirmation}
        >
          Confirmar pedido
        </Button>
      </Summary>
    </>
  );
}
