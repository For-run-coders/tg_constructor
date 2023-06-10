import React from 'react';
import styled from 'styled-components';
import { Button, Input } from '@mui/material';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div``;

const AuthPage = () => {
  return (
    <Container>
      <Content>
        <div>Введите имя бота</div>

        <Input />

        <Button>Вход</Button>

        <Button>Создать нового бота</Button>
      </Content>
    </Container>
  );
};

export default AuthPage;
