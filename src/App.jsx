import { useContext } from "react";
import ExpenseForm from "./components/ExpenseForm"
import ExpenseList from "./components/ExpenseList"
import { ExpenseContext } from "./context/ExpenseProvider";

function App() {
  const { addExpense } = useContext(ExpenseContext);
  return (
    <>
       <ExpenseForm
        onSubmit={addExpense}
        submitLabel="+ Add Expense"
      />
      <ExpenseList/>
      
    </>
  )
}

export default App
