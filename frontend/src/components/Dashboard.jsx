import React from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useExpense } from '../context/ExpenseContext';
import '../styles/Dashboard.css';

const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6384'];

export const Dashboard = () => {
  const { summary, expenses } = useExpense();

  if (!summary) {
    return <div className="dashboard"><p>Loading dashboard...</p></div>;
  }

  const categoryData = Object.entries(summary.byCategory || {}).map(([category, amount]) => ({
    name: category,
    value: amount,
  }));

  const monthlyData = {};
  expenses.forEach((expense) => {
    const date = new Date(expense.date);
    const monthKey = `${date.getMonth() + 1}/${date.getFullYear()}`;
    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = 0;
    }
    monthlyData[monthKey] += expense.amount;
  });

  const monthlyChartData = Object.entries(monthlyData)
    .sort()
    .slice(-6)
    .map(([month, amount]) => ({
      month,
      amount,
    }));

  return (
    <div className="dashboard">
      <div className="summary-cards">
        <div className="card">
          <h3>Total Expenses</h3>
          <p className="amount">${summary.totalExpenses.toFixed(2)}</p>
        </div>
        <div className="card">
          <h3>Total Count</h3>
          <p className="amount">{summary.totalCount}</p>
        </div>
        <div className="card">
          <h3>Average</h3>
          <p className="amount">
            ${summary.totalCount > 0 ? (summary.totalExpenses / summary.totalCount).toFixed(2) : '0.00'}
          </p>
        </div>
      </div>

      <div className="charts">
        {monthlyChartData.length > 0 && (
          <div className="chart-container">
            <h3>Monthly Spending</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#667eea" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {categoryData.length > 0 && (
          <div className="chart-container">
            <h3>Spending by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: $${value.toFixed(2)}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};
