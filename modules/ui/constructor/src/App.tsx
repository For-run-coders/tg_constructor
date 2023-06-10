import React from 'react';
import { AuthPage, CreateNewBotPage } from './pages';
import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';

const Container = styled.div`
  height: 100%;
`;

function App() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<AuthPage />} />
      </Routes>
    </Container>
  );
}

export default App;
