import { ReactNode } from 'react';
import { ActivityIndicator } from 'react-native';

import { Text } from '../../components';

import { Container } from './styles';

interface ButtonProps {
  children: ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
  onPress: () => void;
}

export function Button({
  children,
  disabled,
  isLoading,
  onPress,
}: ButtonProps) {
  return (
    <Container disabled={disabled || isLoading} onPress={onPress}>
      {!isLoading && (
        <Text weight="600" color="#ffffff">
          {children}
        </Text>
      )}

      {isLoading && <ActivityIndicator color="#fff" />}
    </Container>
  );
}
