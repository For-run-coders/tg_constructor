import React from 'react';
import { Constructor } from '../components/constructor/constructor';
import { TgActionBase } from '../model/tg-action.base';

const ACTIONS: TgActionBase[] = [
    {
        name: 'Button',
        description: 'Кнопка в телеграм боте',
        fields: [
            {
                name: 'Title',
                description: 'Заголовок кнопки',
                type: 'STRING',
            },
        ],
    },
    {
        name: 'Message',
        description: 'Отправка сообщения',
        fields: [
            {
                name: 'Message',
                description: 'Ответ бота',
                type: 'STRING',
            },
        ],
    },
];

const CreateNewBotPage = () => {
    return <Constructor actions={ACTIONS} />;
};

export default CreateNewBotPage;
