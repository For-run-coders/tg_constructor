import * as React from 'react';
import { ComponentType } from 'react';
import { Handle, Position } from 'reactflow';
import { Card } from '@mui/material';
import { TgActionRequest } from '../../../model/tg-action.request';
import { NodeProps } from '@reactflow/core/dist/esm/types/nodes';
import { ActionPanel } from './action-panel';

export interface ActionNodeProps {
    action: TgActionRequest;
}

const ActionNodeComponent: ComponentType<NodeProps<ActionNodeProps>> = (props: NodeProps<ActionNodeProps>) => {

    const {action} = props.data;

    return (
        <>
            <Handle type="target" position={Position.Top} />
            <Card>
                <ActionPanel action={action}/>
            </Card>
            <Handle type="source" position={Position.Bottom}/>
        </>
    );

};

export const ActionNode = ActionNodeComponent;
