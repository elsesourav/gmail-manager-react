import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

interface FormInputProps extends Omit<TextFieldProps, 'onChange'> {
    onChange: (value: string) => void;
}

const FormInput: React.FC<FormInputProps> = ({ onChange, ...props }) => {
    return (
        <TextField
            margin="normal"
            fullWidth
            {...props}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        />
    );
};

export default FormInput;
