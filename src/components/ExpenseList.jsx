import React, { useContext, useState } from "react";
import { ExpenseContext } from "../context/ExpenseProvider";
import ExpenseForm from "./ExpenseForm";

const ExpenseList = () => {
  const {updateExpense} = useContext(ExpenseContext)
  const { expense,deleteExpense } = useContext(ExpenseContext);
  const [editingId, setEditingId] = useState(null);
  return (
    <>
      <div className="max-w-md mx-auto mt-8 space-y-4">
        {expense.map((item) => (
          editingId === item.id ? (
            <ExpenseForm
              key={item.id}
              initialData={item}
              onSubmit={(updatedItem) => {
                updateExpense(updatedItem);
                setEditingId(null);
              }}
              submitLabel="Save"
            />
          ) :
          (<div key={item.id} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
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
              onClick={()=>setEditingId(item.id)
              }
              className="px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600">
                Edit
              </button>
              <button 
              onClick={()=>{deleteExpense(item.id)}}
              className="px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600">
                Delete
              </button>
            </div>
          </div>)
        ))}
      </div>
    </>
  );
};

export default ExpenseList;
