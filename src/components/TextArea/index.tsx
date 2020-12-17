import React, { TextareaHTMLAttributes, useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import { Container } from './TextAreastyles';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  name: string;
}

const TextArea: React.FC<TextAreaProps> = ({ label, name, ...props }) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <textarea
        name={name}
        ref={inputRef}
        defaultValue={defaultValue}
        {...props}
      />
      <label htmlFor={name}>{label}</label>
    </Container>
  );
};

export default TextArea;
