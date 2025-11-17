import React, { useState } from "react";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { remove } from "./api-book.js";
import { Navigate } from "react-router-dom";
export default function DeleteBook({ bookId }) {
const [open, setOpen] = useState(false);
const [redirect, setRedirect] = useState(false);
const clickButton = () => {
setOpen(true);
};
const deleteBook = () => {
remove({ bookId }).then((data) => {
if (data?.error) {
console.error(data.error);
} else {
setRedirect(true);
}
});
};
const handleRequestClose = () => {
setOpen(false);
};
if (redirect) {
return <Navigate to="/" />;
}
return (
<>
<IconButton
aria-label="Delete book"
onClick={clickButton}
color="error"
>
<DeleteIcon />
</IconButton>
<Dialog open={open} onClose={handleRequestClose}>
<DialogTitle>Delete Book</DialogTitle>
<DialogContent>
<DialogContentText>
Are you sure you want to delete this book? This action is
irreversible.
</DialogContentText>
</DialogContent>
<DialogActions>
<Button onClick={handleRequestClose} color="primary">
Cancel
</Button>
<Button
onClick={deleteBook}
color="error"
variant="contained"
autoFocus
>
Confirm
</Button>
</DialogActions>
</Dialog>
</>
);
}
DeleteBook.propTypes = {
bookId: PropTypes.string.isRequired,
};
