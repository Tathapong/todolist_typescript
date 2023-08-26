import { useState } from "react";
import { CssBaseline, Grid, Modal } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import useAllContext from "./contexts/useAllContext";

import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Main from "./components/Main/Main";
import TodoForm from "./components/TodoForm/TodoForm";
import DialogConfirm from "./components/DialogConfirm/DialogConfirm";

declare module "@mui/material/styles" {
  interface Theme {
    customPalette: {
      background: string;
      card: string;
    };
  }
  interface ThemeOptions {
    customPalette?: {
      background?: string;
      card?: string;
    };
  }
}

function App() {
  const context = useAllContext();
  const [modalForm, setModalForm] = useState(false);
  const [dialogClear, setDialogClear] = useState(false);

  function closeModalForm() {
    setModalForm(false);
  }

  function openModalForm() {
    setModalForm(true);
  }

  function closeDialogClear() {
    setDialogClear(false);
  }

  function openDialogClear() {
    setDialogClear(true);
  }

  const theme = createTheme({
    customPalette: {
      background: context.darkMode ? "#0F172A" : "#E2E8F0",
      card: context.darkMode ? "#303747" : "white"
    },
    palette: {
      mode: context.darkMode ? "dark" : "light"
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Grid container columns={{ lg: 10 }}>
        <Grid item lg={2} display={{ xs: "none", lg: "block" }} height={"100vh"}>
          <Sidebar openModalForm={openModalForm} />
        </Grid>
        <Grid item lg={8} xs height={"100vh"} display={"flex"} flexDirection={"column"}>
          <Header openModalForm={openModalForm} openDialogClear={openDialogClear} />
          <Main />
        </Grid>
      </Grid>

      <Modal open={modalForm} onClose={closeModalForm}>
        <TodoForm onClose={closeModalForm} />
      </Modal>

      <DialogConfirm open={dialogClear} onClose={closeDialogClear} />
    </ThemeProvider>
  );
}

export default App;
