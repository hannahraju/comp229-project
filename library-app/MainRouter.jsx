import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Users from './user/Users.jsx'
import Signup from './user/Signup.jsx'
import Signin from './lib/Signin.jsx'
import PrivateRoute from './lib/PrivateRoute.jsx'
import Profile from './user/Profile.jsx'
import EditProfile from './user/EditProfile.jsx'
import Menu from './components/Menu.jsx'

function MainRouter() {
    return (
        <div>
            <Menu/>
            <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/users" element={<Users/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/signin" element={<Signin/>}/>
            <Route path="/user/:userId" element={<Profile/>}/>
            <Route path="/user/edit/:userId" element={<PrivateRoute><EditProfile/></PrivateRoute>}/>
            <Route path="/user/:userId" element={<Profile/>}/>
            </Routes>
        </div>
    )}
export default MainRouter