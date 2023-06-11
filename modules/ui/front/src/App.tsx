import React from 'react';
import { AuthPage, CreateNewBotPage, InformationAboutBotPage } from './pages';
import styled from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PathRouter } from './utils/route.utils';

const { bots, createBot } = PathRouter;

const Container = styled.div`
  height: 100%;
`;

function App() {
    return (
        <React.StrictMode>
            <BrowserRouter>
                <Container>
                    <Routes>
                        <Route path='/' element={<AuthPage />} />
                        <Route path={createBot} element={<CreateNewBotPage />} />
                        <Route path={`${bots}/:name`} element={<InformationAboutBotPage />} />
                    </Routes>
                </Container>
            </BrowserRouter>
        </React.StrictMode>
    );
}

export default App;
