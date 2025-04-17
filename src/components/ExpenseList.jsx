import React, { useContext, useState } from "react";
import { ExpenseContext } from "../context/ExpenseProvider";
import ExpenseForm from "./ExpenseForm";

const ExpenseList = () => {
  const { expense, deleteExpense, updateExpense } = useContext(ExpenseContext);
  const [editingId, setEditingId] = useState(null);
  const [filterCategory, setFilterCategory] = useState("");

  const filteredExpenses = expense.filter((item) => {
    return !filterCategory || item.category === filterCategory;
  });
  const total = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  const byCategory = filteredExpenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});

  return (
    <div className="max-w-md mx-auto mt-8 space-y-6">
      <div className="mb-6 grid grid-cols-1  gap-4">
        {/* Total Card */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 text-center">
          <h4 className="text-sm text-gray-500 dark:text-gray-400">
            Total Spent
          </h4>
          <p className="text-2xl font-bold">₹{total}</p>
        </div>

        {/* Category Breakdown */}
        {Object.entries(byCategory).map(([cat, amt]) => (
          <div
            key={cat}
            className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 text-center"
          >
            <h4 className="text-sm text-gray-500 dark:text-gray-400">{cat}</h4>
            <p className="text-xl font-semibold">₹{amt}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 gap-4">
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="border w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md p-2 focus:ring-2 focus:ring-indigo-400"
        >
          <option value="">All Categories</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Health">Health</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Utilities">Utilities</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {filteredExpenses.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No expenses match your criteria.
        </p>
      ) : (
        filteredExpenses.map((item) => (
          <div key={item.id}>
            {editingId === item.id ? (
              <ExpenseForm
                initialData={item}
                onSubmit={(updatedItem) => {
                  updateExpense(updatedItem);
                  setEditingId(null);
                }}
                submitLabel="Save"
              />
            ) : (
              <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {item.title}
                  </h3>
                  <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
                    ₹{item.amount}
                  </span>
                </div>

                <div className="text-sm text-gray-500 dark:text-gray-300 mb-4">
                  {item.category} • {item.date}
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setEditingId(item.id)}
                    className="px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteExpense(item.id)}
                    className="px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ExpenseList;
