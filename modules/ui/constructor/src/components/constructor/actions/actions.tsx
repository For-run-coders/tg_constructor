import * as React from "react";
import {FC, useContext} from "react";
import {List, ListItem, ListItemText} from "@mui/material";
import {ConstructorContext} from "../constructor.context";

export interface ActionsProps {
}

const ActionsComponent: FC<ActionsProps> = (props) => {

    const ctx = useContext(ConstructorContext);

    return (
        <List sx={{width: '100%', height: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
            {
                ctx.actions.map((action) => (
                    <ListItem>
                        <ListItemText primary={action.name} secondary={action.description}/>
                    </ListItem>
                ))
            }
        </List>
    );

}

export const Actions = ActionsComponent;
