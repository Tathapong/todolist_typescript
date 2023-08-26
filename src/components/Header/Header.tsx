import { useState } from "react";
import useAllContext from "../../contexts/useAllContext";

import { AppBar, Toolbar, Container, Box, IconButton, Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "../Sidebar/Sidebar";
import SearchInput from "./SearchInput";
import DarkModeSwitch from "./DarkModeSwitch";

interface HeaderType {
  openModalForm: () => void;
  openDialogClear: () => void;
}

function Header({ openModalForm, openDialogClear }: HeaderType) {
  const [sidebar, setSidebar] = useState(false);

  function openSidebar() {
    setSidebar(true);
  }

  function closeSidebar() {
    setSidebar(false);
  }

  const context = useAllContext();

  return (
    <>
      <AppBar position="static" sx={{ boxShadow: "none", backgroundColor: (t) => t.customPalette.background }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ display: "flex" }}>
            <Box sx={{ display: { lg: "none" } }}>
              <IconButton onClick={openSidebar}>
                <MenuIcon />
              </IconButton>
            </Box>
            <SearchInput />
            <Box flexGrow={1} display={{ xs: "none", sm: "block" }} />
            <Box display={"flex"} alignItems={"center"}>
              <IconButton onClick={openDialogClear}>
                <DeleteIcon color="error" />
              </IconButton>
              <DarkModeSwitch checked={context.darkMode} onChange={() => context.setDarkMode((prev) => !prev)} />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        anchor="left"
        open={sidebar}
        onClose={closeSidebar}
        variant="temporary"
        SlideProps={{ style: { width: "240px" } }}
        sx={{ display: { lg: "none" } }}
      >
        <Sidebar openModalForm={openModalForm} />
      </Drawer>
    </>
  );
}

export default Header;
