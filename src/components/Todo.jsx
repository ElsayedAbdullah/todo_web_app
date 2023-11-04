// Material UI Components
import {
  Card,
  CardContent,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

// Material Icons
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useContext } from "react";
import { SnackBarContext } from "../contexts/SnackBarContext.jsx";
import { DispatchTodosContext } from "../contexts/TodosContext.jsx";

function Todo({ todo, showDeleteDialog, showUpdateDialog }) {
  const { dispatch } = useContext(DispatchTodosContext);
  const { showHideSnackBar } = useContext(SnackBarContext);

  // mark todo as completed
  function markTodoCompleted(todoId) {
    dispatch({ type: "markTodoCompleted", payload: { id: todoId } });
    showHideSnackBar("updated successfully!");
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
                  onClick={() => showUpdateDialog(todo)}
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
                  onClick={() => {
                    showDeleteDialog(todo);
                  }}
                >
                  <DeleteOutlineOutlinedIcon />
                </IconButton>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}

export default Todo;
