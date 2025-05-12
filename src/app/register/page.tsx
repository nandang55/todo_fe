'use client';

import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
  Text,
  Link,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();
  const router = useRouter();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({ name, email, password });
      toast({
        title: 'Registrasi berhasil',
        status: 'success',
        duration: 2000,
      });
      router.push('/');
    } catch (error) {
      console.log(error);
      toast({
        title: 'Registrasi gagal',
        description: 'Email sudah terdaftar',
        status: 'error',
        duration: 2000,
      });
    }
  };

  return (
    <Container maxW="container.sm" py={20}>
      <Box
        p={8}
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        bg="white"
      >
        <VStack spacing={6}>
          <Heading>Daftar</Heading>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Nama</FormLabel>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan nama"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Masukkan email"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                />
              </FormControl>
              <Button type="submit" colorScheme="blue" width="full">
                Daftar
              </Button>
            </VStack>
          </form>
          <Text>
            Sudah punya akun?{' '}
            <Link color="blue.500" href="/">
              Login di sini
            </Link>
          </Text>
        </VStack>
      </Box>
    </Container>
  );
} 