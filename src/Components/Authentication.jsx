import { Button, Container, MantineProvider, Paper, PasswordInput, Space, TextInput, Text, Alert } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { IconInfoCircle } from '@tabler/icons-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const icon = <IconInfoCircle />;

  const handleLogin = () => {
    if (username === 'admin' && password === '123456') {
      navigate('/Home');
    } else {
      <Alert variant="light" color="blue" withCloseButton title="Usuario o Contraseña Incorrectas" icon={icon}>
        User = admin         Pwd = 123456
      </Alert>
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
            Ingresar
          </Button>
        </Paper>
      </Container>
    </MantineProvider>
  );
}
