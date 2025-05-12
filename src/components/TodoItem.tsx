import {
  Box,
  Checkbox,
  IconButton,
  Text,
  HStack,
  useToast,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Todo } from '../types';
import { todoService } from '../services/api';
import { useQueryClient } from '@tanstack/react-query';

interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
}

export const TodoItem = ({ todo, onEdit }: TodoItemProps) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const handleToggleComplete = async () => {
    try {
      await todoService.update(todo.id, { completed: !todo.completed });
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast({
        title: 'Status todo diperbarui',
        status: 'success',
        duration: 2000,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: 'Gagal memperbarui status',
        status: 'error',
        duration: 2000,
      });
    }
  };

  const handleDelete = async () => {
    try {
      await todoService.delete(todo.id);
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast({
        title: 'Todo berhasil dihapus',
        status: 'success',
        duration: 2000,
      });
    } catch (error) {
      console.log("error", error);
      toast({
        title: 'Gagal menghapus todo',
        status: 'error',
        duration: 2000,
      });
    }
  };

  return (
    <Box
      p={4}
      borderWidth={1}
      borderRadius="md"
      bg="white"
      _hover={{ shadow: 'md' }}
      transition="all 0.2s"
    >
      <HStack justify="space-between">
        <HStack gap={4}>
          <Checkbox
            isChecked={todo.completed}
            onChange={handleToggleComplete}
            colorScheme="blue"
          />
          <Box>
            <Text
              fontSize="md"
              textDecoration={todo.completed ? 'line-through' : 'none'}
              color={todo.completed ? 'gray.500' : 'black'}
            >
              {todo.title}
            </Text>
            {todo.description && (
              <Text fontSize="sm" color="gray.500">
                {todo.description}
              </Text>
            )}
          </Box>
        </HStack>
        <HStack>
          <IconButton
            aria-label="Edit todo"
            icon={<EditIcon />}
            size="sm"
            onClick={() => onEdit(todo)}
          />
          <IconButton
            aria-label="Delete todo"
            icon={<DeleteIcon />}
            size="sm"
            colorScheme="red"
            onClick={handleDelete}
          />
        </HStack>
      </HStack>
    </Box>
  );
}; 