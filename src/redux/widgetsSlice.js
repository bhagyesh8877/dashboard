import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: JSON.parse(localStorage.getItem('categories')) || [
    {
      id: 1,
      name: 'CSPM Executive Dashboard',
      widgets: [
        { id: 1, name: 'Widget 1', text: 'Widget 1 text' },
        { id: 2, name: 'Widget 2', text: 'Widget 2 text' },
      ],
    },
    {
      id: 2,
      name: 'Network Security',
      widgets: [
        { id: 3, name: 'Widget 3', text: 'Widget 3 text' },
      ],
    },
  ],
};

const widgetsSlice = createSlice({
  name: 'widgets',
  initialState,
  reducers: {
    addWidget: (state, action) => {
      const { categoryId, widget } = action.payload;
      const category = state.categories.find((cat) => cat.id === categoryId);
      if (category) {
        category.widgets.push(widget);
      }
    },
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    removeWidget: (state, action) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find((cat) => cat.id === categoryId);
      if (category) {
        category.widgets = category.widgets.filter((widget) => widget.id !== widgetId);
      }
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const { addWidget, addCategory, removeWidget, setCategories } = widgetsSlice.actions;

export default widgetsSlice.reducer;
