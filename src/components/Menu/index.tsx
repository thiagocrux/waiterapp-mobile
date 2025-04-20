import { FlatList } from 'react-native';

import { PlusCircle, Text } from '../../components';
import { products } from '../../mocks';
import { formatCurrency } from '../../utils';

import {
  AddToCartButton,
  Image,
  Product,
  ProductDetails,
  Separator,
} from './styles';

export function Menu() {
  return (
    <FlatList
      data={products}
      keyExtractor={(product) => product._id}
      ItemSeparatorComponent={Separator}
      renderItem={({ item: product }) => (
        <Product>
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
          <AddToCartButton>
            <PlusCircle />
          </AddToCartButton>
        </Product>
      )}
      style={{ marginTop: 32 }}
      contentContainerStyle={{ paddingHorizontal: 24 }}
    />
  );
}
