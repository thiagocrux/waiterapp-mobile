import { useState } from 'react';
import { Modal, Platform, TouchableOpacity } from 'react-native';

import { Button, Close, Text } from '../../components';

import { Form, Header, Input, ModalBody, Overlay } from './styles';

interface TableModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSave: (table: string) => void;
}

export function TableModal({ isVisible, onClose, onSave }: TableModalProps) {
  const [table, setTable] = useState('');

  function handleSave() {
    onSave(table);
    onClose();
    setTable('');
  }

  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <Overlay behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
        <ModalBody>
          <Header>
            <Text weight="600">Informe a mesa</Text>
            <TouchableOpacity onPress={onClose}>
              <Close color="#666" />
            </TouchableOpacity>
          </Header>
          <Form>
            <Input
              placeholder="Número da mesa"
              placeholderTextColor="#666"
              keyboardType="number-pad"
              onChangeText={setTable}
            />
            <Button disabled={table.length === 0} onPress={handleSave}>
              Salvar
            </Button>
          </Form>
        </ModalBody>
      </Overlay>
    </Modal>
  );
}
