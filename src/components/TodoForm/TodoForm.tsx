import { useState, forwardRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { Box, Typography, TextField, InputLabel, Checkbox, FormControlLabel, Button, IconButton } from "@mui/material";
import { lighten, styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

import useAllContext from "../../contexts/useAllContext";

import { TodosType } from "../../interfaces/interface";
import { isNotEmpty } from "../../validation/validation";
import { formInitial } from "../../constants/initialForm";
import { setLocalStorage } from "../../utilities/localStorage";

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "100%",
  marginBottom: theme.spacing(2),
  "& .MuiInputBase-root": {
    paddingBlock: 0,
    "& .MuiInputBase-input": {
      height: "24px",
      paddingBlock: "8.5px",
      fontSize: "14px"
    }
  }
}));

const StyledInputLabel = styled(InputLabel)(() => ({
  fontSize: "14px"
}));

const errorDefault = {
  title: "",
  date: ""
};

interface TodoFormType {
  todo?: TodosType;
  onClose: () => void;
}

const TodoForm = forwardRef(({ todo, onClose }: TodoFormType) => {
  const context = useAllContext();

  const [input, setInput] = useState<Omit<TodosType<boolean>, "id">>({ ...formInitial });
  const [errorInput, setErrorInput] = useState<Omit<TodosType<boolean>, "id" | "description" | "completed">>({
    ...errorDefault
  });

  useEffect(() => {
    if (todo) {
      setInput({
        title: todo.title,
        description: todo.description,
        date: todo.date,
        completed: todo.completed
      });
    }
  }, [todo]);

  function submitForm() {
    const error = { ...errorDefault };
    setErrorInput({ ...errorDefault });

    if (!isNotEmpty(input.title)) error.title = "Title is required";
    if (!isNotEmpty(input.date)) error.date = "Date is required";

    setErrorInput({ ...error });
    const isError = error.date || error.title;

    if (!isError) {
      const cloneTodos = [...context.todos];

      if (todo) {
        const idx = context.todos.findIndex((item) => item.id === todo.id);
        if (idx !== -1) {
          const updateTodo = { id: todo.id, ...input };
          cloneTodos.splice(idx, 1, updateTodo);
        }
      } else {
        cloneTodos.unshift({
          id: uuidv4(),
          title: input.title,
          date: input.date,
          description: input.description,
          completed: input.completed
        });
      }
      context.setTodos(cloneTodos);
      setLocalStorage(cloneTodos);
      setInput(formInitial);
      onClose();
    }
  }

  return (
    <Box
      width={"50%"}
      maxWidth={400}
      minWidth={280}
      component={"form"}
      position={"absolute"}
      top={"50%"}
      left={"50%"}
      bgcolor={"background.paper"}
      borderRadius={2}
      p={4}
      sx={{
        transform: "translate(-50%,-50%)",
        backgroundColor: (t) => (t.palette.mode === "dark" ? lighten("#3B4150", 0.2) : "#fff")
      }}
    >
      <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} mb={2}>
        <Typography component={"h2"} fontSize={18} fontWeight={500}>
          Add a task
        </Typography>
        <IconButton size="small" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <StyledInputLabel htmlFor="title" required>
        Title
      </StyledInputLabel>
      <StyledTextField
        id="title"
        placeholder="e.g, study for the test"
        onChange={(ev) => setInput((prev) => ({ ...prev, title: ev.target.value }))}
        value={input.title}
        error={Boolean(errorInput.title)}
        helperText={errorInput.title}
      />

      <StyledInputLabel htmlFor="date" required>
        Date
      </StyledInputLabel>
      <StyledTextField
        id="date"
        type="date"
        onChange={(ev) => setInput((prev) => ({ ...prev, date: ev.target.value }))}
        value={input.date}
        error={Boolean(errorInput.date)}
        helperText={errorInput.date}
      />

      <StyledInputLabel htmlFor="description">Description (Option)</StyledInputLabel>
      <StyledTextField
        id="description"
        multiline
        rows={2}
        placeholder="e.g, study for the test"
        onChange={(ev) => setInput((prev) => ({ ...prev, description: ev.target.value }))}
        value={input.description}
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={input.completed}
            onChange={(ev) => setInput((prev) => ({ ...prev, completed: ev.target.checked }))}
          />
        }
        label="Mark as completed"
        componentsProps={{ typography: { fontSize: 14 } }}
      />

      <Box textAlign={"center"} mt={4}>
        <Button fullWidth variant="contained" onClick={submitForm}>
          {todo ? "Update task" : "Add a task"}
        </Button>
      </Box>
    </Box>
  );
});

export default TodoForm;
