import React from 'react';
import { useExpense } from '../context/ExpenseContext';
import { ExpenseItem } from './ExpenseItem';
import '../styles/ExpenseList.css';

export const ExpenseList = ({ onEditExpense }) => {
  const { expenses, loading } = useExpense();

  if (loading) {
    return <div className="expense-list"><p>Loading...</p></div>;
  }

  if (expenses.length === 0) {
    return (
      <div className="expense-list">
        <p className="empty-message">No expenses yet. Add one to get started!</p>
      </div>
    );
  }

  return (
    <div className="expense-list">
      <h2>Recent Expenses</h2>
      <div className="list-container">
        {expenses.map((expense) => (
          <ExpenseItem
            key={expense._id}
            expense={expense}
            onEdit={onEditExpense}
          />
        ))}
      </div>
    </div>
  );
};
