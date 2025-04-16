import React, { createContext, useState } from 'react'

export const ExpenseContext = createContext()
const ExpenseProvider = () => {
  const [expense, setExpense] = useState([])
  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState("")
  const [catagory, setCatogory] = useState("")
  const [date, setDate] = useState("")

  const addExpense = () =>{
    if(!title || !amount || !catagory || !date){
      alert("Pls fill all the inputs")
    }
  }

  return (
    <>
      
    </>
  )
}

export default ExpenseProvider
