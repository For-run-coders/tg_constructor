import * as React from "react";
import {FC, useState} from "react";
import {Box, Button} from "@mui/material";
import {ActionBase} from "../../../model/action.base";
import {UuidUtil} from "../../../utils/UuidUtil";

export interface SchemeProps {

}

const SchemeComponent: FC<SchemeProps> = (props) => {

    const [actions, setActions] = useState<ActionBase[]>([]);

    const handleCreateAction = () => {

    }

    return (
        <Box component="div" sx={{p: 2, border: '1px dashed grey', width: '100%'}}>
            <Button onClick={handleCreateAction}>
                +
            </Button>
        </Box>
    );

}

export const Scheme = SchemeComponent;
