import * as React from "react";
import {FC, useState} from "react";
import {Box} from "@mui/material";

export interface SchemeProps {

}

const SchemeComponent: FC<SchemeProps> = (props) => {

    const [] = useState();

    return (
        <Box component="div" sx={{p: 2, border: '1px dashed grey'}}>
            lol
        </Box>
    );

}

export const Scheme = SchemeComponent;
