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
isbn: "",
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
setValues((prev) => ({ ...prev, title: data.title, author: data.author, isbn: data.isbn}));
}
});
return () => abortController.abort();
}, [bookId]);
const clickSubmit = () => {
const book = {
title: values.title || undefined,
author: values.title || undefined,
isbn: values.isbn || undefined,
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
}
return (
<Card className={values.card}>
<CardContent>
<Typography variant="h6" className={values.title}>
Edit Book
</Typography>
<TextField id="title" label="Title" className={values.textField} value={values.title} onChange={handleChange('title')} margin="normal"/><br/>
<TextField id="author" type="author" label="Author" className={values.textField} value={values.author} onChange={handleChange('author')} margin="normal"/><br/>
<TextField id="isbn" type="isbn" label="ISBN" className={values.textField} value={values.isbn} onChange={handleChange('isbn')} margin="normal"/>
<br/> {
values.error && (<Typography component="p" color="error">
<Icon color="error" className={values.error}>error</Icon>
{values.error}
</Typography>)
}
</CardContent>
<CardActions>
<Button color="primary" variant="contained" onClick={clickSubmit} className={values.submit}>Submit</Button>
</CardActions>
</Card>
)
}