import { useState } from "react";

import useAllContext from "../../contexts/useAllContext";

import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Box,
  IconButton,
  Chip,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  Modal
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TodoForm from "../TodoForm/TodoForm";
import { TodosType } from "../../interfaces/interface";

import { setLocalStorage } from "../../utilities/localStorage";

function TodoCard({ id, title, description, date, completed }: TodosType<boolean>) {
  const context = useAllContext();

  const [dialogConfirm, setDialogConfirm] = useState(false);
  const [modalForm, setModalForm] = useState(false);

  function openDialogConfirm() {
    setDialogConfirm(true);
  }

  function closeDialogConfirm() {
    setDialogConfirm(false);
  }

  function openModalForm() {
    setModalForm(true);
  }

  function closeModalForm() {
    setModalForm(false);
  }

  function toggleCompletedButton() {
    const idx = context.todos.findIndex((item) => item.id === id);
    if (idx !== -1) {
      const cloneTodos = [...context.todos];
      cloneTodos[idx].completed = !cloneTodos[idx].completed;
      context.setTodos(cloneTodos);
      setLocalStorage(cloneTodos);
    }
  }

  function confirmDeleteTask() {
    const idx = context.todos.findIndex((item) => item.id === id);
    if (idx !== -1) {
      const cloneTodos = [...context.todos];
      cloneTodos.splice(idx, 1);
      context.setTodos(cloneTodos);
      setLocalStorage(cloneTodos);
    }
  }

  return (
    <>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "stretch",
          width: "100%",
          height: 150,
          backgroundColor: (t) => t.customPalette.card
        }}
      >
        <CardHeader
          sx={{
            py: 1,
            flexGrow: 1,
            alignItems: "flex-start",
            display: "block",
            overflow: "hidden"
          }}
          title={title}
          subheader={description}
          subheaderTypographyProps={{
            fontSize: 14
          }}
          titleTypographyProps={{
            fontSize: 14,
            fontWeight: "bold",
            color: "#E1407D",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}
        />

        <Box display={"flex"} justifyContent={"space-between"}>
          <CardContent sx={{ py: 1 }}>
            <Box display={"flex"} alignItems={"flex-end"} gap={1}>
              <CalendarMonthIcon />
              <Typography variant="caption">{date}</Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Box display={"flex"} columnGap={1} alignItems={"center"}>
              <Chip
                label={completed ? "Completed" : "Uncompleted"}
                variant={completed ? "filled" : "outlined"}
                onClick={toggleCompletedButton}
                color="success"
              />

              <IconButton size="small" onClick={openDialogConfirm}>
                <DeleteIcon />
              </IconButton>
              <IconButton size="small" onClick={openModalForm}>
                <MoreVertIcon />
              </IconButton>
            </Box>
          </CardActions>
        </Box>
      </Card>

      <Dialog open={dialogConfirm} onClose={closeDialogConfirm}>
        <DialogTitle>{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>{"This task will be deleted permanently."}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={confirmDeleteTask}>
            Yes
          </Button>
          <Button variant="contained" onClick={closeDialogConfirm}>
            No
          </Button>
        </DialogActions>
      </Dialog>

      <Modal open={modalForm} onClose={closeModalForm}>
        <TodoForm todo={{ id, title, description, date, completed }} onClose={closeModalForm} />
      </Modal>
    </>
  );
}

export default TodoCard;
