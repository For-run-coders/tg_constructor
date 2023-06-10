import * as React from "react";
import {FC, useContext} from "react";
import {Box, List, ListItem, ListItemText} from "@mui/material";
import {ConstructorContext} from "../constructor.context";

export interface ActionsProps {
}

const ActionsComponent: FC<ActionsProps> = (props) => {

    const ctx = useContext(ConstructorContext);

    return (
        <Box component="div" sx={{p: 2, border: '1px dashed grey'}}>
            <List sx={{width: '100%', height: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                {
                    ctx.actions.map((action) => (
                        <ListItem>
                            <ListItemText primary={action.name} secondary={action.description}/>
                        </ListItem>
                    ))
                }
            </List>
        </Box>
    );

}

export const Actions = ActionsComponent;
