import './Login.css';
import '@mantine/core/styles.css';
import { Button, Container, MantineProvider, Paper, PasswordInput, Space, TextInput, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'admin@gmail.com' && password === '123456') {
      navigate('/Home');
    } else {
      alert('User: admin@gmail.com --- Pwd: 123456');
    }
  };

  return (
    <MantineProvider>
      <Text size="xl">LogIn</Text>
      <Space h="md" />
      <Container>
        <Paper p="xl" withBorder>
          <TextInput
            placeholder="Usuario"
            value={username}
            onChange={(event) => setUsername(event.currentTarget.value)}
          />
          <Space h="md" />
          <PasswordInput
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
          <Space h="md" />
          <Button variant="filled" size="md" color="blue" fullWidth onClick={handleLogin}>
            Login
          </Button>
        </Paper>
      </Container>
    </MantineProvider>
  );
}
