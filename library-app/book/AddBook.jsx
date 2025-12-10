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

export default function AddBook() {



    const[values, setValues] = useState({
        title: "",
        author: "",
        isbn: 0,
        year: "",
        genre: "",
        error: "",
    })

    const clickSubmit = () => {
        const book = {
            title: values.title || undefined,
            author: values.author || undefined,
            isbn: values.isbn || undefined,
            year: values.year || undefined,
            genre: values.genre || undefined 
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
    const handleChange = (title) => (event) => {
        setValues({ ...values, [title]: event.target.value });
    };

    useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

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
            id="isbn"
            label="ISBN"
            sx={{ width: "100%", mb: 2 }}
            value={values.isbn}
            onChange={handleChange("isbn")}
            margin="normal"
        />
        <TextField
            id="year"
            label="Year published"
            sx={{ width: "100%", mb: 2 }}
            value={values.year}
            onChange={handleChange("year")}
            margin="normal"
        />
        <TextField
            id="genre"
            label="Genre"
            sx={{ width: "100%", mb: 2 }}
            value={values.genre}
            onChange={handleChange("genre")}
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
        </Paper>
    )
}


<Card
sx={{
maxWidth: 400,
margin: "0 auto",
mt: 3,
p: 2,
textAlign: "center",
}}
>

</Card>