import React, { ChangeEvent, useState } from 'react';

type EditableSpanPropsType = {
  title: string
  changeTitle: (title: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {

  const [inputValue, setInputValue] = useState<string>(props.title);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const onEditMode = () => setIsEditMode(true);

  const offEditMode = () => {
    if (inputValue) {
      props.changeTitle(inputValue)
      setIsEditMode(false)
    } 
  }

  const onChangeInputValueHandler = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.currentTarget.value);

  return (
    <>
      {isEditMode
        ? <input autoFocus value={inputValue} onChange={onChangeInputValueHandler} onBlur={offEditMode} />
        : <span onDoubleClick={onEditMode}> {props.title}</span>
      }
    </>
  );
};
