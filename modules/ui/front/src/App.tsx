import React from 'react';
import {AuthPage, CreateNewBotPage, InformationAboutBotPage} from './pages';
import styled from 'styled-components';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {PathRouter} from './utils/route.utils';
import {AppStore} from "./store/app.store";
import {AppApi} from "./api/app.api";
import {AppContext} from "./context/app.context";

const {bots, createBot} = PathRouter;

const Container = styled.div`
  height: 100%;
`;

const appStore = new AppStore();
const appApi = new AppApi(appStore);

function App() {
    return (
        <React.StrictMode>
            <AppContext.Provider value={{store: appStore, api: appApi}}>
                <BrowserRouter>
                    <Container>
                        <Routes>
                            <Route path='/' element={<AuthPage/>}/>
                            <Route path={createBot} element={<CreateNewBotPage/>}/>
                            <Route path={`${bots}/:name`} element={<InformationAboutBotPage/>}/>
                        </Routes>
                    </Container>
                </BrowserRouter>
            </AppContext.Provider>
        </React.StrictMode>
    );
}

export default App;
