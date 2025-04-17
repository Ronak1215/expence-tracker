import React, { createContext, useEffect, useState } from "react";

export const ExpenseContext = createContext();
const ExpenseProvider = ({ children }) => {
  const [expense, setExpense] = useState(() => {
    try {
      const stored = localStorage.getItem("expenses");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    localStorage.setItem("expenses",JSON.stringify(expense))
  }, [expense])
  

  // const addExpense = (e) => {
  //   e.preventDefault();
  //   if (!title || !amount || !category || !date) {
  //     alert("Pls fill all the inputs");
  //     return;
  //   }
  //   const newExpense = {
  //     id: Date.now(),
  //     title,
  //     amount: Number(amount),
  //     date,
  //     category,
  //   };
  //   setExpense([...expense, newExpense]);
  //   setTitle("");
  //   setAmount("");
  //   setDate("");
  //   setCategory("");
  //   // console.log("New Expense:", newExpense);

  // };
  const addExpense = (expenseData) => {
    // expenseData already validated by the form
    setExpense([...expense, expenseData]);
  };

  const deleteExpense = (id) => {
    setExpense(expense.filter((exp) => exp.id !== id));
  };

  const updateExpense = (updatedExpense) => {
    const updatedList = expense.map((exp) =>
      exp.id === updatedExpense.id ? updatedExpense : exp
    );

    setExpense(updatedList);
  };

  return (
    <>
      <ExpenseContext.Provider
        value={{
          expense,
          setExpense,
          title,
          setTitle,
          amount,
          setAmount,
          category,
          setCategory,
          date,
          setDate,
          addExpense,
          deleteExpense,
          updateExpense,
        }}
      >
        {children}
      </ExpenseContext.Provider>
    </>
  );
};

export default ExpenseProvider;
