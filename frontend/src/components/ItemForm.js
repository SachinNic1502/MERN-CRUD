// src/components/ItemForm.js
import React, { useState } from 'react';
import API from '../api';

const ItemForm = ({ fetchItems }) => {
  const [formData, setFormData] = useState({ name: '', description: '', price: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/items', formData);
      fetchItems();
      setFormData({ name: '', description: '', price: '' });
    } catch (error) {
      alert('Failed to create item');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-lg font-bold text-gray-800">Add New Item</h2>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <input
        type="text"
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <input
        type="number"
        placeholder="Price"
        value={formData.price}
        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        required
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
      >
        Add Item
      </button>
    </form>
  );
};

export default ItemForm;
