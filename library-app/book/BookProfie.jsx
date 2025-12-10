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
Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import DeleteBook from "./DeleteBook.jsx";
import { read } from "../book/api-book.js";
import { update } from "../user/api-user.js"
import auth from "../lib/auth-helper.js";
import { useLocation, Navigate, Link, useParams, redirectDocument } from "react-router-dom";


export default function BookProfile() {


    const location = useLocation();
    const [book, setBook] = useState({});
    const { bookId } = useParams();
    const jwt = auth.isAuthenticated();
    const [redirectToSignin, setRedirectToSignin] = useState(false);
    

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

// If the user isn't signed in, redirect to Sign-in

 if (redirectToSignin) {
        return (
        <Navigate to="/signin" state={{ from: location.pathname }} replace />
        )
}
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
`Genre: ${book.genre}`
}
/>
</ListItem>
<ListItem>
<ListItemText
primary={
`Published year: ${book.year}`
}
/>
</ListItem>

</List>
</Paper>
);
}