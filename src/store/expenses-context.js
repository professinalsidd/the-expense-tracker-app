import { createContext, useReducer } from "react";

const dummy_data = [
  {
    id: 1,
    description: "Another book",
    amount: 23.05,
    date: new Date("2023-12-02"),
  },
  {
    id: 2,
    description: "A trouser",
    amount: 3.05,
    date: new Date("2022-12-02"),
  },
  {
    id: 3,
    description: "A Paint",
    amount: 23.01,
    date: new Date("2023-02-02"),
  },
  {
    id: 4,
    description: "A but Pain",
    amount: 22.05,
    date: new Date("2023-12-12"),
  },
  {
    id: 5,
    description: "Closer Packet",
    amount: 53.05,
    date: new Date("2021-12-02"),
  },
  {
    id: 6,
    description: "Another book",
    amount: 23.05,
    date: new Date("2023-12-02"),
  },
  {
    id: 7,
    description: "A trouser",
    amount: 3.05,
    date: new Date("2022-12-02"),
  },
  {
    id: 8,
    description: "A Paint",
    amount: 23.01,
    date: new Date("2023-02-02"),
  },
  {
    id: 9,
    description: "A but Pain",
    amount: 22.05,
    date: new Date("2023-12-12"),
  },
  {
    id: 10,
    description: "Closer Packet",
    amount: 53.05,
    date: new Date("2021-12-02"),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpenses: ({ description, amount, date }) => {},
  deleteExpenses: (id) => {},
  updateExpenses: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toISOString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    case "UPDATE":
      const updateExpensesIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updateExpenses = state[updateExpensesIndex];
      const updatedItem = { ...updateExpenses, ...action.payload.data };
      const updatedExpense = [...state];
      updatedExpense[updateExpensesIndex] = updatedItem;
      return updatedExpense;
    default:
      return state;
  }
}

const ExpensesProvider = ({ children }) => {
  const [expenses, dispatch] = useReducer(expensesReducer, dummy_data);

  const addExpenses = (expensesData) => {
    dispatch({ type: "ADD", payload: expensesData });
  };

  const deleteExpenses = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };

  const updateExpenses = (id, expensesData) => {
    dispatch({ type: "UPDATE", payload: { id: id, data: expensesData } });
  };

  const value = {
    expenses: expenses,
    addExpenses: addExpenses,
    deleteExpenses: deleteExpenses,
    updateExpenses: updateExpenses,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesProvider;
