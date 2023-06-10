import * as React from "react";
import {FC} from "react";
import {Actions} from "./actions/actions";
import {ConstructorContext, ConstructorContextData} from "./constructor.context";
import {Scheme} from "./scheme/scheme";
import {ActionBase} from "../../model/action.base";
import {Container} from "@mui/material";

export interface ConstructorProps {
    actions: ActionBase[];
}

const ConstructorComponent: FC<ConstructorProps> = (props) => {

    const ctxValue: ConstructorContextData = {
        actions: props.actions
    };

    return (
        <ConstructorContext.Provider value={ctxValue}>
            <Container maxWidth='xl'>
                <Actions/>
                <Scheme/>
            </Container>
        </ConstructorContext.Provider>
    );

}

export const Constructor = ConstructorComponent;
