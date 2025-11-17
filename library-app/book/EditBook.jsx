import React, { useState, useEffect } from "react";
import {
Card,
CardActions,
CardContent,
Button,
TextField,
Typography,
Icon,
} from "@mui/material";
import auth from "../lib/auth-helper.js";
import { read, update } from "./api-book.js";
import { Navigate, useParams } from "react-router-dom";
export default function EditBook() {
const { bookId } = useParams();
const [values, setValues] = useState({
title: "",
author: "",
year: 0,
open: false,
error: "",
NavigateToProfile: false,
})
useEffect(() => {
const abortController = new AbortController();
const signal = abortController.signal;
read({ bookId }, signal).then((data) => {
if (data?.error) {
setValues((prev) => ({ ...prev, error: data.error }));
} else {
setValues((prev) => ({ ...prev, title: data.title, author: data.author}));
}
});
return () => abortController.abort();
}, [bookId]);
const clickSubmit = () => {
const book = {
title: values.title || undefined,
author: values.title || undefined,
year: values.year || undefined,
}
update({ bookId }, book).then((data) => {
if (data?.error) {
setValues((prev) => ({ ...prev, error: data.error }));
} else {
setValues((prev) => ({
...prev,
bookId: data._id,
NavigateToProfile: true,

}));
}
});
};
const handleChange = (title) => (event) => {
setValues({ ...values, [title]: event.target.value });
};
if (values.NavigateToProfile) {
return <Navigate to={`/book/${values.bookId}`} />;
return (
<Card
sx={{
maxWidth: 600,
mx: "auto",
mt: 5,
textAlign: "center",
pb: 2,
}}
>
<CardContent>
<Typography variant="h6" sx={{ mt: 2, mb: 2, color: "text.primary" }}>
Edit Book
</Typography>
<TextField
id="title"
label="Book Title"
value={values.title}
onChange={handleChange("title")}
margin="normal"
sx={{ mx: 1, width: 300 }}
/>
<br />
<TextField
id="author"
type="author"
label="Author"
value={values.author}
onChange={handleChange("author")}
margin="normal"
sx={{ mx: 1, width: 300 }}
/>
<br />
<TextField
id="year"
type="year"
label="Published Year"
value={values.year}
onChange={handleChange("year")}
margin="normal"
sx={{ mx: 1, width: 300 }}
/>
<br />
{values.error && (
<Typography component="p" color="error" sx={{ mt: 1 }}>
<Icon color="error" sx={{ verticalAlign: "middle", mr: 1 }}>
error
</Icon>
{values.error}
</Typography>
)}
</CardContent>
<CardActions sx={{ justifyContent: "center" }}>
<Button
color="primary"
variant="contained"
onClick={clickSubmit}
sx={{ mb: 2 }}
>
Submit
</Button>
</CardActions>
</Card>
);
}}