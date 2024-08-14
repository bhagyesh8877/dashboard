// src/components/Dashboard.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addWidget, addCategory, removeWidget } from '../redux/widgetsSlice';
import SlideInForm from './SlideInForm';
import './Dashboard.css';
import { FaPlus, FaFolderPlus, FaTimes, FaSearch } from 'react-icons/fa';

const Dashboard = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.widgets.categories);

  const [isWidgetFormOpen, setWidgetFormOpen] = useState(false);
  const [isCategoryFormOpen, setCategoryFormOpen] = useState(false);

  const [widgetName, setWidgetName] = useState('');
  const [widgetText, setWidgetText] = useState('');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || '');

  const [categoryName, setCategoryName] = useState('');

  const [searchTerm, setSearchTerm] = useState('');

  const handleAddWidget = () => {
    const newWidget = { id: Date.now(), name: widgetName, text: widgetText };
    dispatch(addWidget({ categoryId, widget: newWidget }));
    setWidgetFormOpen(false);
    setWidgetName('');
    setWidgetText('');
  };

  const handleAddCategory = () => {
    const newCategory = { id: Date.now(), name: categoryName, widgets: [] };
    dispatch(addCategory(newCategory));
    setCategoryFormOpen(false);
    setCategoryName('');
  };

  // Filter categories and widgets based on search term
  const filteredCategories = categories
    .map((category) => ({
      ...category,
      widgets: category.widgets.filter((widget) =>
        widget.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter(
      (category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.widgets.length > 0
    );

  return (
    <div className="dashboard">
      <div className="header">
        <h1>Dashboard</h1>
        <div className="actions">
          <button onClick={() => setWidgetFormOpen(true)} className="icon-button">
            <FaPlus /> Add Widget
          </button>
          <button onClick={() => setCategoryFormOpen(true)} className="icon-button">
            <FaFolderPlus /> Add Category
          </button>
          <div className="search-bar">
            <FaSearch />
            <input
              type="text"
              placeholder="Search widgets and categories"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="categories">
        {filteredCategories.map((category) => (
          <div key={category.id} className="category">
            <h2>{category.name}</h2>
            <div className="widgets">
              {category.widgets.map((widget) => (
                <div key={widget.id} className="widget">
                  <h3>{widget.name}</h3>
                  <p>{widget.text}</p>
                  <button
                    className="remove-button"
                    onClick={() =>
                      dispatch(removeWidget({ categoryId: category.id, widgetId: widget.id }))
                    }
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <SlideInForm isOpen={isWidgetFormOpen} closeForm={() => setWidgetFormOpen(false)}>
        <h2>Add Widget</h2>
        <input
          type="text"
          placeholder="Widget Name"
          value={widgetName}
          onChange={(e) => setWidgetName(e.target.value)}
        />
        <textarea
          placeholder="Widget Text"
          value={widgetText}
          onChange={(e) => setWidgetText(e.target.value)}
        />
        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button onClick={handleAddWidget}>Add Widget</button>
      </SlideInForm>

      <SlideInForm isOpen={isCategoryFormOpen} closeForm={() => setCategoryFormOpen(false)}>
        <h2>Add Category</h2>
        <input
          type="text"
          placeholder="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <button onClick={handleAddCategory}>Add Category</button>
      </SlideInForm>
    </div>
  );
};

export default Dashboard;
