import { Box, List, ListItem, ListItemButton, ListItemText, Divider } from "@mui/material";
import { alpha } from "@mui/material/styles";
import StyledListItemButton from "./StyledListItemButton";

import useAllContext from "../../contexts/useAllContext";
import { TabName, TabNameType } from "../../constants/tabName";

const tabs: TabNameType[] = [
  TabName.ALL_TASKS,
  TabName.TODAY_TASKS,
  TabName.COMPLETED_TASKS,
  TabName.UNCOMPLETED_TASKS
];

interface SidebarType {
  openModalForm: () => void;
}

function Sidebar({ openModalForm }: SidebarType) {
  const context = useAllContext();

  function onClickListItem(tab: TabNameType) {
    context.setTab(tab);
  }

  return (
    <Box height={"100%"} sx={{ backgroundColor: (t) => alpha(t.customPalette.background, 0.75) }}>
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={openModalForm}
            sx={{
              bgcolor: (t) => (t.palette.mode === "dark" ? "#CA8A04" : "#EAB308"),
              px: 3,
              py: 1.5,
              mx: 2,
              my: 4,
              borderRadius: 3
            }}
          >
            <ListItemText
              sx={{ textAlign: "center", height: "20px" }}
              primary={"New Task"}
              primaryTypographyProps={{ color: "white" }}
            />
          </ListItemButton>
        </ListItem>
        <Divider />
        {tabs.map((tab, index) => (
          <ListItem key={index} disablePadding onClick={() => onClickListItem(tab)}>
            <StyledListItemButton isActive={tab === context?.tab}>
              <ListItemText primary={tab} primaryTypographyProps={{ color: context?.tab === tab ? "#E1407D" : "" }} />
            </StyledListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Sidebar;
