import * as React from 'react';
import { FC } from 'react';
import { TextField } from '@mui/material';
import { TgActionFieldRequest } from '../../../model/tg-action.request';

export interface ActionFieldProps {
    field: TgActionFieldRequest;
    onChangeField: (newField: TgActionFieldRequest) => void;
}

const ActionFieldComponent: FC<ActionFieldProps> = (props) => {

    const {field, onChangeField} = props;

    const handleChangeActionField = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChangeField({
            ...field,
            value: event.target.value
        })
    }

    return (
        <TextField
            label={field.name}
            helperText={field.description}
            onChange={handleChangeActionField}
        />
    );

};

export const ActionField = ActionFieldComponent;
