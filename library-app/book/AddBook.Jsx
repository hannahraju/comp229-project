import React, { useState } from "react";
import {
Card,
CardContent,
Typography,
TextField,
CardActions,
Button,
Dialog,
DialogTitle,
DialogContent,
DialogContentText,
DialogActions,
} from "@mui/material";
import { Link } from "react-router-dom";
import { create } from "./api-book";
export default function AddBook() {
const [values, setValues] = useState({
title: "",
author: "",
year: 0,
error: "",
});
const [open, setOpen] = useState(false);
const handleChange = (title) => (event) => {
setValues({ ...values, [title]: event.target.value });
};
const handleClose = () => {
setOpen(false);
};
const clickSubmit = () => {
const book = {
title: values.title || undefined,
author: values.author || undefined,
year: values.year || undefined,
};
create(book).then((data) => {
if (data.error) {
setValues({ ...values, error: data.error });
} else {
setOpen(true);
}
});
};
return (
<div>
<Card
sx={{
maxWidth: 400,
margin: "0 auto",
mt: 3,
p: 2,
textAlign: "center",
}}
>
<CardContent>
<Typography variant="h6" sx={{ fontSize: 18 }}>
Add new book
</Typography>
<TextField
id="title"
label="Title"
sx={{ width: "100%", mb: 2 }}
value={values.title}
onChange={handleChange("title")}
margin="normal"
/>
<TextField
id="author"
label="Author"
sx={{ width: "100%", mb: 2 }}
value={values.author}
onChange={handleChange("author")}
margin="normal"
/>
<TextField
id="yaer"
label="year"
sx={{ width: "100%", mb: 2 }}
value={values.year}
onChange={handleChange("year")}
type="year"
margin="normal"
/>
{values.error && (
<Typography color="error" sx={{ mt: 1 }}>
{values.error}
</Typography>
)}
</CardContent>
<CardActions>
<Button
color="primary"
variant="contained"
onClick={clickSubmit}
sx={{ margin: "0 auto", mb: 2 }}
>
Submit
</Button>
</CardActions>
</Card>
<Dialog open={open} onClose={handleClose}>
<DialogTitle>New Book</DialogTitle>
<DialogContent>
<DialogContentText>
New book successfully created.
</DialogContentText>
</DialogContent>
<DialogActions>
<Link to="/">
<Button
color="primary"
autoFocus
variant="contained"
onClick={handleClose}
>
Add new book
</Button>
</Link>
</DialogActions>
</Dialog>
</div>
);
}