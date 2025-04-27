import { useState } from 'react';
import { FlatList } from 'react-native';

import { PlusCircle, ProductModal, Text } from '../../components';
import { Product } from '../../types';
import { formatCurrency } from '../../utils';

import {
  AddToCartButton,
  Image,
  ProductContainer,
  ProductDetails,
  Separator,
} from './styles';

interface MenuProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export function Menu({ products, onAddToCart }: MenuProps) {
  const [isProductModalVisible, setProductModalVisibility] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  function handleModalOpening(product: Product) {
    setProductModalVisibility(true);
    setSelectedProduct(product);
  }

  return (
    <>
      <ProductModal
        isVisible={isProductModalVisible}
        product={selectedProduct}
        onClose={() => setProductModalVisibility(false)}
        onAddToCart={onAddToCart}
      />
      <FlatList
        data={products}
        keyExtractor={(product) => product._id}
        ItemSeparatorComponent={Separator}
        renderItem={({ item: product }) => (
          <ProductContainer onPress={() => handleModalOpening(product)}>
            <Image
              source={{
                uri: product.imagePath,
              }}
            />
            <ProductDetails>
              <Text weight="600">{product.name}</Text>
              <Text size={14} color="#666" style={{ marginVertical: 8 }}>
                {product.description}
              </Text>
              <Text size={14} weight="600">
                {formatCurrency(product.price)}
              </Text>
            </ProductDetails>
            <AddToCartButton onPress={() => onAddToCart(product)}>
              <PlusCircle />
            </AddToCartButton>
          </ProductContainer>
        )}
        style={{ marginTop: 32 }}
        contentContainerStyle={{ paddingHorizontal: 24 }}
      />
    </>
  );
}
