import * as React from 'react';
import { FC, useContext, useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { TgActionBase, TgActionField } from '../../../model/tg-action.base';
import { ConstructorContext } from '../constructor.context';
import { TgActionRequest } from '../../../model/tg-action.request';
import { UuidUtils } from '../../../utils/uuid.utils';
import { ActionPanel } from './action-panel';

export interface SchemeProps {

}

const SchemeComponent: FC<SchemeProps> = (props) => {

    const ctx = useContext(ConstructorContext);

    const [currentActions, setCurrentActions] = useState<TgActionRequest[]>([]);

    const makeRequestAction = (action: TgActionBase): TgActionRequest => {
        return {
            id: UuidUtils.getNewUuid(),
            name: action.name,
            fields: [
                ...action.fields.map((field: TgActionField) => ({
                    ...field,
                    value: '',
                })),
                {
                    name: 'Next action ID',
                    description: 'Указатель на следующее действие',
                    type: 'STRING',
                    value: '',
                },
            ],
        };
    };

    useEffect(() => {
        const selectedAction = ctx.selectedAction;
        if (selectedAction !== null) {
            setCurrentActions(prevState => [
                ...prevState,
                makeRequestAction(selectedAction),
            ]);
            ctx.changeSelectAction(null);
            ctx.changeEnableToChooseAction(false);
        }
    }, [ctx.selectedAction]);

    const handleCreateAction = () => {
        ctx.changeEnableToChooseAction(true);
    };

    const handleChangeAction = (newAction: TgActionRequest) => {
        const newActions = [...currentActions].map((action) => {
            if (action.name === newAction.name) {
                return newAction;
            }
            return action;
        });
        setCurrentActions(newActions);
    };

    const sendConfig = async () => {
        await fetch('http://127.0.0.1:8080/create-bot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                actions: currentActions
            })
        })
    }

    return (
        <Box component='div' sx={{ border: '1px dashed grey', width: '100%' }}>
            <Box component='div' sx={{pl:2, pt: 2, pb: 2, width: '100%' }}>
                {
                    currentActions.map(action => {
                        return (
                            <ActionPanel
                                action={action}
                                onChangeAction={handleChangeAction}
                            />
                        );
                    })
                }
                <Button onClick={handleCreateAction} variant='outlined'>
                    +
                </Button>
            </Box>
            <Box component='div' sx={{ p: 2}}>
                <Button onClick={sendConfig} variant='outlined'>
                    Send config
                </Button>
            </Box>
        </Box>
    );

};

export const Scheme = SchemeComponent;
