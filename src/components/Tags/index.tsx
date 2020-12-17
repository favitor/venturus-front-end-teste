/* eslint-disable react/jsx-curly-newline */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useField } from '@unform/core';
import { FiX } from 'react-icons/fi';

import { Container } from './Tagstyles';

interface TagsProps {
  label?: string;
  name: string;
  defaultValue?: string[];
}

const Tags: React.FC<TagsProps> = ({ label, name, defaultValue, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputTags, setInputTags] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const inputRefs = useRef<string[]>([]);
  const { fieldName, registerField } = useField(name);

  useEffect(() => {
    if (!!defaultValue && defaultValue.length > 0) {
      setTags([]);
      setTags(defaultValue);
    }
  }, [defaultValue]);

  const removeTag = useCallback(
    tag => {
      setTags(tags.filter(insideTag => insideTag !== tag));
    },
    [tags],
  );

  const inputKeyDown = useCallback(
    event => {
      const val = event.target.value;
      if ((event.key === 'Enter' || event.key === ';') && val) {
        if (tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
          return;
        }
        setTags([...tags, val]);
        setInputTags('');
      } else if (event.key === 'Backspace' && !val) {
        const lastTag = tags[tags.length - 1];
        removeTag(lastTag);
      }
    },
    [tags, removeTag],
  );

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRefs.current,
      getValue: (refs: string[]) => {
        return refs;
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container isFocused={isFocused} hasTags={!!(tags.length > 0)}>
      <label htmlFor={name}>{label}</label>
      <div>
        <ul>
          {tags.map((tag, index) => (
            <li
              key={index}
              ref={() => {
                inputRefs.current[index] = tag;
              }}
            >
              <p>{tag}</p>
              <button type="button" onClick={() => removeTag(tag)}>
                <FiX />
              </button>
            </li>
          ))}
          <input
            name={name}
            onKeyDown={e => inputKeyDown(e)}
            value={inputTags}
            onChange={e =>
              e.target.value === ';' ? '' : setInputTags(e.target.value)
            }
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onKeyPress={e => e.key === 'Enter' && e.preventDefault()}
            placeholder="Add tags pressing 'Enter'"
            {...props}
          />
        </ul>
      </div>
    </Container>
  );
};

export default Tags;
