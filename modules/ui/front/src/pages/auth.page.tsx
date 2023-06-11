import React, { useState, useState } from 'react';
import styled from 'styled-components';
import { Button, Input, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { PathRouter } from '../utils/route.utils';
import { useObjectState } from '../hooks/object-state';

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

const { bots, createBot } = PathRouter;

interface Data {
    name: string;
}

const AuthPage = () => {

    const [data, setDataByKey] = useObjectState<Data>({
        name: '',
    });

    return (
        <Container>
            <Content>
                <Typography textAlign='center'>Введите имя бота</Typography>

                <Input
                    value={data.name}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setDataByKey('name', event.target.value);
                    }}
                />

                <Link to={`${bots}/${data.name}`}>Вход</Link>

                <Link to={createBot}>Создать нового бота</Link>
            </Content>
        </Container>
    );
};

export default AuthPage;
