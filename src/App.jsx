import { Stack } from "@mui/material";
import "./App.css";
import TodosList from "./components/TodosList.jsx";
import { purple } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState } from "react";
import { todosContext } from "./contexts/todosContext.js";

const theme = createTheme({
  palette: {
    primary: purple,
  },
  typography: {
    fontFamily: "Caveat, cursive",
  },
});

function App() {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  return (
    <ThemeProvider theme={theme}>
      <todosContext.Provider value={{ todos, setTodos }}>
        <Stack
          sx={{ height: "100vh", backgroundColor: "#512da8" }}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <TodosList />
        </Stack>
      </todosContext.Provider>
    </ThemeProvider>
  );
}

export default App;
