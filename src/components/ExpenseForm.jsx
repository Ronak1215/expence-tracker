import React, { useState, useEffect, useContext } from 'react';
import { ExpenseContext } from '../context/ExpenseProvider';


const ExpenseForm = ({ initialData = {}, onSubmit, submitLabel = "+ Add Expense" }) => {
  
  const [title, setTitle] = useState(initialData.title || "");
  const [amount, setAmount] = useState(initialData.amount || "");
  const [date, setDate] = useState(initialData.date || "");
  const [category, setCategory] = useState(initialData.category || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount || !category || !date) {
      alert("Please fill all fields");
      return;
    }

    const expenseData = {
      id: initialData.id || Date.now(),
      title,
      amount: Number(amount),
      category,
      date
    };

    onSubmit(expenseData);
    setTitle("");
    setAmount("");
    setCategory("");
    setDate("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 max-w-md mx-auto mt-6 flex flex-col gap-4"
    >
      <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 text-center">
        {submitLabel === "Save" ? "Edit Expense" : "Add New Expense"}
      </h2>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
        <input
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          type="text"
          placeholder="e.g. Coffee, Rent"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount</label>
        <input
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          type="number"
          placeholder="e.g. 100"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
        <input
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
        <select
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select a Category</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Health">Health</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Utilities">Utilities</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-md transition-all"
      >
        {submitLabel}
      </button>
    </form>
  );
};

export default ExpenseForm;
