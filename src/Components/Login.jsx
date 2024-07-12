import './Login.css';
import '@mantine/core/styles.css';
import { Button, Container, MantineProvider, Paper, PasswordInput, Space, TextInput, Text } from '@mantine/core';
import { useState } from 'react';

export default function App() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'Daniel' && password === '123456') {
      console.log('d');
    } else {
      console.log('Syntax Error');
    }
  };

  return (
    <>
      <MantineProvider>
        <Text size="xl">LogIn</Text>
        <Space h='md' />
        <Container>
          <Paper p="xl" withBorder>
            <TextInput
              // label="Username"
              placeholder="Usuario"
              value={username}
              onChange={(event) => setUsername(event.currentTarget.value)}
              // required
            />
            <Space h="md" />
            <PasswordInput
              // label="Password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
              // required
            />
            <Space h="md" />
            <Button variant="filled" size="md" color="blue" fullWidth onClick={handleLogin}>
              Login
            </Button>
          </Paper>
        </Container>
      </MantineProvider>
    </>
  );
}
