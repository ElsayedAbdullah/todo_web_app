import { createContext, useReducer } from "react";
import todosReducer from "../reducers/todosReducer.js";

export const TodosContext = createContext({});
export const DispatchTodosContext = createContext(null);

export default function TodosProvider({ children }) {
  const [todos, dispatch] = useReducer(
    todosReducer,
    JSON.parse(localStorage.getItem("todos")) || []
  );
  return (
    <TodosContext.Provider value={{ todos }}>
      <DispatchTodosContext.Provider value={{ dispatch }}>
        {children}
      </DispatchTodosContext.Provider>
    </TodosContext.Provider>
  );
}
