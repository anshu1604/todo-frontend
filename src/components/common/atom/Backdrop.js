import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function SimpleBackdrop({load, add, deleted, done, edit}) {

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: 99999999 }}
        open={load||add||deleted||done||edit}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
