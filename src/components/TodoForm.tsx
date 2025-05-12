import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { Todo } from '../types';
import { todoService } from '../services/api';
import { useQueryClient } from '@tanstack/react-query';

interface TodoFormProps {
  todo?: Todo;
  onClose: () => void;
}

export const TodoForm = ({ todo, onClose }: TodoFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const queryClient = useQueryClient();
  const toast = useToast();

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description || '');
    }
  }, [todo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (todo) {
        await todoService.update(todo.id, { title, description });
        toast({
          title: 'Todo berhasil diperbarui',
          status: 'success',
          duration: 2000,
        });
      } else {
        await todoService.create({ title, description });
        toast({
          title: 'Todo berhasil dibuat',
          status: 'success',
          duration: 2000,
        });
      }
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      onClose();
    } catch (error) {
      console.log(error);
      toast({
        title: 'Terjadi kesalahan',
        status: 'error',
        duration: 2000,
      });
    }
  };

  return (
    <Box p={4}>
      <form onSubmit={handleSubmit}>
        <VStack gap={4}>
          <FormControl isRequired>
            <FormLabel>Judul</FormLabel>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Masukkan judul todo"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Deskripsi</FormLabel>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Masukkan deskripsi todo (opsional)"
            />
          </FormControl>
          <Button type="submit" colorScheme="blue" width="full">
            {todo ? 'Update Todo' : 'Buat Todo'}
          </Button>
        </VStack>
      </form>
    </Box>
  );
}; 