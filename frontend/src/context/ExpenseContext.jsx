import React, { createContext, useState, useEffect } from 'react';
import { expenseAPI } from './api';

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchExpenses = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await expenseAPI.getAll();
      setExpenses(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch expenses');
    } finally {
      setLoading(false);
    }
  };

  const fetchSummary = async () => {
    try {
      const response = await expenseAPI.getSummary();
      setSummary(response.data);
    } catch (err) {
      console.error('Failed to fetch summary');
    }
  };

  useEffect(() => {
    fetchExpenses();
    fetchSummary();
  }, []);

  const addExpense = async (description, amount, category, date) => {
    try {
      const response = await expenseAPI.create(description, amount, category, date);
      setExpenses([response.data, ...expenses]);
      await fetchSummary();
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  const updateExpense = async (id, description, amount, category, date) => {
    try {
      const response = await expenseAPI.update(id, description, amount, category, date);
      setExpenses(expenses.map((exp) => (exp._id === id ? response.data : exp)));
      await fetchSummary();
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  const deleteExpense = async (id) => {
    try {
      await expenseAPI.delete(id);
      setExpenses(expenses.filter((exp) => exp._id !== id));
      await fetchSummary();
    } catch (err) {
      throw err;
    }
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        summary,
        loading,
        error,
        fetchExpenses,
        addExpense,
        updateExpense,
        deleteExpense,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpense = () => {
  const context = React.useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpense must be used within ExpenseProvider');
  }
  return context;
};
