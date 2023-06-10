import React from 'react';
import { AuthPage, CreateNewBotPage, InformationAboutBotPage } from './pages';
import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import { PathRouter } from './utils/utils';

const { informationAboutBot, createNewBot } = PathRouter;

const Container = styled.div`
  height: 100%;
`;

function App() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path={createNewBot} element={<CreateNewBotPage />} />
        <Route path={`${informationAboutBot}/:name`} element={<InformationAboutBotPage />} />
      </Routes>
    </Container>
  );
}

export default App;
