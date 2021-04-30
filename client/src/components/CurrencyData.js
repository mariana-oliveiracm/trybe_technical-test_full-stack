import React, { useState } from "react"  

import "./CurrencyData.css";


export default function CurrencyData({ bitCoinData }) {  
    const [BTCValue, setBTCValue] = useState(1);


    const handleBTCChange = (event) =>{
        const value = event.target.value;
        setBTCValue(value);
    }

    const calculateRate = (item) =>{
        const finalValue =  Intl.NumberFormat().format(item.rate_float * BTCValue);
        return finalValue
    }

    return (
        <div>
            <div className="row">
                <div className="customCard col-md-4 offset-md-2">
                    <span>BTC</span>
                    <input value={BTCValue} onChange={handleBTCChange}></input>
                </div>
            </div>
            <div className="row">
            {Object.entries(bitCoinData).map((item) => {
                if (item[0] != "BTC"){
                    return <div className="customCard col-md-2" key={item[0]}>
                        <span>{item[0]}</span>
                        <div className="customCardValue">
                            {calculateRate(item[1])}
                        </div>
                    </div>
                }
            })}
            </div>
        </div>
    )
}
