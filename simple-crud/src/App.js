import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  // useEffect(() => {
  //   axios.get('http://localhost:5000/items')
  //     .then(response => {
  //       console.log('Fetched items:', response.data);
  //       setItems(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Gagal mengambil data:', error);
  //       console.error('Error details:', error.response);
  //     });
  // }, []);
  
  
  const handleAddItem = () => {
    if (!name || !description) return;
    axios.post('http://localhost:5000/items', { name, description })
      .then(response => {
        setItems([...items, response.data]);
        setName('');
        setDescription('');
      })
      .catch(error => {
        console.error('Error adding item:', error);
      });
  };
  

  const handleDeleteItem = (id) => {
    axios.delete(`http://localhost:5000/items/${id}`)
      .then(() => {
        setItems(items.filter(item => item._id !== id));
      })
      .catch(error => console.error('Error deleting item:', error));
  };

  const handleEditItem = (item) => {
    setIsEditing(true);
    setCurrentItem(item);
    setName(item.name);
    setDescription(item.description);
  };

  const handleUpdateItem = () => {
    if (!name || !description) return;
    axios.put(`http://localhost:5000/items/${currentItem._id}`, { name, description })
      .then((response) => {
        setItems(items.map(item => (item._id === response.data._id ?  response.data : item)));
        setIsEditing(false);
        setCurrentItem(null);
        setName('');
        setDescription('');
      })
      .catch(error => console.error('Error updating item:', error));
  };

  return (
    <div>
      <h1>CRUD App</h1>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama"
        />

        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="deskripsi"
        />
        {isEditing ? (
          <button onClick={handleUpdateItem}>Update Item</button>
        ) : (
          <button onClick={handleAddItem}>Add Item</button>
        )}
      </div>
      <ul>
        {items.map(item => (
          <li key={item._id}>
            {item.name} - {item.description}
            <button onClick={() => handleEditItem(item)}>Edit</button>
            <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
