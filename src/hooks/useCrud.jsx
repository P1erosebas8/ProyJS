import { useState } from "react";

export function useCrud(key) {
  const [items, setItems] = useState(() => {
    return JSON.parse(localStorage.getItem(key)) || [];
  });

  const save = (data) => {
    setItems(data);
    localStorage.setItem(key, JSON.stringify(data));
  };

  const addItem = (item) => {
    const updated = [...items, { id: Date.now(), ...item }];
    save(updated);
  };

  const editItem = (id, updatedItem) => {
    const updated = items.map(i =>
      i.id === id ? { ...i, ...updatedItem } : i
    );
    save(updated);
  };

  const deleteItem = (id) => {
    const updated = items.filter(i => i.id !== id);
    save(updated);
  };

  return { items, addItem, editItem, deleteItem };
}
