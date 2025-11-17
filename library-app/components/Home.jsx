import React from 'react'
import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Link } from 'react-router-dom'

export default function Home() {


    /* 3 constant defined for user input fields: name, email, password*/
    const[name, setName] = useState('')
    const [email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    
    return(

        <form>
            <label>
                Name: 
                <input
                    type="text"
                    value = {name}
                    /* Handles state change when user inputs their name*/
                    onChange={(e) => setName(e.target.value)} /><br/>
            </label>
            <label>
                Email: 
                <input
                    type="text"
                    value = {email}
                    /* Handles state change when user inputs their email*/
                    onChange={(e) => setEmail(e.target.value)} /><br/>
            </label>
            <label>
                Password:  
                <input
                    type="text"
                    value = {password}
                    onChange={(e) => setPassword(e.target.value)} /><br/>

                
            </label>
           
        <br/>
       
        <button>Sign up</button>
        <button>Get my info</button>
        <button>Update my info</button>
        <button>Delete my account</button>
       
        </form>
    )
}


