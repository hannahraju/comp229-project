import React, { useState, useEffect } from "react";
import {
Paper,
List,
ListItem,
ListItemAvatar,
ListItemSecondaryAction,
ListItemText,
Avatar,
IconButton,
Typography,
Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import DeleteBook from "./DeleteBook.jsx";
import { read } from "../book/api-book.js";
import { useLocation, Navigate, Link, useParams } from "react-router-dom";

export default function BookProfile() {
const location = useLocation();
const [book, setBook] = useState({});
const { bookId } = useParams();
useEffect(() => {
const abortController = new AbortController();
const signal = abortController.signal;
read({ bookId }, signal).then((data) => {
if (data && data.error) {
setRedirectToSignin(true);
} else {
setBook(data);
}
});
return () => abortController.abort();
}, [bookId]);

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
<Typography variant="h6" sx={{ mt: 3, mb: 2, color: "text.primary" }}>
Book
</Typography>
<List dense>
<ListItem>
<ListItemAvatar>
<Avatar>
<PersonIcon />
</Avatar>
</ListItemAvatar>
<ListItemText primary={book.title} secondary={book.author} />
<ListItemSecondaryAction>
<Link to={`/book/edit/${book._id}`}>
<IconButton aria-label="Edit" color="primary">
<EditIcon />
</IconButton>
</Link>
<DeleteBook bookId={book._id} />
</ListItemSecondaryAction>
</ListItem>
<Divider />
<ListItem>
<ListItemText
primary={
book.created
? `Added: ${new Date(book.created).toDateString()}`
: "Loading..."
}
/>
</ListItem>
</List>
</Paper>
);
}