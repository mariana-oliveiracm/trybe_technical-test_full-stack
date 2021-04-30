import React, { useState, useEffect } from "react"
import axios from "axios";
import { Redirect } from "react-router-dom";
import "./Login.css";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleEmailInput = (event) => {
        let email = event.target.value;
        setEmail(email);
    }

    const handlePasswordInput = (event) => {
        let password = event.target.value;
        setPassword(password);
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        const request = await postLogin(email, password);
        if(request){
            const token = request.data.token;
            localStorage.setItem("token", token);
            setIsLoggedIn(true);
        };
        
    }

    const postLogin = async (email, password) => {
        try {
            const body = {  
                "email": email,
                "password": password
            }
            const response = await axios.post("/login", body);
            return response;
            
        } catch(error) {
            alert(JSON.stringify(error.response.data));
        };
    }

    return (
        <div className="container">
            {isLoggedIn && (
                <Redirect to="/"  />
            )}
            <form onSubmit={handleLogin}>
            <div className="row">
                <div className="col-md-12">
                    <label>Email</label>
                </div>
                <div className="col-md-12">
                    <input type="text" onChange={handleEmailInput}></input>
                </div>
                <div className="col-md-12">
                    <label>Senha</label>
                </div>
                <div className="col-md-12">
                    <input type="password" onChange={handlePasswordInput}></input>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <button className="btn btn-info" id="btnEntrar">Entrar</button>
                </div>
            </div>
                
                
                
            </form>
        </div>
    )
}

