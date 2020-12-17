/* eslint-disable no-param-reassign */
import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import { Container } from './RButtonstyles';

export interface RadioOption {
  value: string;
  label: string;
}

interface RadioProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'type' | 'defaultChecked' | 'value' | 'defaultValue'
  > {
  name: string;
  title: string;
  options: RadioOption[];
  updateDefaultValue?: 'Real' | 'Fantasy' | '';
}

const RadioButton: React.FC<RadioProps> = ({
  name,
  title,
  options,
  updateDefaultValue,
}) => {
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const {
    fieldName,
    defaultValue = updateDefaultValue,
    registerField,
  } = useField(name);

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputRefs.current,
      getValue: (refs: HTMLInputElement[]) => {
        return refs.find(ref => ref.checked)?.value || '';
      },
      setValue: (refs: HTMLInputElement[], value) => {
        const inputRef = refs.find(ref => ref.value === value);
        if (inputRef) inputRef.checked = true;
      },
      clearValue: (refs: HTMLInputElement[]) => {
        const inputRef = refs.find(ref => ref.checked === true);
        if (inputRef) inputRef.checked = false;
      },
    });
  }, [defaultValue, fieldName, registerField]);

  return (
    <Container>
      <p>{title}</p>
      {options.map((option, index) => (
        <label htmlFor={option.value} key={option.value}>
          <input
            ref={ref => {
              inputRefs.current[index] = ref as HTMLInputElement;
            }}
            className="bolin"
            defaultChecked={defaultValue}
            type="radio"
            name={name}
            id={option.value}
            value={option.value}
          />
          <p>{option.label}</p>
          <span />
        </label>
      ))}
    </Container>
  );
};

export default RadioButton;
