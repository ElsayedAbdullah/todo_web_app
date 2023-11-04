// Material UI Components
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

// Custom Components
import Todo from "./Todo.jsx";
import { useContext, useMemo, useState } from "react";
import {
  DispatchTodosContext,
  TodosContext,
} from "../contexts/TodosContext.jsx";
import { SnackBarContext } from "../contexts/SnackBarContext.jsx";

function TodosList() {
  const { todos } = useContext(TodosContext);
  const { dispatch } = useContext(DispatchTodosContext);
  const { showHideSnackBar } = useContext(SnackBarContext);
  const [todoItem, setTodoItem] = useState({});
  const [inputTodoTitle, setInputTodoTitle] = useState("");
  const [filterValue, setFilterValue] = useState("all");
  const [openDeleteTodoDialog, setOpenDeleteTodoDialog] = useState(false);
  const [openUpdateTodoDialog, setOpenUpdateTodoDialog] = useState(false);

  //== Handlers ==\\
  // Update Todo
  function handleUpdateTodo() {
    dispatch({ type: "updateTodo", payload: { todoItem } });
    showHideSnackBar("updated successfully!");
  }

  // Add New Todo
  function handleAddTodo(e) {
    e.preventDefault();
    if (inputTodoTitle !== "") {
      dispatch({ type: "addTodo", payload: { title: inputTodoTitle } });
      setInputTodoTitle("");
      showHideSnackBar("added successfully!");
    }
  }

  // Delete Todo
  function handleDeleteTodo() {
    dispatch({ type: "deleteTodo", payload: { id: todoItem.id } });
    setOpenDeleteTodoDialog(false);
    showHideSnackBar("deleted successfully!");
  }

  // show update dialog
  function showUpdateDialog(todo) {
    setTodoItem(todo);
    setOpenUpdateTodoDialog(true);
  }

  // show delete dialog
  function showDeleteDialog(todo) {
    setTodoItem(todo);
    setOpenDeleteTodoDialog(true);
  }

  // useMemo hook to make completed todos not changing with each change in all states
  const completedTodos = useMemo(() => {
    return todos?.filter((t) => t.isCompleted === true);
  }, [todos]);

  const notCompletedTodos = useMemo(() => {
    return todos?.filter((t) => {
      return t.isCompleted === false;
    });
  }, [todos]);

  let todosToBeRendered = todos;

  if (filterValue === "completed") {
    todosToBeRendered = completedTodos;
  } else if (filterValue === "not-completed") {
    todosToBeRendered = notCompletedTodos;
  }

  const todosJsx = todosToBeRendered?.map((t) => (
    <Todo
      showDeleteDialog={showDeleteDialog}
      showUpdateDialog={showUpdateDialog}
      key={t.id}
      todo={t}
    />
  ));

  return (
    <>
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
            {todos?.length > 0 ? (
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
                    type="submit"
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

      {/* Delete Dialog */}
      <Dialog
        open={openDeleteTodoDialog}
        onClose={() => setOpenDeleteTodoDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure to Delete This Todo ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`if you agree to delete you can't retrieve it again`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteTodoDialog(false)}>
            Disagree
          </Button>
          <Button onClick={() => handleDeleteTodo()} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      {/* ==Delete Dialog== */}

      {/* Update Dialog */}
      <Dialog
        open={openUpdateTodoDialog}
        onClose={() => setOpenUpdateTodoDialog(false)}
      >
        <DialogTitle>Edit Todo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Todo Title"
            type="text"
            fullWidth
            variant="standard"
            value={todoItem.title}
            onChange={(e) =>
              setTodoItem({ ...todoItem, title: e.target.value })
            }
          />
          <TextField
            margin="dense"
            id="details"
            label="Todo Details"
            type="text"
            fullWidth
            variant="standard"
            value={todoItem.details}
            onChange={(e) =>
              setTodoItem({ ...todoItem, details: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUpdateTodoDialog(false)}>Cancel</Button>
          <Button
            onClick={() => {
              handleUpdateTodo();
              setOpenUpdateTodoDialog(false);
            }}
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>
      {/* ==Update Dialog== */}
    </>
  );
}

export default TodosList;
