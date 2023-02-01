import { TextField } from '@mui/material';
import React from 'react';
import InputMask from 'react-input-mask';

const onlyNumbers = (str) => str.replace(/[^0-9]/g, '');

const MaskedInput = ({ value, onChange, name, mask, label }) => {
  function handleChange(event) {
    onChange({
      ...event,
      target: {
        ...event.target,
        name,
        value: onlyNumbers(event.target.value)
      }
    });
  }

  return (
    <InputMask
      
      name={name}
      mask={mask}
      maskChar=""
      value={value}
      onChange={handleChange}
      
    >{() => <TextField required style={{ width: '100%' }} label={label}/>}</InputMask>
  );
};

export default MaskedInput;