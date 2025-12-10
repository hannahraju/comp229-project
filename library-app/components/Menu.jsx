import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import Button from "@mui/material/Button";
import auth from "../lib/auth-helper";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import logo from "../src/assets/images/book.PNG"

const isActive = (location, path) =>
location.pathname === path ? "#b75647ff" : "#ffffff";
export default function Menu() {
const navigate = useNavigate();
const location = useLocation();

return (
<AppBar position="static">
<Toolbar sx={{ display: "flex", gap: 2, alignItems: "center" }}>
<img src={logo} width={100} alignItems />

<Typography variant="h6" sx={{ flexGrow: 1 }}>
THE LIBRARY 
</Typography>
<Link to="/">
<IconButton aria-label="Home" sx={{ color: isActive(location, "/") }}>
<HomeIcon />
</IconButton>
</Link>
<Link to="/add">
<Button sx={{ color: isActive(location, "/add") }}>Add</Button>
</Link>
<Link to="/users">
<Button sx={{ color: isActive(location, "/users") }}>Users</Button>
</Link>
{!auth.isAuthenticated() && (
<>
<Link to="/signup">
<Button sx={{ color: isActive(location, "/signup") }}>
Sign up
</Button>
</Link>
<Link to="/signin">
<Button sx={{ color: isActive(location, "/signin") }}>
Sign In
</Button>
</Link>
</>
)}
{auth.isAuthenticated() && (
<>
<Link to={`/user/${auth.isAuthenticated().user._id}`}>
<Button
sx={{
color: isActive(
location,
`/user/${auth.isAuthenticated().user._id}`
),
}}
>
My Profile
</Button>
</Link>
<Button
sx={{ color: "#ffffff" }}
onClick={() => {
auth.clearJWT(() => navigate("/"));
}}
>
Sign out
</Button>
</>
)}
</Toolbar>
</AppBar>
);
}