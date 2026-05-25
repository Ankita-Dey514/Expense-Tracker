import React, { useState } from 'react';
import { useExpense } from '../context/ExpenseContext';
import '../styles/ExpenseForm.css';

const CATEGORIES = ['Food', 'Transport', 'Entertainment', 'Utilities', 'Health', 'Shopping', 'Other'];

export const ExpenseForm = ({ onExpenseAdded, editingExpense, onEditComplete }) => {
  const [description, setDescription] = useState(editingExpense?.description || '');
  const [amount, setAmount] = useState(editingExpense?.amount || '');
  const [category, setCategory] = useState(editingExpense?.category || 'Other');
  const [date, setDate] = useState(editingExpense?.date?.split('T')[0] || new Date().toISOString().split('T')[0]);
  const [error, setError] = useState('');
  const { addExpense, updateExpense } = useExpense();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!description || !amount) {
      setError('Please fill in all fields');
      return;
    }

    try {
      if (editingExpense) {
        await updateExpense(editingExpense._id, description, parseFloat(amount), category, date);
        onEditComplete();
      } else {
        await addExpense(description, parseFloat(amount), category, date);
        setDescription('');
        setAmount('');
        setCategory('Other');
        setDate(new Date().toISOString().split('T')[0]);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save expense');
    }
  };

  return (
    <div className="expense-form">
      <h2>{editingExpense ? 'Edit Expense' : 'Add New Expense'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          step="0.01"
          required
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">{editingExpense ? 'Update' : 'Add'} Expense</button>
        {editingExpense && (
          <button type="button" onClick={onEditComplete} className="cancel-btn">
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};
