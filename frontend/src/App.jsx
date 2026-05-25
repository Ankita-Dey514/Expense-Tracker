import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { ExpenseProvider } from './context/ExpenseContext';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Navbar } from './components/Navbar';
import { ExpenseForm } from './components/ExpenseForm';
import { ExpenseList } from './components/ExpenseList';
import { Dashboard } from './components/Dashboard';
import './styles/App.css';

function App() {
  const { user } = useAuth();
  const [authMode, setAuthMode] = useState('login');
  const [currentPage, setCurrentPage] = useState('expenses');
  const [editingExpense, setEditingExpense] = useState(null);

  if (!user) {
    return (
      <>
        {authMode === 'login' ? (
          <Login onSwitchToRegister={() => setAuthMode('register')} />
        ) : (
          <Register onSwitchToLogin={() => setAuthMode('login')} />
        )}
      </>
    );
  }

  return (
    <ExpenseProvider>
      <div className="app">
        <Navbar onNavigate={setCurrentPage} />
        <main className="main-content">
          <div className="container">
            {currentPage === 'expenses' && (
              <>
                <ExpenseForm 
                  editingExpense={editingExpense}
                  onEditComplete={() => setEditingExpense(null)}
                />
                <ExpenseList onEditExpense={setEditingExpense} />
              </>
            )}
            {currentPage === 'dashboard' && <Dashboard />}
          </div>
        </main>
      </div>
    </ExpenseProvider>
  );
}

export default App;
