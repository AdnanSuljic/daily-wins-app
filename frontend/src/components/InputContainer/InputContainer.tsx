import { useState, useEffect } from 'react';
import './InputContainer.css';
import AddItemForm from '../AddItemForm/AddItemForm';
import TitleXL from '../Title-XL/TitleXL';
import ItemList from '../ItemList/ItemList';
import type { WinItem } from '../../types/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ItemContainer() {
  const [items, setItems] = useState<WinItem[]>([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/items`);
      if (response.ok) {
        const data = await response.json();
        setItems(data);
      }
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleAddNewItem = async (newItemText: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newItemText }),
      });
      if (response.ok) {
        const newItem = await response.json();
        setItems([...items, newItem]);
      }
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleDeleteItem = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/items/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setItems(items.filter(item => item.id !== id));
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div className="input-container">
      <TitleXL title="My Win For Today" />      
      <AddItemForm onAddItem={handleAddNewItem} />
      <ItemList items={items} onDeleteItem={handleDeleteItem} />
    </div>
  );
}