import React,{ useState, useEffect } from "react"
import axios from "axios"
import { Redirect, Link } from "react-router-dom";

import Spinner from "../components/Spinner"
import CurrencyData from "../components/CurrencyData"

export default function Home() {

    const [bitCoinValues, setBitCoinValues] = useState("");
    const [isAuthorized, setIsAuthorized] = useState(true);

    useEffect(async () => {
            const request = await getCryptoBtc();
            setBitCoinValues(request.data.bpi);
            checkToken();
    })

    const getCryptoBtc = async () => {
        const response = await axios.get("/cryto/btc");
        return response;
    }

    const checkToken = () => {
        const token = localStorage.getItem("token");
            if(!token || token.length < 16 || token.length > 16){
                setTimeout(() => {
                    setIsAuthorized(false);
                }, 100);
            }
    }

    return (
        <div className="container">
            {!isAuthorized && (
                <Redirect to="/login"  />
            )}
            <Link to={{
                        pathname: "/change-currency",
                        state: {
                            bitCoinValues: bitCoinValues
                        }
                        }}>
                <button className="btn btn-info col-md-4 offset-md-2" id="btnVoltar">Atualizar Valor Monetário</button>
            </Link>

            <CurrencyData bitCoinData = {bitCoinValues}></CurrencyData>
            {bitCoinValues == "" && 
                <div>
                    <br></br>
                    <div className="col-md-4 offset-md-2">
                        <Spinner />
                    </div>
                </div>
            }
        </div>
    )
}

