import * as React from 'react';
import { FC, useCallback, useContext, useMemo, useRef } from 'react';
import ReactFlow, {
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    Background,
    Controls,
    NodeChange,
    Panel,
    useEdgesState,
    useNodesState,
    useReactFlow,
} from 'reactflow';
import { Actions } from '../actions/actions';
import { UuidUtils } from '../../../utils/uuid.utils';
import { ActionNode } from '../action-node/action-node';
import { ConstructorContext } from '../constructor.context';
import { ActionUtils } from '../../../utils/action.utils';
import {EdgeChange, NodeRemoveChange} from '@reactflow/core/dist/esm/types/changes';
import { Connection } from '@reactflow/core/dist/esm/types/general';

export interface WorkingFieldProps {

}

const WorkingFieldComponent: FC<WorkingFieldProps> = (props) => {

    const ctx = useContext(ConstructorContext);

    const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
    const { project } = useReactFlow();

    const [nodes, setNodes] = useNodesState([]);
    const [edges, setEdges] = useEdgesState([]);

    const nodeTypes = useMemo(() => ({ actionNode: ActionNode }), []);

    const changeChildId = useCallback((parentId: string, childId: string) => {
        const parentAction = ctx.currentActions.find(action => action.id === parentId);
        if (parentAction) {
            ctx.changeCurrentAction({
                ...parentAction,
                childId: childId
            });
        }
    }, [ctx.currentActions, ctx.changeCurrentAction]);

    const onNodesChange = useCallback(
        (nodeChanges: NodeChange[]) => {
            const change = nodeChanges[0];
            if (change.type === 'remove') {
                ctx.removeCurrentAction(change.id);
            }
            setNodes((nds) => applyNodeChanges(nodeChanges, nds));
        },
        [setNodes, ctx.removeCurrentAction],
    );

    const onEdgesChange = useCallback(
        (edgeChanges: EdgeChange[]) => {
            const change = edgeChanges[0];
            if (change.type === 'remove') {
                const parentId = change.id.split('-')[1];
                changeChildId(parentId, '');
            }
            setEdges((eds) => applyEdgeChanges(edgeChanges, eds));
        },
        [setEdges, changeChildId],
    );

    const onConnect = useCallback(
        (connection: Connection) => {
            const parentId = connection.source;
            const childId = connection.target;
            changeChildId(parentId || '', childId || '');
            setEdges((eds) => addEdge(connection, eds));
        },
        [setEdges, changeChildId],
    );

    const onClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        if (ctx.selectedAction) {
            const targetIsPane = (event.target as HTMLDivElement).classList.contains('react-flow__pane');
            if (targetIsPane) {
                const wrapper = reactFlowWrapper.current;
                if (wrapper) {
                    const { top, left } = wrapper.getBoundingClientRect();
                    const newId = UuidUtils.getNewUuid();
                    const newAction = ActionUtils.makeRequestAction(ctx.selectedAction, newId);
                    const newNode = {
                        id: newId,
                        position: project({ x: event.clientX - left - 75, y: event.clientY - top }),
                        data: {
                            action: newAction
                        },
                        type: 'actionNode',
                    };
                    ctx.addCurrentAction(newAction);
                    setNodes((nds) => nds.concat(newNode));
                }
            }
        }
    }, [setNodes, ctx.selectedAction, ctx.addCurrentAction]);

    return (
        <div
            style={{
                flexGrow: 1,
                height: '100%',
            }}
            ref={reactFlowWrapper}
        >
            <ReactFlow
                nodeTypes={nodeTypes}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onClick={onClick}
            >
                <Panel position={'top-left'}>
                    <Actions />
                </Panel>
                <Controls />
                <Background gap={12} size={1} />
            </ReactFlow>
        </div>
    );

};

export const WorkingField = WorkingFieldComponent;
