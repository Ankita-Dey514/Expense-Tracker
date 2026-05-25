import React from 'react';
import { useExpense } from '../context/ExpenseContext';
import '../styles/ExpenseItem.css';

export const ExpenseItem = ({ expense, onEdit }) => {
  const { deleteExpense } = useExpense();

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this expense?')) {
      try {
        await deleteExpense(expense._id);
      } catch (err) {
        alert('Failed to delete expense');
      }
    }
  };

  const formattedDate = new Date(expense.date).toLocaleDateString();

  return (
    <div className="expense-item">
      <div className="expense-info">
        <h3>{expense.description}</h3>
        <p className="category">{expense.category}</p>
        <p className="date">{formattedDate}</p>
      </div>
      <div className="expense-amount">${expense.amount.toFixed(2)}</div>
      <div className="expense-actions">
        <button className="edit-btn" onClick={() => onEdit(expense)}>
          Edit
        </button>
        <button className="delete-btn" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};
