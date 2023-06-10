import * as React from 'react';
import { FC, useState } from 'react';
import { Actions } from './actions/actions';
import { ConstructorContext, ConstructorContextData } from './constructor.context';
import { Scheme } from './scheme/scheme';
import { ActionBase } from '../../model/action.base';
import { Container } from '@mui/material';

export interface ConstructorProps {
    actions: ActionBase[];
}

const ConstructorComponent: FC<ConstructorProps> = (props) => {

    const [isEnableToChooseAction, setIsEnableToChooseAction] = useState<boolean>(false);

    const changeEnableToChooseAction = (value: boolean) => {
        setIsEnableToChooseAction(value);
    };

    const ctxValue: ConstructorContextData = {
        actions: props.actions,
        isEnableToChooseAction: isEnableToChooseAction,
        changeEnableToChooseAction: changeEnableToChooseAction,
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
