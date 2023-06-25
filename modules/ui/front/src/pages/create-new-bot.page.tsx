import React, {useEffect, useState} from 'react';
import {Constructor} from '../components/constructor/constructor';
import {observer} from "mobx-react";
import {useAppContext} from "../context/app.context";

const CreateNewBotPage = observer(() => {

    const { api, store } = useAppContext();

    const [isLoading, setLoading] = useState<boolean>(false);

    const loadActions = async () => {
        setLoading(true);
        try {
             const result = await api.constructorApi.getActions();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadActions();
    }, []);


    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <Constructor actions={store.constructorStore.actions} />;
});

export default CreateNewBotPage;
