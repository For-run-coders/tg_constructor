import * as React from 'react';
import { FC, useContext } from 'react';
import { Box, List, ListItemButton, ListItemText } from '@mui/material';
import { ConstructorContext } from '../constructor.context';
import { TgActionBase } from '../../../model/tg-action.base';

export interface ActionsProps {
}

const ActionsComponent: FC<ActionsProps> = (props) => {

    const ctx = useContext(ConstructorContext);

    const actionsMap = ctx.actions.reduce(
        (prev: Map<string, TgActionBase>, item: TgActionBase) => {
            prev.set(item.name, item);
            return prev;
        },
        new Map<string, TgActionBase>()
    )

    const handleActionClick = (actionId: string) => () => {
        if (ctx.isEnableToChooseAction) {
            const selectedAction = actionsMap.get(actionId);
            if (selectedAction) {
                ctx.changeSelectAction(selectedAction);
            }
        }
    }

    return (
        <Box component='div' sx={{ p: 2, border: '1px dashed grey' }}>
            <List sx={{ width: '100%', height: '100%', maxWidth: 360}}>
                {
                    ctx.actions.map((action) => (
                        <ListItemButton onClick={handleActionClick(action.name)}>
                            <ListItemText primary={action.name} secondary={action.description} />
                        </ListItemButton>
                    ))
                }
            </List>
        </Box>
    );

};

export const Actions = ActionsComponent;
