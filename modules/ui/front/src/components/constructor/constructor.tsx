import * as React from 'react';
import { FC, useState } from 'react';
import { Actions } from './actions/actions';
import { ConstructorContext, ConstructorContextData } from './constructor.context';
import { Scheme } from './scheme/scheme';
import { NullableTgActionBase, TgActionBase } from '../../model/tg-action.base';
import { Container } from '@mui/material';

export interface ConstructorProps {
    actions: TgActionBase[];
}

const ConstructorComponent: FC<ConstructorProps> = (props) => {

    const [isEnableToChooseAction, setIsEnableToChooseAction] = useState<boolean>(false);

    const [selectedAction, setSelectedAction] = useState<NullableTgActionBase>(null);

    const handleChangeEnableToChooseAction = (value: boolean) => {
        setIsEnableToChooseAction(value);
    };

    const handleSelectAction = (action: NullableTgActionBase) => {
        setSelectedAction(action);
    }

    const ctxValue: ConstructorContextData = {
        actions: props.actions,
        isEnableToChooseAction: isEnableToChooseAction,
        changeEnableToChooseAction: handleChangeEnableToChooseAction,
        selectedAction: selectedAction,
        changeSelectAction: handleSelectAction
    };

    return (
        <ConstructorContext.Provider value={ctxValue}>
            <Container style={{ display: 'flex', width: '100%' }} maxWidth='xl'>
                <Actions />
                <Scheme />
            </Container>
        </ConstructorContext.Provider>
    );

};

export const Constructor = ConstructorComponent;
