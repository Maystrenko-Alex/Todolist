import { PostAdd } from '@mui/icons-material';
import { Button, TextField } from '@mui/material';
import React, { KeyboardEvent, ChangeEvent, useState } from 'react';
import { v1 } from 'uuid';

type AddItemFormPropsType = {
  addItem: (title: string, todoListID: string) => void
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
      props.addItem(title.trim(), v1());
    } else {
      setError(true);
    }
    
    setTitle('');
  }

  return (
    <div className='addFormWrapper'>
      <div className='inputAndButtonBlock'>
        <TextField 
          size='small'
          className={error ? 'error' : 'notError'}
          autoFocus
          placeholder='Title'
          value={title}
          onChange={onChangeValueInputHandler}
          onKeyPress={onKeyPressAddItem}
        />
        <Button
          style={{paddingRight: '0px', justifyContent: 'flex-end'}}
          onClick={addNewItemHandler}
        >
          <PostAdd fontSize='large' />
        </Button>
      </div>
      {error && <div  className={'errorMessage'}>Title is required!</div>}
    </div>
  );
};

export default AddItemForm;