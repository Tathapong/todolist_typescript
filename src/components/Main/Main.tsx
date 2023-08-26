import { Box, Typography, List, ListItem } from "@mui/material";
import TodoCard from "./TodoCard";

import useAllContext from "../../contexts/useAllContext";
import { sortTodos } from "../../utilities/sortTask";

function Main() {
  const context = useAllContext();

  const sortedTodos = sortTodos(context.todos, context.tab, context.search);

  return (
    <Box
      flexGrow={1}
      p={5}
      overflow={"hidden"}
      display={"flex"}
      flexDirection={"column"}
      sx={{ backgroundColor: (t) => t.customPalette.background }}
    >
      <Typography
        variant="h5"
        fontWeight={500}
        letterSpacing={1}
      >{`${context.tab} (${sortedTodos.length} tasks)`}</Typography>
      <List sx={{ overflowY: "auto", pr: 2 }}>
        {sortedTodos.map((todo) => (
          <ListItem disableGutters key={todo.id}>
            <TodoCard
              id={todo.id}
              title={todo.title}
              description={todo.description}
              date={todo.date}
              completed={todo.completed}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Main;
