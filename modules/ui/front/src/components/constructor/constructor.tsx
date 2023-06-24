import * as React from 'react';
import { FC, useState } from 'react';
import 'reactflow/dist/style.css';
import { NullableTgActionBase, TgActionBase } from '../../model/tg-action.base';
import { ConstructorContext, ConstructorContextData } from './constructor.context';
import { WorkingField } from './working-field/working-field';
import { ReactFlowProvider } from 'reactflow';
import { TgActionRequest } from '../../model/tg-action.request';

export interface ConstructorProps {
    actions: TgActionBase[];
}

const ConstructorComponent: FC<ConstructorProps> = (props) => {

    const [selectedAction, setSelectedAction] = useState<NullableTgActionBase>(null);

    const [currentActions, setCurrentActions] = useState<TgActionRequest[]>([]);

    const handleSelectAction = (action: NullableTgActionBase) => {
        setSelectedAction(action);
    };

    const handleChangeAction = (newAction: TgActionRequest) => {
        setCurrentActions(prev => ([...prev].map((action) => {
            if (action.name === newAction.name) {
                return newAction;
            }
            return action;
        })));
    };

    const handleAddCurrentAction = (newAction: TgActionRequest) => {
        const ne = [...currentActions, newAction];
        setCurrentActions(ne);
    };

    const ctxValue: ConstructorContextData = {
        availableActions: props.actions,
        selectedAction: selectedAction,
        currentActions: currentActions,
        changeCurrentAction: handleChangeAction,
        changeSelectAction: handleSelectAction,
        addCurrentAction: handleAddCurrentAction
    };

    return (
        <ConstructorContext.Provider value={ctxValue}>
            <ReactFlowProvider>
                <WorkingField />
            </ReactFlowProvider>
        </ConstructorContext.Provider>
    );

};

export const Constructor = ConstructorComponent;
