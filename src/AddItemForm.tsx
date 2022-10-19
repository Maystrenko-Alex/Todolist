import React, { KeyboardEvent, ChangeEvent, useState } from 'react';

type AddItemFormPropsType = {
  addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {

  const [title, setTitle] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const onChangeValueInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
    error && setError(false)
  }

  const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addNewItemHandler();

  const addNewItemHandler = () => {
    if (title.trim()) {
      props.addItem(title.trim());
    } else {
      setError(true);
    }
    
    setTitle('');
  }

  return (
    <div>
      <input
        className={error ? 'error' : 'notError'}
        autoFocus
        value={title}
        onChange={onChangeValueInputHandler}
        onKeyPress={onKeyPressAddItem}
      />
      <button onClick={addNewItemHandler}>+</button>
      {error && <div className={'errorMessage'}>Title is required!</div>}
    </div>
  );
};

export default AddItemForm;