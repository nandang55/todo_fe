'use client';

import {
  Box,
  Button,
  Container,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Todo } from '../../types';
import { todoService } from '../../services/api';
import { TodoItem } from '../../components/TodoItem';
import { TodoForm } from '../../components/TodoForm';
import { useAuth } from '../../hooks/useAuth';

export default function TodoListPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTodo, setSelectedTodo] = useState<Todo | undefined>();
  const { logout } = useAuth();
  const toast = useToast();

  const { data: todos, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: todoService.getAll,
  });

  const handleEdit = (todo: Todo) => {
    setSelectedTodo(todo);
    onOpen();
  };

  const handleClose = () => {
    setSelectedTodo(undefined);
    onClose();
  };

  const handleLogout = () => {
    logout();
    toast({
      title: 'Berhasil logout',
      status: 'success',
      duration: 2000,
    });
  };

  return (
    <Container maxW="container.md" py={10}>
      <Box mb={8}>
        <Heading mb={4}>Todo List</Heading>
        <Button colorScheme="blue" onClick={onOpen} mr={4}>
          Tambah Todo
        </Button>
        <Button colorScheme="red" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      <VStack gap={4} align="stretch">
        {isLoading ? (
          <Box textAlign="center">Loading...</Box>
        ) : todos?.length === 0 ? (
          <Box textAlign="center">Belum ada todo</Box>
        ) : (
          todos?.map((todo: Todo) => (
            <TodoItem key={todo.id} todo={todo} onEdit={handleEdit} />
          ))
        )}
      </VStack>

      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {selectedTodo ? 'Edit Todo' : 'Tambah Todo'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TodoForm todo={selectedTodo} onClose={handleClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
} 