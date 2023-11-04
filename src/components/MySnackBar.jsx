import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { forwardRef } from "react";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function MySnackBar({
  openSnackBar,
  setOpenSnackBar,
  messageInfo,
  setMessageInfo,
}) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        key={messageInfo ? messageInfo.key : undefined}
        open={openSnackBar}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        TransitionProps={{ onExited: handleExited }}
        message={messageInfo ? messageInfo.message : undefined}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {messageInfo ? messageInfo.message : undefined}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
