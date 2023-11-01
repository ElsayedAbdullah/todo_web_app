// Material UI Components
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
  Button,
  Divider,
  Grid,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

// Custom Components
import Todo from "./Todo.jsx";
import { useContext, useState } from "react";
import { todosContext } from "../contexts/todosContext.js";
import { v4 as uuidv4 } from "uuid";

function TodosList() {
  const { todos, setTodos } = useContext(todosContext);
  const [inputTodoTitle, setInputTodoTitle] = useState("");
  const [filterValue, setFilterValue] = useState("all");

  // useEffect(() => {
  //   const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
  //   setTodos(storageTodos);
  // }, [todos, setTodos]);

  function handleAddTodo(e) {
    e.preventDefault();
    if (inputTodoTitle !== "") {
      const newTodo = {
        id: uuidv4(),
        title: inputTodoTitle,
        details: "",
        isCompleted: false,
      };

      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));

      setInputTodoTitle("");
    }
  }

  const completedTodos = todos?.filter((t) => t.isCompleted === true);
  const notCompletedTodos = todos?.filter((t) => t.isCompleted === false);

  let todosToBeRendered = todos;

  if (filterValue === "completed") {
    todosToBeRendered = completedTodos;
  } else if (filterValue === "not-completed") {
    todosToBeRendered = notCompletedTodos;
  }

  const todosJsx = todosToBeRendered?.map((t) => <Todo key={t.id} todo={t} />);

  return (
    <todosContext.Provider value={{ todos, setTodos }}>
      <Container maxWidth="sm">
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography textAlign={"center"} variant="h2" component="div">
              Todos
            </Typography>
            <Divider />
            {/* Toggle Button for Filter */}
            <Stack mt={3} justifyContent={"center"} alignItems={"center"}>
              <ToggleButtonGroup
                value={filterValue}
                exclusive
                color="primary"
                onChange={(e) => setFilterValue(e.target.value)}
              >
                <ToggleButton value="all">All</ToggleButton>
                <ToggleButton value="completed">Completed</ToggleButton>
                <ToggleButton value="not-completed">Not Completed</ToggleButton>
              </ToggleButtonGroup>
            </Stack>
            {/* Toggle Button for Filter */}
            {/* Todos */}
            {todos?.length ? (
              <div className="todos-content" id="style-11">
                {todosJsx}
              </div>
            ) : (
              <h3 style={{ textAlign: "center", marginTop: "20px" }}>
                There are no Todos, please add one
              </h3>
            )}
            {/* Todos */}
            {/* Add Todo Form */}
            <form onSubmit={handleAddTodo}>
              <Grid container mt={1} spacing={2}>
                <Grid item xs={8}>
                  <TextField
                    sx={{ width: "100%" }}
                    required
                    id="outlined-required"
                    label="Enter New Todo"
                    value={inputTodoTitle}
                    onChange={(e) => setInputTodoTitle(e.target.value)}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Button
                    sx={{ width: "100%", height: "100%" }}
                    variant="contained"
                  >
                    Add Todo
                  </Button>
                </Grid>
              </Grid>
            </form>
            {/* ==Add Todo Form== */}
          </CardContent>
        </Card>
      </Container>
    </todosContext.Provider>
  );
}

export default TodosList;
