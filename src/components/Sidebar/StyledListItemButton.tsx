import { ListItemButton } from "@mui/material";
import { ListItemButtonProps } from "@mui/material/ListItemButton";
import { styled } from "@mui/material/styles";

interface StyledListItemButtonProps extends ListItemButtonProps {
  isActive?: boolean;
}

const StyledListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== "isActive"
})<StyledListItemButtonProps>(({ theme, isActive }) => ({
  paddingInline: theme.spacing(2),
  paddingBlock: theme.spacing(1),
  ...(isActive && { backgroundColor: "#EDE9FE", borderRight: "4px solid #E1407D" }),
  "&:hover": {
    color: "#E1407D"
  }
}));

export default StyledListItemButton;
