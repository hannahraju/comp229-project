import React, { useState, useEffect } from "react";
import {
Paper,
Card,
Dialog,
DialogTitle,
DialogContent,
DialogContentText,
Button,
CardContent,
CardActions,
TextField,
List,
ListItem,
ListItemAvatar,
ListItemText,
ListItemSecondaryAction,
IconButton,
Avatar,
Typography,
Link,
} from "@mui/material";
import ArrowForward from "@mui/icons-material/ArrowForward";
import { list, create } from "./../book/api-book.js";
import { Link as RouterLink } from "react-router-dom";

export default function Home() {


const [books, setBooks] = useState([]);

const[values, setValues] = useState({
    title: "",
    author: "",
    isbn: 0,
    error: "",
})

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
isbn: values.isbn || undefined
}
create(book).then((data) => {
if (data.error) {
setValues({ ...values, error: data.error });
} else {
setOpen(true);
}
window.location.reload();
});
};

useEffect(() => {
const abortController = new AbortController();
const signal = abortController.signal;
list(signal).then((data) => {
if (data?.error) {
console.log(data.error);
} else {
setBooks(data);
}
});
return () => abortController.abort();
}, []);
return (
<Paper
elevation={4}
sx={{
maxWidth: 600,
mx: "auto",
mt: 5,
p: 3,
}}
>
<Typography variant="h6" sx={{ mb: 2, color: "text.primary" }}>
Books
</Typography>
<List dense>
{books.map((item, i) => (
<Link
component={RouterLink}
to={`/book/${item._id}`}
underline="none"
key={item._id}
sx={{ color: "inherit" }}
>
<ListItem button>
<ListItemAvatar>
<Avatar />
</ListItemAvatar>
<ListItemText primary={item.title} />
<ListItemSecondaryAction>
<IconButton edge="end">
<ArrowForward />
</IconButton>
</ListItemSecondaryAction>
</ListItem>
</Link>
))}
</List>

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
value={books.title}
onChange={handleChange("title")}
margin="normal"
/>
<TextField
id="author"
label="Author"
sx={{ width: "100%", mb: 2 }}
value={books.author}
onChange={handleChange("author")}
margin="normal"
/>
<TextField
id="isbn"
label="ISBN"
sx={{ width: "100%", mb: 2 }}
value={books.isbn}
onChange={handleChange("isbn")}
margin="normal"
/>
{books.error && (
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
New book successfully added.
</DialogContentText>
</DialogContent>
</Dialog>
</Paper>



);
}
