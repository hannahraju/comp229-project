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
import { read, update } from "./api-user.js";
import { Navigate, useParams } from "react-router-dom";
export default function EditProfile() {
const { userId } = useParams();
const [values, setValues] = useState({
name: "",
password: "",
email: "",
open: false,
error: "",
NavigateToProfile: false,
})
const jwt = auth.isAuthenticated();
useEffect(() => {
const abortController = new AbortController();
const signal = abortController.signal;
read({ userId }, { t: jwt.token }, signal).then((data) => {
if (data?.error) {
setValues((prev) => ({ ...prev, error: data.error }));
} else {
setValues((prev) => ({ ...prev, name: data.name, email: data.email }));
}
});
return () => abortController.abort();
}, [userId]);
const clickSubmit = () => {
const user = {
name: values.name || undefined,
email: values.email || undefined,
password: values.password || undefined,
}
update({ userId }, { t: jwt.token }, user).then((data) => {
if (data?.error) {
setValues((prev) => ({ ...prev, error: data.error }));
} else {
setValues((prev) => ({
...prev,
userId: data._id,
NavigateToProfile: true,
}));
}
});
};
const handleChange = (name) => (event) => {
setValues({ ...values, [name]: event.target.value });
};
if (values.NavigateToProfile) {
return <Navigate to={`/user/${values.userId}`} />;
}
return (
<Card className={classes.card}>
<CardContent>
<Typography variant="h6" className={classes.title}>
Edit Profile
</Typography>
<TextField id="name" label="Name" className={classes.textField} value={values.name} onChange={handleChange('name')} margin="normal"/><br/>
<TextField id="email" type="email" label="Email" className={classes.textField} value={values.email} onChange={handleChange('email')} margin="normal"/><br/>
<TextField id="password" type="password" label="Password" className={classes.textField} value={values.password} onChange={handleChange('password')} margin="normal"/>
<br/> {
values.error && (<Typography component="p" color="error">
<Icon color="error" className={classes.error}>error</Icon>
{values.error}
</Typography>)
}
</CardContent>
<CardActions>
<Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Submit</Button>
</CardActions>
</Card>
)}
