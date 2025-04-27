import { Modal } from 'react-native';

import { CheckCircle, Text } from '../../components';

import { Container, OkButton } from './styles';

interface OrderConfirmedModalProps {
  isVisible: boolean;
  onOk: () => void;
}

export function OrderConfirmedModal({
  isVisible,
  onOk,
}: OrderConfirmedModalProps) {
  if (!isVisible) {
    return null;
  }

  return (
    <Modal visible={isVisible} animationType="fade">
      <Container>
        <CheckCircle />
        <Text size={20} weight="600" color="#fff" style={{ marginTop: 12 }}>
          Pedido confirmado
        </Text>
        <Text color="#fff" opacity={0.9} style={{ marginTop: 4 }}>
          O pedido já entrou na fila de produção!
        </Text>
        <OkButton onPress={onOk}>
          <Text weight="600" color="#d73035">
            Ok
          </Text>
        </OkButton>
      </Container>
    </Modal>
  );
}
