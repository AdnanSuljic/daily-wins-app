import { useState, type ChangeEvent, type FormEvent } from 'react';
import Button from '../Button/Button';
import './AddItemForm.css';
import type { InputFormProps } from '../../types/types';

export default function AddItemForm({ onAddItem }: InputFormProps) {
    const [inputValue, setInputValue] = useState<string>('');

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if (inputValue.trim() === '') return;

        onAddItem(inputValue);
        setInputValue('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
            className="input-field"
                type="text" 
                value={inputValue} 
                onChange={handleInputChange} 
                placeholder="Add Your Proud Win Here" 
            />
            <Button buttonText="Add" />
      </form>
    );
}