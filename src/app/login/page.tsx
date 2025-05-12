'use client';

import { Box, Container, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { LoginForm } from '../../components/LoginForm';

export default function LoginPage() {
  return (
    <Container maxW="container.xl" py={10}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <LoginForm />
        <Text mt={4}>
          Belum punya akun?{' '}
          <Link as={NextLink} href="/register" color="blue.500">
            Daftar di sini
          </Link>
        </Text>
      </Box>
    </Container>
  );
} 