import * as React from 'react';
import { FC, useContext } from 'react';
import { Card, List, ListItemButton, ListItemText } from '@mui/material';
import { ConstructorContext } from '../constructor.context';
import { TgActionBase } from '../../../model/tg-action.base';

export interface ActionsProps {
}

const ActionsComponent: FC<ActionsProps> = (props) => {

    const ctx = useContext(ConstructorContext);

    const actionsMap = ctx.availableActions.reduce(
        (prev: Map<string, TgActionBase>, item: TgActionBase) => {
            prev.set(item.name, item);
            return prev;
        },
        new Map<string, TgActionBase>(),
    );

    const handleActionClick = (actionId: string) => (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        const selectedAction = actionsMap.get(actionId);
        if (selectedAction) {
            ctx.changeSelectAction(selectedAction);
        }
    };

    return (
        <Card>
            <List sx={{ width: '100%', height: '100%', maxWidth: 360 }}>
                {
                    ctx.availableActions.map((action) => (
                        <ListItemButton onClick={handleActionClick(action.name)} selected={ctx.selectedAction ? action.name === ctx.selectedAction.name : false}>
                            <ListItemText primary={action.name} secondary={action.description} />
                        </ListItemButton>
                    ))
                }
            </List>
        </Card>
    );

};

export const Actions = ActionsComponent;
