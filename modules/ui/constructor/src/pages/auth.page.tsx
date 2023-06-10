import React from 'react';
import styled from 'styled-components';
import { Button, Input, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { PathRouter } from '../utils/utils';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const { informationAboutBot, createNewBot } = PathRouter;

const AuthPage = () => {
  return (
    <Container>
      <Content>
        <Typography textAlign="center">Введите имя бота</Typography>

        <Input />

        <Link to={`${informationAboutBot}/test`}>Вход</Link>

        <Link to={createNewBot}>Создать нового бота</Link>
      </Content>
    </Container>
  );
};

export default AuthPage;
