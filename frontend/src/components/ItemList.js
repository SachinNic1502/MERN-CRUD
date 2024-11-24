// src/components/ItemList.js
import React, { useEffect, useState } from 'react';
import API from '../api';
import ItemForm from './ItemForm';

const ItemList = () => {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    try {
      const response = await API.get('/items');
      setItems(response.data);
    } catch (error) {
      alert('Failed to fetch items');
    }
  };

  const deleteItem = async (id) => {
    try {
      await API.delete(`/items/${id}`);
      fetchItems();
    } catch (error) {
      alert('Failed to delete item');
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <ItemForm fetchItems={fetchItems} />
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Item List</h2>
        <ul className="space-y-4">
          {items.map((item) => (
            <li
              key={item._id}
              className="p-4 border border-gray-300 rounded-md flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-700">{item.name}</h3>
                <p className="text-gray-600">{item.description}</p>
                <p className="text-gray-800 font-bold">${item.price}</p>
              </div>
              <button
                onClick={() => deleteItem(item._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ItemList;
