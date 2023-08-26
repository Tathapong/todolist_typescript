import useAllContext from "../../contexts/useAllContext";
import { Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Button } from "@mui/material";
import { setLocalStorage } from "../../utilities/localStorage";

interface DialogConfirmProps {
  open: boolean;
  onClose: () => void;
}

function DialogConfirm({ open, onClose }: DialogConfirmProps) {
  const context = useAllContext();

  function onClickConfirm() {
    context.setTodos([]);
    setLocalStorage([]);
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{"Are you sure?"}</DialogTitle>
      <DialogContent>
        <DialogContentText>{"All data will be deleted permanently."}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" onClick={onClickConfirm}>
          Yes
        </Button>
        <Button variant="contained" onClick={onClose}>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogConfirm;
