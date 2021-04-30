import React, { useState } from "react"
import axios from "axios"
import { Redirect, Link } from "react-router-dom";
import "./ChangeCurrency.css";

export default function ChangeCurrency( props ) {
    const bitCoinValues = props.location.state.bitCoinValues;

    const [currentCurrencyValue, setCurrentCurrencyValue] = useState((bitCoinValues.BRL.rate_float/bitCoinValues.USD.rate_float).toFixed(2));
    const [newValue, setNewValue] = useState("");
    const [currencyName, setCurrencyName] = useState("BRL");
    const [success, setSuccess] = useState("");

    const handleCurrencyChange = (event) => {
        let currentCurrencyName = event.target.value;

        switch(currentCurrencyName){
            case "BRL":
                setCurrentCurrencyValue((bitCoinValues.BRL.rate_float/bitCoinValues.USD.rate_float).toFixed(2));
                setCurrencyName("BRL");
                break;
            case "EUR":
                setCurrentCurrencyValue((bitCoinValues.EUR.rate_float/bitCoinValues.USD.rate_float).toFixed(2));
                setCurrencyName("EUR");
                break;
            case "CAD":
                setCurrentCurrencyValue((bitCoinValues.CAD.rate_float/bitCoinValues.USD.rate_float).toFixed(2));
                setCurrencyName("CAD");
                break;
        }
    }

    const handleNewValue = (event) =>{
        let newValue = event.target.value;
        setNewValue(newValue);
    }

    const handleChangeCurrencySubmit = async (event) => {
        event.preventDefault();
        
        if (!currencyName){
            alert("Selecione uma moeda");
        } else if(!newValue){
            alert("Preencha um novo valor");
        } else {
            const token = getToken();
            const request = await postCryptoBtc(currencyName, newValue, token);
            if (request){
                setSuccess(request.status)
            };
        }
    }

    const getToken = () => {
        return localStorage.getItem('token');
    }

    const postCryptoBtc = async (currency, value, token) => {
        try {
            const body = {  
                "currency": currency,
                "value": Number(value)
            }
            const header = { Authorization: `Bearer ${token}`}
            const response = await axios.post("/cryto/btc", body, { headers: header } );

            return response
            
        } catch(error) {
            alert(JSON.stringify(error.response.data));
        };
    }

    return (
        <div className="container">
            {success == "200" && (
                <Redirect to="/"  />
            )}
            <form onSubmit={handleChangeCurrencySubmit}>
                <div className="row">
                    <Link to="/">
                            <button className="btn btn-secondary">Voltar</button>
                    </Link>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            Moeda
                        </div>
                        <div className="col-md-12">
                            <select onChange = {handleCurrencyChange}>
                                <option value="BRL">BRL</option>
                                <option value="EUR">EUR</option>
                                <option value="CAD">CAD</option>
                            </select>
                        </div>
                        <div className="col-md-12">
                            <b>Valor atual:</b> {currentCurrencyValue}
                        </div>
                        <div className="col-md-12">
                            Novo Valor:
                        </div>
                        <div className="col-md-12">
                            <input onChange = {handleNewValue}></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <button className="btn btn-primary" id="btnAtualizar">Atualizar</button>
                        </div>
                    </div>
                </div>
                
            </form>
        </div>
    )
}

