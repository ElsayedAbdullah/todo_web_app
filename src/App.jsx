import { Stack } from "@mui/material";
import "./App.css";
import TodosList from "./components/TodosList.jsx";
import { purple } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { SnackProvider } from "./contexts/SnackBarContext.jsx";
import TodosProvider from "./contexts/TodosContext.jsx";
const theme = createTheme({
  palette: {
    primary: purple,
  },
  typography: {
    fontFamily: "Caveat, cursive",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <TodosProvider>
        <SnackProvider>
          <Stack
            sx={{ height: "100vh", backgroundColor: "#512da8" }}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <TodosList />
          </Stack>
        </SnackProvider>
      </TodosProvider>
    </ThemeProvider>
  );
}

export default App;
