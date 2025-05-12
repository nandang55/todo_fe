import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  useToast,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { login, loading, error } = useAuth();
  const toast = useToast();

  const validateForm = () => {
    let isValid = true;
    
    if (!email) {
      setEmailError('Email harus diisi');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Email tidak valid');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password harus diisi');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password minimal 6 karakter');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await login(email, password);
      toast({
        title: 'Login berhasil',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
      toast({
        title: 'Login gagal',
        description: error || 'Terjadi kesalahan',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <Text fontSize="2xl" fontWeight="bold">
            Login
          </Text>
          <FormControl isRequired isInvalid={!!emailError}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError('');
              }}
              placeholder="Masukkan email"
            />
            <FormErrorMessage>{emailError}</FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={!!passwordError}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError('');
              }}
              placeholder="Masukkan password"
            />
            <FormErrorMessage>{passwordError}</FormErrorMessage>
          </FormControl>
          <Button
            type="submit"
            colorScheme="blue"
            width="full"
            isLoading={loading}
          >
            Login
          </Button>
        </VStack>
      </form>
    </Box>
  );
}; 