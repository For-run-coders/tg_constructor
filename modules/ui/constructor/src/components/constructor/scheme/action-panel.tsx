import * as React from 'react';
import { FC, useState } from 'react';
import { Card, CardContent, CardHeader } from '@mui/material';
import { TgActionFieldRequest, TgActionRequest } from '../../../model/tg-action.request';
import { ActionField } from './action-field';

export interface ActionPanelProps {
    action: TgActionRequest;
    onChangeAction: (newAction: TgActionRequest) => void;
}

const ActionPanelComponent: FC<ActionPanelProps> = (props) => {

    const [] = useState();

    const { action, onChangeAction } = props;

    const fields: TgActionFieldRequest[] = [
        ...action.fields
    ];

    const handleChangeActionField = (newField: TgActionFieldRequest) => {
        const newFields = [...fields].map(field => {
            if (field.name === newField.name) {
                return {
                    ...field,
                    value: newField.value,
                };
            }
            return field;
        });
        onChangeAction({
            ...action,
            fields: newFields
        });
    };

    const renderField = (field: TgActionFieldRequest) => {
        if (field.type === 'STRING') {
            return (
                <ActionField
                    field={field}
                    onChangeField={handleChangeActionField}
                />
            );
        }
        return null;
    };

    return (
        <Card sx={{ width: 400, mb: 1 }} variant='outlined'>
            <CardHeader title={action.name} />
            <CardContent>
                <div style={{marginBottom: 15}}>{`ID: ${action.id}`}</div>
                {
                    fields.map(renderField)
                }
            </CardContent>
        </Card>
    );

};

export const ActionPanel = ActionPanelComponent;
