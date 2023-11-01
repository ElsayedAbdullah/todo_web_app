// Material UI Components
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

// Material Icons
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useContext, useState } from "react";
import { todosContext } from "../contexts/todosContext.js";

function Todo({ todo }) {
  const { todos, setTodos } = useContext(todosContext);
  // const [isCompleted, setIsCompleted] = useState(false)
  const [openDeleteTodoDialog, setOpenDeleteTodoDialog] = useState(false);
  const [openUpdateTodoDialog, setOpenUpdateTodoDialog] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({
    title: todo.title,
    details: todo.details,
  });

  // Delete Todo
  function handleDeleteTodo(todoId) {
    const updatedTodos = todos.filter((t) => t.id !== todoId);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  // Update Todo
  function handleUpdateTodo(todoId) {
    const updatedTodos = todos.map((t) => {
      if (t.id === todoId) {
        return { ...t, title: updatedTodo.title, details: updatedTodo.details };
      } else {
        return t;
      }
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  // mark todo as completed
  function markTodoCompleted(todoId) {
    const updatedTodos = todos.map((t) => {
      if (t.id === todoId) {
        return { ...t, isCompleted: !t.isCompleted };
      }
      return t;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  return (
    <div>
      <Card
        sx={{
          minWidth: 275,
          marginBottom: "20px",
          background: "#9575cd",
          color: "white",
        }}
      >
        <CardContent>
          <Grid container spacing={2} alignItems={"center"}>
            <Grid item xs={8}>
              <Typography
                variant="h4"
                sx={{
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.details}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Stack direction="row" spacing={1}>
                <IconButton
                  className={`${todo.isCompleted ? "active" : ""} icon-button`}
                  style={{
                    border: "3px solid #4caf50 ",
                    color: todo.isCompleted ? "white" : "#4caf50",
                    backgroundColor: todo.isCompleted ? "#4caf50" : "white",
                  }}
                  aria-label="check"
                  onClick={() => markTodoCompleted(todo.id)}
                >
                  <CheckOutlinedIcon />
                </IconButton>
                <IconButton
                  className="icon-button"
                  style={{
                    border: "3px solid #03a9f4 ",
                    color: "#03a9f4",
                    backgroundColor: "white",
                  }}
                  aria-label="edit"
                  onClick={() => setOpenUpdateTodoDialog(true)}
                >
                  <EditOutlinedIcon />
                </IconButton>
                <IconButton
                  className="icon-button"
                  style={{
                    border: "3px solid #f44336 ",
                    color: "#f44336",
                    backgroundColor: "white",
                  }}
                  aria-label="delete"
                  onClick={() => setOpenDeleteTodoDialog(true)}
                >
                  <DeleteOutlineOutlinedIcon />
                </IconButton>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Delete Dialog */}

      <Dialog
        open={openDeleteTodoDialog}
        onClose={() => setOpenDeleteTodoDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure to Delete {todo.title} ?
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
          <Button onClick={() => handleDeleteTodo(todo.id)} autoFocus>
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
            value={updatedTodo.title}
            onChange={(e) =>
              setUpdatedTodo({ ...updatedTodo, title: e.target.value })
            }
          />
          <TextField
            margin="dense"
            id="details"
            label="Todo Details"
            type="text"
            fullWidth
            variant="standard"
            value={updatedTodo.details}
            onChange={(e) =>
              setUpdatedTodo({ ...updatedTodo, details: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUpdateTodoDialog(false)}>Cancel</Button>
          <Button
            onClick={() => {
              handleUpdateTodo(todo.id);
              setOpenUpdateTodoDialog(false);
            }}
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>
      {/* ==Update Dialog== */}
    </div>
  );
}

export default Todo;
