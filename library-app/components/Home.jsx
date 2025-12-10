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



const [open, setOpen] = useState(false);



const handleClose = () => {
setOpen(false);
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
